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

test("keeps content semantics and typography intentional", () => {
  const about = read("components/About.tsx");
  const hero = read("components/Hero.tsx");
  const footer = read("components/Footer.tsx");
  const navbar = read("components/Navbar.tsx");
  const projects = read("components/Projects.tsx");
  const styles = read("app/globals.css");
  const statsLedger = about.match(/<dl[\s\S]*?<\/dl>/)?.[0] ?? "";

  assert.ok(about.indexOf("<dt") < about.indexOf("<dd"));
  assert.doesNotMatch(statsLedger, /<p className=/);
  assert.doesNotMatch(statsLedger, /className="contents"/);
  assert.match(hero, /alt=\{`Portrait of \$\{profile\.name\}`\}/);
  assert.doesNotMatch(hero, /alt=\{`\$\{profile\.name\} in Bhubaneswar`\}/);
  assert.match(hero, /Portrait \/ \{profile\.name\}/);
  assert.doesNotMatch(hero, /Portrait \/ 2026/);
  assert.match(footer, /Built with Next\.js &amp; Tailwind/);
  assert.doesNotMatch(navbar, /font-mono text-(?:\[11px\]|xs) uppercase/);
  assert.doesNotMatch(projects, /className="text-link[^"]*font-mono/);
  assert.match(
    styles,
    /\.skip-link \{[\s\S]*?font-family: var\(--font-sans\);/
  );
});
