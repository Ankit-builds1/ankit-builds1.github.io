import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path, options = {}) => {
  const absolute = resolve(root, path);
  if (options.flag === "optional" && !existsSync(absolute)) return undefined;
  return readFileSync(absolute, "utf8");
};

test("uses the approved experience timeline", () => {
  const data = read("lib/data.ts");
  assert.match(data, /role: "AI\/ML Intern"/);
  assert.match(data, /org: "Labmentix"/);
  assert.match(data, /period: "Jul 2026 – Present"/);
  assert.match(data, /status: "current"/);
  assert.match(data, /org: "Infotact Solutions"[\s\S]*?period: "Aug 2026 – Present"[\s\S]*?status: "current"/);
  assert.match(data, /org: "ApexDevs"[\s\S]*?period: "May 2026 – Jul 2026"[\s\S]*?status: "completed"/);
  assert.doesNotMatch(data, /current\?: boolean/);
});

test("uses the approved four projects in order", () => {
  const data = read("lib/data.ts");
  const titles = [...data.matchAll(/title: "([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(titles.slice(0, 4), [
    "Sleep Stage Detection & Clinical Report Generation",
    "Hierarchical Agentic Malware Classification",
    "CyberWatch AI",
    "ShadowGuard AI",
  ]);
  assert.doesNotMatch(data, /SpeakSense|CMFD/);
});

test("uses the refined tech studio motion shell", () => {
  const layout = read("app/layout.tsx");
  const styles = read("app/globals.css");
  const pkg = read("package.json");
  assert.match(layout, /Space_Grotesk/);
  assert.match(layout, /MotionProvider/);
  assert.match(layout, /AnimatedBackground/);
  assert.match(layout, /CustomCursor/);
  assert.doesNotMatch(layout, /Newsreader/);
  assert.match(pkg, /"framer-motion"/);
  assert.match(styles, /--canvas: #0b1112/i);
  assert.match(styles, /--mint: #7ef5ca/i);
  assert.match(styles, /--blue: #7eb2ff/i);
  assert.match(styles, /@keyframes orbit-one/);
  assert.match(styles, /@keyframes spin-slow/);
  assert.match(styles, /@keyframes marquee-left/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("reacts to custom cursor capability changes after hydration", () => {
  const cursor = read("components/CustomCursor.tsx");
  assert.match(cursor, /finePointer\.addEventListener\("change", syncCursor\)/);
  assert.match(cursor, /reducedMotion\.addEventListener\("change", syncCursor\)/);
  assert.match(cursor, /finePointer\.removeEventListener\("change", syncCursor\)/);
  assert.match(cursor, /reducedMotion\.removeEventListener\("change", syncCursor\)/);
});

test("renders explicit experience statuses with current-only motion", () => {
  const source = read("components/Experience.tsx");
  assert.match(source, /^"use client";/);
  assert.match(source, /item\.status === "current"/);
  assert.match(source, /item\.status === "completed"/);
  assert.match(source, /Current/);
  assert.match(source, /Completed/);
  assert.match(source, /whileInView/);
  assert.doesNotMatch(source, /item\.current/);
});

test("restores education reveal motion", () => {
  const source = read("components/Education.tsx");
  assert.match(source, /^"use client";/);
  assert.match(source, /whileInView/);
  assert.match(source, /viewport=\{\{ once: true/);
});

test("restores hero motion without restoring quotes", () => {
  const hero = read("components/Hero.tsx");
  assert.match(hero, /^"use client";/);
  assert.match(hero, /AnimatePresence/);
  assert.match(hero, /useReducedMotion/);
  assert.match(hero, /2400/);
  assert.match(hero, /profile-photo-orbit/);
  assert.doesNotMatch(hero, /quotes|quoteIdx|blockquote|Bhagavad|Gita/);
});

test("uses the approved metric-free About content", () => {
  const about = read("components/About.tsx");
  assert.match(about, /^"use client";/);
  assert.match(about, /I'm a final-year B\.Tech CSE \(DAML\) student/);
  assert.match(about, /Agentic systems/);
  assert.match(about, /AI security/);
  assert.doesNotMatch(about, /const stats|<dl|87%|99\.9%/);
  assert.equal(read("lib/quotes.ts", { flag: "optional" }), undefined);
});

test("uses animated bespoke project cards", () => {
  const projects = read("components/Projects.tsx");
  const visual = read("components/ProjectVisual.tsx");
  assert.match(projects, /^"use client";/);
  assert.match(projects, /onMouseMove/);
  assert.match(projects, /className="spotlight/);
  assert.match(projects, /whileInView/);
  assert.match(
    projects,
    /project\.tags\.map\([\s\S]*?className="[^"]*text-fg-muted[^"]*"/,
  );
  assert.match(visual, /"cyberwatch"/);
  assert.match(visual, /"shadowguard"/);
  assert.doesNotMatch(visual, /"speech"|"vision"/);
});

test("restores the skills marquees and contact reveals", () => {
  const skills = read("components/Skills.tsx");
  const contact = read("components/Contact.tsx");
  assert.match(skills, /^"use client";/);
  assert.match(skills, /skills-marquee-left/);
  assert.match(skills, /skills-marquee-right/);
  assert.match(skills, /animationPlayState = "paused"/);
  assert.match(contact, /^"use client";/);
  assert.match(contact, /whileInView/);
});

test("keeps navigation and theme behavior in the selected visual system", () => {
  const nav = read("components/Navbar.tsx");
  const theme = read("components/ThemeToggle.tsx");
  assert.match(nav, /IntersectionObserver/);
  assert.match(nav, /aria-expanded/);
  assert.match(nav, /bg-bg\/90|backdrop-blur/);
  assert.match(theme, /localStorage\.setItem\("theme"/);
});

test("closes the final browser QA motion and contrast gaps", () => {
  const styles = read("app/globals.css");
  const experience = read("components/Experience.tsx");
  const cursor = read("components/CustomCursor.tsx");
  const about = read("components/About.tsx");

  assert.match(styles, /@keyframes halo-pulse/);
  assert.match(styles, /@keyframes spin-reverse/);
  assert.match(
    styles,
    /\.portrait-halo\s*\{[\s\S]*?animation:\s*halo-pulse[^;]*;/,
  );
  assert.match(
    styles,
    /\.portrait-inner-glow\s*\{[\s\S]*?animation:\s*spin-reverse[^;]*;/,
  );
  assert.match(
    styles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.portrait-halo,\s*\.portrait-inner-glow\s*\{[\s\S]*?animation:\s*none\s*!important;/,
  );

  assert.match(experience, /className="[^"]*experience-entry[^"]*"/);
  assert.match(styles, /\.experience-entry:hover\s*\{/);

  assert.match(cursor, /var\(--mint\)/);
  assert.doesNotMatch(cursor, /#7ef5ca|rgba\(126,\s*245,\s*202/i);
  assert.equal((cursor.match(/aria-hidden="true"/g) ?? []).length, 2);

  assert.match(
    about,
    /<span className="eyebrow text-mint">Focus areas<\/span>/,
  );
  assert.equal((about.match(/<p(?:\s|>)/g) ?? []).length, 2);

  for (const component of [
    "components/Hero.tsx",
    "components/Experience.tsx",
    "components/Education.tsx",
    "components/Certifications.tsx",
  ]) {
    assert.doesNotMatch(read(component), /text-fg-subtle/);
  }
});

test("provides user-controlled motion and closes final accessibility review gaps", () => {
  const provider = read("components/MotionProvider.tsx");
  const toggle = read("components/MotionToggle.tsx", { flag: "optional" });
  const nav = read("components/Navbar.tsx");
  const hero = read("components/Hero.tsx");
  const styles = read("app/globals.css");

  assert.ok(toggle, "MotionToggle must provide a persistent pause control");
  assert.match(provider, /data-motion-paused/);
  assert.match(provider, /useMotionPreference/);
  assert.match(toggle, /Pause animations/);
  assert.match(toggle, /Resume animations/);
  assert.match(toggle, /aria-label="Animations"/);
  assert.match(toggle, /aria-pressed=\{motionPaused\}/);
  assert.match(nav, /<MotionToggle \/>/);
  assert.match(hero, /motionPaused/);
  assert.match(hero, /\bpreload\b/);
  assert.doesNotMatch(hero, /\bpriority\b/);
  assert.match(
    styles,
    /\[data-motion-paused="true"\][\s\S]*?animation-play-state:\s*paused\s*!important/,
  );
  assert.match(
    styles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.project-card:hover[\s\S]*?translate:\s*none/,
  );
  assert.match(
    styles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.project-card-link:hover svg[\s\S]*?transform:\s*none/,
  );
  assert.match(styles, /--mint-contrast:/);
  assert.match(styles, /\.status-current[\s\S]*?color:\s*var\(--mint-contrast\)/);
  assert.match(styles, /\.project-card-link:hover[\s\S]*?color:\s*var\(--mint-contrast\)/);
});
