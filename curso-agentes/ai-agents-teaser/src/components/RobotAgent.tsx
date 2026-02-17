import React from "react";
import { COLORS } from "../utils/constants";

interface RobotAgentProps {
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  rotation?: number;
  morphProgress?: number;     // 0 = compute box form, 1 = full robot
  eyeGlow?: number;           // 0 = off, 1 = full glow
  eyeScale?: number;          // Eye blink animation (0 = closed, 1 = open)
  antennaWiggle?: number;     // Antenna bounce amount
  armRaise?: number;          // 0 = down, 1 = raised (for code gesture)
  isOutline?: boolean;        // When transitioning out
  wavePhase?: number;         // For idle wave animation
}

// Stylized friendly robot - main AI visual
export const RobotAgent: React.FC<RobotAgentProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  opacity = 1,
  rotation = 0,
  morphProgress = 1,
  eyeGlow = 1,
  eyeScale = 1,
  antennaWiggle = 0,
  armRaise = 0,
  isOutline = false,
  wavePhase = 0,
}) => {
  // Colors based on mode
  const bodyFill = isOutline ? "none" : `url(#gradient-aluminum)`;
  const bodyStroke = isOutline ? COLORS.systemGray : "none";
  const bodyStrokeWidth = isOutline ? 1.5 : 0;
  const fillOpacity = isOutline ? 0 : 1;

  // Head dimensions - morphs from boxy to rounded
  const headWidth = 80 - morphProgress * 10;
  const headHeight = 50 + morphProgress * 20;
  const headRadius = 8 + morphProgress * 16;

  // Body dimensions
  const bodyWidth = 70 - morphProgress * 5;
  const bodyHeight = 45 + morphProgress * 10;

  // Idle wave for friendly personality
  const idleOffset = Math.sin(wavePhase) * 2;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity={opacity}
    >
      {/* === ANTENNA === */}
      <g transform={`translate(0, ${-headHeight / 2 - 25})`}>
        {/* Antenna stem */}
        <line
          x1={0}
          y1={20}
          x2={antennaWiggle * 3}
          y2={0}
          stroke={isOutline ? COLORS.systemGray : COLORS.systemGray2}
          strokeWidth={isOutline ? 1.5 : 3}
          strokeLinecap="round"
          opacity={morphProgress}
        />
        {/* Antenna ball */}
        <circle
          cx={antennaWiggle * 3}
          cy={-2}
          r={morphProgress * 6}
          fill={isOutline ? "none" : COLORS.blue}
          stroke={isOutline ? COLORS.systemGray : "none"}
          strokeWidth={isOutline ? 1.5 : 0}
          filter={!isOutline && eyeGlow > 0.5 ? "url(#glow-blue)" : undefined}
          opacity={morphProgress}
        />
      </g>

      {/* === HEAD === */}
      <g transform={`translate(0, ${-bodyHeight / 2 - headHeight / 2 - 5 + idleOffset})`}>
        {/* Head shape */}
        <rect
          x={-headWidth / 2}
          y={-headHeight / 2}
          width={headWidth}
          height={headHeight}
          rx={headRadius}
          fill={bodyFill}
          stroke={bodyStroke}
          strokeWidth={bodyStrokeWidth}
          opacity={fillOpacity}
        />

        {/* Face plate (darker inset) */}
        {!isOutline && (
          <rect
            x={-headWidth / 2 + 8}
            y={-headHeight / 2 + 8}
            width={headWidth - 16}
            height={headHeight - 16}
            rx={headRadius - 4}
            fill={COLORS.systemGray5}
            opacity={morphProgress * 0.9}
          />
        )}

        {/* === EYES === */}
        <g transform={`translate(0, ${-2})`}>
          {/* Left eye */}
          <g transform={`translate(${-18}, 0) scale(1, ${eyeScale})`}>
            {/* Eye socket */}
            <ellipse
              cx={0}
              cy={0}
              rx={12}
              ry={10 * eyeScale}
              fill={isOutline ? "none" : "url(#gradient-robot-eye)"}
              stroke={isOutline ? COLORS.blue : "none"}
              strokeWidth={isOutline ? 1.5 : 0}
              filter={!isOutline && eyeGlow > 0 ? "url(#glow-blue)" : undefined}
              opacity={eyeGlow}
            />
            {/* Pupil highlight */}
            {!isOutline && eyeScale > 0.3 && (
              <circle
                cx={2}
                cy={-2}
                r={3}
                fill="#FFFFFF"
                opacity={eyeGlow * 0.8}
              />
            )}
          </g>

          {/* Right eye */}
          <g transform={`translate(${18}, 0) scale(1, ${eyeScale})`}>
            {/* Eye socket */}
            <ellipse
              cx={0}
              cy={0}
              rx={12}
              ry={10 * eyeScale}
              fill={isOutline ? "none" : "url(#gradient-robot-eye)"}
              stroke={isOutline ? COLORS.blue : "none"}
              strokeWidth={isOutline ? 1.5 : 0}
              filter={!isOutline && eyeGlow > 0 ? "url(#glow-blue)" : undefined}
              opacity={eyeGlow}
            />
            {/* Pupil highlight */}
            {!isOutline && eyeScale > 0.3 && (
              <circle
                cx={2}
                cy={-2}
                r={3}
                fill="#FFFFFF"
                opacity={eyeGlow * 0.8}
              />
            )}
          </g>
        </g>

        {/* Mouth (subtle friendly expression) */}
        {morphProgress > 0.5 && !isOutline && (
          <path
            d={`M -12 ${headHeight / 2 - 14} Q 0 ${headHeight / 2 - 8} 12 ${headHeight / 2 - 14}`}
            stroke={COLORS.systemGray3}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
            opacity={(morphProgress - 0.5) * 2 * 0.6}
          />
        )}

        {/* Ear panels */}
        {morphProgress > 0.3 && (
          <>
            <rect
              x={-headWidth / 2 - 6}
              y={-8}
              width={6}
              height={16}
              rx={2}
              fill={isOutline ? "none" : COLORS.systemGray2}
              stroke={isOutline ? COLORS.systemGray : "none"}
              strokeWidth={isOutline ? 1 : 0}
              opacity={(morphProgress - 0.3) * 1.4}
            />
            <rect
              x={headWidth / 2}
              y={-8}
              width={6}
              height={16}
              rx={2}
              fill={isOutline ? "none" : COLORS.systemGray2}
              stroke={isOutline ? COLORS.systemGray : "none"}
              strokeWidth={isOutline ? 1 : 0}
              opacity={(morphProgress - 0.3) * 1.4}
            />
          </>
        )}
      </g>

      {/* === BODY === */}
      <g transform={`translate(0, ${idleOffset})`}>
        {/* Main body */}
        <rect
          x={-bodyWidth / 2}
          y={-bodyHeight / 2}
          width={bodyWidth}
          height={bodyHeight}
          rx={10}
          fill={bodyFill}
          stroke={bodyStroke}
          strokeWidth={bodyStrokeWidth}
          opacity={fillOpacity}
        />

        {/* Chest panel */}
        {!isOutline && (
          <rect
            x={-bodyWidth / 2 + 12}
            y={-bodyHeight / 2 + 8}
            width={bodyWidth - 24}
            height={bodyHeight - 16}
            rx={6}
            fill={COLORS.systemGray4}
            opacity={morphProgress * 0.8}
          />
        )}

        {/* Status LED on chest */}
        {morphProgress > 0.5 && (
          <circle
            cx={0}
            cy={0}
            r={5}
            fill={isOutline ? "none" : COLORS.green}
            stroke={isOutline ? COLORS.green : "none"}
            strokeWidth={isOutline ? 1.5 : 0}
            filter={!isOutline ? "url(#glow-green)" : undefined}
            opacity={(morphProgress - 0.5) * 2}
          />
        )}

        {/* Decorative lines */}
        {!isOutline && morphProgress > 0.7 && (
          <>
            <line
              x1={-bodyWidth / 2 + 18}
              y1={bodyHeight / 2 - 12}
              x2={-10}
              y2={bodyHeight / 2 - 12}
              stroke={COLORS.systemGray3}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={(morphProgress - 0.7) * 3 * 0.5}
            />
            <line
              x1={10}
              y1={bodyHeight / 2 - 12}
              x2={bodyWidth / 2 - 18}
              y2={bodyHeight / 2 - 12}
              stroke={COLORS.systemGray3}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={(morphProgress - 0.7) * 3 * 0.5}
            />
          </>
        )}
      </g>

      {/* === ARMS === */}
      {morphProgress > 0.4 && (
        <>
          {/* Left arm */}
          <g
            transform={`translate(${-bodyWidth / 2 - 8}, ${-10 + idleOffset})`}
            opacity={(morphProgress - 0.4) * 1.6}
          >
            {/* Upper arm */}
            <rect
              x={-12}
              y={0}
              width={12}
              height={25}
              rx={5}
              fill={isOutline ? "none" : COLORS.systemGray2}
              stroke={isOutline ? COLORS.systemGray : "none"}
              strokeWidth={isOutline ? 1.5 : 0}
            />
            {/* Hand */}
            <circle
              cx={-6}
              cy={30}
              r={8}
              fill={isOutline ? "none" : COLORS.systemGray}
              stroke={isOutline ? COLORS.systemGray : "none"}
              strokeWidth={isOutline ? 1.5 : 0}
            />
          </g>

          {/* Right arm (raises for code gesture) */}
          <g
            transform={`translate(${bodyWidth / 2 + 8}, ${-10 + idleOffset}) rotate(${-armRaise * 60})`}
            opacity={(morphProgress - 0.4) * 1.6}
          >
            {/* Upper arm */}
            <rect
              x={0}
              y={0}
              width={12}
              height={25}
              rx={5}
              fill={isOutline ? "none" : COLORS.systemGray2}
              stroke={isOutline ? COLORS.systemGray : "none"}
              strokeWidth={isOutline ? 1.5 : 0}
            />
            {/* Hand */}
            <circle
              cx={6}
              cy={30}
              r={8}
              fill={isOutline ? "none" : COLORS.systemGray}
              stroke={isOutline ? COLORS.systemGray : "none"}
              strokeWidth={isOutline ? 1.5 : 0}
            />

            {/* Code frame growing from raised arm */}
            {armRaise > 0.6 && !isOutline && (
              <rect
                x={12}
                y={-20 - (armRaise - 0.6) * 80}
                width={(armRaise - 0.6) * 200}
                height={(armRaise - 0.6) * 120}
                rx={8}
                fill="none"
                stroke={COLORS.systemGray2}
                strokeWidth={2}
                opacity={(armRaise - 0.6) * 2.5}
              />
            )}
          </g>
        </>
      )}

      {/* === LEGS / BASE === */}
      {morphProgress > 0.6 && (
        <g
          transform={`translate(0, ${bodyHeight / 2 + 5 + idleOffset})`}
          opacity={(morphProgress - 0.6) * 2.5}
        >
          {/* Left leg */}
          <rect
            x={-25}
            y={0}
            width={14}
            height={20}
            rx={5}
            fill={isOutline ? "none" : COLORS.systemGray2}
            stroke={isOutline ? COLORS.systemGray : "none"}
            strokeWidth={isOutline ? 1.5 : 0}
          />
          {/* Left foot */}
          <rect
            x={-28}
            y={18}
            width={20}
            height={8}
            rx={4}
            fill={isOutline ? "none" : COLORS.systemGray3}
            stroke={isOutline ? COLORS.systemGray : "none"}
            strokeWidth={isOutline ? 1.5 : 0}
          />

          {/* Right leg */}
          <rect
            x={11}
            y={0}
            width={14}
            height={20}
            rx={5}
            fill={isOutline ? "none" : COLORS.systemGray2}
            stroke={isOutline ? COLORS.systemGray : "none"}
            strokeWidth={isOutline ? 1.5 : 0}
          />
          {/* Right foot */}
          <rect
            x={8}
            y={18}
            width={20}
            height={8}
            rx={4}
            fill={isOutline ? "none" : COLORS.systemGray3}
            stroke={isOutline ? COLORS.systemGray : "none"}
            strokeWidth={isOutline ? 1.5 : 0}
          />
        </g>
      )}
    </g>
  );
};

export default RobotAgent;
