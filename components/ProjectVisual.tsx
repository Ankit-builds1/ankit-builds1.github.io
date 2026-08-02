export type ProjectVisualKind = "signal" | "decision" | "cyberwatch" | "shadowguard";

type ProjectVisualProps = {
  kind: ProjectVisualKind;
};

const signalHeights = [24, 42, 30, 72, 38, 58, 88, 45, 66, 32, 52, 76];
const cyberwatchChannels = ["NET", "URL", "FILE", "TEXT"];

function SignalVisual() {
  return (
    <>
      <div className="pv-bars pv-signal-bars">
        {signalHeights.map((height, index) => (
          <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="pv-route">
        <span>EEG</span>
        <i aria-hidden />
        <span>TCN</span>
        <i aria-hidden />
        <span>Report</span>
      </div>
    </>
  );
}

function DecisionVisual() {
  return (
    <>
      <div className="pv-decision-grid">
        <span className="pv-node">RF</span>
        <span className="pv-join">+</span>
        <span className="pv-node">XGB</span>
        <span className="pv-arrow">→</span>
        <span className="pv-gate">Confidence gate</span>
      </div>
      <div className="pv-branches">
        <span>High confidence → family</span>
        <span>Ambiguous → ResNet-18</span>
      </div>
    </>
  );
}

function CyberwatchVisual() {
  return (
    <>
      <div className="pv-cyberwatch-monitor">
        {cyberwatchChannels.map((channel) => (
          <div className="pv-cyberwatch-channel" key={channel}>
            <span>{channel}</span>
            <div className="pv-cyberwatch-track" aria-hidden="true">
              <i />
            </div>
          </div>
        ))}
      </div>
      <div className="pv-cyberwatch-footer">
        <span>
          <i aria-hidden="true" />
          Local monitor
        </span>
        <span>4 threat channels</span>
      </div>
    </>
  );
}

function ShadowguardVisual() {
  return (
    <div className="pv-shadowguard-flow">
      <span className="pv-shadowguard-step">INPUT</span>
      <i className="pv-shadowguard-arrow" aria-hidden="true" />
      <span className="pv-shadowguard-step pv-shadowguard-inspect">INSPECT</span>
      <i className="pv-shadowguard-arrow" aria-hidden="true" />
      <div className="pv-shadowguard-outcomes">
        <span className="pv-shadowguard-outcome pv-shadowguard-allow">ALLOW</span>
        <span className="pv-shadowguard-outcome pv-shadowguard-warn">WARN</span>
        <span className="pv-shadowguard-outcome pv-shadowguard-block">BLOCK</span>
      </div>
    </div>
  );
}

const visuals = {
  signal: SignalVisual,
  decision: DecisionVisual,
  cyberwatch: CyberwatchVisual,
  shadowguard: ShadowguardVisual,
};

export default function ProjectVisual({ kind }: ProjectVisualProps) {
  const Visual = visuals[kind];

  return (
    <div className={`project-visual project-visual-${kind}`} aria-hidden="true">
      <div className="pv-caption">
        <span>{kind}</span>
        <span>Schematic / not to scale</span>
      </div>
      <Visual />
    </div>
  );
}
