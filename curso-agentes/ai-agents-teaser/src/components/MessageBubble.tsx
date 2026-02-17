import React from "react";
import { COLORS } from "../utils/constants";

interface MessageBubbleProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  cornerRadius?: number;
  opacity?: number;
  showTail?: boolean;
  text?: string;
  morphToBox?: number;  // 0 = bubble, 1 = compute box shape
}

// iMessage-style blue gradient bubble
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  x = 0,
  y = 0,
  width = 200,
  height = 60,
  cornerRadius = 20,
  opacity = 1,
  showTail = true,
  text = "",
  morphToBox = 0,
}) => {
  // Interpolate corner radius based on morph
  const currentRadius = cornerRadius * (1 - morphToBox * 0.6);

  // Tail size decreases as we morph
  const tailOpacity = Math.max(0, 1 - morphToBox * 2);

  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      {/* Shadow */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={currentRadius}
        fill="url(#gradient-blue)"
        filter="url(#shadow-md)"
      />

      {/* Main bubble */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={currentRadius}
        fill="url(#gradient-blue)"
      />

      {/* Gradient overlay for depth */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height * 0.4}
        rx={currentRadius}
        fill="url(#gradient-surface)"
        opacity={0.15}
      />

      {/* Tail */}
      {showTail && tailOpacity > 0 && (
        <g opacity={tailOpacity}>
          <path
            d={`M ${width - 30} ${height}
                Q ${width - 15} ${height + 8} ${width - 5} ${height + 18}
                Q ${width - 25} ${height + 5} ${width - 40} ${height}`}
            fill="url(#gradient-blue)"
          />
        </g>
      )}

      {/* Text content */}
      {text && (
        <text
          x={width / 2}
          y={height / 2 + 5}
          textAnchor="middle"
          fill={COLORS.white}
          fontSize={16}
          fontFamily='-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          fontWeight={500}
        >
          {text}
        </text>
      )}

      {/* Typing indicator dots */}
      {!text && width > 100 && (
        <g transform={`translate(${width / 2 - 20}, ${height / 2})`}>
          <circle cx={0} cy={0} r={4} fill={COLORS.white} opacity={0.9} />
          <circle cx={16} cy={0} r={4} fill={COLORS.white} opacity={0.7} />
          <circle cx={32} cy={0} r={4} fill={COLORS.white} opacity={0.5} />
        </g>
      )}
    </g>
  );
};

export default MessageBubble;
