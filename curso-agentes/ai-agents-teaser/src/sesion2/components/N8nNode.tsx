import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RECAP_COLORS, TYPOGRAPHY } from "../../utils/constants";

const C = RECAP_COLORS;
const FONT = TYPOGRAPHY.fontFamily;

interface N8nNodeProps {
  label: string;
  icon?: string;
  color?: string;
  width?: number;
  height?: number;
  delay?: number;
  highlighted?: boolean;
  highlightField?: string;
  ports?: { top?: boolean; bottom?: number; left?: boolean; right?: boolean };
}

export const N8nNode: React.FC<N8nNodeProps> = ({
  label,
  icon,
  color = C.accent,
  width = 180,
  height = 80,
  delay = 0,
  highlighted = false,
  highlightField,
  ports = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame, fps, delay, config: { damping: 12 } });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: appear,
        transform: `scale(${appear})`,
      }}
    >
      {ports.top && (
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: C.surfaceLight,
            border: `2px solid ${C.textDim}`,
            marginBottom: -6,
            zIndex: 2,
          }}
        />
      )}
      <div
        style={{
          width,
          minHeight: height,
          background: C.surface,
          borderRadius: 12,
          border: `2px solid ${highlighted ? color : C.textDim}`,
          boxShadow: highlighted ? `0 0 20px ${color}40` : "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
          position: "relative",
        }}
      >
        {icon && <span style={{ fontSize: 24, marginBottom: 4 }}>{icon}</span>}
        <span
          style={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 600,
            color: C.text,
            textAlign: "center",
          }}
        >
          {label}
        </span>
        {highlightField && (
          <div
            style={{
              marginTop: 8,
              padding: "4px 10px",
              background: `${color}20`,
              borderRadius: 6,
              border: `1px solid ${color}`,
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 11,
                color,
                fontWeight: 500,
              }}
            >
              {highlightField}
            </span>
          </div>
        )}
      </div>
      {ports.bottom && ports.bottom > 0 && (
        <div style={{ display: "flex", gap: 16, marginTop: -6, zIndex: 2 }}>
          {Array.from({ length: ports.bottom }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: C.surfaceLight,
                border: `2px solid ${C.textDim}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
