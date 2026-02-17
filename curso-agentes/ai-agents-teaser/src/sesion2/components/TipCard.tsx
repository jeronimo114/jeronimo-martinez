import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RECAP_COLORS, TYPOGRAPHY } from "../../utils/constants";

const C = RECAP_COLORS;
const FONT = TYPOGRAPHY.fontFamily;

interface TipCardProps {
  icon: string;
  text: string;
  delay?: number;
  color?: string;
}

export const TipCard: React.FC<TipCardProps> = ({
  icon,
  text,
  delay = 0,
  color = C.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame, fps, delay, config: { damping: 15 } });

  return (
    <div
      style={{
        opacity: appear,
        transform: `scale(${appear})`,
        background: C.surface,
        borderRadius: 12,
        padding: "16px 20px",
        border: `1px solid ${color}30`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        minWidth: 200,
      }}
    >
      <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 16,
          color: C.text,
          lineHeight: 1.3,
        }}
      >
        {text}
      </span>
    </div>
  );
};
