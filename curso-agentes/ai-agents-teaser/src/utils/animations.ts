import { interpolate, spring, Easing } from "remotion";
import { EASINGS, SPRINGS } from "./constants";

// Get segment progress (0-1) for a given frame within a segment
export function getSegmentProgress(
  frame: number,
  segmentStart: number,
  segmentEnd: number
): number {
  return interpolate(frame, [segmentStart, segmentEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// Spring animation helper
export function springValue(
  frame: number,
  fps: number,
  startFrame: number,
  config: { stiffness: number; damping: number } = SPRINGS.organic
): number {
  return spring({
    frame: frame - startFrame,
    fps,
    config,
  });
}

// Organic spring (icons, windows)
export function organicSpring(
  frame: number,
  fps: number,
  startFrame: number
): number {
  return spring({
    frame: frame - startFrame,
    fps,
    config: SPRINGS.organic,
  });
}

// Snappy spring (UI elements)
export function snappySpring(
  frame: number,
  fps: number,
  startFrame: number
): number {
  return spring({
    frame: frame - startFrame,
    fps,
    config: SPRINGS.snappy,
  });
}

// Gentle spring (background elements)
export function gentleSpring(
  frame: number,
  fps: number,
  startFrame: number
): number {
  return spring({
    frame: frame - startFrame,
    fps,
    config: SPRINGS.gentle,
  });
}

// Bouncy spring (playful feedback)
export function bouncySpring(
  frame: number,
  fps: number,
  startFrame: number
): number {
  return spring({
    frame: frame - startFrame,
    fps,
    config: SPRINGS.bouncy,
  });
}

// Apple-style entrance easing (ease-out)
export function easeOut(progress: number): number {
  return interpolate(progress, [0, 1], [0, 1], {
    easing: Easing.bezier(...EASINGS.entrance),
  });
}

// Apple-style smooth transition (ease-in-out)
export function easeInOut(progress: number): number {
  return interpolate(progress, [0, 1], [0, 1], {
    easing: Easing.bezier(...EASINGS.smooth),
  });
}

// Apple-style exit easing (ease-in)
export function easeIn(progress: number): number {
  return interpolate(progress, [0, 1], [0, 1], {
    easing: Easing.bezier(...EASINGS.exit),
  });
}

// Apple default easing
export function appleEase(progress: number): number {
  return interpolate(progress, [0, 1], [0, 1], {
    easing: Easing.bezier(...EASINGS.apple),
  });
}

// Aggressive deceleration
export function decelerate(progress: number): number {
  return interpolate(progress, [0, 1], [0, 1], {
    easing: Easing.bezier(...EASINGS.decelerate),
  });
}

// Speed ramp helper - accelerates then decelerates
export function speedRamp(
  frame: number,
  startFrame: number,
  endFrame: number,
  rampPoint: number = 0.3
): number {
  const progress = getSegmentProgress(frame, startFrame, endFrame);

  if (progress < rampPoint) {
    return interpolate(progress, [0, rampPoint], [0, 0.7], {
      easing: Easing.bezier(0.4, 0, 1, 1),
    });
  }

  return interpolate(progress, [rampPoint, 1], [0.7, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
  });
}

// Staggered animation for multiple elements
export function staggeredDelay(
  index: number,
  totalItems: number,
  totalDuration: number
): number {
  return (index / totalItems) * totalDuration * 0.6;
}

// Micro idle animation (subtle rotation)
export function idleRotation(frame: number, amplitude: number = 1): number {
  return Math.sin(frame * 0.05) * amplitude;
}

// Idle breathing animation (subtle scale)
export function idleBreathing(frame: number, amplitude: number = 0.02): number {
  return 1 + Math.sin(frame * 0.08) * amplitude;
}

// Eye blink animation
export function blinkAnimation(frame: number, blinkDuration: number = 6): number {
  // Blink every ~90 frames with random variation
  const blinkCycle = 90;
  const cycleFrame = frame % blinkCycle;

  if (cycleFrame < blinkDuration) {
    // Quick close and open
    const blinkProgress = cycleFrame / blinkDuration;
    return blinkProgress < 0.5
      ? 1 - (blinkProgress * 2)
      : (blinkProgress - 0.5) * 2;
  }
  return 1;
}

// Morph progress with easing
export function morphProgress(
  frame: number,
  startFrame: number,
  duration: number
): number {
  const raw = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return easeInOut(raw);
}

// Interpolate with Apple-style easing
export function appleInterpolate(
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number {
  const progress = interpolate(frame, inputRange, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = appleEase(progress);
  return outputRange[0] + (outputRange[1] - outputRange[0]) * eased;
}

// Pulse animation (for attention)
export function pulse(
  frame: number,
  startFrame: number,
  fps: number,
  pulseCount: number = 2
): number {
  const elapsed = frame - startFrame;
  if (elapsed < 0) return 0;

  const pulseDuration = fps / 2; // 0.5 second per pulse
  const totalDuration = pulseDuration * pulseCount;

  if (elapsed > totalDuration) return 0;

  const pulseProgress = (elapsed % pulseDuration) / pulseDuration;
  return Math.sin(pulseProgress * Math.PI) * 0.5;
}

// Typewriter effect - returns visible character count
export function typewriterProgress(
  frame: number,
  startFrame: number,
  totalChars: number,
  fps: number,
  charsPerSecond: number = 20
): number {
  const elapsed = frame - startFrame;
  if (elapsed < 0) return 0;

  const framesPerChar = fps / charsPerSecond;
  const visibleChars = Math.floor(elapsed / framesPerChar);

  return Math.min(visibleChars, totalChars);
}

// Cursor blink
export function cursorBlink(frame: number, fps: number): number {
  const blinkCycle = fps; // 1 second cycle
  const phase = (frame % blinkCycle) / blinkCycle;
  return phase < 0.5 ? 1 : 0;
}

// Smooth step (like GLSL smoothstep)
export function smoothStep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Overshoot animation
export function overshoot(progress: number, amount: number = 0.1): number {
  if (progress < 0.8) {
    return interpolate(progress, [0, 0.8], [0, 1 + amount], {
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }
  return interpolate(progress, [0.8, 1], [1 + amount, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
}

// Elastic out (bouncy settle)
export function elasticOut(progress: number): number {
  if (progress === 0 || progress === 1) return progress;
  const p = 0.3;
  return Math.pow(2, -10 * progress) * Math.sin((progress - p / 4) * (2 * Math.PI) / p) + 1;
}
