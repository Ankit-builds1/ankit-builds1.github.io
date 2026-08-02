import { educationHistory } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading number="03" title="Education" />

        <div className="mt-12 border-t border-border-strong">
          {educationHistory.map((education) => (
            <article
              key={education.school}
              className="grid gap-5 border-b border-border py-7 md:grid-cols-[minmax(0,1fr)_12rem] md:items-start md:gap-10"
            >
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

              <div className="md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
                  {education.period}
                </p>
                {education.grade ? (
                  <p className="mt-2 font-display text-2xl font-semibold text-accent">
                    {education.grade}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
