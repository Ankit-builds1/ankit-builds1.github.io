"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-sm text-fg-subtle">02 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[14px] sm:left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-violet via-fuchsia to-cyan opacity-40"
          />

          <ol className="space-y-6">
            {experience.map((item, i) => (
              <motion.li
                key={`${item.org}-${item.role}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
                className="relative pl-12 sm:pl-16"
              >
                <span className="absolute left-0 top-3 grid h-7 w-7 sm:h-9 sm:w-9 place-items-center rounded-full border border-border bg-bg-card backdrop-blur-sm">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/30 to-cyan/30 blur-md" />
                  <Briefcase
                    size={14}
                    className="relative text-fg"
                    strokeWidth={2.2}
                  />
                </span>

                <div className="surface-hover rounded-2xl border border-border bg-bg-card p-5 sm:p-6 backdrop-blur-sm transition-all hover:border-border-strong">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
                    <span className="font-mono text-fg-subtle">{item.period}</span>
                    {item.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-300 light:text-emerald-700 light:bg-emerald-500/15">
                        <span className="relative grid place-items-center">
                          <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-lg sm:text-xl font-semibold text-fg">
                    {item.role}
                  </h3>
                  <p className="text-sm text-fg-muted">
                    <span className="text-fg-subtle">@</span> {item.org}
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
