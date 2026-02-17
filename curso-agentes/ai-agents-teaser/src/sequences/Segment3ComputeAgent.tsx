import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, SEGMENTS, SPRINGS } from "../utils/constants";
import { SVGFilters } from "../utils/filters";
import { ComputeDevice } from "../components/ComputeDevice";
import { RobotAgent } from "../components/RobotAgent";
import { idleRotation, blinkAnimation, idleBreathing } from "../utils/animations";

// Segment 3 (240–360f | 8–12s) — Compute → Agent
// Visual: ComputeDevice seams glow blue, panels split, transforms into friendly Robot
// Animation: Mechanical open → organic settle → idle micro-animations

export const Segment3ComputeAgent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const { start, end } = SEGMENTS.COMPUTE_AGENT;
  const localFrame = frame - start;

  const centerX = width / 2 - 180; // Keep position from previous segment
  const centerY = height / 2;

  // Phase 1: Glow intensifies (0-30 local frames)
  const glowIntensity = interpolate(localFrame, [0, 30], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Panels split (25-65 local frames)
  const splitProgress = interpolate(localFrame, [25, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Morph to robot (50-100 local frames)
  const morphProgress = interpolate(localFrame, [50, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spring settle for organic feel
  const settleSpring = spring({
    frame: Math.max(0, localFrame - 80),
    fps,
    config: SPRINGS.gentle,
  });

  // Idle animations after settling
  const isSettled = localFrame > 100;
  const idleRot = isSettled ? idleRotation(localFrame - 100, 0.8) : 0;
  const eyeBlink = isSettled ? blinkAnimation(localFrame - 100) : 1;
  const breathe = isSettled ? idleBreathing(localFrame - 100, 0.015) : 1;
  const antennaWiggle = isSettled ? Math.sin((localFrame - 100) * 0.15) * 3 : 0;

  // Compute device fading / Robot appearing
  const deviceOpacity = interpolate(morphProgress, [0, 0.5], [1, 0], {
    extrapolateRight: "clamp",
  });
  const robotOpacity = interpolate(morphProgress, [0.3, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Robot eye glow increases
  const eyeGlow = interpolate(morphProgress, [0.5, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Wave phase for idle animation
  const wavePhase = isSettled ? (localFrame - 100) * 0.08 : 0;

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: COLORS.background }}
    >
      <SVGFilters />

      <g transform={`translate(${centerX}, ${centerY}) rotate(${idleRot}) scale(${breathe})`}>
        {/* Compute device splitting (fading out) */}
        {deviceOpacity > 0 && (
          <g opacity={deviceOpacity}>
            <ComputeDevice
              x={-140}
              y={-35}
              width={280}
              height={70}
              opacity={1}
              cornerSharpness={1}
              portExtension={1 - splitProgress}
              glowIntensity={glowIntensity}
              shadowOpacity={0.5}
              splitAmount={splitProgress}
              ledActive={true}
            />
          </g>
        )}

        {/* Robot agent (fading in) */}
        {robotOpacity > 0 && (
          <RobotAgent
            x={0}
            y={0}
            scale={0.9 * settleSpring}
            opacity={robotOpacity}
            rotation={0}
            morphProgress={morphProgress * settleSpring}
            eyeGlow={eyeGlow}
            eyeScale={eyeBlink}
            antennaWiggle={antennaWiggle}
            armRaise={0}
            wavePhase={wavePhase}
          />
        )}
      </g>
    </svg>
  );
};
