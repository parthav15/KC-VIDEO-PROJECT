import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HMEyebrow, TopAccentBar } from "./HMBackground";
import { hmPalette } from "../hm-theme";

export const Offer: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.55 },
  });
  const subSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  const exit = interpolate(frame, [duration - 6, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = Math.sin((frame / fps) * Math.PI * 2 * 2) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        opacity: exit,
        background: `radial-gradient(ellipse at 50% 40%, ${hmPalette.ink} 0%, ${hmPalette.inkDeep} 60%, ${hmPalette.inkSoft} 100%)`,
      }}
    >
      <TopAccentBar />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <HMEyebrow text="Hotel Management" delay={0} align="center" color={hmPalette.gold} />

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            transform: `scale(${0.85 + numSpring * 0.15})`,
            opacity: numSpring,
          }}
        >
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Fraunces, serif",
              fontSize: 64,
              fontWeight: 400,
              letterSpacing: -1,
            }}
          >
            Admissions
          </div>
          <div
            style={{
              color: hmPalette.white,
              background: hmPalette.red,
              fontFamily: "Inter, sans-serif",
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: 5,
              textTransform: "uppercase",
              padding: "6px 22px",
              borderRadius: 8,
              boxShadow: `0 8px 28px rgba(199,40,57,${0.30 + pulse * 0.25})`,
            }}
          >
            OPEN
          </div>
        </div>

        <div
          style={{
            color: hmPalette.red,
            fontFamily: "Fraunces, serif",
            fontStyle: "italic",
            fontSize: 118,
            fontWeight: 400,
            letterSpacing: -2,
            lineHeight: 1,
            opacity: subSpring,
            transform: `translateY(${interpolate(subSpring, [0, 1], [18, 0])}px)`,
          }}
        >
          2026 – 27.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
