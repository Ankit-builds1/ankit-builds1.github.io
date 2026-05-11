"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const highlights = [
  "87% sleep-stage accuracy",
  "99.90% malware classifier",
  "10 certifications",
  "3 internships",
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-sm text-fg-subtle">01 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            About
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-5">
          <motion.div
            {...fadeUp}
            className="md:col-span-3 space-y-6"
          >
            <div className="flex flex-wrap gap-2">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="surface rounded-full border border-border px-3 py-1 text-xs font-medium text-fg"
                >
                  {h}
                </span>
              ))}
            </div>

            <p className="text-lg leading-relaxed text-fg-muted">
              I&apos;m a final-year B.Tech CSE student at CUTM Bhubaneswar who
              fell hard for AI after a sleep-stage classifier I built stalled at
              47% accuracy. One overlooked{" "}
              <span className="text-fg">resampling bug</span> later, it hit
              87% — and the lesson stuck: the details everyone skips are
              usually where the answers hide.
            </p>

            <p className="text-lg leading-relaxed text-fg-muted">
              Now I build hybrid AI systems designed to survive past the
              notebook — agentic pipelines that know when to escalate,
              biomedical models paired with LLMs that{" "}
              <span className="text-fg">write their own reports</span>, and
              forensic stacks that can show you what they see. I care less
              about leaderboards and more about whether the system{" "}
              <span className="text-fg">breaks honestly</span> when it should.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="md:col-span-2">
            <div className="rounded-2xl border border-border bg-bg-card p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet text-bg">
                  <Sparkles size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-fg-subtle">
                    Currently exploring
                  </p>
                  <p className="mt-1 text-sm text-fg-muted leading-relaxed">
                    Multi-agent reasoning, on-device LLM inference, and getting
                    small models to punch above their weight.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
