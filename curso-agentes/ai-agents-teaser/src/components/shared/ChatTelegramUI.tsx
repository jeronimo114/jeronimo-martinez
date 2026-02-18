import React from "react";
import { COLORS, SHOWCASE_COLORS } from "../../utils/constants";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface Message {
  role: "user" | "bot";
  text: string;
  timestamp?: string;
}

interface ChatTelegramUIProps {
  messages: Message[];
  activeMessageIndex?: number;
  colors: typeof SHOWCASE_COLORS[keyof typeof SHOWCASE_COLORS];
  title: string;
  subtitle: string;
}

export const ChatTelegramUI: React.FC<ChatTelegramUIProps> = ({
  messages,
  activeMessageIndex = -1,
  colors,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <g>
      {/* Background */}
      <rect
        x={0}
        y={0}
        width={1920}
        height={1080}
        fill={COLORS.background}
      />

      {/* Header */}
      <rect
        x={0}
        y={0}
        width={1920}
        height={80}
        fill={COLORS.surface}
      />
      <text
        x={50}
        y={50}
        fill={COLORS.text}
        fontSize={24}
        fontWeight={600}
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
      >
        {title}
      </text>
      <text
        x={50}
        y={75}
        fill={COLORS.textSecondary}
        fontSize={16}
        fontWeight={400}
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
      >
        {subtitle}
      </text>

      {/* Chat container */}
      <g transform={`translate(50, 120)`}>
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          const isActive = index === activeMessageIndex;
          const delay = index * 30; // 1 second delay between messages
          const messageFrame = Math.max(0, frame - delay);
          
          const opacity = interpolate(messageFrame, [0, 15], [0, 1]);
          const y = index * 80;
          
          // Typing indicator animation
          const typingScale = isActive
            ? interpolate(
                messageFrame % 30,
                [0, 15, 30],
                [1, 1.1, 1]
              )
            : 1;

          return (
            <g key={index} opacity={opacity} transform={`translate(${isUser ? 700 : 0}, ${y})`}>
              {/* Message bubble */}
              <rect
                x={0}
                y={0}
                width={isUser ? 300 : 620}
                height={60}
                rx={12}
                fill={isUser ? colors.primary : COLORS.surfaceLight}
              />

              {/* Message text */}
              <text
                x={isUser ? 150 : 20}
                y={35}
                fill={isUser ? COLORS.white : COLORS.text}
                fontSize={18}
                fontWeight={400}
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                textAnchor={isUser ? "middle" : "start"}
              >
                {msg.text}
              </text>

              {/* Typing indicator dots for bot */}
              {isActive && msg.role === "bot" && (
                <g transform={`translate(20, 35)`} transform={`scale(${typingScale})`}>
                  <circle cx={0} cy={0} r={5} fill={COLORS.textDim} />
                  <circle cx={20} cy={0} r={5} fill={COLORS.textDim} opacity={0.7} />
                  <circle cx={40} cy={0} r={5} fill={COLORS.textDim} opacity={0.4} />
                </g>
              )}

              {/* Timestamp */}
              {msg.timestamp && (
                <text
                  x={isUser ? 280 : 580}
                  y={52}
                  fill={isUser ? COLORS.white : COLORS.textDim}
                  fontSize={12}
                  fontWeight={400}
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                  textAnchor="end"
                >
                  {msg.timestamp}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

export default ChatTelegramUI;
