import SectionHeading from "./SectionHeading";

const stats = [
  { value: "87%", label: "EEG accuracy", sub: "Sleep-stage TCN" },
  { value: "99.9%", label: "Malware precision", sub: "25 family classifier" },
  { value: "3", label: "Internships", sub: "ApexDevs · TDA · EdiGlobe" },
  { value: "10+", label: "Certifications", sub: "Oracle · Stanford · Google" },
];

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading number="01" title="About" />

        <dl className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg p-4 sm:p-5">
              <dd className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-none tracking-[-0.04em] text-accent">
                {stat.value}
              </dd>
              <dt className="mt-3 text-sm font-semibold text-fg">{stat.label}</dt>
              <p className="mt-1 font-mono text-[10px] leading-relaxed uppercase tracking-[0.06em] text-fg-subtle">
                {stat.sub}
              </p>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(15rem,2fr)] md:gap-16">
          <div className="space-y-6">
            <p className="max-w-[65ch] text-lg leading-8 text-fg-muted">
              I&apos;m a final-year B.Tech CSE student at CUTM Bhubaneswar who
              fell hard for AI after a sleep-stage classifier I built stalled at
              47% accuracy. One overlooked{" "}
              <strong className="font-semibold text-fg">resampling bug</strong>{" "}
              later, it hit 87% — and the lesson stuck: the details everyone
              skips are usually where the answers hide.
            </p>
            <p className="max-w-[65ch] text-lg leading-8 text-fg-muted">
              Now I build hybrid AI systems designed to survive past the
              notebook — agentic pipelines that know when to escalate,
              biomedical models paired with LLMs that{" "}
              <strong className="font-semibold text-fg">
                write their own reports
              </strong>
              , and forensic stacks that can show you what they see. I care
              less about leaderboards and more about whether the system{" "}
              <strong className="font-semibold text-fg">breaks honestly</strong>{" "}
              when it should.
            </p>
          </div>

          <aside className="self-start border-l border-accent pl-6 md:mt-2">
            <p className="eyebrow text-accent">Currently exploring</p>
            <p className="mt-4 font-display text-xl leading-snug text-fg">
              Multi-agent reasoning, on-device LLM inference, and getting small
              models to punch above their weight.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
