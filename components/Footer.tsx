"use client";

import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="px-6 py-8"
      style={{ borderTop: "1px solid rgba(0,255,159,0.08)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs" style={{ color: "#414d63" }}>
          © {year} {profile.name} — built with Next.js, Tailwind & Framer Motion.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-xs transition-colors"
          style={{ color: "#414d63" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00ff9f"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#414d63"; }}
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
