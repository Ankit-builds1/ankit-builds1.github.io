"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
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

    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current && dotRef.current.style.opacity === "0") {
        dotRef.current.style.opacity = "1";
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
      }
      if (ringRef.current && ringRef.current.style.opacity === "0") {
        ringRef.current.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      const hover = !!target?.closest("a,button,[role='button'],input,textarea,select");
      if (ringRef.current) {
        ringRef.current.style.width  = hover ? "46px" : "26px";
        ringRef.current.style.height = hover ? "46px" : "26px";
        ringRef.current.style.opacity = hover ? "0.85" : "0.6";
      }
      if (dotRef.current) {
        dotRef.current.style.width  = hover ? "3px" : "5px";
        dotRef.current.style.height = hover ? "3px" : "5px";
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

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Lagging ring — GPU composited */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: "26px",
          height: "26px",
          border: "2px solid #00ff9f",
          boxShadow: "0 0 10px rgba(0,255,159,0.45), 0 0 22px rgba(0,255,159,0.18)",
          opacity: 0,
          transition: "width 0.18s ease, height 0.18s ease, opacity 0.12s ease",
          willChange: "transform",
        }}
      />
      {/* Instant dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: "5px",
          height: "5px",
          background: "#00ff9f",
          boxShadow: "0 0 8px rgba(0,255,159,0.95)",
          opacity: 0,
          transition: "width 0.15s ease, height 0.15s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
