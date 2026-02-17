import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { RECAP_COLORS, RECAP_LLM, TYPOGRAPHY } from "../utils/constants";
import { TokenBar } from "./components/TokenBar";
import { BrainIcon } from "./components/BrainIcon";

const S = RECAP_LLM;
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

const SpringText: React.FC<{
  children: React.ReactNode;
  delay: number;
  style?: React.CSSProperties;
}> = ({ children, delay, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, delay, config: { damping: 12 } });
  return (
    <div
      style={{
        opacity: s,
        transform: `scale(${s})`,
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
  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const subSpring = spring({ frame, fps, delay: 15, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
      }}
    >
      <h1
        style={{
          fontFamily: FONT,
          fontSize: 80,
          fontWeight: 700,
          color: C.text,
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          textAlign: "center",
          margin: 0,
        }}
      >
        ¿Qué es un <span style={{ color: C.accent }}>LLM</span>?
      </h1>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 32,
          color: C.textSecondary,
          opacity: subSpring,
          transform: `translateY(${(1 - subSpring) * 20}px)`,
          marginTop: 16,
        }}
      >
        Large Language Model
      </p>
    </AbsoluteFill>
  );
};

const PhaseDefinicion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <FadeText delay={0} style={{ textAlign: "center", marginBottom: 40 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 48,
            fontWeight: 600,
            color: C.text,
            lineHeight: 1.4,
            maxWidth: 1000,
          }}
        >
          Un modelo de lenguaje es un programa que{" "}
          <span style={{ color: C.accent }}>predice texto</span>
        </p>
      </FadeText>

      <FadeText delay={20}>
        <BrainIcon size={140} color={C.accent} glowColor={C.accent} />
      </FadeText>

      <FadeText delay={40} style={{ marginTop: 30 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 28,
            color: C.textSecondary,
            textAlign: "center",
          }}
        >
          GPT, Claude, Gemini son LLMs
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseNoEntiende: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const xProgress = interpolate(frame, [30, 50], [0, 1], {
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
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 56,
            fontWeight: 700,
            color: C.red,
            textAlign: "center",
          }}
        >
          La IA NO entiende
        </p>
      </FadeText>

      <FadeText delay={15}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <BrainIcon
            size={140}
            color={C.textSecondary}
            showX={true}
            xProgress={xProgress}
          />
        </div>
      </FadeText>

      <FadeText delay={30} style={{ marginTop: 10 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 22,
            color: C.textDim,
            textAlign: "center",
            textDecoration: "line-through",
            textDecorationColor: C.red,
          }}
        >
          comprensión
        </p>
      </FadeText>

      <FadeText delay={50} style={{ marginTop: 30 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 28,
            color: C.textSecondary,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Solo reconoce <span style={{ color: C.accent }}>patrones estadísticos</span>{" "}
          en billones de textos
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseTokensIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sentenceOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const splitProgress = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tokens = [
    { text: "Hola" },
    { text: "," },
    { text: "¿cómo" },
    { text: "est" },
    { text: "ás" },
    { text: "hoy" },
    { text: "?" },
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
        <p
          style={{
            fontFamily: FONT,
            fontSize: 40,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          ¿Cómo procesa el texto?
        </p>
      </FadeText>

      {/* Original sentence - fades out as tokens appear */}
      <div
        style={{
          opacity: sentenceOpacity * (1 - splitProgress),
          fontFamily: FONT,
          fontSize: 42,
          color: C.text,
          textAlign: "center",
          marginBottom: 30,
          position: "absolute",
          top: "45%",
        }}
      >
        Hola, ¿cómo estás hoy?
      </div>

      {/* Token blocks */}
      <div style={{ opacity: splitProgress, marginTop: 20 }}>
        <TokenBar tokens={tokens} startFrame={40} fontSize={32} />
      </div>

      <FadeText delay={80} style={{ marginTop: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 26,
            color: C.accent,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Tokens: la unidad mínima que procesa
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseTokensDetalle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const esTokens = [
    { text: "auto", color: C.token1 },
    { text: "mat", color: C.token2 },
    { text: "ización", color: C.token3 },
  ];
  const enTokens = [{ text: "automation", color: C.green }];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
        gap: 30,
      }}
    >
      {/* Spanish example */}
      <FadeText delay={0}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <p style={{ fontFamily: MONO, fontSize: 24, color: C.textSecondary, marginBottom: 12 }}>
            "automatización" →
          </p>
          <TokenBar tokens={esTokens} startFrame={10} fontSize={28} />
          <p style={{ fontFamily: FONT, fontSize: 18, color: C.textDim, marginTop: 8 }}>
            3 tokens
          </p>
        </div>
      </FadeText>

      {/* English example */}
      <FadeText delay={30}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <p style={{ fontFamily: MONO, fontSize: 24, color: C.textSecondary, marginBottom: 12 }}>
            "automation" →
          </p>
          <TokenBar tokens={enTokens} startFrame={40} fontSize={28} />
          <p style={{ fontFamily: FONT, fontSize: 18, color: C.textDim, marginTop: 8 }}>
            1 token
          </p>
        </div>
      </FadeText>

      <FadeText delay={60} style={{ marginTop: 10 }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: C.yellow, textAlign: "center", fontWeight: 600 }}>
          Español usa más tokens que inglés
        </p>
      </FadeText>

      <FadeText delay={80}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 10,
          }}
        >
          <span style={{ fontSize: 32 }}>💰</span>
          <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary }}>
            Pagas por token
          </p>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePrediccion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor blink
  const cursorOpacity = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // First prediction sequence
  const showBars1 = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chooseAzul = interpolate(frame, [70, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Second prediction
  const showPhase2 = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showBars2 = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ProbBar: React.FC<{
    label: string;
    pct: number;
    color: string;
    progress: number;
    chosen?: boolean;
  }> = ({ label, pct, color, progress, chosen }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
        opacity: progress,
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 20,
          color: C.text,
          width: 120,
          textAlign: "right",
          fontWeight: chosen ? 700 : 400,
        }}
      >
        "{label}"
      </span>
      <div
        style={{
          width: 300,
          height: 28,
          background: C.surface,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct * progress}%`,
            height: "100%",
            background: chosen ? color : `${color}88`,
            borderRadius: 6,
            transition: "none",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 18,
          color: chosen ? color : C.textSecondary,
          fontWeight: chosen ? 700 : 400,
        }}
      >
        {Math.round(pct * progress)}%
      </span>
    </div>
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
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.text }}>
          ¿Cómo genera texto?
        </p>
      </FadeText>

      {/* Sequence text */}
      <div style={{ marginBottom: 30 }}>
        <span style={{ fontFamily: FONT, fontSize: 36, color: C.text }}>
          "El cielo es
        </span>
        {chooseAzul > 0 && (
          <span
            style={{
              fontFamily: FONT,
              fontSize: 36,
              color: C.accent,
              fontWeight: 700,
              opacity: chooseAzul,
            }}
          >
            {" "}azul
          </span>
        )}
        {showPhase2 > 0 && (
          <span
            style={{
              fontFamily: FONT,
              fontSize: 36,
              color: C.text,
              opacity: showPhase2,
            }}
          >
            {" "}y...
          </span>
        )}
        <span
          style={{
            fontFamily: MONO,
            fontSize: 36,
            color: C.accent,
            opacity: cursorOpacity,
          }}
        >
          ▎
        </span>
        <span style={{ fontFamily: FONT, fontSize: 36, color: C.text }}>"</span>
      </div>

      {/* First probability bars */}
      {showBars1 > 0 && chooseAzul < 1 && (
        <div style={{ opacity: showBars1 }}>
          <ProbBar label="azul" pct={78} color={C.accent} progress={showBars1} chosen />
          <ProbBar label="hermoso" pct={12} color={C.teal} progress={showBars1} />
          <ProbBar label="infinito" pct={5} color={C.purple} progress={showBars1} />
        </div>
      )}

      {/* Second probability bars */}
      {showBars2 > 0 && (
        <div style={{ opacity: showBars2 }}>
          <ProbBar label="brillante" pct={45} color={C.accent} progress={showBars2} chosen />
          <ProbBar label="claro" pct={30} color={C.teal} progress={showBars2} />
        </div>
      )}
    </AbsoluteFill>
  );
};

const PhaseContexto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barFill = interpolate(frame, [30, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const sections = [
    { label: "Sistema", color: C.purple, width: 0.15 },
    { label: "Historial...", color: C.teal, width: 0.4 },
    { label: "Tu mensaje", color: C.accent, width: 0.2 },
    { label: "Respuesta", color: C.green, width: 0.25 },
  ];

  let offsetX = 0;

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
        <p style={{ fontFamily: FONT, fontSize: 48, fontWeight: 700, color: C.text }}>
          Ventana de Contexto
        </p>
      </FadeText>

      {/* Context bar */}
      <div style={{ width: 900, marginBottom: 30 }}>
        <div
          style={{
            width: "100%",
            height: 60,
            background: C.surface,
            borderRadius: 12,
            overflow: "hidden",
            display: "flex",
            position: "relative",
          }}
        >
          {sections.map((sec, i) => {
            const sectionStart = offsetX;
            offsetX += sec.width;
            const sectionFill = interpolate(
              barFill,
              [sectionStart, Math.min(sectionStart + sec.width, 1)],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  width: `${sec.width * 100}%`,
                  height: "100%",
                  background: sec.color,
                  opacity: sectionFill * 0.8 + 0.2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: i < sections.length - 1 ? `2px solid ${C.background}` : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    color: "#fff",
                    fontWeight: 600,
                    opacity: sectionFill,
                  }}
                >
                  {sec.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Labels below */}
        <div style={{ display: "flex", marginTop: 8 }}>
          {sections.map((sec, i) => {
            offsetX = 0;
            return (
              <div
                key={i}
                style={{
                  width: `${sec.width * 100}%`,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    color: sec.color,
                    fontWeight: 500,
                  }}
                >
                  {sec.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <FadeText delay={70} style={{ marginTop: 10 }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: C.accent, fontWeight: 600 }}>
          128,000 tokens ≈ 190 páginas
        </p>
      </FadeText>

      <FadeText delay={90} style={{ marginTop: 20 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary, textAlign: "center" }}>
          Todo lo que el modelo puede "ver" a la vez
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseLostInMiddle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barCount = 30;
  const animProgress = interpolate(frame, [30, 100], [0, 1], {
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
      <FadeText delay={0} style={{ marginBottom: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.text }}>
          "Lost in the Middle"
        </p>
      </FadeText>

      {/* U-shape attention graph */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 4,
          height: 200,
          marginBottom: 30,
        }}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          // U-shape: high at edges, low in middle
          const normalized = i / (barCount - 1);
          const uShape = Math.pow(2 * normalized - 1, 2);
          const height = 30 + uShape * 170;
          const brightness = 0.2 + uShape * 0.8;

          return (
            <div
              key={i}
              style={{
                width: 24,
                height: height * animProgress,
                background: C.accent,
                borderRadius: 4,
                opacity: brightness * animProgress,
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: barCount * 28,
          marginBottom: 30,
        }}
      >
        <FadeText delay={60}>
          <span style={{ fontFamily: FONT, fontSize: 16, color: C.green, fontWeight: 600 }}>
            ↑ Inicio (alta atención)
          </span>
        </FadeText>
        <FadeText delay={70}>
          <span style={{ fontFamily: FONT, fontSize: 16, color: C.red, fontWeight: 600 }}>
            ↓ Medio (baja atención)
          </span>
        </FadeText>
        <FadeText delay={80}>
          <span style={{ fontFamily: FONT, fontSize: 16, color: C.green, fontWeight: 600 }}>
            ↑ Final (alta atención)
          </span>
        </FadeText>
      </div>

      <FadeText delay={100} style={{ marginTop: 10 }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: C.yellow, textAlign: "center" }}>
          El modelo "olvida" información del medio
        </p>
      </FadeText>

      <FadeText delay={120} style={{ marginTop: 20 }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 12,
            padding: "16px 32px",
            border: `1px solid ${C.accent}`,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 22, color: C.accent }}>
            💡 Tip: Información importante → al inicio o al final
          </p>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseResumen: React.FC = () => {
  const points = [
    { num: "1", text: "Predice texto, no piensa", color: C.accent },
    { num: "2", text: "Procesa en tokens (costo + límite)", color: C.yellow },
    { num: "3", text: "Tiene una ventana de contexto finita", color: C.green },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        background: C.background,
        paddingLeft: "15%",
        paddingRight: "15%",
      }}
    >
      <FadeText delay={0} style={{ marginBottom: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.text }}>
          Resumen
        </p>
      </FadeText>

      {points.map((p, i) => (
        <FadeText key={i} delay={20 + i * 25}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: p.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT,
                fontSize: 22,
                fontWeight: 700,
                color: "#000",
                flexShrink: 0,
              }}
            >
              {p.num}
            </div>
            <p style={{ fontFamily: FONT, fontSize: 32, color: C.text }}>
              {p.text}
            </p>
          </div>
        </FadeText>
      ))}
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const RecapQueEsLLM: React.FC = () => {
  const frame = useCurrentFrame();

  // Global fade-out for loop
  const fadeOut = interpolate(frame, [S.FADE_LOOP.start, S.FADE_LOOP.end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.background, opacity: fadeOut }}>
      <Sequence from={S.TITULO.start} durationInFrames={S.TITULO.end - S.TITULO.start} premountFor={30}>
        <PhaseTitulo />
      </Sequence>

      <Sequence from={S.DEFINICION.start} durationInFrames={S.DEFINICION.end - S.DEFINICION.start} premountFor={30}>
        <PhaseDefinicion />
      </Sequence>

      <Sequence from={S.NO_ENTIENDE.start} durationInFrames={S.NO_ENTIENDE.end - S.NO_ENTIENDE.start} premountFor={30}>
        <PhaseNoEntiende />
      </Sequence>

      <Sequence from={S.TOKENS_INTRO.start} durationInFrames={S.TOKENS_INTRO.end - S.TOKENS_INTRO.start} premountFor={30}>
        <PhaseTokensIntro />
      </Sequence>

      <Sequence from={S.TOKENS_DETALLE.start} durationInFrames={S.TOKENS_DETALLE.end - S.TOKENS_DETALLE.start} premountFor={30}>
        <PhaseTokensDetalle />
      </Sequence>

      <Sequence from={S.PREDICCION.start} durationInFrames={S.PREDICCION.end - S.PREDICCION.start} premountFor={30}>
        <PhasePrediccion />
      </Sequence>

      <Sequence from={S.CONTEXTO.start} durationInFrames={S.CONTEXTO.end - S.CONTEXTO.start} premountFor={30}>
        <PhaseContexto />
      </Sequence>

      <Sequence from={S.LOST_MIDDLE.start} durationInFrames={S.LOST_MIDDLE.end - S.LOST_MIDDLE.start} premountFor={30}>
        <PhaseLostInMiddle />
      </Sequence>

      <Sequence from={S.RESUMEN.start} durationInFrames={S.RESUMEN.end - S.RESUMEN.start} premountFor={30}>
        <PhaseResumen />
      </Sequence>
    </AbsoluteFill>
  );
};
