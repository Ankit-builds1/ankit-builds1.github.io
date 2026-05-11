"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip on touch/no-hover devices
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      const target = e.target as HTMLElement | null;
      setIsHovering(
        !!target?.closest("a, button, [role='button'], input, textarea, select")
      );
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring — smooth follow */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full border-2 border-white transition-[width,height,background] duration-200 ${
            isHovering ? "h-14 w-14 bg-white/10" : "h-8 w-8"
          }`}
        />
      </div>
      {/* Inner dot — instant follow */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            isHovering ? "h-0.5 w-0.5 opacity-60" : "h-1.5 w-1.5"
          }`}
        />
      </div>
    </>
  );
}
