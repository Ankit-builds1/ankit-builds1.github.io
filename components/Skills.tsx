import { skills } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const groupLayouts = [
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="section-wrap">
        <SectionHeading
          number="05"
          title="Stack"
          note="The tools I use to take models from raw data to working systems."
        />

        <div className="skills-grid mt-12">
          {skills.map((skillGroup, index) => (
            <article
              key={skillGroup.group}
              className={`${groupLayouts[index]} border-b border-r border-border bg-bg p-5 sm:p-7`}
            >
              <header className="flex items-baseline gap-3 border-b border-border pb-4">
                <span className="font-mono text-[10px] tracking-[0.1em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-semibold leading-tight text-fg sm:text-2xl">
                  {skillGroup.group}
                </h3>
              </header>

              <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
                {skillGroup.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-2.5 text-sm leading-5 text-fg-muted last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
