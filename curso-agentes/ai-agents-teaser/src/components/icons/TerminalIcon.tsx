import React from "react";

interface TerminalIconProps {
  x?: number;
  y?: number;
  size?: number;
  opacity?: number;
  scale?: number;
}

// Terminal/code icon with >_ prompt
export const TerminalIcon: React.FC<TerminalIconProps> = ({
  x = 0,
  y = 0,
  size = 64,
  opacity = 1,
  scale = 1,
}) => {
  const iconScale = size / 64;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale * iconScale})`}
      opacity={opacity}
    >
      {/* Icon background - dark */}
      <rect
        x={0}
        y={0}
        width={64}
        height={64}
        rx={14}
        fill="#1E1E1E"
        filter="url(#shadow-md)"
      />

      {/* Terminal window */}
      <g transform="translate(8, 10)">
        {/* Window frame */}
        <rect
          x={0}
          y={0}
          width={48}
          height={44}
          rx={6}
          fill="#2D2D2D"
        />

        {/* Title bar */}
        <rect
          x={0}
          y={0}
          width={48}
          height={14}
          rx={6}
          fill="#3D3D3D"
        />
        <rect
          x={0}
          y={6}
          width={48}
          height={8}
          fill="#3D3D3D"
        />

        {/* Traffic lights */}
        <circle cx={8} cy={7} r={2.5} fill="#FF5F57" />
        <circle cx={16} cy={7} r={2.5} fill="#FFBD2E" />
        <circle cx={24} cy={7} r={2.5} fill="#28C840" />

        {/* Prompt > */}
        <path
          d="M10 26 L18 30 L10 34"
          stroke="#4EC9B0"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Cursor _ */}
        <rect
          x={24}
          y={32}
          width={10}
          height={2.5}
          rx={1}
          fill="#D4D4D4"
        />
      </g>
    </g>
  );
};

export default TerminalIcon;
