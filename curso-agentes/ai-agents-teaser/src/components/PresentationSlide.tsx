import React from "react";
import { COLORS, DIMENSIONS, TYPOGRAPHY } from "../utils/constants";

interface PresentationSlideProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
  rotation?: number;
  zOffset?: number;
  slideIndex?: number;
  isActive?: boolean;
  showChrome?: boolean;
}

// Keynote-quality presentation slide
export const PresentationSlide: React.FC<PresentationSlideProps> = ({
  x = 0,
  y = 0,
  width = 480,
  height = 270, // 16:9 aspect ratio
  opacity = 1,
  scale = 1,
  rotation = 0,
  zOffset = 0,
  slideIndex = 0,
  isActive = false,
  showChrome = false,
}) => {
  // Vary content based on slide index for visual interest
  const contentVariant = slideIndex % 4;

  // Slide titles
  const titles = [
    "AI Agent Overview",
    "How It Works",
    "Performance Metrics",
    "Key Benefits",
  ];

  return (
    <g
      transform={`translate(${x + zOffset * 2}, ${y + zOffset}) scale(${scale}) rotate(${rotation})`}
      opacity={opacity}
    >
      {/* Slide shadow for depth */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={8}
        fill={COLORS.white}
        filter={isActive ? "url(#shadow-lg)" : "url(#shadow-md)"}
      />

      {/* Slide background */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={8}
        fill={COLORS.white}
        stroke={isActive ? COLORS.orange : "#E0E0E0"}
        strokeWidth={isActive ? 3 : 1}
      />

      {/* Clip content */}
      <clipPath id={`slide-clip-${slideIndex}`}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={8}
        />
      </clipPath>

      <g clipPath={`url(#slide-clip-${slideIndex})`}>
        {/* Title slide layout */}
        {contentVariant === 0 && (
          <g>
            {/* Gradient accent bar */}
            <rect
              x={0}
              y={0}
              width={width}
              height={8}
              fill="url(#gradient-orange)"
            />

            {/* Main title */}
            <text
              x={width / 2}
              y={height * 0.42}
              textAnchor="middle"
              fill={COLORS.darkText}
              fontSize={28}
              fontFamily={TYPOGRAPHY.fontFamily}
              fontWeight={TYPOGRAPHY.weights.bold}
            >
              {titles[slideIndex % titles.length]}
            </text>

            {/* Subtitle */}
            <text
              x={width / 2}
              y={height * 0.42 + 36}
              textAnchor="middle"
              fill={COLORS.lightText}
              fontSize={16}
              fontFamily={TYPOGRAPHY.fontFamily}
            >
              Transforming workflows with AI
            </text>

            {/* Decorative circles */}
            <circle cx={width * 0.2} cy={height * 0.75} r={30} fill={COLORS.orange} opacity={0.1} />
            <circle cx={width * 0.8} cy={height * 0.75} r={20} fill={COLORS.blue} opacity={0.1} />
          </g>
        )}

        {/* Two column layout */}
        {contentVariant === 1 && (
          <g>
            {/* Header */}
            <text
              x={32}
              y={40}
              fill={COLORS.darkText}
              fontSize={20}
              fontFamily={TYPOGRAPHY.fontFamily}
              fontWeight={TYPOGRAPHY.weights.semibold}
            >
              {titles[slideIndex % titles.length]}
            </text>

            {/* Left column - image placeholder */}
            <rect
              x={32}
              y={60}
              width={width * 0.4}
              height={height - 90}
              rx={8}
              fill="#F0F0F0"
            />
            <circle
              cx={32 + width * 0.2}
              cy={60 + (height - 90) / 2}
              r={40}
              fill={COLORS.blue}
              opacity={0.2}
            />
            <text
              x={32 + width * 0.2}
              y={60 + (height - 90) / 2 + 5}
              textAnchor="middle"
              fill={COLORS.blue}
              fontSize={24}
              fontFamily={TYPOGRAPHY.fontFamily}
            >
              🤖
            </text>

            {/* Right column - text */}
            <text x={width * 0.5 + 20} y={80} fill={COLORS.darkText} fontSize={14} fontFamily={TYPOGRAPHY.fontFamily} fontWeight={TYPOGRAPHY.weights.medium}>
              Key Features
            </text>
            {[
              "Automated task execution",
              "Natural language interface",
              "Real-time processing",
              "Seamless integrations",
            ].map((text, i) => (
              <g key={i} transform={`translate(${width * 0.5 + 20}, ${100 + i * 32})`}>
                <circle cx={6} cy={0} r={4} fill={COLORS.orange} />
                <text x={20} y={4} fill={COLORS.darkText} fontSize={12} fontFamily={TYPOGRAPHY.fontFamily}>
                  {text}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Chart layout */}
        {contentVariant === 2 && (
          <g>
            {/* Header */}
            <text
              x={32}
              y={40}
              fill={COLORS.darkText}
              fontSize={20}
              fontFamily={TYPOGRAPHY.fontFamily}
              fontWeight={TYPOGRAPHY.weights.semibold}
            >
              {titles[slideIndex % titles.length]}
            </text>

            {/* Bar chart */}
            <g transform={`translate(32, 70)`}>
              {[
                { label: "Speed", value: 0.85, gradient: "url(#gradient-chart-1)" },
                { label: "Accuracy", value: 0.92, gradient: "url(#gradient-chart-2)" },
                { label: "Efficiency", value: 0.78, gradient: "url(#gradient-chart-3)" },
                { label: "Savings", value: 0.65, gradient: "url(#gradient-orange)" },
              ].map((bar, i) => {
                const barWidth = (width - 100) * bar.value;
                const barY = i * 42;

                return (
                  <g key={i} transform={`translate(0, ${barY})`}>
                    {/* Label */}
                    <text
                      x={0}
                      y={16}
                      fill={COLORS.darkText}
                      fontSize={12}
                      fontFamily={TYPOGRAPHY.fontFamily}
                    >
                      {bar.label}
                    </text>
                    {/* Bar background */}
                    <rect
                      x={70}
                      y={4}
                      width={width - 140}
                      height={20}
                      rx={4}
                      fill="#F0F0F0"
                    />
                    {/* Bar fill */}
                    <rect
                      x={70}
                      y={4}
                      width={barWidth * 0.75}
                      height={20}
                      rx={4}
                      fill={bar.gradient}
                    />
                    {/* Percentage */}
                    <text
                      x={width - 60}
                      y={18}
                      fill={COLORS.darkText}
                      fontSize={12}
                      fontFamily={TYPOGRAPHY.monoFontFamily}
                      fontWeight={TYPOGRAPHY.weights.semibold}
                    >
                      {Math.round(bar.value * 100)}%
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
        )}

        {/* Bullet points layout */}
        {contentVariant === 3 && (
          <g>
            {/* Header with icon */}
            <rect
              x={24}
              y={20}
              width={40}
              height={40}
              rx={10}
              fill={COLORS.green}
            />
            <text
              x={44}
              y={48}
              textAnchor="middle"
              fill={COLORS.white}
              fontSize={20}
            >
              ✓
            </text>

            <text
              x={76}
              y={48}
              fill={COLORS.darkText}
              fontSize={20}
              fontFamily={TYPOGRAPHY.fontFamily}
              fontWeight={TYPOGRAPHY.weights.semibold}
            >
              {titles[slideIndex % titles.length]}
            </text>

            {/* Bullet points with checkmarks */}
            {[
              "Reduce manual tasks by 80%",
              "24/7 automated operations",
              "Instant response times",
              "Scalable architecture",
            ].map((text, i) => (
              <g key={i} transform={`translate(32, ${90 + i * 38})`}>
                <rect
                  x={0}
                  y={0}
                  width={width - 64}
                  height={32}
                  rx={6}
                  fill={i === 0 ? "#E8F5E9" : "#F5F5F5"}
                />
                <circle
                  cx={20}
                  cy={16}
                  r={10}
                  fill={i === 0 ? COLORS.green : COLORS.lightText}
                  opacity={i === 0 ? 1 : 0.3}
                />
                <text
                  x={20}
                  y={20}
                  textAnchor="middle"
                  fill={COLORS.white}
                  fontSize={12}
                >
                  ✓
                </text>
                <text
                  x={42}
                  y={20}
                  fill={COLORS.darkText}
                  fontSize={13}
                  fontFamily={TYPOGRAPHY.fontFamily}
                >
                  {text}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Slide number */}
        <text
          x={width - 20}
          y={height - 12}
          textAnchor="end"
          fill={COLORS.lightText}
          fontSize={11}
          fontFamily={TYPOGRAPHY.monoFontFamily}
        >
          {slideIndex + 1}
        </text>
      </g>
    </g>
  );
};

export default PresentationSlide;
