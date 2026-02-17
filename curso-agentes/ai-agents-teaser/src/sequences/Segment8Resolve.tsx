import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from "remotion";
import { COLORS, SEGMENTS, SPRINGS, TYPOGRAPHY } from "../utils/constants";
import { SVGFilters } from "../utils/filters";
import { PresentationSlide } from "../components/PresentationSlide";

// Segment 8 (1140–1260f | 38–42s) — Resolve
// Visual: Presentation fades with subtle scale, elegant text appears
// Animation: Gentle spring on text, crisp typography, no scale on text

export const Segment8Resolve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const { start } = SEGMENTS.RESOLVE;
  const localFrame = frame - start;

  const centerX = width / 2;
  const centerY = height / 2;

  // Slide dimensions
  const slideWidth = 520;
  const slideHeight = 292;

  // Phase 1: Slide fades and scales down (0-60 local frames)
  const slideFadeProgress = interpolate(localFrame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.6, 1),
  });

  const slideScale = interpolate(slideFadeProgress, [0, 1], [1, 0.96]);
  const slideOpacity = interpolate(slideFadeProgress, [0, 1], [1, 0]);
  const slideBlur = interpolate(slideFadeProgress, [0.5, 1], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Text appears with spring (40-100 local frames)
  const textSpring = spring({
    frame: Math.max(0, localFrame - 40),
    fps,
    config: SPRINGS.gentle,
  });

  const textOpacity = interpolate(localFrame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle Y offset for text entrance
  const textY = interpolate(textSpring, [0, 1], [20, 0]);

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: COLORS.background }}
    >
      <SVGFilters />

      {/* Fading slide from previous segment */}
      {slideOpacity > 0 && (
        <g
          transform={`translate(${centerX}, ${centerY}) scale(${slideScale})`}
          opacity={slideOpacity}
          style={{ filter: slideBlur > 0 ? `blur(${slideBlur}px)` : undefined }}
        >
          <PresentationSlide
            x={-slideWidth / 2}
            y={-slideHeight / 2}
            width={slideWidth}
            height={slideHeight}
            slideIndex={0}
            isActive={false}
            scale={1}
          />
        </g>
      )}

      {/* Final text message */}
      {textOpacity > 0 && (
        <g
          transform={`translate(${centerX}, ${centerY + textY})`}
          opacity={textOpacity * textSpring}
        >
          {/* Main text - stays perfectly sharp */}
          <text
            x={0}
            y={0}
            fill={COLORS.darkText}
            fontSize={44}
            fontFamily={TYPOGRAPHY.fontFamily}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontVariantNumeric: TYPOGRAPHY.fontVariantNumeric,
              letterSpacing: "-0.02em",
            }}
          >
            This is what AI agents do.
          </text>

          {/* Subtle underline accent */}
          <line
            x1={-120}
            y1={35}
            x2={120}
            y2={35}
            stroke={COLORS.blue}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={interpolate(textSpring, [0.7, 1], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </g>
      )}
    </svg>
  );
};
