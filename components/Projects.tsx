import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import ProjectVisual, { type ProjectVisualKind } from "./ProjectVisual";
import SectionHeading from "./SectionHeading";

const visualKinds: ProjectVisualKind[] = [
  "signal",
  "decision",
  "speech",
  "vision",
];

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading
          number="04"
          title="Selected Projects"
          note={`${projects.length} case studies across biomedical signals, security, speech, and vision.`}
        />

        <div className="mt-14 space-y-20">
          {projects.map((project, index) => (
            <article key={project.title}>
              <header className="grid gap-4 border-t border-border-strong pt-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start">
                <span className="folio">P.{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="max-w-4xl font-display text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-fg">
                    {project.title}
                  </h3>
                  {project.status === "ongoing" ? (
                    <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                      In Progress
                    </p>
                  ) : null}
                </div>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link justify-self-start py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:justify-self-end"
                    aria-label={`Open repository for ${project.title}`}
                  >
                    Repository
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                ) : null}
              </header>

              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(17rem,5fr)_minmax(0,7fr)] lg:items-start lg:gap-12">
                <ProjectVisual kind={visualKinds[index] ?? "signal"} />

                <div>
                  <p className="font-display text-xl font-semibold leading-snug text-fg sm:text-2xl">
                    {project.blurb}
                  </p>
                  <p className="mt-5 max-w-[70ch] text-base leading-7 text-fg-muted">
                    {project.details}
                  </p>

                  <ul className="mt-7 flex flex-wrap border-y border-border py-3">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border-l border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-fg-subtle first:border-l-0 first:pl-0"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
