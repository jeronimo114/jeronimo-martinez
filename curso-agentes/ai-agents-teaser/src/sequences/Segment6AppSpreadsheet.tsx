import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, SEGMENTS, DIMENSIONS, TYPOGRAPHY } from "../utils/constants";
import { SVGFilters } from "../utils/filters";

// Segment 6 (720–900f | 24–30s) — App → Spreadsheet
// Visual: App UI flattens to grid, expands with real data
// Transformation: Tiles become cells, Numbers/Excel styling appears
// Animation: Linear interpolation (precision moment, no bounce)

export const Segment6AppSpreadsheet: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const { start } = SEGMENTS.APP_SPREADSHEET;
  const localFrame = frame - start;

  const centerX = width / 2;
  const centerY = height / 2;

  // Phase 1: Window chrome fades (0-30 local frames)
  const chromeFade = interpolate(localFrame, [0, 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: UI elements flatten to grid (20-80 local frames)
  const flattenProgress = interpolate(localFrame, [20, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Grid expands (60-150 local frames)
  const expandProgress = interpolate(localFrame, [60, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Cell highlight appears (140-170 local frames)
  const highlightOpacity = interpolate(localFrame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Grid dimensions
  const cellWidth = 75;
  const cellHeight = 28;
  const headerHeight = 28;
  const rowHeaderWidth = 45;

  const visibleCols = 6 + Math.floor(expandProgress * 2);
  const visibleRows = 8 + Math.floor(expandProgress * 4);

  const spreadsheetWidth = rowHeaderWidth + visibleCols * cellWidth + expandProgress * 50;
  const spreadsheetHeight = headerHeight + visibleRows * cellHeight + 60 + expandProgress * 40;

  // Column letters
  const getColumnLetter = (index: number): string => String.fromCharCode(65 + index);

  // Sample data
  const data = [
    ["Product", "Q1", "Q2", "Q3", "Q4", "Total"],
    ["Alpha", "1,234", "2,456", "3,789", "4,123", "11,602"],
    ["Beta", "987", "1,543", "2,198", "2,876", "7,604"],
    ["Gamma", "2,345", "3,210", "4,567", "5,432", "15,554"],
    ["Delta", "765", "876", "1,234", "1,456", "4,331"],
    ["Total", "5,331", "8,085", "11,788", "13,887", "39,091"],
  ];

  const getCellData = (row: number, col: number): string => {
    if (row < data.length && col < data[0].length) return data[row][col];
    return "";
  };

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: COLORS.background }}
    >
      <SVGFilters />

      <g transform={`translate(${centerX - spreadsheetWidth / 2}, ${centerY - spreadsheetHeight / 2})`}>
        {/* Window shadow and background */}
        <rect
          x={0}
          y={0}
          width={spreadsheetWidth}
          height={spreadsheetHeight}
          rx={DIMENSIONS.windowRadius}
          fill={COLORS.white}
          filter="url(#shadow-lg)"
        />

        {/* Window chrome (fading) */}
        {chromeFade > 0 && (
          <g opacity={chromeFade}>
            <rect x={0} y={0} width={spreadsheetWidth} height={DIMENSIONS.titleBarHeight} fill="url(#gradient-titlebar)" />
            <circle cx={20} cy={26} r={6} fill={COLORS.trafficRed} />
            <circle cx={40} cy={26} r={6} fill={COLORS.trafficYellow} />
            <circle cx={60} cy={26} r={6} fill={COLORS.trafficGreen} />
            <text x={spreadsheetWidth / 2} y={30} textAnchor="middle" fill={COLORS.darkText} fontSize={13} fontFamily={TYPOGRAPHY.fontFamily} fontWeight={500}>AI_Report.xlsx</text>
          </g>
        )}

        {/* Spreadsheet content area */}
        <g transform={`translate(0, ${DIMENSIONS.titleBarHeight + (1 - chromeFade) * 10})`}>
          {/* Column headers */}
          <g transform={`translate(${rowHeaderWidth}, 0)`}>
            <rect x={0} y={0} width={spreadsheetWidth - rowHeaderWidth} height={headerHeight} fill="#F7F7F7" />
            {Array.from({ length: visibleCols }).map((_, colIndex) => (
              <g key={`col-${colIndex}`} transform={`translate(${colIndex * cellWidth}, 0)`}>
                <line x1={cellWidth} y1={0} x2={cellWidth} y2={headerHeight} stroke="#E0E0E0" strokeWidth={1} />
                <text
                  x={cellWidth / 2}
                  y={headerHeight / 2 + 4}
                  textAnchor="middle"
                  fill={COLORS.lightText}
                  fontSize={12}
                  fontFamily={TYPOGRAPHY.fontFamily}
                  fontWeight={500}
                >
                  {getColumnLetter(colIndex)}
                </text>
              </g>
            ))}
            <line x1={0} y1={headerHeight} x2={spreadsheetWidth - rowHeaderWidth} y2={headerHeight} stroke="#D0D0D0" strokeWidth={1} />
          </g>

          {/* Row headers */}
          <g transform={`translate(0, ${headerHeight})`}>
            <rect x={0} y={0} width={rowHeaderWidth} height={visibleRows * cellHeight} fill="#F7F7F7" />
            {Array.from({ length: visibleRows }).map((_, rowIndex) => (
              <g key={`row-${rowIndex}`} transform={`translate(0, ${rowIndex * cellHeight})`}>
                <line x1={0} y1={cellHeight} x2={rowHeaderWidth} y2={cellHeight} stroke="#E0E0E0" strokeWidth={1} />
                <text
                  x={rowHeaderWidth / 2}
                  y={cellHeight / 2 + 4}
                  textAnchor="middle"
                  fill={COLORS.lightText}
                  fontSize={12}
                  fontFamily={TYPOGRAPHY.fontFamily}
                  fontWeight={500}
                >
                  {rowIndex + 1}
                </text>
              </g>
            ))}
            <line x1={rowHeaderWidth} y1={0} x2={rowHeaderWidth} y2={visibleRows * cellHeight} stroke="#D0D0D0" strokeWidth={1} />
          </g>

          {/* Grid cells with real data */}
          <g transform={`translate(${rowHeaderWidth}, ${headerHeight})`}>
            {Array.from({ length: visibleRows }).map((_, rowIndex) =>
              Array.from({ length: visibleCols }).map((_, colIndex) => {
                const isHighlighted = rowIndex === 2 && colIndex === 2;
                const cellData = getCellData(rowIndex, colIndex);
                const isHeader = rowIndex === 0 || colIndex === 0;
                const isTotal = rowIndex === 5 || colIndex === 5;
                const isNumber = cellData && !isNaN(Number(cellData.replace(/,/g, "")));

                const cellOpacity = interpolate(
                  flattenProgress,
                  [(rowIndex + colIndex) * 0.03, (rowIndex + colIndex) * 0.03 + 0.3],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                return (
                  <g
                    key={`cell-${rowIndex}-${colIndex}`}
                    transform={`translate(${colIndex * cellWidth}, ${rowIndex * cellHeight})`}
                    opacity={cellOpacity}
                  >
                    <rect
                      width={cellWidth}
                      height={cellHeight}
                      fill={isHighlighted ? "#E8F4FD" : isHeader ? "#F9F9F9" : COLORS.white}
                      stroke="#E8E8E8"
                      strokeWidth={0.5}
                    />

                    {/* Highlighted cell border */}
                    {isHighlighted && highlightOpacity > 0 && (
                      <rect
                        width={cellWidth}
                        height={cellHeight}
                        fill="none"
                        stroke={COLORS.green}
                        strokeWidth={2.5}
                        opacity={highlightOpacity}
                      />
                    )}

                    {/* Cell content */}
                    {cellData && (
                      <text
                        x={isNumber && !isHeader ? cellWidth - 8 : 8}
                        y={cellHeight / 2 + 4}
                        textAnchor={isNumber && !isHeader ? "end" : "start"}
                        fill={isTotal ? COLORS.blue : COLORS.darkText}
                        fontSize={12}
                        fontFamily={isHeader ? TYPOGRAPHY.fontFamily : TYPOGRAPHY.monoFontFamily}
                        fontWeight={isHeader || isTotal ? 600 : 400}
                      >
                        {cellData}
                      </text>
                    )}
                  </g>
                );
              })
            )}
          </g>

          {/* Expansion fade effects */}
          {expandProgress > 0.5 && (
            <>
              <rect
                x={spreadsheetWidth - 80}
                y={0}
                width={80}
                height={spreadsheetHeight - DIMENSIONS.titleBarHeight}
                fill="url(#fade-right)"
                opacity={expandProgress}
              />
              <rect
                x={0}
                y={spreadsheetHeight - DIMENSIONS.titleBarHeight - 60}
                width={spreadsheetWidth}
                height={60}
                fill="url(#fade-bottom)"
                opacity={expandProgress}
              />
            </>
          )}
        </g>
      </g>
    </svg>
  );
};
