import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, SEGMENTS, SPRINGS, TYPOGRAPHY } from "../utils/constants";
import { SVGFilters } from "../utils/filters";
import { RobotAgent } from "../components/RobotAgent";
import { CodeEditor } from "../components/CodeEditor";
import { idleRotation, blinkAnimation, cursorBlink } from "../utils/animations";

// Segment 4 (360–540f | 12–18s) — Agent → Code
// Visual: Robot raises arm, code frame grows from gesture
// Transformation: Robot fades to outline → snaps into VS Code dark theme editor

export const Segment4AgentCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const { start, end } = SEGMENTS.AGENT_CODE;
  const localFrame = frame - start;

  const centerX = width / 2;
  const centerY = height / 2;

  // Phase 1: Robot raises arm (0-40 local frames)
  const armRaise = interpolate(localFrame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Frame grows from arm (30-80 local frames)
  const frameGrowth = interpolate(localFrame, [30, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Robot fades to outline (50-90 local frames)
  const robotToOutline = interpolate(localFrame, [50, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Transform to editor (70-110 local frames)
  const editorMorph = interpolate(localFrame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 5: Code lines appear with stagger (100-170 local frames)
  const codeAppear = interpolate(localFrame, [100, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spring for editor appearance
  const editorSpring = spring({
    frame: Math.max(0, localFrame - 70),
    fps,
    config: SPRINGS.snappy,
  });

  // Idle rotation (only when robot is visible)
  const idleRot = robotToOutline < 0.5 ? idleRotation(localFrame, 0.8) : 0;
  const eyeBlink = robotToOutline < 0.5 ? blinkAnimation(localFrame) : 1;

  // Editor dimensions
  const editorWidth = 500;
  const editorHeight = 360;

  // Position shifts from robot to center
  const posX = interpolate(editorMorph, [0, 1], [-180, 0]);
  const posY = interpolate(editorMorph, [0, 1], [0, 0]);

  // Line opacities for staggered appearance
  const getLineOpacity = (index: number) => {
    const lineDelay = index * 0.1;
    return interpolate(
      codeAppear,
      [lineDelay, lineDelay + 0.25],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  };

  const lineOpacities = Array.from({ length: 8 }, (_, i) => getLineOpacity(i));

  // Cursor visibility
  const cursorVisible = codeAppear > 0.5 && cursorBlink(localFrame, fps) > 0.5;

  // Active line for animation
  const activeLineIndex = Math.floor(
    interpolate(localFrame, [130, 170], [1, 4], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: COLORS.background }}
    >
      <SVGFilters />

      <g transform={`translate(${centerX + posX}, ${centerY + posY})`}>
        {/* Robot (raising arm, fading to outline) */}
        {robotToOutline < 1 && editorMorph < 0.6 && (
          <g transform={`translate(-180, 0) rotate(${idleRot})`}>
            <RobotAgent
              x={0}
              y={0}
              scale={0.9}
              opacity={1 - editorMorph}
              rotation={0}
              morphProgress={1}
              eyeGlow={1 - robotToOutline}
              eyeScale={eyeBlink}
              antennaWiggle={0}
              armRaise={armRaise}
              isOutline={robotToOutline > 0.5}
              wavePhase={0}
            />
          </g>
        )}

        {/* Code editor (appearing) */}
        {editorMorph > 0 && (
          <g opacity={editorMorph * editorSpring}>
            <CodeEditor
              x={-editorWidth / 2}
              y={-editorHeight / 2}
              width={editorWidth}
              height={editorHeight}
              opacity={1}
              scale={1}
              showChrome={true}
              lineOpacities={lineOpacities}
              cursorLine={activeLineIndex}
              cursorVisible={cursorVisible}
              activeLineIndex={codeAppear > 0.6 ? activeLineIndex : -1}
            />
          </g>
        )}
      </g>
    </svg>
  );
};
