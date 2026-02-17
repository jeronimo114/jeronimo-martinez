import React from "react";

interface DashboardIconProps {
  x?: number;
  y?: number;
  size?: number;
  opacity?: number;
  scale?: number;
}

// Dashboard/App grid icon - 4 colorful rounded squares
export const DashboardIcon: React.FC<DashboardIconProps> = ({
  x = 0,
  y = 0,
  size = 64,
  opacity = 1,
  scale = 1,
}) => {
  const iconScale = size / 64;

  const tiles = [
    { x: 10, y: 10, color: "#FF453A" },  // Red - top left
    { x: 35, y: 10, color: "#0071E3" },  // Blue - top right
    { x: 10, y: 35, color: "#30D158" },  // Green - bottom left
    { x: 35, y: 35, color: "#FF9F0A" },  // Orange - bottom right
  ];

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale * iconScale})`}
      opacity={opacity}
    >
      {/* Icon background */}
      <rect
        x={0}
        y={0}
        width={64}
        height={64}
        rx={14}
        fill="#FFFFFF"
        filter="url(#shadow-md)"
      />

      {/* Grid of app tiles */}
      {tiles.map((tile, index) => (
        <rect
          key={index}
          x={tile.x}
          y={tile.y}
          width={19}
          height={19}
          rx={5}
          fill={tile.color}
        />
      ))}
    </g>
  );
};

export default DashboardIcon;
