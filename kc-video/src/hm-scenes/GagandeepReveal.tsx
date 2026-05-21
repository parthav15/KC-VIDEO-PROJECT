import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HMFullBleed, HMEyebrow, HMTextShadow, TopAccentBar } from "./HMBackground";
import { hmPalette } from "../hm-theme";

export const GagandeepReveal: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const nameSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const badgeSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  const exit = interpolate(frame, [duration - 6, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <HMFullBleed
        src="hm-images/vinay-tausen.jpeg"
        duration={duration}
        zoomFrom={1.06}
        zoomTo={1.14}
        position="50% 28%"
        accent="red"
      />
      <TopAccentBar />

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 70,
          opacity: eyebrowSpring,
          transform: `translateY(${interpolate(eyebrowSpring, [0, 1], [-10, 0])}px)`,
        }}
      >
        <HMEyebrow text="KC Alumnus" delay={0} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 70,
          right: 70,
        }}
      >
        <div
          style={{
            opacity: nameSpring,
            transform: `translateY(${interpolate(nameSpring, [0, 1], [22, 0])}px)`,
          }}
        >
          <div
            style={{
              color: hmPalette.ivorySoft,
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              letterSpacing: 5,
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: 0.85,
              marginBottom: 8,
            }}
          >
            Meet
          </div>
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Fraunces, serif",
              fontSize: 86,
              fontWeight: 400,
              letterSpacing: -2,
              lineHeight: 1,
              textShadow: HMTextShadow,
            }}
          >
            Gagandeep Singh.
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            opacity: badgeSpring,
            transform: `translateX(${interpolate(badgeSpring, [0, 1], [-20, 0])}px)`,
            padding: "12px 22px",
            background: hmPalette.ink,
            border: `1.5px solid ${hmPalette.hairlineGold}`,
            borderRadius: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 10px 28px rgba(11,26,54,0.12)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: hmPalette.gold,
            }}
          />
          <div
            style={{
              color: hmPalette.gold,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              letterSpacing: 3.5,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Now At
          </div>
          <div
            style={{
              width: 1,
              height: 20,
              background: hmPalette.hairline,
            }}
          />
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Fraunces, serif",
              fontStyle: "italic",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            Tausen · Luxury Heritage Hotel
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
