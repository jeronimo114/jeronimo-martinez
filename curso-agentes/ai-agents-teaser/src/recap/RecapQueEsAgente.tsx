import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, RECAP_AGENTE, TYPOGRAPHY } from "../utils/constants";
import { BrainIcon } from "./components/BrainIcon";
import { ToolIcon } from "./components/ToolIcon";
import { MemoryIcon } from "./components/MemoryIcon";

const S = RECAP_AGENTE;
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
        ¿Qué es un <span style={{ color: C.accent }}>Agente</span> de IA?
      </h1>
    </AbsoluteFill>
  );
};

const PhaseContextoLLM: React.FC = () => {
  const limitations = [
    "Solo genera texto",
    "No tiene memoria entre sesiones",
    "No puede ejecutar acciones",
    "Solo responde preguntas",
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
      <FadeText delay={0} style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <BrainIcon size={80} color={C.textSecondary} />
          <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.text }}>
            Un LLM solo es un cerebro
          </p>
        </div>
      </FadeText>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 30 }}>
        {limitations.map((item, i) => (
          <FadeText key={i} delay={20 + i * 15}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: C.red,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                ✗
              </div>
              <p style={{ fontFamily: FONT, fontSize: 28, color: C.textSecondary }}>
                {item}
              </p>
            </div>
          </FadeText>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PhaseAgenteIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainSlide = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const bodyAppear = spring({ frame, fps, delay: 40, config: { damping: 12 } });

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
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginBottom: 40,
        }}
      >
        {/* Brain moves left */}
        <div style={{ transform: `translateX(${(1 - brainSlide) * 100}px)`, opacity: brainSlide }}>
          <BrainIcon size={120} color={C.accent} />
        </div>

        <FadeText delay={30}>
          <span style={{ fontFamily: FONT, fontSize: 48, color: C.textSecondary }}>+</span>
        </FadeText>

        {/* Robot body appears */}
        <div
          style={{
            transform: `scale(${bodyAppear})`,
            opacity: bodyAppear,
          }}
        >
          <svg width="120" height="140" viewBox="0 0 120 140">
            {/* Simple robot body */}
            <rect x="20" y="10" width="80" height="50" rx="12" fill={C.surfaceLight} stroke={C.accent} strokeWidth="2" />
            {/* Eyes */}
            <circle cx="45" cy="30" r="8" fill={C.accent} />
            <circle cx="75" cy="30" r="8" fill={C.accent} />
            <circle cx="47" cy="28" r="3" fill="#fff" />
            <circle cx="77" cy="28" r="3" fill="#fff" />
            {/* Body */}
            <rect x="30" y="65" width="60" height="40" rx="8" fill={C.surfaceLight} stroke={C.accent} strokeWidth="2" />
            {/* LED */}
            <circle cx="60" cy="85" r="5" fill={C.green} />
            {/* Arms */}
            <rect x="8" y="68" width="18" height="10" rx="5" fill={C.surfaceLight} stroke={C.accent} strokeWidth="1.5" />
            <rect x="94" y="68" width="18" height="10" rx="5" fill={C.surfaceLight} stroke={C.accent} strokeWidth="1.5" />
            {/* Legs */}
            <rect x="38" y="108" width="12" height="20" rx="5" fill={C.surfaceLight} stroke={C.accent} strokeWidth="1.5" />
            <rect x="70" y="108" width="12" height="20" rx="5" fill={C.surfaceLight} stroke={C.accent} strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      <FadeText delay={50}>
        <p style={{ fontFamily: FONT, fontSize: 48, fontWeight: 700, color: C.text, textAlign: "center" }}>
          Un Agente = <span style={{ color: C.accent }}>Cerebro</span> +{" "}
          <span style={{ color: C.green }}>Cuerpo</span>
        </p>
      </FadeText>

      <FadeText delay={70}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary, textAlign: "center", marginTop: 16 }}>
          El LLM es el cerebro. Las herramientas son el cuerpo.
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseHerramientas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools: { icon: "globe" | "email" | "database" | "terminal" | "document"; label: string }[] = [
    { icon: "globe", label: "Navegar web" },
    { icon: "email", label: "Enviar emails" },
    { icon: "database", label: "Consultar datos" },
    { icon: "terminal", label: "Ejecutar código" },
    { icon: "document", label: "Leer archivos" },
  ];

  const robotScale = spring({ frame, fps, config: { damping: 200 } });

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
        {/* Center robot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${robotScale})`,
          }}
        >
          <svg width="80" height="100" viewBox="0 0 80 100">
            <rect x="10" y="5" width="60" height="40" rx="10" fill={C.surfaceLight} stroke={C.accent} strokeWidth="2" />
            <circle cx="30" cy="22" r="6" fill={C.accent} />
            <circle cx="50" cy="22" r="6" fill={C.accent} />
            <rect x="16" y="50" width="48" height="32" rx="6" fill={C.surfaceLight} stroke={C.accent} strokeWidth="2" />
            <circle cx="40" cy="66" r="4" fill={C.green} />
          </svg>
        </div>

        {/* Orbiting tools */}
        {tools.map((tool, i) => {
          const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 200;
          const toolSpring = spring({
            frame,
            fps,
            delay: 15 + i * 12,
            config: { damping: 12 },
          });

          // Subtle orbit rotation
          const orbitAngle = angle + (frame * 0.005);
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
        <p style={{ fontFamily: FONT, fontSize: 28, color: C.text, textAlign: "center" }}>
          Las herramientas le permiten <span style={{ color: C.accent, fontWeight: 700 }}>ACTUAR</span>{" "}
          en el mundo real
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseMemoria: React.FC = () => {
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <MemoryIcon size={80} color={C.accent} />
          <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.text }}>
            Memoria persistente
          </p>
        </div>
      </FadeText>

      <FadeText delay={20} style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: C.textSecondary, textAlign: "center" }}>
          Recuerda conversaciones anteriores
        </p>
      </FadeText>

      {/* LLM vs Agent comparison */}
      <div style={{ display: "flex", gap: 60, marginTop: 30 }}>
        <FadeText delay={40}>
          <div
            style={{
              padding: "30px 40px",
              background: C.surface,
              borderRadius: 16,
              border: `1px solid ${C.red}40`,
              textAlign: "center",
              width: 320,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 20, color: C.red, fontWeight: 600, marginBottom: 12 }}>
              LLM
            </p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.textSecondary }}>
              Cada chat empieza de cero
            </p>
          </div>
        </FadeText>

        <FadeText delay={60}>
          <div
            style={{
              padding: "30px 40px",
              background: C.surface,
              borderRadius: 16,
              border: `1px solid ${C.green}40`,
              textAlign: "center",
              width: 320,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 20, color: C.green, fontWeight: 600, marginBottom: 12 }}>
              AGENTE
            </p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.textSecondary }}>
              Acumula conocimiento
            </p>
          </div>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

const PhaseAutonomia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { label: "Lee calendario", delay: 40 },
    { label: "Prioriza tareas", delay: 60 },
    { label: "Envía resumen", delay: 80 },
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
      <FadeText delay={0} style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary }}>
          Usuario dice:
        </p>
      </FadeText>

      <FadeText delay={10} style={{ marginBottom: 40 }}>
        <div
          style={{
            background: C.accent,
            padding: "16px 32px",
            borderRadius: 20,
            borderBottomRightRadius: 4,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 28, color: "#fff", fontWeight: 500 }}>
            "Organiza mi semana"
          </p>
        </div>
      </FadeText>

      <FadeText delay={25} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textSecondary }}>
          Agente decide y ejecuta:
        </p>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {steps.map((step, i) => {
          const stepSpring = spring({
            frame,
            fps,
            delay: step.delay,
            config: { damping: 12 },
          });

          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div style={{ opacity: stepSpring }}>
                  <svg width="30" height="20" viewBox="0 0 30 20">
                    <path d="M0,10 L22,10 M16,4 L24,10 L16,16" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <div
                style={{
                  opacity: stepSpring,
                  transform: `scale(${stepSpring})`,
                  background: C.surface,
                  border: `2px solid ${C.accent}`,
                  borderRadius: 12,
                  padding: "16px 24px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontFamily: FONT, fontSize: 14, color: C.accent, fontWeight: 600, marginBottom: 4 }}>
                  {i + 1}.
                </p>
                <p style={{ fontFamily: FONT, fontSize: 18, color: C.text }}>
                  {step.label}
                </p>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <FadeText delay={100} style={{ marginTop: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.text, textAlign: "center" }}>
          Toma decisiones y ejecuta pasos{" "}
          <span style={{ color: C.accent, fontWeight: 700 }}>sin intervención</span>
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseComparacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const llmItems = [
    { icon: "✗", text: "¿Cómo envío un email?" },
    { icon: "→", text: "Te explica cómo" },
    { icon: "✗", text: "Sin herramientas" },
    { icon: "✗", text: "Sin memoria" },
    { icon: "✗", text: "Solo texto" },
  ];

  const agentItems = [
    { icon: "✓", text: "Envía este email" },
    { icon: "→", text: "Lo envía por ti" },
    { icon: "✓", text: "Herramientas" },
    { icon: "✓", text: "Memoria" },
    { icon: "✓", text: "Acciones" },
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
      <div style={{ display: "flex", gap: 40, width: "100%", maxWidth: 1200 }}>
        {/* LLM side */}
        <FadeText delay={0} style={{ flex: 1 }}>
          <div
            style={{
              background: C.surface,
              borderRadius: 20,
              padding: 40,
              border: `1px solid #333`,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <BrainIcon size={60} color={C.textSecondary} />
              <p style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.textSecondary, marginTop: 8 }}>
                LLM
              </p>
            </div>
            {llmItems.map((item, i) => (
              <FadeText key={i} delay={10 + i * 10}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 20,
                      color: item.icon === "→" ? C.textSecondary : C.red,
                      fontWeight: 700,
                      width: 24,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span style={{ fontFamily: FONT, fontSize: 20, color: C.textSecondary }}>
                    {item.text}
                  </span>
                </div>
              </FadeText>
            ))}
          </div>
        </FadeText>

        {/* Agent side */}
        <FadeText delay={30} style={{ flex: 1 }}>
          <div
            style={{
              background: C.surface,
              borderRadius: 20,
              padding: 40,
              border: `1px solid ${C.accent}40`,
              boxShadow: `0 0 30px ${C.accentDim}`,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <svg width="60" height="70" viewBox="0 0 60 70">
                <rect x="8" y="2" width="44" height="30" rx="8" fill={C.surfaceLight} stroke={C.accent} strokeWidth="2" />
                <circle cx="22" cy="15" r="5" fill={C.accent} />
                <circle cx="38" cy="15" r="5" fill={C.accent} />
                <rect x="14" y="36" width="32" height="22" rx="5" fill={C.surfaceLight} stroke={C.accent} strokeWidth="2" />
                <circle cx="30" cy="47" r="3" fill={C.green} />
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.accent, marginTop: 8 }}>
                AGENTE
              </p>
            </div>
            {agentItems.map((item, i) => (
              <FadeText key={i} delay={40 + i * 10}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 20,
                      color: item.icon === "→" ? C.textSecondary : C.green,
                      fontWeight: 700,
                      width: 24,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span style={{ fontFamily: FONT, fontSize: 20, color: C.text }}>
                    {item.text}
                  </span>
                </div>
              </FadeText>
            ))}
          </div>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

const PhaseEjemploReal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { label: "Cliente pregunta", color: C.yellow, delay: 10 },
    { label: "Agente busca en docs", color: C.accent, delay: 30 },
    { label: "Agente responde", color: C.green, delay: 50 },
    { label: "Si no puede → escala a humano", color: C.orange, delay: 70 },
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
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 600, color: C.text }}>
          Ejemplo: <span style={{ color: C.accent }}>Agente de soporte</span>
        </p>
      </FadeText>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        {steps.map((step, i) => {
          const stepSpring = spring({
            frame,
            fps,
            delay: step.delay,
            config: { damping: 15 },
          });

          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div style={{ opacity: stepSpring }}>
                  <svg width="20" height="30" viewBox="0 0 20 30">
                    <path d="M10,0 L10,22 M4,16 L10,24 L16,16" fill="none" stroke={C.textDim} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <div
                style={{
                  opacity: stepSpring,
                  transform: `scale(${stepSpring}) translateY(${(1 - stepSpring) * 20}px)`,
                  background: C.surface,
                  border: `2px solid ${step.color}`,
                  borderRadius: 12,
                  padding: "14px 40px",
                  minWidth: 300,
                  textAlign: "center",
                }}
              >
                <p style={{ fontFamily: FONT, fontSize: 22, color: C.text }}>
                  {step.label}
                </p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PhaseResumen: React.FC = () => {
  const points = [
    { num: "1", text: "Agente = LLM + Herramientas + Memoria", color: C.accent },
    { num: "2", text: "Puede ejecutar acciones reales", color: C.green },
    { num: "3", text: "Toma decisiones de forma autónoma", color: C.purple },
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

export const RecapQueEsAgente: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [S.FADE_LOOP.start, S.FADE_LOOP.end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.background, opacity: fadeOut }}>
      <Sequence from={S.TITULO.start} durationInFrames={S.TITULO.end - S.TITULO.start} premountFor={30}>
        <PhaseTitulo />
      </Sequence>

      <Sequence from={S.CONTEXTO_LLM.start} durationInFrames={S.CONTEXTO_LLM.end - S.CONTEXTO_LLM.start} premountFor={30}>
        <PhaseContextoLLM />
      </Sequence>

      <Sequence from={S.AGENTE_INTRO.start} durationInFrames={S.AGENTE_INTRO.end - S.AGENTE_INTRO.start} premountFor={30}>
        <PhaseAgenteIntro />
      </Sequence>

      <Sequence from={S.HERRAMIENTAS.start} durationInFrames={S.HERRAMIENTAS.end - S.HERRAMIENTAS.start} premountFor={30}>
        <PhaseHerramientas />
      </Sequence>

      <Sequence from={S.MEMORIA.start} durationInFrames={S.MEMORIA.end - S.MEMORIA.start} premountFor={30}>
        <PhaseMemoria />
      </Sequence>

      <Sequence from={S.AUTONOMIA.start} durationInFrames={S.AUTONOMIA.end - S.AUTONOMIA.start} premountFor={30}>
        <PhaseAutonomia />
      </Sequence>

      <Sequence from={S.COMPARACION.start} durationInFrames={S.COMPARACION.end - S.COMPARACION.start} premountFor={30}>
        <PhaseComparacion />
      </Sequence>

      <Sequence from={S.EJEMPLO_REAL.start} durationInFrames={S.EJEMPLO_REAL.end - S.EJEMPLO_REAL.start} premountFor={30}>
        <PhaseEjemploReal />
      </Sequence>

      <Sequence from={S.RESUMEN.start} durationInFrames={S.RESUMEN.end - S.RESUMEN.start} premountFor={30}>
        <PhaseResumen />
      </Sequence>
    </AbsoluteFill>
  );
};
