"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle", message: "" };

const fieldClass =
  "w-full rounded-lg border border-line-l2 bg-white px-3.5 py-2.5 text-[13.5px] text-ink-2 placeholder:text-gray-l focus:border-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-green/30 bg-green/10 px-5 py-4 text-[14px] text-ink-2"
      >
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-[12px] font-medium text-gray-l2">
          Name
        </label>
        <input id="contact-name" name="name" type="text" required className={fieldClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-[12px] font-medium text-gray-l2">
          Email
        </label>
        <input id="contact-email" name="email" type="email" required className={fieldClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-org" className="text-[12px] font-medium text-gray-l2">
          Organisation <span className="text-gray-l">(optional)</span>
        </label>
        <input id="contact-org" name="organisation" type="text" className={fieldClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-[12px] font-medium text-gray-l2">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={fieldClass}
        />
      </div>
      {state.status === "error" && (
        <p role="alert" className="text-[12.5px] text-red">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="btn btn-ink w-fit disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
