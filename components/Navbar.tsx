"use client";

import { FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${
        scrolled
          ? "border-border bg-bg/95"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="group flex items-center gap-3 no-underline">
          <span className="grid h-9 w-9 place-items-center rounded-[2px] border border-border-strong bg-bg-card text-[11px] font-semibold tracking-[0.08em] text-accent transition-colors group-hover:border-accent">
            {profile.monogram}
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight sm:inline">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link, index) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-baseline gap-1 border-b py-1 text-[11px] font-semibold uppercase tracking-[0.08em] no-underline transition-colors ${
                    isActive
                      ? "border-accent text-fg"
                      : "border-transparent text-fg-muted hover:border-border-strong hover:text-fg"
                  }`}
                >
                  <span className="font-mono font-normal text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 border-b border-border-strong py-1 text-[11px] font-semibold uppercase tracking-[0.08em] no-underline transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            <FileText size={13} aria-hidden />
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="grid h-9 w-9 place-items-center rounded-[2px] border border-border bg-bg-soft text-fg-muted transition-colors hover:border-border-strong hover:text-accent lg:hidden"
          >
            {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-bg lg:hidden"
        >
          <ul className="mx-auto grid max-w-6xl grid-cols-2 px-6 py-3 sm:grid-cols-3">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-1.5 border-b border-border py-3 text-xs font-semibold uppercase tracking-[0.08em] no-underline text-fg-muted transition-colors hover:text-accent"
                >
                  <span className="font-mono font-normal text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border-b border-border py-3 text-xs font-semibold uppercase tracking-[0.08em] no-underline text-fg-muted transition-colors hover:text-accent"
              >
                <FileText size={13} aria-hidden />
                Resume
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
