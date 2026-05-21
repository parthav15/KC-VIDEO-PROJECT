import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { BrandBug } from "../components/Monogram";
import { Eyebrow, Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

const SidePanel: React.FC<{
  src: string;
  position?: string;
  label: string;
  detail: string;
  delay: number;
  duration: number;
}> = ({ src, position = "center", label, detail, delay, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;
  const enter = spring({
    frame: local,
    fps,
    config: { damping: 22, stiffness: 80 },
  });

  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`,
      }}
    >
      <AbsoluteFill style={{ position: "relative", height: "100%" }}>
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: position,
            filter: "saturate(1.20) contrast(1.06) brightness(0.92)",
            transform: `scale(${interpolate(local, [0, duration], [1.06, 1.14])})`,
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(4,10,34,0.12) 0%, rgba(4,10,34,0.02) 35%, rgba(4,10,34,0.72) 100%)",
          }}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 32,
          right: 32,
          bottom: 36,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            color: palette.gold,
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 700,
            textShadow: textShadowStrong,
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: palette.ivory,
            fontFamily: "Fraunces, serif",
            fontSize: 34,
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: -0.4,
            textShadow: textShadowStrong,
            whiteSpace: "pre-line",
          }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
};

export const HostelTransport: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();

  const exitOpacity = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <FullBleedPhoto
        src="images/hostel-courtyard.jpeg"
        duration={duration}
        zoomFrom={1.08}
        zoomTo={1.16}
        overlay="linear-gradient(180deg, rgba(4,10,34,0.62) 0%, rgba(4,10,34,0.58) 100%)"
        filter="saturate(1.10) contrast(1.05) brightness(0.65)"
      />
      <BrandBug />

      <div
        style={{
          position: "absolute",
          top: 240,
          left: 70,
          right: 70,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <Eyebrow text="Campus Life  ·  Cared For" delay={0} textShadow={textShadowStrong} />
        <Reveal
          text="A home"
          delay={2}
          size={80}
          family="display"
          weight={400}
          color={palette.ivory}
          letterSpacing={-1.4}
          lineHeight={0.95}
          textShadow={textShadowStrong}
        />
        <Reveal
          text="away from home."
          delay={10}
          size={80}
          family="displayItalic"
          weight={400}
          color={palette.gold}
          letterSpacing={-1.4}
          lineHeight={0.95}
          textShadow={textShadowStrong}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 720,
          left: 70,
          right: 70,
          height: 900,
          display: "flex",
          gap: 20,
          borderRadius: 22,
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1, borderRadius: 22, overflow: "hidden", border: `1px solid ${palette.hairline}` }}>
          <SidePanel
            src="images/girls-hostel.jpeg"
            position="50% 30%"
            label="Hostels"
            detail={"Safe, separate\nresidences for\nboys & girls."}
            delay={20}
            duration={duration}
          />
        </div>
        <div style={{ flex: 1, borderRadius: 22, overflow: "hidden", border: `1px solid ${palette.hairline}` }}>
          <SidePanel
            src="images/buses.jpeg"
            position="50% 50%"
            label="Transport"
            detail={"Daily routes\nfrom all\nsurrounding areas."}
            delay={32}
            duration={duration}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
