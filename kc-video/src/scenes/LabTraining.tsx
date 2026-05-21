import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { BrandBug } from "../components/Monogram";
import { Eyebrow, Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

export const LabTraining: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();

  const exitOpacity = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <FullBleedPhoto
        src="images/students-reading.jpeg"
        duration={duration}
        zoomFrom={1.10}
        zoomTo={1.20}
        position="50% 35%"
        overlay="linear-gradient(180deg, rgba(4,10,34,0.30) 0%, rgba(4,10,34,0.10) 25%, rgba(4,10,34,0.65) 75%, rgba(4,10,34,0.80) 100%)"
      />
      <BrandBug />

      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 70,
          right: 70,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <Eyebrow text="Hands-on  ·  Practical" delay={0} textShadow={textShadowStrong} />
        <div>
          <Reveal
            text="Where theory"
            delay={4}
            size={84}
            family="display"
            weight={400}
            color={palette.ivory}
            letterSpacing={-1.4}
            lineHeight={1}
            textShadow={textShadowStrong}
          />
          <Reveal
            text="meets the lab."
            delay={12}
            size={84}
            family="displayItalic"
            weight={400}
            color={palette.gold}
            letterSpacing={-1.4}
            lineHeight={1}
            textShadow={textShadowStrong}
          />
        </div>
        <div
          style={{
            marginTop: 8,
            color: palette.ivorySoft,
            fontFamily: "Inter, sans-serif",
            fontSize: 22,
            letterSpacing: 0.5,
            lineHeight: 1.4,
            maxWidth: 760,
            fontWeight: 400,
            textShadow: textShadowStrong,
            opacity: interpolate(frame, [22, 44], [0, 0.95], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Real labs. Real projects. Real-world skills.
        </div>
      </div>
    </AbsoluteFill>
  );
};
