import React from "react";

interface USBCPortProps {
  size?: number;
  color?: string;
  opacity?: number;
  glowIntensity?: number;
}

export const USBCPort: React.FC<USBCPortProps> = ({
  size = 160,
  color = "#007AFF",
  opacity = 1,
  glowIntensity = 0,
}) => {
  const w = size;
  const h = size * 0.5;

  return (
    <svg width={w} height={h} viewBox="0 0 160 80" style={{ opacity }}>
      {glowIntensity > 0 && (
        <defs>
          <filter id="usbc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feFlood floodColor={color} floodOpacity={glowIntensity * 0.5} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      {/* Outer shape - USB-C rounded rectangle */}
      <rect
        x="20"
        y="15"
        width="120"
        height="50"
        rx="25"
        fill="none"
        stroke={color}
        strokeWidth="3"
        filter={glowIntensity > 0 ? "url(#usbc-glow)" : undefined}
      />
      {/* Inner connector shape */}
      <rect
        x="40"
        y="28"
        width="80"
        height="24"
        rx="12"
        fill={color}
        opacity={0.2}
      />
      {/* Contact pins */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={52 + i * 10}
          y={34}
          width={4}
          height={12}
          rx={2}
          fill={color}
          opacity={0.6}
        />
      ))}
      {/* USB-C label */}
      <text
        x="80"
        y="78"
        textAnchor="middle"
        fill={color}
        fontSize="10"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="600"
        opacity={0.6}
      >
        USB-C
      </text>
    </svg>
  );
};
