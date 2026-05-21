import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "../theme";

export const Background: React.FC<{ variant?: "deep" | "warm" }> = ({
  variant = "deep",
}) => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.04) % 100;

  return (
    <AbsoluteFill
      style={{
        background:
          variant === "deep"
            ? `radial-gradient(ellipse at 30% 20%, ${palette.inkSoft} 0%, ${palette.ink} 35%, ${palette.inkDeep} 100%)`
            : `radial-gradient(ellipse at 50% 30%, #3a0d14 0%, ${palette.ink} 45%, ${palette.inkDeep} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${50 + Math.sin(frame / 60) * 6}% ${
            30 + Math.cos(frame / 70) * 6
          }%, ${palette.redGlow} 0%, rgba(193,40,57,0) 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
          opacity: 0.55,
          transform: `translate(${drift}px, ${drift * 0.6}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
