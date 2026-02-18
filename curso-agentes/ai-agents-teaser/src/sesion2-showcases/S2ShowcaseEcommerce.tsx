import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import {
  SESSION2_VIDEO,
  S2_SHOWCASE_ECOMMERCE,
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

export const S2ShowcaseEcommerce: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // System prompt config
  const systemPrompt: SystemPromptConfig = {
    title: "System Prompt: Especialista en Productos",
    content: `Eres ECommerceBot, especialista en productos de nuestra tienda online.

Idioma: español
Tono: empático, paciente y resolutivo

Funciones:
- Consultar estado de pedido
- Informar sobre productos y características
- Procesar solicitudes de devolución
- Recomendar productos basados en necesidades
- Calcular precios con descuentos

Reglas:
- Siempre pide número de pedido antes de dar información de estado
- Para devoluciones, primero verifica política de devolución (30 días)
- Aplica descuento del 15% para nuevos clientes
- Si el usuario pregunta por un producto que no existe, sugiere alternativas
- Nunca prometas fechas de entrega, solo "2-3 días hábiles"`,
  };

  // Tool visualization config
  const calculatorTool: ToolVisualizationConfig = {
    tool: "Calculator Tool (Descuentos)",
    operation: "Calcular descuento: Precio × (1 - 15%)",
    result: "$999 - 15% = $849.15",
  };

  const httpTool: ToolVisualizationConfig = {
    tool: "HTTP Request Tool (Stock)",
    operation: "GET /api/products/iphone15",
    result: `{
  "product": "iPhone 15",
  "stock": 15,
  "price": 999,
  "available": true
}`,
  };

  // Chat messages
  const chatMessages = [
    { role: "user" as const, text: "¿Tienen el iPhone 15?" },
    { role: "bot" as const, text: "Sí, el iPhone 15 está disponible. Precio: $999. ¿Te interesa?" },
    { role: "user" as const, text: "Sí, pero hay descuento?" },
    { role: "bot" as const, text: "Calculando... Aplicamos 15% de descuento para clientes nuevos. Precio final: $849.15. ¿Confirmas?" },
    { role: "user" as const, text: "Sí, confirmo" },
    { role: "bot" as const, text: "Excelente. Pedido #12345 confirmado. iPhone 15, 1 unidad, $849.15. Envío en 2-3 días." },
  ];

  // Timeline segments
  const { INTRO, SYSTEM_PROMPT, MEMORY_CALC, HTTP_REQUEST, DEMO, CTA, FADE } = S2_SHOWCASE_ECOMMERCE;

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
          🛒️ Bot de E-commerce
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
          Soporte al cliente inteligente
        </text>
        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1920}
            cy={Math.random() * 1080}
            r={Math.random() * 4 + 2}
            fill={SHOWCASE_COLORS.ecommerce.primary}
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
          fill={SHOWCASE_COLORS.ecommerce.primary}
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
          Memoria + Calculator Tool (Descuentos)
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
            fill={SHOWCASE_COLORS.ecommerce.secondary}
            fontSize={24}
            fontWeight={600}
            fontFamily={TYPOGRAPHY.fontFamily}
            textAnchor="middle"
          >
            Simple Memory (Window Size: 10)
          </text>
          {/* Memory slots */}
          {[...Array(10)].map((_, i) => (
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
            fill={SHOWCASE_COLORS.ecommerce.primary}
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
            fill={SHOWCASE_COLORS.ecommerce.primary}
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
          HTTP Request Tool (API Stock)
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
          JSON simulado con datos de productos
        </text>
      </g>

      {/* DEMO */}
      <g opacity={demoOpacity}>
        <ChatTelegramUI
          messages={chatMessages}
          activeMessageIndex={activeMessageIndex}
          colors={SHOWCASE_COLORS.ecommerce}
          title="Bot de E-commerce"
          subtitle="Soporte al cliente inteligente"
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
          fill={SHOWCASE_COLORS.ecommerce.primary}
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
          Crea tu Bot de E-commerce
        </text>
      </g>
    </g>
  );
};

export default S2ShowcaseEcommerce;
