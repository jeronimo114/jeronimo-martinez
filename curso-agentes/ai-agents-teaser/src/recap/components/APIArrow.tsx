import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface APIArrowProps {
  direction: "right" | "left";
  label: string;
  color: string;
  startFrame: number;
  width?: number;
}

export const APIArrow: React.FC<APIArrowProps> = ({
  direction,
  label,
  color,
  startFrame,
  width = 200,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - startFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowX = direction === "right" ? width * progress : width * (1 - progress);
  const labelOpacity = interpolate(frame - startFrame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", width, height: 50 }}>
      <svg width={width} height={50} viewBox={`0 0 ${width} 50`}>
        {/* Arrow line */}
        <line
          x1={direction === "right" ? 0 : width}
          y1={25}
          x2={direction === "right" ? width * progress : width - width * progress}
          y2={25}
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={progress}
        />
        {/* Arrow head */}
        {progress > 0.5 && (
          <g opacity={(progress - 0.5) * 2}>
            {direction === "right" ? (
              <path
                d={`M${width - 12},18 L${width},25 L${width - 12},32`}
                fill="none"
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d={`M12,18 L0,25 L12,32`}
                fill="none"
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </g>
        )}
      </svg>
      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: -20,
          left: 0,
          width: "100%",
          textAlign: "center",
          color,
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          opacity: labelOpacity,
        }}
      >
        {label}
      </div>
    </div>
  );
};
