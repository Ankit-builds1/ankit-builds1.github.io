import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading number="02" title="Experience" />

        <ol className="mt-12 border-t border-border-strong">
          {experience.map((item) => (
            <li
              key={`${item.org}-${item.role}`}
              className="grid gap-5 border-b border-border py-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
            >
              <div>
                <p className="font-mono text-xs leading-relaxed uppercase tracking-[0.08em] text-fg-subtle">
                  {item.period}
                </p>
                {item.status === "current" ? (
                  <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                    Current
                  </p>
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
