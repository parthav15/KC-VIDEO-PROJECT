import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TopAccentBar } from "./HMBackground";
import { hmPalette } from "../hm-theme";

export const HMCTA: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const monoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });
  const applySpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const wordSpring = spring({
    frame: frame - 44,
    fps,
    config: { damping: 18, stiffness: 100 },
  });
  const ctaSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.55 },
  });
  const phonesOp = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fade = interpolate(frame, [duration - 14, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = Math.sin((frame / fps) * Math.PI * 2 * 1.6) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        opacity: fade,
        background: `radial-gradient(ellipse at 50% 28%, ${hmPalette.ink} 0%, ${hmPalette.inkDeep} 55%, ${hmPalette.inkSoft} 100%)`,
      }}
    >
      <TopAccentBar />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div
          style={{
            position: "relative",
            transform: `scale(${0.7 + monoSpring * 0.3})`,
            opacity: monoSpring,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -20,
              borderRadius: "50%",
              border: `1.5px solid ${hmPalette.hairlineGold}`,
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: hmPalette.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 32px rgba(11,26,54,0.18)",
              border: `1px solid ${hmPalette.hairline}`,
            }}
          >
            <Img
              src={staticFile("images/kc-logo-round.png")}
              style={{ width: 100, height: 100, objectFit: "contain" }}
            />
          </div>
        </div>

        <div
          style={{
            opacity: applySpring,
            transform: `translateY(${interpolate(applySpring, [0, 1], [18, 0])}px)`,
            color: hmPalette.red,
            fontFamily: "Fraunces, serif",
            fontStyle: "italic",
            fontSize: 86,
            fontWeight: 400,
            letterSpacing: -1.5,
            textAlign: "center",
          }}
        >
          Apply today.
        </div>

        <div
          style={{
            opacity: wordSpring,
            transform: `translateY(${interpolate(wordSpring, [0, 1], [16, 0])}px)`,
            background: hmPalette.white,
            padding: "14px 26px",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(11,26,54,0.14)",
            border: `1px solid ${hmPalette.hairline}`,
          }}
        >
          <Img
            src={staticFile("images/kc-logo.png")}
            style={{ width: 360, height: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        <div
          style={{
            color: hmPalette.ivorySoft,
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            letterSpacing: 5,
            textTransform: "uppercase",
            fontWeight: 800,
            marginTop: -10,
          }}
        >
          College of Hotel Management
        </div>

        <div
          style={{
            marginTop: 10,
            opacity: ctaSpring,
            transform: `scale(${0.9 + ctaSpring * 0.1})`,
            background: `linear-gradient(135deg, ${hmPalette.red} 0%, ${hmPalette.redDeep} 100%)`,
            color: hmPalette.white,
            padding: "20px 44px",
            borderRadius: 999,
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            boxShadow: `0 12px 36px rgba(199,40,57,${0.30 + pulse * 0.20})`,
          }}
        >
          ★  Admissions 2026-27  ★
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: phonesOp,
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
        }}
      >
        <div style={{ marginBottom: 6, color: hmPalette.red, fontSize: 13, letterSpacing: 5, textTransform: "uppercase", fontWeight: 800 }}>
          Helpline
        </div>
        <div style={{ color: hmPalette.ivory, fontFamily: "Fraunces, serif", fontSize: 32, fontVariantNumeric: "tabular-nums" }}>
          98149-66663  ·  98149-66664
        </div>
        <div style={{ marginTop: 8, color: hmPalette.ivorySoft, fontSize: 14, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700, opacity: 0.85 }}>
          kcinstitutes.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
