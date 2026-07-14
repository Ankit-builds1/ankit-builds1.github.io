"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cursorActive = false;
    let rafId: number | null = null;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      if (!cursorActive) return;

      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.16);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.16);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px,${mouse.current.y}px,0) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px,${ring.current.y}px,0) translate(-50%,-50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      if (dotRef.current && dotRef.current.style.opacity === "0") {
        dotRef.current.style.opacity = "1";
        ring.current.x = event.clientX;
        ring.current.y = event.clientY;
      }
      if (ringRef.current && ringRef.current.style.opacity === "0") {
        ringRef.current.style.opacity = "1";
      }

      const target = event.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest("a,button,[role='button'],input,textarea,select"),
      );

      if (ringRef.current) {
        ringRef.current.style.width = interactive ? "46px" : "26px";
        ringRef.current.style.height = interactive ? "46px" : "26px";
        ringRef.current.style.opacity = interactive ? "0.85" : "0.6";
      }
      if (dotRef.current) {
        dotRef.current.style.width = interactive ? "3px" : "5px";
        dotRef.current.style.height = interactive ? "3px" : "5px";
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "0.6";
    };

    const startCursor = () => {
      if (cursorActive) return;

      cursorActive = true;
      document.documentElement.classList.add("has-custom-cursor");
      document.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("mouseenter", onEnter);
      rafId = requestAnimationFrame(tick);
    };

    const stopCursor = () => {
      cursorActive = false;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);

      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const syncCursor = () => {
      if (finePointer.matches && !reducedMotion.matches) {
        startCursor();
      } else {
        stopCursor();
      }
    };

    finePointer.addEventListener("change", syncCursor);
    reducedMotion.addEventListener("change", syncCursor);
    syncCursor();

    return () => {
      finePointer.removeEventListener("change", syncCursor);
      reducedMotion.removeEventListener("change", syncCursor);
      stopCursor();
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: "26px",
          height: "26px",
          border: "1px solid color-mix(in srgb, var(--mint) 68%, transparent)",
          boxShadow: "0 0 14px color-mix(in srgb, var(--mint) 16%, transparent)",
          opacity: 0,
          transition: "width 0.18s ease, height 0.18s ease, opacity 0.12s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: "5px",
          height: "5px",
          background: "var(--mint)",
          boxShadow: "0 0 8px color-mix(in srgb, var(--mint) 65%, transparent)",
          opacity: 0,
          transition: "width 0.15s ease, height 0.15s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
