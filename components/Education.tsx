"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { educationHistory } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-sm text-fg-subtle">03 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Education
          </h2>
        </motion.div>

        <div className="space-y-3">
          {educationHistory.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="surface-hover group flex flex-col gap-3 rounded-2xl border border-border bg-bg-card p-5 backdrop-blur-sm transition-all hover:border-border-strong sm:flex-row sm:items-center"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet via-fuchsia to-cyan text-bg shadow-lg shadow-violet/20">
                <GraduationCap size={20} strokeWidth={2.2} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-display text-base sm:text-lg font-semibold text-fg">
                  {edu.degree}
                </p>
                <p className="text-sm text-fg-muted">
                  {edu.school}
                  {edu.board && (
                    <>
                      <span className="text-fg-subtle"> · </span>
                      <span className="text-fg-subtle">{edu.board}</span>
                    </>
                  )}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
                <span className="font-mono text-xs text-fg-subtle">
                  {edu.period}
                </span>
                {edu.grade && (
                  <span className="surface rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-fg">
                    {edu.grade}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
