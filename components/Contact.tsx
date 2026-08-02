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
    color: "#00ff9f",
  },
  {
    label: "GitHub",
    icon: GitHubIcon,
    href: profile.github,
    sub: "@Ankit-builds1",
    color: "#ff1a6b",
  },
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: profile.linkedin,
    sub: "ankitdash-edu",
    color: "#00d0ff",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 overflow-hidden">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute -top-8 -left-6 font-display font-black leading-none select-none"
        style={{ fontSize: "clamp(4.5rem,18vw,16rem)", color: "rgba(0,255,159,0.022)" }}
        aria-hidden
      >
        06
      </div>

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="font-mono text-sm" style={{ color: "#414d63" }}>06 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
            Get in touch
          </h2>
          <div
            className="flex-1 h-px ml-2"
            style={{ background: "linear-gradient(to right, rgba(0,255,159,0.35), transparent)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 backdrop-blur-sm"
          style={{
            border: "1px solid rgba(0,255,159,0.1)",
            background: "rgba(0,255,159,0.025)",
          }}
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #00ff9f, transparent 65%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-12"
            style={{ background: "radial-gradient(circle, #ff1a6b, transparent 65%)" }}
            aria-hidden
          />

          <p className="relative z-10 font-display text-2xl sm:text-3xl md:text-4xl font-black leading-tight max-w-2xl">
            Have an{" "}
            <span className="gradient-text">AI idea or ML challenge</span>,
            an interesting role, or want to talk agentic systems and
            biomedical signals?{" "}
            <span style={{ color: "#7885a0" }}>Let&apos;s build something meaningful.</span>
          </p>

          <div className="relative z-10 mt-10 grid gap-3 sm:grid-cols-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.025)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${s.color}35`;
                  el.style.background = `${s.color}06`;
                  el.style.boxShadow = `0 0 24px ${s.color}20`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.background = "rgba(255,255,255,0.025)";
                  el.style.boxShadow = "none";
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-lg transition-all duration-200"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.04)",
                      color: "#7885a0",
                    }}
                  >
                    <s.icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#414d63" }}>
                      {s.label}
                    </p>
                    <p className="truncate text-sm font-semibold text-fg">{s.sub}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
