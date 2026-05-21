import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HMFullBleed, HMEyebrow, HMTextShadow, TopAccentBar } from "./HMBackground";
import { hmPalette } from "../hm-theme";

export const VinayReveal: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const nameSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 150 },
  });
  const badgeSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 18, stiffness: 130 },
  });
  const packageSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.55 },
  });

  const exit = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pkgPulse = frame >= 100 ? Math.sin(((frame - 100) / fps) * Math.PI * 2 * 2) * 0.5 + 0.5 : 0;

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <HMFullBleed
        src="hm-images/vinay-macallan.jpeg"
        duration={duration}
        zoomFrom={1.04}
        zoomTo={1.14}
        position="50% 22%"
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
        <HMEyebrow text="KC Hotel Management" delay={2} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 260,
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
              fontSize: 104,
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
            marginTop: 18,
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
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: hmPalette.gold }} />
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
          <div style={{ width: 1, height: 20, background: hmPalette.hairline }} />
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Fraunces, serif",
              fontStyle: "italic",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            The Macallan
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 70,
          right: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 28px",
          background: hmPalette.white,
          border: `2px solid rgba(199,40,57,${0.55 + pkgPulse * 0.25})`,
          borderRadius: 18,
          opacity: packageSpring,
          transform: `scale(${0.92 + packageSpring * 0.08})`,
          boxShadow: `0 14px 36px rgba(199,40,57,${0.18 + pkgPulse * 0.12})`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              color: hmPalette.red,
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            Package
          </div>
          <div
            style={{
              color: hmPalette.ivorySoft,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              letterSpacing: 1,
              fontWeight: 500,
            }}
          >
            Per Annum
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <div
            style={{
              color: hmPalette.ivory,
              fontFamily: "Fraunces, serif",
              fontSize: 80,
              fontWeight: 500,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            ₹78
          </div>
          <div
            style={{
              color: hmPalette.red,
              fontFamily: "Inter, sans-serif",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            LAKHS
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
