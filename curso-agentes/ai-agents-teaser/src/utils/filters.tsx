import React from "react";

// SVG Filter definitions for realistic shadows and effects
export const SVGFilters: React.FC = () => (
  <defs>
    {/* Large elevated shadow - for floating windows */}
    <filter id="shadow-lg" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000" floodOpacity="0.15" />
      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.08" />
    </filter>

    {/* Medium shadow - for cards and components */}
    <filter id="shadow-md" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.12" />
      <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.06" />
    </filter>

    {/* Small shadow - for buttons and small elements */}
    <filter id="shadow-sm" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
    </filter>

    {/* Glow effects */}
    <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feFlood floodColor="#0071E3" floodOpacity="0.6" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feFlood floodColor="#30D158" floodOpacity="0.5" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Blue gradient for chat bubble */}
    <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0A84FF" />
      <stop offset="100%" stopColor="#0066CC" />
    </linearGradient>

    {/* Blue accent gradient */}
    <linearGradient id="gradient-blue-accent" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#0071E3" />
      <stop offset="100%" stopColor="#0058B0" />
    </linearGradient>

    {/* Surface gradient for depth */}
    <linearGradient id="gradient-surface" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#F5F5F7" />
    </linearGradient>

    {/* Dark surface gradient for code editor */}
    <linearGradient id="gradient-dark-surface" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#2D2D2D" />
      <stop offset="100%" stopColor="#1E1E1E" />
    </linearGradient>

    {/* Space gray gradient for compute device */}
    <linearGradient id="gradient-space-gray" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#8E8E93" />
      <stop offset="50%" stopColor="#636366" />
      <stop offset="100%" stopColor="#48484A" />
    </linearGradient>

    {/* Aluminum gradient */}
    <linearGradient id="gradient-aluminum" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#E5E5EA" />
      <stop offset="50%" stopColor="#D1D1D6" />
      <stop offset="100%" stopColor="#C7C7CC" />
    </linearGradient>

    {/* Green gradient for spreadsheet */}
    <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#34C759" />
      <stop offset="100%" stopColor="#248A3D" />
    </linearGradient>

    {/* Orange gradient for presentation */}
    <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FF9500" />
      <stop offset="100%" stopColor="#FF6B00" />
    </linearGradient>

    {/* Purple gradient for dashboard */}
    <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#BF5AF2" />
      <stop offset="100%" stopColor="#9850D2" />
    </linearGradient>

    {/* Robot eye glow */}
    <radialGradient id="gradient-robot-eye" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="40%" stopColor="#5AC8FA" />
      <stop offset="100%" stopColor="#0071E3" />
    </radialGradient>

    {/* Chart bar gradients */}
    <linearGradient id="gradient-chart-1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#0071E3" />
      <stop offset="100%" stopColor="#5AC8FA" />
    </linearGradient>

    <linearGradient id="gradient-chart-2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#30D158" />
      <stop offset="100%" stopColor="#63E085" />
    </linearGradient>

    <linearGradient id="gradient-chart-3" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stopColor="#FF9F0A" />
      <stop offset="100%" stopColor="#FFB340" />
    </linearGradient>

    {/* Fade gradients for expansion effects */}
    <linearGradient id="fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#F5F5F7" stopOpacity="0" />
      <stop offset="100%" stopColor="#F5F5F7" stopOpacity="1" />
    </linearGradient>

    <linearGradient id="fade-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#F5F5F7" stopOpacity="0" />
      <stop offset="100%" stopColor="#F5F5F7" stopOpacity="1" />
    </linearGradient>

    {/* Title bar gradient */}
    <linearGradient id="gradient-titlebar" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#E8E8E8" />
      <stop offset="100%" stopColor="#D0D0D0" />
    </linearGradient>

    {/* Dark title bar gradient */}
    <linearGradient id="gradient-titlebar-dark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#3D3D3D" />
      <stop offset="100%" stopColor="#323232" />
    </linearGradient>
  </defs>
);

export default SVGFilters;
