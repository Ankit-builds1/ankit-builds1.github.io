"use client";

import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { projects, type Project } from "@/lib/data";

const projectAccents = [
  { color: "#00ff9f", glow: "rgba(0,255,159,0.18)", tag: "rgba(0,255,159,0.08)", tagBorder: "rgba(0,255,159,0.2)" },
  { color: "#ff1a6b", glow: "rgba(255,26,107,0.18)", tag: "rgba(255,26,107,0.08)", tagBorder: "rgba(255,26,107,0.2)" },
  { color: "#00d0ff", glow: "rgba(0,208,255,0.18)", tag: "rgba(0,208,255,0.08)", tagBorder: "rgba(0,208,255,0.2)" },
  { color: "#ffcc00", glow: "rgba(255,204,0,0.18)", tag: "rgba(255,204,0,0.08)", tagBorder: "rgba(255,204,0,0.2)" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = projectAccents[index % projectAccents.length];

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: "easeOut" }}
      onMouseMove={onMouseMove}
      className="spotlight group relative flex flex-col rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accent.color}30`;
        el.style.boxShadow = `0 0 40px ${accent.glow}, 0 20px 60px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Accent top bar */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{ background: `linear-gradient(to right, ${accent.color}, transparent)` }}
      />

      <div className="flex flex-col flex-1 p-6">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <span className="text-3xl shrink-0" aria-hidden>{project.emoji}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-bold leading-tight text-fg">
                {project.title}
              </h3>
              {project.status === "ongoing" && (
                <span
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium"
                  style={{
                    border: "1px solid rgba(255,204,0,0.3)",
                    background: "rgba(255,204,0,0.08)",
                    color: "#ffcc00",
                  }}
                >
                  <span className="relative grid place-items-center">
                    <span
                      className="absolute h-1.5 w-1.5 animate-ping rounded-full opacity-75"
                      style={{ background: "#ffcc00" }}
                    />
                    <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "#ffcc00" }} />
                  </span>
                  In Progress
                </span>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-full px-3 font-mono text-[11px] uppercase tracking-wide transition-all duration-200"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#7885a0",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = accent.color;
                el.style.color = accent.color;
                el.style.boxShadow = `0 0 12px ${accent.glow}`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.color = "#7885a0";
                el.style.boxShadow = "none";
              }}
              aria-label={`Open GitHub repository for ${project.title}`}
            >
              GitHub
            </a>
          )}
          {project.demoHref && (
            <a
              href={project.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-full px-3 font-mono text-[11px] uppercase tracking-wide transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#7885a0" }}
              aria-label={`Open live demo for ${project.title}`}
              title="Live demo"
            >
              Demo
            </a>
          )}
          </div>
        </div>

        <p className="relative z-10 mt-4 text-base font-semibold text-fg leading-snug">
          {project.blurb}
        </p>
        <p className="relative z-10 mt-2 text-sm leading-relaxed text-fg-muted">
          {project.details}
        </p>

        <div className="relative z-10 mt-5 flex flex-wrap gap-1.5 mt-auto pt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md font-mono px-2.5 py-1 text-[11px] transition-all"
              style={{
                border: `1px solid ${accent.tagBorder}`,
                background: accent.tag,
                color: "#7885a0",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 overflow-hidden">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute -top-8 -left-6 font-display font-black leading-none select-none"
        style={{ fontSize: "clamp(4.5rem,18vw,16rem)", color: "rgba(255,204,0,0.025)" }}
        aria-hidden
      >
        04
      </div>

      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 flex-1">
            <span className="font-mono text-sm" style={{ color: "#414d63" }}>04 —</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
              Projects
            </h2>
            <div
              className="flex-1 h-px ml-2"
              style={{ background: "linear-gradient(to right, rgba(255,204,0,0.35), transparent)" }}
            />
          </div>
          <p className="hidden sm:block font-mono text-sm shrink-0" style={{ color: "#414d63" }}>
            {projects.length} featured
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
