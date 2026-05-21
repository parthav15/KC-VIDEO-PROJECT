import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { BrandBug } from "../components/Monogram";
import { Eyebrow, Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

export const Admissions: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });

  const exitOpacity = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <FullBleedPhoto
        src="images/student-portrait.jpeg"
        duration={duration}
        zoomFrom={1.06}
        zoomTo={1.14}
        position="50% 25%"
        panY={-10}
        overlay="linear-gradient(180deg, rgba(4,10,34,0.45) 0%, rgba(4,10,34,0.02) 35%, rgba(4,10,34,0.02) 55%, rgba(4,10,34,0.72) 100%)"
      />
      <BrandBug />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 260,
          flexDirection: "column",
          gap: 26,
        }}
      >
        <Eyebrow text="Admissions  ·  OPEN" delay={0} textShadow={textShadowStrong} />

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 20,
            transform: `scale(${0.92 + stampSpring * 0.08})`,
          }}
        >
          <Reveal
            text="2026"
            delay={6}
            size={180}
            family="display"
            weight={300}
            color={palette.ivory}
            letterSpacing={-4}
            lineHeight={1}
            textShadow={textShadowStrong}
          />
          <Reveal
            text="–27"
            delay={16}
            size={130}
            family="displayItalic"
            weight={400}
            color={palette.gold}
            letterSpacing={-3}
            lineHeight={1}
            textShadow={textShadowStrong}
          />
        </div>
        <Reveal
          text="batch awaits."
          delay={26}
          size={48}
          family="display"
          weight={400}
          color={palette.ivorySoft}
          align="center"
          letterSpacing={-0.5}
          textShadow={textShadowStrong}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            background: palette.gold,
            padding: "16px 32px",
            borderRadius: 999,
            color: palette.white,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: interpolate(frame, [44, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow: `0 6px 28px rgba(214,52,64,0.45)`,
          }}
        >
          Apply now ↗
        </div>
      </div>
    </AbsoluteFill>
  );
};
