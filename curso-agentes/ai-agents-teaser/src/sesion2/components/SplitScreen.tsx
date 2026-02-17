import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RECAP_COLORS, TYPOGRAPHY } from "../../utils/constants";

const C = RECAP_COLORS;
const FONT = TYPOGRAPHY.fontFamily;

interface SplitScreenProps {
  leftTitle: string;
  rightTitle: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftColor?: string;
  rightColor?: string;
  delay?: number;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
  leftColor = C.red,
  rightColor = C.green,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const leftAppear = spring({ frame, fps, delay, config: { damping: 200 } });
  const rightAppear = spring({ frame, fps, delay: delay + 15, config: { damping: 200 } });

  return (
    <div style={{ display: "flex", gap: 30, width: "100%", maxWidth: 1200 }}>
      <div
        style={{
          flex: 1,
          opacity: leftAppear,
          transform: `translateX(${(1 - leftAppear) * -30}px)`,
          background: C.surface,
          borderRadius: 16,
          padding: "24px 28px",
          border: `1px solid ${leftColor}30`,
        }}
      >
        <p
          style={{
            fontFamily: FONT,
            fontSize: 18,
            fontWeight: 600,
            color: leftColor,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {leftTitle}
        </p>
        {leftContent}
      </div>
      <div
        style={{
          flex: 1,
          opacity: rightAppear,
          transform: `translateX(${(1 - rightAppear) * 30}px)`,
          background: C.surface,
          borderRadius: 16,
          padding: "24px 28px",
          border: `1px solid ${rightColor}30`,
          boxShadow: `0 0 20px ${rightColor}15`,
        }}
      >
        <p
          style={{
            fontFamily: FONT,
            fontSize: 18,
            fontWeight: 600,
            color: rightColor,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {rightTitle}
        </p>
        {rightContent}
      </div>
    </div>
  );
};
