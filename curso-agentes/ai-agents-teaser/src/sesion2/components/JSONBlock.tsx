import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RECAP_COLORS, TYPOGRAPHY } from "../../utils/constants";

const C = RECAP_COLORS;
const MONO = TYPOGRAPHY.monoFontFamily;

interface JSONLine {
  indent: number;
  key?: string;
  value?: string;
  valueColor?: string;
  raw?: string;
}

interface JSONBlockProps {
  lines: JSONLine[];
  delay?: number;
  stagger?: number;
  fontSize?: number;
  highlightKey?: string;
}

export const JSONBlock: React.FC<JSONBlockProps> = ({
  lines,
  delay = 0,
  stagger = 5,
  fontSize = 18,
  highlightKey,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        background: "#1e1e1e",
        borderRadius: 12,
        padding: "20px 24px",
        fontFamily: MONO,
        fontSize,
        lineHeight: 1.8,
      }}
    >
      {lines.map((line, i) => {
        const lineAppear = spring({
          frame,
          fps,
          delay: delay + i * stagger,
          config: { damping: 200 },
        });
        const isHighlighted = highlightKey && line.key === highlightKey;

        return (
          <div
            key={i}
            style={{
              opacity: lineAppear,
              transform: `translateX(${(1 - lineAppear) * 20}px)`,
              paddingLeft: line.indent * 20,
              background: isHighlighted ? `${C.accent}15` : "transparent",
              borderLeft: isHighlighted ? `3px solid ${C.accent}` : "3px solid transparent",
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            {line.raw ? (
              <span style={{ color: C.textSecondary }}>{line.raw}</span>
            ) : (
              <>
                {line.key && (
                  <>
                    <span style={{ color: "#9CDCFE" }}>"{line.key}"</span>
                    <span style={{ color: C.textSecondary }}>: </span>
                  </>
                )}
                {line.value && (
                  <span style={{ color: line.valueColor || "#CE9178" }}>
                    {line.value}
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
