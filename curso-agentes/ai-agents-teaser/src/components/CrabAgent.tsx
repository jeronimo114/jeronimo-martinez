import React from "react";
import { COLORS, DIMENSIONS } from "../utils/constants";

interface CrabAgentProps {
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  rotation?: number;        // Idle micro-rotation
  clawRaise?: number;       // 0 = down, 1 = raised
  morphProgress?: number;   // 0 = mac mini parts, 1 = full crab
  isOutline?: boolean;      // When transitioning to code
}

export const CrabAgent: React.FC<CrabAgentProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  opacity = 1,
  rotation = 0,
  clawRaise = 0,
  morphProgress = 1,
  isOutline = false,
}) => {
  const strokeWidth = isOutline ? 1.5 : DIMENSIONS.strokeWidth;
  const strokeOpacity = isOutline ? 0.4 : 1;

  // Body dimensions - morphs from rectangular to more organic
  const bodyWidth = 120 - morphProgress * 20;
  const bodyHeight = 40 + morphProgress * 15;
  const bodyCorner = 8 + morphProgress * 12;

  // Leg positions - extend outward as morph progresses
  const legSpread = morphProgress * 25;
  const legLength = 20 + morphProgress * 15;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Legs (6 total - 3 per side) */}
      {[-1, 1].map((side) =>
        [0, 1, 2].map((legIndex) => {
          const legY = -10 + legIndex * 15;
          const legX = side * (bodyWidth / 2 + legSpread);
          const legAngle = side * (20 + legIndex * 10);

          return (
            <line
              key={`leg-${side}-${legIndex}`}
              x1={legX}
              y1={legY}
              x2={legX + side * legLength * Math.cos((legAngle * Math.PI) / 180)}
              y2={legY + legLength * Math.sin((legAngle * Math.PI) / 180) * 0.3}
              stroke={COLORS.primary}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              opacity={morphProgress * strokeOpacity}
            />
          );
        })
      )}

      {/* Body shell */}
      <ellipse
        cx={0}
        cy={0}
        rx={bodyWidth / 2}
        ry={bodyHeight / 2}
        fill="none"
        stroke={COLORS.primary}
        strokeWidth={strokeWidth}
        opacity={strokeOpacity}
      />

      {/* Inner shell detail */}
      <ellipse
        cx={0}
        cy={-5}
        rx={bodyWidth / 2 - 15}
        ry={bodyHeight / 2 - 10}
        fill="none"
        stroke={COLORS.primary}
        strokeWidth={1}
        opacity={morphProgress * 0.3 * strokeOpacity}
      />

      {/* Eyes */}
      <g transform={`translate(0, ${-bodyHeight / 2 - 8})`}>
        <circle
          cx={-15}
          cy={0}
          r={6 + morphProgress * 2}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          opacity={morphProgress * strokeOpacity}
        />
        <circle
          cx={15}
          cy={0}
          r={6 + morphProgress * 2}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          opacity={morphProgress * strokeOpacity}
        />
        {/* Pupils */}
        <circle
          cx={-15}
          cy={0}
          r={3}
          fill={COLORS.primary}
          opacity={morphProgress * strokeOpacity}
        />
        <circle
          cx={15}
          cy={0}
          r={3}
          fill={COLORS.primary}
          opacity={morphProgress * strokeOpacity}
        />
      </g>

      {/* Left Claw */}
      <g
        transform={`translate(${-bodyWidth / 2 - 15}, ${-10}) rotate(${-45 - clawRaise * 30})`}
      >
        <path
          d={`M 0 0 L -25 -5 L -35 5 M -25 -5 L -35 -15`}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={strokeOpacity}
        />
      </g>

      {/* Right Claw (the one that raises) */}
      <g
        transform={`translate(${bodyWidth / 2 + 15}, ${-10}) rotate(${45 + clawRaise * 30}) scale(-1, 1)`}
      >
        <path
          d={`M 0 0 L -25 -5 L -35 5 M -25 -5 L -35 -15`}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={strokeOpacity}
        />
        {/* Frame growing from claw when raised */}
        {clawRaise > 0.5 && (
          <rect
            x={-50 - (clawRaise - 0.5) * 60}
            y={-30}
            width={(clawRaise - 0.5) * 80}
            height={(clawRaise - 0.5) * 50}
            fill="none"
            stroke={COLORS.primary}
            strokeWidth={1.5}
            rx={4}
            opacity={(clawRaise - 0.5) * 2 * strokeOpacity}
          />
        )}
      </g>
    </g>
  );
};
