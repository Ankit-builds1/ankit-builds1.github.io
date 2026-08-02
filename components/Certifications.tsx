import { certifications } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading number="Archive" title="Certifications" />

        <div className="mt-12 border-t border-border-strong">
          {certifications.map((certification) => {
            const title = certification.href ? (
              <a
                href={certification.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {certification.title}
              </a>
            ) : (
              certification.title
            );

            return (
              <article
                key={certification.title}
                className="grid gap-3 border-b border-border py-5 sm:grid-cols-[minmax(0,1fr)_9rem] sm:gap-8"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-fg">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-fg-muted">
                    {certification.issuer}
                    {certification.credentialId ? (
                      <span className="font-mono text-[11px] text-fg-subtle">
                        {" "}· ID: {certification.credentialId}
                      </span>
                    ) : null}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle sm:text-right">
                  {certification.date}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
