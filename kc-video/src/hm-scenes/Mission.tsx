import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TopAccentBar } from "./HMBackground";
import { hmPalette } from "../hm-theme";

export const Mission: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = interpolate(frame, [2, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const punchSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.5 },
  });

  const exit = interpolate(frame, [duration - 6, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          gap: 12,
          padding: "0 70px",
        }}
      >
        <div
          style={{
            color: hmPalette.ivorySoft,
            fontFamily: "Fraunces, serif",
            fontStyle: "italic",
            fontSize: 56,
            fontWeight: 400,
            letterSpacing: -1.2,
            textAlign: "center",
            lineHeight: 1.05,
            opacity: line1,
            transform: `translateY(${interpolate(line1, [0, 1], [14, 0])}px)`,
            marginBottom: 16,
          }}
        >
          We don't train hoteliers —
        </div>

        <div
          style={{
            transform: `scale(${0.7 + punchSpring * 0.3})`,
            opacity: punchSpring,
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Inter, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              lineHeight: 1.1,
              marginBottom: 10,
              opacity: 0.85,
            }}
          >
            we build
          </div>
          <div
            style={{
              color: hmPalette.red,
              fontFamily: "Inter, sans-serif",
              fontSize: 130,
              fontWeight: 900,
              letterSpacing: 4,
              textTransform: "uppercase",
              lineHeight: 0.95,
              textShadow:
                "0 4px 22px rgba(199,40,57,0.20), 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            Global
          </div>
          <div
            style={{
              color: hmPalette.red,
              fontFamily: "Inter, sans-serif",
              fontSize: 130,
              fontWeight: 900,
              letterSpacing: 4,
              textTransform: "uppercase",
              lineHeight: 0.95,
              textShadow:
                "0 4px 22px rgba(199,40,57,0.20), 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            Icons.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
