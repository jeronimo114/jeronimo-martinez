import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RECAP_COLORS } from "../../utils/constants";

interface TokenItem {
  text: string;
  color?: string;
}

interface TokenBarProps {
  tokens: TokenItem[];
  startFrame: number;
  staggerDelay?: number;
  fontSize?: number;
}

const TOKEN_COLORS = [
  RECAP_COLORS.token1,
  RECAP_COLORS.token2,
  RECAP_COLORS.token3,
  RECAP_COLORS.token4,
  RECAP_COLORS.token5,
  RECAP_COLORS.token6,
  RECAP_COLORS.token7,
];

export const TokenBar: React.FC<TokenBarProps> = ({
  tokens,
  startFrame,
  staggerDelay = 4,
  fontSize = 28,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {tokens.map((token, i) => {
        const delay = i * staggerDelay;
        const appear = spring({
          frame: frame - startFrame - delay,
          fps,
          config: { damping: 12, stiffness: 200 },
        });

        const color = token.color || TOKEN_COLORS[i % TOKEN_COLORS.length];

        return (
          <div
            key={i}
            style={{
              padding: `${fontSize * 0.3}px ${fontSize * 0.5}px`,
              borderRadius: 8,
              background: color,
              color: isLightColor(color) ? "#333" : "#fff",
              fontFamily:
                '"SF Mono", "Fira Code", "Consolas", monospace',
              fontSize,
              fontWeight: 600,
              transform: `scale(${appear}) translateY(${(1 - appear) * 20}px)`,
              opacity: appear,
              whiteSpace: "nowrap",
            }}
          >
            {token.text}
          </div>
        );
      })}
    </div>
  );
};

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}
