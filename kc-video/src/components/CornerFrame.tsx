import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "../theme";

export const CornerFrame: React.FC<{ delay?: number; color?: string; inset?: number }> = ({
  delay = 0,
  color = palette.gold,
  inset = 80,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const reveal = interpolate(local, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const len = 110 * reveal;
  const opacity = interpolate(local, [0, 14], [0, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cornerStyle: React.CSSProperties = {
    position: "absolute",
    width: len,
    height: len,
    borderColor: color,
    borderStyle: "solid",
    opacity,
  };

  return (
    <>
      <div
        style={{
          ...cornerStyle,
          top: inset,
          left: inset,
          borderWidth: "1.5px 0 0 1.5px",
        }}
      />
      <div
        style={{
          ...cornerStyle,
          top: inset,
          right: inset,
          borderWidth: "1.5px 1.5px 0 0",
        }}
      />
      <div
        style={{
          ...cornerStyle,
          bottom: inset,
          left: inset,
          borderWidth: "0 0 1.5px 1.5px",
        }}
      />
      <div
        style={{
          ...cornerStyle,
          bottom: inset,
          right: inset,
          borderWidth: "0 1.5px 1.5px 0",
        }}
      />
    </>
  );
};
