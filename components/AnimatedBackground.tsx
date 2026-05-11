export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="grid-bg-full absolute inset-0" />

      <div className="absolute inset-0 grid place-items-center">
        <div
          className="h-[160vmax] w-[160vmax] animate-spin-slow opacity-[0.10]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(139,92,246,0.45) 18%, transparent 36%, rgba(6,182,212,0.45) 56%, transparent 74%, rgba(217,70,239,0.4) 92%, transparent 100%)",
          }}
        />
      </div>

      <div
        className="absolute left-[6%] top-[8%] h-[460px] w-[460px] rounded-full blur-3xl opacity-50 animate-orbit-1"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55), transparent 65%)",
        }}
      />
      <div
        className="absolute right-[5%] top-[42%] h-[520px] w-[520px] rounded-full blur-3xl opacity-40 animate-orbit-2"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.55), transparent 65%)",
        }}
      />
      <div
        className="absolute left-[36%] top-[72%] h-[420px] w-[420px] rounded-full blur-3xl opacity-30 animate-orbit-1"
        style={{
          background:
            "radial-gradient(circle, rgba(217,70,239,0.55), transparent 65%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="absolute -left-[6%] top-[120%] h-[460px] w-[460px] rounded-full blur-3xl opacity-35 animate-orbit-2"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.5), transparent 65%)",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
