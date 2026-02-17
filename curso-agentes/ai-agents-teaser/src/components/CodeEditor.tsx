import React from "react";
import { COLORS, DIMENSIONS, TYPOGRAPHY } from "../utils/constants";

interface CodeLine {
  indent: number;
  tokens: Array<{
    text: string;
    color: string;
  }>;
  isHighlighted?: boolean;
}

interface CodeEditorProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
  showChrome?: boolean;
  codeLines?: CodeLine[];
  cursorLine?: number;
  cursorVisible?: boolean;
  lineOpacities?: number[];
  activeLineIndex?: number;
}

// Realistic VS Code dark theme editor
const defaultCodeLines: CodeLine[] = [
  {
    indent: 0,
    tokens: [
      { text: "async", color: COLORS.syntaxKeyword },
      { text: " ", color: COLORS.syntaxOperator },
      { text: "function", color: COLORS.syntaxKeyword },
      { text: " ", color: COLORS.syntaxOperator },
      { text: "handleRequest", color: COLORS.syntaxFunction },
      { text: "(", color: COLORS.syntaxBracket },
      { text: "data", color: COLORS.syntaxVariable },
      { text: ")", color: COLORS.syntaxBracket },
      { text: " {", color: COLORS.syntaxOperator },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "const", color: COLORS.syntaxKeyword },
      { text: " result ", color: COLORS.syntaxVariable },
      { text: "=", color: COLORS.syntaxOperator },
      { text: " await", color: COLORS.syntaxKeyword },
      { text: " processAI", color: COLORS.syntaxFunction },
      { text: "(", color: COLORS.syntaxBracket },
      { text: "data", color: COLORS.syntaxVariable },
      { text: ")", color: COLORS.syntaxBracket },
      { text: ";", color: COLORS.syntaxOperator },
    ],
    isHighlighted: true,
  },
  {
    indent: 1,
    tokens: [
      { text: "// AI agent processes the request", color: COLORS.syntaxComment },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "if", color: COLORS.syntaxKeyword },
      { text: " (", color: COLORS.syntaxOperator },
      { text: "result", color: COLORS.syntaxVariable },
      { text: ".", color: COLORS.syntaxOperator },
      { text: "success", color: COLORS.syntaxVariable },
      { text: ") {", color: COLORS.syntaxOperator },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: "return", color: COLORS.syntaxKeyword },
      { text: " ", color: COLORS.syntaxOperator },
      { text: "formatOutput", color: COLORS.syntaxFunction },
      { text: "(", color: COLORS.syntaxBracket },
      { text: "result", color: COLORS.syntaxVariable },
      { text: ")", color: COLORS.syntaxBracket },
      { text: ";", color: COLORS.syntaxOperator },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "}", color: COLORS.syntaxOperator },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "throw", color: COLORS.syntaxKeyword },
      { text: " new", color: COLORS.syntaxKeyword },
      { text: " Error", color: COLORS.syntaxType },
      { text: "(", color: COLORS.syntaxBracket },
      { text: '"Failed"', color: COLORS.syntaxString },
      { text: ")", color: COLORS.syntaxBracket },
      { text: ";", color: COLORS.syntaxOperator },
    ],
  },
  {
    indent: 0,
    tokens: [
      { text: "}", color: COLORS.syntaxOperator },
    ],
  },
];

export const CodeEditor: React.FC<CodeEditorProps> = ({
  x = 0,
  y = 0,
  width = 450,
  height = 320,
  opacity = 1,
  scale = 1,
  showChrome = true,
  codeLines = defaultCodeLines,
  cursorLine = 1,
  cursorVisible = true,
  lineOpacities = [],
  activeLineIndex = -1,
}) => {
  const titleBarHeight = DIMENSIONS.titleBarHeight;
  const lineHeight = 24;
  const gutterWidth = 50;
  const startY = showChrome ? titleBarHeight + 20 : 20;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity}>
      {/* Window shadow */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={DIMENSIONS.windowRadius}
        fill={COLORS.editorBg}
        filter="url(#shadow-lg)"
      />

      {/* Editor background */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={DIMENSIONS.windowRadius}
        fill={COLORS.editorBg}
      />

      {/* Clip content */}
      <clipPath id="editor-clip">
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={DIMENSIONS.windowRadius}
        />
      </clipPath>

      <g clipPath="url(#editor-clip)">
        {/* Window chrome (title bar) */}
        {showChrome && (
          <g>
            {/* Title bar background */}
            <rect
              x={0}
              y={0}
              width={width}
              height={titleBarHeight}
              fill="url(#gradient-titlebar-dark)"
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

            {/* File name */}
            <text
              x={width / 2}
              y={titleBarHeight / 2 + 4}
              textAnchor="middle"
              fill={COLORS.lightText}
              fontSize={TYPOGRAPHY.sizes.windowTitle}
              fontFamily={TYPOGRAPHY.fontFamily}
            >
              agent.ts
            </text>

            {/* Divider line */}
            <line
              x1={0}
              y1={titleBarHeight}
              x2={width}
              y2={titleBarHeight}
              stroke="#3D3D3D"
              strokeWidth={1}
            />
          </g>
        )}

        {/* Gutter background */}
        <rect
          x={0}
          y={showChrome ? titleBarHeight : 0}
          width={gutterWidth}
          height={height - (showChrome ? titleBarHeight : 0)}
          fill={COLORS.editorSidebar}
        />

        {/* Gutter separator */}
        <line
          x1={gutterWidth}
          y1={showChrome ? titleBarHeight : 0}
          x2={gutterWidth}
          y2={height}
          stroke="#3D3D3D"
          strokeWidth={1}
        />

        {/* Code lines */}
        {codeLines.map((line, index) => {
          const lineY = startY + index * lineHeight;
          const lineOpacity = lineOpacities[index] ?? 1;
          const isActive = index === activeLineIndex;

          return (
            <g key={index} opacity={lineOpacity}>
              {/* Active line highlight */}
              {(line.isHighlighted || isActive) && (
                <rect
                  x={gutterWidth}
                  y={lineY - lineHeight / 2 - 2}
                  width={width - gutterWidth}
                  height={lineHeight}
                  fill={isActive ? COLORS.blue : COLORS.systemGray5}
                  opacity={isActive ? 0.15 : 0.5}
                />
              )}

              {/* Line number */}
              <text
                x={gutterWidth - 12}
                y={lineY}
                textAnchor="end"
                fill={COLORS.editorLineNumber}
                fontSize={TYPOGRAPHY.sizes.code}
                fontFamily={TYPOGRAPHY.monoFontFamily}
              >
                {index + 1}
              </text>

              {/* Code tokens */}
              {(() => {
                let xOffset = gutterWidth + 16 + line.indent * 20;
                return line.tokens.map((token, tokenIndex) => {
                  const textElement = (
                    <text
                      key={tokenIndex}
                      x={xOffset}
                      y={lineY}
                      fill={token.color}
                      fontSize={TYPOGRAPHY.sizes.code}
                      fontFamily={TYPOGRAPHY.monoFontFamily}
                    >
                      {token.text}
                    </text>
                  );
                  xOffset += token.text.length * 7.5;
                  return textElement;
                });
              })()}

              {/* Cursor */}
              {cursorVisible && cursorLine === index && (
                <rect
                  x={gutterWidth + 16 + line.indent * 20 + line.tokens.reduce((acc, t) => acc + t.text.length * 7.5, 0)}
                  y={lineY - lineHeight / 2 + 2}
                  width={2}
                  height={lineHeight - 4}
                  fill={COLORS.white}
                />
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

export default CodeEditor;
