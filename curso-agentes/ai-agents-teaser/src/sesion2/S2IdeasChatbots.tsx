import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { RECAP_COLORS, S2_IDEAS_CHATBOTS, TYPOGRAPHY } from "../utils/constants";
import { IdeaCard } from "./components/IdeaCard";

const S = S2_IDEAS_CHATBOTS;
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
          fontSize: 80,
          fontWeight: 700,
          color: C.text,
          transform: `scale(${s})`,
          opacity: s,
          textAlign: "center",
          margin: 0,
        }}
      >
        Ideas para tu{" "}
        <span style={{ color: C.accent }}>Chatbot</span>
      </h1>
    </AbsoluteFill>
  );
};

const PhaseIdea1: React.FC = () => {
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
            fontSize: 20,
            color: C.textDim,
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Idea 1
        </p>
      </FadeText>

      <FadeText delay={10}>
        <IdeaCard
          emoji="\u{1F373}"
          title="Chef Personal"
          systemPrompt="Experto en cocina internacional"
          tools="HTTP Request (recetas API)"
          example="\u00BFQu\u00E9 puedo cocinar con pollo y arroz?"
          color={C.orange}
        />
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseIdea2: React.FC = () => {
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
            fontSize: 20,
            color: C.textDim,
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Idea 2
        </p>
      </FadeText>

      <FadeText delay={10}>
        <IdeaCard
          emoji="\u{1F4D0}"
          title="Tutor de Matem\u00E1ticas"
          systemPrompt="Profesor paciente que explica paso a paso"
          tools="Calculator"
          example="Expl\u00EDcame c\u00F3mo resolver 3x + 7 = 22"
          color={C.accent}
        />
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseIdea3: React.FC = () => {
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
            fontSize: 20,
            color: C.textDim,
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Idea 3
        </p>
      </FadeText>

      <FadeText delay={10}>
        <IdeaCard
          emoji="\u{1F4CB}"
          title="Coach de Productividad"
          systemPrompt="Motivador que ayuda con objetivos"
          tools="HTTP Request (frases motivacionales)"
          example="Necesito organizar mi semana"
          color={C.green}
        />
      </FadeText>

      <FadeText delay={30} style={{ marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: `${C.green}15`,
            borderRadius: 10,
            padding: "10px 20px",
            border: `1px solid ${C.green}40`,
          }}
        >
          <span style={{ fontSize: 22 }}>{"\u{1F9E0}"}</span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 18,
              color: C.green,
              fontWeight: 500,
            }}
          >
            Memory: recuerda tus objetivos
          </span>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseIdea4: React.FC = () => {
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
            fontSize: 20,
            color: C.textDim,
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Idea 4
        </p>
      </FadeText>

      <FadeText delay={10}>
        <IdeaCard
          emoji="\u2708\uFE0F"
          title="Asistente de Viajes"
          systemPrompt="Gu\u00EDa tur\u00EDstico experto"
          tools="HTTP Request (clima, datos de ciudades)"
          example="\u00BFQu\u00E9 clima hace en Barcelona?"
          color={C.teal}
        />
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseIdea5: React.FC = () => {
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
            fontSize: 20,
            color: C.textDim,
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Idea 5
        </p>
      </FadeText>

      <FadeText delay={10}>
        <IdeaCard
          emoji="\u{1F4B0}"
          title="Experto Financiero"
          systemPrompt="Asesor financiero prudente"
          tools="Calculator + HTTP Request (tasas de cambio)"
          example="Convierte 500 USD a EUR"
          color={C.yellow}
        />
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseTuTurno: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  // Blinking cursor effect
  const cursorOpacity = interpolate(
    frame % 30,
    [0, 14, 15, 29],
    [1, 1, 0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
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
          opacity: titleSpring,
          transform: `scale(${titleSpring})`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: FONT,
            fontSize: 64,
            fontWeight: 700,
            color: C.text,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {"\u00BF"}Qu{"\u00E9"} bot quieres{" "}
          <span style={{ color: C.accent }}>construir</span>?
        </p>
      </div>

      <FadeText delay={20} style={{ marginTop: 50 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: C.surface,
            borderRadius: 12,
            padding: "20px 32px",
            border: `1px solid ${C.accent}40`,
            minWidth: 500,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 28,
              color: C.textDim,
              fontStyle: "italic",
            }}
          >
            Mi idea es...
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 32,
              color: C.accent,
              opacity: cursorOpacity,
              marginLeft: 4,
            }}
          >
            {"\u258E"}
          </span>
        </div>
      </FadeText>

      <FadeText delay={40} style={{ marginTop: 40 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 22,
            color: C.textSecondary,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.5,
          }}
        >
          Piensa en algo que te sea {"\u00FA"}til a ti o a alguien que conoces
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================

export const S2IdeasChatbots: React.FC = () => {
  const frame = useCurrentFrame();

  // Global fade-out (300 frames)
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
        from={S.IDEA_1.start}
        durationInFrames={S.IDEA_1.end - S.IDEA_1.start}
        premountFor={30}
      >
        <PhaseIdea1 />
      </Sequence>

      <Sequence
        from={S.IDEA_2.start}
        durationInFrames={S.IDEA_2.end - S.IDEA_2.start}
        premountFor={30}
      >
        <PhaseIdea2 />
      </Sequence>

      <Sequence
        from={S.IDEA_3.start}
        durationInFrames={S.IDEA_3.end - S.IDEA_3.start}
        premountFor={30}
      >
        <PhaseIdea3 />
      </Sequence>

      <Sequence
        from={S.IDEA_4.start}
        durationInFrames={S.IDEA_4.end - S.IDEA_4.start}
        premountFor={30}
      >
        <PhaseIdea4 />
      </Sequence>

      <Sequence
        from={S.IDEA_5.start}
        durationInFrames={S.IDEA_5.end - S.IDEA_5.start}
        premountFor={30}
      >
        <PhaseIdea5 />
      </Sequence>

      <Sequence
        from={S.TU_TURNO.start}
        durationInFrames={S.TU_TURNO.end - S.TU_TURNO.start}
        premountFor={30}
      >
        <PhaseTuTurno />
      </Sequence>
    </AbsoluteFill>
  );
};
