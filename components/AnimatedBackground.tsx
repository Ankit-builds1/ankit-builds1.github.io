export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Grid lines */}
      <div className="grid-bg-full absolute inset-0" />

      {/* Spinning conic — neon mint / hot rose / ice blue */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="h-[160vmax] w-[160vmax] animate-spin-slow opacity-[0.08]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(0,255,159,0.5) 18%, transparent 36%, rgba(0,208,255,0.45) 56%, transparent 74%, rgba(255,26,107,0.42) 92%, transparent 100%)",
          }}
        />
      </div>

      {/* Orb 1 — neon mint, top-left */}
      <div
        className="absolute left-[6%] top-[8%] h-[420px] w-[420px] rounded-full blur-3xl opacity-40 animate-orbit-1"
        style={{
          background: "radial-gradient(circle, rgba(0,255,159,0.6), transparent 65%)",
        }}
      />
      {/* Orb 2 — ice blue, right-center */}
      <div
        className="absolute right-[5%] top-[40%] h-[480px] w-[480px] rounded-full blur-3xl opacity-30 animate-orbit-2"
        style={{
          background: "radial-gradient(circle, rgba(0,208,255,0.55), transparent 65%)",
        }}
      />
      {/* Orb 3 — hot rose, bottom-center */}
      <div
        className="absolute left-[36%] top-[72%] h-[380px] w-[380px] rounded-full blur-3xl opacity-22 animate-orbit-1"
        style={{
          background: "radial-gradient(circle, rgba(255,26,107,0.55), transparent 65%)",
          animationDelay: "-7s",
        }}
      />
      {/* Orb 4 — gold, bottom-left */}
      <div
        className="absolute -left-[4%] top-[115%] h-[440px] w-[440px] rounded-full blur-3xl opacity-28 animate-orbit-2"
        style={{
          background: "radial-gradient(circle, rgba(255,204,0,0.5), transparent 65%)",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
