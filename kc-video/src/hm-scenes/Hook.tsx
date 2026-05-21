import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HMFullBleed, HMTextShadow, TopAccentBar } from "./HMBackground";
import { hmPalette } from "../hm-theme";

export const Hook: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const splitPoint = Math.round(duration * 0.42);

  const fromOp = interpolate(frame, [0, 8, splitPoint - 4, splitPoint + 2], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const toOp = interpolate(frame, [splitPoint - 2, splitPoint + 8, duration - 6, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const punchSpring = spring({
    frame: frame - splitPoint,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.55 },
  });

  return (
    <AbsoluteFill style={{ background: hmPalette.inkDeep }}>
      <TopAccentBar />
      <AbsoluteFill style={{ opacity: fromOp }}>
        <HMFullBleed
          src="hm-images/hm-campus.jpeg"
          duration={duration}
          zoomFrom={1.18}
          zoomTo={1.28}
          position="50% 60%"
          accent="red"
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              color: hmPalette.ivorySoft,
              fontFamily: "Inter, sans-serif",
              fontSize: 22,
              letterSpacing: 7,
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: 0.85,
              textShadow: HMTextShadow,
              marginBottom: 20,
            }}
          >
            From a classroom
          </div>
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Fraunces, serif",
              fontSize: 96,
              fontWeight: 400,
              letterSpacing: -2,
              textShadow: HMTextShadow,
            }}
          >
            in Punjab<span style={{ color: hmPalette.red, fontStyle: "italic" }}>…</span>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: toOp }}>
        <HMFullBleed
          src="hm-images/vinay-macallan.jpeg"
          duration={duration}
          zoomFrom={1.06}
          zoomTo={1.16}
          position="50% 30%"
          accent="gold"
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            transform: `scale(${0.85 + punchSpring * 0.15})`,
          }}
        >
          <div
            style={{
              color: hmPalette.ivorySoft,
              fontFamily: "Inter, sans-serif",
              fontSize: 22,
              letterSpacing: 7,
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: 0.9,
              textShadow: HMTextShadow,
              marginBottom: 22,
            }}
          >
            …to
          </div>
          <div
            style={{
              color: hmPalette.gold,
              fontFamily: "Fraunces, serif",
              fontStyle: "italic",
              fontSize: 140,
              fontWeight: 400,
              letterSpacing: -3,
              textShadow: "0 1px 0 rgba(255,255,255,0.6), 0 0 22px rgba(255,255,255,0.5)",
              lineHeight: 1,
            }}
          >
            The Macallan.
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
