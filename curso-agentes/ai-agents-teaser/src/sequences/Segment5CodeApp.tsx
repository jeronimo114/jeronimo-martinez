import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, SEGMENTS, SPRINGS, DIMENSIONS, TYPOGRAPHY } from "../utils/constants";
import { SVGFilters } from "../utils/filters";
import { bouncySpring, easeOut } from "../utils/animations";

// Segment 5 (540–720f | 18–24s) — Code → App
// Visual: Code blocks detach as tiles, rearrange into modern app UI layout
// Transformation: Dark editor chrome fades, tiles snap with magnetic effect

interface Tile {
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  endX: number;
  endY: number;
  endWidth: number;
  endHeight: number;
  type: "header" | "card" | "button" | "input";
  color?: string;
}

const tiles: Tile[] = [
  { startX: 66, startY: 75, startWidth: 160, startHeight: 8, endX: 20, endY: 70, endWidth: 360, endHeight: 50, type: "header" },
  { startX: 86, startY: 100, startWidth: 220, startHeight: 8, endX: 20, endY: 140, endWidth: 170, endHeight: 140, type: "card", color: "#E3F2FD" },
  { startX: 86, startY: 125, startWidth: 180, startHeight: 8, endX: 210, endY: 140, endWidth: 170, endHeight: 140, type: "card", color: "#E8F5E9" },
  { startX: 106, startY: 150, startWidth: 200, startHeight: 8, endX: 20, endY: 300, endWidth: 360, endHeight: 44, type: "input" },
  { startX: 106, startY: 175, startWidth: 140, startHeight: 8, endX: 20, endY: 360, endWidth: 140, endHeight: 44, type: "button" },
  { startX: 86, startY: 200, startWidth: 100, startHeight: 8, endX: 180, endY: 360, endWidth: 200, endHeight: 44, type: "button" },
];

export const Segment5CodeApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const { start } = SEGMENTS.CODE_APP;
  const localFrame = frame - start;

  const centerX = width / 2;
  const centerY = height / 2;

  const editorWidth = 500;
  const editorHeight = 360;
  const appWidth = 400;
  const appHeight = 450;

  // Phase 1: Editor chrome fades (0-40 local frames)
  const chromeFade = interpolate(localFrame, [0, 40], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Tiles detach and float (20-60 local frames)
  const detachProgress = interpolate(localFrame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Tiles rearrange (50-130 local frames)
  const rearrangeProgress = interpolate(localFrame, [50, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: App chrome appears (100-140 local frames)
  const appChromeOpacity = interpolate(localFrame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Container transition from editor to app size
  const containerWidth = interpolate(rearrangeProgress, [0, 1], [editorWidth, appWidth]);
  const containerHeight = interpolate(rearrangeProgress, [0, 1], [editorHeight, appHeight]);

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: COLORS.background }}
    >
      <SVGFilters />

      <g transform={`translate(${centerX - containerWidth / 2}, ${centerY - containerHeight / 2})`}>
        {/* Editor window (fading) */}
        {chromeFade > 0 && (
          <g opacity={chromeFade}>
            <rect
              x={0}
              y={0}
              width={editorWidth}
              height={editorHeight}
              rx={DIMENSIONS.windowRadius}
              fill={COLORS.editorBg}
              filter="url(#shadow-lg)"
            />
            <rect
              x={0}
              y={0}
              width={editorWidth}
              height={DIMENSIONS.titleBarHeight}
              fill="url(#gradient-titlebar-dark)"
            />
            <circle cx={20} cy={26} r={6} fill={COLORS.trafficRed} />
            <circle cx={40} cy={26} r={6} fill={COLORS.trafficYellow} />
            <circle cx={60} cy={26} r={6} fill={COLORS.trafficGreen} />
          </g>
        )}

        {/* Morphing tiles */}
        {tiles.map((tile, index) => {
          const tileDelay = index * 0.1;
          const tileProgress = interpolate(
            rearrangeProgress,
            [tileDelay, tileDelay + 0.5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Spring for snap effect
          const snapSpring = spring({
            frame: Math.max(0, localFrame - 100 - index * 3),
            fps,
            config: { stiffness: 180, damping: 14 },
          });

          const finalProgress = tileProgress * (localFrame > 100 ? snapSpring : 1);

          // Interpolate position
          const x = interpolate(finalProgress, [0, 1], [tile.startX, tile.endX]);
          const y = interpolate(finalProgress, [0, 1], [tile.startY, tile.endY]);
          const w = interpolate(finalProgress, [0, 1], [tile.startWidth, tile.endWidth]);
          const h = interpolate(finalProgress, [0, 1], [tile.startHeight, tile.endHeight]);
          const cornerRadius = interpolate(finalProgress, [0, 1], [2, 10]);

          // Float effect during transition
          const floatY = detachProgress > 0 && rearrangeProgress < 0.5
            ? Math.sin(localFrame * 0.12 + index * 1.5) * 6 * (1 - rearrangeProgress * 2)
            : 0;

          // Color transition
          const useDarkFill = finalProgress < 0.4;

          return (
            <g key={index}>
              {finalProgress < 0.7 ? (
                // Transitioning rectangle
                <rect
                  x={x}
                  y={y + floatY}
                  width={w}
                  height={h}
                  rx={cornerRadius}
                  fill={useDarkFill ? COLORS.syntaxVariable : COLORS.white}
                  filter={finalProgress > 0.3 ? "url(#shadow-sm)" : undefined}
                />
              ) : (
                // Full UI component rendering
                <g transform={`translate(${x}, ${y + floatY})`}>
                  {tile.type === "header" && (
                    <g>
                      <rect width={w} height={h} rx={10} fill={COLORS.white} filter="url(#shadow-sm)" />
                      <circle cx={25} cy={h / 2} r={16} fill={COLORS.blue} />
                      <text x={25} y={h / 2 + 5} textAnchor="middle" fill={COLORS.white} fontSize={14} fontFamily={TYPOGRAPHY.fontFamily} fontWeight={600}>AI</text>
                      <text x={52} y={h / 2 - 4} fill={COLORS.darkText} fontSize={15} fontFamily={TYPOGRAPHY.fontFamily} fontWeight={600}>AI Agent Dashboard</text>
                      <text x={52} y={h / 2 + 12} fill={COLORS.lightText} fontSize={12} fontFamily={TYPOGRAPHY.fontFamily}>3 tasks completed</text>
                    </g>
                  )}

                  {tile.type === "card" && (
                    <g>
                      <rect width={w} height={h} rx={12} fill={COLORS.white} filter="url(#shadow-md)" />
                      <rect x={16} y={16} width={w - 32} height={60} rx={8} fill={tile.color || "#F0F0F0"} />
                      <circle cx={w / 2} cy={46} r={16} fill={index === 1 ? COLORS.blue : COLORS.green} />
                      <text x={16} y={100} fill={COLORS.darkText} fontSize={14} fontFamily={TYPOGRAPHY.fontFamily} fontWeight={600}>{index === 1 ? "Analytics" : "Tasks"}</text>
                      <text x={16} y={118} fill={COLORS.lightText} fontSize={12} fontFamily={TYPOGRAPHY.fontFamily}>{index === 1 ? "View reports" : "12 active"}</text>
                    </g>
                  )}

                  {tile.type === "input" && (
                    <g>
                      <rect width={w} height={h} rx={10} fill={COLORS.white} stroke="#D0D0D0" strokeWidth={1} />
                      <text x={16} y={h / 2 + 5} fill={COLORS.lightText} fontSize={14} fontFamily={TYPOGRAPHY.fontFamily}>Ask the AI agent...</text>
                    </g>
                  )}

                  {tile.type === "button" && (
                    <g>
                      <rect
                        width={w}
                        height={h}
                        rx={10}
                        fill={index === 4 ? COLORS.white : COLORS.blue}
                        stroke={index === 4 ? COLORS.blue : "none"}
                        strokeWidth={1.5}
                        filter="url(#shadow-sm)"
                      />
                      <text
                        x={w / 2}
                        y={h / 2 + 5}
                        textAnchor="middle"
                        fill={index === 4 ? COLORS.blue : COLORS.white}
                        fontSize={14}
                        fontFamily={TYPOGRAPHY.fontFamily}
                        fontWeight={600}
                      >
                        {index === 4 ? "Cancel" : "Run Agent"}
                      </text>
                    </g>
                  )}
                </g>
              )}
            </g>
          );
        })}

        {/* App window chrome (appearing) */}
        {appChromeOpacity > 0 && (
          <g opacity={appChromeOpacity}>
            <rect
              x={0}
              y={0}
              width={appWidth}
              height={appHeight}
              rx={DIMENSIONS.windowRadius}
              fill="none"
              stroke="#E0E0E0"
              strokeWidth={1}
            />
            <rect
              x={0}
              y={0}
              width={appWidth}
              height={DIMENSIONS.titleBarHeight}
              fill="url(#gradient-titlebar)"
            />
            <circle cx={20} cy={26} r={6} fill={COLORS.trafficRed} />
            <circle cx={40} cy={26} r={6} fill={COLORS.trafficYellow} />
            <circle cx={60} cy={26} r={6} fill={COLORS.trafficGreen} />
            <text
              x={appWidth / 2}
              y={30}
              textAnchor="middle"
              fill={COLORS.darkText}
              fontSize={13}
              fontFamily={TYPOGRAPHY.fontFamily}
              fontWeight={500}
            >
              Dashboard
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};
