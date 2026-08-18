interface FallbackProps {
  variant: "core" | "chip" | "ecg" | "rocket";
}

const ACCENT = "#39d6ff";
const DIM = "#1c2a37";
const LINE = "rgba(57,214,255,0.4)";

function CoreFallback() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-hidden="true">
      <g fill="none" stroke={LINE}>
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="92" stroke="rgba(139,92,246,0.4)" />
        <circle cx="200" cy="200" r="128" stroke="rgba(57,214,255,0.25)" />
        <ellipse cx="200" cy="200" rx="170" ry="70" stroke="rgba(57,214,255,0.3)" />
        <ellipse cx="200" cy="200" rx="70" ry="170" stroke="rgba(57,214,255,0.2)" />
        <polygon points="200,140 242,170 242,230 200,260 158,230 158,170" stroke={ACCENT} opacity="0.8" />
      </g>
      <circle cx="200" cy="200" r="14" fill={ACCENT} />
      <circle cx="200" cy="200" r="34" fill="none" stroke={ACCENT} opacity="0.35" />
      {[...Array(26)].map((_, i) => {
        const a = (i / 26) * Math.PI * 2;
        const r = 145 + (i % 4) * 26;
        return (
          <circle
            key={i}
            cx={200 + Math.cos(a) * r}
            cy={200 + Math.sin(a) * r}
            r="1.6"
            fill={ACCENT}
            opacity="0.7"
          />
        );
      })}
    </svg>
  );
}

function ChipFallback() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-hidden="true">
      <rect x="70" y="70" width="260" height="260" rx="10" fill={DIM} stroke={LINE} />
      <g stroke={ACCENT} opacity="0.55">
        <line x1="40" y1="120" x2="80" y2="120" />
        <line x1="40" y1="200" x2="80" y2="200" />
        <line x1="40" y1="280" x2="80" y2="280" />
        <line x1="320" y1="120" x2="360" y2="120" />
        <line x1="320" y1="200" x2="360" y2="200" />
        <line x1="320" y1="280" x2="360" y2="280" />
        <line x1="120" y1="40" x2="120" y2="80" />
        <line x1="200" y1="40" x2="200" y2="80" />
        <line x1="280" y1="40" x2="280" y2="80" />
        <line x1="120" y1="320" x2="120" y2="360" />
        <line x1="200" y1="320" x2="200" y2="360" />
        <line x1="280" y1="320" x2="280" y2="360" />
      </g>
      <rect x="150" y="150" width="100" height="100" rx="4" fill="#0d1a20" stroke={ACCENT} strokeOpacity="0.7" />
      <rect x="180" y="180" width="40" height="40" rx="2" fill={ACCENT} opacity="0.8" />
      <circle cx="200" cy="200" r="6" fill="#05070a" />
      <g>
        <line x1="150" y1="280" x2="200" y2="330" stroke="#c9a85e" opacity="0.6" />
        <line x1="250" y1="280" x2="300" y2="330" stroke="#c9a85e" opacity="0.6" />
        <line x1="280" y1="150" x2="330" y2="120" stroke="#c9a85e" opacity="0.6" />
      </g>
      <circle cx="200" cy="330" r="3" fill="#c9a85e" />
    </svg>
  );
}

function EkgFallback() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-hidden="true">
      <rect x="10" y="10" width="380" height="280" rx="12" fill={DIM} stroke={LINE} />
      <g stroke="rgba(57,214,255,0.15)">
        <line x1="10" y1="80" x2="390" y2="80" />
        <line x1="10" y1="160" x2="390" y2="160" />
        <line x1="10" y1="240" x2="390" y2="240" />
        <line x1="100" y1="10" x2="100" y2="290" />
        <line x1="200" y1="10" x2="200" y2="290" />
        <line x1="300" y1="10" x2="300" y2="290" />
      </g>
      <path
        d="M20,160 L60,160 L76,140 L88,168 L96,120 L108,150 L118,188 L130,150 L144,160 L190,160 L210,92 L222,172 L234,120 L246,160 L300,160 L320,140 L332,168 L340,128 L350,160 L380,160"
        fill="none"
        stroke="#ff5c7a"
        strokeWidth="2"
        strokeDasharray="900"
        strokeDashoffset="900"
      >
        <animate attributeName="stroke-dashoffset" from="900" to="0" dur="3.2s" repeatCount="indefinite" />
      </path>
      <circle cx="380" cy="160" r="3" fill="#ff5c7a" />
    </svg>
  );
}

function RocketFallback() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-hidden="true">
      <circle cx="270" cy="140" r="46" fill="#0c1a2c" stroke={ACCENT} strokeOpacity="0.4" />
      <circle cx="270" cy="140" r="54" fill="none" stroke={ACCENT} strokeOpacity="0.15" />
      <ellipse cx="270" cy="140" rx="120" ry="40" fill="none" stroke={ACCENT} strokeOpacity="0.5" transform="rotate(-12 270 140)" />
      <circle cx="384" cy="120" r="2" fill={ACCENT} />
      <path
        d="M60,240 C120,200 150,120 200,70"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeDasharray="6 7"
        opacity="0.8"
      />
      <polygon points="52,244 70,244 61,216" fill="#ff5c7a" />
      <rect x="57" y="244" width="9" height="16" rx="3" fill="#dce6f0" />
      <polygon points="59,258 64,258 61,266" fill="#ff9a5c" opacity="0.9" />
      <circle cx="61" cy="244" r="1.5" fill="#0c1a2c" />
      <circle cx="90" cy="70" r="1.4" fill="#cfe7ff" opacity="0.8" />
      <circle cx="130" cy="240" r="1.4" fill="#cfe7ff" opacity="0.8" />
      <circle cx="340" cy="60" r="1.4" fill="#cfe7ff" opacity="0.8" />
      <circle cx="30" cy="120" r="1.4" fill="#cfe7ff" opacity="0.8" />
    </svg>
  );
}

export default function FallbackVisual({ variant }: FallbackProps) {
  return (
    <div className="scene-fallback">
      {variant === "core" && <CoreFallback />}
      {variant === "chip" && <ChipFallback />}
      {variant === "ecg" && <EkgFallback />}
      {variant === "rocket" && <RocketFallback />}
    </div>
  );
}
