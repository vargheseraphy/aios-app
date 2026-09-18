"use server";

import { createClient } from "@/lib/supabase/server";
import { getLesson, parseLessonId } from "@/lib/content";

/**
 * Every action here reads the session from the request's own cookies via
 * the anon-key client — never the service-role client — so RLS (see
 * supabase/migrations/0001_init.sql) is what actually enforces one user
 * can't touch another's bookmarks, not application logic.
 */
async function requireUserId(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in to bookmark a lesson.");
  return user.id;
}

/** Inserts or deletes a bookmarks row for the signed-in user. Throws if signed out. */
export async function toggleBookmark(lessonId: string): Promise<{ bookmarked: boolean }> {
  const supabase = await createClient();
  const userId = await requireUserId();

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("lesson_id", lessonId);
    if (error) throw error;
    return { bookmarked: false };
  }

  const { error } = await supabase
    .from("bookmarks")
    .insert({ user_id: userId, lesson_id: lessonId });
  if (error) throw error;
  return { bookmarked: true };
}

/** Signed-out visitors have no bookmarks — returns false rather than throwing. */
export async function isBookmarked(lessonId: string): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from("bookmarks")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();
  return Boolean(data);
}

interface RawBookmark {
  lesson_id: string;
  saved_at: string;
}

/** Signed-out visitors get an empty list rather than an error — /my-prompts renders a
 * sign-in prompt itself based on client-side auth state, not on this throwing. */
export async function getMyBookmarks(): Promise<{ lessonId: string; savedAt: string }[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("bookmarks")
    .select("lesson_id, saved_at")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });
  if (error) throw error;

  return ((data ?? []) as RawBookmark[]).map((row) => ({
    lessonId: row.lesson_id,
    savedAt: row.saved_at,
  }));
}

export interface MyBookmarkedLesson {
  lessonId: string;
  module: number;
  fileId: string;
  title: string;
  updatedAt: string;
  savedAt: string;
}

/** getMyBookmarks() plus the content lookup, so /my-prompts never needs to import the
 * fs-backed content layer itself — it renders from this alone. */
export async function getMyBookmarkedLessons(): Promise<MyBookmarkedLesson[]> {
  const bookmarks = await getMyBookmarks();

  const resolved: MyBookmarkedLesson[] = [];
  for (const bookmark of bookmarks) {
    const parsed = parseLessonId(bookmark.lessonId);
    if (!parsed) continue;
    const lesson = getLesson(parsed.module, parsed.fileId);
    if (!lesson) continue;
    resolved.push({
      lessonId: bookmark.lessonId,
      module: parsed.module,
      fileId: parsed.fileId,
      title: lesson.title,
      updatedAt: lesson.updatedAt,
      savedAt: bookmark.savedAt,
    });
  }
  return resolved;
}
