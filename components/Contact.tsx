"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const socials = [
  {
    label: "Email",
    icon: Mail,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
      "Hi Ankit — let's talk"
    )}`,
    sub: profile.email,
  },
  { label: "GitHub", icon: GitHubIcon, href: profile.github, sub: "@Ankit-builds1" },
  { label: "LinkedIn", icon: LinkedInIcon, href: profile.linkedin, sub: "ankitdash-edu" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex items-baseline gap-4"
        >
          <span className="font-mono text-sm text-fg-subtle">07 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Get in touch
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-bg-card p-8 sm:p-12 backdrop-blur-sm"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.7), transparent 60%)",
            }}
          />
          <p className="font-display text-2xl sm:text-3xl font-semibold leading-tight max-w-2xl">
            Got a{" "}
            <span className="gradient-text">hard ML problem</span>, an
            interesting role, or just want to talk agentic systems and
            biomedical signals? My inbox is wide open.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="surface surface-hover group flex items-center justify-between rounded-xl border border-border px-4 py-3 transition-all hover:border-border-strong"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-bg text-fg-muted group-hover:text-fg">
                    <s.icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-fg-subtle">
                      {s.label}
                    </p>
                    <p className="truncate text-sm font-medium text-fg">{s.sub}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-fg-subtle transition-all group-hover:text-fg group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
