import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import {
  SESSION2_VIDEO,
  S2_SHOWCASE_ENTRETENIMIENTO,
  SHOWCASE_COLORS,
  COLORS,
  SPRINGS,
  TYPOGRAPHY,
} from "../utils/constants";
import { ChatTelegramUI } from "../components/shared/ChatTelegramUI";

interface SystemPromptConfig {
  title: string;
  content: string;
}

interface ToolVisualizationConfig {
  tool: string;
  operation: string;
  result: string;
}

export const S2ShowcaseEntretenimiento: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // System prompt config
  const systemPrompt: SystemPromptConfig = {
    title: "System Prompt: Entretenedor",
    content: `Eres FunBot, bot de entretenimiento y curiosidades.

Idioma: español
Tono: divertido, casual, entusiasta y amigable

Funciones:
- Compartir datos curiosos y fun facts de todo tipo
- Contar chistes, acertijos y adivinanzas
- Proponer mini-juegos y preguntas de trivia
- Mostrar emojis y mantener tono festivo
- Adaptar contenido según preferencias del usuario si las expresa
- Cambiar de tema para mantener conversación fresca

Reglas:
- Siempre usa emojis 🎉😂🤣😆 para expresar emociones
- Cambia de tema cada 3-4 mensajes para no ser monótono
- Sé positivo y alegre: contagia buen humor
- Si algo es inapropiado, responde: "Eso no puedo, ¡pero hablemos de otra cosa!"
- Nunca seas ofensivo ni agresivo
- Mantén conversaciones ligeras y divertidas
- Usa datos curiosos reales (no inventes)`,
  };

  // Tool visualization config
  const calculatorTool: ToolVisualizationConfig = {
    tool: "Calculator Tool (Streak)",
    operation: "Suma: Días consecutivos",
    result: "7 días consecutivos = 🔥 En racha!",
  };

  const httpTool: ToolVisualizationConfig = {
    tool: "HTTP Request Tool (Cat Facts API)",
    operation: "GET https://catfact.ninja/fact",
    result: `{
  "fact": "Un grupo de gatos se llama clowder."
}`,
  };

  // Chat messages
  const chatMessages = [
    { role: "user" as const, text: "Dame un dato curioso" },
    { role: "bot" as const, text: "Claro que sí... 🤔... ¡Lo tengo! 💡\n\nUn grupo de gatos se llama clowder." },
    { role: "user" as const, text: "😂 Increíble. ¿Otro?" },
    { role: "bot" as const, text: "Por supuesto! 🎲️\n\nDato curioso: ¿Sabías que los gatos pasan el 70% de su vida durmiendo?" },
    { role: "user" as const, text: "No, no lo sabía" },
    { role: "bot" as const, text: "¡Pues sí! Un dato gatuno 🐱\n\n¿Te cuento un chiste?" },
  ];

  // Timeline segments
  const { INTRO, SYSTEM_PROMPT, MEMORY_CALC, HTTP_REQUEST, DEMO, CTA, FADE } = S2_SHOWCASE_ENTRETENIMIENTO;

  // Animations
  const introOpacity = interpolate(
    frame,
    [INTRO.start, INTRO.start + 30, INTRO.end - 30, INTRO.end],
    [0, 1, 1, 0]
  );

  const systemPromptOpacity = interpolate(
    frame,
    [SYSTEM_PROMPT.start, SYSTEM_PROMPT.start + 30, SYSTEM_PROMPT.end - 30, SYSTEM_PROMPT.end],
    [0, 1, 1, 0]
  );

  const memoryCalcOpacity = interpolate(
    frame,
    [MEMORY_CALC.start, MEMORY_CALC.start + 30, MEMORY_CALC.end - 30, MEMORY_CALC.end],
    [0, 1, 1, 0]
  );

  const httpRequestOpacity = interpolate(
    frame,
    [HTTP_REQUEST.start, HTTP_REQUEST.start + 30, HTTP_REQUEST.end - 30, HTTP_REQUEST.end],
    [0, 1, 1, 0]
  );

  const demoOpacity = interpolate(
    frame,
    [DEMO.start, DEMO.start + 30, DEMO.end - 30, DEMO.end],
    [0, 1, 1, 0]
  );

  const ctaOpacity = interpolate(
    frame,
    [CTA.start, CTA.start + 30, CTA.end - 30, CTA.end],
    [0, 1, 1, 0]
  );

  const fadeOpacity = interpolate(
    frame,
    [FADE.start, FADE.end],
    [1, 0]
  );

  // Active message index for demo
  const activeMessageIndex = Math.floor(
    interpolate(
      frame,
      [DEMO.start, DEMO.end - 60],
      [0, chatMessages.length]
    )
  );

  return (
    <g opacity={fadeOpacity}>
      {/* Background */}
      <rect
        x={0}
        y={0}
        width={SESSION2_VIDEO.width}
        height={SESSION2_VIDEO.height}
        fill={COLORS.background}
      />

      {/* INTRO: Title and Emoji */}
      <g opacity={introOpacity}>
        <text
          x={960}
          y={540}
          fill={COLORS.text}
          fontSize={96}
          fontWeight={700}
          fontFamily={TYPOGRAPHY.fontFamily}
          textAnchor="middle"
          opacity={spring({
            frame,
            fps,
            config: SPRINGS.organic,
          })}
        >
          🎲️ Bot de Entretenimiento
        </text>
        <text
          x={960}
          y={630}
          fill={COLORS.textSecondary}
          fontSize={48}
          fontWeight={500}
          fontFamily={TYPOGRAPHY.fontFamily}
          textAnchor="middle"
          opacity={spring({
            frame: frame - 15,
            fps,
            config: SPRINGS.organic,
          })}
        >
          Datos curiosos y diversión
        </text>
        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1920}
            cy={Math.random() * 1080}
            r={Math.random() * 4 + 2}
            fill={SHOWCASE_COLORS.entretenimiento.primary}
            opacity={Math.random() * 0.3 + 0.1}
          />
        ))}
      </g>

      {/* SYSTEM PROMPT */}
      <g opacity={systemPromptOpacity} transform="translate(100, 100)">
        <rect
          x={0}
          y={0}
          width={1720}
          height={880}
          rx={20}
          fill={COLORS.surface}
          opacity={0.9}
        />
        <text
          x={860}
          y={80}
          fill={SHOWCASE_COLORS.entretenimiento.primary}
          fontSize={48}
          fontWeight={700}
          fontFamily={TYPOGRAPHY.fontFamily}
          textAnchor="middle"
        >
          {systemPrompt.title}
        </text>
        <foreignObject x={100} y={150} width={1520} height={680}>
          <div
            style={{
              color: COLORS.text,
              fontFamily: TYPOGRAPHY.monoFontFamily,
              fontSize: 20,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {systemPrompt.content}
          </div>
        </foreignObject>
      </g>

      {/* MEMORY + CALCULATOR */}
      <g opacity={memoryCalcOpacity}>
        <text
          x={960}
          y={150}
          fill={COLORS.text}
          fontSize={42}
          fontWeight={600}
          fontFamily={TYPOGRAPHY.fontFamily}
          textAnchor="middle"
        >
          Memoria + Calculator Tool (Streak)
        </text>

        {/* Simple Memory visualization */}
        <g transform="translate(200, 250)">
          <rect
            x={0}
            y={0}
            width={600}
            height={400}
            rx={12}
            fill={COLORS.surfaceLight}
            opacity={0.8}
          />
          <text
            x={300}
            y={50}
            fill={SHOWCASE_COLORS.entretenimiento.secondary}
            fontSize={24}
            fontWeight={600}
            fontFamily={TYPOGRAPHY.fontFamily}
            textAnchor="middle"
          >
            Simple Memory (Window Size: 8)
          </text>
          {/* Memory slots */}
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x={30}
              y={80 + i * 30}
              width={540}
              height={20}
              rx={4}
              fill={COLORS.surface}
              opacity={0.5}
            />
          ))}
        </g>

        {/* Calculator visualization */}
        <g transform="translate(1120, 250)">
          <rect
            x={0}
            y={0}
            width={600}
            height={400}
            rx={12}
            fill={COLORS.surfaceLight}
            opacity={0.8}
          />
          <text
            x={300}
            y={50}
            fill={SHOWCASE_COLORS.entretenimiento.primary}
            fontSize={24}
            fontWeight={600}
            fontFamily={TYPOGRAPHY.fontFamily}
            textAnchor="middle"
          >
            Calculator Tool
          </text>
          <text
            x={300}
            y={150}
            fill={COLORS.text}
            fontSize={32}
            fontWeight={500}
            fontFamily={TYPOGRAPHY.monoFontFamily}
            textAnchor="middle"
          >
            {calculatorTool.operation}
          </text>
          <text
            x={300}
            y={250}
            fill={SHOWCASE_COLORS.entretenimiento.primary}
            fontSize={36}
            fontWeight={700}
            fontFamily={TYPOGRAPHY.monoFontFamily}
            textAnchor="middle"
          >
            {calculatorTool.result}
          </text>
        </g>
      </g>

      {/* HTTP REQUEST */}
      <g opacity={httpRequestOpacity}>
        <text
          x={960}
          y={150}
          fill={COLORS.text}
          fontSize={42}
          fontWeight={600}
          fontFamily={TYPOGRAPHY.fontFamily}
          textAnchor="middle"
        >
          HTTP Request Tool (Cat Facts API)
        </text>

        <g transform="translate(300, 250)">
          <rect
            x={0}
            y={0}
            width={1320}
            height={500}
            rx={12}
            fill={COLORS.editorBg}
            opacity={0.9}
          />
          <text
            x={660}
            y={50}
            fill={COLORS.text}
            fontSize={24}
            fontWeight={600}
            fontFamily={TYPOGRAPHY.fontFamily}
            textAnchor="middle"
          >
            {httpTool.tool}
          </text>
          <text
            x={660}
            y={120}
            fill={COLORS.syntaxKeyword}
            fontSize={20}
            fontWeight={500}
            fontFamily={TYPOGRAPHY.monoFontFamily}
            textAnchor="middle"
          >
            {httpTool.operation}
          </text>
          <foreignObject x={60} y={160} width={1200} height={300}>
            <pre
              style={{
                color: COLORS.syntaxString,
                fontFamily: TYPOGRAPHY.monoFontFamily,
                fontSize: 18,
                lineHeight: 1.5,
              }}
            >
              {httpTool.result}
            </pre>
          </foreignObject>
        </g>

        <text
          x={960}
          y={820}
          fill={COLORS.textSecondary}
          fontSize={28}
          fontWeight={500}
          fontFamily={TYPOGRAPHY.fontFamily}
          textAnchor="middle"
        >
          API GRATUITA sin autenticación
        </text>
      </g>

      {/* DEMO */}
      <g opacity={demoOpacity}>
        <ChatTelegramUI
          messages={chatMessages}
          activeMessageIndex={activeMessageIndex}
          colors={SHOWCASE_COLORS.entretenimiento}
          title="Bot de Entretenimiento"
          subtitle="Tu diversión diaria"
        />
      </g>

      {/* CTA */}
      <g opacity={ctaOpacity}>
        <rect
          x={660}
          y={450}
          width={600}
          height={180}
          rx={12}
          fill={SHOWCASE_COLORS.entretenimiento.primary}
          opacity={spring({
            frame,
            fps,
            config: SPRINGS.organic,
          })}
        />
        <text
          x={960}
          y={550}
          fill={COLORS.white}
          fontSize={36}
          fontWeight={700}
          fontFamily={TYPOGRAPHY.fontFamily}
          textAnchor="middle"
        >
          Crea tu Bot de Entretenimiento
        </text>
      </g>
    </g>
  );
};

export default S2ShowcaseEntretenimiento;
