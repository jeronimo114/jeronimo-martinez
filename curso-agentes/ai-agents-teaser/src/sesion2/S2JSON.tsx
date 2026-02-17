import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_JSON, TYPOGRAPHY } from "../utils/constants";
import { JSONBlock } from "./components/JSONBlock";

const S = S2_JSON;
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
// Phase 1: TITULO - "JSON" + subtitle
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
          fontFamily: MONO,
          fontSize: 96,
          fontWeight: 700,
          color: C.text,
          transform: `scale(${s})`,
          opacity: s,
          textAlign: "center",
          letterSpacing: 8,
        }}
      >
        <span style={{ color: C.accent }}>{"{ }"}</span>{" "}
        <span style={{ color: C.accent }}>JSON</span>
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
        El idioma de los datos
      </p>
    </AbsoluteFill>
  );
};

// ============================================================
// Phase 2: QUE_ES - JSON object building line by line
// ============================================================

const PhaseQueEs: React.FC = () => {
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
        <p style={{ fontFamily: FONT, fontSize: 38, fontWeight: 700, color: C.text }}>
          Que es JSON?
        </p>
      </FadeText>

      <div style={{ maxWidth: 600, width: "100%" }}>
        <JSONBlock
          lines={[
            { indent: 0, raw: "{" },
            { indent: 1, key: "nombre", value: '"Juan"', valueColor: "#CE9178" },
            { indent: 1, key: "edad", value: "25", valueColor: "#B5CEA8" },
            { indent: 0, raw: "}" },
          ]}
          delay={15}
          stagger={12}
          fontSize={28}
        />
      </div>

      <FadeText delay={70} style={{ marginTop: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          <span style={{ color: "#9CDCFE" }}>Claves</span> en azul,{" "}
          <span style={{ color: "#CE9178" }}>textos</span> en verde,{" "}
          <span style={{ color: "#B5CEA8" }}>numeros</span> en naranja
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ============================================================
// Phase 3: ANALOGIA - Card/form to JSON
// ============================================================

const PhaseAnalogia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardAppear = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const arrowAppear = spring({ frame, fps, delay: 40, config: { damping: 200 } });
  const jsonAppear = spring({ frame, fps, delay: 55, config: { damping: 12 } });

  const fields = [
    { label: "Nombre", value: "Juan", delay: 10 },
    { label: "Edad", value: "25", delay: 20 },
    { label: "Email", value: "juan@mail.com", delay: 30 },
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
      <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
        {/* Physical form card */}
        <div
          style={{
            opacity: cardAppear,
            transform: `scale(${cardAppear})`,
            background: "#1e1e1e",
            borderRadius: 16,
            padding: "28px 32px",
            border: `2px solid ${C.surfaceLight}`,
            width: 340,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 700,
              color: C.accent,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Ficha de Contacto
          </div>
          {fields.map((field, i) => {
            const fieldAppear = spring({
              frame,
              fps,
              delay: field.delay,
              config: { damping: 200 },
            });
            return (
              <div
                key={i}
                style={{
                  opacity: fieldAppear,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    color: C.textDim,
                    marginBottom: 4,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {field.label}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 18,
                    color: C.text,
                    background: C.surfaceLight,
                    borderRadius: 8,
                    padding: "8px 14px",
                    border: `1px solid ${C.textDim}`,
                  }}
                >
                  {field.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrow */}
        <div style={{ opacity: arrowAppear }}>
          <svg width="80" height="40" viewBox="0 0 80 40">
            <path
              d="M0,20 L60,20 M52,10 L64,20 L52,30"
              fill="none"
              stroke={C.accent}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* JSON representation */}
        <div
          style={{
            opacity: jsonAppear,
            transform: `scale(${jsonAppear})`,
            width: 440,
          }}
        >
          <JSONBlock
            lines={[
              { indent: 0, raw: "{" },
              { indent: 1, key: "nombre", value: '"Juan"', valueColor: "#CE9178" },
              { indent: 1, key: "edad", value: "25", valueColor: "#B5CEA8" },
              { indent: 1, key: "email", value: '"juan@mail.com"', valueColor: "#CE9178" },
              { indent: 0, raw: "}" },
            ]}
            delay={60}
            stagger={8}
            fontSize={22}
          />
        </div>
      </div>

      <FadeText delay={80} style={{ marginTop: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: C.text, textAlign: "center" }}>
          JSON = <span style={{ color: C.accent, fontWeight: 700 }}>ficha digital</span>
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ============================================================
// Phase 4: EN_N8N - Nodes with data flowing between them
// ============================================================

const PhaseEnN8n: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeAAppear = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const lineAppear = spring({ frame, fps, delay: 25, config: { damping: 200 } });
  const nodeBAppear = spring({ frame, fps, delay: 15, config: { damping: 12 } });
  const dataAppear = spring({ frame, fps, delay: 40, config: { damping: 200 } });

  // Moving dot position along the connection line
  const dotProgress = interpolate(
    (frame - 50) % 60,
    [0, 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const showDot = frame > 50;

  const lineWidth = 300;
  const dotX = dotProgress * lineWidth;

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
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.text }}>
          En <span style={{ color: C.accent }}>n8n</span>, los nodos se pasan JSON
        </p>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {/* Node A */}
        <div
          style={{
            opacity: nodeAAppear,
            transform: `scale(${nodeAAppear})`,
          }}
        >
          <div
            style={{
              width: 200,
              minHeight: 90,
              background: C.surface,
              borderRadius: 12,
              border: `2px solid ${C.green}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 18px",
              boxShadow: `0 0 20px ${C.green}30`,
            }}
          >
            <span style={{ fontSize: 24, marginBottom: 4 }}>📨</span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 16,
                fontWeight: 600,
                color: C.text,
              }}
            >
              Trigger
            </span>
          </div>
        </div>

        {/* Connection line with moving dot */}
        <div style={{ position: "relative", width: lineWidth, height: 60, opacity: lineAppear }}>
          <svg
            width={lineWidth}
            height={60}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <line
              x1={0}
              y1={30}
              x2={lineWidth}
              y2={30}
              stroke={C.textDim}
              strokeWidth={2}
            />
            {/* Arrow head */}
            <polygon
              points={`${lineWidth - 10},24 ${lineWidth},30 ${lineWidth - 10},36`}
              fill={C.textDim}
            />
            {/* Moving dot */}
            {showDot && (
              <circle
                cx={dotX}
                cy={30}
                r={6}
                fill={C.accent}
                opacity={0.9}
              >
              </circle>
            )}
          </svg>

          {/* Floating data label */}
          <div
            style={{
              position: "absolute",
              top: -40,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: dataAppear,
            }}
          >
            <div
              style={{
                background: "#1e1e1e",
                borderRadius: 8,
                padding: "6px 14px",
                border: `1px solid ${C.accent}50`,
                fontFamily: MONO,
                fontSize: 14,
                color: C.accent,
                whiteSpace: "nowrap",
              }}
            >
              {"{ \"message\": \"Hola\" }"}
            </div>
          </div>
        </div>

        {/* Node B */}
        <div
          style={{
            opacity: nodeBAppear,
            transform: `scale(${nodeBAppear})`,
          }}
        >
          <div
            style={{
              width: 200,
              minHeight: 90,
              background: C.surface,
              borderRadius: 12,
              border: `2px solid ${C.purple}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 18px",
              boxShadow: `0 0 20px ${C.purple}30`,
            }}
          >
            <span style={{ fontSize: 24, marginBottom: 4 }}>🤖</span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 16,
                fontWeight: 600,
                color: C.text,
              }}
            >
              AI Agent
            </span>
          </div>
        </div>
      </div>

      <FadeText delay={70} style={{ marginTop: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textSecondary, textAlign: "center" }}>
          Cada nodo recibe y envia datos en formato JSON
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ============================================================
// Phase 5: EXPRESIONES - Decompose {{ $json.message.text }}
// ============================================================

const PhaseExpresiones: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exprAppear = spring({ frame, fps, delay: 10, config: { damping: 200 } });

  const parts: {
    token: string;
    color: string;
    label: string;
    delay: number;
  }[] = [
    { token: "$json", color: C.accent, label: "datos que llegan", delay: 40 },
    { token: ".message", color: C.green, label: "propiedad", delay: 65 },
    { token: ".text", color: C.orange, label: "sub-propiedad", delay: 90 },
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
      <FadeText delay={0} style={{ marginBottom: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.text }}>
          Expresiones en n8n
        </p>
      </FadeText>

      {/* Full expression */}
      <div
        style={{
          opacity: exprAppear,
          transform: `translateY(${(1 - exprAppear) * 20}px)`,
          background: "#1e1e1e",
          borderRadius: 12,
          padding: "20px 36px",
          marginBottom: 50,
          border: `1px solid ${C.surfaceLight}`,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 34,
            color: C.textDim,
          }}
        >
          {"{{ "}
        </span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={{
              fontFamily: MONO,
              fontSize: 34,
              color: part.color,
              fontWeight: 600,
            }}
          >
            {part.token}
          </span>
        ))}
        <span
          style={{
            fontFamily: MONO,
            fontSize: 34,
            color: C.textDim,
          }}
        >
          {" }}"}
        </span>
      </div>

      {/* Decomposed parts with arrows and labels */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {parts.map((part, i) => {
          const partAppear = spring({
            frame,
            fps,
            delay: part.delay,
            config: { damping: 200 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: partAppear,
                transform: `translateY(${(1 - partAppear) * 30}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Arrow pointing down */}
              <svg width="20" height="30" viewBox="0 0 20 30">
                <path
                  d="M10,0 L10,22 M4,16 L10,24 L16,16"
                  fill="none"
                  stroke={part.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Token */}
              <div
                style={{
                  background: `${part.color}15`,
                  border: `2px solid ${part.color}`,
                  borderRadius: 10,
                  padding: "10px 20px",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 24,
                    fontWeight: 700,
                    color: part.color,
                  }}
                >
                  {part.token}
                </span>
              </div>

              {/* Label */}
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 18,
                  color: C.textSecondary,
                  textAlign: "center",
                  maxWidth: 180,
                }}
              >
                {part.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Phase 6: EJEMPLO_REAL - Telegram JSON with field highlighting
// ============================================================

const PhaseEjemploReal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cycle through highlights: text, then chat.id
  const totalFrames = S.EJEMPLO_REAL.end - S.EJEMPLO_REAL.start;
  const highlight1Start = 60;
  const highlight2Start = 160;

  const h1Appear = spring({ frame, fps, delay: highlight1Start, config: { damping: 200 } });
  const h2Appear = spring({ frame, fps, delay: highlight2Start, config: { damping: 200 } });

  // Determine which field to highlight in JSONBlock
  const currentHighlight =
    frame >= highlight2Start ? "id" : frame >= highlight1Start ? "text" : undefined;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <FadeText delay={0} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.text }}>
          Ejemplo real: <span style={{ color: C.accent }}>Telegram</span>
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 50, alignItems: "flex-start" }}>
        {/* JSON block */}
        <div style={{ width: 500 }}>
          <JSONBlock
            lines={[
              { indent: 0, raw: "{" },
              { indent: 1, key: "message", value: "{", valueColor: C.textSecondary },
              { indent: 2, key: "text", value: '"Hola"', valueColor: "#CE9178" },
              { indent: 2, key: "chat", value: "{", valueColor: C.textSecondary },
              { indent: 3, key: "id", value: "123", valueColor: "#B5CEA8" },
              { indent: 2, raw: "}" },
              { indent: 1, raw: "}" },
              { indent: 0, raw: "}" },
            ]}
            delay={10}
            stagger={6}
            fontSize={20}
            highlightKey={currentHighlight}
          />
        </div>

        {/* Access expressions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            paddingTop: 20,
          }}
        >
          {/* Expression 1: $json.message.text */}
          <div
            style={{
              opacity: h1Appear,
              transform: `translateX(${(1 - h1Appear) * 30}px)`,
            }}
          >
            <div
              style={{
                background: `${C.green}15`,
                border: `1px solid ${C.green}60`,
                borderRadius: 12,
                padding: "16px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 18,
                  color: C.green,
                  marginBottom: 8,
                }}
              >
                $json.message.text
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <svg width="24" height="14" viewBox="0 0 24 14">
                  <path
                    d="M0,7 L18,7 M14,2 L20,7 L14,12"
                    fill="none"
                    stroke={C.green}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#CE9178",
                  }}
                >
                  "Hola"
                </span>
              </div>
            </div>
          </div>

          {/* Expression 2: $json.message.chat.id */}
          <div
            style={{
              opacity: h2Appear,
              transform: `translateX(${(1 - h2Appear) * 30}px)`,
            }}
          >
            <div
              style={{
                background: `${C.orange}15`,
                border: `1px solid ${C.orange}60`,
                borderRadius: 12,
                padding: "16px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 18,
                  color: C.orange,
                  marginBottom: 8,
                }}
              >
                $json.message.chat.id
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <svg width="24" height="14" viewBox="0 0 24 14">
                  <path
                    d="M0,7 L18,7 M14,2 L20,7 L14,12"
                    fill="none"
                    stroke={C.orange}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#B5CEA8",
                  }}
                >
                  123
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Phase 7: TIP - Card with blue border
// ============================================================

const PhaseTip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardAppear = spring({ frame, fps, delay: 10, config: { damping: 12 } });
  const iconPulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.95, 1.05],
  );

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
          padding: "48px 56px",
          border: `3px solid ${C.accent}`,
          boxShadow: `0 0 40px ${C.accent}25`,
          maxWidth: 800,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 48,
            marginBottom: 24,
            transform: `scale(${iconPulse})`,
          }}
        >
          💡
        </div>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 600,
            color: C.text,
            lineHeight: 1.6,
          }}
        >
          En n8n puedes ver el JSON de cada nodo
        </p>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 600,
            color: C.accent,
            lineHeight: 1.6,
          }}
        >
          haciendo click en la salida
        </p>

        <FadeText delay={40} style={{ marginTop: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: `${C.accent}15`,
              borderRadius: 10,
              padding: "10px 20px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" fill="none" stroke={C.accent} strokeWidth="2" />
              <path d="M10,6 L10,10 L13,13" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 16,
                color: C.accent,
              }}
            >
              Output &gt; JSON
            </span>
          </div>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2JSON: React.FC = () => {
  const frame = useCurrentFrame();

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
        from={S.QUE_ES.start}
        durationInFrames={S.QUE_ES.end - S.QUE_ES.start}
        premountFor={30}
      >
        <PhaseQueEs />
      </Sequence>

      <Sequence
        from={S.ANALOGIA.start}
        durationInFrames={S.ANALOGIA.end - S.ANALOGIA.start}
        premountFor={30}
      >
        <PhaseAnalogia />
      </Sequence>

      <Sequence
        from={S.EN_N8N.start}
        durationInFrames={S.EN_N8N.end - S.EN_N8N.start}
        premountFor={30}
      >
        <PhaseEnN8n />
      </Sequence>

      <Sequence
        from={S.EXPRESIONES.start}
        durationInFrames={S.EXPRESIONES.end - S.EXPRESIONES.start}
        premountFor={30}
      >
        <PhaseExpresiones />
      </Sequence>

      <Sequence
        from={S.EJEMPLO_REAL.start}
        durationInFrames={S.EJEMPLO_REAL.end - S.EJEMPLO_REAL.start}
        premountFor={30}
      >
        <PhaseEjemploReal />
      </Sequence>

      <Sequence
        from={S.TIP.start}
        durationInFrames={S.TIP.end - S.TIP.start}
        premountFor={30}
      >
        <PhaseTip />
      </Sequence>
    </AbsoluteFill>
  );
};
