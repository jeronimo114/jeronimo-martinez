import React from "react";

interface BrainIconProps {
  size?: number;
  color?: string;
  opacity?: number;
  glowColor?: string;
  showX?: boolean;
  xProgress?: number;
}

export const BrainIcon: React.FC<BrainIconProps> = ({
  size = 120,
  color = "#007AFF",
  opacity = 1,
  glowColor,
  showX = false,
  xProgress = 0,
}) => {
  const s = size / 120;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      style={{ opacity }}
    >
      {glowColor && (
        <defs>
          <filter id="brain-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor={glowColor} floodOpacity="0.4" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <g
        transform={`translate(60, 60) scale(${s})`}
        filter={glowColor ? "url(#brain-glow)" : undefined}
      >
        {/* Brain outline - left hemisphere */}
        <path
          d="M-5,-35 C-25,-35 -40,-20 -40,-5 C-40,5 -35,12 -28,16 C-32,22 -30,32 -20,36 C-15,38 -8,36 -5,32"
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Brain outline - right hemisphere */}
        <path
          d="M5,-35 C25,-35 40,-20 40,-5 C40,5 35,12 28,16 C32,22 30,32 20,36 C15,38 8,36 5,32"
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Brain stem */}
        <path
          d="M-5,32 C-5,38 5,38 5,32"
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* Center divider */}
        <line
          x1={0}
          y1={-30}
          x2={0}
          y2={28}
          stroke={color}
          strokeWidth={2}
          opacity={0.5}
        />
        {/* Brain folds - left */}
        <path
          d="M-8,-20 C-20,-18 -28,-8 -20,0"
          fill="none"
          stroke={color}
          strokeWidth={2}
          opacity={0.6}
        />
        <path
          d="M-8,0 C-18,5 -25,15 -18,22"
          fill="none"
          stroke={color}
          strokeWidth={2}
          opacity={0.6}
        />
        {/* Brain folds - right */}
        <path
          d="M8,-20 C20,-18 28,-8 20,0"
          fill="none"
          stroke={color}
          strokeWidth={2}
          opacity={0.6}
        />
        <path
          d="M8,0 C18,5 25,15 18,22"
          fill="none"
          stroke={color}
          strokeWidth={2}
          opacity={0.6}
        />
      </g>

      {/* X mark overlay */}
      {showX && xProgress > 0 && (
        <g opacity={xProgress}>
          <line
            x1={30}
            y1={30}
            x2={30 + 60 * xProgress}
            y2={30 + 60 * xProgress}
            stroke="#FF453A"
            strokeWidth={6}
            strokeLinecap="round"
          />
          <line
            x1={90}
            y1={30}
            x2={90 - 60 * xProgress}
            y2={30 + 60 * xProgress}
            stroke="#FF453A"
            strokeWidth={6}
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
};
