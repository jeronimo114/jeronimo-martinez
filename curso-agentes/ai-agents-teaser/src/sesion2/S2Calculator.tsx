import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_CALCULATOR, TYPOGRAPHY } from "../utils/constants";
import { FlowDiagram } from "./components/FlowDiagram";
import { N8nNode } from "./components/N8nNode";

const S = S2_CALCULATOR;
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
// Inline SVG calculator icon
// ============================================================

const CalcIcon: React.FC<{ size: number; color: string; scale?: number }> = ({
  size,
  color,
  scale = 1,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    style={{ transform: `scale(${scale})` }}
  >
    {/* Body */}
    <rect
      x="10"
      y="4"
      width="60"
      height="72"
      rx="10"
      fill={C.surface}
      stroke={color}
      strokeWidth="3"
    />
    {/* Screen */}
    <rect x="18" y="12" width="44" height="18" rx="4" fill={color} opacity={0.2} />
    <text
      x="56"
      y="26"
      fontFamily={MONO}
      fontSize="13"
      fill={color}
      textAnchor="end"
      fontWeight="700"
    >
      35,770
    </text>
    {/* Buttons row 1 */}
    <rect x="18" y="36" width="10" height="10" rx="2" fill={color} opacity={0.5} />
    <rect x="32" y="36" width="10" height="10" rx="2" fill={color} opacity={0.5} />
    <rect x="46" y="36" width="10" height="10" rx="2" fill={color} opacity={0.5} />
    <rect x="60" y="36" width="10" height="10" rx="2" fill={C.orange} opacity={0.7} />
    {/* Buttons row 2 */}
    <rect x="18" y="50" width="10" height="10" rx="2" fill={color} opacity={0.5} />
    <rect x="32" y="50" width="10" height="10" rx="2" fill={color} opacity={0.5} />
    <rect x="46" y="50" width="10" height="10" rx="2" fill={color} opacity={0.5} />
    <rect x="60" y="50" width="10" height="10" rx="2" fill={C.orange} opacity={0.7} />
    {/* Buttons row 3 */}
    <rect x="18" y="64" width="24" height="8" rx="2" fill={color} opacity={0.5} />
    <rect x="46" y="64" width="10" height="8" rx="2" fill={color} opacity={0.5} />
    <rect x="60" y="64" width="10" height="8" rx="2" fill={C.green} opacity={0.8} />
  </svg>
);

// ============================================================
// Phase components
// ============================================================

const PhaseTitulo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const subSpring = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const iconSpring = spring({ frame, fps, delay: 8, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
      }}
    >
      <div
        style={{
          transform: `scale(${iconSpring})`,
          opacity: iconSpring,
          marginBottom: 30,
        }}
      >
        <CalcIcon size={140} color={C.accent} scale={iconSpring} />
      </div>
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
        <span style={{ color: C.accent }}>Calculator</span>
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
        Herramienta de cálculo
      </p>
    </AbsoluteFill>
  );
};

const PhaseProblema: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Question appears
  const questionProgress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // LLM "thinking" then wrong answer
  const wrongAnswerAppear = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red X appears
  const redXAppear = interpolate(frame, [100, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Correct answer appears
  const correctAppear = interpolate(frame, [150, 170], [0, 1], {
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
            fontSize: 36,
            fontWeight: 600,
            color: C.textSecondary,
          }}
        >
          LLM solo (sin herramienta)
        </p>
      </FadeText>

      {/* Question bubble */}
      <div
        style={{
          opacity: questionProgress,
          background: C.surface,
          borderRadius: 16,
          padding: "20px 40px",
          marginBottom: 40,
          border: `1px solid ${C.textDim}`,
        }}
      >
        <p
          style={{
            fontFamily: MONO,
            fontSize: 32,
            color: C.text,
            fontWeight: 500,
          }}
        >
          ¿Cuánto es 1547 × 23 + 189?
        </p>
      </div>

      {/* Wrong answer area */}
      <div
        style={{
          opacity: wrongAnswerAppear,
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: C.surface,
            borderRadius: 16,
            padding: "16px 32px",
            border: `1px solid ${redXAppear > 0.5 ? C.red : C.textDim}`,
            boxShadow: redXAppear > 0.5 ? `0 0 20px ${C.red}30` : "none",
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: 40,
              color: redXAppear > 0.5 ? C.red : C.text,
              fontWeight: 700,
              textDecoration: redXAppear > 0.5 ? "line-through" : "none",
              textDecorationColor: C.red,
            }}
          >
            ≈ 35,700
          </p>
        </div>

        {/* Red X mark */}
        {redXAppear > 0 && (
          <div
            style={{
              opacity: redXAppear,
              transform: `scale(${redXAppear})`,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: C.red,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                ✗
              </span>
            </div>
          </div>
        )}
      </div>

      {/* "Incorrecto" label */}
      {redXAppear > 0 && (
        <p
          style={{
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 700,
            color: C.red,
            opacity: redXAppear,
            marginBottom: 20,
          }}
        >
          Incorrecto
        </p>
      )}

      {/* Error bar */}
      {redXAppear > 0 && (
        <div
          style={{
            width: 500,
            height: 6,
            borderRadius: 3,
            background: C.red,
            opacity: redXAppear * 0.7,
            marginBottom: 30,
          }}
        />
      )}

      {/* Correct answer */}
      {correctAppear > 0 && (
        <div
          style={{
            opacity: correctAppear,
            transform: `translateY(${(1 - correctAppear) * 20}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 24,
              color: C.textSecondary,
            }}
          >
            Respuesta correcta:
          </p>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 36,
              fontWeight: 700,
              color: C.green,
            }}
          >
            35,770
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};

const PhaseSolucion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Question appears
  const questionAppear = spring({ frame, fps, delay: 0, config: { damping: 200 } });

  // Tool invocation flash
  const toolFlashStart = 60;
  const toolFlash = interpolate(frame, [toolFlashStart, toolFlashStart + 10, toolFlashStart + 30], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const toolGlow = interpolate(frame, [toolFlashStart, toolFlashStart + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Correct answer
  const answerAppear = spring({ frame, fps, delay: 100, config: { damping: 200 } });
  const checkAppear = spring({ frame, fps, delay: 120, config: { damping: 12 } });

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
            fontSize: 36,
            fontWeight: 600,
            color: C.green,
          }}
        >
          Agente + Calculator
        </p>
      </FadeText>

      {/* Same question */}
      <div
        style={{
          opacity: questionAppear,
          background: C.surface,
          borderRadius: 16,
          padding: "20px 40px",
          marginBottom: 40,
          border: `1px solid ${C.textDim}`,
        }}
      >
        <p
          style={{
            fontFamily: MONO,
            fontSize: 32,
            color: C.text,
            fontWeight: 500,
          }}
        >
          ¿Cuánto es 1547 × 23 + 189?
        </p>
      </div>

      {/* Tool invocation flash */}
      <div
        style={{
          opacity: toolGlow,
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 30,
          padding: "12px 28px",
          background: `${C.accent}${Math.round(toolFlash * 30).toString(16).padStart(2, "0")}`,
          borderRadius: 12,
          border: `1px solid ${C.accent}`,
          boxShadow: toolFlash > 0 ? `0 0 30px ${C.accent}60` : "none",
        }}
      >
        <CalcIcon size={36} color={C.accent} />
        <p
          style={{
            fontFamily: MONO,
            fontSize: 18,
            color: C.accent,
            fontWeight: 600,
          }}
        >
          Calculator.evaluate("1547 * 23 + 189")
        </p>
      </div>

      {/* Correct answer */}
      <div
        style={{
          opacity: answerAppear,
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: C.surface,
            borderRadius: 16,
            padding: "16px 32px",
            border: `1px solid ${C.green}`,
            boxShadow: `0 0 20px ${C.green}30`,
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: 40,
              color: C.green,
              fontWeight: 700,
            }}
          >
            35,770
          </p>
        </div>

        {/* Green checkmark */}
        <div
          style={{
            opacity: checkAppear,
            transform: `scale(${checkAppear})`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
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
                fontSize: 32,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              ✓
            </span>
          </div>
        </div>
      </div>

      <FadeText delay={130}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 700,
            color: C.green,
          }}
        >
          Exacto
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseComoFunc: React.FC = () => {
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
          ¿Cómo funciona?
        </p>
      </FadeText>

      <FlowDiagram
        steps={[
          { label: "Mensaje", icon: "💬", color: C.textSecondary },
          { label: "Agente detecta\noperación", icon: "🧠", color: C.accent },
          { label: "Calculator", icon: "🔢", color: C.green },
          { label: "Resultado", icon: "📊", color: C.orange },
          { label: "Respuesta", icon: "✅", color: C.green },
        ]}
        delay={20}
        stagger={18}
        direction="horizontal"
      />

      <FadeText delay={120} style={{ marginTop: 50 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 26,
            color: C.textSecondary,
            textAlign: "center",
          }}
        >
          El agente decide cuándo usar la calculadora automáticamente
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseEnN8n: React.FC = () => {
  const steps = [
    { num: "1", text: 'Buscar "Calculator" en nodos', icon: "🔍" },
    { num: "2", text: "Arrastra al canvas", icon: "↕" },
    { num: "3", text: 'Conectar al puerto "Tool"', icon: "🔌" },
    { num: "4", text: "¡Listo!", icon: "✓" },
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
        <p
          style={{
            fontFamily: FONT,
            fontSize: 44,
            fontWeight: 700,
            color: C.text,
          }}
        >
          En <span style={{ color: C.accent }}>n8n</span>
        </p>
      </FadeText>

      {steps.map((step, i) => (
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
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: step.num === "4" ? C.green : C.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT,
                fontSize: 24,
                fontWeight: 700,
                color: "#000",
                flexShrink: 0,
              }}
            >
              {step.num === "4" ? "✓" : step.num}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>{step.icon !== "✓" ? step.icon : ""}</span>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 30,
                  color: step.num === "4" ? C.green : C.text,
                  fontWeight: step.num === "4" ? 700 : 400,
                }}
              >
                {step.text}
              </p>
            </div>
          </div>
        </FadeText>
      ))}

      <FadeText delay={130} style={{ marginTop: 20 }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 12,
            padding: "14px 28px",
            border: `1px solid ${C.accent}40`,
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 22,
              color: C.textSecondary,
            }}
          >
            No requiere configuración adicional
          </p>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseEjemplos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const examples = [
    { title: "IVA de 1500€", detail: "1500 × 0.21 = 315€", color: C.accent },
    { title: "Propina 15% de 87€", detail: "87 × 0.15 = 13.05€", color: C.green },
    { title: "100 USD a EUR", detail: "100 × 0.92 = 92€", color: C.orange },
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
          Ejemplos
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 30 }}>
        {examples.map((ex, i) => {
          const cardSpring = spring({
            frame,
            fps,
            delay: 30 + i * 25,
            config: { damping: 12 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardSpring,
                transform: `scale(${cardSpring})`,
                background: C.surface,
                borderRadius: 20,
                padding: "36px 40px",
                border: `2px solid ${ex.color}`,
                boxShadow: `0 0 20px ${ex.color}20`,
                width: 280,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: `${ex.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px auto",
                }}
              >
                <CalcIcon size={36} color={ex.color} />
              </div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 24,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 12,
                }}
              >
                {ex.title}
              </p>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 16,
                  color: ex.color,
                  fontWeight: 500,
                }}
              >
                {ex.detail}
              </p>
            </div>
          );
        })}
      </div>

      <FadeText delay={110} style={{ marginTop: 40 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 24,
            color: C.textSecondary,
            textAlign: "center",
          }}
        >
          El agente detecta la operación y usa Calculator automáticamente
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseResumen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const checkSpring = spring({ frame, fps, delay: 30, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      {/* Checkmark */}
      <div
        style={{
          opacity: checkSpring,
          transform: `scale(${checkSpring})`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: C.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 40px ${C.green}40`,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 56,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            ✓
          </span>
        </div>
      </div>

      <FadeText delay={10}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 52,
            fontWeight: 700,
            color: C.text,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Matemáticas{" "}
          <span style={{ color: C.accent }}>precisas</span>
          <br />
          sin errores
        </p>
      </FadeText>

      <FadeText delay={40} style={{ marginTop: 30 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 26,
            color: C.textSecondary,
            textAlign: "center",
          }}
        >
          Calculator garantiza resultados exactos
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2Calculator: React.FC = () => {
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
        from={S.PROBLEMA.start}
        durationInFrames={S.PROBLEMA.end - S.PROBLEMA.start}
        premountFor={30}
      >
        <PhaseProblema />
      </Sequence>

      <Sequence
        from={S.SOLUCION.start}
        durationInFrames={S.SOLUCION.end - S.SOLUCION.start}
        premountFor={30}
      >
        <PhaseSolucion />
      </Sequence>

      <Sequence
        from={S.COMO_FUNC.start}
        durationInFrames={S.COMO_FUNC.end - S.COMO_FUNC.start}
        premountFor={30}
      >
        <PhaseComoFunc />
      </Sequence>

      <Sequence
        from={S.EN_N8N.start}
        durationInFrames={S.EN_N8N.end - S.EN_N8N.start}
        premountFor={30}
      >
        <PhaseEnN8n />
      </Sequence>

      <Sequence
        from={S.EJEMPLOS.start}
        durationInFrames={S.EJEMPLOS.end - S.EJEMPLOS.start}
        premountFor={30}
      >
        <PhaseEjemplos />
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
