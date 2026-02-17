import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { COLORS, SEGMENTS, SPRINGS } from "../utils/constants";
import { SVGFilters } from "../utils/filters";
import { SendArrow } from "../components/SendArrow";
import { ComputeDevice } from "../components/ComputeDevice";
import { easeOut, appleInterpolate } from "../utils/animations";

// Segment 2 (90–240f | 3–8s) — Message → Compute
// Visual: Message bubble slides left, send arrow detaches and accelerates
// Transformation: Bubble morphs → ComputeDevice with realistic fills

export const Segment2MessageCompute: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const { start, end } = SEGMENTS.MESSAGE_COMPUTE;
  const localFrame = frame - start;

  const centerX = width / 2;
  const centerY = height / 2;

  // Phase 1: Arrow detaches and accelerates (0-60 local frames)
  const arrowProgress = interpolate(localFrame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const arrowX = interpolate(arrowProgress, [0, 0.3, 1], [0, 50, 400]);
  const arrowOpacity = interpolate(arrowProgress, [0.6, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowGlow = interpolate(arrowProgress, [0, 0.3, 0.6], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Bubble slides left and transforms (20-140 local frames)
  const bubbleSlide = interpolate(localFrame, [20, 80], [0, -180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // Bubble to compute device morph
  const morphProgress = interpolate(localFrame, [40, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dimensions morphing
  const deviceWidth = interpolate(morphProgress, [0, 1], [220, 280]);
  const deviceHeight = interpolate(morphProgress, [0, 1], [55, 70]);
  const cornerRadius = interpolate(morphProgress, [0, 1], [22, 12]);

  // Bubble tail fades
  const tailOpacity = interpolate(localFrame, [20, 50], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Device features appear
  const portExtension = interpolate(localFrame, [90, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(localFrame, [100, 140], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ledActive = localFrame > 120;

  // Spring settle for device
  const settleSpring = spring({
    frame: Math.max(0, localFrame - 80),
    fps,
    config: SPRINGS.organic,
  });

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: COLORS.background }}
    >
      <SVGFilters />

      {/* Send arrow (detaching and flying) */}
      {arrowOpacity > 0 && (
        <SendArrow
          x={centerX + arrowX + 130}
          y={centerY - 12}
          opacity={arrowOpacity}
          glowIntensity={arrowGlow}
          scale={1 + arrowProgress * 0.2}
        />
      )}

      {/* Morphing bubble → compute device */}
      <g transform={`translate(${centerX + bubbleSlide}, ${centerY})`}>
        {morphProgress < 0.6 ? (
          // Message bubble phase
          <g>
            {/* Shadow */}
            <rect
              x={-deviceWidth / 2}
              y={-deviceHeight / 2}
              width={deviceWidth}
              height={deviceHeight}
              rx={cornerRadius}
              fill="url(#gradient-blue)"
              filter="url(#shadow-md)"
            />

            {/* Main bubble */}
            <rect
              x={-deviceWidth / 2}
              y={-deviceHeight / 2}
              width={deviceWidth}
              height={deviceHeight}
              rx={cornerRadius}
              fill="url(#gradient-blue)"
            />

            {/* Highlight */}
            <rect
              x={-deviceWidth / 2}
              y={-deviceHeight / 2}
              width={deviceWidth}
              height={deviceHeight * 0.35}
              rx={cornerRadius}
              fill="url(#gradient-surface)"
              opacity={0.15 * (1 - morphProgress)}
            />

            {/* Tail fading */}
            {tailOpacity > 0 && (
              <path
                d={`M ${deviceWidth / 2 - 30} ${deviceHeight / 2}
                    Q ${deviceWidth / 2 - 12} ${deviceHeight / 2 + 10} ${deviceWidth / 2 - 2} ${deviceHeight / 2 + 20}
                    Q ${deviceWidth / 2 - 25} ${deviceHeight / 2 + 6} ${deviceWidth / 2 - 45} ${deviceHeight / 2}`}
                fill="url(#gradient-blue)"
                opacity={tailOpacity}
              />
            )}

            {/* Typing dots fading */}
            <g opacity={1 - morphProgress * 2}>
              <circle cx={-20} cy={0} r={4} fill={COLORS.white} opacity={0.9} />
              <circle cx={0} cy={0} r={4} fill={COLORS.white} opacity={0.7} />
              <circle cx={20} cy={0} r={4} fill={COLORS.white} opacity={0.5} />
            </g>
          </g>
        ) : (
          // Compute device phase
          <ComputeDevice
            x={-deviceWidth / 2}
            y={-deviceHeight / 2}
            width={deviceWidth}
            height={deviceHeight}
            opacity={1}
            cornerSharpness={morphProgress}
            portExtension={portExtension}
            glowIntensity={glowIntensity}
            shadowOpacity={0.5}
            ledActive={ledActive}
          />
        )}
      </g>
    </svg>
  );
};
