import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_IF_NODE, TYPOGRAPHY } from "../utils/constants";
import { N8nNode } from "./components/N8nNode";

const S = S2_IF_NODE;
const C = RECAP_COLORS;
const FONT = TYPOGRAPHY.fontFamily;
const MONO = TYPOGRAPHY.monoFontFamily;

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
// Phase components
// ============================================================

const PhaseTitulo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const subtitleAppear = spring({ frame, fps, delay: 20, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background }}
    >
      <h1
        style={{
          fontFamily: FONT,
          fontSize: 90,
          fontWeight: 700,
          color: C.accent,
          transform: `scale(${s})`,
          opacity: s,
          textAlign: "center",
          margin: 0,
        }}
      >
        IF / ELSE
      </h1>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 32,
          color: C.textSecondary,
          marginTop: 20,
          opacity: subtitleAppear,
          transform: `translateY(${(1 - subtitleAppear) * 20}px)`,
        }}
      >
        Decisiones automaticas
      </p>
    </AbsoluteFill>
  );
};

const PhaseConcepto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const trafficAppear = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const greenGlow = interpolate(
    frame,
    [30, 50],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const siAppear = spring({ frame, fps, delay: 60, config: { damping: 200 } });
  const noAppear = spring({ frame, fps, delay: 90, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      {/* Traffic light SVG */}
      <div
        style={{
          opacity: trafficAppear,
          transform: `scale(${trafficAppear})`,
          marginBottom: 50,
        }}
      >
        <svg width="100" height="260" viewBox="0 0 100 260">
          {/* Housing */}
          <rect x="10" y="10" width="80" height="240" rx="20" fill={C.surface} stroke={C.textDim} strokeWidth="2" />
          {/* Red light */}
          <circle cx="50" cy="70" r="28" fill={greenGlow < 0.5 ? "#FF453A" : "#4a1512"} opacity={0.7} />
          {/* Yellow light */}
          <circle cx="50" cy="130" r="28" fill="#4a3a10" opacity={0.5} />
          {/* Green light */}
          <circle cx="50" cy="190" r="28" fill={interpolate(greenGlow, [0, 1], [0.2, 1]) > 0.5 ? C.green : "#0f3318"} />
          {greenGlow > 0.3 && (
            <circle cx="50" cy="190" r="28" fill={C.green} opacity={greenGlow}>
              <animate attributeName="opacity" values={`${greenGlow};${greenGlow * 0.6};${greenGlow}`} dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </div>

      {/* SI se cumple */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div
          style={{
            opacity: siAppear,
            transform: `translateY(${(1 - siAppear) * 30}px)`,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.green, textAlign: "center", margin: 0 }}>
            SI se cumple → hacer algo
          </p>
        </div>

        <div
          style={{
            opacity: noAppear,
            transform: `translateY(${(1 - noAppear) * 30}px)`,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.red, textAlign: "center", margin: 0 }}>
            SI NO → hacer otra cosa
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PhaseEjemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const msgAppear = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const arrowToAppear = spring({ frame, fps, delay: 20, config: { damping: 200 } });
  const diamondAppear = spring({ frame, fps, delay: 35, config: { damping: 12 } });
  const branchSiAppear = spring({ frame, fps, delay: 60, config: { damping: 200 } });
  const branchNoAppear = spring({ frame, fps, delay: 80, config: { damping: 200 } });
  const resultSiAppear = spring({ frame, fps, delay: 100, config: { damping: 12 } });
  const resultNoAppear = spring({ frame, fps, delay: 120, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 60,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        {/* Start: "Mensaje llega" */}
        <div
          style={{
            opacity: msgAppear,
            transform: `scale(${msgAppear})`,
            background: C.surface,
            border: `2px solid ${C.accent}`,
            borderRadius: 12,
            padding: "14px 32px",
            marginBottom: 0,
          }}
        >
          <span style={{ fontFamily: FONT, fontSize: 22, fontWeight: 600, color: C.text }}>
            Mensaje llega
          </span>
        </div>

        {/* Arrow down */}
        <div style={{ opacity: arrowToAppear, height: 40, display: "flex", justifyContent: "center" }}>
          <svg width="20" height="40" viewBox="0 0 20 40">
            <path d="M10,0 L10,30 M4,24 L10,32 L16,24" fill="none" stroke={C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Diamond */}
        <div
          style={{
            opacity: diamondAppear,
            transform: `scale(${diamondAppear})`,
            marginBottom: 0,
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              transform: "rotate(45deg)",
              background: C.surface,
              border: `2px solid ${C.yellow}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 20px ${C.yellow}30`,
            }}
          >
            <span
              style={{
                transform: "rotate(-45deg)",
                fontFamily: FONT,
                fontSize: 16,
                fontWeight: 600,
                color: C.yellow,
                textAlign: "center",
                lineHeight: 1.3,
                padding: 20,
              }}
            >
              Contiene{"\n"}'urgente'?
            </span>
          </div>
        </div>

        {/* Two branches */}
        <div style={{ display: "flex", gap: 120, marginTop: 10 }}>
          {/* SI branch (left) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ opacity: branchSiAppear, height: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: C.green, marginBottom: 4 }}>SI</span>
              <svg width="20" height="30" viewBox="0 0 20 30">
                <path d="M10,0 L10,22 M4,16 L10,24 L16,16" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              style={{
                opacity: resultSiAppear,
                transform: `scale(${resultSiAppear})`,
                background: `${C.green}15`,
                border: `2px solid ${C.green}`,
                borderRadius: 12,
                padding: "14px 24px",
                textAlign: "center",
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: C.green }}>
                Notificacion{"\n"}prioritaria
              </span>
            </div>
          </div>

          {/* NO branch (right) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ opacity: branchNoAppear, height: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: C.red, marginBottom: 4 }}>NO</span>
              <svg width="20" height="30" viewBox="0 0 20 30">
                <path d="M10,0 L10,22 M4,16 L10,24 L16,16" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              style={{
                opacity: resultNoAppear,
                transform: `scale(${resultNoAppear})`,
                background: `${C.red}15`,
                border: `2px solid ${C.red}`,
                borderRadius: 12,
                padding: "14px 24px",
                textAlign: "center",
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: C.red }}>
                Respuesta{"\n"}normal
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PhaseConfig: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerAppear = spring({ frame, fps, delay: 5, config: { damping: 200 } });

  const fields: { label: string; value: string; color: string; delay: number }[] = [
    { label: "Value 1", value: "{{ message.text }}", color: C.accent, delay: 30 },
    { label: "Operation", value: "Contains", color: C.text, delay: 60 },
    { label: "Value 2", value: "urgente", color: C.accent, delay: 90 },
  ];

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
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.text }}>
          Configuracion del nodo <span style={{ color: C.accent }}>IF</span>
        </p>
      </FadeText>

      <div
        style={{
          opacity: headerAppear,
          width: 700,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {fields.map((field, i) => {
          const fieldAppear = spring({ frame, fps, delay: field.delay, config: { damping: 200 } });

          return (
            <div
              key={i}
              style={{
                opacity: fieldAppear,
                transform: `translateY(${(1 - fieldAppear) * 20}px)`,
                background: C.surface,
                borderRadius: 12,
                padding: "20px 28px",
                border: `1px solid ${C.textDim}40`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 20,
                  fontWeight: 600,
                  color: C.textSecondary,
                }}
              >
                {field.label}
              </span>
              <span
                style={{
                  fontFamily: field.color === C.accent ? MONO : FONT,
                  fontSize: 22,
                  fontWeight: 600,
                  color: field.color,
                  background: `${field.color}15`,
                  padding: "6px 16px",
                  borderRadius: 8,
                }}
              >
                {field.value}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PhaseOperaciones: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const operations: { name: string; example: string; delay: number }[] = [
    { name: "Contains", example: '"urgente" en texto', delay: 10 },
    { name: "Equals", example: 'status = "activo"', delay: 20 },
    { name: "Greater Than", example: "precio > 100", delay: 30 },
    { name: "Is Empty", example: "email = (vacio)", delay: 40 },
    { name: "Regex", example: "/^[A-Z]{3}-\\d+$/", delay: 50 },
  ];

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
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.text }}>
          Operaciones disponibles
        </p>
      </FadeText>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          maxWidth: 900,
          width: "100%",
        }}
      >
        {operations.map((op, i) => {
          const cardSpring = spring({ frame, fps, delay: op.delay, config: { damping: 12 } });

          return (
            <div
              key={i}
              style={{
                opacity: cardSpring,
                transform: `scale(${cardSpring})`,
                background: C.surface,
                borderRadius: 14,
                padding: "20px 22px",
                border: `1px solid ${C.textDim}40`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                // Place the last 2 cards centered in the bottom row
                ...(i === 3 ? { gridColumn: "1 / 2" } : {}),
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 22,
                  fontWeight: 700,
                  color: C.accent,
                }}
              >
                {op.name}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  color: C.textSecondary,
                  textAlign: "center",
                }}
              >
                {op.example}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PhaseFlujo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Arrow drawing progress
  const arrow1Draw = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow2TrueDraw = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow2FalseDraw = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Label appearances
  const trueLabel = spring({ frame, fps, delay: 65, config: { damping: 200 } });
  const falseLabel = spring({ frame, fps, delay: 65, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 60,
      }}
    >
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.text }}>
          Flujo completo con <span style={{ color: C.accent }}>IF</span>
        </p>
      </FadeText>

      <div style={{ position: "relative", width: 1000, height: 400 }}>
        {/* SVG connections layer */}
        <svg
          width="1000"
          height="400"
          viewBox="0 0 1000 400"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          {/* Arrow: Telegram -> IF */}
          <line
            x1="220"
            y1="200"
            x2={220 + (280 - 220) * arrow1Draw}
            y2="200"
            stroke={C.textDim}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {arrow1Draw > 0.9 && (
            <polygon
              points="278,194 290,200 278,206"
              fill={C.textDim}
              opacity={interpolate(arrow1Draw, [0.9, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          )}

          {/* Arrow: IF -> True (AI Agent) - goes up-right */}
          <path
            d={`M 510,180 Q 580,130 ${510 + (700 - 510) * arrow2TrueDraw},${180 + (130 - 180) * arrow2TrueDraw}`}
            fill="none"
            stroke={C.green}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${arrow2TrueDraw * 300}`}
            strokeDashoffset="0"
          />
          {arrow2TrueDraw > 0.9 && (
            <polygon
              points="694,124 706,130 694,136"
              fill={C.green}
              opacity={interpolate(arrow2TrueDraw, [0.9, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          )}

          {/* Arrow: IF -> False (simple response) - goes down-right */}
          <path
            d={`M 510,220 Q 580,270 ${510 + (700 - 510) * arrow2FalseDraw},${220 + (270 - 220) * arrow2FalseDraw}`}
            fill="none"
            stroke={C.red}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${arrow2FalseDraw * 300}`}
            strokeDashoffset="0"
          />
          {arrow2FalseDraw > 0.9 && (
            <polygon
              points="694,264 706,270 694,276"
              fill={C.red}
              opacity={interpolate(arrow2FalseDraw, [0.9, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          )}
        </svg>

        {/* Telegram node */}
        <div style={{ position: "absolute", left: 30, top: 160 }}>
          <N8nNode
            label="Telegram"
            icon="💬"
            color={C.teal}
            width={180}
            height={80}
            delay={5}
            highlighted
          />
        </div>

        {/* IF node */}
        <div style={{ position: "absolute", left: 310, top: 155 }}>
          <N8nNode
            label="IF"
            icon="🔀"
            color={C.yellow}
            width={190}
            height={90}
            delay={15}
            highlighted
            ports={{ bottom: 2 }}
          />
        </div>

        {/* True label */}
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 145,
            opacity: trueLabel,
          }}
        >
          <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.green }}>True</span>
        </div>

        {/* False label */}
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 255,
            opacity: falseLabel,
          }}
        >
          <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.red }}>False</span>
        </div>

        {/* True branch: AI Agent */}
        <div style={{ position: "absolute", left: 710, top: 90 }}>
          <N8nNode
            label="AI Agent"
            icon="🤖"
            color={C.green}
            width={190}
            height={80}
            delay={55}
            highlighted
          />
        </div>

        {/* False branch: Simple response */}
        <div style={{ position: "absolute", left: 710, top: 230 }}>
          <N8nNode
            label="No entiendo"
            icon="💬"
            color={C.red}
            width={190}
            height={80}
            delay={55}
            highlighted
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PhaseTip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardAppear = spring({ frame, fps, delay: 10, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <div
        style={{
          opacity: cardAppear,
          transform: `scale(${cardAppear})`,
          background: C.surface,
          borderRadius: 20,
          padding: "40px 50px",
          border: `2px solid ${C.accent}`,
          boxShadow: `0 0 30px ${C.accent}20`,
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 48 }}>💡</span>
        </div>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 600,
            color: C.text,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Puedes encadenar multiples{" "}
          <span style={{ color: C.accent }}>IF</span>{" "}
          para logica compleja
        </p>
        <FadeText delay={30} style={{ marginTop: 24 }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: C.textSecondary, margin: 0 }}>
            Combina condiciones para crear flujos avanzados
          </p>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2IfNode: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [S.FADE.start, S.FADE.end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.background, opacity: fadeOut }}>
      <Sequence from={S.TITULO.start} durationInFrames={S.TITULO.end - S.TITULO.start} premountFor={30}>
        <PhaseTitulo />
      </Sequence>

      <Sequence from={S.CONCEPTO.start} durationInFrames={S.CONCEPTO.end - S.CONCEPTO.start} premountFor={30}>
        <PhaseConcepto />
      </Sequence>

      <Sequence from={S.EJEMPLO.start} durationInFrames={S.EJEMPLO.end - S.EJEMPLO.start} premountFor={30}>
        <PhaseEjemplo />
      </Sequence>

      <Sequence from={S.CONFIG.start} durationInFrames={S.CONFIG.end - S.CONFIG.start} premountFor={30}>
        <PhaseConfig />
      </Sequence>

      <Sequence from={S.OPERACIONES.start} durationInFrames={S.OPERACIONES.end - S.OPERACIONES.start} premountFor={30}>
        <PhaseOperaciones />
      </Sequence>

      <Sequence from={S.FLUJO.start} durationInFrames={S.FLUJO.end - S.FLUJO.start} premountFor={30}>
        <PhaseFlujo />
      </Sequence>

      <Sequence from={S.TIP.start} durationInFrames={S.TIP.end - S.TIP.start} premountFor={30}>
        <PhaseTip />
      </Sequence>
    </AbsoluteFill>
  );
};
