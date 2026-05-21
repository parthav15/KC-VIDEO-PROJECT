import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { HMEyebrow, HMTextShadow, TopAccentBar } from "./HMBackground";
import { hmPalette } from "../hm-theme";

type Item = { label: string; sub: string };

const programs: Item[] = [
  { label: "BHMCT", sub: "4-Year Degree" },
  { label: "Culinary Arts", sub: "Diploma" },
  { label: "F & B Service", sub: "Diploma" },
];

const HostelStrip: React.FC<{ src: string; label: string; delay: number; duration: number }> = ({
  src,
  label,
  delay,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;
  const enter = spring({
    frame: local,
    fps,
    config: { damping: 18, stiffness: 130 },
  });
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        borderRadius: 14,
        overflow: "hidden",
        border: `1.5px solid ${hmPalette.hairline}`,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [16, 0])}px)`,
        boxShadow: "0 10px 28px rgba(11,26,54,0.10)",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: 230,
          objectFit: "cover",
          objectPosition: "50% 50%",
          filter: "saturate(1.15) contrast(1.05) brightness(1.02)",
          transform: `scale(${interpolate(local, [0, duration], [1.04, 1.10])})`,
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 16,
          bottom: 14,
          color: hmPalette.white,
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          letterSpacing: 3.5,
          textTransform: "uppercase",
          fontWeight: 800,
          textShadow: "0 2px 10px rgba(0,0,0,0.65)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const CoursesHostel: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 130 },
  });

  const exit = interpolate(frame, [duration - 6, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: exit,
        background: `radial-gradient(ellipse at 50% 30%, ${hmPalette.ink} 0%, ${hmPalette.inkDeep} 65%, ${hmPalette.inkSoft} 100%)`,
      }}
    >
      <TopAccentBar />
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 70,
          right: 70,
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [16, 0])}px)`,
        }}
      >
        <HMEyebrow text="What's on offer" delay={0} />
      </div>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "180px 70px 250px",
          gap: 16,
        }}
      >
        <div
          style={{
            color: hmPalette.ivory,
            fontFamily: "Fraunces, serif",
            fontSize: 64,
            fontWeight: 400,
            letterSpacing: -1.4,
            lineHeight: 1,
            textAlign: "left",
            width: "100%",
          }}
        >
          Career-shaping
        </div>
        <div
          style={{
            color: hmPalette.red,
            fontFamily: "Fraunces, serif",
            fontStyle: "italic",
            fontSize: 78,
            fontWeight: 400,
            letterSpacing: -1.6,
            lineHeight: 1,
            textAlign: "left",
            width: "100%",
            marginBottom: 14,
          }}
        >
          programs.
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {programs.map((p, i) => {
            const s = spring({
              frame: frame - (8 + i * 5),
              fps,
              config: { damping: 18, stiffness: 180 },
            });
            return (
              <div
                key={p.label}
                style={{
                  opacity: s,
                  transform: `translateX(${interpolate(s, [0, 1], [-22, 0])}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 22px",
                  background: hmPalette.ink,
                  borderRadius: 12,
                  border: `1px solid ${hmPalette.hairline}`,
                  boxShadow: "0 6px 18px rgba(11,26,54,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontStyle: "italic",
                    fontSize: 28,
                    color: hmPalette.red,
                    minWidth: 50,
                    fontWeight: 600,
                  }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    width: 2,
                    height: 32,
                    background: hmPalette.red,
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    color: hmPalette.ivory,
                    fontFamily: "Fraunces, serif",
                    fontSize: 28,
                    fontWeight: 500,
                    letterSpacing: -0.4,
                  }}
                >
                  {p.label}
                </div>
                <div
                  style={{
                    color: hmPalette.ivorySoft,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    letterSpacing: 2.8,
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {p.sub}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 18 }} />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            background: hmPalette.redSoft,
            border: `1.5px solid ${hmPalette.hairlineRed}`,
            borderRadius: 999,
            color: hmPalette.red,
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            letterSpacing: 3.5,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 4,
            alignSelf: "flex-start",
          }}
        >
          ★ Safe campus  ·  separate hostels
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            width: "100%",
          }}
        >
          <HostelStrip src="hm-images/boys-hostel.jpeg" label="Boys" delay={30} duration={duration} />
          <HostelStrip src="hm-images/girls-hostel-new.jpeg" label="Girls" delay={36} duration={duration} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
