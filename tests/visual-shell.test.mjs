import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

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
