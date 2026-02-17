import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_SYSTEM_PROMPT, TYPOGRAPHY } from "../utils/constants";
import { ChatBubble } from "./components/ChatBubble";
import { N8nNode } from "./components/N8nNode";
import { TipCard } from "./components/TipCard";
import { SplitScreen } from "./components/SplitScreen";

const S = S2_SYSTEM_PROMPT;
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
          fontSize: 76,
          fontWeight: 700,
          color: C.text,
          transform: `scale(${s})`,
          opacity: s,
          textAlign: "center",
        }}
      >
        <span style={{ color: C.accent }}>System Prompt</span>
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
        La instruccion invisible
      </p>
    </AbsoluteFill>
  );
};

const PhaseAnalogia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personAppear = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const arrowAppear = spring({ frame, fps, delay: 20, config: { damping: 200 } });
  const docAppear = spring({ frame, fps, delay: 30, config: { damping: 12 } });

  const items: { label: string; color: string; delay: number }[] = [
    { label: "Nombre", color: C.accent, delay: 60 },
    { label: "Idioma", color: C.green, delay: 75 },
    { label: "Tono", color: C.purple, delay: 90 },
    { label: "Reglas", color: C.red, delay: 105 },
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
      {/* Person -> Document analogy */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 40 }}>
        <div
          style={{
            opacity: personAppear,
            transform: `scale(${personAppear})`,
          }}
        >
          <svg width="100" height="120" viewBox="0 0 100 120">
            {/* Head */}
            <circle cx="50" cy="30" r="22" fill={C.surfaceLight} stroke={C.accent} strokeWidth="2" />
            {/* Eyes */}
            <circle cx="42" cy="26" r="3" fill={C.accent} />
            <circle cx="58" cy="26" r="3" fill={C.accent} />
            {/* Smile */}
            <path d="M42,36 Q50,44 58,36" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" />
            {/* Body */}
            <rect x="30" y="56" width="40" height="50" rx="8" fill={C.surfaceLight} stroke={C.accent} strokeWidth="2" />
            {/* Tie / badge */}
            <rect x="44" y="58" width="12" height="16" rx="3" fill={C.accent} opacity={0.5} />
          </svg>
        </div>

        <div style={{ opacity: arrowAppear }}>
          <svg width="60" height="30" viewBox="0 0 60 30">
            <path
              d="M0,15 L48,15 M40,6 L52,15 L40,24"
              fill="none"
              stroke={C.textDim}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            opacity: docAppear,
            transform: `scale(${docAppear})`,
          }}
        >
          <svg width="90" height="110" viewBox="0 0 90 110">
            {/* Document */}
            <rect x="5" y="5" width="70" height="90" rx="6" fill={C.surface} stroke={C.accent} strokeWidth="2" />
            {/* Fold corner */}
            <path d="M55,5 L55,25 L75,25" fill={C.surfaceLight} stroke={C.accent} strokeWidth="1.5" />
            {/* Lines */}
            <rect x="15" y="35" width="40" height="4" rx="2" fill={C.accent} opacity={0.4} />
            <rect x="15" y="45" width="50" height="4" rx="2" fill={C.textDim} opacity={0.3} />
            <rect x="15" y="55" width="35" height="4" rx="2" fill={C.textDim} opacity={0.3} />
            <rect x="15" y="65" width="45" height="4" rx="2" fill={C.textDim} opacity={0.3} />
            <rect x="15" y="75" width="30" height="4" rx="2" fill={C.textDim} opacity={0.3} />
          </svg>
        </div>
      </div>

      <FadeText delay={45}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: C.text, textAlign: "center", marginBottom: 36 }}>
          Como el <span style={{ color: C.accent, fontWeight: 700 }}>brief</span> que le das a un empleado nuevo
        </p>
      </FadeText>

      {/* 4 items the prompt defines */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((item, i) => {
          const itemSpring = spring({
            frame,
            fps,
            delay: item.delay,
            config: { damping: 12 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: itemSpring,
                transform: `scale(${itemSpring})`,
                background: C.surface,
                border: `2px solid ${item.color}`,
                borderRadius: 12,
                padding: "12px 28px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 22,
                  fontWeight: 600,
                  color: item.color,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PhaseTiposMsg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blocks: { label: string; color: string; isSystem: boolean; delay: number }[] = [
    { label: "System", color: C.accent, isSystem: true, delay: 10 },
    { label: "User", color: C.green, isSystem: false, delay: 25 },
    { label: "Assistant", color: C.purple, isSystem: false, delay: 40 },
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
        <p style={{ fontFamily: FONT, fontSize: 38, fontWeight: 700, color: C.text }}>
          Tipos de mensaje
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 40, marginBottom: 50 }}>
        {blocks.map((block, i) => {
          const blockSpring = spring({
            frame,
            fps,
            delay: block.delay,
            config: { damping: 12 },
          });
          const glowPulse = block.isSystem
            ? interpolate(
                Math.sin(frame * 0.08),
                [-1, 1],
                [0.3, 0.7],
              )
            : 0;

          return (
            <div
              key={i}
              style={{
                opacity: blockSpring,
                transform: `scale(${blockSpring})`,
                width: 220,
                height: 120,
                background: block.isSystem ? `${block.color}15` : C.surface,
                border: `2px solid ${block.color}`,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: block.isSystem
                  ? `0 0 ${20 + glowPulse * 20}px ${block.color}${Math.round(40 + glowPulse * 40).toString(16)}`
                  : "none",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  fontWeight: 700,
                  color: block.color,
                }}
              >
                {block.label}
              </span>
              {block.isSystem && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: -12,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: block.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 14, color: "#fff", fontWeight: 700 }}>!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <FadeText delay={60}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary, textAlign: "center" }}>
          El usuario <span style={{ color: C.red, fontWeight: 700 }}>nunca</span> ve este mensaje
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseEjemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalFrames = S.EJEMPLO.end - S.EJEMPLO.start;

  const lines: { text: string; color: string }[] = [
    { text: "Eres ESIC-Bot,", color: C.accent },
    { text: "un asistente de la universidad ESIC.", color: C.accent },
    { text: "", color: C.text },
    { text: "Idioma: siempre responde en espanol.", color: C.green },
    { text: "", color: C.text },
    { text: "Tono: amable y profesional.", color: C.purple },
    { text: "", color: C.text },
    { text: "Regla: nunca inventes informacion.", color: C.red },
    { text: "Si no sabes, di 'No tengo esa info'.", color: C.red },
  ];

  const headerAppear = spring({ frame, fps, delay: 5, config: { damping: 200 } });

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
          Ejemplo de System Prompt
        </p>
      </FadeText>

      <div
        style={{
          opacity: headerAppear,
          background: C.surface,
          borderRadius: 16,
          padding: "32px 40px",
          border: `1px solid ${C.accent}40`,
          maxWidth: 900,
          width: "100%",
        }}
      >
        {/* Terminal-style header */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
          <span style={{ fontFamily: MONO, fontSize: 12, color: C.textDim, marginLeft: 12 }}>
            system_prompt.txt
          </span>
        </div>

        {/* Typewriter lines */}
        {lines.map((line, i) => {
          // Stagger each line across the available frames
          const lineDelay = 20 + i * 20;
          const lineProgress = interpolate(
            frame,
            [lineDelay, lineDelay + 25],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          if (line.text === "") {
            return (
              <div
                key={i}
                style={{
                  height: 12,
                  opacity: lineProgress,
                }}
              />
            );
          }

          const visibleChars = Math.floor(lineProgress * line.text.length);
          const displayText = line.text.substring(0, visibleChars);
          const showCursor = lineProgress > 0 && lineProgress < 1;

          return (
            <div key={i} style={{ opacity: lineProgress > 0 ? 1 : 0, marginBottom: 4, minHeight: 28 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 20,
                  color: line.color,
                  lineHeight: 1.5,
                }}
              >
                {displayText}
              </span>
              {showCursor && (
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 20,
                    color: C.accent,
                    opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                  }}
                >
                  |
                </span>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PhaseSinVsCon: React.FC = () => {
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
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.text }}>
          La diferencia es enorme
        </p>
      </FadeText>

      <SplitScreen
        leftTitle="Sin System Prompt"
        rightTitle="Con System Prompt"
        leftColor={C.red}
        rightColor={C.green}
        delay={15}
        leftContent={
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ChatBubble text="Hola" isUser delay={30} />
            <ChatBubble
              text="Hola. Soy un modelo de lenguaje. Puedo ayudarte con muchas cosas. Que necesitas?"
              delay={50}
            />
          </div>
        }
        rightContent={
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ChatBubble text="Hola" isUser delay={45} />
            <ChatBubble
              text="Hola! Soy ESIC-Bot, tu asistente universitario. En que puedo ayudarte hoy?"
              delay={65}
              color={`${C.green}20`}
            />
          </div>
        }
      />
    </AbsoluteFill>
  );
};

const PhaseEnN8n: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arrowAppear = spring({ frame, fps, delay: 40, config: { damping: 200 } });
  const textAppear = spring({ frame, fps, delay: 55, config: { damping: 200 } });

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
          En <span style={{ color: C.accent }}>n8n</span>
        </p>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        <N8nNode
          label="AI Agent"
          icon="🤖"
          color={C.accent}
          width={220}
          height={110}
          delay={10}
          highlighted
          highlightField="System Message"
          ports={{ top: true, bottom: 1 }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
            opacity: arrowAppear,
          }}
        >
          {/* Arrow pointing left toward node */}
          <svg width="120" height="40" viewBox="0 0 120 40">
            <path
              d="M120,20 L12,20 M20,10 L8,20 L20,30"
              fill="none"
              stroke={C.accent}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            opacity: textAppear,
            transform: `translateX(${(1 - textAppear) * 20}px)`,
          }}
        >
          <div
            style={{
              background: `${C.accent}15`,
              border: `1px solid ${C.accent}60`,
              borderRadius: 12,
              padding: "20px 28px",
              maxWidth: 360,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: C.accent, marginBottom: 8 }}>
              Aqui se configura
            </p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.textSecondary, lineHeight: 1.5 }}>
              El campo <span style={{ color: C.accent, fontWeight: 600 }}>System Message</span> del nodo AI Agent
              es donde escribes tu System Prompt.
            </p>
          </div>
        </div>
      </div>

      <FadeText delay={80} style={{ marginTop: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textDim, textAlign: "center" }}>
          Cada vez que un usuario escribe, n8n envia este mensaje oculto primero
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseTips: React.FC = () => {
  const tips: { icon: string; text: string; delay: number }[] = [
    { icon: "🎯", text: "Se especifico", delay: 10 },
    { icon: "🌐", text: "Define el idioma", delay: 25 },
    { icon: "🛑", text: "Pon limites", delay: 40 },
    { icon: "🔄", text: "Prueba y ajusta", delay: 55 },
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
        <p style={{ fontFamily: FONT, fontSize: 38, fontWeight: 700, color: C.text }}>
          Tips para un buen System Prompt
        </p>
      </FadeText>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 800,
          width: "100%",
        }}
      >
        {tips.map((tip, i) => (
          <TipCard key={i} icon={tip.icon} text={tip.text} delay={tip.delay} color={C.accent} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PhaseResumen: React.FC = () => {
  const points = [
    { num: "1", text: "Es la instruccion que define la personalidad del bot", color: C.accent },
    { num: "2", text: "El usuario nunca lo ve, pero siempre esta activo", color: C.green },
    { num: "3", text: "En n8n se configura en el campo System Message", color: C.purple },
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
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
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

export const S2SystemPrompt: React.FC = () => {
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

      <Sequence from={S.ANALOGIA.start} durationInFrames={S.ANALOGIA.end - S.ANALOGIA.start} premountFor={30}>
        <PhaseAnalogia />
      </Sequence>

      <Sequence from={S.TIPOS_MSG.start} durationInFrames={S.TIPOS_MSG.end - S.TIPOS_MSG.start} premountFor={30}>
        <PhaseTiposMsg />
      </Sequence>

      <Sequence from={S.EJEMPLO.start} durationInFrames={S.EJEMPLO.end - S.EJEMPLO.start} premountFor={30}>
        <PhaseEjemplo />
      </Sequence>

      <Sequence from={S.SIN_VS_CON.start} durationInFrames={S.SIN_VS_CON.end - S.SIN_VS_CON.start} premountFor={30}>
        <PhaseSinVsCon />
      </Sequence>

      <Sequence from={S.EN_N8N.start} durationInFrames={S.EN_N8N.end - S.EN_N8N.start} premountFor={30}>
        <PhaseEnN8n />
      </Sequence>

      <Sequence from={S.TIPS.start} durationInFrames={S.TIPS.end - S.TIPS.start} premountFor={30}>
        <PhaseTips />
      </Sequence>

      <Sequence from={S.RESUMEN.start} durationInFrames={S.RESUMEN.end - S.RESUMEN.start} premountFor={30}>
        <PhaseResumen />
      </Sequence>
    </AbsoluteFill>
  );
};
