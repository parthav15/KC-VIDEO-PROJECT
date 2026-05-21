import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HMFullBleed, HMEyebrow, HMTextShadow } from "./HMBackground";
import { hmPalette } from "../hm-theme";

export const AlumniReveal: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 18, stiffness: 130 },
  });

  const badgeSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 18, stiffness: 110 },
  });

  const titleSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  const exit = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <HMFullBleed
        src="hm-images/vinay-macallan.jpeg"
        duration={duration}
        zoomFrom={1.04}
        zoomTo={1.14}
        position="50% 22%"
        overlay="linear-gradient(180deg, rgba(4,10,34,0.30) 0%, rgba(4,10,34,0.10) 35%, rgba(4,10,34,0.85) 100%)"
        accent="gold"
      />

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 70,
          opacity: badgeSpring,
          transform: `translateY(${interpolate(badgeSpring, [0, 1], [-12, 0])}px)`,
        }}
      >
        <HMEyebrow text="KC College of Hotel Mgmt" delay={50} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 70,
          right: 70,
        }}
      >
        <div
          style={{
            opacity: nameSpring,
            transform: `translateY(${interpolate(nameSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              letterSpacing: 5,
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: 0.7,
              textShadow: HMTextShadow,
              marginBottom: 10,
            }}
          >
            This is
          </div>
          <div
            style={{
              color: hmPalette.white,
              fontFamily: "Fraunces, serif",
              fontSize: 120,
              fontWeight: 400,
              letterSpacing: -2.5,
              lineHeight: 1,
              textShadow: HMTextShadow,
            }}
          >
            Vinay Alex.
          </div>
        </div>

        <div
          style={{
            marginTop: 38,
            opacity: titleSpring,
            transform: `translateX(${interpolate(titleSpring, [0, 1], [-30, 0])}px)`,
            padding: "18px 24px",
            background: "linear-gradient(135deg, rgba(212,168,87,0.30) 0%, rgba(212,168,87,0.08) 100%)",
            border: `1.5px solid rgba(212,168,87,0.55)`,
            borderRadius: 14,
            backdropFilter: "blur(12px)",
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 12px 32px rgba(212,168,87,0.25)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: hmPalette.gold,
              boxShadow: `0 0 14px ${hmPalette.gold}`,
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
            Brand Ambassador
          </div>
          <div
            style={{
              width: 1,
              height: 22,
              background: hmPalette.gold,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Fraunces, serif",
              fontStyle: "italic",
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            The Macallan
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
