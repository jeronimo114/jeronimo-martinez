import React from "react";
import { COLORS } from "../utils/constants";

interface ComputeDeviceProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  cornerSharpness?: number;   // 0 = rounded, 1 = sharp
  portExtension?: number;     // 0 = no ports, 1 = full ports
  glowIntensity?: number;     // 0 = no glow, 1 = full glow
  shadowOpacity?: number;
  splitAmount?: number;       // 0 = closed, 1 = fully split
  ledActive?: boolean;
}

// Realistic compute device with space gray fill and depth
export const ComputeDevice: React.FC<ComputeDeviceProps> = ({
  x = 0,
  y = 0,
  width = 240,
  height = 60,
  opacity = 1,
  cornerSharpness = 0,
  portExtension = 0,
  glowIntensity = 0,
  shadowOpacity = 0.5,
  splitAmount = 0,
  ledActive = true,
}) => {
  const cornerRadius = 12 * (1 - cornerSharpness * 0.5);
  const portHeight = 8 + portExtension * 6;
  const portWidth = 14 + portExtension * 4;

  // Panel heights
  const topPanelHeight = height * 0.35;
  const bottomPanelHeight = height * 0.65;

  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      {/* Ambient shadow */}
      {shadowOpacity > 0 && (
        <ellipse
          cx={width / 2}
          cy={height + 8}
          rx={width * 0.45}
          ry={8}
          fill="#000"
          opacity={shadowOpacity * 0.15}
        />
      )}

      {/* Glow effect when active */}
      {glowIntensity > 0 && (
        <rect
          x={-8}
          y={-8}
          width={width + 16}
          height={height + 16}
          rx={cornerRadius + 8}
          fill="none"
          stroke={COLORS.blue}
          strokeWidth={3}
          opacity={glowIntensity * 0.5}
          filter="url(#glow-blue)"
        />
      )}

      {/* Top panel (lifts when splitting) */}
      <g transform={`translate(0, ${-splitAmount * 35})`}>
        {/* Top panel body */}
        <rect
          x={0}
          y={0}
          width={width}
          height={topPanelHeight + (splitAmount > 0 ? 5 : 0)}
          rx={cornerRadius}
          fill="url(#gradient-space-gray)"
          filter="url(#shadow-sm)"
        />

        {/* Top surface highlight */}
        <rect
          x={4}
          y={2}
          width={width - 8}
          height={topPanelHeight * 0.4}
          rx={cornerRadius - 2}
          fill="#FFFFFF"
          opacity={0.1}
        />

        {/* Ventilation slots */}
        <g transform={`translate(${width / 2 - 50}, 6)`}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={i}
              x={i * 12}
              y={0}
              width={8}
              height={2}
              rx={1}
              fill="#000"
              opacity={0.3}
            />
          ))}
        </g>
      </g>

      {/* Seam line (glows blue when active) */}
      <g opacity={1 - splitAmount * 0.5}>
        <line
          x1={15}
          y1={topPanelHeight}
          x2={width - 15}
          y2={topPanelHeight}
          stroke={glowIntensity > 0 ? COLORS.blue : "#48484A"}
          strokeWidth={glowIntensity > 0 ? 2 : 1}
          opacity={glowIntensity > 0 ? glowIntensity : 0.8}
          filter={glowIntensity > 0 ? "url(#glow-blue)" : undefined}
        />
      </g>

      {/* Bottom panel */}
      <g transform={`translate(0, ${splitAmount * 15})`}>
        {/* Bottom panel body */}
        <rect
          x={0}
          y={topPanelHeight}
          width={width}
          height={bottomPanelHeight}
          rx={cornerRadius}
          fill="url(#gradient-space-gray)"
          filter="url(#shadow-md)"
        />

        {/* Bottom edge highlight */}
        <rect
          x={4}
          y={height - 4}
          width={width - 8}
          height={2}
          rx={1}
          fill="#000"
          opacity={0.2}
        />

        {/* Front indicator light */}
        <circle
          cx={width / 2}
          cy={height - 10}
          r={3}
          fill={ledActive ? COLORS.blue : COLORS.systemGray3}
          filter={ledActive ? "url(#glow-blue)" : undefined}
        />
      </g>

      {/* Back ports */}
      {portExtension > 0 && (
        <g transform={`translate(${width - 2}, ${topPanelHeight + 4})`}>
          {/* USB-C ports */}
          <g opacity={portExtension}>
            {/* Port 1 */}
            <rect
              x={0}
              y={0}
              width={portWidth}
              height={portHeight}
              rx={3}
              fill={COLORS.systemGray5}
              stroke={COLORS.systemGray3}
              strokeWidth={1}
            />
            <rect
              x={3}
              y={portHeight / 2 - 1.5}
              width={portWidth - 6}
              height={3}
              rx={1}
              fill={COLORS.systemGray2}
            />

            {/* Port 2 */}
            <rect
              x={0}
              y={portHeight + 4}
              width={portWidth}
              height={portHeight}
              rx={3}
              fill={COLORS.systemGray5}
              stroke={COLORS.systemGray3}
              strokeWidth={1}
            />
            <rect
              x={3}
              y={portHeight + 4 + portHeight / 2 - 1.5}
              width={portWidth - 6}
              height={3}
              rx={1}
              fill={COLORS.systemGray2}
            />

            {/* Ethernet port */}
            <rect
              x={portWidth + 4}
              y={portHeight / 2}
              width={portWidth * 1.2}
              height={portHeight * 1.5}
              rx={2}
              fill={COLORS.systemGray5}
              stroke={COLORS.systemGray3}
              strokeWidth={1}
            />
          </g>
        </g>
      )}

      {/* Apple-style logo position (subtle circle) */}
      <circle
        cx={width / 2}
        cy={topPanelHeight / 2 + 2}
        r={8}
        fill="none"
        stroke="#000"
        strokeWidth={0.5}
        opacity={0.1}
      />
    </g>
  );
};

export default ComputeDevice;
