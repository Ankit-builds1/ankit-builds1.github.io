"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { projects } from "@/lib/data";
import ProjectVisual, { type ProjectVisualKind } from "./ProjectVisual";
import SectionHeading from "./SectionHeading";

const visualKinds: ProjectVisualKind[] = ["signal", "decision", "cyberwatch", "shadowguard"];

const onMouseMove = (event: MouseEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading
          number="04"
          title="Selected Projects"
          note={`${projects.length} case studies across biomedical signals, agentic detection, and local-first AI security.`}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.09, ease: "easeOut" }}
              onMouseMove={onMouseMove}
              className="spotlight project-card studio-surface flex h-full min-w-0 flex-col p-5 sm:p-6"
            >
              <ProjectVisual kind={visualKinds[index] ?? "signal"} />

              <header className="mt-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="folio">P.{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-fg sm:text-[1.75rem]">
                    {project.title}
                  </h3>
                  {project.status === "ongoing" ? (
                    <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-blue">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
                      In Progress
                    </p>
                  ) : null}
                </div>

                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link shrink-0"
                    aria-label={`Open repository for ${project.title}`}
                  >
                    <span>Repository</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ) : null}
              </header>

              <p className="mt-5 font-display text-lg font-semibold leading-snug text-fg">
                {project.blurb}
              </p>
              <p className="mt-3 text-sm leading-6 text-fg-muted sm:text-[0.95rem]">
                {project.details}
              </p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-bg/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-fg-subtle"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
