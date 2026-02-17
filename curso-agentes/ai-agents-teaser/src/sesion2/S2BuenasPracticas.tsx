import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_BUENAS_PRACTICAS, TYPOGRAPHY } from "../utils/constants";
import { TipCard } from "./components/TipCard";

const S = S2_BUENAS_PRACTICAS;
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
        Buenas <span style={{ color: C.green }}>Practicas</span>
      </h1>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 30,
          color: C.textSecondary,
          opacity: subSpring,
          transform: `translateY(${(1 - subSpring) * 20}px)`,
          marginTop: 16,
        }}
      >
        Tips para tu chatbot
      </p>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// TIP 1 - Prueba en cada paso
// ----------------------------------------------------------------

const PhaseTip1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodes = [
    { label: "Trigger", icon: "1" },
    { label: "AI Agent", icon: "2" },
    { label: "HTTP Req", icon: "3" },
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
            fontSize: 44,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Tip 1: <span style={{ color: C.green }}>Prueba en cada paso</span>
        </p>
      </FadeText>

      {/* Workflow with checkmarks */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 50 }}>
        {nodes.map((node, i) => {
          const nodeSpring = spring({
            frame,
            fps,
            delay: 20 + i * 30,
            config: { damping: 15 },
          });
          const checkSpring = spring({
            frame,
            fps,
            delay: 40 + i * 30,
            config: { damping: 12 },
          });

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity: nodeSpring,
                  transform: `scale(${nodeSpring})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {/* Node box */}
                <div
                  style={{
                    width: 180,
                    height: 80,
                    borderRadius: 14,
                    background: C.surface,
                    border: `2px solid ${C.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: `${C.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONT,
                      fontSize: 16,
                      fontWeight: 700,
                      color: C.accent,
                    }}
                  >
                    {node.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 18,
                      color: C.text,
                      fontWeight: 600,
                    }}
                  >
                    {node.label}
                  </span>
                </div>

                {/* Green checkmark below */}
                <div
                  style={{
                    opacity: checkSpring,
                    transform: `scale(${checkSpring})`,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: C.green,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {"\u2713"}
                  </span>
                </div>
              </div>

              {/* Arrow between nodes */}
              {i < nodes.length - 1 && (
                <div
                  style={{
                    opacity: nodeSpring,
                    fontFamily: FONT,
                    fontSize: 28,
                    color: C.textDim,
                    marginBottom: 46,
                  }}
                >
                  {"\u2192"}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Warning text */}
      <FadeText delay={120}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 28,
            color: C.text,
            textAlign: "center",
          }}
        >
          No construyas{" "}
          <span
            style={{
              color: C.red,
              textDecoration: "line-through",
              textDecorationColor: C.red,
            }}
          >
            todo
          </span>{" "}
          y pruebes al final
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// TIP 2 - System Prompt claro y especifico
// ----------------------------------------------------------------

const PhaseTip2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badSpring = spring({ frame, fps, delay: 20, config: { damping: 15 } });
  const goodSpring = spring({ frame, fps, delay: 50, config: { damping: 15 } });

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
            fontSize: 44,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Tip 2: <span style={{ color: C.accent }}>System Prompt claro</span>
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 40, alignItems: "stretch" }}>
        {/* BAD example */}
        <div
          style={{
            opacity: badSpring,
            transform: `scale(${badSpring})`,
            width: 380,
            background: C.surface,
            borderRadius: 20,
            padding: "30px 32px",
            border: `2px solid ${C.red}`,
            boxShadow: `0 0 20px ${C.red}20`,
            position: "relative",
          }}
        >
          {/* X badge */}
          <div
            style={{
              position: "absolute",
              top: -16,
              right: -16,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: C.red,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {"\u2717"}
          </div>

          <p
            style={{
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 700,
              color: C.red,
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Malo
          </p>
          <div
            style={{
              background: `${C.red}15`,
              borderRadius: 12,
              padding: "16px 20px",
            }}
          >
            <p
              style={{
                fontFamily: MONO,
                fontSize: 18,
                color: C.textSecondary,
                lineHeight: 1.6,
              }}
            >
              "Se un asistente"
            </p>
          </div>
        </div>

        {/* VS divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FadeText delay={35}>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 28,
                fontWeight: 700,
                color: C.textDim,
              }}
            >
              vs
            </span>
          </FadeText>
        </div>

        {/* GOOD example */}
        <div
          style={{
            opacity: goodSpring,
            transform: `scale(${goodSpring})`,
            width: 480,
            background: C.surface,
            borderRadius: 20,
            padding: "30px 32px",
            border: `2px solid ${C.green}`,
            boxShadow: `0 0 20px ${C.green}20`,
            position: "relative",
          }}
        >
          {/* Checkmark badge */}
          <div
            style={{
              position: "absolute",
              top: -16,
              right: -16,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: C.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {"\u2713"}
          </div>

          <p
            style={{
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 700,
              color: C.green,
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Bueno
          </p>
          <div
            style={{
              background: `${C.green}15`,
              borderRadius: 12,
              padding: "16px 20px",
            }}
          >
            <p
              style={{
                fontFamily: MONO,
                fontSize: 16,
                color: C.text,
                lineHeight: 1.7,
              }}
            >
              "Eres ESIC-Bot, un asistente de marketing educativo. Responde en
              espanol, maximo 2 parrafos..."
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// TIP 3 - No abuses de la memoria
// ----------------------------------------------------------------

const PhaseTip3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowSizes = [5, 10, 20, 50, 100];
  const costs = [30, 55, 100, 200, 400]; // relative heights
  const maxCost = 400;
  const barMaxHeight = 300;

  // Which range is the sweet spot (indices 1 and 2 = windowSize 10 and 20)
  const sweetSpot = [1, 2];

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
            fontSize: 44,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Tip 3: <span style={{ color: C.yellow }}>No abuses de la memoria</span>
        </p>
      </FadeText>

      {/* Chart */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 24,
          height: barMaxHeight + 60,
          marginBottom: 30,
        }}
      >
        {/* Y axis label */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: barMaxHeight,
            marginRight: 10,
          }}
        >
          <span style={{ fontFamily: FONT, fontSize: 14, color: C.textDim }}>$$$</span>
          <span style={{ fontFamily: FONT, fontSize: 14, color: C.textDim }}>$</span>
        </div>

        {windowSizes.map((ws, i) => {
          const barSpring = spring({
            frame,
            fps,
            delay: 20 + i * 20,
            config: { damping: 15 },
          });

          const barHeight = interpolate(
            barSpring,
            [0, 1],
            [0, (costs[i] / maxCost) * barMaxHeight]
          );

          const isSweetSpot = sweetSpot.includes(i);
          const isHigh = i >= 3;

          let barColor: string = C.green;
          if (i === 2) barColor = C.green;
          if (i === 3) barColor = C.yellow;
          if (i === 4) barColor = C.red;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              {/* Sweet spot label */}
              {isSweetSpot && (
                <FadeText delay={120}>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      color: C.green,
                      fontWeight: 700,
                    }}
                  >
                    {i === 1 ? "sweet" : "spot"}
                  </span>
                </FadeText>
              )}

              {/* Bar */}
              <div
                style={{
                  width: 70,
                  height: barHeight,
                  borderRadius: 8,
                  background: barColor,
                  opacity: 0.85,
                  boxShadow: isSweetSpot ? `0 0 16px ${C.green}40` : "none",
                  border: isSweetSpot ? `2px solid ${C.green}` : "none",
                }}
              />

              {/* X axis label */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 16,
                  color: isHigh ? (i === 4 ? C.red : C.yellow) : C.text,
                  fontWeight: isSweetSpot ? 700 : 400,
                }}
              >
                {ws}
              </span>
            </div>
          );
        })}
      </div>

      {/* X axis label */}
      <FadeText delay={10}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 18,
            color: C.textSecondary,
            textAlign: "center",
          }}
        >
          windowSize
        </p>
      </FadeText>

      <FadeText delay={140} style={{ marginTop: 30 }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 12,
            padding: "14px 28px",
            border: `1px solid ${C.green}`,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 22, color: C.text }}>
            Recomendado: <span style={{ color: C.green, fontWeight: 700 }}>10-20</span> mensajes
          </p>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// TIP 4 - Maneja errores
// ----------------------------------------------------------------

const PhaseTip4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Show failing workflow
  const node1Spring = spring({ frame, fps, delay: 10, config: { damping: 15 } });
  const node2Spring = spring({ frame, fps, delay: 30, config: { damping: 15 } });
  const node3Spring = spring({ frame, fps, delay: 50, config: { damping: 15 } });
  const failSpring = spring({ frame, fps, delay: 70, config: { damping: 12 } });

  // Phase 2: Show fallback
  const fallbackSpring = spring({ frame, fps, delay: 110, config: { damping: 15 } });
  const fallbackNodeSpring = spring({ frame, fps, delay: 130, config: { damping: 15 } });
  const checkSpring = spring({ frame, fps, delay: 150, config: { damping: 12 } });

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
            fontSize: 44,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Tip 4: <span style={{ color: C.orange }}>Maneja errores</span>
        </p>
      </FadeText>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {/* Main workflow row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Trigger node */}
          <div
            style={{
              opacity: node1Spring,
              transform: `scale(${node1Spring})`,
              width: 150,
              height: 70,
              borderRadius: 14,
              background: C.surface,
              border: `2px solid ${C.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 600,
              color: C.text,
            }}
          >
            Trigger
          </div>

          <span style={{ opacity: node1Spring, fontFamily: FONT, fontSize: 24, color: C.textDim }}>{"\u2192"}</span>

          {/* AI Agent node */}
          <div
            style={{
              opacity: node2Spring,
              transform: `scale(${node2Spring})`,
              width: 150,
              height: 70,
              borderRadius: 14,
              background: C.surface,
              border: `2px solid ${C.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 600,
              color: C.text,
            }}
          >
            AI Agent
          </div>

          <span style={{ opacity: node2Spring, fontFamily: FONT, fontSize: 24, color: C.textDim }}>{"\u2192"}</span>

          {/* HTTP Request node (fails) */}
          <div
            style={{
              opacity: node3Spring,
              transform: `scale(${node3Spring})`,
              width: 170,
              height: 70,
              borderRadius: 14,
              background: C.surface,
              border: `2px solid ${failSpring > 0.5 ? C.red : C.accent}`,
              boxShadow: failSpring > 0.5 ? `0 0 20px ${C.red}30` : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 600,
              color: failSpring > 0.5 ? C.red : C.text,
              position: "relative",
            }}
          >
            HTTP Request
            {/* Red X overlay */}
            {failSpring > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  right: -12,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: C.red,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: failSpring,
                  transform: `scale(${failSpring})`,
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: "#fff" }}>
                  {"\u2717"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Fallback branch */}
        <div
          style={{
            opacity: fallbackSpring,
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginLeft: 340,
          }}
        >
          {/* Arrow curving down */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 20, color: C.green }}>{"\u2193"}</span>
            <span style={{ fontFamily: FONT, fontSize: 12, color: C.green, fontWeight: 600 }}>fallback</span>
          </div>

          {/* Fallback node */}
          <div
            style={{
              opacity: fallbackNodeSpring,
              transform: `scale(${fallbackNodeSpring})`,
              width: 200,
              height: 70,
              borderRadius: 14,
              background: C.surface,
              border: `2px solid ${C.green}`,
              boxShadow: `0 0 16px ${C.green}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 600,
              color: C.green,
            }}
          >
            Respuesta Default
          </div>

          {/* Check */}
          <div
            style={{
              opacity: checkSpring,
              transform: `scale(${checkSpring})`,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: C.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: "#fff" }}>
              {"\u2713"}
            </span>
          </div>
        </div>
      </div>

      <FadeText delay={160} style={{ marginTop: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary, textAlign: "center" }}>
          Si la API falla? <span style={{ color: C.green, fontWeight: 700 }}>Agrega un fallback</span>
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// TIP 5 - Empieza simple, luego agrega
// ----------------------------------------------------------------

const PhaseTip5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stage 1: 2 nodes
  const stage1Spring = spring({ frame, fps, delay: 15, config: { damping: 15 } });
  // Stage 2: add 1 more node
  const stage2Spring = spring({ frame, fps, delay: 70, config: { damping: 15 } });
  // Stage 3: add 2 more nodes
  const stage3Spring = spring({ frame, fps, delay: 130, config: { damping: 15 } });

  const nodeStyle = (
    color: string,
    appear: number
  ): React.CSSProperties => ({
    opacity: appear,
    transform: `scale(${appear})`,
    width: 130,
    height: 56,
    borderRadius: 12,
    background: C.surface,
    border: `2px solid ${color}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 600,
    color: C.text,
  });

  const arrow = (appear: number) => (
    <span style={{ opacity: appear, fontFamily: FONT, fontSize: 20, color: C.textDim }}>
      {"\u2192"}
    </span>
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
      <FadeText delay={0} style={{ marginBottom: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 44,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Tip 5: <span style={{ color: C.purple }}>Empieza simple</span>
        </p>
      </FadeText>

      {/* Stage 1: 2 nodes */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
        <FadeText delay={5}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 14,
              color: C.textDim,
              width: 60,
              display: "inline-block",
            }}
          >
            v1
          </span>
        </FadeText>
        <div style={nodeStyle(C.accent, stage1Spring)}>Trigger</div>
        {arrow(stage1Spring)}
        <div style={nodeStyle(C.accent, stage1Spring)}>AI Agent</div>
      </div>

      {/* Stage 2: 3 nodes */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
        <FadeText delay={60}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 14,
              color: C.textDim,
              width: 60,
              display: "inline-block",
            }}
          >
            v2
          </span>
        </FadeText>
        <div style={nodeStyle(C.accent, stage2Spring)}>Trigger</div>
        {arrow(stage2Spring)}
        <div style={nodeStyle(C.accent, stage2Spring)}>AI Agent</div>
        {arrow(stage2Spring)}
        <div style={nodeStyle(C.green, stage2Spring)}>Calculator</div>
      </div>

      {/* Stage 3: 5 nodes */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
        <FadeText delay={120}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 14,
              color: C.textDim,
              width: 60,
              display: "inline-block",
            }}
          >
            v3
          </span>
        </FadeText>
        <div style={nodeStyle(C.accent, stage3Spring)}>Trigger</div>
        {arrow(stage3Spring)}
        <div style={nodeStyle(C.accent, stage3Spring)}>AI Agent</div>
        {arrow(stage3Spring)}
        <div style={nodeStyle(C.green, stage3Spring)}>Calculator</div>
        {arrow(stage3Spring)}
        <div style={nodeStyle(C.orange, stage3Spring)}>HTTP Req</div>
        {arrow(stage3Spring)}
        <div style={nodeStyle(C.purple, stage3Spring)}>IF</div>
      </div>

      <FadeText delay={170} style={{ marginTop: 20 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary, textAlign: "center" }}>
          Agrega complejidad <span style={{ color: C.purple, fontWeight: 700 }}>poco a poco</span>
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// TIP 6 - Lee los logs de ejecucion
// ----------------------------------------------------------------

const PhaseTip6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logEntries = [
    { status: "ok", label: "Telegram Trigger", time: "0.1s" },
    { status: "ok", label: "IF", time: "0.02s" },
    { status: "ok", label: "AI Agent", time: "2.3s" },
    { status: "error", label: "HTTP Request", time: "timeout" },
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
            fontSize: 44,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Tip 6: <span style={{ color: C.teal }}>Lee los logs</span>
        </p>
      </FadeText>

      {/* Execution log surface */}
      <div
        style={{
          background: C.surface,
          borderRadius: 16,
          padding: "24px 0",
          width: 700,
          border: `1px solid ${C.textDim}30`,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <FadeText delay={10}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 28px",
              marginBottom: 16,
              borderBottom: `1px solid ${C.textDim}30`,
              paddingBottom: 12,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 14, color: C.textDim, fontWeight: 600 }}>
              Execution Log
            </span>
            <span style={{ fontFamily: MONO, fontSize: 14, color: C.textDim }}>
              #1042
            </span>
          </div>
        </FadeText>

        {/* Log rows */}
        {logEntries.map((entry, i) => {
          const rowSpring = spring({
            frame,
            fps,
            delay: 25 + i * 25,
            config: { damping: 200 },
          });

          const isError = entry.status === "error";

          return (
            <div
              key={i}
              style={{
                opacity: rowSpring,
                transform: `translateX(${(1 - rowSpring) * 20}px)`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 28px",
                background: isError ? `${C.red}12` : "transparent",
              }}
            >
              {/* Status icon */}
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 18,
                  fontWeight: 700,
                  color: isError ? C.red : C.green,
                  width: 24,
                  textAlign: "center",
                }}
              >
                {isError ? "\u2717" : "\u2713"}
              </span>

              {/* Node label */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 18,
                  color: isError ? C.red : C.text,
                  fontWeight: isError ? 700 : 400,
                  flex: 1,
                }}
              >
                {entry.label}
              </span>

              {/* Time */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  color: isError ? C.red : C.textDim,
                }}
              >
                {entry.time}
              </span>
            </div>
          );
        })}
      </div>

      <FadeText delay={140} style={{ marginTop: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary, textAlign: "center" }}>
          Los logs te dicen <span style={{ color: C.teal, fontWeight: 700 }}>exactamente</span> donde fallo
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// RESUMEN - Grid of 6 tips
// ----------------------------------------------------------------

const PhaseResumen: React.FC = () => {
  const tips = [
    { icon: "\u2705", text: "Prueba en cada paso", color: C.green },
    { icon: "\uD83D\uDCDD", text: "System Prompt claro", color: C.accent },
    { icon: "\uD83E\uDDE0", text: "Memoria: 10-20 msgs", color: C.yellow },
    { icon: "\u26A0\uFE0F", text: "Maneja errores", color: C.orange },
    { icon: "\uD83E\uDDE9", text: "Empieza simple", color: C.purple },
    { icon: "\uD83D\uDCCB", text: "Lee los logs", color: C.teal },
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
            fontSize: 44,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Resumen
        </p>
      </FadeText>

      {/* 3x2 grid of TipCards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          maxWidth: 900,
        }}
      >
        {tips.map((tip, i) => (
          <TipCard
            key={i}
            icon={tip.icon}
            text={tip.text}
            delay={10 + i * 10}
            color={tip.color}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2BuenasPracticas: React.FC = () => {
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
        from={S.TIP_1.start}
        durationInFrames={S.TIP_1.end - S.TIP_1.start}
        premountFor={30}
      >
        <PhaseTip1 />
      </Sequence>

      <Sequence
        from={S.TIP_2.start}
        durationInFrames={S.TIP_2.end - S.TIP_2.start}
        premountFor={30}
      >
        <PhaseTip2 />
      </Sequence>

      <Sequence
        from={S.TIP_3.start}
        durationInFrames={S.TIP_3.end - S.TIP_3.start}
        premountFor={30}
      >
        <PhaseTip3 />
      </Sequence>

      <Sequence
        from={S.TIP_4.start}
        durationInFrames={S.TIP_4.end - S.TIP_4.start}
        premountFor={30}
      >
        <PhaseTip4 />
      </Sequence>

      <Sequence
        from={S.TIP_5.start}
        durationInFrames={S.TIP_5.end - S.TIP_5.start}
        premountFor={30}
      >
        <PhaseTip5 />
      </Sequence>

      <Sequence
        from={S.TIP_6.start}
        durationInFrames={S.TIP_6.end - S.TIP_6.start}
        premountFor={30}
      >
        <PhaseTip6 />
      </Sequence>

      <Sequence
        from={S.RESUMEN.start}
        durationInFrames={S.RESUMEN.end - S.RESUMEN.start}
        premountFor={30}
      >
        <PhaseResumen />
      </Sequence>
    </AbsoluteFill>
  );
};
