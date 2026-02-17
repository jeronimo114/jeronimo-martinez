import React from "react";

interface MemoryIconProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const MemoryIcon: React.FC<MemoryIconProps> = ({
  size = 60,
  color = "#007AFF",
  opacity = 1,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity }}>
      {/* Database cylinder */}
      <ellipse cx="30" cy="14" rx="20" ry="8" fill="none" stroke={color} strokeWidth="2.5" />
      <path
        d="M10,14 V42 C10,46.5 19,50 30,50 C41,50 50,46.5 50,42 V14"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      {/* Middle ring */}
      <path
        d="M10,28 C10,32.5 19,36 30,36 C41,36 50,32.5 50,28"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity={0.5}
      />
      {/* Data dots */}
      <circle cx="22" cy="22" r="2" fill={color} opacity="0.6" />
      <circle cx="30" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="38" cy="22" r="2" fill={color} opacity="0.6" />
    </svg>
  );
};
