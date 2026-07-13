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
  assert.match(data, /org: "ApexDevs"[\s\S]*?period: "Jun 2026 – Jul 2026"[\s\S]*?status: "completed"/);
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
