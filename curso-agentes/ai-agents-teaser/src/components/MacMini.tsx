import React from "react";
import { COLORS, DIMENSIONS } from "../utils/constants";

interface MacMiniProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  cornerSharpness?: number; // 0 = rounded, 1 = sharp
  portExtension?: number;   // 0 = no ports, 1 = full ports
  glowIntensity?: number;   // 0 = no glow, 1 = full glow
  shadowOpacity?: number;
  splitAmount?: number;     // 0 = closed, 1 = fully split
}

export const MacMini: React.FC<MacMiniProps> = ({
  x = 0,
  y = 0,
  width = 240,
  height = 60,
  opacity = 1,
  cornerSharpness = 0,
  portExtension = 0,
  glowIntensity = 0,
  shadowOpacity = 0,
  splitAmount = 0,
}) => {
  const cornerRadius = DIMENSIONS.cornerRadius * (1 - cornerSharpness * 0.5);
  const portHeight = 8 + portExtension * 12;
  const portWidth = 16 + portExtension * 8;

  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      {/* Drop shadow */}
      {shadowOpacity > 0 && (
        <rect
          x={4}
          y={4}
          width={width}
          height={height}
          rx={cornerRadius}
          fill={COLORS.shadow}
          opacity={shadowOpacity}
        />
      )}

      {/* Glow effect */}
      {glowIntensity > 0 && (
        <rect
          x={-4}
          y={-4}
          width={width + 8}
          height={height + 8}
          rx={cornerRadius + 4}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={2}
          opacity={glowIntensity * 0.6}
        />
      )}

      {/* Top panel (lifts when splitting) */}
      <g transform={`translate(0, ${-splitAmount * 30})`}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height * 0.4}
          rx={cornerRadius}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={DIMENSIONS.strokeWidth}
        />
        {/* Seam line (glows) */}
        <line
          x1={20}
          y1={height * 0.4}
          x2={width - 20}
          y2={height * 0.4}
          stroke={glowIntensity > 0 ? COLORS.accent : COLORS.primary}
          strokeWidth={1}
          opacity={glowIntensity > 0 ? glowIntensity : 0.5}
        />
      </g>

      {/* Bottom panel */}
      <g transform={`translate(0, ${splitAmount * 10})`}>
        <rect
          x={0}
          y={height * 0.4}
          width={width}
          height={height * 0.6}
          rx={cornerRadius}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={DIMENSIONS.strokeWidth}
        />
      </g>

      {/* Back ports */}
      {portExtension > 0 && (
        <g transform={`translate(${width}, ${height * 0.3})`}>
          {/* USB-C style ports */}
          <rect
            x={0}
            y={0}
            width={portWidth}
            height={portHeight}
            rx={2}
            fill="none"
            stroke={COLORS.primary}
            strokeWidth={1.5}
            opacity={portExtension}
          />
          <rect
            x={0}
            y={portHeight + 4}
            width={portWidth}
            height={portHeight}
            rx={2}
            fill="none"
            stroke={COLORS.primary}
            strokeWidth={1.5}
            opacity={portExtension}
          />
        </g>
      )}

      {/* Front indicator light */}
      <circle
        cx={width / 2}
        cy={height - 8}
        r={3}
        fill={glowIntensity > 0 ? COLORS.accent : "none"}
        stroke={COLORS.primary}
        strokeWidth={1}
        opacity={0.8}
      />
    </g>
  );
};
