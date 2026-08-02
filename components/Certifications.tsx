"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/lib/data";

export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-sm text-fg-subtle">04 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Certifications
          </h2>
        </motion.div>

        <div className="space-y-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="surface-hover group flex flex-col gap-3 rounded-2xl border border-border bg-bg-card p-5 backdrop-blur-sm transition-all hover:border-border-strong sm:flex-row sm:items-center"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-fuchsia-500 text-bg shadow-lg shadow-orange-500/20">
                <Award size={20} strokeWidth={2.2} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-display text-base sm:text-lg font-semibold text-fg">
                  {cert.title}
                </p>
                <p className="text-sm text-fg-muted">
                  {cert.issuer}
                  {cert.credentialId && (
                    <>
                      <span className="text-fg-subtle"> · </span>
                      <span className="font-mono text-xs text-fg-subtle">
                        ID: {cert.credentialId}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="shrink-0">
                <span className="font-mono text-xs text-fg-subtle">
                  {cert.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
