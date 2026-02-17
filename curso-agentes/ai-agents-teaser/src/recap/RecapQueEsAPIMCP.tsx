import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { RECAP_COLORS, RECAP_API_MCP, TYPOGRAPHY } from "../utils/constants";
import { USBCPort } from "./components/USBCPort";
import { ToolIcon } from "./components/ToolIcon";

const S = RECAP_API_MCP;
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
  const sub = spring({ frame, fps, delay: 15, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", background: C.background }}>
      <h1
        style={{
          fontFamily: FONT, fontSize: 80, fontWeight: 700, color: C.text,
          transform: `scale(${s})`, opacity: s, textAlign: "center",
        }}
      >
        <span style={{ color: C.accent }}>API</span> y{" "}
        <span style={{ color: C.green }}>MCP</span>
      </h1>
      <p
        style={{
          fontFamily: FONT, fontSize: 30, color: C.textSecondary,
          opacity: sub, transform: `translateY(${(1 - sub) * 20}px)`, marginTop: 16,
        }}
      >
        Cómo se comunican las aplicaciones
      </p>
    </AbsoluteFill>
  );
};

const PhaseAPIDefinicion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bridgeProgress = spring({ frame, fps, delay: 30, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background, padding: 80 }}
    >
      <FadeText delay={0} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: MONO, fontSize: 28, color: C.textSecondary }}>
          API = Application Programming Interface
        </p>
      </FadeText>

      {/* Bridge visual */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 0,
          marginBottom: 40, opacity: bridgeProgress,
        }}
      >
        {/* Left building */}
        <div
          style={{
            width: 180, height: 120, background: C.surface, borderRadius: 12,
            border: `2px solid ${C.accent}`, display: "flex", alignItems: "center",
            justifyContent: "center", flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 32 }}>🏢</span>
          <p style={{ fontFamily: FONT, fontSize: 16, color: C.text, marginTop: 4 }}>Tu App</p>
        </div>

        {/* Bridge */}
        <div style={{ position: "relative", width: 200, height: 40 }}>
          <svg width="200" height="40" viewBox="0 0 200 40">
            {/* Bridge deck */}
            <rect x="0" y="15" width={200 * bridgeProgress} height="10" rx="5" fill={C.accent} opacity="0.6" />
            {/* Bridge supports */}
            <rect x="40" y="10" width="4" height="20" rx="2" fill={C.accent} opacity={bridgeProgress} />
            <rect x="100" y="8" width="4" height="24" rx="2" fill={C.accent} opacity={bridgeProgress} />
            <rect x="160" y="10" width="4" height="20" rx="2" fill={C.accent} opacity={bridgeProgress} />
          </svg>
          <div
            style={{
              position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)",
              fontFamily: FONT, fontSize: 16, color: C.accent, fontWeight: 700,
              opacity: bridgeProgress,
            }}
          >
            API
          </div>
        </div>

        {/* Right building */}
        <div
          style={{
            width: 180, height: 120, background: C.surface, borderRadius: 12,
            border: `2px solid ${C.green}`, display: "flex", alignItems: "center",
            justifyContent: "center", flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 32 }}>🏢</span>
          <p style={{ fontFamily: FONT, fontSize: 16, color: C.text, marginTop: 4 }}>Servicio externo</p>
        </div>
      </div>

      <FadeText delay={50} style={{ marginBottom: 16 }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: C.text, textAlign: "center", maxWidth: 800 }}>
          Es un <span style={{ color: C.accent, fontWeight: 700 }}>puente</span> que permite que las apps se hablen entre sí
        </p>
      </FadeText>

      <FadeText delay={80}>
        <div style={{ background: C.surface, borderRadius: 12, padding: "16px 32px" }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: C.textSecondary, fontStyle: "italic" }}>
            🍽️ Como un mesero: tú pides, él lleva la orden a la cocina, y te trae la comida
          </p>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseRequestResponse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const requestProgress = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const spinnerOpacity = interpolate(frame, [50, 60, 80, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const responseProgress = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const jsonAppear = spring({ frame, fps, delay: 130, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background, padding: 80 }}
    >
      {/* Request/Response diagram */}
      <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 40 }}>
        {/* Tu App */}
        <div
          style={{
            width: 160, height: 100, background: C.surface, borderRadius: 12,
            border: `2px solid ${C.accent}`, display: "flex", alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 18, color: C.text, fontWeight: 600 }}>Tu App</p>
        </div>

        {/* Arrows */}
        <div style={{ position: "relative", width: 300, height: 80 }}>
          {/* Request arrow (top) */}
          <svg width="300" height="30" viewBox="0 0 300 30" style={{ position: "absolute", top: 0 }}>
            <line x1="0" y1="15" x2={280 * requestProgress} y2="15" stroke={C.accent} strokeWidth="3" strokeLinecap="round" />
            {requestProgress > 0.8 && (
              <path d="M270,8 L285,15 L270,22" fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round" opacity={(requestProgress - 0.8) * 5} />
            )}
          </svg>
          <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", opacity: requestProgress }}>
            <span style={{ fontFamily: FONT, fontSize: 14, color: C.accent, fontWeight: 600 }}>Request →</span>
          </div>

          {/* Spinner */}
          <div
            style={{
              position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)",
              opacity: spinnerOpacity, fontSize: 20,
            }}
          >
            ⏳
          </div>

          {/* Response arrow (bottom) */}
          <svg width="300" height="30" viewBox="0 0 300 30" style={{ position: "absolute", top: 50 }}>
            <line x1="300" y1="15" x2={300 - 280 * responseProgress} y2="15" stroke={C.green} strokeWidth="3" strokeLinecap="round" />
            {responseProgress > 0.8 && (
              <path d="M30,8 L15,15 L30,22" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" opacity={(responseProgress - 0.8) * 5} />
            )}
          </svg>
          <div style={{ position: "absolute", top: 82, left: "50%", transform: "translateX(-50%)", opacity: responseProgress }}>
            <span style={{ fontFamily: FONT, fontSize: 14, color: C.green, fontWeight: 600 }}>← Response</span>
          </div>
        </div>

        {/* Servicio */}
        <div
          style={{
            width: 160, height: 100, background: C.surface, borderRadius: 12,
            border: `2px solid ${C.green}`, display: "flex", alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 18, color: C.text, fontWeight: 600 }}>Servicio</p>
        </div>
      </div>

      {/* Concrete example */}
      <FadeText delay={90} style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary }}>
          Request: "¿Qué clima hace en Bogotá?" → Response: "Soleado, 22°C"
        </p>
      </FadeText>

      {/* JSON */}
      <div style={{ display: "flex", gap: 30, opacity: jsonAppear }}>
        <div style={{ background: "#1e1e1e", borderRadius: 10, padding: "16px 24px", border: `1px solid ${C.accent}40` }}>
          <p style={{ fontFamily: MONO, fontSize: 16, color: C.accent, marginBottom: 4 }}>Request</p>
          <pre style={{ fontFamily: MONO, fontSize: 14, color: C.textSecondary, margin: 0 }}>
{`{ "pregunta": "clima Bogotá" }`}
          </pre>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: FONT, fontSize: 24, color: C.textDim }}>→</span>
        </div>
        <div style={{ background: "#1e1e1e", borderRadius: 10, padding: "16px 24px", border: `1px solid ${C.green}40` }}>
          <p style={{ fontFamily: MONO, fontSize: 16, color: C.green, marginBottom: 4 }}>Response</p>
          <pre style={{ fontFamily: MONO, fontSize: 14, color: C.textSecondary, margin: 0 }}>
{`{ "temp": "22°C",
  "estado": "soleado" }`}
          </pre>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PhaseAPIKeys: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const doorProgress = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background, padding: 80 }}
    >
      <FadeText delay={0} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.text }}>
          API Keys: Tu identificación
        </p>
      </FadeText>

      <FadeText delay={15} style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 36 }}>🔑</span>
          <p style={{ fontFamily: MONO, fontSize: 22, color: C.yellow }}>
            sk-abc123...xyz789
          </p>
        </div>
      </FadeText>

      <FadeText delay={30} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary }}>
          Como una tarjeta de acceso a un edificio
        </p>
      </FadeText>

      {/* Door visual */}
      <div style={{ display: "flex", gap: 60, marginBottom: 30 }}>
        <FadeText delay={40}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 100, height: 140, background: C.surface, borderRadius: 12,
                border: `3px solid ${C.red}`, display: "flex", alignItems: "center",
                justifyContent: "center", flexDirection: "column",
              }}
            >
              <span style={{ fontSize: 36 }}>🚪</span>
              <span style={{ fontSize: 24, marginTop: 8 }}>🔒</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: C.red, marginTop: 8, fontWeight: 600 }}>
              Sin llave
            </p>
          </div>
        </FadeText>

        <FadeText delay={60}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 100, height: 140, background: C.surface, borderRadius: 12,
                border: `3px solid ${C.green}`, display: "flex", alignItems: "center",
                justifyContent: "center", flexDirection: "column",
              }}
            >
              <span style={{ fontSize: 36 }}>🚪</span>
              <span style={{ fontSize: 24, marginTop: 8 }}>🔓</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: C.green, marginTop: 8, fontWeight: 600 }}>
              Con llave
            </p>
          </div>
        </FadeText>
      </div>

      <FadeText delay={80}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: C.textSecondary }}>
          Identifica quién eres y cuánto puedes usar
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseAPIsIA: React.FC = () => {
  const apis = [
    { name: "OpenAI API", color: "#10A37F" },
    { name: "Anthropic API", color: "#D4A574" },
    { name: "Google AI", color: "#4285F4" },
  ];

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background, padding: 80 }}
    >
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.text }}>
          APIs de IA
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 30, marginBottom: 40 }}>
        {apis.map((api, i) => (
          <FadeText key={i} delay={15 + i * 15}>
            <div
              style={{
                width: 200, padding: "24px 20px", background: C.surface, borderRadius: 16,
                border: `2px solid ${api.color}`, textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: 12, background: api.color,
                  margin: "0 auto 12px", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 24, color: "#fff", fontWeight: 700,
                }}
              >
                {api.name[0]}
              </div>
              <p style={{ fontFamily: FONT, fontSize: 18, color: C.text, fontWeight: 500 }}>
                {api.name}
              </p>
            </div>
          </FadeText>
        ))}
      </div>

      <FadeText delay={60}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: C.textSecondary, textAlign: "center" }}>
          Tu App → API de IA → <span style={{ color: C.accent }}>Envías texto, recibes texto generado</span>
        </p>
      </FadeText>

      <FadeText delay={80}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textDim, marginTop: 16 }}>
          Es así como las apps usan LLMs internamente
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseTransicionMCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const connectors = ["🔵", "🔴", "🟢", "🟡", "🟣"];

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background, padding: 80 }}
    >
      <FadeText delay={0} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.yellow }}>
          Pero hay un problema...
        </p>
      </FadeText>

      <FadeText delay={15} style={{ marginBottom: 30 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.textSecondary, textAlign: "center", maxWidth: 700 }}>
          Cada herramienta tiene su propia API con su propio formato
        </p>
      </FadeText>

      {/* Chaotic connectors */}
      <FadeText delay={30}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", maxWidth: 600 }}>
          {connectors.map((c, i) => {
            const connSpring = spring({
              frame, fps, delay: 30 + i * 8,
              config: { damping: 8 },
            });
            return (
              <div
                key={i}
                style={{
                  transform: `scale(${connSpring}) rotate(${(i - 2) * 15}deg)`,
                  opacity: connSpring,
                  background: C.surface,
                  borderRadius: 8,
                  padding: "12px 20px",
                  border: `1px solid #444`,
                }}
              >
                <span style={{ fontSize: 24 }}>{c}</span>
                <span style={{ fontFamily: MONO, fontSize: 14, color: C.textDim, marginLeft: 8 }}>
                  API v{i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseMCPIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const usbAppear = spring({ frame, fps, delay: 20, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background, padding: 80 }}
    >
      <FadeText delay={0} style={{ marginBottom: 16 }}>
        <p style={{ fontFamily: MONO, fontSize: 28, color: C.textSecondary }}>
          MCP = Model Context Protocol
        </p>
      </FadeText>

      <div style={{ transform: `scale(${usbAppear})`, opacity: usbAppear, marginBottom: 20 }}>
        <USBCPort size={200} color={C.green} glowIntensity={usbAppear} />
      </div>

      <FadeText delay={40}>
        <p style={{ fontFamily: FONT, fontSize: 48, fontWeight: 700, color: C.green, textAlign: "center" }}>
          El USB-C de la IA
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 50, marginTop: 30, marginBottom: 30 }}>
        <FadeText delay={60}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.red, fontWeight: 600, marginBottom: 8 }}>
              Antes
            </p>
            <p style={{ fontFamily: FONT, fontSize: 16, color: C.textSecondary }}>
              5 cables diferentes<br />para 5 dispositivos
            </p>
          </div>
        </FadeText>
        <FadeText delay={75}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.green, fontWeight: 600, marginBottom: 8 }}>
              Después
            </p>
            <p style={{ fontFamily: FONT, fontSize: 16, color: C.textSecondary }}>
              1 cable USB-C<br />para todo
            </p>
          </div>
        </FadeText>
      </div>

      <FadeText delay={90}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: C.textDim }}>
          Creado por Anthropic, adoptado por toda la industria
        </p>
      </FadeText>

      <FadeText delay={105}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: C.accent, fontWeight: 700, marginTop: 10 }}>
          +10,000 servidores MCP disponibles
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhaseMCPVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const services = [
    { label: "Gmail", angle: 0 },
    { label: "Google Sheets", angle: 60 },
    { label: "Slack", angle: 120 },
    { label: "Base de datos", angle: 180 },
    { label: "Navegador", angle: 240 },
    { label: "Calendario", angle: 300 },
  ];

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background, padding: 80 }}
    >
      <div style={{ position: "relative", width: 600, height: 400 }}>
        {/* Center MCP hub */}
        <div
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <FadeText delay={0}>
            <div
              style={{
                width: 100, height: 100, borderRadius: "50%",
                background: C.green, display: "flex", alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: "#000" }}>
                MCP
              </span>
            </div>
          </FadeText>
        </div>

        {/* Orbiting services */}
        {services.map((svc, i) => {
          const radius = 200;
          const angleRad = (svc.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          const svcSpring = spring({
            frame, fps, delay: 20 + i * 10,
            config: { damping: 15 },
          });

          // Line drawing
          const lineProgress = interpolate(
            frame,
            [20 + i * 10, 35 + i * 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <React.Fragment key={i}>
              {/* Connection line */}
              <svg
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
              >
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${50 + (x / 600) * 100 * lineProgress}%`}
                  y2={`${50 + (y / 400) * 100 * lineProgress}%`}
                  stroke={C.green}
                  strokeWidth="2"
                  opacity={lineProgress * 0.4}
                  strokeDasharray="6 4"
                />
              </svg>

              {/* Service node */}
              <div
                style={{
                  position: "absolute",
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: `translate(-50%, -50%) scale(${svcSpring})`,
                  opacity: svcSpring,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 80, height: 50, background: C.surface, borderRadius: 10,
                    border: `1px solid ${C.green}40`, display: "flex",
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: FONT, fontSize: 13, color: C.text, fontWeight: 500 }}>
                    {svc.label}
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <FadeText delay={90}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: C.text, textAlign: "center", maxWidth: 800 }}>
          Una <span style={{ color: C.green, fontWeight: 700 }}>interfaz universal</span> para conectar cualquier herramienta a cualquier IA
        </p>
      </FadeText>
    </AbsoluteFill>
  );
};

const PhasePorPlataforma: React.FC = () => {
  const platforms = [
    { name: "ChatGPT", items: ["Gmail", "Calendar"], highlight: false },
    { name: "Claude", items: ["Mayor rango de MCPs", "Figma, Notion, etc."], highlight: true },
    { name: "Gemini", items: ["Débil en herramientas"], highlight: false },
  ];

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", background: C.background, padding: 80 }}
    >
      <FadeText delay={0} style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: FONT, fontSize: 36, fontWeight: 600, color: C.text }}>
          MCP por plataforma
        </p>
      </FadeText>

      <div style={{ display: "flex", gap: 30 }}>
        {platforms.map((p, i) => (
          <FadeText key={i} delay={15 + i * 20}>
            <div
              style={{
                width: 260, padding: "30px 24px", background: C.surface, borderRadius: 16,
                border: p.highlight ? `2px solid ${C.accent}` : `1px solid #333`,
                boxShadow: p.highlight ? `0 0 20px ${C.accentDim}` : "none",
              }}
            >
              <p
                style={{
                  fontFamily: FONT, fontSize: 22, fontWeight: 700, marginBottom: 16,
                  color: p.highlight ? C.accent : C.text, textAlign: "center",
                }}
              >
                {p.name}
              </p>
              {p.items.map((item, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: FONT, fontSize: 16, color: C.textSecondary,
                    marginBottom: 6, textAlign: "center",
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </FadeText>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PhaseResumen: React.FC = () => {
  const points = [
    { num: "1", text: "API = puente entre aplicaciones", color: C.accent },
    { num: "2", text: "MCP = estándar universal de conexión", color: C.green },
    { num: "3", text: "Permiten que la IA actúe en el mundo real", color: C.purple },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center", alignItems: "flex-start", background: C.background,
        paddingLeft: "15%", paddingRight: "15%",
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
                width: 48, height: 48, borderRadius: "50%", background: p.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: FONT, fontSize: 22, fontWeight: 700, color: "#000", flexShrink: 0,
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

export const RecapQueEsAPIMCP: React.FC = () => {
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

      <Sequence from={S.API_DEFINICION.start} durationInFrames={S.API_DEFINICION.end - S.API_DEFINICION.start} premountFor={30}>
        <PhaseAPIDefinicion />
      </Sequence>

      <Sequence from={S.REQUEST_RESPONSE.start} durationInFrames={S.REQUEST_RESPONSE.end - S.REQUEST_RESPONSE.start} premountFor={30}>
        <PhaseRequestResponse />
      </Sequence>

      <Sequence from={S.API_KEYS.start} durationInFrames={S.API_KEYS.end - S.API_KEYS.start} premountFor={30}>
        <PhaseAPIKeys />
      </Sequence>

      <Sequence from={S.APIS_IA.start} durationInFrames={S.APIS_IA.end - S.APIS_IA.start} premountFor={30}>
        <PhaseAPIsIA />
      </Sequence>

      <Sequence from={S.TRANSICION_MCP.start} durationInFrames={S.TRANSICION_MCP.end - S.TRANSICION_MCP.start} premountFor={30}>
        <PhaseTransicionMCP />
      </Sequence>

      <Sequence from={S.MCP_INTRO.start} durationInFrames={S.MCP_INTRO.end - S.MCP_INTRO.start} premountFor={30}>
        <PhaseMCPIntro />
      </Sequence>

      <Sequence from={S.MCP_VISUAL.start} durationInFrames={S.MCP_VISUAL.end - S.MCP_VISUAL.start} premountFor={30}>
        <PhaseMCPVisual />
      </Sequence>

      <Sequence from={S.POR_PLATAFORMA.start} durationInFrames={S.POR_PLATAFORMA.end - S.POR_PLATAFORMA.start} premountFor={30}>
        <PhasePorPlataforma />
      </Sequence>

      <Sequence from={S.RESUMEN.start} durationInFrames={S.RESUMEN.end - S.RESUMEN.start} premountFor={30}>
        <PhaseResumen />
      </Sequence>
    </AbsoluteFill>
  );
};
