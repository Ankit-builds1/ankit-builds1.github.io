# Model Field Notes Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic neon/cyber visual shell with a restrained, personal research-notebook portfolio while preserving every factual detail, link, anchor, and status.

**Architecture:** Keep the App Router page as a Server Component, retain client boundaries only for navigation, theme switching, and scroll progress, and centralize the visual system in `app/globals.css`. Add two small presentational components—`SectionHeading` and `ProjectVisual`—so section rhythm and technical graphics are consistent without generated imagery or new dependencies.

**Tech Stack:** Next.js 16.2.6 App Router, React 19, TypeScript, Tailwind CSS 4, `next/font`, `next/image`, Node's built-in test runner.

## Global Constraints

- Preserve all text, metrics, project details, dates, statuses, URLs, resume path, contact details, and section anchor IDs.
- Do not deploy this redesign until the user reviews the local preview.
- Use the existing portrait; do not generate replacement imagery.
- Remove continuous ornamental motion, multicolor neon gradients, glass blur, glow shadows, custom cursor behavior, and skills marquees.
- Use Newsreader for display text, DM Sans for body/UI, and JetBrains Mono only for metadata.
- Use semantic theme tokens so both dark and light modes remain readable.
- Keep `.playwright-mcp/` untouched.

---

### Task 1: Add visual-shell acceptance checks

**Files:**
- Create: `tests/visual-shell.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: repository source files as text.
- Produces: `npm test`, which guards the chosen visual direction and key content-preservation contracts.

- [ ] **Step 1: Add a test script and failing acceptance test**

```json
"test": "node --test tests/*.test.mjs"
```

```js
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

test("uses the field-notes content structure", () => {
  assert.match(read("components/Hero.tsx"), /profile-photo-card/);
  assert.match(read("components/Projects.tsx"), /ProjectVisual/);
  assert.match(read("components/Skills.tsx"), /skills-grid/);
  assert.doesNotMatch(read("components/Skills.tsx"), /TickerRow/);
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test`

Expected: FAIL because the existing layout still imports the animated background/custom cursor and the old neon/marquee classes still exist.

---

### Task 2: Build the shared field-notes foundation

**Files:**
- Create: `components/SectionHeading.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `components/ThemeToggle.tsx`
- Modify: `components/ScrollProgress.tsx`
- Delete: `components/AnimatedBackground.tsx`
- Delete: `components/CustomCursor.tsx`
- Delete: `components/GradientBlob.tsx`

**Interfaces:**
- Produces: `SectionHeading({ number, title, note? })`, semantic color/font tokens, `.site-shell`, `.section-wrap`, `.paper-panel`, `.profile-photo-card`, `.project-visual`, and `.skills-grid` classes.
- Consumes: existing `.light` theme class and `ScrollProgress` behavior.

- [ ] **Step 1: Replace the font and root-shell wiring**

Use `Newsreader`, `DM_Sans`, and `JetBrains_Mono` through `next/font/google`; keep `ScrollProgress`; remove the animated background and custom cursor imports/renders; add a skip link and `id="main-content"` in `app/page.tsx` during the hero task.

- [ ] **Step 2: Replace global neon utilities with semantic field-notes tokens**

Define warm paper/ink light tokens and charcoal/paper dark tokens, one clay accent plus one signal-green support color, restrained one-pixel rules, native cursor, visible `:focus-visible`, static notebook grid texture, and reduced-motion handling. Do not retain legacy glow/orbit/marquee/spotlight utilities.

- [ ] **Step 3: Add the shared section heading**

```tsx
type SectionHeadingProps = {
  number: string;
  title: string;
  note?: string;
};

export default function SectionHeading({ number, title, note }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <span className="folio">{number}</span>
      <h2>{title}</h2>
      {note ? <p>{note}</p> : null}
    </header>
  );
}
```

- [ ] **Step 4: Simplify theme and progress controls**

Render both theme icons and let `.light` CSS choose visibility, so no synchronous state update is required in an effect. Change the progress bar to a single semantic accent with no glow.

- [ ] **Step 5: Run checks**

Run: `npm exec -- eslint app/layout.tsx components/ThemeToggle.tsx components/ScrollProgress.tsx components/SectionHeading.tsx`

Expected: PASS.

---

### Task 3: Rebuild navigation and hero as an editorial introduction

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/Navbar.tsx`
- Modify: `components/Hero.tsx`

**Interfaces:**
- Consumes: `profile`, `quotes[0]`, semantic tokens, `.profile-photo-card`.
- Produces: stable `#top` and section navigation, a static two-role hero, natural 4:5 portrait, and one quiet quote note.

- [ ] **Step 1: Add accessible page entry and stable anchor clearance**

Add a visible-on-focus skip link targeting `#main-content`, keep every existing section ID, and add CSS scroll margin for fixed-header clearance.

- [ ] **Step 2: Simplify the navbar**

Keep the monogram, active-section observer, resume link, mobile menu, and theme toggle. Replace gradient/glow/pill styling with text, rules, and a small typographic stamp. Add `aria-expanded` and `aria-controls` to the mobile menu button.

- [ ] **Step 3: Replace the animated hero**

Remove timers, rotating roles, orbs, rings, ping dots, glow CTAs, and the scroll cue. Render both roles steadily, keep the existing bio and links, present `/me.jpg` in a rectangular `next/image` frame, and show `quotes[0]` as a margin note labeled "A line I keep close".

- [ ] **Step 4: Run focused checks**

Run: `npm exec -- eslint app/page.tsx components/Navbar.tsx components/Hero.tsx`

Expected: PASS.

---

### Task 4: Convert profile sections into evidence-led ledgers

**Files:**
- Modify: `components/About.tsx`
- Modify: `components/Experience.tsx`
- Modify: `components/Education.tsx`
- Modify: `components/Contact.tsx`
- Modify: `components/Footer.tsx`
- Modify: `components/Certifications.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, existing arrays and profile data.
- Produces: ruled evidence strip, chronological experience ledger, transcript-like education rows, closing-letter contact area, and compact certification archive styling.

- [ ] **Step 1: Rebuild About**

Keep both narrative paragraphs and all four stats. Present stats as a ruled evidence strip, and show "Currently exploring" as a margin annotation without a sparkle gradient.

- [ ] **Step 2: Rebuild Experience and Education**

Use date/period columns plus content columns, one semantic status marker, and separators instead of floating cards, timelines, multicolor accents, and mouse-driven style mutation.

- [ ] **Step 3: Rebuild Contact, Footer, and dormant Certifications**

Keep the existing contact statement and every social URL. Use simple ruled links and an understated footer. Restyle `Certifications` as a compact archive even though it remains intentionally unrendered until the user decides on details.

- [ ] **Step 4: Run focused checks**

Run: `npm exec -- eslint components/About.tsx components/Experience.tsx components/Education.tsx components/Contact.tsx components/Footer.tsx components/Certifications.tsx`

Expected: PASS.

---

### Task 5: Turn projects and skills into authored technical records

**Files:**
- Create: `components/ProjectVisual.tsx`
- Modify: `components/Projects.tsx`
- Modify: `components/Skills.tsx`

**Interfaces:**
- Produces: `ProjectVisual({ kind })` where `kind` is `"signal" | "decision" | "speech" | "vision"`.
- Consumes: all existing project titles, blurbs, details, tags, links, statuses, and all six existing skill groups.

- [ ] **Step 1: Add CSS/HTML project schematics**

Build four non-metric decorative schematics from semantic HTML and CSS shapes: EEG bars/trace, RF+XGB decision pipeline, speech bars with emotion/intent labels, and a segmentation grid. Do not add generated SVGs or invented measurements.

- [ ] **Step 2: Replace SaaS-style project cards**

Use four numbered case-study plates with the schematic, complete existing copy, status, tags, and project link. Remove emojis, spotlight tracking, multicolor index accents, glow, lift, and gradient bars.

- [ ] **Step 3: Replace the duplicated marquee**

Render each of the six skill groups once in a static responsive matrix. Preserve every skill item and group name exactly.

- [ ] **Step 4: Run GREEN checks**

Run: `npm test && npm exec -- eslint components/ProjectVisual.tsx components/Projects.tsx components/Skills.tsx`

Expected: PASS.

---

### Task 6: Verify the complete local redesign

**Files:**
- Verify only; no planned source changes.

**Interfaces:**
- Consumes: completed redesign.
- Produces: evidence that the local preview is ready for the user's detail changes.

- [ ] **Step 1: Run the full source checks**

Run: `npm test && npm run lint && npm run build`

Expected: all commands exit 0; build route table contains `/` and `/_not-found` only.

- [ ] **Step 2: Verify desktop and mobile visually**

Start `npm run dev`, then inspect 1440px and 390px widths in both themes. Confirm no horizontal overflow, clear hero hierarchy, natural portrait crop, readable project plates, static skill groups, visible focus, working mobile menu, working theme toggle, and preserved links/anchors.

- [ ] **Step 3: Confirm change scope**

Run: `git diff --check && git status --short`.

Expected: only planned redesign files plus the pre-existing untracked `.playwright-mcp/`; no deployment or push.
