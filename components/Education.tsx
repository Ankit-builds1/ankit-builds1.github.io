"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { educationHistory } from "@/lib/data";

const accentColors = [
  { color: "#00d0ff", glow: "rgba(0,208,255,0.25)", icon: "rgba(0,208,255,0.15)", iconBorder: "rgba(0,208,255,0.3)" },
  { color: "#ffcc00", glow: "rgba(255,204,0,0.2)", icon: "rgba(255,204,0,0.12)", iconBorder: "rgba(255,204,0,0.3)" },
  { color: "#00ff9f", glow: "rgba(0,255,159,0.2)", icon: "rgba(0,255,159,0.12)", iconBorder: "rgba(0,255,159,0.3)" },
];

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-28 overflow-hidden">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute -top-8 -left-6 font-display font-black leading-none select-none"
        style={{ fontSize: "clamp(4.5rem,18vw,16rem)", color: "rgba(0,208,255,0.025)" }}
        aria-hidden
      >
        03
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
          <span className="font-mono text-sm" style={{ color: "#414d63" }}>03 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
            Education
          </h2>
          <div
            className="flex-1 h-px ml-2"
            style={{ background: "linear-gradient(to right, rgba(0,208,255,0.35), transparent)" }}
          />
        </motion.div>

        <div className="space-y-3">
          {educationHistory.map((edu, i) => {
            const accent = accentColors[i % accentColors.length];
            return (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: "easeOut" }}
                className="group flex flex-col gap-3 rounded-2xl p-5 backdrop-blur-sm transition-all duration-300 sm:flex-row sm:items-center"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  borderLeft: `3px solid ${accent.color}`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `rgba(255,255,255,0.035)`;
                  el.style.boxShadow = `0 0 30px ${accent.glow}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.02)";
                  el.style.boxShadow = "none";
                }}
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{
                    background: accent.icon,
                    border: `1px solid ${accent.iconBorder}`,
                  }}
                >
                  <GraduationCap size={20} style={{ color: accent.color }} strokeWidth={2.2} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-display text-base sm:text-lg font-bold text-fg">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-fg-muted">
                    {edu.school}
                    {edu.board && (
                      <>
                        <span style={{ color: "#414d63" }}> · </span>
                        <span style={{ color: "#414d63" }}>{edu.board}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
                  <span className="font-mono text-xs" style={{ color: "#414d63" }}>
                    {edu.period}
                  </span>
                  {edu.grade && (
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-xs font-medium"
                      style={{
                        border: `1px solid ${accent.iconBorder}`,
                        background: accent.icon,
                        color: accent.color,
                      }}
                    >
                      {edu.grade}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
