# Refined Tech Studio Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rejected field-notes presentation with the approved Refined Tech Studio portfolio, restore the original live motion system, and apply the approved About, Experience, and Projects content changes.

**Architecture:** Keep `app/layout.tsx` and `app/page.tsx` as server components, with narrow client boundaries for Framer Motion and browser behavior. Centralize factual content in `lib/data.ts`, global design/motion primitives in `app/globals.css`, and section-specific markup in focused components. Every production change follows a source-level acceptance test that is observed failing before implementation.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript, Tailwind CSS 4, Framer Motion 12.38, `next/font`, `next/image`, Lucide React, Node test runner.

## Global Constraints

- Work in `D:\portfolio` on branch `codex/model-field-notes`; do not touch the pre-existing untracked `.playwright-mcp/` directory.
- Follow `AGENTS.md` and the installed Next.js 16.2.6 guides for client boundaries, CSS, fonts, and images.
- Selected design is Refined Tech Studio: graphite `#0B1112`, raised surface `#11191A`, text `#ECF4F0`, muted text `#94A39E`, mint `#7EF5CA`, and blue `#7EB2FF`.
- Light mode is canvas `#F3F7F4`, surface `#FFFFFF`, text `#10201C`, muted text `#52635D`, mint `#167A5B`, and blue `#315EAF`.
- Use Space Grotesk for display, DM Sans for body/UI, and JetBrains Mono only for dates, statuses, indices, tags, and technical metadata.
- Restore the live animation behavior from commit `0398016`: hero stagger, 2.4-second role rotation, animated portrait ring, background motion, section reveals, project spotlight/lift, skills marquees, custom cursor, current-status ping, and scroll progress.
- Do not restore the quote carousel, `GradientBlob`, or unrendered Certifications motion.
- Remove the Bhagavad Gita quote and all quote logic; delete `lib/quotes.ts` when unused.
- Remove About metric boxes and render the two approved paragraphs plus the four-item focus rail.
- ApexDevs is `Jun 2026 – Jul 2026`, `Completed`; Labmentix is `Jul 2026 – Present`, `Current`.
- Replace SpeakSense and CMFD with CyberWatch AI and ShadowGuard AI; render no repository control for either new project until the user confirms public links.
- Never invent Labmentix duties, unverified metrics, or project URLs.
- Respect `prefers-reduced-motion`; continuous timers and decorative motion become static when reduced motion is requested.
- Keep skip link, focus-visible styles, semantic headings/lists, status text, mobile navigation semantics, theme persistence, and no horizontal overflow.
- Do not deploy before local user review.

---

### Task 1: Lock the Approved Content Model

**Files:**
- Modify: `tests/visual-shell.test.mjs`
- Modify: `lib/data.ts`

**Interfaces:**
- Consumes: existing `Project`, `Experience`, `projects`, and `experience` exports.
- Produces: `Experience.status?: "current" | "completed"`; final ordered experience and project arrays consumed by later section tasks.

- [ ] **Step 1: Replace the field-notes tests with a failing content acceptance test**

Replace `tests/visual-shell.test.mjs` with:

```js
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
```

- [ ] **Step 2: Run the focused tests and confirm RED**

Run: `node --test tests/visual-shell.test.mjs`

Expected: both tests fail because Labmentix/statuses and the two replacement projects are absent.

- [ ] **Step 3: Implement the exact experience status model and entries**

Use this type and experience array in `lib/data.ts`:

```ts
export type Experience = {
  role: string;
  org: string;
  period: string;
  status?: "current" | "completed";
  description: string;
};

export const experience: Experience[] = [
  {
    role: "AI/ML Intern",
    org: "Labmentix",
    period: "Jul 2026 – Present",
    status: "current",
    description: "Currently working as an AI/ML Intern at Labmentix.",
  },
  {
    role: "Agentic AI Engineer Intern",
    org: "ApexDevs",
    period: "Jun 2026 – Jul 2026",
    status: "completed",
    description:
      "Worked on real-world agentic AI projects and guided tasks in the Agentic AI Engineer domain, with daily updates and weekly milestone reports.",
  },
  {
    role: "Data Science Intern",
    org: "The Developers Arena",
    period: "May 2026 – Aug 2026",
    status: "current",
    description:
      "Completing self-paced data science modules with real-world project development, weekly task submissions, and a structured curriculum with automated progress tracking.",
  },
  {
    role: "Machine Learning Intern",
    org: "EdiGlobe",
    period: "Jun 2025 – Jul 2025",
    status: "completed",
    description:
      "Designed end-to-end ML pipelines (preprocessing, feature engineering, model training); built time-series forecasting models evaluated on RMSE and ROC-AUC.",
  },
];
```

- [ ] **Step 4: Replace project entries 3 and 4**

Keep project objects 1 and 2 unchanged, then use these exact objects:

```ts
  {
    title: "CyberWatch AI",
    emoji: "CW",
    blurb:
      "Local-first AI cybersecurity suite for detecting network intrusions, phishing URLs, malware families, harmful text, and zero-day anomalies without sending prediction data to the cloud.",
    details:
      "Combines XGBoost, LSTM, RF/XGBoost, 1D-CNN, BERT, Isolation Forest, and Autoencoder models with a CLI, Streamlit dashboard, FastAPI endpoints, and optional live packet monitoring through Scapy/Npcap.",
    tags: ["Python", "XGBoost", "PyTorch", "Transformers", "FastAPI", "Streamlit", "Cybersecurity"],
  },
  {
    title: "ShadowGuard AI",
    emoji: "SG",
    blurb:
      "Local-first AI safety workspace that inspects prompts and public GitHub repositories for secrets, PII, and prompt injection, then returns policy-guided allow, warn, or block decisions.",
    details:
      "Built with a Next.js frontend, FastAPI backend, SQLite persistence, and Chrome MV3 extension, with safe rewriting, repository scanning, privacy-risk tracking, and PDF audit reports.",
    tags: ["Next.js", "TypeScript", "FastAPI", "SQLite", "Chrome MV3", "Scikit-learn", "Cybersecurity"],
  },
```

Do not add `href` or `status` to either object.

- [ ] **Step 5: Verify GREEN and commit**

Run: `node --test tests/visual-shell.test.mjs`

Expected: 2 tests pass.

Run: `npm run lint`

Expected: ESLint exits 0.

Commit:

```powershell
git add tests/visual-shell.test.mjs lib/data.ts
git commit -m "content: update experience and projects"
```

---

### Task 2: Restore the Motion and Design Foundation

**Files:**
- Modify: `tests/visual-shell.test.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `components/MotionProvider.tsx`
- Create: `components/AnimatedBackground.tsx`
- Create: `components/CustomCursor.tsx`
- Modify: `components/ScrollProgress.tsx`

**Interfaces:**
- Consumes: root layout children, theme bootstrap, existing ScrollProgress state logic.
- Produces: global semantic colour tokens, motion keyframes/classes, reduced-motion provider, background shell, and fine-pointer cursor used by all later tasks.

- [ ] **Step 1: Append a failing shell acceptance test**

Append:

```js
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
```

- [ ] **Step 2: Run tests and confirm RED**

Run: `node --test tests/visual-shell.test.mjs`

Expected: the shell test fails on missing Space Grotesk, motion components, Framer Motion, and palette/keyframes.

- [ ] **Step 3: Install the exact animation dependency**

Run: `npm install framer-motion@^12.38.0`

Expected: `package.json` and `package-lock.json` include Framer Motion 12.38-compatible metadata with no peer error under React 19.

- [ ] **Step 4: Create the reduced-motion provider**

Create `components/MotionProvider.tsx`:

```tsx
"use client";

import { MotionConfig } from "framer-motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

- [ ] **Step 5: Restore the restrained animated background**

Create `components/AnimatedBackground.tsx`:

```tsx
export default function AnimatedBackground() {
  return (
    <div aria-hidden className="ambient-background pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-conic absolute inset-0 grid place-items-center"><div /></div>
      <span className="ambient-orb ambient-orb-one" />
      <span className="ambient-orb ambient-orb-two" />
      <span className="ambient-orb ambient-orb-three" />
    </div>
  );
}
```

- [ ] **Step 6: Restore the accessible fine-pointer custom cursor**

Create `components/CustomCursor.tsx` with the original requestAnimationFrame lerp behavior from commit `0398016`, plus this guard before adding `has-custom-cursor`:

```ts
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!finePointer.matches || reducedMotion.matches) return;
```

Use `#7EF5CA` for the dot, an rgba mint border for the ring, `lerp(..., 0.16)`, default ring `26px`, interactive ring `46px`, and remove listeners/cancel RAF on cleanup.

- [ ] **Step 7: Update the root layout**

Replace Newsreader with Space Grotesk and mount the shell in this order:

```tsx
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import AnimatedBackground from "@/components/AnimatedBackground";
import CustomCursor from "@/components/CustomCursor";
import MotionProvider from "@/components/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });

// Inside <body>:
<MotionProvider>
  <ScrollProgress />
  <AnimatedBackground />
  {children}
  <CustomCursor />
</MotionProvider>
```

Keep the current metadata, DM Sans, JetBrains Mono, theme initialization, `suppressHydrationWarning`, and body overflow guard.

- [ ] **Step 8: Establish global tokens and motion primitives**

In `app/globals.css`, map Tailwind tokens to CSS variables and define:

```css
@import "tailwindcss";

@custom-variant light (&:where(.light, .light *));

@theme {
  --color-bg: var(--canvas);
  --color-bg-soft: var(--surface);
  --color-bg-card: var(--surface-raised);
  --color-fg: var(--ink);
  --color-fg-muted: var(--ink-muted);
  --color-fg-subtle: var(--ink-subtle);
  --color-border: var(--rule);
  --color-border-strong: var(--rule-strong);
  --color-mint: var(--mint);
  --color-blue: var(--blue);
  --color-accent: var(--mint);
  --color-signal: var(--blue);
  --font-sans: var(--font-dm-sans), system-ui, sans-serif;
  --font-display: var(--font-space-grotesk), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;
  --animate-orbit-one: orbit-one 26s ease-in-out infinite;
  --animate-orbit-two: orbit-two 34s ease-in-out infinite;
  --animate-spin-slow: spin-slow 60s linear infinite;
  --animate-marquee-left: marquee-left 28s linear infinite;
  --animate-marquee-right: marquee-right 34s linear infinite;
}

:root {
  color-scheme: dark;
  --canvas: #0b1112;
  --surface: #11191a;
  --surface-raised: #172224;
  --ink: #ecf4f0;
  --ink-muted: #94a39e;
  --ink-subtle: #697873;
  --rule: rgba(236, 244, 240, 0.1);
  --rule-strong: rgba(126, 245, 202, 0.28);
  --mint: #7ef5ca;
  --blue: #7eb2ff;
}

:root.light {
  color-scheme: light;
  --canvas: #f3f7f4;
  --surface: #ffffff;
  --surface-raised: #eaf1ed;
  --ink: #10201c;
  --ink-muted: #52635d;
  --ink-subtle: #64756f;
  --rule: rgba(16, 32, 28, 0.14);
  --rule-strong: rgba(22, 122, 91, 0.35);
  --mint: #167a5b;
  --blue: #315eaf;
}

@keyframes orbit-one { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(48px,-30px,0) scale(1.06); } }
@keyframes orbit-two { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-55px,38px,0) scale(1.1); } }
@keyframes spin-slow { to { transform: rotate(360deg); } }
@keyframes marquee-left { to { transform: translateX(-50%); } }
@keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
```

Define `.ambient-grid`, `.ambient-conic`, `.ambient-orb-*`, `.studio-surface`, `.spotlight`, `.skills-marquee-left`, `.skills-marquee-right`, `.section-wrap`, `.section-heading`, `.skip-link`, `.scroll-progress`, `.scroll-progress-meter`, `.has-custom-cursor`, scrollbar, focus, responsive, and `prefers-reduced-motion` rules. Use subtle mint/blue alpha values; no rose/gold or paper texture.

- [ ] **Step 9: Verify shell GREEN and commit**

Run: `node --test tests/visual-shell.test.mjs`

Expected: 3 tests pass.

Run: `npm run lint && npm run build`

Expected: lint and Next production build exit 0.

Commit:

```powershell
git add package.json package-lock.json app/layout.tsx app/globals.css components/MotionProvider.tsx components/AnimatedBackground.tsx components/CustomCursor.tsx components/ScrollProgress.tsx tests/visual-shell.test.mjs
git commit -m "style: restore refined motion foundation"
```

---

### Task 3: Rebuild the Animated Hero and About Sections

**Files:**
- Modify: `tests/visual-shell.test.mjs`
- Modify: `components/Hero.tsx`
- Modify: `components/About.tsx`
- Delete: `lib/quotes.ts`

**Interfaces:**
- Consumes: `profile`, global motion classes, Framer Motion provider.
- Produces: quote-free animated hero and metric-free animated About content.

- [ ] **Step 1: Append failing Hero/About acceptance tests**

```js
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
```

Adjust the helper before using the optional assertion:

```js
import { existsSync, readFileSync } from "node:fs";
const read = (path, options = {}) => {
  const absolute = resolve(root, path);
  if (options.flag === "optional" && !existsSync(absolute)) return undefined;
  return readFileSync(absolute, "utf8");
};
```

- [ ] **Step 2: Run tests and confirm RED**

Run: `node --test tests/visual-shell.test.mjs`

Expected: Hero lacks client motion/role timer; About still has metrics; `lib/quotes.ts` still exists.

- [ ] **Step 3: Implement Hero motion and selected layout**

`components/Hero.tsx` must:

- start with `"use client"`;
- import `AnimatePresence`, `motion`, and `useReducedMotion` from Framer Motion;
- rotate `profile.roles` every 2400ms only when reduced motion is false;
- use the original entrance timings: badge `.6s`, h1 `.75s delay .1`, role `.6s delay .25`, bio `.6s delay .35`, buttons `.6s delay .45`, portrait `.9s delay .4`, cue `.6s delay 1.2`;
- use an asymmetric `lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)]` layout;
- render the portrait in `.profile-photo-orbit` with outer `.portrait-ring`, `.portrait-halo`, and `.portrait-inner-glow` layers around the current `next/image`;
- render no quote, quote label, author, or empty quote space;
- retain the existing mail and projects URLs and descriptive portrait alt.

The rotating role element is exactly:

```tsx
<AnimatePresence mode="wait" initial={false}>
  <motion.strong
    key={profile.roles[roleIndex]}
    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
    transition={{ duration: 0.35 }}
    className="absolute left-0 text-mint"
  >
    {profile.roles[roleIndex]}
  </motion.strong>
</AnimatePresence>
```

- [ ] **Step 4: Implement the metric-free About section**

Use `motion.div`/`motion.aside` with one-time `whileInView` fade-up behavior and exact approved copy:

```tsx
const focusAreas = ["Agentic systems", "AI security", "Biomedical signals", "APIs & deployment"];

<p>I'm a final-year B.Tech CSE (DAML) student at CUTM Bhubaneswar, focused on building AI and ML systems end to end—from data preparation and modelling to evaluation and deployment.</p>
<p>My work spans agentic pipelines, biomedical signal models, and AI security tools. I care about clean pipelines, honest evaluation, and systems that keep working outside the notebook.</p>
```

Render the focus areas as a semantic list in an unboxed border-left rail. Do not use a `dl`, numeric highlights, metric cards, or project performance numbers.

- [ ] **Step 5: Delete unused quote data and verify GREEN**

Delete `lib/quotes.ts` with `apply_patch` after confirming `rg -n "@/lib/quotes|quotes\[" app components lib` returns only that file.

Run: `node --test tests/visual-shell.test.mjs && npm run lint && npm run build`

Expected: all tests, lint, and build pass.

- [ ] **Step 6: Commit**

```powershell
git add components/Hero.tsx components/About.tsx tests/visual-shell.test.mjs
git add -u lib/quotes.ts
git commit -m "style: rebuild animated hero and about"
```

---

### Task 4: Animate the Experience and Education Sections

**Files:**
- Modify: `tests/visual-shell.test.mjs`
- Modify: `components/Experience.tsx`
- Modify: `components/Education.tsx`

**Interfaces:**
- Consumes: `experience[].status`, `educationHistory`, global studio surfaces.
- Produces: explicit current/completed badge rendering and one-time section reveals.

- [ ] **Step 1: Append failing section tests**

```js
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
```

- [ ] **Step 2: Run tests and confirm RED**

Run: `node --test tests/visual-shell.test.mjs`

Expected: both components are static server components and Experience still reads `item.current`.

- [ ] **Step 3: Implement Experience timeline behavior**

Add `"use client"` and Framer Motion. Render each entry as `motion.li` with:

```tsx
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-60px" }}
transition={{ duration: 0.55, delay: index * 0.09, ease: "easeOut" }}
```

Use an open timeline line and mint/blue nodes. Render badges with:

```tsx
{item.status === "current" ? <span className="status-badge status-current"><i aria-hidden />Current</span> : null}
{item.status === "completed" ? <span className="status-badge status-completed">Completed</span> : null}
```

Only `.status-current i` receives ping animation.

- [ ] **Step 4: Restore Education reveal and hover behavior**

Add `"use client"`, import `motion`, and render the section header and each education row with one-time fade-up timing `.5s` and `index * .09` stagger. Use thin dividers, an offset period column, and `.studio-surface` hover response without metric-style boxes.

- [ ] **Step 5: Verify GREEN and commit**

Run: `node --test tests/visual-shell.test.mjs && npm run lint && npm run build`

Expected: all commands exit 0.

```powershell
git add components/Experience.tsx components/Education.tsx tests/visual-shell.test.mjs
git commit -m "style: animate experience and education"
```

---

### Task 5: Build the New Animated Project Cards

**Files:**
- Modify: `tests/visual-shell.test.mjs`
- Modify: `components/Projects.tsx`
- Modify: `components/ProjectVisual.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: final `projects` array and global `.spotlight` behavior.
- Produces: four animated cards, CyberWatch/ShadowGuard-specific graphics, and link omission for missing `href`.

- [ ] **Step 1: Append failing project tests**

```js
test("uses animated bespoke project cards", () => {
  const projects = read("components/Projects.tsx");
  const visual = read("components/ProjectVisual.tsx");
  assert.match(projects, /^"use client";/);
  assert.match(projects, /onMouseMove/);
  assert.match(projects, /className="spotlight/);
  assert.match(projects, /whileInView/);
  assert.match(visual, /"cyberwatch"/);
  assert.match(visual, /"shadowguard"/);
  assert.doesNotMatch(visual, /"speech"|"vision"/);
});
```

- [ ] **Step 2: Run tests and confirm RED**

Run: `node --test tests/visual-shell.test.mjs`

Expected: Projects is static, has no pointer spotlight, and ProjectVisual still exposes speech/vision kinds.

- [ ] **Step 3: Replace project visual kinds**

Use:

```ts
export type ProjectVisualKind = "signal" | "decision" | "cyberwatch" | "shadowguard";
```

Keep `signal` and `decision`. Implement `cyberwatch` as a CSS-only four-channel threat monitor with labelled bars `NET`, `URL`, `FILE`, `TEXT`. Implement `shadowguard` as a CSS-only inspection flow `INPUT → INSPECT → ALLOW/WARN/BLOCK`. Use semantic empty decoration with `aria-hidden="true"`; do not create SVG.

- [ ] **Step 4: Implement animated project card behavior**

`Projects.tsx` starts with `"use client"`, imports `motion`, and maps visual kinds:

```ts
const visualKinds: ProjectVisualKind[] = ["signal", "decision", "cyberwatch", "shadowguard"];
```

Each card uses `motion.article` with fade-up `y: 32`, `.6s`, `index * .09`, `viewport once`. Pointer motion sets `--mx` and `--my`:

```ts
const onMouseMove = (event: MouseEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};
```

Render cards in a two-column desktop grid, with `ProjectVisual`, title, blurb, details, tags, and the existing conditional repository link. The missing `href` on projects 3 and 4 must result in no button or placeholder.

- [ ] **Step 5: Add visual CSS and verify GREEN**

Add scoped `.pv-cyberwatch-*` and `.pv-shadowguard-*` classes plus card hover lift and mint/blue spotlight colours to `app/globals.css`.

Run: `node --test tests/visual-shell.test.mjs && npm run lint && npm run build`

Expected: all commands exit 0.

- [ ] **Step 6: Commit**

```powershell
git add components/Projects.tsx components/ProjectVisual.tsx app/globals.css tests/visual-shell.test.mjs
git commit -m "style: add animated security project cards"
```

---

### Task 6: Restore Skills, Contact, Navigation, and Footer Polish

**Files:**
- Modify: `tests/visual-shell.test.mjs`
- Modify: `components/Skills.tsx`
- Modify: `components/Contact.tsx`
- Modify: `components/Navbar.tsx`
- Modify: `components/ThemeToggle.tsx`
- Modify: `components/Footer.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `skills`, `profile`, nav links, global marquee/cursor/theme classes.
- Produces: restored dual marquee, contact reveals, and selected visual polish across remaining interactive chrome.

- [ ] **Step 1: Append failing interaction tests**

```js
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
```

- [ ] **Step 2: Run tests and confirm RED**

Run: `node --test tests/visual-shell.test.mjs`

Expected: static Skills/Contact fail marquee and reveal assertions.

- [ ] **Step 3: Restore Skills ticker behavior**

Start `Skills.tsx` with `"use client"`, flatten the six groups into labelled skill chips, duplicate the array exactly once per row, and render two overflow-clipped tracks. The first uses `.skills-marquee-left`, the second `.skills-marquee-right`. On mouse enter set `animationPlayState = "paused"`; restore `"running"` on mouse leave. Add a one-time section header reveal and keep every chip readable without motion.

- [ ] **Step 4: Restore Contact reveal and hover behavior**

Start `Contact.tsx` with `"use client"`; use the original one-time header/panel fade-up timings, retain the mail/GitHub/LinkedIn URLs, and use restrained mint/blue border, arrow movement, and spotlight hover. Keep visible labels and `target="_blank" rel="noopener noreferrer"` on external links.

- [ ] **Step 5: Adapt remaining chrome without changing behavior**

- Navbar keeps scroll state, active IntersectionObserver, mobile menu, and resume link; style it as a translucent graphite bar with thin mint active underline and Space Grotesk wordmark.
- ThemeToggle keeps current localStorage/class behavior; style as a 36px restrained circular control with accessible labels.
- Footer keeps name, year, location, email, and `Built with Next.js & Tailwind`; use open spacing and technical metadata typography.
- Keep the skip link and focus styles from Task 2.

- [ ] **Step 6: Verify GREEN and commit**

Run: `node --test tests/visual-shell.test.mjs && npm run lint && npm run build`

Expected: all commands exit 0.

```powershell
git add components/Skills.tsx components/Contact.tsx components/Navbar.tsx components/ThemeToggle.tsx components/Footer.tsx app/globals.css tests/visual-shell.test.mjs
git commit -m "style: restore portfolio interaction polish"
```

---

### Task 7: Complete Responsive and Browser Verification

**Files:**
- Modify only files required by a failing verification check.
- Test: `tests/visual-shell.test.mjs`

**Interfaces:**
- Consumes: complete approved implementation.
- Produces: verified local preview; no deployment.

- [ ] **Step 1: Run the complete automated gate**

Run:

```powershell
npm test
npm run lint
npm run build
git diff --check
git status --short --branch
```

Expected:

- all Node tests pass with zero failures;
- ESLint exits 0;
- Next.js 16.2.6 produces static `/` and `/_not-found` routes;
- diff check is clean;
- only the pre-existing `.playwright-mcp/` may remain untracked.

- [ ] **Step 2: Verify the approved content line by line**

Run:

```powershell
rg -n "Bhagavad|Gita|SpeakSense|CMFD|87%|99.9%" app components lib
rg -n "Labmentix|ApexDevs|CyberWatch AI|ShadowGuard AI|Current|Completed" components lib
```

Expected: first command returns no visible quote/removed project/About-metric matches; second returns all approved content and statuses.

- [ ] **Step 3: Review the local site in the existing browser tab**

At desktop and 390px mobile widths, inspect:

- dark and light themes;
- hero hierarchy and portrait fit;
- role changes after 2.4 seconds;
- no quote or empty quote space;
- About has no metrics and no boxed ledger;
- Labmentix Current pings; Apex Completed does not ping;
- four projects are ordered correctly and projects 3/4 have no repository control;
- sections reveal once, project spotlight follows pointer, skill tickers move/pause, and custom cursor is fine-pointer only;
- reduced-motion emulation stops timers/continuous effects;
- mobile menu works, focus indicators are visible, and body width equals viewport width;
- no console errors, hydration warnings, or broken resources.

- [ ] **Step 4: Fix failures test-first**

For any defect, add or tighten an assertion in `tests/visual-shell.test.mjs`, confirm it fails for that defect, apply the smallest production fix, and rerun the focused test before repeating the full gate.

- [ ] **Step 5: Commit final verification fixes when present**

If files changed during verification:

```powershell
git add tests/visual-shell.test.mjs app/globals.css app/layout.tsx components/Hero.tsx components/About.tsx components/Experience.tsx components/Education.tsx components/Projects.tsx components/ProjectVisual.tsx components/Skills.tsx components/Contact.tsx components/Navbar.tsx components/ThemeToggle.tsx components/Footer.tsx
git commit -m "fix: complete refined studio verification"
```

Do not commit `.playwright-mcp/`, `.superpowers/`, generated build output, or local browser artifacts.
