import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_FLUJO_MENSAJE, TYPOGRAPHY } from "../utils/constants";

const S = S2_FLUJO_MENSAJE;
const C = RECAP_COLORS;
const FONT = TYPOGRAPHY.fontFamily;

// ============================================================
// Shared helpers
// ============================================================

const FadeText: React.FC<{
  children: React.ReactNode;
  delay: number;
  style?: React.CSSProperties;
}> = ({ children, delay, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame, fps, delay, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${(1 - appear) * 30}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================
// Inline SVG icons
// ============================================================

const PhoneIcon: React.FC<{ size: number; color: string; messageText?: string; showMessage?: boolean }> = ({
  size,
  color,
  messageText,
  showMessage = false,
}) => (
  <svg width={size} height={size * 1.8} viewBox="0 0 80 144">
    {/* Phone body */}
    <rect x="8" y="4" width="64" height="136" rx="14" fill={C.surface} stroke={color} strokeWidth="2.5" />
    {/* Screen */}
    <rect x="14" y="20" width="52" height="100" rx="4" fill="#0a0a0a" />
    {/* Top notch */}
    <rect x="28" y="8" width="24" height="6" rx="3" fill={C.surfaceLight} />
    {/* Bottom bar */}
    <rect x="28" y="128" width="24" height="4" rx="2" fill={C.surfaceLight} />
    {/* Chat message bubble */}
    {showMessage && messageText && (
      <>
        <rect x="18" y="80" width="44" height="24" rx="8" fill={C.accent} />
        <text
          x="40"
          y="96"
          fontFamily={FONT}
          fontSize="8"
          fill="#fff"
          textAnchor="middle"
          fontWeight="600"
        >
          {messageText}
        </text>
      </>
    )}
  </svg>
);

const TelegramTriggerBox: React.FC<{ lit: boolean }> = ({ lit }) => (
  <svg width="180" height="80" viewBox="0 0 180 80">
    <rect
      x="2"
      y="2"
      width="176"
      height="76"
      rx="12"
      fill={C.surface}
      stroke={lit ? C.accent : C.textDim}
      strokeWidth={lit ? 3 : 1.5}
    />
    {lit && (
      <rect
        x="2"
        y="2"
        width="176"
        height="76"
        rx="12"
        fill="none"
        stroke={C.accent}
        strokeWidth="3"
        opacity="0.4"
        filter="url(#glow)"
      />
    )}
    {/* Telegram icon (paper plane) */}
    <polygon points="20,40 35,32 50,40 35,55" fill={lit ? C.accent : C.textDim} opacity={0.8} />
    <polygon points="35,32 50,40 44,42 35,36" fill={lit ? "#fff" : C.surfaceLight} opacity={0.6} />
    <text
      x="62"
      y="36"
      fontFamily={FONT}
      fontSize="12"
      fill={lit ? C.text : C.textSecondary}
      fontWeight="600"
    >
      Telegram
    </text>
    <text
      x="62"
      y="52"
      fontFamily={FONT}
      fontSize="10"
      fill={lit ? C.accent : C.textDim}
      fontWeight="500"
    >
      Trigger
    </text>
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

const TrafficLightIcon: React.FC<{ activeColor: "red" | "yellow" | "green"; size: number }> = ({
  activeColor,
  size,
}) => (
  <svg width={size * 0.5} height={size} viewBox="0 0 40 90">
    <rect x="5" y="2" width="30" height="86" rx="10" fill={C.surface} stroke={C.textDim} strokeWidth="1.5" />
    <circle cx="20" cy="20" r="10" fill={activeColor === "red" ? "#FF453A" : C.surfaceLight} opacity={activeColor === "red" ? 1 : 0.3} />
    <circle cx="20" cy="45" r="10" fill={activeColor === "yellow" ? "#FFD60A" : C.surfaceLight} opacity={activeColor === "yellow" ? 1 : 0.3} />
    <circle cx="20" cy="70" r="10" fill={activeColor === "green" ? "#30D158" : C.surfaceLight} opacity={activeColor === "green" ? 1 : 0.3} />
  </svg>
);

const SystemPromptIcon: React.FC<{ glow: boolean; size: number }> = ({ glow, size }) => (
  <svg width={size} height={size} viewBox="0 0 80 80">
    {/* Document */}
    <rect
      x="10"
      y="6"
      width="60"
      height="68"
      rx="8"
      fill={C.surface}
      stroke={glow ? C.accent : C.textDim}
      strokeWidth={glow ? 2.5 : 1.5}
    />
    {glow && (
      <rect
        x="10"
        y="6"
        width="60"
        height="68"
        rx="8"
        fill={C.accent}
        opacity="0.08"
      />
    )}
    {/* Lines */}
    <rect x="20" y="18" width="40" height="4" rx="2" fill={glow ? C.accent : C.textDim} opacity={0.6} />
    <rect x="20" y="28" width="32" height="4" rx="2" fill={glow ? C.accent : C.textDim} opacity={0.4} />
    <rect x="20" y="38" width="36" height="4" rx="2" fill={glow ? C.accent : C.textDim} opacity={0.6} />
    <rect x="20" y="48" width="28" height="4" rx="2" fill={glow ? C.accent : C.textDim} opacity={0.4} />
    {/* Label */}
    <text x="40" y="66" fontFamily={FONT} fontSize="8" fill={glow ? C.accent : C.textDim} textAnchor="middle" fontWeight="600">
      SYSTEM
    </text>
  </svg>
);

const MemoryScrollIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 60 60">
    {/* Scroll body */}
    <rect x="12" y="8" width="36" height="44" rx="4" fill={C.surface} stroke={color} strokeWidth="1.5" />
    {/* Top roll */}
    <ellipse cx="30" cy="10" rx="20" ry="5" fill={C.surface} stroke={color} strokeWidth="1.5" />
    {/* Bottom roll */}
    <ellipse cx="30" cy="50" rx="20" ry="5" fill={C.surface} stroke={color} strokeWidth="1.5" />
    {/* Lines */}
    <rect x="18" y="18" width="24" height="3" rx="1.5" fill={color} opacity={0.5} />
    <rect x="18" y="25" width="20" height="3" rx="1.5" fill={color} opacity={0.3} />
    <rect x="18" y="32" width="22" height="3" rx="1.5" fill={color} opacity={0.5} />
    <rect x="18" y="39" width="16" height="3" rx="1.5" fill={color} opacity={0.3} />
  </svg>
);

const ThoughtBubble: React.FC<{ text: string; size: number }> = ({ text, size }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 180 120">
    {/* Main bubble */}
    <rect x="10" y="4" width="160" height="80" rx="20" fill={C.surface} stroke={C.accent} strokeWidth="2" />
    {/* Tail dots */}
    <circle cx="60" cy="96" r="8" fill={C.surface} stroke={C.accent} strokeWidth="1.5" />
    <circle cx="44" cy="110" r="5" fill={C.surface} stroke={C.accent} strokeWidth="1.5" />
    {/* Text */}
    <text x="90" y="50" fontFamily={FONT} fontSize="16" fill={C.accent} textAnchor="middle" fontWeight="600">
      {text}
    </text>
  </svg>
);

const DbIcon: React.FC<{ size: number; color: string; showPlus?: boolean }> = ({
  size,
  color,
  showPlus = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 60 60">
    {/* Cylinder top */}
    <ellipse cx="30" cy="14" rx="22" ry="8" fill={C.surface} stroke={color} strokeWidth="1.5" />
    {/* Cylinder body */}
    <rect x="8" y="14" width="44" height="30" fill={C.surface} />
    <line x1="8" y1="14" x2="8" y2="44" stroke={color} strokeWidth="1.5" />
    <line x1="52" y1="14" x2="52" y2="44" stroke={color} strokeWidth="1.5" />
    {/* Cylinder bottom */}
    <ellipse cx="30" cy="44" rx="22" ry="8" fill={C.surface} stroke={color} strokeWidth="1.5" />
    {/* Middle line */}
    <ellipse cx="30" cy="29" rx="22" ry="6" fill="none" stroke={color} strokeWidth="1" opacity={0.3} />
    {/* Plus sign */}
    {showPlus && (
      <>
        <circle cx="48" cy="48" r="10" fill={C.green} />
        <line x1="48" y1="42" x2="48" y2="54" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="48" x2="54" y2="48" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
      </>
    )}
  </svg>
);

// ============================================================
// Phase components
// ============================================================

const PhaseTitulo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const sub = spring({ frame, fps, delay: 15, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background }}
    >
      <h1
        style={{
          fontFamily: FONT,
          fontSize: 76,
          fontWeight: 700,
          color: C.text,
          transform: `scale(${s})`,
          opacity: s,
          textAlign: "center",
        }}
      >
        El Viaje de un{" "}
        <span style={{ color: C.accent }}>Mensaje</span>
      </h1>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 30,
          color: C.textSecondary,
          opacity: sub,
          transform: `translateY(${(1 - sub) * 20}px)`,
          marginTop: 16,
        }}
      >
        De principio a fin
      </p>
    </AbsoluteFill>
  );
};

const PhasePaso1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneAppear = spring({ frame, fps, delay: 10, config: { damping: 15 } });
  const typingProgress = interpolate(frame, [30, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bubbleAppear = spring({ frame, fps, delay: 80, config: { damping: 12 } });

  const fullText = "Hola bot!";
  const visibleChars = Math.floor(typingProgress * fullText.length);
  const typedText = fullText.slice(0, visibleChars);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        {/* Phone */}
        <div
          style={{
            opacity: phoneAppear,
            transform: `scale(${phoneAppear})`,
          }}
        >
          <PhoneIcon size={100} color={C.accent} messageText={typedText || undefined} showMessage={visibleChars > 0} />
        </div>

        {/* Chat bubble flying out */}
        {bubbleAppear > 0.01 && (
          <div
            style={{
              opacity: bubbleAppear,
              transform: `translateX(${(1 - bubbleAppear) * -40}px) scale(${bubbleAppear})`,
            }}
          >
            <div
              style={{
                background: C.accent,
                borderRadius: 20,
                borderBottomLeftRadius: 4,
                padding: "16px 32px",
                boxShadow: `0 0 20px ${C.accent}30`,
              }}
            >
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 28,
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                Hola bot!
              </p>
            </div>
          </div>
        )}
      </div>

      <FadeText delay={60} style={{ marginTop: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          <span style={{ color: C.accent }}>1.</span> Usuario escribe en Telegram
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePaso2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bubbleTravelProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const litProgress = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isLit = litProgress > 0.5;
  const flashOpacity = interpolate(frame, [50, 60, 80], [0, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        {/* Chat bubble traveling */}
        <div
          style={{
            opacity: 1 - bubbleTravelProgress * 0.5,
            transform: `translateX(${bubbleTravelProgress * 80}px) scale(${1 - bubbleTravelProgress * 0.3})`,
          }}
        >
          <div
            style={{
              background: C.accent,
              borderRadius: 16,
              padding: "12px 24px",
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 18, color: "#fff", fontWeight: 500 }}>
              Hola bot!
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ opacity: bubbleTravelProgress }}>
          <svg width="60" height="20" viewBox="0 0 60 20">
            <path
              d="M0,10 L48,10 M40,4 L50,10 L40,16"
              fill="none"
              stroke={C.accent}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Telegram Trigger node */}
        <div style={{ position: "relative" }}>
          <TelegramTriggerBox lit={isLit} />
          {/* Flash overlay */}
          {flashOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: C.accent,
                borderRadius: 12,
                opacity: flashOpacity,
              }}
            />
          )}
        </div>
      </div>

      <FadeText delay={50} style={{ marginTop: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          <span style={{ color: C.accent }}>2.</span> Telegram Trigger se activa
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePaso3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ifNodeAppear = spring({ frame, fps, delay: 10, config: { damping: 200 } });

  // Traffic light sequence: red -> yellow -> green
  const lightPhase = interpolate(frame, [30, 60, 90, 110], [0, 1, 2, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const activeColor: "red" | "yellow" | "green" =
    lightPhase < 1 ? "red" : lightPhase < 2 ? "yellow" : "green";

  const arrowAppear = spring({ frame, fps, delay: 110, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
        {/* IF node box */}
        <div
          style={{
            opacity: ifNodeAppear,
            transform: `scale(${ifNodeAppear})`,
          }}
        >
          <div
            style={{
              background: C.surface,
              borderRadius: 16,
              padding: "20px 36px",
              border: `2px solid ${activeColor === "green" ? C.green : C.textDim}`,
              boxShadow: activeColor === "green" ? `0 0 30px ${C.green}40` : "none",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: 32,
                fontWeight: 700,
                color: activeColor === "green" ? C.green : C.text,
              }}
            >
              IF
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 16,
                color: C.textSecondary,
                marginTop: 4,
              }}
            >
              Evaluar condicion
            </p>
          </div>
        </div>

        {/* Traffic light */}
        <TrafficLightIcon activeColor={activeColor} size={120} />

        {/* Arrow to agent */}
        <div
          style={{
            opacity: arrowAppear,
            transform: `translateX(${(1 - arrowAppear) * 20}px)`,
          }}
        >
          <svg width="80" height="30" viewBox="0 0 80 30">
            <path
              d="M0,15 L64,15 M56,8 L66,15 L56,22"
              fill="none"
              stroke={C.green}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Agent box */}
        <div
          style={{
            opacity: arrowAppear,
            transform: `scale(${arrowAppear})`,
            background: C.surface,
            borderRadius: 16,
            padding: "20px 36px",
            border: `2px solid ${C.accent}`,
            boxShadow: `0 0 20px ${C.accent}20`,
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 28,
              fontWeight: 700,
              color: C.accent,
            }}
          >
            AI Agent
          </p>
        </div>
      </div>

      <FadeText delay={80} style={{ marginTop: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          <span style={{ color: C.green }}>3.</span> IF evalua -- pasa al agente
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePaso4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const agentAppear = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const promptGlow = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const memoryAppear = spring({ frame, fps, delay: 80, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 20,
            padding: "24px 48px",
            border: `2px solid ${C.accent}`,
            boxShadow: `0 0 30px ${C.accent}30`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 36,
              fontWeight: 700,
              color: C.accent,
            }}
          >
            AI Agent
          </p>
        </div>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        {/* System Prompt activating */}
        <div
          style={{
            opacity: agentAppear,
            transform: `scale(${0.8 + promptGlow * 0.2})`,
            textAlign: "center",
          }}
        >
          <SystemPromptIcon glow={promptGlow > 0.5} size={100} />
          <p
            style={{
              fontFamily: FONT,
              fontSize: 18,
              color: promptGlow > 0.5 ? C.accent : C.textSecondary,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            System Prompt
          </p>
          {promptGlow > 0.5 && (
            <div
              style={{
                marginTop: 6,
                background: `${C.accent}20`,
                borderRadius: 8,
                padding: "4px 12px",
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 12, color: C.accent }}>
                Activado
              </p>
            </div>
          )}
        </div>

        {/* Plus sign */}
        <FadeText delay={60}>
          <span style={{ fontFamily: FONT, fontSize: 48, color: C.textDim }}>+</span>
        </FadeText>

        {/* Memory loading */}
        <div
          style={{
            opacity: memoryAppear,
            transform: `translateY(${(1 - memoryAppear) * 20}px)`,
            textAlign: "center",
          }}
        >
          <MemoryScrollIcon size={100} color={C.purple} />
          <p
            style={{
              fontFamily: FONT,
              fontSize: 18,
              color: C.purple,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Memoria
          </p>
          <div
            style={{
              marginTop: 6,
              background: `${C.purple}20`,
              borderRadius: 8,
              padding: "4px 12px",
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 12, color: C.purple }}>
              Cargando...
            </p>
          </div>
        </div>
      </div>

      <FadeText delay={90} style={{ marginTop: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          <span style={{ color: C.accent }}>4.</span> Agente carga prompt y memoria
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePaso5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const thoughtAppear = spring({ frame, fps, delay: 10, config: { damping: 15 } });
  const chooseAppear = spring({ frame, fps, delay: 60, config: { damping: 200 } });
  const executeFlash = interpolate(frame, [100, 115, 140], [0, 1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const resultAppear = spring({ frame, fps, delay: 130, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 50 }}>
        {/* Thought bubble */}
        <div
          style={{
            opacity: thoughtAppear,
            transform: `scale(${thoughtAppear})`,
          }}
        >
          <ThoughtBubble text="Calculator?" size={200} />
        </div>

        {/* Decision arrow */}
        <div
          style={{
            opacity: chooseAppear,
            transform: `translateX(${(1 - chooseAppear) * 20}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 20,
          }}
        >
          <svg width="60" height="20" viewBox="0 0 60 20">
            <path
              d="M0,10 L48,10 M40,4 L50,10 L40,16"
              fill="none"
              stroke={C.accent}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 14, color: C.textSecondary }}>
            Decide
          </p>
        </div>

        {/* Tool execution */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div
            style={{
              opacity: chooseAppear,
              background: C.surface,
              borderRadius: 16,
              padding: "16px 28px",
              border: `2px solid ${executeFlash > 0.5 ? C.green : C.accent}`,
              boxShadow: executeFlash > 0.5 ? `0 0 30px ${C.green}40` : "none",
              textAlign: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <rect x="4" y="2" width="32" height="36" rx="6" fill={C.surfaceLight} stroke={C.accent} strokeWidth="1.5" />
              <rect x="10" y="8" width="20" height="8" rx="2" fill={C.accent} opacity={0.3} />
              <rect x="10" y="20" width="8" height="6" rx="1" fill={C.accent} opacity={0.5} />
              <rect x="22" y="20" width="8" height="6" rx="1" fill={C.accent} opacity={0.5} />
              <rect x="10" y="28" width="8" height="6" rx="1" fill={C.accent} opacity={0.5} />
              <rect x="22" y="28" width="8" height="6" rx="1" fill={C.green} opacity={0.7} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 16, color: C.accent, fontWeight: 600, marginTop: 6 }}>
              Calculator
            </p>
          </div>

          {/* Result */}
          {resultAppear > 0.01 && (
            <div
              style={{
                opacity: resultAppear,
                transform: `scale(${resultAppear})`,
                background: `${C.green}15`,
                borderRadius: 12,
                padding: "10px 24px",
                border: `1px solid ${C.green}40`,
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 20, color: C.green, fontWeight: 700 }}>
                = 35,770
              </p>
            </div>
          )}
        </div>
      </div>

      <FadeText delay={100} style={{ marginTop: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          <span style={{ color: C.accent }}>5.</span> Decide y usa herramienta
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePaso6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const responseAppear = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const dbAppear = spring({ frame, fps, delay: 60, config: { damping: 12 } });
  const saveFlash = interpolate(frame, [80, 95, 120], [0, 1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        {/* Agent composing response */}
        <div
          style={{
            opacity: responseAppear,
            transform: `translateY(${(1 - responseAppear) * 20}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              background: C.surface,
              borderRadius: 20,
              padding: "20px 36px",
              border: `2px solid ${C.accent}`,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: 28,
                fontWeight: 700,
                color: C.accent,
              }}
            >
              AI Agent
            </p>
          </div>

          {/* Composed response */}
          <div
            style={{
              background: C.surfaceLight,
              borderRadius: 16,
              borderBottomLeftRadius: 4,
              padding: "14px 28px",
              maxWidth: 320,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.text }}>
              "El resultado de 1547 x 23 + 189 es 35,770"
            </p>
          </div>
        </div>

        {/* Arrow to DB */}
        <div style={{ opacity: dbAppear }}>
          <svg width="60" height="20" viewBox="0 0 60 20">
            <path
              d="M0,10 L48,10 M40,4 L50,10 L40,16"
              fill="none"
              stroke={C.purple}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Memory DB with save animation */}
        <div
          style={{
            opacity: dbAppear,
            transform: `scale(${dbAppear})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <DbIcon size={80} color={C.purple} showPlus={saveFlash > 0.3} />
            {saveFlash > 0.5 && (
              <div
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: 16,
                  border: `2px solid ${C.purple}`,
                  opacity: saveFlash * 0.4,
                }}
              />
            )}
          </div>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 18,
              color: C.purple,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Memoria
          </p>
          {saveFlash > 0.3 && (
            <p
              style={{
                fontFamily: FONT,
                fontSize: 14,
                color: C.green,
                marginTop: 4,
                opacity: saveFlash,
              }}
            >
              Guardado
            </p>
          )}
        </div>
      </div>

      <FadeText delay={70} style={{ marginTop: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          <span style={{ color: C.purple }}>6.</span> Compone respuesta y guarda memoria
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePaso7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const n8nAppear = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const arrow1 = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tgAppear = spring({ frame, fps, delay: 50, config: { damping: 200 } });
  const arrow2 = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneAppear = spring({ frame, fps, delay: 90, config: { damping: 12 } });
  const messagePopIn = spring({ frame, fps, delay: 110, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {/* n8n box */}
        <div
          style={{
            opacity: n8nAppear,
            background: C.surface,
            borderRadius: 12,
            padding: "16px 24px",
            border: `1.5px solid ${C.accent}`,
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.accent }}>
            n8n
          </p>
        </div>

        {/* Arrow 1 */}
        <div style={{ opacity: arrow1 }}>
          <svg width="50" height="20" viewBox="0 0 50 20">
            <path
              d="M0,10 L38,10 M30,4 L40,10 L30,16"
              fill="none"
              stroke={C.green}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Telegram box */}
        <div
          style={{
            opacity: tgAppear,
            background: C.surface,
            borderRadius: 12,
            padding: "16px 24px",
            border: `1.5px solid ${C.teal}`,
            textAlign: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <polygon points="4,14 12,8 22,14 12,22" fill={C.teal} opacity={0.8} />
            <polygon points="12,8 22,14 18,16 12,10" fill="#fff" opacity={0.5} />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: C.teal, marginTop: 4 }}>
            Telegram
          </p>
        </div>

        {/* Arrow 2 */}
        <div style={{ opacity: arrow2 }}>
          <svg width="50" height="20" viewBox="0 0 50 20">
            <path
              d="M0,10 L38,10 M30,4 L40,10 L30,16"
              fill="none"
              stroke={C.green}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Phone with message */}
        <div
          style={{
            opacity: phoneAppear,
            transform: `scale(${phoneAppear})`,
            position: "relative",
          }}
        >
          <PhoneIcon size={80} color={C.green} />
          {/* Message pop-in on phone screen */}
          {messagePopIn > 0.01 && (
            <div
              style={{
                position: "absolute",
                top: 70,
                left: -60,
                opacity: messagePopIn,
                transform: `scale(${messagePopIn})`,
              }}
            >
              <div
                style={{
                  background: C.surfaceLight,
                  borderRadius: 12,
                  borderBottomLeftRadius: 4,
                  padding: "8px 16px",
                  maxWidth: 200,
                  boxShadow: `0 0 20px ${C.green}20`,
                }}
              >
                <p style={{ fontFamily: FONT, fontSize: 14, color: C.text }}>
                  El resultado es 35,770
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <FadeText delay={80} style={{ marginTop: 60 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          <span style={{ color: C.green }}>7.</span> Respuesta llega al usuario
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseCompleto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { label: "Usuario", color: C.teal, shortLabel: "Msg" },
    { label: "Trigger", color: C.accent, shortLabel: "TG" },
    { label: "IF", color: C.yellow, shortLabel: "IF" },
    { label: "Agente", color: C.accent, shortLabel: "AI" },
    { label: "Tool", color: C.green, shortLabel: "Calc" },
    { label: "Respuesta", color: C.purple, shortLabel: "Res" },
    { label: "Usuario", color: C.green, shortLabel: "OK" },
  ];

  // Step positions (horizontal flow)
  const stepWidth = 160;
  const totalWidth = steps.length * stepWidth;
  const startX = -totalWidth / 2 + stepWidth / 2;

  // Dot loop: cycles through all steps continuously
  const cycleDuration = 90; // frames per full cycle
  const cycleProgress = (frame % cycleDuration) / cycleDuration;
  const dotIndex = cycleProgress * steps.length;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <FadeText delay={0} style={{ marginBottom: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 40,
            fontWeight: 700,
            color: C.text,
            textAlign: "center",
          }}
        >
          El flujo completo
        </p>
      </FadeText>

      <div
        style={{
          position: "relative",
          width: totalWidth,
          height: 180,
        }}
      >
        {/* Steps */}
        {steps.map((step, i) => {
          const stepSpring = spring({
            frame,
            fps,
            delay: 10 + i * 8,
            config: { damping: 15 },
          });
          const x = startX + i * stepWidth;

          return (
            <React.Fragment key={i}>
              {/* Node */}
              <div
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: 40,
                  transform: `translateX(-50%) scale(${stepSpring})`,
                  opacity: stepSpring,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: C.surface,
                    border: `2px solid ${step.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    boxShadow: `0 0 12px ${step.color}20`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 16,
                      fontWeight: 700,
                      color: step.color,
                    }}
                  >
                    {step.shortLabel}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    color: C.textSecondary,
                    marginTop: 8,
                  }}
                >
                  {step.label}
                </p>
              </div>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${x + stepWidth / 2 - 10}px)`,
                    top: 60,
                    opacity: stepSpring,
                  }}
                >
                  <svg width="20" height="12" viewBox="0 0 20 12">
                    <path
                      d="M0,6 L14,6 M10,2 L16,6 L10,10"
                      fill="none"
                      stroke={C.textDim}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Glowing animated dot */}
        {frame > 60 && (() => {
          const currentStep = Math.floor(dotIndex);
          const stepFraction = dotIndex - currentStep;
          const clampedCurrent = Math.min(currentStep, steps.length - 1);
          const clampedNext = Math.min(currentStep + 1, steps.length - 1);

          const currentX = startX + clampedCurrent * stepWidth;
          const nextX = startX + clampedNext * stepWidth;
          const dotX = currentX + (nextX - currentX) * stepFraction;
          const dotColor = steps[clampedCurrent].color;

          return (
            <div
              style={{
                position: "absolute",
                left: `calc(50% + ${dotX}px)`,
                top: 60,
                transform: "translate(-50%, -50%)",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: dotColor,
                boxShadow: `0 0 20px ${dotColor}, 0 0 40px ${dotColor}80`,
                zIndex: 10,
              }}
            />
          );
        })()}
      </div>

      <FadeText delay={80} style={{ marginTop: 20 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 700,
            color: C.accent,
            textAlign: "center",
          }}
        >
          Todo esto pasa en segundos
        </p>
      </FadeText>

      <FadeText delay={100}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 22,
            color: C.textSecondary,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Automatizado de principio a fin
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2FlujoMensaje: React.FC = () => {
  const frame = useCurrentFrame();

  // Global fade-out
  const fadeOut = interpolate(frame, [S.FADE.start, S.FADE.end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.background, opacity: fadeOut }}>
      <Sequence
        from={S.TITULO.start}
        durationInFrames={S.TITULO.end - S.TITULO.start}
        premountFor={30}
      >
        <PhaseTitulo />
      </Sequence>

      <Sequence
        from={S.PASO_1.start}
        durationInFrames={S.PASO_1.end - S.PASO_1.start}
        premountFor={30}
      >
        <PhasePaso1 />
      </Sequence>

      <Sequence
        from={S.PASO_2.start}
        durationInFrames={S.PASO_2.end - S.PASO_2.start}
        premountFor={30}
      >
        <PhasePaso2 />
      </Sequence>

      <Sequence
        from={S.PASO_3.start}
        durationInFrames={S.PASO_3.end - S.PASO_3.start}
        premountFor={30}
      >
        <PhasePaso3 />
      </Sequence>

      <Sequence
        from={S.PASO_4.start}
        durationInFrames={S.PASO_4.end - S.PASO_4.start}
        premountFor={30}
      >
        <PhasePaso4 />
      </Sequence>

      <Sequence
        from={S.PASO_5.start}
        durationInFrames={S.PASO_5.end - S.PASO_5.start}
        premountFor={30}
      >
        <PhasePaso5 />
      </Sequence>

      <Sequence
        from={S.PASO_6.start}
        durationInFrames={S.PASO_6.end - S.PASO_6.start}
        premountFor={30}
      >
        <PhasePaso6 />
      </Sequence>

      <Sequence
        from={S.PASO_7.start}
        durationInFrames={S.PASO_7.end - S.PASO_7.start}
        premountFor={30}
      >
        <PhasePaso7 />
      </Sequence>

      <Sequence
        from={S.COMPLETO.start}
        durationInFrames={S.COMPLETO.end - S.COMPLETO.start}
        premountFor={30}
      >
        <PhaseCompleto />
      </Sequence>
    </AbsoluteFill>
  );
};
