import React from "react";
import { COLORS, DIMENSIONS, TYPOGRAPHY } from "../utils/constants";

interface UITile {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "header" | "button" | "card" | "input" | "text" | "avatar" | "stat";
}

interface AppUIProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
  tiles?: UITile[];
  tilePositions?: { x: number; y: number }[];
  showChrome?: boolean;
  tileOpacities?: number[];
}

// Modern iOS/macOS app mockup
const defaultTiles: UITile[] = [
  { x: 20, y: 70, width: 360, height: 50, type: "header" },
  { x: 20, y: 140, width: 170, height: 140, type: "card" },
  { x: 210, y: 140, width: 170, height: 140, type: "card" },
  { x: 20, y: 300, width: 360, height: 44, type: "input" },
  { x: 20, y: 360, width: 140, height: 44, type: "button" },
  { x: 180, y: 360, width: 200, height: 44, type: "button" },
];

export const AppUI: React.FC<AppUIProps> = ({
  x = 0,
  y = 0,
  width = 400,
  height = 450,
  opacity = 1,
  scale = 1,
  tiles = defaultTiles,
  tilePositions,
  showChrome = true,
  tileOpacities = [],
}) => {
  const titleBarHeight = DIMENSIONS.titleBarHeight;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity}>
      {/* Window shadow */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={DIMENSIONS.windowRadius}
        fill={COLORS.windowFill}
        filter="url(#shadow-lg)"
      />

      {/* App window background */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={DIMENSIONS.windowRadius}
        fill="url(#gradient-surface)"
      />

      {/* Clip content */}
      <clipPath id="app-clip">
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={DIMENSIONS.windowRadius}
        />
      </clipPath>

      <g clipPath="url(#app-clip)">
        {/* Window chrome */}
        {showChrome && (
          <g>
            {/* Title bar */}
            <rect
              x={0}
              y={0}
              width={width}
              height={titleBarHeight}
              fill="url(#gradient-titlebar)"
            />

            {/* Traffic lights */}
            <circle
              cx={DIMENSIONS.trafficLightOffset}
              cy={titleBarHeight / 2}
              r={DIMENSIONS.trafficLightSize / 2}
              fill={COLORS.trafficRed}
            />
            <circle
              cx={DIMENSIONS.trafficLightOffset + DIMENSIONS.trafficLightSpacing}
              cy={titleBarHeight / 2}
              r={DIMENSIONS.trafficLightSize / 2}
              fill={COLORS.trafficYellow}
            />
            <circle
              cx={DIMENSIONS.trafficLightOffset + DIMENSIONS.trafficLightSpacing * 2}
              cy={titleBarHeight / 2}
              r={DIMENSIONS.trafficLightSize / 2}
              fill={COLORS.trafficGreen}
            />

            {/* App title */}
            <text
              x={width / 2}
              y={titleBarHeight / 2 + 5}
              textAnchor="middle"
              fill={COLORS.darkText}
              fontSize={TYPOGRAPHY.sizes.windowTitle}
              fontFamily={TYPOGRAPHY.fontFamily}
              fontWeight={TYPOGRAPHY.weights.medium}
            >
              Dashboard
            </text>

            {/* Divider */}
            <line
              x1={0}
              y1={titleBarHeight}
              x2={width}
              y2={titleBarHeight}
              stroke="#D0D0D0"
              strokeWidth={1}
            />
          </g>
        )}

        {/* UI Tiles */}
        {tiles.map((tile, index) => {
          const pos = tilePositions?.[index] ?? { x: tile.x, y: tile.y };
          const tileOpacity = tileOpacities[index] ?? 1;

          return (
            <g key={index} transform={`translate(${pos.x}, ${pos.y})`} opacity={tileOpacity}>
              {tile.type === "header" && (
                <g>
                  {/* Header container */}
                  <rect
                    width={tile.width}
                    height={tile.height}
                    rx={10}
                    fill={COLORS.white}
                    filter="url(#shadow-sm)"
                  />
                  {/* Avatar placeholder */}
                  <circle
                    cx={25}
                    cy={tile.height / 2}
                    r={16}
                    fill={COLORS.blue}
                  />
                  <text
                    x={25}
                    y={tile.height / 2 + 5}
                    textAnchor="middle"
                    fill={COLORS.white}
                    fontSize={14}
                    fontFamily={TYPOGRAPHY.fontFamily}
                    fontWeight={TYPOGRAPHY.weights.semibold}
                  >
                    AI
                  </text>
                  {/* Title text */}
                  <text
                    x={52}
                    y={tile.height / 2 - 4}
                    fill={COLORS.darkText}
                    fontSize={15}
                    fontFamily={TYPOGRAPHY.fontFamily}
                    fontWeight={TYPOGRAPHY.weights.semibold}
                  >
                    AI Agent Dashboard
                  </text>
                  <text
                    x={52}
                    y={tile.height / 2 + 12}
                    fill={COLORS.lightText}
                    fontSize={12}
                    fontFamily={TYPOGRAPHY.fontFamily}
                  >
                    3 tasks completed today
                  </text>
                </g>
              )}

              {tile.type === "card" && (
                <g>
                  {/* Card container */}
                  <rect
                    width={tile.width}
                    height={tile.height}
                    rx={12}
                    fill={COLORS.white}
                    filter="url(#shadow-md)"
                  />
                  {/* Card icon area */}
                  <rect
                    x={16}
                    y={16}
                    width={tile.width - 32}
                    height={60}
                    rx={8}
                    fill={index === 1 ? "#E8F5E9" : "#E3F2FD"}
                  />
                  {/* Icon */}
                  <circle
                    cx={tile.width / 2}
                    cy={46}
                    r={16}
                    fill={index === 1 ? COLORS.green : COLORS.blue}
                  />
                  {/* Card title */}
                  <text
                    x={16}
                    y={100}
                    fill={COLORS.darkText}
                    fontSize={14}
                    fontFamily={TYPOGRAPHY.fontFamily}
                    fontWeight={TYPOGRAPHY.weights.semibold}
                  >
                    {index === 1 ? "Tasks" : "Analytics"}
                  </text>
                  {/* Card subtitle */}
                  <text
                    x={16}
                    y={118}
                    fill={COLORS.lightText}
                    fontSize={12}
                    fontFamily={TYPOGRAPHY.fontFamily}
                  >
                    {index === 1 ? "12 active" : "View reports"}
                  </text>
                </g>
              )}

              {tile.type === "input" && (
                <g>
                  {/* Input field */}
                  <rect
                    width={tile.width}
                    height={tile.height}
                    rx={10}
                    fill={COLORS.white}
                    stroke="#D0D0D0"
                    strokeWidth={1}
                  />
                  {/* Placeholder text */}
                  <text
                    x={16}
                    y={tile.height / 2 + 5}
                    fill={COLORS.lightText}
                    fontSize={14}
                    fontFamily={TYPOGRAPHY.fontFamily}
                  >
                    Ask the AI agent...
                  </text>
                  {/* Search icon */}
                  <circle
                    cx={tile.width - 28}
                    cy={tile.height / 2}
                    r={8}
                    fill="none"
                    stroke={COLORS.lightText}
                    strokeWidth={1.5}
                  />
                  <line
                    x1={tile.width - 22}
                    y1={tile.height / 2 + 6}
                    x2={tile.width - 18}
                    y2={tile.height / 2 + 10}
                    stroke={COLORS.lightText}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                  />
                </g>
              )}

              {tile.type === "button" && (
                <g>
                  {/* Primary button */}
                  <rect
                    width={tile.width}
                    height={tile.height}
                    rx={10}
                    fill={index === 4 ? COLORS.blue : COLORS.white}
                    stroke={index === 4 ? "none" : COLORS.blue}
                    strokeWidth={index === 4 ? 0 : 1.5}
                    filter="url(#shadow-sm)"
                  />
                  <text
                    x={tile.width / 2}
                    y={tile.height / 2 + 5}
                    textAnchor="middle"
                    fill={index === 4 ? COLORS.white : COLORS.blue}
                    fontSize={14}
                    fontFamily={TYPOGRAPHY.fontFamily}
                    fontWeight={TYPOGRAPHY.weights.semibold}
                  >
                    {index === 4 ? "Cancel" : "Run Agent"}
                  </text>
                </g>
              )}

              {tile.type === "stat" && (
                <g>
                  <rect
                    width={tile.width}
                    height={tile.height}
                    rx={10}
                    fill={COLORS.white}
                    filter="url(#shadow-sm)"
                  />
                  <text
                    x={tile.width / 2}
                    y={tile.height / 2 - 8}
                    textAnchor="middle"
                    fill={COLORS.darkText}
                    fontSize={24}
                    fontFamily={TYPOGRAPHY.fontFamily}
                    fontWeight={TYPOGRAPHY.weights.bold}
                  >
                    256
                  </text>
                  <text
                    x={tile.width / 2}
                    y={tile.height / 2 + 12}
                    textAnchor="middle"
                    fill={COLORS.lightText}
                    fontSize={11}
                    fontFamily={TYPOGRAPHY.fontFamily}
                  >
                    Requests
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

export default AppUI;
