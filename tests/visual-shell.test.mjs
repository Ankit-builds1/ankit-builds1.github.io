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
