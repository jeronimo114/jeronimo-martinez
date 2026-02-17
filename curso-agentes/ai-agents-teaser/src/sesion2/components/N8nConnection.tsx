import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { RECAP_COLORS } from "../../utils/constants";

const C = RECAP_COLORS;

interface N8nConnectionProps {
  from: "left" | "right" | "top" | "bottom";
  length?: number;
  color?: string;
  startFrame?: number;
  dashed?: boolean;
  animated?: boolean;
}

export const N8nConnection: React.FC<N8nConnectionProps> = ({
  from = "right",
  length = 60,
  color = C.textDim,
  startFrame = 0,
  dashed = false,
  animated = false,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isVertical = from === "top" || from === "bottom";
  const dashOffset = animated ? -frame * 2 : 0;

  return (
    <svg
      width={isVertical ? 20 : length}
      height={isVertical ? length : 20}
      style={{ opacity: progress, overflow: "visible" }}
    >
      <line
        x1={isVertical ? 10 : 0}
        y1={isVertical ? 0 : 10}
        x2={isVertical ? 10 : length * progress}
        y2={isVertical ? length * progress : 10}
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dashed ? "6 4" : "none"}
        strokeDashoffset={dashOffset}
      />
      {/* Arrow head */}
      {progress > 0.8 && (
        <polygon
          points={
            isVertical
              ? `6,${length - 8} 10,${length} 14,${length - 8}`
              : `${length - 8},6 ${length},10 ${length - 8},14`
          }
          fill={color}
          opacity={interpolate(progress, [0.8, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      )}
    </svg>
  );
};
