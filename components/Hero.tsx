"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const quoteIdx = 0;
  const quotes = [{ text: "", author: "" }];

  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % profile.roles.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20"
    >
      {/* Neon grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" aria-hidden />

      {/* Ambient orbs specific to hero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute right-[15%] top-[10%] h-[480px] w-[480px] rounded-full blur-[120px] opacity-15 animate-float-slow"
          style={{ background: "radial-gradient(circle, #00ff9f, transparent 70%)" }}
        />
        <div
          className="absolute left-[10%] bottom-[20%] h-[360px] w-[360px] rounded-full blur-[100px] opacity-10 animate-float-slower"
          style={{ background: "radial-gradient(circle, #ff1a6b, transparent 70%)" }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
          {/* Left: text content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-mono font-medium"
              style={{
                borderColor: "rgba(0,255,159,0.25)",
                background: "rgba(0,255,159,0.06)",
                color: "#00ff9f",
              }}
            >
              <span className="relative grid place-items-center">
                <span
                  className="absolute h-2 w-2 animate-ping rounded-full opacity-75"
                  style={{ background: "#00ff9f" }}
                />
                <span className="relative h-2 w-2 rounded-full" style={{ background: "#00ff9f" }} />
              </span>
              <MapPin size={11} />
              {profile.location} — open to opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
              className="font-display mt-6 leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3rem,8.5vw,6.5rem)" }}
            >
              <span className="block font-medium text-fg-muted" style={{ fontSize: "0.38em", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.3em" }}>
                Hi, I&apos;m
              </span>
              <span className="gradient-text block font-black">{profile.name}.</span>
            </motion.h1>

            {/* Role typer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="mt-6 flex flex-wrap items-center gap-2 text-base sm:text-xl md:text-2xl text-fg-muted font-display"
            >
              <span>I build as a</span>
              <span className="relative inline-block min-h-[1.5em] min-w-[160px] sm:min-w-[220px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="absolute left-0 font-bold neon-text-glow"
                    style={{ color: "#00ff9f" }}
                  >
                    {profile.roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-fg-muted"
            >
              {profile.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-bg transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "#00ff9f",
                  boxShadow: "0 0 24px rgba(0,255,159,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(0,255,159,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(0,255,159,0.35)";
                }}
              >
                View Projects
                <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
                  "Hi Ankit — let's talk"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200"
                style={{
                  border: "1px solid rgba(0,255,159,0.28)",
                  background: "rgba(0,255,159,0.05)",
                  color: "#eef2ff",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,255,159,0.55)";
                  el.style.background = "rgba(0,255,159,0.1)";
                  el.style.color = "#00ff9f";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,255,159,0.28)";
                  el.style.background = "rgba(0,255,159,0.05)";
                  el.style.color = "#eef2ff";
                }}
              >
                <Mail size={15} />
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* Right: photo orb + quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="order-first flex flex-col items-center gap-4 sm:gap-6 lg:order-none lg:gap-8"
          >
            <div className="relative h-40 w-40 sm:h-52 sm:w-52 lg:h-60 lg:w-60 xl:h-68 xl:w-68">
              {/* Outer halo */}
              <div
                className="absolute -inset-10 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                  background: "conic-gradient(from 0deg, #00ff9f, #ff1a6b, #ffcc00, #00d0ff, #00ff9f)",
                }}
              />

              {/* Spinning conic ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: "conic-gradient(from 0deg, #00ff9f 0%, #ff1a6b 33%, #ffcc00 66%, #00d0ff 85%, #00ff9f 100%)",
                }}
              />

              {/* Inner dark mask */}
              <div className="absolute inset-[5px] overflow-hidden rounded-full bg-bg backdrop-blur-xl">
                {/* Counter-rotating inner glow */}
                <div
                  className="absolute inset-4 rounded-full opacity-40 blur-2xl"
                  style={{
                    background: "conic-gradient(from 180deg, #00ff9f, transparent 35%, #ff1a6b, transparent 70%, #ffcc00)",
                    animation: "spin-slow 35s linear infinite reverse",
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

              {/* Accent dots */}
              <span
                aria-hidden
                className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
                style={{
                  background: "#00ff9f",
                  boxShadow: "0 0 16px #00ff9f, 0 0 36px rgba(0,255,159,0.5)",
                }}
              />
              <span
                aria-hidden
                className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
                style={{
                  background: "#ff1a6b",
                  boxShadow: "0 0 16px #ff1a6b, 0 0 36px rgba(255,26,107,0.5)",
                }}
              />
            </div>

            {/* Gita quote removed per request */}
            {false && (
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
                    <span className="gradient-text not-italic mr-1 text-base">✦</span>
                    &ldquo;{quotes[quoteIdx].text}&rdquo;
                  </p>
                  {quotes[quoteIdx].author && (
                    <p className="font-mono text-[11px] tracking-wide text-fg-subtle">
                      — {quotes[quoteIdx].author}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div
          className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "#414d63" }}
        >
          Scroll
          <span
            className="h-8 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(0,255,159,0.4), transparent)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
