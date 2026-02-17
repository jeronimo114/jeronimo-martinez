import React from "react";
import { useCurrentFrame, Sequence, AbsoluteFill } from "remotion";
import { COLORS, SEGMENTS } from "./utils/constants";

import { Segment1Intent } from "./sequences/Segment1Intent";
import { Segment2MessageCompute } from "./sequences/Segment2MessageCompute";
import { Segment3ComputeAgent } from "./sequences/Segment3ComputeAgent";
import { Segment4AgentCode } from "./sequences/Segment4AgentCode";
import { Segment5CodeApp } from "./sequences/Segment5CodeApp";
import { Segment6AppSpreadsheet } from "./sequences/Segment6AppSpreadsheet";
import { Segment7SpreadsheetPresentation } from "./sequences/Segment7SpreadsheetPresentation";
import { Segment8Resolve } from "./sequences/Segment8Resolve";

// AI Agents Teaser - 42 second Apple-style keynote video
// 1260 frames @ 30fps
// Complete redesign with:
// - Realistic macOS chrome with traffic lights
// - Filled shapes with gradients (not outlines)
// - Multi-layer shadows for depth
// - Friendly robot agent (not crab)
// - Syntax-highlighted code editor
// - Real data in spreadsheets
// - Apple-style spring animations

export const AIAgentsTeaser: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        overflow: "hidden",
      }}
    >
      {/* Segment 1: Intent (0-90f | 0-3s)
          Sleek cursor → types text → morphs to iMessage blue bubble */}
      <Sequence from={SEGMENTS.INTENT.start} durationInFrames={SEGMENTS.INTENT.end - SEGMENTS.INTENT.start}>
        <Segment1Intent />
      </Sequence>

      {/* Segment 2: Message → Compute (90-240f | 3-8s)
          Blue bubble slides left → send arrow flies → ComputeDevice forms */}
      <Sequence from={SEGMENTS.MESSAGE_COMPUTE.start} durationInFrames={SEGMENTS.MESSAGE_COMPUTE.end - SEGMENTS.MESSAGE_COMPUTE.start}>
        <Segment2MessageCompute />
      </Sequence>

      {/* Segment 3: Compute → Agent (240-360f | 8-12s)
          ComputeDevice glows → panels split → friendly Robot emerges */}
      <Sequence from={SEGMENTS.COMPUTE_AGENT.start} durationInFrames={SEGMENTS.COMPUTE_AGENT.end - SEGMENTS.COMPUTE_AGENT.start}>
        <Segment3ComputeAgent />
      </Sequence>

      {/* Segment 4: Agent → Code (360-540f | 12-18s)
          Robot raises arm → code frame grows → VS Code dark theme appears */}
      <Sequence from={SEGMENTS.AGENT_CODE.start} durationInFrames={SEGMENTS.AGENT_CODE.end - SEGMENTS.AGENT_CODE.start}>
        <Segment4AgentCode />
      </Sequence>

      {/* Segment 5: Code → App (540-720f | 18-24s)
          Code blocks detach → magnetic snap to modern app UI */}
      <Sequence from={SEGMENTS.CODE_APP.start} durationInFrames={SEGMENTS.CODE_APP.end - SEGMENTS.CODE_APP.start}>
        <Segment5CodeApp />
      </Sequence>

      {/* Segment 6: App → Spreadsheet (720-900f | 24-30s)
          UI flattens to grid → Numbers-style spreadsheet with real data */}
      <Sequence from={SEGMENTS.APP_SPREADSHEET.start} durationInFrames={SEGMENTS.APP_SPREADSHEET.end - SEGMENTS.APP_SPREADSHEET.start}>
        <Segment6AppSpreadsheet />
      </Sequence>

      {/* Segment 7: Spreadsheet → Presentation (900-1140f | 30-38s)
          Cell zooms to slide → Keynote flipbook effect → single slide */}
      <Sequence from={SEGMENTS.SPREADSHEET_PRESENTATION.start} durationInFrames={SEGMENTS.SPREADSHEET_PRESENTATION.end - SEGMENTS.SPREADSHEET_PRESENTATION.start}>
        <Segment7SpreadsheetPresentation />
      </Sequence>

      {/* Segment 8: Resolve (1140-1260f | 38-42s)
          Slide fades with scale → "This is what AI agents do." */}
      <Sequence from={SEGMENTS.RESOLVE.start} durationInFrames={SEGMENTS.RESOLVE.end - SEGMENTS.RESOLVE.start}>
        <Segment8Resolve />
      </Sequence>
    </AbsoluteFill>
  );
};
