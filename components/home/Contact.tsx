"use client";

import { useState } from "react";
import {
  Mail,
  Globe,
  Code2,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { profile, socialLinks } from "@/lib/config/profile";

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Public Web3Forms form id. Safe to expose in client-side code (it is a public
// form identifier, not a secret) and domain-restrictable from the dashboard.
// Override with NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to rotate the key.
const DEFAULT_WEB3FORMS_ACCESS_KEY = "03a76325-b607-4bc5-a657-452a30b5a465";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const isSubmitting = status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Guard against duplicate submissions while a request is in flight.
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setFeedback("Please fill in your name, email, and message before sending.");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setFeedback("Please enter a valid email address so I can reply to you.");
      return;
    }

    // The Web3Forms access key is a public form identifier (not a secret),
    // intentionally used client-side per Web3Forms' own documentation:
    // https://docs.web3forms.com/getting-started/api-reference
    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || DEFAULT_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setFeedback(
        `The contact form is missing its configuration key. Please email me directly at ${profile.email}.`
      );
      return;
    }

    setStatus("submitting");
    setFeedback("");

    formData.append("access_key", accessKey);
    formData.append("subject", `Portfolio contact from ${name}`);
    formData.append("from_name", `${profile.name} Portfolio`);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data: { success?: boolean; message?: string } | null = await response
        .json()
        .catch(() => null);

      // Only report success when the service explicitly confirms it.
      if (response.ok && data?.success) {
        setStatus("success");
        setFeedback(
          "Your message was submitted successfully. Thanks for reaching out — I will reply soon."
        );
        form.reset();
      } else {
        setStatus("error");
        setFeedback(
          data?.message ||
            `The message could not be sent. Please try again or email me directly at ${profile.email}.`
        );
      }
    } catch {
      setStatus("error");
      setFeedback(
        `Could not reach the contact service. Please check your connection or email me directly at ${profile.email}.`
      );
    }
  }

  return (
    <Section id="contact">
      <SectionHeader
        label="Contact"
        title="Let's Connect"
        description="I am open to AI Engineer, Applied AI Engineer, and Full-Stack AI Engineer opportunities in India, Canada, the UK, and remote positions."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Contact info */}
        <Reveal>
          <div className="space-y-6">
            <Card>
              <h3 className="mb-4 text-lg font-semibold text-ink">Get in Touch</h3>
              <p className="mb-6 text-sm leading-relaxed text-body">
                Whether you have a role that matches my skills, want to discuss applied
                AI, or just want to connect — I would be happy to hear from you.
              </p>

              <div className="space-y-4">
                <a
                  href={socialLinks.email}
                  className="flex items-center gap-3 rounded-lg border border-line bg-canvas/50 px-4 py-3 transition-colors hover:border-line-strong hover:bg-paper"
                >
                  <Mail className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted">Email</p>
                    <p className="text-sm text-ink">{profile.email}</p>
                  </div>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-line bg-canvas/50 px-4 py-3 transition-colors hover:border-line-strong hover:bg-paper"
                >
                  <Globe className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted">LinkedIn</p>
                    <p className="text-sm text-ink">Connect with me</p>
                  </div>
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-line bg-canvas/50 px-4 py-3 transition-colors hover:border-line-strong hover:bg-paper"
                >
                  <Code2 className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted">GitHub</p>
                    <p className="text-sm text-ink">View my projects</p>
                  </div>
                </a>

                <a
                  href={profile.resumePath}
                  className="flex items-center gap-3 rounded-lg border border-line bg-canvas/50 px-4 py-3 transition-colors hover:border-line-strong hover:bg-paper"
                >
                  <FileText className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted">Resume</p>
                    <p className="text-sm text-ink">Download PDF</p>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* Right: Quick message form */}
        <Reveal delay={0.1}>
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-ink">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-body">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-line bg-canvas/50 px-4 py-2.5 text-sm text-ink placeholder-muted transition-colors focus:border-accent/60 focus:outline-none disabled:opacity-60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-body">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-line bg-canvas/50 px-4 py-2.5 text-sm text-ink placeholder-muted transition-colors focus:border-accent/60 focus:outline-none disabled:opacity-60"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-body">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full resize-none rounded-lg border border-line bg-canvas/50 px-4 py-2.5 text-sm text-ink placeholder-muted transition-colors focus:border-accent/60 focus:outline-none disabled:opacity-60"
                  placeholder="Tell me about the opportunity or just say hello..."
                />
              </div>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              {status === "success" && (
                <p
                  role="status"
                  className="flex items-start gap-2 rounded-lg border border-emerald-600/25 bg-emerald-600/10 px-3 py-2 text-sm text-emerald-800"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{feedback}</span>
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-lg border border-red-600/25 bg-red-600/10 px-3 py-2 text-sm text-red-800"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{feedback}</span>
                </p>
              )}
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}