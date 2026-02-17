import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_ARQUITECTURA, TYPOGRAPHY } from "../utils/constants";
import { N8nNode } from "./components/N8nNode";

const S = S2_ARQUITECTURA;
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
          margin: 0,
        }}
      >
        Tu <span style={{ color: C.accent }}>Chatbot</span> Completo
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
        Arquitectura pieza por pieza
      </p>
    </AbsoluteFill>
  );
};

const PhasePieza1: React.FC = () => {
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
        <p style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.textDim }}>
          Pieza 1
        </p>
      </FadeText>

      <N8nNode
        label="Telegram Trigger"
        icon="\u{1F4F1}"
        color={C.teal}
        width={220}
        height={100}
        delay={10}
        highlighted
        ports={{ right: true }}
      />

      <FadeText delay={30} style={{ marginTop: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.text, textAlign: "center" }}>
          El <span style={{ color: C.teal }}>punto de entrada</span>
        </p>
      </FadeText>

      <FadeText delay={50} style={{ marginTop: 16 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          Cada mensaje de Telegram dispara el flujo
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePieza2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arrowAppear = spring({ frame, fps, delay: 20, config: { damping: 200 } });

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
        <p style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.textDim }}>
          Pieza 2
        </p>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <N8nNode
          label="Telegram Trigger"
          icon="\u{1F4F1}"
          color={C.teal}
          width={200}
          height={90}
          delay={5}
          ports={{ right: true }}
        />

        {/* Arrow connecting nodes */}
        <svg width="80" height="20" style={{ opacity: arrowAppear, overflow: "visible" }}>
          <line x1="0" y1="10" x2={60 * arrowAppear} y2="10" stroke={C.textDim} strokeWidth={2} />
          {arrowAppear > 0.8 && (
            <polygon points="56,5 64,10 56,15" fill={C.textDim} />
          )}
        </svg>

        <N8nNode
          label="AI Agent"
          icon="\u{1F916}"
          color={C.accent}
          width={220}
          height={110}
          delay={15}
          highlighted
          highlightField="System Prompt"
          ports={{ left: true, bottom: 2 }}
        />
      </div>

      <FadeText delay={40} style={{ marginTop: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.text, textAlign: "center" }}>
          El <span style={{ color: C.accent }}>cerebro</span> con personalidad
        </p>
      </FadeText>

      <FadeText delay={60} style={{ marginTop: 16 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          Aqui defines quien es tu bot
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePieza3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineAppear = spring({ frame, fps, delay: 25, config: { damping: 200 } });

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
        <p style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.textDim }}>
          Pieza 3
        </p>
      </FadeText>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <N8nNode
          label="AI Agent"
          icon="\u{1F916}"
          color={C.accent}
          width={220}
          height={100}
          delay={5}
          highlighted
          ports={{ bottom: 1 }}
        />

        {/* Vertical connection */}
        <svg width="20" height="50" style={{ opacity: lineAppear, overflow: "visible" }}>
          <line x1="10" y1="0" x2="10" y2={40 * lineAppear} stroke={C.textDim} strokeWidth={2} />
          {lineAppear > 0.8 && (
            <polygon points="6,36 10,44 14,36" fill={C.textDim} />
          )}
        </svg>

        <N8nNode
          label="Window Memory"
          icon="\u{1F9E0}"
          color={C.purple}
          width={220}
          height={90}
          delay={20}
          highlighted
          ports={{ top: true }}
        />
      </div>

      <FadeText delay={45} style={{ marginTop: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.text, textAlign: "center" }}>
          <span style={{ color: C.purple }}>Recuerda</span> la conversacion
        </p>
      </FadeText>

      <FadeText delay={65} style={{ marginTop: 16 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          Sin memoria, cada mensaje empieza de cero
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePieza4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.textDim }}>
          Pieza 4
        </p>
      </FadeText>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <N8nNode
          label="AI Agent"
          icon="\u{1F916}"
          color={C.accent}
          width={220}
          height={100}
          delay={5}
          highlighted
          ports={{ bottom: 2 }}
        />

        {/* Vertical lines branching to two tools */}
        <svg width="300" height="60" style={{ opacity: lineAppear, overflow: "visible" }}>
          {/* Left branch */}
          <line x1="120" y1="0" x2="120" y2="20" stroke={C.textDim} strokeWidth={2} />
          <line x1="120" y1="20" x2="60" y2="20" stroke={C.textDim} strokeWidth={2} />
          <line x1="60" y1="20" x2="60" y2={50 * lineAppear} stroke={C.textDim} strokeWidth={2} />
          {lineAppear > 0.8 && (
            <polygon points="56,44 60,52 64,44" fill={C.textDim} />
          )}
          {/* Right branch */}
          <line x1="180" y1="0" x2="180" y2="20" stroke={C.textDim} strokeWidth={2} />
          <line x1="180" y1="20" x2="240" y2="20" stroke={C.textDim} strokeWidth={2} />
          <line x1="240" y1="20" x2="240" y2={50 * lineAppear} stroke={C.textDim} strokeWidth={2} />
          {lineAppear > 0.8 && (
            <polygon points="236,44 240,52 244,44" fill={C.textDim} />
          )}
        </svg>

        <div style={{ display: "flex", gap: 40, marginTop: 0 }}>
          <N8nNode
            label="Calculator"
            icon="\u{1F5A9}"
            color={C.green}
            width={160}
            height={80}
            delay={25}
            highlighted
            ports={{ top: true }}
          />
          <N8nNode
            label="HTTP Request"
            icon="\u{1F310}"
            color={C.orange}
            width={160}
            height={80}
            delay={35}
            highlighted
            ports={{ top: true }}
          />
        </div>
      </div>

      <FadeText delay={50} style={{ marginTop: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.text, textAlign: "center" }}>
          Capacidades <span style={{ color: C.green }}>externas</span>
        </p>
      </FadeText>

      <FadeText delay={70} style={{ marginTop: 16 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          El agente decide cuando usar cada herramienta
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePieza5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arrowAppear = spring({ frame, fps, delay: 25, config: { damping: 200 } });

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
        <p style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.textDim }}>
          Pieza 5 (opcional)
        </p>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <N8nNode
          label="Telegram Trigger"
          icon="\u{1F4F1}"
          color={C.teal}
          width={180}
          height={80}
          delay={5}
          ports={{ right: true }}
        />

        <svg width="60" height="20" style={{ opacity: arrowAppear, overflow: "visible" }}>
          <line x1="0" y1="10" x2={44 * arrowAppear} y2="10" stroke={C.textDim} strokeWidth={2} />
          {arrowAppear > 0.8 && (
            <polygon points="40,5 48,10 40,15" fill={C.textDim} />
          )}
        </svg>

        <N8nNode
          label="IF"
          icon="\u{26A1}"
          color={C.yellow}
          width={140}
          height={80}
          delay={15}
          highlighted
          ports={{ left: true, right: true }}
        />

        <svg width="60" height="20" style={{ opacity: arrowAppear, overflow: "visible" }}>
          <line x1="0" y1="10" x2={44 * arrowAppear} y2="10" stroke={C.textDim} strokeWidth={2} />
          {arrowAppear > 0.8 && (
            <polygon points="40,5 48,10 40,15" fill={C.textDim} />
          )}
        </svg>

        <N8nNode
          label="AI Agent"
          icon="\u{1F916}"
          color={C.accent}
          width={180}
          height={80}
          delay={25}
          ports={{ left: true }}
        />
      </div>

      <FadeText delay={45} style={{ marginTop: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.text, textAlign: "center" }}>
          Filtro <span style={{ color: C.yellow }}>inteligente</span>
        </p>
      </FadeText>

      <FadeText delay={60} style={{ marginTop: 16 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          Solo procesa mensajes que cumplan la condicion
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseCompleto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Node positions (center-based, in an absolute layout)
  const nodes = {
    telegram: { x: 120, y: 320 },
    ifNode: { x: 380, y: 320 },
    agent: { x: 660, y: 320 },
    memory: { x: 660, y: 530 },
    calculator: { x: 540, y: 150 },
    http: { x: 780, y: 150 },
    response: { x: 960, y: 320 },
  };

  // Connection lines data: [fromX, fromY, toX, toY]
  const connections: [number, number, number, number][] = [
    [nodes.telegram.x + 100, nodes.telegram.y, nodes.ifNode.x - 70, nodes.ifNode.y],
    [nodes.ifNode.x + 70, nodes.ifNode.y, nodes.agent.x - 110, nodes.agent.y],
    [nodes.agent.x, nodes.agent.y - 55, nodes.calculator.x + 80, nodes.calculator.y + 40],
    [nodes.agent.x, nodes.agent.y - 55, nodes.http.x - 80, nodes.http.y + 40],
    [nodes.agent.x, nodes.agent.y + 60, nodes.memory.x, nodes.memory.y - 45],
    [nodes.agent.x + 110, nodes.agent.y, nodes.response.x - 80, nodes.response.y],
  ];

  const linesAppear = spring({ frame, fps, delay: 15, config: { damping: 200 } });

  // Message pulse animation
  // Path: Telegram -> IF -> Agent -> Tool -> Agent -> Response
  const pulsePathPoints = [
    nodes.telegram,
    nodes.ifNode,
    nodes.agent,
    { x: nodes.http.x, y: nodes.http.y },
    nodes.agent,
    nodes.response,
  ];

  const totalSegments = pulsePathPoints.length - 1;
  const cycleFrames = 180; // 6 seconds for full cycle
  const localFrame = frame % cycleFrames;
  const pulseProgress = interpolate(localFrame, [0, cycleFrames], [0, totalSegments], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentSegment = Math.min(Math.floor(pulseProgress), totalSegments - 1);
  const segmentFraction = pulseProgress - currentSegment;
  const fromPt = pulsePathPoints[currentSegment];
  const toPt = pulsePathPoints[currentSegment + 1];
  const pulseX = fromPt.x + (toPt.x - fromPt.x) * segmentFraction;
  const pulseY = fromPt.y + (toPt.y - fromPt.y) * segmentFraction;

  const pulseOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.background,
        padding: 40,
      }}
    >
      <FadeText delay={0} style={{ textAlign: "center", marginBottom: 10 }}>
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.text }}>
          Flujo <span style={{ color: C.accent }}>completo</span>
        </p>
      </FadeText>

      <div
        style={{
          position: "relative",
          width: 1100,
          height: 620,
          margin: "0 auto",
        }}
      >
        {/* SVG connections layer */}
        <svg
          width="1100"
          height="620"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: linesAppear,
            overflow: "visible",
          }}
        >
          {connections.map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x1 + (x2 - x1) * linesAppear}
              y2={y1 + (y2 - y1) * linesAppear}
              stroke={C.textDim}
              strokeWidth={2}
            />
          ))}
          {/* Arrow heads */}
          {linesAppear > 0.9 &&
            connections.map(([x1, y1, x2, y2], i) => {
              const angle = Math.atan2(y2 - y1, x2 - x1);
              const ax = x2 - 8 * Math.cos(angle);
              const ay = y2 - 8 * Math.sin(angle);
              const lx = ax - 6 * Math.cos(angle - Math.PI / 6);
              const ly = ay - 6 * Math.sin(angle - Math.PI / 6);
              const rx = ax - 6 * Math.cos(angle + Math.PI / 6);
              const ry = ay - 6 * Math.sin(angle + Math.PI / 6);
              return (
                <polygon
                  key={`arrow-${i}`}
                  points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`}
                  fill={C.textDim}
                />
              );
            })}
        </svg>

        {/* Nodes layer */}
        <div style={{ position: "absolute", left: nodes.telegram.x - 100, top: nodes.telegram.y - 45 }}>
          <N8nNode label="Telegram Trigger" icon="\u{1F4F1}" color={C.teal} width={200} height={90} delay={5} ports={{ right: true }} />
        </div>
        <div style={{ position: "absolute", left: nodes.ifNode.x - 70, top: nodes.ifNode.y - 40 }}>
          <N8nNode label="IF" icon="\u{26A1}" color={C.yellow} width={140} height={80} delay={8} ports={{ left: true, right: true }} />
        </div>
        <div style={{ position: "absolute", left: nodes.agent.x - 110, top: nodes.agent.y - 55 }}>
          <N8nNode label="AI Agent" icon="\u{1F916}" color={C.accent} width={220} height={110} delay={10} highlighted highlightField="System Prompt" ports={{ left: true, right: true, bottom: 2, top: true }} />
        </div>
        <div style={{ position: "absolute", left: nodes.memory.x - 100, top: nodes.memory.y - 45 }}>
          <N8nNode label="Window Memory" icon="\u{1F9E0}" color={C.purple} width={200} height={90} delay={12} ports={{ top: true }} />
        </div>
        <div style={{ position: "absolute", left: nodes.calculator.x - 80, top: nodes.calculator.y - 40 }}>
          <N8nNode label="Calculator" icon="\u{1F5A9}" color={C.green} width={160} height={80} delay={14} ports={{ bottom: 1 }} />
        </div>
        <div style={{ position: "absolute", left: nodes.http.x - 80, top: nodes.http.y - 40 }}>
          <N8nNode label="HTTP Request" icon="\u{1F310}" color={C.orange} width={160} height={80} delay={16} ports={{ bottom: 1 }} />
        </div>
        <div style={{ position: "absolute", left: nodes.response.x - 80, top: nodes.response.y - 40 }}>
          <N8nNode label="Respuesta" icon="\u{2705}" color={C.green} width={160} height={80} delay={18} ports={{ left: true }} />
        </div>

        {/* Glowing message pulse */}
        <div
          style={{
            position: "absolute",
            left: pulseX - 10,
            top: pulseY - 10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: C.accent,
            boxShadow: `0 0 16px ${C.accent}, 0 0 32px ${C.accent}80`,
            opacity: pulseOpacity,
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const PhaseReto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ideas: { emoji: string; label: string; color: string; delay: number }[] = [
    { emoji: "\u{1F373}", label: "Chef", color: C.orange, delay: 25 },
    { emoji: "\u{1F4D0}", label: "Tutor", color: C.teal, delay: 40 },
    { emoji: "\u{1F4CB}", label: "Coach", color: C.green, delay: 55 },
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
        <p style={{ fontFamily: FONT, fontSize: 48, fontWeight: 700, color: C.text, textAlign: "center" }}>
          Ahora <span style={{ color: C.accent }}>construye</span> el tuyo
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 32, marginBottom: 40 }}>
        {ideas.map((idea, i) => {
          const s = spring({ frame, fps, delay: idea.delay, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                opacity: s,
                transform: `scale(${s})`,
                background: C.surface,
                border: `2px solid ${idea.color}`,
                borderRadius: 20,
                padding: "36px 48px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                minWidth: 200,
              }}
            >
              <span style={{ fontSize: 56 }}>{idea.emoji}</span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 28,
                  fontWeight: 700,
                  color: idea.color,
                }}
              >
                {idea.label}
              </span>
            </div>
          );
        })}
      </div>

      <FadeText delay={70} style={{ marginTop: 10 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          Usa las piezas que aprendiste para armar tu propio chatbot
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2ArquitecturaChatbot: React.FC = () => {
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

      <Sequence from={S.PIEZA_1.start} durationInFrames={S.PIEZA_1.end - S.PIEZA_1.start} premountFor={30}>
        <PhasePieza1 />
      </Sequence>

      <Sequence from={S.PIEZA_2.start} durationInFrames={S.PIEZA_2.end - S.PIEZA_2.start} premountFor={30}>
        <PhasePieza2 />
      </Sequence>

      <Sequence from={S.PIEZA_3.start} durationInFrames={S.PIEZA_3.end - S.PIEZA_3.start} premountFor={30}>
        <PhasePieza3 />
      </Sequence>

      <Sequence from={S.PIEZA_4.start} durationInFrames={S.PIEZA_4.end - S.PIEZA_4.start} premountFor={30}>
        <PhasePieza4 />
      </Sequence>

      <Sequence from={S.PIEZA_5.start} durationInFrames={S.PIEZA_5.end - S.PIEZA_5.start} premountFor={30}>
        <PhasePieza5 />
      </Sequence>

      <Sequence from={S.COMPLETO.start} durationInFrames={S.COMPLETO.end - S.COMPLETO.start} premountFor={30}>
        <PhaseCompleto />
      </Sequence>

      <Sequence from={S.RETO.start} durationInFrames={S.RETO.end - S.RETO.start} premountFor={30}>
        <PhaseReto />
      </Sequence>
    </AbsoluteFill>
  );
};
