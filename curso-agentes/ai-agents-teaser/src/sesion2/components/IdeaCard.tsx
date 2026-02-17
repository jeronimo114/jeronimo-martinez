import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RECAP_COLORS, TYPOGRAPHY } from "../../utils/constants";

const C = RECAP_COLORS;
const FONT = TYPOGRAPHY.fontFamily;

interface IdeaCardProps {
  emoji: string;
  title: string;
  systemPrompt: string;
  tools: string;
  example?: string;
  delay?: number;
  color?: string;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({
  emoji,
  title,
  systemPrompt,
  tools,
  example,
  delay = 0,
  color = C.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame, fps, delay, config: { damping: 12 } });

  return (
    <div
      style={{
        opacity: appear,
        transform: `scale(${appear})`,
        background: C.surface,
        borderRadius: 16,
        padding: "28px 32px",
        border: `1px solid ${color}40`,
        width: 500,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 36 }}>{emoji}</span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 700,
            color: C.text,
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: FONT, fontSize: 14, color: C.textDim }}>
          System Prompt:
        </span>
        <span style={{ fontFamily: FONT, fontSize: 16, color: C.textSecondary }}>
          {systemPrompt}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: FONT, fontSize: 14, color: C.textDim }}>
          Tools:
        </span>
        <span style={{ fontFamily: FONT, fontSize: 16, color, fontWeight: 500 }}>
          {tools}
        </span>
      </div>
      {example && (
        <div
          style={{
            marginTop: 4,
            padding: "8px 12px",
            background: `${color}10`,
            borderRadius: 8,
            fontFamily: FONT,
            fontSize: 14,
            color: C.textSecondary,
            fontStyle: "italic",
          }}
        >
          "{example}"
        </div>
      )}
    </div>
  );
};
