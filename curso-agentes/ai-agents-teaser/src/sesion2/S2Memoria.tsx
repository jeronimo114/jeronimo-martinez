import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_MEMORIA, TYPOGRAPHY } from "../utils/constants";
import { ChatBubble } from "./components/ChatBubble";
import { N8nNode } from "./components/N8nNode";
import { N8nConnection } from "./components/N8nConnection";
import { MemoryIcon } from "../recap/components/MemoryIcon";

const S = S2_MEMORIA;
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

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background }}
    >
      <div style={{ transform: `scale(${s})`, opacity: s, textAlign: "center" }}>
        <MemoryIcon size={100} color={C.accent} opacity={s} />
      </div>
      <h1
        style={{
          fontFamily: FONT,
          fontSize: 76,
          fontWeight: 700,
          color: C.text,
          transform: `scale(${s})`,
          opacity: s,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        <span style={{ color: C.accent }}>Memoria</span> del Agente
      </h1>
    </AbsoluteFill>
  );
};

const PhaseProblema: React.FC = () => {
  const messages = [
    { text: "Me llamo Juan", isUser: true, delay: 10 },
    { text: "Hola Juan!", isUser: false, delay: 40 },
    { text: "Como me llamo?", isUser: true, delay: 80 },
    { text: "No lo se", isUser: false, delay: 120 },
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
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.red,
            textAlign: "center",
          }}
        >
          Sin memoria...
        </p>
      </FadeText>

      <div
        style={{
          width: 700,
          background: C.surface,
          borderRadius: 20,
          padding: "30px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          border: `1px solid ${C.textDim}30`,
        }}
      >
        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            text={msg.text}
            isUser={msg.isUser}
            delay={msg.delay}
          />
        ))}

        {/* Red X indicator */}
        <FadeText delay={150} style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 8,
            }}
          >
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
              }}
            >
              X
            </div>
            <span style={{ fontFamily: FONT, fontSize: 20, color: C.red, fontWeight: 600 }}>
              No recuerda nada
            </span>
          </div>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

const PhaseSolucion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = interpolate(frame % 60, [0, 30, 60], [0.4, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const messages = [
    { text: "Como me llamo?", isUser: true, delay: 10 },
    { text: "Te llamas Juan", isUser: false, delay: 50 },
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
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.green,
            textAlign: "center",
          }}
        >
          Con memoria...
        </p>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
        {/* Chat box */}
        <div
          style={{
            width: 550,
            background: C.surface,
            borderRadius: 20,
            padding: "30px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            border: `1px solid ${C.green}40`,
          }}
        >
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              text={msg.text}
              isUser={msg.isUser}
              delay={msg.delay}
            />
          ))}

          {/* Green checkmark */}
          <FadeText delay={80} style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: C.green,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {"\u2713"}
              </div>
              <span style={{ fontFamily: FONT, fontSize: 20, color: C.green, fontWeight: 600 }}>
                Recuerda el contexto
              </span>
            </div>
          </FadeText>
        </div>

        {/* Memory icon with glow */}
        <FadeText delay={30}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                filter: `drop-shadow(0 0 ${12 * glowPulse}px ${C.accent})`,
              }}
            >
              <MemoryIcon size={90} color={C.accent} />
            </div>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 18,
                color: C.accent,
                fontWeight: 600,
              }}
            >
              Memoria
            </span>
          </div>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

const PhaseWindowBuf: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalSlots = 10;
  const phaseDuration = S.WINDOW_BUF.end - S.WINDOW_BUF.start;

  // Messages fill up over time
  const fillProgress = interpolate(frame, [20, phaseDuration * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // How many messages total have "arrived" (more than 10 to show overflow)
  const totalMessages = Math.floor(fillProgress * 15);
  // The visible window is the last 10
  const windowStart = Math.max(0, totalMessages - totalSlots);

  // Overflow animation: old messages falling off left
  const overflowShake = totalMessages > totalSlots
    ? interpolate(frame % 20, [0, 10, 20], [0, -3, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const msgColors = [
    C.token1, C.token2, C.token3, C.token4, C.token5,
    C.token6, C.token7, C.accent, C.green, C.purple,
    C.orange, C.yellow, C.teal, C.token1, C.token2,
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
        <p style={{ fontFamily: FONT, fontSize: 42, fontWeight: 700, color: C.text }}>
          Window Buffer Memory
        </p>
      </FadeText>

      <FadeText delay={10} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          Guarda los ultimos <span style={{ color: C.accent, fontWeight: 700 }}>N</span> mensajes
        </p>
      </FadeText>

      {/* Window bar container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 30,
        }}
      >
        {/* Left overflow indicator */}
        <div
          style={{
            opacity: totalMessages > totalSlots ? 1 : 0,
            fontFamily: FONT,
            fontSize: 28,
            color: C.red,
            fontWeight: 700,
            transform: `translateX(${overflowShake}px)`,
            minWidth: 40,
            textAlign: "center",
          }}
        >
          {"\u2190"}
        </div>

        {/* Slots */}
        <div style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: totalSlots }).map((_, i) => {
            const msgIndex = windowStart + i;
            const isFilled = msgIndex < totalMessages;
            const isNew = msgIndex === totalMessages - 1;

            const slotSpring = spring({
              frame,
              fps,
              delay: 15 + i * 3,
              config: { damping: 15 },
            });

            return (
              <div
                key={i}
                style={{
                  width: 70,
                  height: 50,
                  borderRadius: 10,
                  background: isFilled ? msgColors[msgIndex % msgColors.length] : C.surfaceLight,
                  border: `2px solid ${isFilled ? "transparent" : C.textDim}`,
                  opacity: slotSpring,
                  transform: `scale(${slotSpring}) ${isNew ? "translateY(-4px)" : ""}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
              >
                {isFilled && (
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 14,
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {msgIndex + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right entry indicator */}
        <div
          style={{
            opacity: fillProgress < 1 ? 1 : 0.3,
            fontFamily: FONT,
            fontSize: 28,
            color: C.green,
            fontWeight: 700,
            minWidth: 40,
            textAlign: "center",
          }}
        >
          {"\u2192"}
        </div>
      </div>

      {/* Label */}
      <FadeText delay={20}>
        <div
          style={{
            background: C.surface,
            borderRadius: 12,
            padding: "12px 28px",
            border: `2px solid ${C.accent}`,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 24,
              color: C.accent,
              fontWeight: 600,
            }}
          >
            windowSize = 10
          </span>
        </div>
      </FadeText>

      <FadeText delay={60} style={{ marginTop: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textSecondary, textAlign: "center" }}>
          Los mensajes nuevos entran, los viejos se descartan
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseSessionId: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const UserAvatar: React.FC<{
    letter: string;
    color: string;
    delay: number;
  }> = ({ letter, color, delay: d }) => {
    const s = spring({ frame, fps, delay: d, config: { damping: 12 } });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity: s,
          transform: `scale(${s})`,
        }}
      >
        {/* User icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {letter}
        </div>

        {/* Memory box */}
        <div
          style={{
            width: 240,
            minHeight: 120,
            background: C.surface,
            borderRadius: 16,
            border: `2px solid ${color}`,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <MemoryIcon size={24} color={color} />
            <span style={{ fontFamily: FONT, fontSize: 14, color, fontWeight: 600 }}>
              Memoria
            </span>
          </div>
          <div
            style={{
              background: `${color}15`,
              borderRadius: 8,
              padding: "8px 12px",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 12, color: C.textSecondary }}>
              sessionId: "{letter.toLowerCase()}-001"
            </span>
          </div>
          <div
            style={{
              background: C.surfaceLight,
              borderRadius: 8,
              padding: "8px 12px",
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 13, color: C.textSecondary }}>
              {letter === "A" ? "Hola, soy Ana..." : "Necesito ayuda..."}
            </span>
          </div>
        </div>
      </div>
    );
  };

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
        <p style={{ fontFamily: FONT, fontSize: 42, fontWeight: 700, color: C.text }}>
          Session ID
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 100, marginBottom: 40 }}>
        <UserAvatar letter="A" color={C.accent} delay={15} />
        <UserAvatar letter="B" color={C.purple} delay={35} />
      </div>

      <FadeText delay={60}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 30,
            color: C.text,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Cada chat = <span style={{ color: C.accent }}>memoria independiente</span>
        </p>
      </FadeText>

      <FadeText delay={80}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textSecondary, textAlign: "center", marginTop: 12 }}>
          El sessionId separa las conversaciones de cada usuario
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseEnN8n: React.FC = () => {
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
      <FadeText delay={0} style={{ marginBottom: 50 }}>
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 600, color: C.text }}>
          En <span style={{ color: C.accent }}>n8n</span>
        </p>
      </FadeText>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* AI Agent node */}
        <N8nNode
          label="AI Agent"
          icon={"\uD83E\uDD16"}
          color={C.accent}
          width={200}
          height={90}
          delay={10}
          highlighted
          ports={{ bottom: 1 }}
        />

        {/* Connection line */}
        <N8nConnection from="top" length={60} color={C.accent} startFrame={20} animated />

        {/* Window Buffer Memory node */}
        <N8nNode
          label="Window Buffer Memory"
          icon={"\uD83E\uDDE0"}
          color={C.green}
          width={240}
          height={90}
          delay={30}
          highlighted
          ports={{ top: true }}
        />
      </div>

      {/* Config details */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 50,
        }}
      >
        <FadeText delay={50}>
          <div
            style={{
              background: C.surface,
              borderRadius: 12,
              padding: "16px 24px",
              border: `1px solid ${C.green}`,
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 14, color: C.textSecondary, display: "block", marginBottom: 6 }}>
              Window Size
            </span>
            <span style={{ fontFamily: MONO, fontSize: 22, color: C.green, fontWeight: 700 }}>
              windowSize = 10
            </span>
          </div>
        </FadeText>

        <FadeText delay={65}>
          <div
            style={{
              background: C.surface,
              borderRadius: 12,
              padding: "16px 24px",
              border: `1px solid ${C.purple}`,
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 14, color: C.textSecondary, display: "block", marginBottom: 6 }}>
              Session ID
            </span>
            <span style={{ fontFamily: MONO, fontSize: 20, color: C.purple, fontWeight: 700 }}>
              {"{{ $json.chatId }}"}
            </span>
          </div>
        </FadeText>
      </div>

      <FadeText delay={80} style={{ marginTop: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 20, color: C.textSecondary, textAlign: "center" }}>
          Se conecta al puerto inferior del AI Agent
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseCosto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phaseDuration = S.COSTO.end - S.COSTO.start;

  // Token bar filling animation
  const fillProgress = interpolate(frame, [30, phaseDuration * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barWidth = 700;
  const segments = 20;

  // Color gradient from green to yellow to red
  const getSegmentColor = (index: number): string => {
    const ratio = index / (segments - 1);
    if (ratio < 0.5) return C.green;
    if (ratio < 0.75) return C.yellow;
    return C.red;
  };

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
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.text }}>
          Costo de la Memoria
        </p>
      </FadeText>

      {/* Token bar visualization */}
      <div style={{ width: barWidth, marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            gap: 4,
            height: 50,
            alignItems: "flex-end",
          }}
        >
          {Array.from({ length: segments }).map((_, i) => {
            const segmentProgress = interpolate(
              fillProgress,
              [i / segments, (i + 1) / segments],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${segmentProgress * 100}%`,
                  background: getSegmentColor(i),
                  borderRadius: 4,
                  opacity: segmentProgress > 0 ? 0.5 + segmentProgress * 0.5 : 0,
                }}
              />
            );
          })}
        </div>

        {/* Labels below bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 14, color: C.green }}>5</span>
          <span style={{ fontFamily: MONO, fontSize: 14, color: C.yellow }}>10</span>
          <span style={{ fontFamily: MONO, fontSize: 14, color: C.orange }}>15</span>
          <span style={{ fontFamily: MONO, fontSize: 14, color: C.red }}>20+</span>
        </div>
      </div>

      <FadeText delay={30} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: C.text, textAlign: "center" }}>
          Mas memoria = mas tokens = <span style={{ color: C.red, fontWeight: 700 }}>mas costo</span>
        </p>
      </FadeText>

      {/* Recommended range */}
      <FadeText delay={60}>
        <div
          style={{
            background: C.surface,
            borderRadius: 16,
            padding: "20px 40px",
            border: `2px solid ${C.green}`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: C.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "#000",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {"\u2713"}
          </div>
          <div>
            <p style={{ fontFamily: FONT, fontSize: 24, color: C.text, fontWeight: 600 }}>
              Recomendado: <span style={{ color: C.green }}>10-20</span> mensajes
            </p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.textSecondary, marginTop: 4 }}>
              Buen balance entre contexto y costo
            </p>
          </div>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseResumen: React.FC = () => {
  const points = [
    { num: "1", text: "La memoria permite recordar conversaciones", color: C.accent },
    { num: "2", text: "Cada usuario tiene su propio sessionId", color: C.purple },
    { num: "3", text: "Window Buffer = ultimos N mensajes (10-20)", color: C.green },
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

export const S2Memoria: React.FC = () => {
  const frame = useCurrentFrame();

  // Global fade-out
  const fadeOut = interpolate(frame, [S.FADE.start, S.FADE.end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.background, opacity: fadeOut }}>
      <Sequence from={S.TITULO.start} durationInFrames={S.TITULO.end - S.TITULO.start} premountFor={30}>
        <PhaseTitulo />
      </Sequence>

      <Sequence from={S.PROBLEMA.start} durationInFrames={S.PROBLEMA.end - S.PROBLEMA.start} premountFor={30}>
        <PhaseProblema />
      </Sequence>

      <Sequence from={S.SOLUCION.start} durationInFrames={S.SOLUCION.end - S.SOLUCION.start} premountFor={30}>
        <PhaseSolucion />
      </Sequence>

      <Sequence from={S.WINDOW_BUF.start} durationInFrames={S.WINDOW_BUF.end - S.WINDOW_BUF.start} premountFor={30}>
        <PhaseWindowBuf />
      </Sequence>

      <Sequence from={S.SESSION_ID.start} durationInFrames={S.SESSION_ID.end - S.SESSION_ID.start} premountFor={30}>
        <PhaseSessionId />
      </Sequence>

      <Sequence from={S.EN_N8N.start} durationInFrames={S.EN_N8N.end - S.EN_N8N.start} premountFor={30}>
        <PhaseEnN8n />
      </Sequence>

      <Sequence from={S.COSTO.start} durationInFrames={S.COSTO.end - S.COSTO.start} premountFor={30}>
        <PhaseCosto />
      </Sequence>

      <Sequence from={S.RESUMEN.start} durationInFrames={S.RESUMEN.end - S.RESUMEN.start} premountFor={30}>
        <PhaseResumen />
      </Sequence>
    </AbsoluteFill>
  );
};
