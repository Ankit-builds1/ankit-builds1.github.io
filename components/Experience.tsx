"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading number="02" title="Experience" />

        <ol className="relative mt-12 ml-2 border-l border-border-strong md:ml-4">
          {experience.map((item, index) => (
            <motion.li
              key={`${item.org}-${item.role}`}
              className="experience-entry relative grid gap-5 border-b border-border py-8 pl-8 last:border-b-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10 md:pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.09,
                ease: "easeOut",
              }}
            >
              <span
                className={`absolute -left-[0.44rem] top-10 h-3.5 w-3.5 rounded-full border ring-4 ring-bg ${
                  item.status === "current"
                    ? "border-mint bg-mint"
                    : "border-blue bg-blue"
                }`}
                aria-hidden
              />

              <div>
                <p className="font-mono text-xs leading-relaxed uppercase tracking-[0.08em] text-fg-muted">
                  {item.period}
                </p>
                {item.status === "current" ? (
                  <span className="status-badge status-current mt-3 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-mint">
                    <i
                      className="h-1.5 w-1.5 rounded-full bg-mint motion-safe:animate-ping"
                      aria-hidden
                    />
                    Current
                  </span>
                ) : null}
                {item.status === "completed" ? (
                  <span className="status-badge status-completed mt-3 inline-flex items-center rounded-full border border-blue/30 bg-blue/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-blue">
                    Completed
                  </span>
                ) : null}
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-3xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-semibold text-accent">{item.org}</p>
                <p className="mt-5 max-w-[68ch] text-base leading-7 text-fg-muted">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
