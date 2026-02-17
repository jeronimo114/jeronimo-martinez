import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, SEGMENTS, SPRINGS } from "../utils/constants";
import { SVGFilters } from "../utils/filters";
import { Cursor } from "../components/Cursor";
import { appleInterpolate, cursorBlink } from "../utils/animations";

// Segment 1 (0–90f | 0–3s) — Intent
// Visual: Sleek cursor with glow blinks, types "Build something" text
// Transformation: Cursor stretches → iMessage-style blue gradient bubble

export const Segment1Intent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const { start, end } = SEGMENTS.INTENT;

  const centerX = width / 2;
  const centerY = height / 2;

  // Phase 1: Blinking cursor (0-45f)
  const blinkPhase = frame < 45;
  const blinkOpacity = blinkPhase ? cursorBlink(frame, fps) : 1;

  // Phase 2: Type text (35-55f)
  const typeProgress = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textToType = "Build something";
  const visibleChars = Math.floor(typeProgress * textToType.length);
  const visibleText = textToType.substring(0, visibleChars);

  // Phase 3: Text fades, cursor stretches to bubble (50-90f)
  const stretchProgress = interpolate(frame, [55, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth spring for the stretch
  const stretchSpring = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: SPRINGS.organic,
  });

  const cursorWidth = interpolate(stretchSpring * stretchProgress, [0, 1], [3, 220]);
  const cursorHeight = interpolate(stretchSpring * stretchProgress, [0, 1], [32, 55]);
  const cornerRadius = interpolate(stretchProgress, [0, 1], [1.5, 22]);

  // Glow intensity
  const glowIntensity = interpolate(stretchProgress, [0, 0.5], [0.5, 0], {
    extrapolateRight: "clamp",
  });

  // Text opacity fades as bubble forms
  const textOpacity = interpolate(stretchProgress, [0, 0.3], [1, 0], {
    extrapolateRight: "clamp",
  });

  // Tail appears at end
  const tailOpacity = interpolate(stretchProgress, [0.7, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bubble uses gradient when fully formed
  const usesGradient = stretchProgress > 0.5;

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: COLORS.background }}
    >
      <SVGFilters />

      <g transform={`translate(${centerX}, ${centerY})`}>
        {/* Typed text (fading) */}
        {typeProgress > 0 && textOpacity > 0 && (
          <text
            x={-cursorWidth / 2 - 8}
            y={6}
            fill={COLORS.darkText}
            fontSize={18}
            fontFamily='-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            fontWeight={500}
            textAnchor="end"
            opacity={textOpacity}
          >
            {visibleText}
          </text>
        )}

        {/* Morphing cursor → bubble */}
        {stretchProgress < 0.5 ? (
          // Cursor phase
          <Cursor
            x={-cursorWidth / 2}
            y={-cursorHeight / 2}
            width={cursorWidth}
            height={cursorHeight}
            opacity={blinkOpacity}
            glowIntensity={glowIntensity}
          />
        ) : (
          // Bubble phase
          <g opacity={1}>
            {/* Shadow */}
            <rect
              x={-cursorWidth / 2}
              y={-cursorHeight / 2}
              width={cursorWidth}
              height={cursorHeight}
              rx={cornerRadius}
              fill="url(#gradient-blue)"
              filter="url(#shadow-md)"
            />

            {/* Main bubble */}
            <rect
              x={-cursorWidth / 2}
              y={-cursorHeight / 2}
              width={cursorWidth}
              height={cursorHeight}
              rx={cornerRadius}
              fill="url(#gradient-blue)"
            />

            {/* Top highlight */}
            <rect
              x={-cursorWidth / 2}
              y={-cursorHeight / 2}
              width={cursorWidth}
              height={cursorHeight * 0.35}
              rx={cornerRadius}
              fill="url(#gradient-surface)"
              opacity={0.15}
            />

            {/* Message tail (iMessage style) */}
            {tailOpacity > 0 && (
              <path
                d={`M ${cursorWidth / 2 - 30} ${cursorHeight / 2}
                    Q ${cursorWidth / 2 - 12} ${cursorHeight / 2 + 10} ${cursorWidth / 2 - 2} ${cursorHeight / 2 + 20}
                    Q ${cursorWidth / 2 - 25} ${cursorHeight / 2 + 6} ${cursorWidth / 2 - 45} ${cursorHeight / 2}`}
                fill="url(#gradient-blue)"
                opacity={tailOpacity}
              />
            )}

            {/* Typing indicator dots */}
            {stretchProgress > 0.85 && (
              <g transform={`translate(0, 0)`} opacity={interpolate(stretchProgress, [0.85, 1], [0, 1])}>
                <circle cx={-20} cy={0} r={4} fill={COLORS.white} opacity={0.9} />
                <circle cx={0} cy={0} r={4} fill={COLORS.white} opacity={0.7} />
                <circle cx={20} cy={0} r={4} fill={COLORS.white} opacity={0.5} />
              </g>
            )}
          </g>
        )}
      </g>
    </svg>
  );
};
