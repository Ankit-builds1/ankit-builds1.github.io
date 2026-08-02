"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import type { MouseEvent } from "react";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";

const socials = [
  {
    label: "Email",
    icon: Mail,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
      "Hi Ankit — let's talk",
    )}`,
    value: profile.email,
    tone: "mint",
  },
  {
    label: "GitHub",
    icon: GitHubIcon,
    href: profile.github,
    value: "@Ankit-builds1",
    tone: "blue",
  },
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: profile.linkedin,
    value: "ankitdash-edu",
    tone: "mint",
  },
] as const;

const updateSpotlight = (event: MouseEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

export default function Contact() {
  return (
    <section id="contact" className="border-b border-border">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading number="06" title="Get in touch" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="contact-panel spotlight studio-surface mt-12"
          onMouseMove={updateSpotlight}
        >
          <p className="max-w-4xl font-display text-[clamp(2.2rem,5.8vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg">
            Got a <span className="text-mint">hard ML problem</span>, an
            interesting role, or just want to talk agentic systems and
            biomedical signals?{" "}
            <span className="text-fg-muted">My inbox is wide open.</span>
          </p>

          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`contact-link contact-link-${social.tone} spotlight group`}
                  onMouseMove={updateSpotlight}
                >
                  <span className="contact-link-icon">
                    <Icon size={17} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
                      {social.label}
                    </span>
                    <span className="mt-1 block break-all text-sm font-semibold text-fg sm:break-normal">
                      {social.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="contact-link-arrow shrink-0 text-fg-muted"
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
