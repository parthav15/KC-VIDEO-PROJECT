import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HMFullBleed, HMTextShadow } from "./HMBackground";
import { hmPalette } from "../hm-theme";

const ProofCard: React.FC<{
  src: string;
  position?: string;
  tag: string;
  label: string;
  from: number;
  to: number;
  duration: number;
}> = ({ src, position = "center", tag, label, from, to, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visible = frame >= from && frame < to;
  const local = frame - from;
  const total = to - from;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 16, stiffness: 200, mass: 0.5 },
  });

  const opacity = interpolate(local, [0, 4, total - 5, total], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (!visible) return null;

  return (
    <AbsoluteFill style={{ opacity }}>
      <HMFullBleed
        src={src}
        duration={duration}
        zoomFrom={1.12}
        zoomTo={1.20}
        position={position}
        overlay="linear-gradient(180deg, rgba(4,10,34,0.40) 0%, rgba(4,10,34,0.20) 40%, rgba(4,10,34,0.80) 100%)"
        accent="gold"
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 280,
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            opacity: enter,
            transform: `scale(${0.86 + enter * 0.14})`,
            color: hmPalette.gold,
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            letterSpacing: 5,
            textTransform: "uppercase",
            fontWeight: 700,
            padding: "10px 22px",
            background: "linear-gradient(135deg, rgba(212,168,87,0.30) 0%, rgba(212,168,87,0.08) 100%)",
            border: `1.5px solid rgba(212,168,87,0.7)`,
            borderRadius: 999,
            backdropFilter: "blur(12px)",
            textShadow: HMTextShadow,
          }}
        >
          {tag}
        </div>
        <div
          style={{
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [22, 0])}px)`,
            color: hmPalette.white,
            fontFamily: "Fraunces, serif",
            fontSize: 84,
            fontWeight: 400,
            letterSpacing: -1.5,
            textAlign: "center",
            lineHeight: 1,
            textShadow: HMTextShadow,
            padding: "0 60px",
          }}
        >
          {label}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Proof: React.FC<{ duration: number }> = ({ duration }) => {
  const third = Math.round(duration / 3);
  return (
    <AbsoluteFill style={{ background: hmPalette.inkDeep }}>
      <ProofCard
        src="hm-images/restaurant-award.jpeg"
        position="50% 30%"
        tag="01  ·  Awards"
        label="Award-winning."
        from={0}
        to={third}
        duration={duration}
      />
      <ProofCard
        src="hm-images/darwin-student.jpeg"
        position="50% 35%"
        tag="02  ·  Global Reach"
        label="Internationally placed."
        from={third}
        to={third * 2}
        duration={duration}
      />
      <ProofCard
        src="hm-images/vinay-tausen.jpeg"
        position="50% 30%"
        tag="03  ·  Industry"
        label="Industry recognized."
        from={third * 2}
        to={duration}
        duration={duration}
      />
    </AbsoluteFill>
  );
};
