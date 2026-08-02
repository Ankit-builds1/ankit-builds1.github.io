export default function GradientBlob() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="grid-bg absolute inset-0" />
      <div
        className="absolute left-[10%] top-[10%] h-[420px] w-[420px] rounded-full blur-3xl opacity-50 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55), transparent 60%)",
        }}
      />
      <div
        className="absolute right-[5%] top-[30%] h-[460px] w-[460px] rounded-full blur-3xl opacity-40 animate-float-slower"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.55), transparent 60%)",
        }}
      />
      <div
        className="absolute left-[40%] top-[60%] h-[340px] w-[340px] rounded-full blur-3xl opacity-30 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(217,70,239,0.55), transparent 60%)",
        }}
      />
    </div>
  );
}
