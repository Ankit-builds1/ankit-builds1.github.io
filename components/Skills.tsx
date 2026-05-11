"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-sm text-fg-subtle">06 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Stack
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.1, ease: "easeOut" }}
              className="rounded-2xl border border-border bg-bg-card p-6 backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-wider text-fg-subtle">
                {group.group}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="surface surface-hover rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-fg transition-all hover:border-border-strong hover:-translate-y-0.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
