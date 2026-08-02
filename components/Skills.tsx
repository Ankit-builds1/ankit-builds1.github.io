"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

/* Flatten all skills and split into two ticker rows */
const allSkills = skills.flatMap((g) => g.items.map((item) => ({ item, group: g.group })));
const mid = Math.ceil(allSkills.length / 2);
const row1 = allSkills.slice(0, mid);
const row2 = allSkills.slice(mid);

const groupColors: Record<string, string> = {
  "Languages": "#00ff9f",
  "ML & Deep Learning": "#00d0ff",
  "LLM & Generative AI": "#ff1a6b",
  "MLOps & Deployment": "#ffcc00",
  "Data & Analysis": "#00d0ff",
  "Tools & Platforms": "#7885a0",
};

function SkillChip({ item, group }: { item: string; group: string }) {
  const color = groupColors[group] ?? "#7885a0";
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-lg px-3.5 py-2 font-mono text-sm font-medium transition-all duration-200 mx-1.5"
      style={{
        border: `1px solid ${color}28`,
        background: `${color}08`,
        color: "#7885a0",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = color;
        el.style.borderColor = `${color}55`;
        el.style.background = `${color}12`;
        el.style.boxShadow = `0 0 12px ${color}30`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "#7885a0";
        el.style.borderColor = `${color}28`;
        el.style.background = `${color}08`;
        el.style.boxShadow = "none";
      }}
    >
      {item}
    </span>
  );
}

function TickerRow({ items, reverse = false }: { items: typeof row1; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="group relative overflow-hidden py-1.5"
      style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24"
        style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24"
        style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }}
      />
      <div
        className="flex"
        style={{
          animation: reverse ? "marquee-r 34s linear infinite" : "marquee 28s linear infinite",
          width: "max-content",
          animationPlayState: "running",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
      >
        {doubled.map((s, i) => (
          <SkillChip key={`${s.item}-${i}`} item={s.item} group={s.group} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative px-0 py-28 overflow-hidden">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute -top-8 left-0 font-display font-black leading-none select-none pl-6"
        style={{ fontSize: "clamp(4.5rem,18vw,16rem)", color: "rgba(0,208,255,0.025)" }}
        aria-hidden
      >
        05
      </div>

      <div className="mx-auto max-w-6xl px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex items-center gap-4"
        >
          <span className="font-mono text-sm" style={{ color: "#414d63" }}>05 —</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
            Stack
          </h2>
          <div
            className="flex-1 h-px ml-2"
            style={{ background: "linear-gradient(to right, rgba(0,208,255,0.35), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl px-6 mb-8"
      >
        <div className="flex flex-wrap gap-3">
          {skills.map((g) => {
            const color = groupColors[g.group] ?? "#7885a0";
            return (
              <span key={g.group} className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider" style={{ color: "#414d63" }}>
                <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                {g.group}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Ticker rows — full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <TickerRow items={row1} reverse={false} />
        <TickerRow items={row2} reverse={true} />
      </motion.div>
    </section>
  );
}
