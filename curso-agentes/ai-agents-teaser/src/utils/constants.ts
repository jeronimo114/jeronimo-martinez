// Visual System Colors - Expanded Apple-style palette
export const COLORS = {
  // Backgrounds
  background: "#F5F5F7",
  windowFill: "#FFFFFF",

  // Text
  darkText: "#1D1D1F",
  lightText: "#86868B",

  // Legacy aliases
  primary: "#1D1D1F",
  white: "#FFFFFF",
  shadow: "rgba(0, 0, 0, 0.1)",

  // Accent colors
  accent: "#0071E3",
  blue: "#0071E3",
  green: "#30D158",
  red: "#FF453A",
  orange: "#FF9F0A",
  yellow: "#FFD60A",
  purple: "#BF5AF2",
  pink: "#FF2D55",
  teal: "#5AC8FA",

  // System colors
  systemGray: "#8E8E93",
  systemGray2: "#636366",
  systemGray3: "#48484A",
  systemGray4: "#3A3A3C",
  systemGray5: "#2C2C2E",
  systemGray6: "#1C1C1E",

  // Traffic lights
  trafficRed: "#FF5F57",
  trafficYellow: "#FFBD2E",
  trafficGreen: "#28C840",

  // Code editor colors (dark theme)
  editorBg: "#1E1E1E",
  editorSidebar: "#252526",
  editorLineNumber: "#858585",

  // Syntax highlighting
  syntaxKeyword: "#C586C0",    // Purple - keywords
  syntaxFunction: "#DCDCAA",   // Yellow - functions
  syntaxString: "#CE9178",     // Orange - strings
  syntaxComment: "#6A9955",    // Green - comments
  syntaxVariable: "#9CDCFE",   // Light blue - variables
  syntaxType: "#4EC9B0",       // Teal - types
  syntaxNumber: "#B5CEA8",     // Light green - numbers
  syntaxOperator: "#D4D4D4",   // Gray - operators
  syntaxBracket: "#FFD700",    // Gold - brackets
} as const;

// Timeline segments (in frames, 30fps)
export const SEGMENTS = {
  INTENT: { start: 0, end: 90 },           // 0-3s
  MESSAGE_COMPUTE: { start: 90, end: 240 }, // 3-8s
  COMPUTE_AGENT: { start: 240, end: 360 },  // 8-12s
  AGENT_CODE: { start: 360, end: 540 },     // 12-18s
  CODE_APP: { start: 540, end: 720 },       // 18-24s
  APP_SPREADSHEET: { start: 720, end: 900 }, // 24-30s
  SPREADSHEET_PRESENTATION: { start: 900, end: 1140 }, // 30-38s
  RESOLVE: { start: 1140, end: 1260 },      // 38-42s
} as const;

// Typography - SF Pro Display
export const TYPOGRAPHY = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
  monoFontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
  fontVariantNumeric: "tabular-nums" as const,

  // Font weights
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Font sizes
  sizes: {
    windowTitle: 13,
    code: 12,
    body: 14,
    bodyLarge: 16,
    headline: 32,
    title: 48,
  },
} as const;

// Animation presets - Apple-style springs
export const SPRINGS = {
  // Organic settle (icons, windows)
  organic: { stiffness: 120, damping: 20 },

  // Confident snap (UI elements)
  snappy: { stiffness: 200, damping: 25 },

  // Gentle float (background elements)
  gentle: { stiffness: 60, damping: 15 },

  // Mechanical (precision movements)
  mechanical: { stiffness: 300, damping: 30 },

  // Bouncy (playful feedback)
  bouncy: { stiffness: 180, damping: 12 },

  // Stiff (quick, minimal bounce)
  stiff: { stiffness: 400, damping: 40 },
} as const;

// Easing curves - Apple-style beziers
export const EASINGS = {
  // Confident entrance (ease-out)
  entrance: [0.0, 0.0, 0.2, 1.0] as const,

  // Smooth transition (ease-in-out)
  smooth: [0.4, 0.0, 0.2, 1.0] as const,

  // Exit (ease-in)
  exit: [0.4, 0.0, 1.0, 1.0] as const,

  // Apple's default
  apple: [0.25, 0.1, 0.25, 1.0] as const,

  // Aggressive deceleration
  decelerate: [0.0, 0.0, 0.0, 1.0] as const,
} as const;

// Common dimensions
export const DIMENSIONS = {
  // Window chrome
  windowRadius: 12,
  titleBarHeight: 52,
  trafficLightSize: 12,
  trafficLightSpacing: 20,
  trafficLightOffset: 20,

  // Legacy
  cornerRadius: 12,
  strokeWidth: 2,

  // Shadows (pre-defined in CSS-like format)
  shadows: {
    elevated: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
    card: "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
    button: "0 2px 4px rgba(0,0,0,0.06)",
  },
} as const;

// Video settings
export const VIDEO = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 1260, // 42 seconds
} as const;

// ==================== RECAP SECTION (Session 2) ====================

// Recap video settings (60 seconds each)
export const RECAP_VIDEO = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 1800, // 60 seconds
} as const;

// Dark theme colors for recap videos
export const RECAP_COLORS = {
  background: "#000000",
  surface: "#1a1a1a",
  surfaceLight: "#2a2a2a",
  text: "#FFFFFF",
  textSecondary: "#a0a0a0",
  textDim: "#666666",
  accent: "#007AFF",
  accentDim: "rgba(0, 122, 255, 0.3)",
  green: "#30D158",
  red: "#FF453A",
  yellow: "#FFD60A",
  purple: "#BF5AF2",
  orange: "#FF9F0A",
  teal: "#5AC8FA",
  // Token colors
  token1: "#FF6B6B",
  token2: "#4ECDC4",
  token3: "#45B7D1",
  token4: "#96CEB4",
  token5: "#FFEAA7",
  token6: "#DDA0DD",
  token7: "#FF9F0A",
} as const;

// Recap Video 1: ¿Qué es un LLM? (1800 frames)
export const RECAP_LLM = {
  TITULO:       { start: 0,    end: 90 },
  DEFINICION:   { start: 90,   end: 240 },
  NO_ENTIENDE:  { start: 240,  end: 390 },
  TOKENS_INTRO: { start: 390,  end: 570 },
  TOKENS_DETALLE: { start: 570, end: 720 },
  PREDICCION:   { start: 720,  end: 960 },
  CONTEXTO:     { start: 960,  end: 1200 },
  LOST_MIDDLE:  { start: 1200, end: 1440 },
  RESUMEN:      { start: 1440, end: 1650 },
  FADE_LOOP:    { start: 1650, end: 1800 },
} as const;

// Recap Video 2: ¿Qué es un Agente? (1800 frames)
export const RECAP_AGENTE = {
  TITULO:       { start: 0,    end: 90 },
  CONTEXTO_LLM: { start: 90,  end: 270 },
  AGENTE_INTRO: { start: 270, end: 450 },
  HERRAMIENTAS: { start: 450, end: 690 },
  MEMORIA:      { start: 690, end: 870 },
  AUTONOMIA:    { start: 870, end: 1050 },
  COMPARACION:  { start: 1050, end: 1380 },
  EJEMPLO_REAL: { start: 1380, end: 1560 },
  RESUMEN:      { start: 1560, end: 1680 },
  FADE_LOOP:    { start: 1680, end: 1800 },
} as const;

// Recap Video 3: API y MCP (1800 frames)
export const RECAP_API_MCP = {
  TITULO:          { start: 0,    end: 90 },
  API_DEFINICION:  { start: 90,   end: 300 },
  REQUEST_RESPONSE: { start: 300, end: 540 },
  API_KEYS:        { start: 540,  end: 720 },
  APIS_IA:         { start: 720,  end: 870 },
  TRANSICION_MCP:  { start: 870,  end: 960 },
  MCP_INTRO:       { start: 960,  end: 1200 },
  MCP_VISUAL:      { start: 1200, end: 1440 },
  POR_PLATAFORMA:  { start: 1440, end: 1560 },
  RESUMEN:         { start: 1560, end: 1680 },
  FADE_LOOP:       { start: 1680, end: 1800 },
} as const;

// ==================== SESSION 2 PRACTICAL VIDEOS ====================

// Session 2 video settings (same as recap: 60s, 1800 frames)
export const SESSION2_VIDEO = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 1800,
} as const;

// Video 1: ¿Qué es un System Prompt?
export const S2_SYSTEM_PROMPT = {
  TITULO:     { start: 0,    end: 90 },
  ANALOGIA:   { start: 90,   end: 300 },
  TIPOS_MSG:  { start: 300,  end: 510 },
  EJEMPLO:    { start: 510,  end: 780 },
  SIN_VS_CON: { start: 780,  end: 1080 },
  EN_N8N:     { start: 1080, end: 1380 },
  TIPS:       { start: 1380, end: 1560 },
  RESUMEN:    { start: 1560, end: 1680 },
  FADE:       { start: 1680, end: 1800 },
} as const;

// Video 2: ¿Qué es la Memoria?
export const S2_MEMORIA = {
  TITULO:       { start: 0,    end: 90 },
  PROBLEMA:     { start: 90,   end: 360 },
  SOLUCION:     { start: 360,  end: 600 },
  WINDOW_BUF:   { start: 600,  end: 900 },
  SESSION_ID:   { start: 900,  end: 1110 },
  EN_N8N:       { start: 1110, end: 1380 },
  COSTO:        { start: 1380, end: 1560 },
  RESUMEN:      { start: 1560, end: 1680 },
  FADE:         { start: 1680, end: 1800 },
} as const;

// Video 3: ¿Qué son las Herramientas?
export const S2_HERRAMIENTAS = {
  TITULO:      { start: 0,    end: 90 },
  LIMITACION:  { start: 90,   end: 330 },
  CONCEPTO:    { start: 330,  end: 570 },
  DECISION:    { start: 570,  end: 870 },
  PUERTO_TOOL: { start: 870,  end: 1110 },
  CATALOGO:    { start: 1110, end: 1380 },
  RESUMEN:     { start: 1380, end: 1560 },
  FADE:        { start: 1560, end: 1800 },
} as const;

// Video 4: Calculator Tool
export const S2_CALCULATOR = {
  TITULO:     { start: 0,    end: 90 },
  PROBLEMA:   { start: 90,   end: 360 },
  SOLUCION:   { start: 360,  end: 600 },
  COMO_FUNC:  { start: 600,  end: 870 },
  EN_N8N:     { start: 870,  end: 1200 },
  EJEMPLOS:   { start: 1200, end: 1500 },
  RESUMEN:    { start: 1500, end: 1650 },
  FADE:       { start: 1650, end: 1800 },
} as const;

// Video 5: HTTP Request Tool
export const S2_HTTP_REQUEST = {
  TITULO:      { start: 0,    end: 90 },
  CONCEPTO:    { start: 90,   end: 360 },
  REQ_RES:     { start: 360,  end: 630 },
  APIS_GRATIS: { start: 630,  end: 960 },
  EN_N8N:      { start: 960,  end: 1260 },
  WARNING:     { start: 1260, end: 1440 },
  DEMO:        { start: 1440, end: 1620 },
  FADE:        { start: 1620, end: 1800 },
} as const;

// Video 6: ¿Qué es el Nodo IF?
export const S2_IF_NODE = {
  TITULO:     { start: 0,    end: 90 },
  CONCEPTO:   { start: 90,   end: 360 },
  EJEMPLO:    { start: 360,  end: 660 },
  CONFIG:     { start: 660,  end: 960 },
  OPERACIONES:{ start: 960,  end: 1200 },
  FLUJO:      { start: 1200, end: 1500 },
  TIP:        { start: 1500, end: 1650 },
  FADE:       { start: 1650, end: 1800 },
} as const;

// Video 7: Arquitectura de un Chatbot
export const S2_ARQUITECTURA = {
  TITULO:    { start: 0,    end: 90 },
  PIEZA_1:   { start: 90,   end: 300 },
  PIEZA_2:   { start: 300,  end: 510 },
  PIEZA_3:   { start: 510,  end: 720 },
  PIEZA_4:   { start: 720,  end: 960 },
  PIEZA_5:   { start: 960,  end: 1140 },
  COMPLETO:  { start: 1140, end: 1440 },
  RETO:      { start: 1440, end: 1620 },
  FADE:      { start: 1620, end: 1800 },
} as const;

// Video 8: JSON y Datos en n8n
export const S2_JSON = {
  TITULO:      { start: 0,    end: 90 },
  QUE_ES:      { start: 90,   end: 330 },
  ANALOGIA:    { start: 330,  end: 540 },
  EN_N8N:      { start: 540,  end: 810 },
  EXPRESIONES: { start: 810,  end: 1080 },
  EJEMPLO_REAL:{ start: 1080, end: 1380 },
  TIP:         { start: 1380, end: 1560 },
  FADE:        { start: 1560, end: 1800 },
} as const;

// Video 9: APIs Gratuitas para tu Bot
export const S2_APIS_GRATUITAS = {
  TITULO:     { start: 0,    end: 90 },
  RECAP_API:  { start: 90,   end: 300 },
  API_1:      { start: 300,  end: 540 },
  API_2:      { start: 540,  end: 780 },
  API_3:      { start: 780,  end: 1020 },
  API_4:      { start: 1020, end: 1260 },
  COMO_USAR:  { start: 1260, end: 1500 },
  EXPLORA:    { start: 1500, end: 1650 },
  FADE:       { start: 1650, end: 1800 },
} as const;

// Video 10: El Flujo de un Mensaje
export const S2_FLUJO_MENSAJE = {
  TITULO:    { start: 0,    end: 90 },
  PASO_1:    { start: 90,   end: 300 },
  PASO_2:    { start: 300,  end: 480 },
  PASO_3:    { start: 480,  end: 660 },
  PASO_4:    { start: 660,  end: 870 },
  PASO_5:    { start: 870,  end: 1080 },
  PASO_6:    { start: 1080, end: 1260 },
  PASO_7:    { start: 1260, end: 1440 },
  COMPLETO:  { start: 1440, end: 1620 },
  FADE:      { start: 1620, end: 1800 },
} as const;

// Video 11: Buenas Prácticas
export const S2_BUENAS_PRACTICAS = {
  TITULO:  { start: 0,    end: 90 },
  TIP_1:   { start: 90,   end: 330 },
  TIP_2:   { start: 330,  end: 570 },
  TIP_3:   { start: 570,  end: 810 },
  TIP_4:   { start: 810,  end: 1050 },
  TIP_5:   { start: 1050, end: 1290 },
  TIP_6:   { start: 1290, end: 1500 },
  RESUMEN: { start: 1500, end: 1650 },
  FADE:    { start: 1650, end: 1800 },
} as const;

// Video 12: Ideas de Chatbots
export const S2_IDEAS_CHATBOTS = {
  TITULO:  { start: 0,    end: 90 },
  IDEA_1:  { start: 90,   end: 330 },
  IDEA_2:  { start: 330,  end: 570 },
  IDEA_3:  { start: 570,  end: 810 },
  IDEA_4:  { start: 810,  end: 1050 },
  IDEA_5:  { start: 1050, end: 1290 },
  TU_TURNO:{ start: 1290, end: 1500 },
  FADE:    { start: 1500, end: 1800 },
} as const;
