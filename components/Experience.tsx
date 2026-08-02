"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 overflow-hidden">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute -top-8 -left-6 font-display font-black leading-none select-none"
        style={{ fontSize: "clamp(4.5rem,18vw,16rem)", color: "rgba(255,26,107,0.025)" }}
        aria-hidden
      >
        02
      </div>

      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex items-center gap-4"
        >
          <span className="font-mono text-sm" style={{ color: "#414d63" }}>02 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
            Experience
          </h2>
          <div
            className="flex-1 h-px ml-2"
            style={{ background: "linear-gradient(to right, rgba(255,26,107,0.35), transparent)" }}
          />
        </motion.div>

        <div className="relative">
          {/* Neon timeline line */}
          <div
            aria-hidden
            className="absolute left-[14px] sm:left-[18px] top-3 bottom-3 w-px"
            style={{
              background: "linear-gradient(to bottom, #00ff9f, #ff1a6b, #ffcc00)",
              opacity: 0.35,
              boxShadow: "0 0 8px rgba(0,255,159,0.3)",
            }}
          />

          <ol className="space-y-6">
            {experience.map((item, i) => (
              <motion.li
                key={`${item.org}-${item.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: "easeOut" }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline node */}
                <span
                  className="absolute left-0 top-3 grid h-7 w-7 sm:h-9 sm:w-9 place-items-center rounded-full"
                  style={{
                    border: "1px solid rgba(0,255,159,0.25)",
                    background: "rgba(0,255,159,0.06)",
                    boxShadow: "0 0 16px rgba(0,255,159,0.15)",
                  }}
                >
                  <Briefcase size={13} className="text-fg-muted" strokeWidth={2.2} />
                </span>

                {/* Card */}
                <div
                  className="group rounded-2xl p-5 sm:p-6 backdrop-blur-sm transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(0,255,159,0.2)";
                    el.style.background = "rgba(0,255,159,0.03)";
                    el.style.boxShadow = "0 0 30px rgba(0,255,159,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                    el.style.background = "rgba(255,255,255,0.02)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] sm:text-xs" style={{ color: "#414d63" }}>
                      {item.period}
                    </span>
                    {item.status === "current" && (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium"
                        style={{
                          border: "1px solid rgba(0,255,159,0.3)",
                          background: "rgba(0,255,159,0.08)",
                          color: "#00ff9f",
                        }}
                      >
                        <span className="relative grid place-items-center">
                          <span
                            className="absolute h-1.5 w-1.5 animate-ping rounded-full opacity-75"
                            style={{ background: "#00ff9f" }}
                          />
                          <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "#00ff9f" }} />
                        </span>
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-lg sm:text-xl font-bold text-fg">
                    {item.role}
                  </h3>
                  <p className="text-sm text-fg-muted">
                    <span style={{ color: "#414d63" }}>@</span> {item.org}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
