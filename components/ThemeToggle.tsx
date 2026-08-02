"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const toggle = () => {
    const isLight = document.documentElement.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title="Switch color theme"
      className="theme-toggle"
    >
      <Moon className="theme-icon theme-icon-dark" size={16} aria-hidden />
      <Sun className="theme-icon theme-icon-light" size={16} aria-hidden />
      <span className="theme-label-dark sr-only">Switch to light theme</span>
      <span className="theme-label-light sr-only">Switch to dark theme</span>
    </button>
  );
}
