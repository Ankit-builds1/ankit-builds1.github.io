"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const allSkills = skills.flatMap((skillGroup) =>
  skillGroup.items.map((item) => ({ group: skillGroup.group, item })),
);
const midpoint = Math.ceil(allSkills.length / 2);
const skillRows = [allSkills.slice(0, midpoint), allSkills.slice(midpoint)];

type SkillItem = (typeof allSkills)[number];

function SkillSequence({
  items,
  duplicate = false,
}: {
  items: SkillItem[];
  duplicate?: boolean;
}) {
  return (
    <ul
      className={`skills-sequence${duplicate ? " skills-sequence-duplicate" : ""}`}
      aria-hidden={duplicate ? true : undefined}
    >
      {items.map((skill) => (
        <li className="skill-chip" key={`${skill.group}-${skill.item}`}>
          <span className="skill-chip-group">{skill.group}</span>
          <span className="skill-chip-name">{skill.item}</span>
        </li>
      ))}
    </ul>
  );
}

function TickerRow({ items, reverse = false }: { items: SkillItem[]; reverse?: boolean }) {
  return (
    <div className="skills-ticker">
      <div
        className={reverse ? "skills-marquee-right" : "skills-marquee-left"}
        onMouseEnter={(event) => {
          event.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.animationPlayState = "running";
        }}
      >
        <SkillSequence items={items} />
        <SkillSequence items={items} duplicate />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="overflow-hidden border-b border-border">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading
            number="05"
            title="Stack"
            note="The tools I use to take models from raw data to working systems."
          />
        </motion.div>

        <div className="mt-12 space-y-3" aria-label="Technical skills">
          <TickerRow items={skillRows[0]} />
          <TickerRow items={skillRows[1]} reverse />
        </div>
      </div>
    </section>
  );
}
