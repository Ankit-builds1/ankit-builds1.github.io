"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type MotionPreference = {
  motionPaused: boolean;
  toggleMotion: () => void;
};

const MotionPreferenceContext = createContext<MotionPreference | null>(null);

export function useMotionPreference() {
  const preference = useContext(MotionPreferenceContext);

  if (!preference) {
    throw new Error("useMotionPreference must be used within MotionProvider");
  }

  return preference;
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-motion-paused", String(motionPaused));

    return () => root.removeAttribute("data-motion-paused");
  }, [motionPaused]);

  const preference = useMemo(
    () => ({
      motionPaused,
      toggleMotion: () => setMotionPaused((paused) => !paused),
    }),
    [motionPaused],
  );

  return (
    <MotionPreferenceContext.Provider value={preference}>
      <MotionConfig reducedMotion={motionPaused ? "always" : "user"}>{children}</MotionConfig>
    </MotionPreferenceContext.Provider>
  );
}
