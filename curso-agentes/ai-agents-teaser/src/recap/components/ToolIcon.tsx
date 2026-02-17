import React from "react";

interface ToolIconProps {
  icon: "globe" | "email" | "database" | "terminal" | "document" | "calendar";
  size?: number;
  color?: string;
  opacity?: number;
}

export const ToolIcon: React.FC<ToolIconProps> = ({
  icon,
  size = 40,
  color = "#007AFF",
  opacity = 1,
}) => {
  const paths: Record<string, React.ReactNode> = {
    globe: (
      <>
        <circle cx="20" cy="20" r="16" fill="none" stroke={color} strokeWidth="2" />
        <ellipse cx="20" cy="20" rx="8" ry="16" fill="none" stroke={color} strokeWidth="1.5" />
        <line x1="4" y1="20" x2="36" y2="20" stroke={color} strokeWidth="1.5" />
        <line x1="20" y1="4" x2="20" y2="36" stroke={color} strokeWidth="1.5" />
      </>
    ),
    email: (
      <>
        <rect x="4" y="8" width="32" height="24" rx="3" fill="none" stroke={color} strokeWidth="2" />
        <path d="M4,8 L20,22 L36,8" fill="none" stroke={color} strokeWidth="2" />
      </>
    ),
    database: (
      <>
        <ellipse cx="20" cy="10" rx="14" ry="5" fill="none" stroke={color} strokeWidth="2" />
        <path d="M6,10 V26 C6,29 12,31 20,31 C28,31 34,29 34,26 V10" fill="none" stroke={color} strokeWidth="2" />
        <path d="M6,18 C6,21 12,23 20,23 C28,23 34,21 34,18" fill="none" stroke={color} strokeWidth="1.5" />
      </>
    ),
    terminal: (
      <>
        <rect x="4" y="6" width="32" height="28" rx="4" fill="none" stroke={color} strokeWidth="2" />
        <path d="M10,16 L16,20 L10,24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="24" x2="28" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    document: (
      <>
        <path d="M10,4 H26 L32,10 V34 C32,35 31,36 30,36 H10 C9,36 8,35 8,34 V6 C8,5 9,4 10,4 Z" fill="none" stroke={color} strokeWidth="2" />
        <path d="M26,4 V10 H32" fill="none" stroke={color} strokeWidth="2" />
        <line x1="14" y1="18" x2="26" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="24" x2="22" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="8" width="32" height="28" rx="3" fill="none" stroke={color} strokeWidth="2" />
        <line x1="4" y1="16" x2="36" y2="16" stroke={color} strokeWidth="2" />
        <line x1="12" y1="4" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="4" x2="28" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <rect x="10" y="20" width="5" height="4" rx="1" fill={color} opacity="0.5" />
        <rect x="18" y="20" width="5" height="4" rx="1" fill={color} opacity="0.5" />
        <rect x="26" y="20" width="5" height="4" rx="1" fill={color} opacity="0.5" />
        <rect x="10" y="28" width="5" height="4" rx="1" fill={color} opacity="0.5" />
      </>
    ),
  };

  const scale = size / 40;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }}>
      {paths[icon]}
    </svg>
  );
};
