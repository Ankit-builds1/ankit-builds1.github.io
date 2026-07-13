"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion !== false) return;

    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % profile.roles.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden border-b border-border"
    >
      <div className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-14 px-6 pb-24 pt-32 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)] lg:gap-20 lg:pt-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="eyebrow inline-flex flex-wrap items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-4 py-2 text-blue"
          >
            <MapPin size={13} aria-hidden />
            {profile.location}
            <span aria-hidden>·</span>
            <span>Open to opportunities</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
            className="mt-8 font-display text-[clamp(4rem,10vw,7.75rem)] font-semibold leading-[0.82] tracking-[-0.055em]"
          >
            <span className="mb-3 block font-mono text-[0.11em] font-medium uppercase tracking-[0.2em] text-fg-muted">
              Hi, I&apos;m
            </span>
            {profile.name}
            <span className="text-mint">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl text-fg-muted sm:text-2xl"
          >
            <span>I work across</span>
            <span className="relative inline-block min-h-[1.5em] min-w-[12rem] font-semibold sm:min-w-[15rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.strong
                  key={profile.roles[roleIndex]}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="absolute left-0 text-mint"
                >
                  {profile.roles[roleIndex]}
                </motion.strong>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-8 max-w-[65ch] text-base leading-8 text-fg-muted sm:text-lg"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-[2px] border border-mint bg-mint px-5 py-3 text-sm font-semibold text-bg no-underline transition-colors hover:bg-transparent hover:text-mint"
            >
              View projects
              <ArrowDown size={15} aria-hidden />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
                "Hi Ankit — let's talk"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link py-2 text-sm font-semibold"
            >
              <Mail size={15} aria-hidden />
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="mx-auto w-full max-w-[25rem] lg:mx-0 lg:justify-self-end"
        >
          <div className="profile-photo-orbit relative mx-auto aspect-square w-full max-w-[22rem]">
            <div
              className="portrait-halo absolute -inset-8 rounded-full bg-mint/15 blur-3xl"
              aria-hidden
            />
            <div
              className="portrait-ring absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--mint),var(--blue),var(--mint))] motion-safe:animate-spin-slow"
              aria-hidden
            />
            <div className="absolute inset-[5px] rounded-full bg-bg" aria-hidden />
            <div className="absolute inset-[5px] z-10 overflow-hidden rounded-full border border-mint/30 bg-bg">
              <Image
                src="/me.jpg"
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 25rem, (min-width: 640px) 60vw, 92vw"
                className="object-cover object-[center_20%]"
              />
            </div>
            <div
              className="portrait-inner-glow pointer-events-none absolute inset-[5px] z-20 rounded-full ring-1 ring-inset ring-blue/40 shadow-[inset_0_0_2.5rem_rgba(126,178,255,0.24)]"
              aria-hidden
            />
          </div>
          <figcaption className="mt-5 flex items-center justify-between gap-4 border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-subtle">
            <span>Portrait / {profile.name}</span>
            <span>Bhubaneswar, IN</span>
          </figcaption>
        </motion.figure>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-mint/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
