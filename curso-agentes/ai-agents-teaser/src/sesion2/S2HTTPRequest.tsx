import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_HTTP_REQUEST, TYPOGRAPHY } from "../utils/constants";
import { ChatBubble } from "./components/ChatBubble";

const S = S2_HTTP_REQUEST;
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
      {/* Globe/arrow SVG icon */}
      <div
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          marginBottom: 24,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* Globe */}
          <circle cx="60" cy="60" r="40" stroke={C.accent} strokeWidth="3" fill="none" />
          <ellipse cx="60" cy="60" rx="20" ry="40" stroke={C.accent} strokeWidth="2" fill="none" />
          <line x1="20" y1="60" x2="100" y2="60" stroke={C.accent} strokeWidth="2" />
          <line x1="60" y1="20" x2="60" y2="100" stroke={C.accent} strokeWidth="2" />
          {/* Arrow going out */}
          <line x1="85" y1="35" x2="110" y2="10" stroke={C.green} strokeWidth="3" strokeLinecap="round" />
          <polyline points="100,10 110,10 110,20" stroke={C.green} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
        <span style={{ color: C.accent }}>HTTP Request</span>
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
        Tu agente habla con el mundo
      </p>
    </AbsoluteFill>
  );
};

const PhaseConcepto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const services = [
    { label: "Clima", angle: -40, color: C.teal },
    { label: "Noticias", angle: 0, color: C.orange },
    { label: "Datos", angle: 40, color: C.green },
  ];

  const globeSpring = spring({ frame, fps, delay: 10, config: { damping: 15 } });

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
            fontSize: 42,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Tu agente puede llamar a{" "}
          <span style={{ color: C.accent }}>cualquier API del mundo</span>
        </p>
      </FadeText>

      <div style={{ position: "relative", width: 700, height: 280 }}>
        {/* Center globe */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${globeSpring})`,
            opacity: globeSpring,
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke={C.accent} strokeWidth="2.5" fill="none" />
            <ellipse cx="50" cy="50" rx="18" ry="40" stroke={C.accent} strokeWidth="1.5" fill="none" />
            <line x1="10" y1="50" x2="90" y2="50" stroke={C.accent} strokeWidth="1.5" />
            <line x1="50" y1="10" x2="50" y2="90" stroke={C.accent} strokeWidth="1.5" />
          </svg>
        </div>

        {/* Service icons with arrows */}
        {services.map((svc, i) => {
          const svcDelay = 30 + i * 15;
          const svcSpring = spring({ frame, fps, delay: svcDelay, config: { damping: 15 } });
          const arrowProgress = interpolate(frame, [svcDelay, svcDelay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const angleRad = (svc.angle * Math.PI) / 180;
          const radius = 220;
          const endX = 350 + Math.cos(angleRad) * radius;
          const endY = 140 + Math.sin(angleRad) * radius;
          const startX = 350;
          const startY = 140;

          return (
            <React.Fragment key={i}>
              {/* Arrow from globe to service */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <line
                  x1={startX}
                  y1={startY}
                  x2={startX + (endX - startX) * arrowProgress}
                  y2={startY + (endY - startY) * arrowProgress}
                  stroke={svc.color}
                  strokeWidth="2"
                  opacity={arrowProgress * 0.6}
                  strokeDasharray="6 4"
                />
              </svg>

              {/* Service circle with label */}
              <div
                style={{
                  position: "absolute",
                  left: endX,
                  top: endY,
                  transform: `translate(-50%, -50%) scale(${svcSpring})`,
                  opacity: svcSpring,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: C.surface,
                    border: `2px solid ${svc.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 14,
                      color: svc.color,
                      fontWeight: 600,
                    }}
                  >
                    {svc.label}
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <FadeText delay={75} style={{ marginTop: 20 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 26,
            color: C.textSecondary,
            textAlign: "center",
          }}
        >
          HTTP Request = el nodo que hace llamadas a internet
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseReqRes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { label: "Bot", color: C.accent, icon: "BOT" },
    { label: "GET", color: C.yellow, icon: "arrow" },
    { label: "API Server", color: C.green, icon: "SRV" },
    { label: "Response JSON", color: C.teal, icon: "arrow" },
    { label: "Bot", color: C.accent, icon: "BOT" },
    { label: "Respuesta bonita", color: C.purple, icon: "TXT" },
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
          }}
        >
          El flujo: Request y Response
        </p>
      </FadeText>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
        }}
      >
        {steps.map((step, i) => {
          const stepDelay = 15 + i * 20;

          if (step.icon === "arrow") {
            return (
              <FadeText key={i} delay={stepDelay}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "0 8px",
                  }}
                >
                  <svg width="80" height="40" viewBox="0 0 80 40">
                    <line
                      x1="5"
                      y1="20"
                      x2="65"
                      y2="20"
                      stroke={step.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="55,12 67,20 55,28"
                      fill="none"
                      stroke={step.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 14,
                      color: step.color,
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              </FadeText>
            );
          }

          return (
            <FadeText key={i} delay={stepDelay}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 16,
                    background: C.surface,
                    border: `2px solid ${step.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 18,
                      color: step.color,
                      fontWeight: 700,
                    }}
                  >
                    {step.icon}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 16,
                    color: C.textSecondary,
                    marginTop: 8,
                    textAlign: "center",
                    maxWidth: 110,
                  }}
                >
                  {step.label}
                </span>
              </div>
            </FadeText>
          );
        })}
      </div>

      <FadeText delay={140} style={{ marginTop: 40 }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 12,
            padding: "16px 32px",
            border: `1px solid ${C.accent}40`,
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 24,
              color: C.textSecondary,
            }}
          >
            El agente <span style={{ color: C.accent, fontWeight: 600 }}>decide solo</span> cuando
            llamar a la API
          </p>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseApisGratis: React.FC = () => {
  const apis = [
    {
      url: "chucknorris.io/jokes",
      desc: "Chistes de Chuck Norris",
      color: C.orange,
    },
    {
      url: "catfact.ninja",
      desc: "Datos curiosos de gatos",
      color: C.teal,
    },
    {
      url: "quotable.io",
      desc: "Frases inspiradoras",
      color: C.purple,
    },
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
          APIs gratuitas para practicar
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 30 }}>
        {apis.map((api, i) => (
          <FadeText key={i} delay={20 + i * 25}>
            <div
              style={{
                width: 280,
                padding: "30px 24px",
                background: C.surface,
                borderRadius: 16,
                border: `1px solid ${api.color}40`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  background: `${api.color}20`,
                  border: `2px solid ${api.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 22,
                    color: api.color,
                    fontWeight: 700,
                  }}
                >
                  {String(i + 1)}
                </span>
              </div>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 18,
                  color: api.color,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {api.url}
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 18,
                  color: C.textSecondary,
                  textAlign: "center",
                }}
              >
                {api.desc}
              </p>
            </div>
          </FadeText>
        ))}
      </div>

      <FadeText delay={95} style={{ marginTop: 40 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 24,
            color: C.textDim,
            textAlign: "center",
          }}
        >
          No necesitan API Key - ideales para empezar
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseEnN8n: React.FC = () => {
  const steps = [
    {
      num: "1",
      text: 'Buscar "HTTP Request Tool"',
      sub: "No el normal!",
      color: C.accent,
    },
    {
      num: "2",
      text: "Conectar al puerto Tool",
      sub: "Del nodo AI Agent",
      color: C.green,
    },
    {
      num: "3",
      text: "Configurar la URL",
      sub: "Pegar la URL de la API",
      color: C.yellow,
    },
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
          En n8n: 3 pasos
        </p>
      </FadeText>

      {steps.map((step, i) => (
        <FadeText key={i} delay={20 + i * 30}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 36,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: step.color,
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
              {step.num}
            </div>
            <div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 32,
                  color: C.text,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {step.text}
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 20,
                  color: step.color,
                  margin: 0,
                  marginTop: 4,
                }}
              >
                {step.sub}
              </p>
            </div>
          </div>
        </FadeText>
      ))}

      <FadeText delay={110} style={{ marginTop: 20 }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 12,
            padding: "16px 28px",
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
            El agente decidira cuando usar la herramienta
          </p>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseWarning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const warningSpring = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.background,
        padding: 80,
      }}
    >
      {/* Warning triangle icon */}
      <div
        style={{
          transform: `scale(${warningSpring})`,
          opacity: warningSpring,
          marginBottom: 24,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path
            d="M40 10 L72 65 L8 65 Z"
            stroke={C.yellow}
            strokeWidth="4"
            fill={`${C.yellow}15`}
            strokeLinejoin="round"
          />
          <text
            x="40"
            y="52"
            textAnchor="middle"
            fill={C.yellow}
            fontSize="32"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            !
          </text>
        </svg>
      </div>

      <FadeText delay={10} style={{ marginBottom: 40 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 40,
            fontWeight: 700,
            color: C.yellow,
            textAlign: "center",
          }}
        >
          Hay 2 nodos HTTP Request
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
        {/* Card 1: HTTP Request (accion) */}
        <FadeText delay={30}>
          <div
            style={{
              width: 320,
              padding: "28px 24px",
              background: C.surface,
              borderRadius: 16,
              border: `3px solid ${C.yellow}`,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: 24,
                fontWeight: 700,
                color: C.yellow,
                marginBottom: 12,
              }}
            >
              HTTP Request
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 18,
                color: C.textSecondary,
                marginBottom: 8,
              }}
            >
              (accion)
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 16,
                color: C.textDim,
              }}
            >
              Se ejecuta siempre en el flujo
            </p>
          </div>
        </FadeText>

        {/* Card 2: HTTP Request Tool (agente decide) */}
        <FadeText delay={50}>
          <div
            style={{
              width: 320,
              padding: "28px 24px",
              background: C.surface,
              borderRadius: 16,
              border: `3px solid ${C.green}`,
              boxShadow: `0 0 24px ${C.green}30`,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: 24,
                fontWeight: 700,
                color: C.green,
                marginBottom: 12,
              }}
            >
              HTTP Request Tool
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 18,
                color: C.textSecondary,
                marginBottom: 8,
              }}
            >
              (agente decide)
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 16,
                color: C.textDim,
              }}
            >
              El agente elige cuando usarlo
            </p>
          </div>
        </FadeText>
      </div>

      <FadeText delay={75}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: C.surface,
            borderRadius: 12,
            padding: "14px 28px",
            border: `2px solid ${C.green}`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke={C.green}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 26,
              color: C.green,
              fontWeight: 700,
            }}
          >
            Usa el que dice Tool
          </p>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // API call flash
  const apiCallFlash = interpolate(frame, [50, 60, 70, 80], [0, 1, 1, 0], {
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
      <FadeText delay={0} style={{ marginBottom: 30 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 600,
            color: C.text,
          }}
        >
          Demo en vivo
        </p>
      </FadeText>

      <div
        style={{
          width: 600,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* User message */}
        <Sequence from={10} durationInFrames={170}>
          <ChatBubble text="Dime un chiste" isUser delay={0} />
        </Sequence>

        {/* API call indicator */}
        {apiCallFlash > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              opacity: apiCallFlash,
            }}
          >
            <div
              style={{
                background: `${C.accent}20`,
                borderRadius: 8,
                padding: "8px 20px",
                border: `1px solid ${C.accent}60`,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.accent,
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  color: C.accent,
                }}
              >
                Llamando a chucknorris.io/jokes...
              </span>
            </div>
          </div>
        )}

        {/* Bot response */}
        <Sequence from={85} durationInFrames={95}>
          <ChatBubble
            text='Chuck Norris puede dividir entre cero... y obtener un numero real.'
            isUser={false}
            delay={0}
          />
        </Sequence>
      </div>

      <FadeText delay={120} style={{ marginTop: 30 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 22,
            color: C.textDim,
            textAlign: "center",
          }}
        >
          El agente llamo a la API, recibio el JSON, y respondio bonito
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2HTTPRequest: React.FC = () => {
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
        from={S.CONCEPTO.start}
        durationInFrames={S.CONCEPTO.end - S.CONCEPTO.start}
        premountFor={30}
      >
        <PhaseConcepto />
      </Sequence>

      <Sequence
        from={S.REQ_RES.start}
        durationInFrames={S.REQ_RES.end - S.REQ_RES.start}
        premountFor={30}
      >
        <PhaseReqRes />
      </Sequence>

      <Sequence
        from={S.APIS_GRATIS.start}
        durationInFrames={S.APIS_GRATIS.end - S.APIS_GRATIS.start}
        premountFor={30}
      >
        <PhaseApisGratis />
      </Sequence>

      <Sequence
        from={S.EN_N8N.start}
        durationInFrames={S.EN_N8N.end - S.EN_N8N.start}
        premountFor={30}
      >
        <PhaseEnN8n />
      </Sequence>

      <Sequence
        from={S.WARNING.start}
        durationInFrames={S.WARNING.end - S.WARNING.start}
        premountFor={30}
      >
        <PhaseWarning />
      </Sequence>

      <Sequence
        from={S.DEMO.start}
        durationInFrames={S.DEMO.end - S.DEMO.start}
        premountFor={30}
      >
        <PhaseDemo />
      </Sequence>
    </AbsoluteFill>
  );
};
