import React from "react";
import { COLORS } from "../utils/constants";

interface CursorProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  glowIntensity?: number;
}

// Sleek cursor with glow
export const Cursor: React.FC<CursorProps> = ({
  x = 0,
  y = 0,
  width = 3,
  height = 32,
  opacity = 1,
  glowIntensity = 0.5,
}) => {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      {/* Glow effect */}
      {glowIntensity > 0 && (
        <rect
          x={-2}
          y={0}
          width={width + 4}
          height={height}
          rx={2}
          fill={COLORS.blue}
          opacity={glowIntensity * 0.3}
          filter="url(#glow-blue)"
        />
      )}

      {/* Main cursor */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={1.5}
        fill={COLORS.blue}
      />

      {/* Highlight */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height * 0.3}
        rx={1.5}
        fill={COLORS.white}
        opacity={0.3}
      />
    </g>
  );
};

export default Cursor;
