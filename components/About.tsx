"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

const stats = [
  { value: "87%", label: "EEG accuracy", sub: "Sleep-stage TCN", color: "#00ff9f", glow: "rgba(0,255,159,0.3)" },
  { value: "91%", label: "Malware accuracy", sub: "Confidence thresholding", color: "#ff1a6b", glow: "rgba(255,26,107,0.3)" },
  { value: "5", label: "Internships", sub: "Infotact · Labmentix · ApexDevs · TDA · EdiGlobe", color: "#00d0ff", glow: "rgba(0,208,255,0.3)" },
  { value: "10+", label: "Certifications", sub: "Oracle · Stanford · Google", color: "#ffcc00", glow: "rgba(255,204,0,0.3)" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 overflow-hidden">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute -top-8 -left-6 font-display font-black leading-none select-none"
        style={{ fontSize: "clamp(4.5rem,18vw,16rem)", color: "rgba(0,255,159,0.025)" }}
        aria-hidden
      >
        01
      </div>

      <div className="mx-auto max-w-6xl relative">
        {/* Section header */}
        <motion.div {...fadeUp} className="mb-14 flex items-center gap-4">
          <span className="font-mono text-sm" style={{ color: "#414d63" }}>01 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
            About
          </h2>
          <div className="flex-1 h-px ml-2" style={{ background: "linear-gradient(to right, rgba(0,255,159,0.3), transparent)" }} />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className="rounded-2xl p-5"
              style={{
                background: `rgba(255,255,255,0.02)`,
                border: `1px solid rgba(255,255,255,0.06)`,
              }}
            >
              <p
                className="font-display font-black leading-none"
                style={{
                  fontSize: "clamp(2rem,5vw,3.2rem)",
                  color: stat.color,
                  textShadow: `0 0 24px ${stat.glow}`,
                }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-fg">{stat.label}</p>
              <p className="mt-0.5 font-mono text-[11px]" style={{ color: "#414d63" }}>{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio + Currently Exploring */}
        <div className="grid gap-8 md:grid-cols-5">
          <motion.div {...fadeUp} className="md:col-span-3 space-y-5">
            <p className="text-lg leading-relaxed text-fg-muted">
              I&apos;m a final-year B.Tech CSE student at CUTM Bhubaneswar who
              fell hard for AI after a sleep-stage classifier I built stalled at
              47% accuracy. One overlooked{" "}
              <span className="font-semibold text-fg">resampling bug</span> later,
              it hit 87% — and the lesson stuck: the details everyone skips are
              usually where the answers hide.
            </p>
            <p className="text-lg leading-relaxed text-fg-muted">
              Now I build hybrid AI systems designed to survive past the
              notebook — agentic pipelines that know when to escalate,
              biomedical models paired with LLMs that{" "}
              <span className="font-semibold text-fg">write their own reports</span>,
              and forensic stacks that can show you what they see. I care less
              about leaderboards and more about whether the system{" "}
              <span className="font-semibold text-fg">breaks honestly</span> when it should.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="md:col-span-2">
            <div
              className="rounded-2xl p-5 backdrop-blur-sm h-full"
              style={{
                border: "1px solid rgba(0,255,159,0.12)",
                background: "rgba(0,255,159,0.03)",
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-bg"
                  style={{ background: "linear-gradient(135deg, #00ff9f, #00d0ff)" }}
                >
                  <Sparkles size={17} />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                    Currently exploring
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
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
