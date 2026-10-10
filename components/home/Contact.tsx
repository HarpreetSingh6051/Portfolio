"use client";

import { Mail, Globe, Code2, FileText, Send } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { profile, socialLinks } from "@/lib/config/profile";

export function Contact() {
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
              <h3 className="mb-4 text-lg font-semibold text-zinc-50">
                Get in Touch
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                Whether you have a role that matches my skills, want to discuss
                applied AI, or just want to connect — I would be happy to hear
                from you.
              </p>

              <div className="space-y-4">
                <a
                  href={socialLinks.email}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 transition-colors hover:border-zinc-600"
                >
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Email</p>
                    <p className="text-sm text-zinc-200">{profile.email}</p>
                  </div>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 transition-colors hover:border-zinc-600"
                >
                  <Globe className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-zinc-500">LinkedIn</p>
                    <p className="text-sm text-zinc-200">Connect with me</p>
                  </div>
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 transition-colors hover:border-zinc-600"
                >
                  <Code2 className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-zinc-500">GitHub</p>
                    <p className="text-sm text-zinc-200">View my projects</p>
                  </div>
                </a>

                <a
                  href={profile.resumePath}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 transition-colors hover:border-zinc-600"
                >
                  <FileText className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Resume</p>
                    <p className="text-sm text-zinc-200">Download PDF</p>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* Right: Quick message form */}
        <Reveal delay={0.1}>
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-zinc-50">
              Send a Message
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                const email = formData.get("email") as string;
                const message = formData.get("message") as string;
                const subject = `Portfolio contact from ${name}`;
                const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
                window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
              }}
            >
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 transition-colors focus:border-cyan-500/50 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 transition-colors focus:border-cyan-500/50 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 transition-colors focus:border-cyan-500/50 focus:outline-none"
                  placeholder="Tell me about the opportunity or just say hello..."
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
