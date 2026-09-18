"use client";

import { useState } from "react";

export function CopyButton({
  text,
  className = "",
  label = "Copy prompt",
  copiedLabel = "Copied",
}: {
  text: string;
  className?: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {
        // clipboard unavailable — silently give up, button just won't confirm
      }
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-[14px] py-2 font-sans text-[13px] font-medium text-white transition-colors cursor-pointer ${
        copied ? "bg-green" : "bg-blue hover:bg-blue-lo"
      } ${className}`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
