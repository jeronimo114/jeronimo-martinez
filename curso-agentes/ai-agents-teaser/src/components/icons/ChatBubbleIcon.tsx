import React from "react";

interface ChatBubbleIconProps {
  x?: number;
  y?: number;
  size?: number;
  opacity?: number;
  scale?: number;
}

// Blue gradient speech bubble with send arrow - iMessage style
export const ChatBubbleIcon: React.FC<ChatBubbleIconProps> = ({
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
      {/* Icon background with shadow */}
      <rect
        x={0}
        y={0}
        width={64}
        height={64}
        rx={14}
        fill="url(#gradient-blue)"
        filter="url(#shadow-md)"
      />

      {/* Speech bubble shape */}
      <g transform="translate(12, 14)">
        {/* Main bubble */}
        <path
          d="M4 0h32c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H12l-8 8v-8H4c-2.2 0-4-1.8-4-4V4c0-2.2 1.8-4 4-4z"
          fill="rgba(255,255,255,0.95)"
        />

        {/* Send arrow inside bubble */}
        <g transform="translate(14, 11)">
          <path
            d="M0 6h10l-4-4M10 6l-4 4"
            stroke="#0A84FF"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle
            cx={10}
            cy={6}
            r={1.5}
            fill="#0A84FF"
          />
        </g>
      </g>
    </g>
  );
};

export default ChatBubbleIcon;
