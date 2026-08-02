"use client";

import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-bg/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Monogram + name */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-display text-lg font-bold"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-lg font-black text-sm text-bg transition-all group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00ff9f, #ff1a6b)",
              boxShadow: "0 0 16px rgba(0,255,159,0.4)",
            }}
          >
            {profile.monogram}
          </span>
          <span className="hidden sm:inline tracking-tight">{profile.name}</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-neon"
                      : "text-fg-muted hover:text-fg hover:bg-bg-card"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full border"
                      style={{
                        borderColor: "rgba(0,255,159,0.3)",
                        background: "rgba(0,255,159,0.06)",
                        boxShadow: "inset 0 0 12px rgba(0,255,159,0.08)",
                      }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-neon/25 bg-neon/5 px-3.5 py-1.5 text-sm font-medium text-neon transition-all hover:border-neon/50 hover:bg-neon/10 hover:shadow-[0_0_16px_rgba(0,255,159,0.2)]"
          >
            <FileText size={13} />
            Resume
          </a>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-border bg-bg-card text-fg-muted hover:text-neon hover:border-neon/30 transition-all"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-fg-muted hover:text-neon transition-colors font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-3 text-fg-muted hover:text-neon transition-colors"
              >
                <FileText size={14} />
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
