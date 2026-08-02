"use client";

import { Pause, Play } from "lucide-react";
import { useMotionPreference } from "./MotionProvider";

export default function MotionToggle() {
  const { motionPaused, toggleMotion } = useMotionPreference();
  const actionLabel = motionPaused ? "Resume animations" : "Pause animations";

  return (
    <button
      type="button"
      onClick={toggleMotion}
      aria-label="Animations"
      aria-pressed={motionPaused}
      title={actionLabel}
      className="theme-toggle motion-toggle"
    >
      {motionPaused ? <Play size={15} aria-hidden /> : <Pause size={15} aria-hidden />}
    </button>
  );
}
