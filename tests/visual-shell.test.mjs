import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

test("replaces the generic neon shell", () => {
  assert.doesNotMatch(read("app/layout.tsx"), /AnimatedBackground|CustomCursor|Exo_2/);
  assert.doesNotMatch(read("app/globals.css"), /animate-spin-slow|marquee|neon-glow|gradient-text/);
});

test("keeps the field-notes palette restrained and readable", () => {
  const styles = read("app/globals.css");
  assert.doesNotMatch(styles, /--color-annotation|--annotation:/);
  assert.match(styles, /--ink-subtle: #646760/);
  assert.match(styles, /\n:root\.light \{\n  color-scheme: light;/);
  assert.match(read("components/ThemeToggle.tsx"), /theme-label-dark/);
  assert.match(read("components/ThemeToggle.tsx"), /theme-label-light/);
});

test("uses the field-notes content structure", () => {
  assert.match(read("components/Hero.tsx"), /profile-photo-card/);
  assert.match(read("components/Projects.tsx"), /ProjectVisual/);
  assert.match(read("components/Skills.tsx"), /skills-grid/);
  assert.doesNotMatch(read("components/Skills.tsx"), /TickerRow/);
});
