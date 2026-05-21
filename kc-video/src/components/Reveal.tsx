import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../theme";

type RevealProps = {
  text: string;
  delay?: number;
  size?: number;
  weight?: number;
  family?: "display" | "ui" | "displayItalic";
  color?: string;
  letterSpacing?: number;
  lineHeight?: number;
  align?: "left" | "center" | "right";
  uppercase?: boolean;
  maxWidth?: number;
  textShadow?: string;
};

export const Reveal: React.FC<RevealProps> = ({
  text,
  delay = 0,
  size = 64,
  weight = 500,
  family = "display",
  color = palette.ivory,
  letterSpacing = 0,
  lineHeight = 1.05,
  align = "left",
  uppercase = false,
  maxWidth,
  textShadow,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;

  const fontFamily =
    family === "display"
      ? "Fraunces, serif"
      : family === "displayItalic"
        ? "Fraunces, serif"
        : "Inter, sans-serif";

  const reveal = spring({
    frame: local,
    fps,
    config: { damping: 24, stiffness: 90, mass: 0.7 },
  });

  const translateY = interpolate(reveal, [0, 1], [40, 0]);
  const opacity = interpolate(local, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const clipReveal = interpolate(local, [0, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        overflow: "hidden",
        textAlign: align,
        maxWidth,
      }}
    >
      <div
        style={{
          color,
          fontFamily,
          fontSize: size,
          fontWeight: weight,
          fontStyle: family === "displayItalic" ? "italic" : "normal",
          lineHeight,
          letterSpacing,
          textTransform: uppercase ? "uppercase" : "none",
          transform: `translateY(${translateY}px)`,
          opacity,
          clipPath: `inset(0 ${100 - clipReveal}% 0 0)`,
          textShadow,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Eyebrow: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  textShadow?: string;
}> = ({
  text,
  delay = 0,
  color = palette.gold,
  textShadow,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;

  const opacity = interpolate(local, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineWidth = spring({
    frame: local - 4,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity,
      }}
    >
      <div
        style={{
          width: lineWidth * 60,
          height: 1.5,
          background: color,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          color,
          fontFamily: "Inter, sans-serif",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: 4.5,
          textTransform: "uppercase",
          textShadow,
        }}
      >
        {text}
      </div>
    </div>
  );
};
