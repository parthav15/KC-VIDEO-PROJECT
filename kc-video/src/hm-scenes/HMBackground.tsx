import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { hmPalette } from "../hm-theme";

export const HMFullBleed: React.FC<{
  src: string;
  duration: number;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  panY?: number;
  position?: React.CSSProperties["objectPosition"];
  overlay?: string;
  filter?: string;
  accent?: "gold" | "red";
}> = ({
  src,
  duration,
  zoomFrom = 1.08,
  zoomTo = 1.18,
  panX = 0,
  panY = 0,
  position = "center",
  overlay,
  filter = "saturate(1.18) contrast(1.05) brightness(1.0)",
  accent = "red",
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(t, [0, 1], [zoomFrom, zoomTo]);
  const tx = interpolate(t, [0, 1], [0, panX]);
  const ty = interpolate(t, [0, 1], [0, panY]);

  const accentGlow =
    accent === "red"
      ? "radial-gradient(circle at 24% 18%, rgba(199,40,57,0.22) 0%, rgba(199,40,57,0) 50%), radial-gradient(circle at 82% 86%, rgba(212,168,87,0.10) 0%, rgba(212,168,87,0) 55%)"
      : "radial-gradient(circle at 24% 18%, rgba(212,168,87,0.20) 0%, rgba(212,168,87,0) 50%), radial-gradient(circle at 82% 86%, rgba(199,40,57,0.12) 0%, rgba(199,40,57,0) 55%)";

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: hmPalette.inkDeep }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
          filter,
        }}
      />
      {overlay && (
        <AbsoluteFill style={{ background: overlay, pointerEvents: "none" }} />
      )}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,232,0.22) 0%, rgba(251,246,232,0.02) 28%, rgba(251,246,232,0.02) 55%, rgba(251,246,232,0.78) 85%, rgba(251,246,232,0.95) 100%)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill style={{ background: accentGlow, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

const textShadow = "0 1px 0 rgba(255,255,255,0.6), 0 0 18px rgba(255,255,255,0.55)";

export const HMEyebrow: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  align?: "left" | "center";
}> = ({ text, delay = 0, color = hmPalette.red, align = "left" }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const op = interpolate(local, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineW = interpolate(local, [0, 18], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: op,
        justifyContent: align === "center" ? "center" : "flex-start",
      }}
    >
      <div style={{ width: lineW, height: 3, background: color, borderRadius: 2 }} />
      <div
        style={{
          color,
          fontFamily: "Inter, sans-serif",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const TopAccentBar: React.FC<{ color?: string; delay?: number }> = ({
  color = hmPalette.red,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame - delay, [0, 22], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: 8,
        width: `${w}%`,
        background: color,
        zIndex: 5,
        boxShadow: `0 4px 14px ${color}55`,
      }}
    />
  );
};

export const HMTextShadow = textShadow;
