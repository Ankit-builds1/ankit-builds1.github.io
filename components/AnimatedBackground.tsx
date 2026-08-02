export default function AnimatedBackground() {
  return (
    <div aria-hidden className="ambient-background pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-conic absolute inset-0 grid place-items-center"><div /></div>
      <span className="ambient-orb ambient-orb-one" />
      <span className="ambient-orb ambient-orb-two" />
      <span className="ambient-orb ambient-orb-three" />
    </div>
  );
}
