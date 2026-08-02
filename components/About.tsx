"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const focusAreas = [
  "Agentic systems",
  "AI security",
  "Biomedical signals",
  "APIs & deployment",
];

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading number="01" title="About" />

        <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(15rem,2fr)] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="max-w-[65ch] text-lg leading-8 text-fg-muted">
              {"I'm a final-year B.Tech CSE (DAML) student at CUTM Bhubaneswar, focused on building AI and ML systems end to end—from data preparation and modelling to evaluation and deployment."}
            </p>
            <p className="max-w-[65ch] text-lg leading-8 text-fg-muted">
              {"My work spans agentic pipelines, biomedical signal models, and AI security tools. I care about clean pipelines, honest evaluation, and systems that keep working outside the notebook."}
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="self-start border-l border-mint pl-6 md:mt-2"
          >
            <span className="eyebrow text-mint">Focus areas</span>
            <ul className="mt-5 space-y-3" role="list">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-3 font-display text-lg font-semibold text-fg"
                >
                  <span className="h-px w-4 bg-blue" aria-hidden />
                  {area}
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
