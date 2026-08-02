"use client";

import { motion } from "framer-motion";
import { educationHistory } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="border-b border-border">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionHeading number="03" title="Education" />
        </motion.div>

        <div className="mt-12 border-t border-border-strong">
          {educationHistory.map((education, index) => (
            <motion.article
              key={education.school}
              className="studio-surface grid gap-5 !rounded-none !border-x-0 !border-t-0 px-4 py-7 md:grid-cols-[11rem_minmax(0,1fr)] md:items-start md:gap-10 md:px-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.09,
                ease: "easeOut",
              }}
            >
              <div className="md:pt-1">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
                  {education.period}
                </p>
                {education.grade ? (
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-blue">
                    Result · {education.grade}
                  </p>
                ) : null}
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.015em] text-fg sm:text-2xl">
                  {education.degree}
                </h3>
                <p className="mt-2 text-sm leading-6 text-fg-muted">
                  {education.school}
                  {education.board ? (
                    <>
                      <span className="text-fg-subtle"> · </span>
                      <span>{education.board}</span>
                    </>
                  ) : null}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
