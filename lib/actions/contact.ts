"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates and accepts a contact submission. There is no email-sending
 * provider wired up anywhere in this codebase (no Resend/SMTP key exists,
 * and none should be invented) — see DECISIONS.md. This logs the message
 * server-side so it's visible in deploy logs, and tells the visitor it was
 * received, without claiming a reply will be emailed automatically.
 */
export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
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

  console.info("[contact]", { name, email, organisation: organisation || null, message });

  return {
    status: "success",
    message: "Thanks — your message has been received.",
  };
}
