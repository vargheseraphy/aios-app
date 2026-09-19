"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a contact submission and logs it server-side. There is no
 * email-sending provider wired up anywhere in this codebase (no Resend/SMTP
 * key exists, and none should be invented) — see DECISIONS.md. The locked
 * design's own copy is explicit that nothing is sent or stored yet ("This
 * form is not connected yet"), so the success message matches that framing
 * rather than implying a reply is coming.
 */
export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const topic = String(formData.get("topic") ?? "other").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const organisation = String(formData.get("organisation") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Name, email and message are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }

  console.info("[contact]", { topic, name, email, organisation: organisation || null, message });

  return {
    status: "success",
    message: "Not sent — this form is not connected yet. The reply address goes live with the book.",
  };
}
