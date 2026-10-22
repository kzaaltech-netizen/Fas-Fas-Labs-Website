"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const topics = ["Partnership", "Careers", "Press", "Product feedback", "Other"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Validates inline, then opens the visitor's mail app with the message filled in.
 * Swap `send` for a server action once an email provider (for example Resend) is set up.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "Other");
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please write at least a sentence.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    const subject = encodeURIComponent(`[${topic}] Message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    // GA4 recommended lead event. Only the topic is sent, never the name, email or message.
    sendGAEvent("event", "generate_lead", { topic });
    setSent(true);
  }

  return (
    <div className="relative rounded-[var(--radius-lg)] border bg-surface p-6 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-start justify-center"
            role="status"
          >
            <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-6" />
            </span>
            <p className="font-display mt-6 text-3xl font-bold tracking-tight">Almost there.</p>
            <p className="mt-3 max-w-[40ch] text-muted-foreground">
              Your mail app should open with the message ready. Press send there and we will get back to you. If nothing opened,
              write to{" "}
              <a href={`mailto:${site.email}`} className="text-accent-text underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <button type="button" onClick={() => setSent(false)} className="mt-8 text-sm text-muted-foreground underline underline-offset-4">
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={send} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" autoComplete="name" error={errors.name} />
              <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="topic" className="text-sm font-medium">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                className="h-12 rounded-[var(--radius-sm)] border border-border-strong bg-background px-3 text-[15px] outline-none focus-visible:border-ring"
              >
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <Field label="Message" name="message" textarea error={errors.message} />
            <button
              type="submit"
              className="group mt-2 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition hover:brightness-110 active:scale-[0.98]"
            >
              Send message
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  textarea,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
  error?: string;
}) {
  const cls = cn(
    "w-full rounded-[var(--radius-sm)] border bg-background px-3 text-[15px] outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring",
    error ? "border-red-500" : "border-border-strong",
  );
  const describedBy = error ? `${name}-error` : undefined;
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {textarea ? (
        <textarea id={name} name={name} rows={6} className={cn(cls, "py-3")} aria-invalid={!!error} aria-describedby={describedBy} />
      ) : (
        <input id={name} name={name} type={type} autoComplete={autoComplete} className={cn(cls, "h-12")} aria-invalid={!!error} aria-describedby={describedBy} />
      )}
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
