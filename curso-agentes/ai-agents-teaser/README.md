# AI Agents Teaser

A 42-second Apple-style keynote teaser video demonstrating AI agent capabilities through continuous SVG morphing animations.

## Technical Specs

- **Duration**: 42 seconds (1260 frames)
- **FPS**: 30
- **Resolution**: 1920x1080
- **Composition ID**: AIAgentsTeaser
- **Style**: Minimal Apple keynote, light background

## Timeline

| Segment | Frames | Time | Visual |
|---------|--------|------|--------|
| 1. Intent | 0-90 | 0-3s | Blinking cursor types ">" and morphs to message bubble |
| 2. Message to Compute | 90-240 | 3-8s | Message slides left, transforms to Mac Mini |
| 3. Compute to Agent | 240-360 | 8-12s | Mac Mini splits and morphs to geometric crab |
| 4. Agent to Code | 360-540 | 12-18s | Crab raises claw, frame becomes VS Code editor |
| 5. Code to App | 540-720 | 18-24s | Code blocks detach and snap into app UI |
| 6. App to Spreadsheet | 720-900 | 24-30s | UI elements flatten to spreadsheet grid |
| 7. Spreadsheet to Presentation | 900-1140 | 30-38s | Cell zooms to slide, flipbook effect |
| 8. Resolve | 1140-1260 | 38-42s | Everything fades, final message appears |

## Visual System

- **Background**: #F5F5F7
- **Primary**: #1C1C1E
- **Accent**: #3A7AFE (sparingly)
- **Typography**: SF-Pro-like system font

## Getting Started

```bash
# Install dependencies
npm install

# Start Remotion Studio
npm start

# Render final video
npm run build
```

## Project Structure

```
src/
  index.ts           # Remotion entry point
  Root.tsx           # Composition registration
  AIAgentsTeaser.tsx # Main composition
  components/        # Reusable SVG components
  sequences/         # Timeline segment components
  utils/             # Constants and animation helpers
```

## Animation Rules

- Spring animations for organic motion (agents, morph settles)
- Interpolate for mechanical motion (grids, spreadsheets)
- Elements preserve spatial continuity
- No fade-to-black or jump cuts
