"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={onMouseMove}
      className="spotlight group relative flex flex-col rounded-2xl border border-border bg-bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-border-strong hover:-translate-y-1"
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="text-3xl shrink-0" aria-hidden>
            {project.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-semibold leading-tight">
              {project.title}
            </h3>
            {project.status === "ongoing" && (
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300 light:bg-amber-500/15 light:text-amber-700">
                <span className="relative grid place-items-center">
                  <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-amber-400" />
                </span>
                In Progress
              </span>
            )}
          </div>
        </div>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-fg-muted transition-all group-hover:border-violet group-hover:text-violet"
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      <p className="relative z-10 mt-4 text-base font-medium text-fg">
        {project.blurb}
      </p>
      <p className="relative z-10 mt-2 text-sm leading-relaxed text-fg-muted">
        {project.details}
      </p>

      <div className="relative z-10 mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="surface rounded-full border border-border px-2.5 py-1 text-xs text-fg-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex items-baseline justify-between gap-4"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-fg-subtle">05 —</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Selected Projects
            </h2>
          </div>
          <p className="hidden sm:block text-sm text-fg-subtle">{projects.length} featured</p>
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
