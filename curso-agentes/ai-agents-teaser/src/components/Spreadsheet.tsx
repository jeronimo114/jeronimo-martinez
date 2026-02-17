import React from "react";
import { COLORS, DIMENSIONS, TYPOGRAPHY } from "../utils/constants";

interface SpreadsheetProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
  columns?: number;
  rows?: number;
  cellWidth?: number;
  cellHeight?: number;
  highlightedCell?: { row: number; col: number } | null;
  expansionProgress?: number;
  showChrome?: boolean;
}

// Realistic Numbers/Excel style spreadsheet
export const Spreadsheet: React.FC<SpreadsheetProps> = ({
  x = 0,
  y = 0,
  width = 520,
  height = 400,
  opacity = 1,
  scale = 1,
  columns = 6,
  rows = 10,
  cellWidth = 75,
  cellHeight = 28,
  highlightedCell = null,
  expansionProgress = 0,
  showChrome = true,
}) => {
  const titleBarHeight = showChrome ? DIMENSIONS.titleBarHeight : 0;
  const toolbarHeight = showChrome ? 36 : 0;
  const headerHeight = 28;
  const rowHeaderWidth = 45;

  // Calculate visible cells based on expansion
  const visibleCols = columns + Math.floor(expansionProgress * 4);
  const visibleRows = rows + Math.floor(expansionProgress * 6);

  // Column letters
  const getColumnLetter = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  // Sample data
  const getCellData = (row: number, col: number): string => {
    const data = [
      ["Product", "Q1", "Q2", "Q3", "Q4", "Total"],
      ["Alpha", "1,234", "2,456", "3,789", "4,123", "11,602"],
      ["Beta", "987", "1,543", "2,198", "2,876", "7,604"],
      ["Gamma", "2,345", "3,210", "4,567", "5,432", "15,554"],
      ["Delta", "765", "876", "1,234", "1,456", "4,331"],
      ["Total", "5,331", "8,085", "11,788", "13,887", "39,091"],
    ];

    if (row < data.length && col < data[0].length) {
      return data[row][col];
    }
    return "";
  };

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity}>
      {/* Window shadow */}
      <rect
        x={0}
        y={0}
        width={width + expansionProgress * 100}
        height={height + expansionProgress * 80}
        rx={DIMENSIONS.windowRadius}
        fill={COLORS.windowFill}
        filter="url(#shadow-lg)"
      />

      {/* Window background */}
      <rect
        x={0}
        y={0}
        width={width + expansionProgress * 100}
        height={height + expansionProgress * 80}
        rx={DIMENSIONS.windowRadius}
        fill={COLORS.windowFill}
      />

      {/* Clip content */}
      <clipPath id="spreadsheet-clip">
        <rect
          x={0}
          y={0}
          width={width + expansionProgress * 100}
          height={height + expansionProgress * 80}
          rx={DIMENSIONS.windowRadius}
        />
      </clipPath>

      <g clipPath="url(#spreadsheet-clip)">
        {/* Window chrome */}
        {showChrome && (
          <g>
            {/* Title bar */}
            <rect
              x={0}
              y={0}
              width={width + expansionProgress * 100}
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

            {/* File name */}
            <text
              x={(width + expansionProgress * 100) / 2}
              y={titleBarHeight / 2 + 5}
              textAnchor="middle"
              fill={COLORS.darkText}
              fontSize={TYPOGRAPHY.sizes.windowTitle}
              fontFamily={TYPOGRAPHY.fontFamily}
              fontWeight={TYPOGRAPHY.weights.medium}
            >
              AI_Report.xlsx
            </text>

            {/* Toolbar */}
            <rect
              x={0}
              y={titleBarHeight}
              width={width + expansionProgress * 100}
              height={toolbarHeight}
              fill="#F0F0F0"
            />

            {/* Formula bar */}
            <rect
              x={rowHeaderWidth + 80}
              y={titleBarHeight + 6}
              width={200}
              height={24}
              rx={4}
              fill={COLORS.white}
              stroke="#D0D0D0"
              strokeWidth={1}
            />
            <text
              x={rowHeaderWidth + 10}
              y={titleBarHeight + 22}
              fill={COLORS.darkText}
              fontSize={12}
              fontFamily={TYPOGRAPHY.monoFontFamily}
            >
              fx
            </text>

            <line
              x1={0}
              y1={titleBarHeight + toolbarHeight}
              x2={width + expansionProgress * 100}
              y2={titleBarHeight + toolbarHeight}
              stroke="#D0D0D0"
              strokeWidth={1}
            />
          </g>
        )}

        {/* Column headers */}
        <g transform={`translate(${rowHeaderWidth}, ${titleBarHeight + toolbarHeight})`}>
          {/* Header background */}
          <rect
            x={0}
            y={0}
            width={(width + expansionProgress * 100) - rowHeaderWidth}
            height={headerHeight}
            fill="#F7F7F7"
          />

          {Array.from({ length: visibleCols }).map((_, colIndex) => (
            <g key={`col-${colIndex}`} transform={`translate(${colIndex * cellWidth}, 0)`}>
              {/* Column separator */}
              <line
                x1={cellWidth}
                y1={0}
                x2={cellWidth}
                y2={headerHeight}
                stroke="#E0E0E0"
                strokeWidth={1}
              />
              {/* Column letter */}
              <text
                x={cellWidth / 2}
                y={headerHeight / 2 + 4}
                textAnchor="middle"
                fill={COLORS.lightText}
                fontSize={12}
                fontFamily={TYPOGRAPHY.fontFamily}
                fontWeight={TYPOGRAPHY.weights.medium}
              >
                {getColumnLetter(colIndex)}
              </text>
            </g>
          ))}
          {/* Bottom border */}
          <line
            x1={0}
            y1={headerHeight}
            x2={(width + expansionProgress * 100) - rowHeaderWidth}
            y2={headerHeight}
            stroke="#D0D0D0"
            strokeWidth={1}
          />
        </g>

        {/* Row headers */}
        <g transform={`translate(0, ${titleBarHeight + toolbarHeight + headerHeight})`}>
          {/* Header background */}
          <rect
            x={0}
            y={0}
            width={rowHeaderWidth}
            height={(height + expansionProgress * 80) - titleBarHeight - toolbarHeight - headerHeight}
            fill="#F7F7F7"
          />

          {Array.from({ length: visibleRows }).map((_, rowIndex) => (
            <g key={`row-${rowIndex}`} transform={`translate(0, ${rowIndex * cellHeight})`}>
              {/* Row separator */}
              <line
                x1={0}
                y1={cellHeight}
                x2={rowHeaderWidth}
                y2={cellHeight}
                stroke="#E0E0E0"
                strokeWidth={1}
              />
              {/* Row number */}
              <text
                x={rowHeaderWidth / 2}
                y={cellHeight / 2 + 4}
                textAnchor="middle"
                fill={COLORS.lightText}
                fontSize={12}
                fontFamily={TYPOGRAPHY.fontFamily}
                fontWeight={TYPOGRAPHY.weights.medium}
              >
                {rowIndex + 1}
              </text>
            </g>
          ))}
          {/* Right border */}
          <line
            x1={rowHeaderWidth}
            y1={0}
            x2={rowHeaderWidth}
            y2={(height + expansionProgress * 80) - titleBarHeight - toolbarHeight - headerHeight}
            stroke="#D0D0D0"
            strokeWidth={1}
          />
        </g>

        {/* Grid cells */}
        <g transform={`translate(${rowHeaderWidth}, ${titleBarHeight + toolbarHeight + headerHeight})`}>
          {Array.from({ length: visibleRows }).map((_, rowIndex) =>
            Array.from({ length: visibleCols }).map((_, colIndex) => {
              const isHighlighted =
                highlightedCell &&
                highlightedCell.row === rowIndex &&
                highlightedCell.col === colIndex;

              const cellData = getCellData(rowIndex, colIndex);
              const isHeader = rowIndex === 0 || colIndex === 0;
              const isTotal = rowIndex === 5 || colIndex === 5;

              return (
                <g
                  key={`cell-${rowIndex}-${colIndex}`}
                  transform={`translate(${colIndex * cellWidth}, ${rowIndex * cellHeight})`}
                >
                  {/* Cell background */}
                  <rect
                    width={cellWidth}
                    height={cellHeight}
                    fill={isHighlighted ? "#E8F4FD" : isHeader ? "#F9F9F9" : COLORS.white}
                    stroke="#E8E8E8"
                    strokeWidth={0.5}
                  />

                  {/* Selected cell border */}
                  {isHighlighted && (
                    <rect
                      width={cellWidth}
                      height={cellHeight}
                      fill="none"
                      stroke={COLORS.green}
                      strokeWidth={2.5}
                    />
                  )}

                  {/* Cell content */}
                  {cellData && (
                    <text
                      x={isHeader || isNaN(Number(cellData.replace(/,/g, ""))) ? 8 : cellWidth - 8}
                      y={cellHeight / 2 + 4}
                      textAnchor={isHeader || isNaN(Number(cellData.replace(/,/g, ""))) ? "start" : "end"}
                      fill={isTotal ? COLORS.blue : COLORS.darkText}
                      fontSize={12}
                      fontFamily={isHeader ? TYPOGRAPHY.fontFamily : TYPOGRAPHY.monoFontFamily}
                      fontWeight={isHeader || isTotal ? TYPOGRAPHY.weights.semibold : TYPOGRAPHY.weights.regular}
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
        {expansionProgress > 0 && (
          <>
            {/* Right fade */}
            <rect
              x={width + expansionProgress * 60}
              y={titleBarHeight + toolbarHeight}
              width={60}
              height={height + expansionProgress * 80 - titleBarHeight - toolbarHeight}
              fill="url(#fade-right)"
              opacity={expansionProgress}
            />
            {/* Bottom fade */}
            <rect
              x={0}
              y={height + expansionProgress * 40}
              width={width + expansionProgress * 100}
              height={60}
              fill="url(#fade-bottom)"
              opacity={expansionProgress}
            />
          </>
        )}
      </g>
    </g>
  );
};

export default Spreadsheet;
