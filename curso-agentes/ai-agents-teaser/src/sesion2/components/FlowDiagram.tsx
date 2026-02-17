import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { RECAP_COLORS, TYPOGRAPHY } from "../../utils/constants";

const C = RECAP_COLORS;
const FONT = TYPOGRAPHY.fontFamily;

interface FlowStep {
  label: string;
  icon?: string;
  color?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  delay?: number;
  stagger?: number;
  direction?: "horizontal" | "vertical";
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  steps,
  delay = 0,
  stagger = 15,
  direction = "horizontal",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isH = direction === "horizontal";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isH ? "row" : "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {steps.map((step, i) => {
        const stepAppear = spring({
          frame,
          fps,
          delay: delay + i * stagger,
          config: { damping: 12 },
        });
        const color = step.color || C.accent;

        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <svg
                width={isH ? 40 : 20}
                height={isH ? 20 : 40}
                style={{ opacity: stepAppear, flexShrink: 0 }}
              >
                {isH ? (
                  <>
                    <line x1="0" y1="10" x2="30" y2="10" stroke={C.textDim} strokeWidth="2" />
                    <polygon points="28,6 36,10 28,14" fill={C.textDim} />
                  </>
                ) : (
                  <>
                    <line x1="10" y1="0" x2="10" y2="30" stroke={C.textDim} strokeWidth="2" />
                    <polygon points="6,28 10,36 14,28" fill={C.textDim} />
                  </>
                )}
              </svg>
            )}
            <div
              style={{
                opacity: stepAppear,
                transform: `scale(${stepAppear})`,
                background: C.surface,
                border: `2px solid ${color}`,
                borderRadius: 12,
                padding: "12px 20px",
                textAlign: "center",
                minWidth: 120,
                flexShrink: 0,
              }}
            >
              {step.icon && (
                <div style={{ fontSize: 24, marginBottom: 4 }}>{step.icon}</div>
              )}
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  color: C.text,
                  fontWeight: 500,
                }}
              >
                {step.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
