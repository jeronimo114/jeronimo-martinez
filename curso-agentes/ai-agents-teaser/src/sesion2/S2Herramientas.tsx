import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_HERRAMIENTAS, TYPOGRAPHY } from "../utils/constants";
import { BrainIcon } from "../recap/components/BrainIcon";
import { ToolIcon } from "../recap/components/ToolIcon";
import { N8nNode } from "./components/N8nNode";

const S = S2_HERRAMIENTAS;
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
        <span style={{ color: C.accent }}>Herramientas</span> del Agente
      </h1>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 32,
          color: C.textSecondary,
          opacity: sub,
          transform: `translateY(${(1 - sub) * 20}px)`,
          marginTop: 16,
          fontStyle: "italic",
        }}
      >
        Tools
      </p>
    </AbsoluteFill>
  );
};

const PhaseLimitacion: React.FC = () => {
  const limitations = [
    "No calcula",
    "No navega web",
    "No busca datos actuales",
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
      <FadeText delay={0} style={{ marginBottom: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <BrainIcon size={100} color={C.textSecondary} />
          <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.text }}>
            Un LLM solo tiene <span style={{ color: C.red }}>limitaciones</span>
          </p>
        </div>
      </FadeText>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
        {limitations.map((item, i) => (
          <FadeText key={i} delay={25 + i * 20}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: C.red,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                ✗
              </div>
              <p style={{ fontFamily: FONT, fontSize: 32, color: C.textSecondary }}>
                {item}
              </p>
            </div>
          </FadeText>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PhaseConcepto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools: { icon: "globe" | "terminal" | "database" | "document"; label: string }[] = [
    { icon: "globe", label: "HTTP / Globe" },
    { icon: "terminal", label: "Code" },
    { icon: "database", label: "Wikipedia" },
    { icon: "document", label: "Calculator" },
  ];

  const brainScale = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <div style={{ position: "relative", width: 600, height: 400 }}>
        {/* Center brain */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${brainScale})`,
            opacity: brainScale,
          }}
        >
          <BrainIcon size={100} color={C.accent} />
        </div>

        {/* Orbiting tools */}
        {tools.map((tool, i) => {
          const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 180;
          const toolSpring = spring({
            frame,
            fps,
            delay: 15 + i * 12,
            config: { damping: 12 },
          });

          const orbitAngle = angle + frame * 0.005;
          const x = Math.cos(orbitAngle) * radius * toolSpring;
          const y = Math.sin(orbitAngle) * radius * toolSpring;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${toolSpring})`,
                opacity: toolSpring,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 16,
                  background: C.surface,
                  border: `2px solid ${C.accent}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <ToolIcon icon={tool.icon} size={36} color={C.accent} />
              </div>
              <span style={{ fontFamily: FONT, fontSize: 14, color: C.textSecondary }}>
                {tool.label}
              </span>
            </div>
          );
        })}
      </div>

      <FadeText delay={80}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: C.text, textAlign: "center" }}>
          El agente <span style={{ color: C.accent, fontWeight: 700 }}>DECIDE</span> cuando usar cada una
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseDecision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionSpring = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const thinkSpring = spring({ frame, fps, delay: 30, config: { damping: 200 } });
  const calcSpring = spring({ frame, fps, delay: 55, config: { damping: 12 } });
  const correctSpring = spring({ frame, fps, delay: 80, config: { damping: 200 } });
  const withoutSpring = spring({ frame, fps, delay: 120, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      {/* Flow: Question -> Agent thinks -> Calculator -> Answer */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 50 }}>
        {/* User question */}
        <div
          style={{
            opacity: questionSpring,
            transform: `translateY(${(1 - questionSpring) * 20}px)`,
            background: C.surface,
            borderRadius: 16,
            padding: "16px 24px",
            border: `2px solid ${C.accent}`,
            maxWidth: 260,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>
            Usuario pregunta:
          </p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: C.text, fontWeight: 600 }}>
            "¿Cuanto es 1547 x 23?"
          </p>
        </div>

        {/* Arrow */}
        <div style={{ opacity: thinkSpring }}>
          <svg width="40" height="20" viewBox="0 0 40 20">
            <path
              d="M0,10 L30,10 M24,4 L32,10 L24,16"
              fill="none"
              stroke={C.textDim}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Agent thinks */}
        <div
          style={{
            opacity: thinkSpring,
            transform: `translateY(${(1 - thinkSpring) * 20}px)`,
            textAlign: "center",
          }}
        >
          <BrainIcon size={60} color={C.accent} />
          <p style={{ fontFamily: FONT, fontSize: 14, color: C.accent, fontWeight: 600, marginTop: 4 }}>
            Agente piensa...
          </p>
        </div>

        {/* Arrow */}
        <div style={{ opacity: calcSpring }}>
          <svg width="40" height="20" viewBox="0 0 40 20">
            <path
              d="M0,10 L30,10 M24,4 L32,10 L24,16"
              fill="none"
              stroke={C.textDim}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Calculator tool */}
        <div
          style={{
            opacity: calcSpring,
            transform: `scale(${calcSpring})`,
            background: C.surface,
            borderRadius: 16,
            padding: "16px 24px",
            border: `2px solid ${C.yellow}`,
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 28 }}>🧮</span>
          <p style={{ fontFamily: FONT, fontSize: 16, color: C.yellow, fontWeight: 600, marginTop: 4 }}>
            Calculator
          </p>
        </div>

        {/* Arrow */}
        <div style={{ opacity: correctSpring }}>
          <svg width="40" height="20" viewBox="0 0 40 20">
            <path
              d="M0,10 L30,10 M24,4 L32,10 L24,16"
              fill="none"
              stroke={C.textDim}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Correct answer */}
        <div
          style={{
            opacity: correctSpring,
            transform: `translateY(${(1 - correctSpring) * 20}px)`,
            background: C.surface,
            borderRadius: 16,
            padding: "16px 24px",
            border: `2px solid ${C.green}`,
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 28, color: C.green, fontWeight: 700 }}>
            35,581
          </p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: C.green, marginTop: 4 }}>
            ✓ Correcto
          </p>
        </div>
      </div>

      {/* Without tool comparison */}
      <div
        style={{
          opacity: withoutSpring,
          transform: `translateY(${(1 - withoutSpring) * 20}px)`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: C.surface,
          borderRadius: 12,
          padding: "16px 32px",
          border: `1px solid ${C.red}40`,
        }}
      >
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textSecondary }}>
          Sin tool →
        </p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: C.red, fontWeight: 700 }}>
          35,700
        </p>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: C.red,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          ✗
        </div>
        <p style={{ fontFamily: FONT, fontSize: 18, color: C.red }}>
          Incorrecto
        </p>
      </div>
    </AbsoluteFill>
  );
};

const PhasePuertoTool: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const toolNodes = [
    { label: "Calculator", icon: "🧮", delay: 30 },
    { label: "HTTP Request", icon: "🌐", delay: 45 },
    { label: "Code (JS)", icon: "💻", delay: 60 },
    { label: "Wikipedia", icon: "📚", delay: 75 },
  ];

  const lineAppear = spring({ frame, fps, delay: 20, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      <FadeText delay={0} style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: FONT, fontSize: 32, fontWeight: 600, color: C.text }}>
          Puertos de herramientas en <span style={{ color: C.accent }}>n8n</span>
        </p>
      </FadeText>

      {/* AI Agent node with bottom ports */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <N8nNode
          label="AI Agent"
          icon="🤖"
          color={C.accent}
          width={220}
          height={90}
          delay={5}
          highlighted
          ports={{ top: true, bottom: 3 }}
        />

        {/* Port labels */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 4,
            opacity: lineAppear,
          }}
        >
          <span style={{ fontFamily: FONT, fontSize: 11, color: C.textDim, width: 60, textAlign: "center" }}>
            Memory
          </span>
          <span style={{ fontFamily: FONT, fontSize: 11, color: C.yellow, width: 60, textAlign: "center", fontWeight: 600 }}>
            Tool
          </span>
          <span style={{ fontFamily: FONT, fontSize: 11, color: C.yellow, width: 60, textAlign: "center", fontWeight: 600 }}>
            Tool
          </span>
        </div>

        {/* Connection lines */}
        <svg
          width="500"
          height="60"
          viewBox="0 0 500 60"
          style={{ opacity: lineAppear, marginTop: -2 }}
        >
          {/* Line from port 1 (memory) - just goes down, no tool */}
          <line x1="162" y1="0" x2="162" y2="20" stroke={C.textDim} strokeWidth="2" strokeDasharray="4 3" />
          {/* Line from port 2 (tool) - fans out to left tools */}
          <path d="M220,0 L220,20 Q220,30 180,30 L100,30 L100,60" fill="none" stroke={C.yellow} strokeWidth="2" />
          <path d="M220,0 L220,20 Q220,30 220,30 L220,60" fill="none" stroke={C.yellow} strokeWidth="2" />
          {/* Line from port 3 (tool) - fans out to right tools */}
          <path d="M278,0 L278,20 Q278,30 310,30 L310,60" fill="none" stroke={C.yellow} strokeWidth="2" />
          <path d="M278,0 L278,20 Q278,30 370,30 L400,30 L400,60" fill="none" stroke={C.yellow} strokeWidth="2" />
        </svg>

        {/* Tool nodes */}
        <div style={{ display: "flex", gap: 24, marginTop: -2 }}>
          {toolNodes.map((tool, i) => (
            <N8nNode
              key={i}
              label={tool.label}
              icon={tool.icon}
              color={C.yellow}
              width={140}
              height={70}
              delay={tool.delay}
              ports={{ top: true }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PhaseCatalogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools = [
    { name: "Calculator", icon: "🧮", color: C.yellow },
    { name: "HTTP Request", icon: "🌐", color: C.accent },
    { name: "Code (JS)", icon: "💻", color: C.green },
    { name: "Wikipedia", icon: "📚", color: C.teal },
    { name: "SerpAPI", icon: "🔍", color: C.orange },
    { name: "WolframAlpha", icon: "🔢", color: C.red },
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
        <p style={{ fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.text }}>
          Catalogo de <span style={{ color: C.accent }}>Herramientas</span>
        </p>
      </FadeText>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
          maxWidth: 900,
        }}
      >
        {tools.map((tool, i) => {
          const cardSpring = spring({
            frame,
            fps,
            delay: 15 + i * 12,
            config: { damping: 12 },
          });

          return (
            <div
              key={i}
              style={{
                width: 250,
                padding: "28px 20px",
                background: C.surface,
                borderRadius: 16,
                border: `2px solid ${tool.color}40`,
                textAlign: "center",
                transform: `scale(${cardSpring})`,
                opacity: cardSpring,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: `${tool.color}20`,
                  border: `2px solid ${tool.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: 28,
                }}
              >
                {tool.icon}
              </div>
              <p style={{ fontFamily: FONT, fontSize: 20, color: C.text, fontWeight: 600 }}>
                {tool.name}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PhaseResumen: React.FC = () => {
  const points = [
    { num: "1", text: "Herramientas = capacidades reales del agente", color: C.accent },
    { num: "2", text: "El agente decide cual y cuando usar", color: C.green },
    { num: "3", text: "Se conectan como nodos en n8n", color: C.purple },
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

export const S2Herramientas: React.FC = () => {
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

      <Sequence from={S.LIMITACION.start} durationInFrames={S.LIMITACION.end - S.LIMITACION.start} premountFor={30}>
        <PhaseLimitacion />
      </Sequence>

      <Sequence from={S.CONCEPTO.start} durationInFrames={S.CONCEPTO.end - S.CONCEPTO.start} premountFor={30}>
        <PhaseConcepto />
      </Sequence>

      <Sequence from={S.DECISION.start} durationInFrames={S.DECISION.end - S.DECISION.start} premountFor={30}>
        <PhaseDecision />
      </Sequence>

      <Sequence from={S.PUERTO_TOOL.start} durationInFrames={S.PUERTO_TOOL.end - S.PUERTO_TOOL.start} premountFor={30}>
        <PhasePuertoTool />
      </Sequence>

      <Sequence from={S.CATALOGO.start} durationInFrames={S.CATALOGO.end - S.CATALOGO.start} premountFor={30}>
        <PhaseCatalogo />
      </Sequence>

      <Sequence from={S.RESUMEN.start} durationInFrames={S.RESUMEN.end - S.RESUMEN.start} premountFor={30}>
        <PhaseResumen />
      </Sequence>
    </AbsoluteFill>
  );
};
