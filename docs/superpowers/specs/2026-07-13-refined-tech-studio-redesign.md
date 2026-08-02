# Refined Tech Studio Portfolio Redesign

**Date:** 2026-07-13
**Status:** Selected visual direction, awaiting written-spec review
**Selected option:** A — Refined Tech Studio

## Objective

Rebuild Ankit Dash's portfolio as a personal, human-directed technical portfolio with a graphite, mint, and blue visual system. Preserve the original site's motion language while replacing the current field-notes styling and applying the requested content corrections.

The result should feel like an engineer deliberately designed it: clear hierarchy, asymmetric composition, project-specific details, restrained effects, and visible personality without generic template decoration.

## Visual Direction

### Palette

- Canvas: deep graphite `#0B1112`.
- Raised surface: dark green-charcoal `#11191A`.
- Primary text: soft white `#ECF4F0`.
- Muted text: grey-green `#94A39E`.
- Primary accent: mint `#7EF5CA`.
- Secondary accent: cool blue `#7EB2FF`.
- Borders stay thin and low-contrast; mint or blue appears only for active states, important labels, and project accents.
- Light mode uses canvas `#F3F7F4`, raised surface `#FFFFFF`, text `#10201C`, muted text `#52635D`, mint `#167A5B`, and blue `#315EAF`.

### Typography

- Use Space Grotesk for display headings rather than the current editorial serif treatment.
- Use DM Sans for body copy and controls.
- Use JetBrains Mono only for dates, status labels, section numbers, tags, and small technical metadata.
- Headings use confident scale and asymmetric line breaks, without animated rainbow text.

### Layout

- Keep one continuous page and the existing anchor navigation.
- Use an asymmetric hero: text occupies the larger left column; the animated portrait occupies a smaller offset right column.
- Sections use open layouts, intentional whitespace, and thin dividers rather than repeated boxed ledgers.
- Experience uses a responsive timeline/open-card hybrid.
- Projects use two-column bespoke cards on desktop and one column on mobile.
- About is an unboxed narrative layout with a smaller focus rail; it contains no metric cards.
- Skills retain the moving ticker behavior but use cleaner chips and spacing.

## Motion Contract

The following behavior must match the public/base version at commit `0398016`, with colours and surfaces adapted to the Refined Tech Studio design:

- Hero entrance sequence for availability, name, rotating role, bio, buttons, portrait, and scroll cue.
- Role rotation every 2.4 seconds using the existing vertical enter/exit behavior.
- Animated portrait ring, pulsing halo, and slow counter-rotating inner treatment.
- Floating background shapes and slow conic movement, recoloured to restrained mint and blue.
- One-time viewport reveals for About, Experience, Education, Projects, Skills, and Contact.
- Experience entry stagger and hover response.
- Project card lift, pointer-tracked spotlight, and repository-icon hover.
- Dual skills marquees moving in opposite directions and pausing on hover.
- Fine-pointer desktop custom cursor with lagging ring and interactive expansion.
- Scroll-progress bar, smooth anchors, active navigation state, mobile menu, and theme transitions.
- Current-status ping appears for current roles only.

The Bhagavad Gita quote and its quote-rotation timer are explicitly excluded. The unused `GradientBlob` and unrendered certification animation are also excluded.

### Reduced Motion and Performance

- Framer Motion must respect `prefers-reduced-motion` through a targeted client provider.
- Role timers and continuous decorative movement stop or become static for reduced-motion users.
- The custom cursor runs only for fine pointers and cleans up animation frames and listeners.
- Continuous background effects use restrained opacity and no more layers than the earlier live version.
- Server components remain server-rendered unless hooks, browser APIs, or event handlers require a client boundary.

## Content Changes

### Hero

- Remove the visible quote block completely.
- Remove the `quotes` import, quote state, quote timer, and quote transition.
- Delete `lib/quotes.ts` once no component imports it.
- Keep Ankit's portrait, availability message, rotating AI/ML roles, biography, project button, and contact button.

### About

- Delete the four metric boxes and the local `stats` data.
- Replace the current ledger layout with these two paragraphs:
  - `I'm a final-year B.Tech CSE (DAML) student at CUTM Bhubaneswar, focused on building AI and ML systems end to end—from data preparation and modelling to evaluation and deployment.`
  - `My work spans agentic pipelines, biomedical signal models, and AI security tools. I care about clean pipelines, honest evaluation, and systems that keep working outside the notebook.`
- Add an unboxed focus rail containing `Agentic systems`, `AI security`, `Biomedical signals`, and `APIs & deployment`.
- Do not add new performance numbers, employers, or personal claims.

### Experience

- Replace the boolean `current` field with `status: "current" | "completed"`.
- Add the newest entry first:
  - Role: `AI/ML Intern`
  - Organisation: `Labmentix`
  - Period: `Jul 2026 – Present`
  - Status: `Current`
  - Description: `Currently working as an AI/ML Intern at Labmentix.`
- Update ApexDevs:
  - Role remains `Agentic AI Engineer Intern`.
  - Period becomes `Jun 2026 – Jul 2026`.
  - Status becomes `Completed`.
  - Description: `Worked on real-world agentic AI projects and guided tasks in the Agentic AI Engineer domain, with daily updates and weekly milestone reports.`
- Keep The Developers Arena and EdiGlobe entries unchanged except for adapting them to the new status model.
- Render `Current` in mint with a ping; render `Completed` in blue without a ping.

### Projects

- Keep projects 1 and 2 unchanged:
  - Sleep Stage Detection & Clinical Report Generation.
  - Hierarchical Agentic Malware Classification.
- Remove projects 3 and 4:
  - SpeakSense.
  - CMFD.
- Add project 3 as `CyberWatch AI` with the blurb `Local-first AI cybersecurity suite for detecting network intrusions, phishing URLs, malware families, harmful text, and zero-day anomalies without sending prediction data to the cloud.` Its details mention its XGBoost, LSTM, RF/XGBoost, 1D-CNN, BERT, Isolation Forest, and Autoencoder models plus the CLI, Streamlit dashboard, FastAPI endpoints, and optional Scapy/Npcap packet monitoring.
- Add project 4 with the display title `ShadowGuard AI`, as requested. Its blurb is `Local-first AI safety workspace that inspects prompts and public GitHub repositories for secrets, PII, and prompt injection, then returns policy-guided allow, warn, or block decisions.` Its details mention the Next.js frontend, FastAPI backend, SQLite persistence, Chrome MV3 extension, safe rewriting, repository scanning, privacy-risk tracking, and PDF audit reports.
- Do not render repository buttons for CyberWatch AI or ShadowGuard AI until the user supplies or confirms the public links.
- If the supplied ShadowGuard link points to a different project, its copy must be replaced before deployment.
- Give both new projects distinct project-specific visual treatments rather than reusing the removed speech and image-forensics graphics.

## Component Structure

- `app/layout.tsx`: retain server layout, fonts, metadata, theme bootstrap; mount the motion provider, animated background, scroll progress, and custom cursor.
- `app/globals.css`: define the Refined Tech Studio tokens, motion keyframes, spotlight, marquee, cursor, light theme, responsive rules, and reduced-motion fallbacks.
- `app/page.tsx`: retain the current semantic section order and skip link.
- `components/MotionProvider.tsx`: small client boundary for Framer Motion reduced-motion behavior.
- `components/AnimatedBackground.tsx`: restored continuous background motion with the selected mint/blue styling.
- `components/CustomCursor.tsx`: restored fine-pointer cursor behavior with selected colours.
- `components/Hero.tsx`: restored hero sequence and role rotation; no quote logic.
- `components/About.tsx`: animated narrative and focus rail; no metrics.
- `components/Experience.tsx`: animated timeline and explicit current/completed states.
- `components/Education.tsx`: preserve content and restore its original reveal/hover behavior within the new visual system.
- `components/Projects.tsx`: animated project-card grid with spotlight interaction and four final projects.
- `components/ProjectVisual.tsx`: replace speech/vision variants with CyberWatch and ShadowGuard variants.
- `components/Skills.tsx`: restore the two marquee rows and hover pause behavior.
- `components/Contact.tsx`: restore entrance and social-card hover motion.
- `components/Navbar.tsx`, `components/ThemeToggle.tsx`, `components/ScrollProgress.tsx`, and `components/Footer.tsx`: retain behavior and adapt styling to the selected direction.
- `lib/data.ts`: contain the requested experience and project data changes.
- `lib/quotes.ts`: delete after removing its final import.

## Interaction and Accessibility

- Navigation remains keyboard accessible and the mobile menu reports its expanded state.
- Skip link and focus-visible outlines remain.
- Decorative backgrounds and project graphics stay hidden from assistive technology.
- Portrait alternative text stays descriptive and does not invent a capture location.
- Status meaning is communicated by visible text, not colour or animation alone.
- Missing project links produce no empty, disabled, or misleading controls.
- Mobile layouts have no horizontal overflow; marquee content is clipped within its section.

## Verification

- Update the acceptance tests before production edits and confirm they fail for the old field-notes implementation.
- Test absence of quote content and metric-box structure.
- Test the explicit experience statuses, dates, and new project ordering.
- Test restoration of Framer Motion, the animated shell, role rotation, project spotlight, and skills marquees.
- Run the complete test suite, ESLint, the Next.js 16.2.6 production build, and `git diff --check`.
- Review the local site at desktop and mobile widths in dark and light themes.
- Confirm role rotation, one-time reveals, current-only status ping, project hover spotlight, ticker pause, cursor fine-pointer gating, and reduced-motion behavior.
- Confirm no browser console errors, hydration warnings, broken links, or horizontal overflow.

## Non-Goals

- Do not deploy this revision before local user review.
- Do not change education, skills, contact information, resume URL, or the first two project facts.
- Do not add Ankit GPT or another chat feature.
- Do not reintroduce the field-notes/paper design.
- Do not invent Labmentix responsibilities or unverified project metrics.
