import React from "react";

interface SlideIconProps {
  x?: number;
  y?: number;
  size?: number;
  opacity?: number;
  scale?: number;
}

// Presentation/Keynote icon - orange with slide shape
export const SlideIcon: React.FC<SlideIconProps> = ({
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
      {/* Icon background - orange gradient */}
      <rect
        x={0}
        y={0}
        width={64}
        height={64}
        rx={14}
        fill="url(#gradient-orange)"
        filter="url(#shadow-md)"
      />

      {/* Presentation elements */}
      <g transform="translate(10, 12)">
        {/* Main slide - 16:9 aspect */}
        <rect
          x={0}
          y={4}
          width={44}
          height={24.75}
          rx={3}
          fill="#FFFFFF"
        />

        {/* Slide content - title */}
        <rect
          x={6}
          y={10}
          width={24}
          height={4}
          rx={1}
          fill="#1D1D1F"
        />

        {/* Slide content - bullet points */}
        <rect x={6} y={18} width={16} height={2} rx={0.5} fill="#86868B" />
        <rect x={6} y={22} width={20} height={2} rx={0.5} fill="#86868B" />

        {/* Chart bars on right */}
        <rect x={34} y={20} width={4} height={4} rx={1} fill="#FF6B00" />
        <rect x={34} y={14} width={4} height={10} rx={1} fill="#FF9500" opacity={0.7} />

        {/* Play button indicator */}
        <g transform="translate(15, 34)">
          <circle cx={7} cy={3} r={5} fill="rgba(255,255,255,0.9)" />
          <path
            d="M5.5 0.5 L10 3 L5.5 5.5 Z"
            fill="#FF6B00"
          />
        </g>
      </g>
    </g>
  );
};

export default SlideIcon;
