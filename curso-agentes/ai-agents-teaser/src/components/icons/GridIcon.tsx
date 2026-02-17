import React from "react";

interface GridIconProps {
  x?: number;
  y?: number;
  size?: number;
  opacity?: number;
  scale?: number;
}

// Spreadsheet/grid icon - Numbers/Excel style with cells
export const GridIcon: React.FC<GridIconProps> = ({
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
      {/* Icon background - green gradient */}
      <rect
        x={0}
        y={0}
        width={64}
        height={64}
        rx={14}
        fill="url(#gradient-green)"
        filter="url(#shadow-md)"
      />

      {/* Spreadsheet representation */}
      <g transform="translate(10, 12)">
        {/* Background sheet */}
        <rect
          x={0}
          y={0}
          width={44}
          height={40}
          rx={4}
          fill="#FFFFFF"
        />

        {/* Column header */}
        <rect
          x={8}
          y={0}
          width={36}
          height={8}
          fill="#E8E8E8"
        />

        {/* Row header */}
        <rect
          x={0}
          y={8}
          width={8}
          height={32}
          fill="#E8E8E8"
        />

        {/* Grid lines - vertical */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`v-${i}`}
            x1={8 + i * 12}
            y1={0}
            x2={8 + i * 12}
            y2={40}
            stroke="#D0D0D0"
            strokeWidth={0.5}
          />
        ))}

        {/* Grid lines - horizontal */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={8 + i * 8}
            x2={44}
            y2={8 + i * 8}
            stroke="#D0D0D0"
            strokeWidth={0.5}
          />
        ))}

        {/* Selected cell highlight */}
        <rect
          x={8}
          y={16}
          width={12}
          height={8}
          fill="none"
          stroke="#248A3D"
          strokeWidth={2}
        />

        {/* Some data bars */}
        <rect x={10} y={10} width={8} height={3} rx={1} fill="#34C759" opacity={0.7} />
        <rect x={22} y={18} width={6} height={3} rx={1} fill="#636366" opacity={0.5} />
        <rect x={34} y={26} width={8} height={3} rx={1} fill="#636366" opacity={0.5} />
      </g>
    </g>
  );
};

export default GridIcon;
