import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_APIS_GRATUITAS, TYPOGRAPHY } from "../utils/constants";

const S = S2_APIS_GRATUITAS;
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
        <span style={{ color: C.accent }}>APIs</span> Gratuitas
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
        Conecta tu bot al mundo
      </p>
    </AbsoluteFill>
  );
};

const PhaseRecapAPI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const box1 = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const arrow1 = spring({ frame, fps, delay: 20, config: { damping: 200 } });
  const box2 = spring({ frame, fps, delay: 30, config: { damping: 12 } });
  const arrow2 = spring({ frame, fps, delay: 45, config: { damping: 200 } });
  const box3 = spring({ frame, fps, delay: 55, config: { damping: 12 } });

  const boxes: { label: string; color: string; icon: string; springVal: number }[] = [
    { label: "Tu Bot", color: C.accent, icon: "🤖", springVal: box1 },
    { label: "API", color: C.orange, icon: "🔗", springVal: box2 },
    { label: "Servicio", color: C.green, icon: "🌐", springVal: box3 },
  ];

  const arrows = [arrow1, arrow2];

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
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 600, color: C.textSecondary }}>
          Recordemos...
        </p>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {boxes.map((box, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                opacity: box.springVal,
                transform: `scale(${box.springVal})`,
                width: 200,
                height: 140,
                background: C.surface,
                border: `3px solid ${box.color}`,
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 40 }}>{box.icon}</span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 24,
                  fontWeight: 700,
                  color: box.color,
                }}
              >
                {box.label}
              </span>
            </div>
            {i < boxes.length - 1 && (
              <div style={{ opacity: arrows[i] }}>
                <svg width="60" height="30" viewBox="0 0 60 30">
                  <path
                    d="M0,15 L24,15 M18,8 L26,15 L18,22"
                    fill="none"
                    stroke={C.textDim}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M60,15 L36,15 M42,8 L34,15 L42,22"
                    fill="none"
                    stroke={C.textDim}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <FadeText delay={70} style={{ marginTop: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary, textAlign: "center" }}>
          Tu bot hace una peticion → la API responde con datos
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseAPI1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const jsonSpring = spring({ frame, fps, delay: 40, config: { damping: 200 } });

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
          opacity: cardSpring,
          transform: `scale(${cardSpring})`,
          width: 850,
          background: C.surface,
          borderRadius: 24,
          border: `3px solid ${C.orange}`,
          padding: "40px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orange accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: C.orange,
          }}
        />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
          <span style={{ fontSize: 48 }}>😂</span>
          <div>
            <p style={{ fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.text }}>
              Chuck Norris Jokes
            </p>
            <p style={{ fontFamily: MONO, fontSize: 18, color: C.orange, marginTop: 6 }}>
              api.chucknorris.io/jokes/random
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: C.surfaceLight, marginBottom: 20 }} />

        {/* Example response */}
        <div
          style={{
            opacity: jsonSpring,
            transform: `translateY(${(1 - jsonSpring) * 15}px)`,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 16, color: C.textDim, marginBottom: 10, fontWeight: 600 }}>
            Ejemplo de respuesta:
          </p>
          <div
            style={{
              background: "#0d0d0d",
              borderRadius: 12,
              padding: "20px 24px",
              border: `1px solid ${C.surfaceLight}`,
            }}
          >
            <p style={{ fontFamily: MONO, fontSize: 16, color: C.textDim, lineHeight: 1.8 }}>
              {"{"}{"\n"}
            </p>
            <p style={{ fontFamily: MONO, fontSize: 16, color: C.textSecondary, lineHeight: 1.8, paddingLeft: 24 }}>
              <span style={{ color: C.orange }}>"value"</span>
              <span style={{ color: C.textDim }}>: </span>
              <span style={{ color: C.green }}>"Chuck Norris can divide by zero."</span>
            </p>
            <p style={{ fontFamily: MONO, fontSize: 16, color: C.textDim, lineHeight: 1.8 }}>
              {"}"}
            </p>
          </div>
        </div>

        {/* Tag */}
        <FadeText delay={60} style={{ marginTop: 20 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${C.orange}20`,
              border: `1px solid ${C.orange}60`,
              borderRadius: 8,
              padding: "6px 14px",
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 14, color: C.orange, fontWeight: 600 }}>
              Sin API key necesaria
            </span>
          </div>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

const PhaseAPI2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const tempSpring = spring({ frame, fps, delay: 40, config: { damping: 200 } });

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
          opacity: cardSpring,
          transform: `scale(${cardSpring})`,
          width: 850,
          background: C.surface,
          borderRadius: 24,
          border: `3px solid ${C.accent}`,
          padding: "40px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blue accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: C.accent,
          }}
        />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
          <span style={{ fontSize: 48 }}>🌤️</span>
          <div>
            <p style={{ fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.text }}>
              Open-Meteo (Clima)
            </p>
            <p style={{ fontFamily: MONO, fontSize: 16, color: C.accent, marginTop: 6 }}>
              open-meteo.com/v1/forecast?latitude=...
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: C.surfaceLight, marginBottom: 20 }} />

        {/* Temperature display */}
        <div
          style={{
            opacity: tempSpring,
            transform: `translateY(${(1 - tempSpring) * 15}px)`,
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 72, fontWeight: 700, color: C.accent }}>
              22°C
            </p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: C.textSecondary, marginTop: 4 }}>
              Madrid, hoy
            </p>
          </div>

          <span style={{ fontSize: 80 }}>☀️</span>

          <div
            style={{
              background: "#0d0d0d",
              borderRadius: 12,
              padding: "16px 20px",
              border: `1px solid ${C.surfaceLight}`,
              flex: 1,
            }}
          >
            <p style={{ fontFamily: MONO, fontSize: 14, color: C.textDim, lineHeight: 1.8 }}>
              {"{"}{"\n"}
            </p>
            <p style={{ fontFamily: MONO, fontSize: 14, color: C.textSecondary, lineHeight: 1.8, paddingLeft: 20 }}>
              <span style={{ color: C.accent }}>"temperature"</span>
              <span style={{ color: C.textDim }}>: </span>
              <span style={{ color: C.yellow }}>22.1</span>
              <span style={{ color: C.textDim }}>,</span>
            </p>
            <p style={{ fontFamily: MONO, fontSize: 14, color: C.textSecondary, lineHeight: 1.8, paddingLeft: 20 }}>
              <span style={{ color: C.accent }}>"windspeed"</span>
              <span style={{ color: C.textDim }}>: </span>
              <span style={{ color: C.yellow }}>12.5</span>
            </p>
            <p style={{ fontFamily: MONO, fontSize: 14, color: C.textDim, lineHeight: 1.8 }}>
              {"}"}
            </p>
          </div>
        </div>

        {/* Tag */}
        <FadeText delay={60} style={{ marginTop: 20 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${C.green}20`,
              border: `1px solid ${C.green}60`,
              borderRadius: 8,
              padding: "6px 14px",
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 14, color: C.green, fontWeight: 600 }}>
              Gratis y sin API key
            </span>
          </div>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

const PhaseAPI3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1Spring = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const card2Spring = spring({ frame, fps, delay: 30, config: { damping: 12 } });

  const miniCards: {
    name: string;
    url: string;
    emoji: string;
    example: string;
    springVal: number;
  }[] = [
    {
      name: "Cat Facts",
      url: "catfact.ninja/fact",
      emoji: "🐱",
      example: '"Cats sleep 16-20 hours a day."',
      springVal: card1Spring,
    },
    {
      name: "Frases celebres",
      url: "api.quotable.io/random",
      emoji: "📜",
      example: '"The only way to do great work is to love what you do."',
      springVal: card2Spring,
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
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.text }}>
          APIs para datos <span style={{ color: C.green }}>curiosos</span>
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 32 }}>
        {miniCards.map((card, i) => (
          <div
            key={i}
            style={{
              opacity: card.springVal,
              transform: `scale(${card.springVal})`,
              width: 400,
              background: C.surface,
              borderRadius: 24,
              border: `3px solid ${C.green}`,
              padding: "36px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Green accent bar at top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: C.green,
              }}
            />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 40 }}>{card.emoji}</span>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: C.text }}>
                  {card.name}
                </p>
                <p style={{ fontFamily: MONO, fontSize: 14, color: C.green, marginTop: 4 }}>
                  {card.url}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: C.surfaceLight, marginBottom: 16 }} />

            {/* Example */}
            <div
              style={{
                background: "#0d0d0d",
                borderRadius: 10,
                padding: "14px 18px",
                border: `1px solid ${C.surfaceLight}`,
              }}
            >
              <p style={{ fontFamily: MONO, fontSize: 14, color: C.green, lineHeight: 1.6 }}>
                {card.example}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PhaseAPI4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const headlinesSpring = spring({ frame, fps, delay: 35, config: { damping: 200 } });

  const headlines = [
    { text: "IA generativa alcanza nuevos records en 2025", delay: 40 },
    { text: "SpaceX anuncia nueva mision a Marte", delay: 55 },
    { text: "Avances en energia solar sorprenden al mundo", delay: 70 },
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
      <div
        style={{
          opacity: cardSpring,
          transform: `scale(${cardSpring})`,
          width: 850,
          background: C.surface,
          borderRadius: 24,
          border: `3px solid ${C.purple}`,
          padding: "40px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: C.purple,
          }}
        />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
          <span style={{ fontSize: 48 }}>📰</span>
          <div>
            <p style={{ fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.text }}>
              Noticias
            </p>
            <p style={{ fontFamily: MONO, fontSize: 16, color: C.purple, marginTop: 6 }}>
              newsapi.org/v2/top-headlines?country=es
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: C.surfaceLight, marginBottom: 20 }} />

        {/* Example headlines */}
        <div
          style={{
            opacity: headlinesSpring,
            transform: `translateY(${(1 - headlinesSpring) * 15}px)`,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 16, color: C.textDim, marginBottom: 16, fontWeight: 600 }}>
            Titulares de ejemplo:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {headlines.map((h, i) => (
              <FadeText key={i} delay={h.delay}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: `${C.purple}10`,
                    border: `1px solid ${C.purple}30`,
                    borderRadius: 12,
                    padding: "14px 20px",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: C.purple,
                      flexShrink: 0,
                    }}
                  />
                  <p style={{ fontFamily: FONT, fontSize: 20, color: C.text }}>
                    {h.text}
                  </p>
                </div>
              </FadeText>
            ))}
          </div>
        </div>

        {/* Tag */}
        <FadeText delay={85} style={{ marginTop: 20 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${C.purple}20`,
              border: `1px solid ${C.purple}60`,
              borderRadius: 8,
              padding: "6px 14px",
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 14, color: C.purple, fontWeight: 600 }}>
              Plan gratuito disponible
            </span>
          </div>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

const PhaseComoUsar: React.FC = () => {
  const steps: { icon: string; label: string; color: string }[] = [
    { icon: "🔧", label: "HTTP Request\nTool", color: C.yellow },
    { icon: "🔗", label: "URL de\nla API", color: C.accent },
    { icon: "📦", label: "Response\nJSON", color: C.orange },
    { icon: "🤖", label: "Agente\nformatea", color: C.green },
    { icon: "💬", label: "Usuario ve\ntexto bonito", color: C.purple },
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
          Como usar una API en tu bot
        </p>
      </FadeText>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <FadeText delay={15 + i * 20}>
              <div
                style={{
                  width: 160,
                  height: 160,
                  background: C.surface,
                  border: `2px solid ${step.color}`,
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: 12,
                }}
              >
                <span style={{ fontSize: 36 }}>{step.icon}</span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 16,
                    fontWeight: 600,
                    color: step.color,
                    textAlign: "center",
                    whiteSpace: "pre-line",
                    lineHeight: 1.3,
                  }}
                >
                  {step.label}
                </span>
              </div>
            </FadeText>

            {i < steps.length - 1 && (
              <FadeText delay={25 + i * 20}>
                <svg width="36" height="20" viewBox="0 0 36 20">
                  <path
                    d="M0,10 L26,10 M20,4 L28,10 L20,16"
                    fill="none"
                    stroke={C.textDim}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </FadeText>
            )}
          </React.Fragment>
        ))}
      </div>

      <FadeText delay={120} style={{ marginTop: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textSecondary, textAlign: "center" }}>
          El agente transforma JSON crudo en una respuesta <span style={{ color: C.green, fontWeight: 600 }}>natural</span>
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseExplora: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numberSpring = spring({ frame, fps, delay: 5, config: { damping: 12 } });
  const textSpring = spring({ frame, fps, delay: 25, config: { damping: 200 } });
  const ctaSpring = spring({ frame, fps, delay: 50, config: { damping: 200 } });

  const pulse = interpolate(
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
          opacity: numberSpring,
          transform: `scale(${numberSpring * pulse})`,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <p style={{ fontFamily: FONT, fontSize: 100, fontWeight: 800, color: C.accent }}>
          1,400+
        </p>
      </div>

      <div
        style={{
          opacity: textSpring,
          transform: `translateY(${(1 - textSpring) * 20}px)`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <p style={{ fontFamily: FONT, fontSize: 36, color: C.text, fontWeight: 600 }}>
          APIs gratuitas en{" "}
          <span style={{ color: C.accent, fontWeight: 700 }}>public-apis.io</span>
        </p>
      </div>

      <div
        style={{
          opacity: ctaSpring,
          transform: `translateY(${(1 - ctaSpring) * 15}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          {["Clima", "Noticias", "Chistes", "Deportes", "Finanzas", "Musica", "Peliculas", "Traduccion"].map(
            (tag, i) => (
              <FadeText key={i} delay={55 + i * 8}>
                <div
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.accent}50`,
                    borderRadius: 10,
                    padding: "8px 20px",
                  }}
                >
                  <span style={{ fontFamily: FONT, fontSize: 18, color: C.textSecondary }}>
                    {tag}
                  </span>
                </div>
              </FadeText>
            ),
          )}
        </div>

        <FadeText delay={100}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: C.textDim, textAlign: "center" }}>
            Explora, prueba y conecta a tu bot
          </p>
        </FadeText>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2APIsGratuitas: React.FC = () => {
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

      <Sequence from={S.RECAP_API.start} durationInFrames={S.RECAP_API.end - S.RECAP_API.start} premountFor={30}>
        <PhaseRecapAPI />
      </Sequence>

      <Sequence from={S.API_1.start} durationInFrames={S.API_1.end - S.API_1.start} premountFor={30}>
        <PhaseAPI1 />
      </Sequence>

      <Sequence from={S.API_2.start} durationInFrames={S.API_2.end - S.API_2.start} premountFor={30}>
        <PhaseAPI2 />
      </Sequence>

      <Sequence from={S.API_3.start} durationInFrames={S.API_3.end - S.API_3.start} premountFor={30}>
        <PhaseAPI3 />
      </Sequence>

      <Sequence from={S.API_4.start} durationInFrames={S.API_4.end - S.API_4.start} premountFor={30}>
        <PhaseAPI4 />
      </Sequence>

      <Sequence from={S.COMO_USAR.start} durationInFrames={S.COMO_USAR.end - S.COMO_USAR.start} premountFor={30}>
        <PhaseComoUsar />
      </Sequence>

      <Sequence from={S.EXPLORA.start} durationInFrames={S.EXPLORA.end - S.EXPLORA.start} premountFor={30}>
        <PhaseExplora />
      </Sequence>
    </AbsoluteFill>
  );
};
