# Ankit Dash — Portfolio

Personal portfolio site. Bold & modern, dark-first, responsive.

**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion · lucide-react

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy lives in **`lib/data.ts`** — bio, projects, skills, contact links. Edit that one file to update the site.

To swap your resume, drop `resume.pdf` into the `public/` folder.

## Build & deploy

```bash
npm run build
npm run start
```

**Vercel (recommended):** push to GitHub, click "Import Project" on vercel.com — zero config needed.

## Structure

```
app/
  layout.tsx         # Fonts + metadata
  page.tsx           # Composes sections
  globals.css        # Tailwind v4 + theme tokens + custom keyframes
components/
  Navbar.tsx         # Sticky, blurs on scroll, mobile menu
  Hero.tsx           # Gradient name + rotating role tagline
  About.tsx          # Bio + education
  Projects.tsx       # 4 cards with cursor-spotlight
  Skills.tsx         # Tech chips
  Contact.tsx        # Email / GitHub / LinkedIn
  Footer.tsx
  ThemeToggle.tsx    # Dark <-> light, persists to localStorage
  GradientBlob.tsx   # Animated background blobs
  BrandIcons.tsx     # Inline SVGs for GitHub/LinkedIn (lucide v1 dropped brand icons)
lib/
  data.ts            # All content
```
