"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { quotes } from "@/lib/quotes";

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % profile.roles.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const text = quotes[quoteIdx].text;
    const author = quotes[quoteIdx].author ?? "";
    // ~60ms per char with a 7s floor — long quotes get enough reading time
    const duration = Math.max(7000, (text.length + author.length) * 62);
    const id = setTimeout(() => {
      setQuoteIdx((i) => (i + 1) % quotes.length);
    }, duration);
    return () => clearTimeout(id);
  }, [quoteIdx]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3.5 py-1.5 text-xs text-fg-muted"
            >
              <span className="relative grid place-items-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <MapPin size={12} />
              {profile.location} — open to opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-display mt-6 text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight lg:text-[clamp(3rem,6vw,5.5rem)]"
            >
              <span className="block">Hi, I&apos;m</span>
              <span className="gradient-text block">{profile.name}.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="mt-6 flex items-center gap-2 text-lg sm:text-2xl text-fg-muted"
            >
              <span>I build as a</span>
              <span className="relative inline-block min-h-[1.5em] min-w-[180px] sm:min-w-[260px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="absolute left-0 font-semibold text-fg"
                  >
                    {profile.roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-fg-muted"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium text-bg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet via-fuchsia to-cyan bg-[length:200%_200%] animate-gradient-shift" />
                <span className="relative">View Projects</span>
                <ArrowDown
                  size={16}
                  className="relative transition-transform group-hover:translate-y-0.5"
                />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
                  "Hi Ankit — let's talk"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-hover inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-card px-6 py-3 text-sm font-medium text-fg transition-all hover:border-border-strong"
              >
                <Mail size={16} />
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* Right: avatar orb + rotating quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:flex flex-col items-center gap-8"
          >
            <div className="relative h-64 w-64 xl:h-72 xl:w-72">
              {/* Outer halo glow */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-violet via-fuchsia to-cyan opacity-30 blur-3xl animate-pulse" />

              {/* Conic gradient ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, #8b5cf6, #d946ef, #06b6d4, #a78bfa, #8b5cf6)",
                }}
              />

              {/* Inner orb */}
              <div className="absolute inset-[5px] overflow-hidden rounded-full bg-bg backdrop-blur-xl">
                {/* Counter-rotating ambient gradient inside */}
                <div
                  className="absolute inset-4 rounded-full opacity-50 blur-2xl"
                  style={{
                    background:
                      "conic-gradient(from 180deg, #8b5cf6, transparent 35%, #06b6d4, transparent 70%, #d946ef)",
                    animation:
                      "spin-slow 30s linear infinite reverse",
                  }}
                />

                {/* Photo */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <Image
                    src="/me.jpg"
                    alt={profile.name}
                    fill
                    priority
                    sizes="(min-width: 1280px) 18rem, 16rem"
                    className="object-cover object-[center_20%]"
                  />
                </div>
              </div>

              {/* Floating accent dots */}
              <span
                aria-hidden
                className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-violet shadow-[0_0_20px_rgba(139,92,246,0.9)]"
              />
              <span
                aria-hidden
                className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_20px_rgba(6,182,212,0.9)]"
              />
            </div>

            {/* Rotating life-wisdom quote (150+ quotes) */}
            <div className="relative w-full min-h-[180px] max-w-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-2 text-center"
                >
                  <p className="text-sm italic font-medium leading-relaxed text-fg-muted">
                    <span className="gradient-text not-italic mr-1 text-base">
                      ✦
                    </span>
                    &ldquo;{quotes[quoteIdx].text}&rdquo;
                  </p>
                  {quotes[quoteIdx].author && (
                    <p className="text-[11px] font-medium tracking-wide text-fg-subtle">
                      — {quotes[quoteIdx].author}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-fg-subtle"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em]">
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-fg-subtle to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
