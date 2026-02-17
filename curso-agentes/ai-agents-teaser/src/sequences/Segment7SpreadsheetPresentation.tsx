import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from "remotion";
import { COLORS, SEGMENTS, SPRINGS, DIMENSIONS, TYPOGRAPHY } from "../utils/constants";
import { SVGFilters } from "../utils/filters";
import { PresentationSlide } from "../components/PresentationSlide";

// Segment 7 (900–1140f | 30–38s) — Spreadsheet → Presentation
// Visual: Highlighted cell zooms forward, becomes 16:9 Keynote slide
// Transformation: Slide duplicates, accordion/flipbook effect with depth
// Animation: Extreme speed, motion blur, ends with single slide centered

export const Segment7SpreadsheetPresentation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const { start } = SEGMENTS.SPREADSHEET_PRESENTATION;
  const localFrame = frame - start;

  const centerX = width / 2;
  const centerY = height / 2;

  // Slide dimensions (16:9)
  const slideWidth = 520;
  const slideHeight = 292;

  // Phase 1: Cell zooms forward (0-60 local frames)
  const zoomProgress = interpolate(localFrame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // Cell/slide dimensions morphing
  const cellWidth = interpolate(zoomProgress, [0, 1], [75, slideWidth]);
  const cellHeight = interpolate(zoomProgress, [0, 1], [28, slideHeight]);

  // Phase 2: Slides duplicate and stack (50-100 local frames)
  const duplicateProgress = interpolate(localFrame, [50, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Flipbook effect (90-200 local frames)
  const flipbookProgress = interpolate(localFrame, [90, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0.4, 1),
  });

  // Phase 4: Final slide snaps to center (190-240 local frames)
  const snapProgress = interpolate(localFrame, [190, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0, 0, 0.2, 1),
  });

  // Spring for final snap
  const snapSpring = spring({
    frame: Math.max(0, localFrame - 200),
    fps,
    config: SPRINGS.snappy,
  });

  const numSlides = 8;
  const currentSlideIndex = Math.floor(flipbookProgress * (numSlides - 1));

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: COLORS.background }}
    >
      <SVGFilters />

      {/* Zooming cell becoming first slide */}
      {zoomProgress < 1 && duplicateProgress < 0.3 && (
        <g transform={`translate(${centerX - cellWidth / 2}, ${centerY - cellHeight / 2})`}>
          {/* Shadow grows with zoom */}
          <rect
            x={0}
            y={0}
            width={cellWidth}
            height={cellHeight}
            rx={interpolate(zoomProgress, [0, 1], [0, 8])}
            fill={COLORS.white}
            filter={zoomProgress > 0.3 ? "url(#shadow-lg)" : "url(#shadow-sm)"}
          />

          {/* Cell border becoming slide border */}
          <rect
            x={0}
            y={0}
            width={cellWidth}
            height={cellHeight}
            rx={interpolate(zoomProgress, [0, 1], [0, 8])}
            fill={COLORS.white}
            stroke={interpolate(zoomProgress, [0, 0.5], [1, 0]) > 0.5 ? COLORS.green : "#E0E0E0"}
            strokeWidth={interpolate(zoomProgress, [0, 1], [2.5, 1])}
          />

          {/* Cell content fading */}
          {zoomProgress < 0.4 && (
            <text
              x={cellWidth / 2}
              y={cellHeight / 2 + 4}
              textAnchor="middle"
              fill={COLORS.darkText}
              fontSize={12}
              fontFamily={TYPOGRAPHY.monoFontFamily}
              opacity={1 - zoomProgress * 2.5}
            >
              2,198
            </text>
          )}

          {/* Slide content appearing */}
          {zoomProgress > 0.5 && (
            <g opacity={(zoomProgress - 0.5) * 2}>
              {/* Gradient accent bar */}
              <rect x={0} y={0} width={cellWidth} height={8} rx={8} fill="url(#gradient-orange)" />

              {/* Title */}
              <text
                x={cellWidth / 2}
                y={cellHeight * 0.42}
                textAnchor="middle"
                fill={COLORS.darkText}
                fontSize={interpolate(zoomProgress, [0.5, 1], [14, 28])}
                fontFamily={TYPOGRAPHY.fontFamily}
                fontWeight={700}
              >
                AI Agent Overview
              </text>

              {/* Subtitle */}
              <text
                x={cellWidth / 2}
                y={cellHeight * 0.42 + interpolate(zoomProgress, [0.5, 1], [18, 36])}
                textAnchor="middle"
                fill={COLORS.lightText}
                fontSize={interpolate(zoomProgress, [0.5, 1], [10, 16])}
                fontFamily={TYPOGRAPHY.fontFamily}
              >
                Transforming workflows with AI
              </text>
            </g>
          )}
        </g>
      )}

      {/* Flipbook effect with multiple slides */}
      {duplicateProgress > 0 && snapProgress < 1 && (
        <g transform={`translate(${centerX}, ${centerY})`}>
          {Array.from({ length: numSlides }).map((_, index) => {
            const relativeIndex = index - currentSlideIndex;
            const isVisible = Math.abs(relativeIndex) <= 3;

            if (!isVisible) return null;

            // Position and depth calculations
            const zDepth = relativeIndex * 35;
            const xOffset = relativeIndex * 60 * (1 - snapProgress * snapSpring);
            const yOffset = relativeIndex * 8 * (1 - snapProgress * snapSpring);
            const slideScale = 1 - Math.abs(relativeIndex) * 0.06 * (1 - snapProgress * snapSpring);
            const rotationY = relativeIndex * 5 * (1 - snapProgress * snapSpring);

            // Opacity based on position
            const slideOpacity = index === numSlides - 1 && snapProgress > 0.5
              ? 1
              : Math.max(0.2, 1 - Math.abs(relativeIndex) * 0.3);

            // Motion blur effect (horizontal stretch)
            const isFlipping = flipbookProgress > 0.2 && flipbookProgress < 0.85;
            const motionStretch = isFlipping && Math.abs(relativeIndex) === 0 ? 1.015 : 1;

            return (
              <g
                key={index}
                transform={`translate(${xOffset + zDepth * 0.4}, ${yOffset + zDepth * 0.15}) scale(${slideScale * motionStretch}, ${slideScale})`}
                opacity={slideOpacity * duplicateProgress}
              >
                <PresentationSlide
                  x={-slideWidth / 2}
                  y={-slideHeight / 2}
                  width={slideWidth}
                  height={slideHeight}
                  slideIndex={index}
                  isActive={index === numSlides - 1 && snapProgress > 0.5}
                  zOffset={Math.abs(relativeIndex) * 4}
                />
              </g>
            );
          })}
        </g>
      )}

      {/* Final centered slide */}
      {snapProgress >= 1 && (
        <g transform={`translate(${centerX}, ${centerY})`}>
          <PresentationSlide
            x={-slideWidth / 2}
            y={-slideHeight / 2}
            width={slideWidth}
            height={slideHeight}
            slideIndex={0}
            isActive={true}
            scale={1}
          />
        </g>
      )}
    </svg>
  );
};
