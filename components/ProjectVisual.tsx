export type ProjectVisualKind = "signal" | "decision" | "speech" | "vision";

type ProjectVisualProps = {
  kind: ProjectVisualKind;
};

const signalHeights = [24, 42, 30, 72, 38, 58, 88, 45, 66, 32, 52, 76];
const speechHeights = [30, 54, 82, 46, 68, 34, 74, 92, 52, 38, 64, 44];
const activeVisionCells = new Set([2, 3, 7, 8, 9, 13, 14, 18]);

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

function SpeechVisual() {
  return (
    <>
      <div className="pv-bars pv-speech-bars">
        {speechHeights.map((height, index) => (
          <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="pv-label-row">
        <span>Emotion</span>
        <span>Intent</span>
        <span>Response</span>
      </div>
    </>
  );
}

function VisionVisual() {
  return (
    <>
      <div className="pv-vision-grid">
        {Array.from({ length: 25 }, (_, index) => (
          <span
            key={index}
            className={activeVisionCells.has(index) ? "is-active" : undefined}
          />
        ))}
      </div>
      <div className="pv-route">
        <span>Backbone</span>
        <i aria-hidden />
        <span>ViT</span>
        <i aria-hidden />
        <span>Mask</span>
      </div>
    </>
  );
}

const visuals = {
  signal: SignalVisual,
  decision: DecisionVisual,
  speech: SpeechVisual,
  vision: VisionVisual,
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
