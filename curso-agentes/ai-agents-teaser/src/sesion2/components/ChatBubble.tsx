import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RECAP_COLORS, TYPOGRAPHY } from "../../utils/constants";

const C = RECAP_COLORS;
const FONT = TYPOGRAPHY.fontFamily;

interface ChatBubbleProps {
  text: string;
  isUser?: boolean;
  delay?: number;
  emoji?: string;
  color?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  isUser = false,
  delay = 0,
  emoji,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame, fps, delay, config: { damping: 15 } });

  const bgColor = color || (isUser ? C.accent : C.surface);
  const textColor = isUser ? "#fff" : C.text;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        opacity: appear,
        transform: `translateY(${(1 - appear) * 20}px) scale(${0.8 + appear * 0.2})`,
        width: "100%",
      }}
    >
      <div
        style={{
          background: bgColor,
          padding: "12px 20px",
          borderRadius: 16,
          borderBottomRightRadius: isUser ? 4 : 16,
          borderBottomLeftRadius: isUser ? 16 : 4,
          maxWidth: "75%",
          border: isUser ? "none" : `1px solid ${C.textDim}30`,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 20,
            color: textColor,
            lineHeight: 1.4,
          }}
        >
          {text}
        </span>
        {emoji && (
          <span style={{ fontSize: 24, marginLeft: 8 }}>{emoji}</span>
        )}
      </div>
    </div>
  );
};
