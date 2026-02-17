import React from "react";

interface ComputeBoxIconProps {
  x?: number;
  y?: number;
  size?: number;
  opacity?: number;
  scale?: number;
  ledActive?: boolean;
}

// Space gray compute box with LED - generic server/compute device
export const ComputeBoxIcon: React.FC<ComputeBoxIconProps> = ({
  x = 0,
  y = 0,
  size = 64,
  opacity = 1,
  scale = 1,
  ledActive = true,
}) => {
  const iconScale = size / 64;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale * iconScale})`}
      opacity={opacity}
    >
      {/* Icon background with shadow */}
      <rect
        x={0}
        y={0}
        width={64}
        height={64}
        rx={14}
        fill="url(#gradient-space-gray)"
        filter="url(#shadow-md)"
      />

      {/* Device body */}
      <g transform="translate(10, 18)">
        {/* Main box */}
        <rect
          x={0}
          y={0}
          width={44}
          height={28}
          rx={4}
          fill="url(#gradient-aluminum)"
        />

        {/* Top seam line */}
        <line
          x1={4}
          y1={8}
          x2={40}
          y2={8}
          stroke="#B0B0B5"
          strokeWidth={0.5}
        />

        {/* Ventilation slots */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={8 + i * 6}
            y={2}
            width={4}
            height={1.5}
            rx={0.5}
            fill="#9D9DA3"
          />
        ))}

        {/* LED indicator */}
        <circle
          cx={22}
          cy={22}
          r={2.5}
          fill={ledActive ? "#0071E3" : "#636366"}
          filter={ledActive ? "url(#glow-blue)" : undefined}
        />

        {/* Back ports hint */}
        <g transform="translate(40, 12)">
          <rect
            x={0}
            y={0}
            width={4}
            height={4}
            rx={1}
            fill="#8E8E93"
          />
          <rect
            x={0}
            y={6}
            width={4}
            height={4}
            rx={1}
            fill="#8E8E93"
          />
        </g>
      </g>
    </g>
  );
};

export default ComputeBoxIcon;
