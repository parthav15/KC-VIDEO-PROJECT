import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { BrandBug } from "../components/Monogram";
import { Eyebrow, Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

const Counter: React.FC<{
  to: number;
  durationFrames: number;
  delay: number;
}> = ({ to, durationFrames, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 28, stiffness: 50 },
    durationInFrames: durationFrames,
  });
  const value = Math.round(progress * to);
  return (
    <span
      style={{
        fontFamily: "Fraunces, serif",
        fontWeight: 300,
        fontSize: 340,
        color: palette.gold,
        lineHeight: 1,
        letterSpacing: -10,
        textShadow: "0 4px 30px rgba(214,52,64,0.5), 0 6px 26px rgba(0,0,0,0.6)",
      }}
    >
      {value}
      <span
        style={{
          fontSize: 150,
          verticalAlign: "top",
          marginLeft: 8,
          fontStyle: "italic",
          fontWeight: 400,
        }}
      >
        %
      </span>
    </span>
  );
};

export const Scholarships: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tilesEnter = spring({
    frame: frame - 26,
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  const exitOpacity = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <FullBleedPhoto
        src="images/award-ceremony.jpeg"
        duration={duration}
        zoomFrom={1.12}
        zoomTo={1.20}
        position="50% 40%"
        overlay="linear-gradient(180deg, rgba(4,10,34,0.55) 0%, rgba(4,10,34,0.45) 50%, rgba(4,10,34,0.70) 100%)"
        filter="saturate(1.12) contrast(1.05) brightness(0.75)"
      />
      <BrandBug />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 22,
          paddingTop: 60,
        }}
      >
        <Eyebrow text="A Promise to Merit" delay={0} textShadow={textShadowStrong} />

        <Counter to={100} durationFrames={28} delay={2} />

        <Reveal
          text="Scholarships."
          delay={14}
          size={72}
          family="displayItalic"
          weight={400}
          color={palette.ivory}
          align="center"
          letterSpacing={-1}
          textShadow={textShadowStrong}
        />

        <div
          style={{
            marginTop: 28,
            display: "flex",
            gap: 20,
            opacity: tilesEnter,
            transform: `translateY(${interpolate(tilesEnter, [0, 1], [30, 0])}px)`,
          }}
        >
          {[
            { tag: "SC", label: "Scheduled Castes" },
            { tag: "ST", label: "Scheduled Tribes" },
            { tag: "★", label: "Meritorious" },
          ].map((b) => (
            <div
              key={b.tag}
              style={{
                width: 230,
                padding: "22px 18px",
                background: "rgba(10,21,48,0.55)",
                border: `1px solid ${palette.hairline}`,
                borderRadius: 16,
                textAlign: "center",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  color: palette.gold,
                  fontFamily: "Fraunces, serif",
                  fontSize: 54,
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: -2,
                }}
              >
                {b.tag}
              </div>
              <div
                style={{
                  marginTop: 10,
                  color: palette.ivorySoft,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  letterSpacing: 2.2,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
