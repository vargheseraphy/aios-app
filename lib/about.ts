import fs from "node:fs";
import path from "node:path";

/**
 * The real content behind /about — extracted from the book's own author
 * pages (iv, vi, vii) via scripts/extract-about.py, kept in
 * content-v2/about.json exactly like lesson and module data. Nothing here
 * is invented: every sentence traces back to a printed page, recorded in
 * sourcePages. Site-authored copy for this page (headings, kickers, labels
 * that aren't Raphy's own words) lives in lib/pages-content.ts instead, the
 * same split every other marketing page on this site uses.
 */

export interface AboutWho {
  who: string;
  what: string;
}

export interface AboutContent {
  role: string;
  quote: string;
  byline: string;
  /** Five paragraphs. story[1] duplicates who[] as prose and is not
   * rendered separately — printing both would repeat the same list twice
   * in a row. */
  story: string[];
  whatSeparates: string;
  mission: string;
  gap: string;
  who: AboutWho[];
  whoIntro: string;
  notAboutAI: string;
  without: string;
  with: string;
  withoutResult: string;
  withResult: string;
  withFramework: string;
  sourcePages: {
    author: string;
    mission: string;
    who: string;
  };
  extractionNote: string;
}

let cache: AboutContent | null = null;

export function getAboutContent(): AboutContent {
  if (!cache) {
    const filePath = path.join(process.cwd(), "content-v2", "about.json");
    cache = JSON.parse(fs.readFileSync(filePath, "utf8")) as AboutContent;
  }
  return cache;
}
