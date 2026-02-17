import React from "react";
import { COLORS } from "../utils/constants";

interface SendArrowProps {
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  rotation?: number;
  glowIntensity?: number;
}

// Sleek send arrow with optional glow
export const SendArrow: React.FC<SendArrowProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  opacity = 1,
  rotation = 0,
  glowIntensity = 0,
}) => {
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Glow effect */}
      {glowIntensity > 0 && (
        <circle
          cx={12}
          cy={12}
          r={20}
          fill={COLORS.blue}
          opacity={glowIntensity * 0.3}
          filter="url(#glow-blue)"
        />
      )}

      {/* Circle background */}
      <circle
        cx={12}
        cy={12}
        r={14}
        fill="url(#gradient-blue)"
        filter="url(#shadow-sm)"
      />

      {/* Arrow shape */}
      <path
        d="M8 12 L16 12 M13 8 L17 12 L13 16"
        stroke={COLORS.white}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
};

export default SendArrow;
