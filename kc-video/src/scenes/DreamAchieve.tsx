import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

export const DreamAchieve: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exitOpacity = interpolate(frame, [duration - 4, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dreamOpacity = interpolate(frame, [14, 26], [1, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strikeWidth = interpolate(frame, [14, 28], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const achievePop = spring({
    frame: frame - 22,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <FullBleedPhoto
        src="images/cricket-team.jpeg"
        duration={duration}
        zoomFrom={1.12}
        zoomTo={1.20}
        position="50% 45%"
        overlay="linear-gradient(180deg, rgba(4,10,34,0.55) 0%, rgba(4,10,34,0.50) 50%, rgba(4,10,34,0.72) 100%)"
        filter="saturate(1.18) contrast(1.06) brightness(0.72)"
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{ opacity: dreamOpacity }}>
            <Reveal
              text="Don't just"
              delay={0}
              size={56}
              family="display"
              weight={400}
              color={palette.ivorySoft}
              align="center"
              letterSpacing={-0.5}
              textShadow={textShadowStrong}
            />
            <Reveal
              text="dream"
              delay={4}
              size={132}
              family="displayItalic"
              weight={400}
              color={palette.ivorySoft}
              align="center"
              letterSpacing={-2}
              lineHeight={1}
              textShadow={textShadowStrong}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "26%",
              transform: "translateX(-50%) rotate(-6deg)",
              width: `${strikeWidth * 2.6}px`,
              height: 5,
              background: palette.gold,
              opacity: 0.95,
              boxShadow: `0 0 18px rgba(214,52,64,0.7)`,
            }}
          />
        </div>

        <div style={{ height: 18 }} />

        <div
          style={{
            transform: `scale(${0.7 + achievePop * 0.3})`,
            opacity: achievePop,
            display: "flex",
            alignItems: "baseline",
            gap: 6,
          }}
        >
          <div
            style={{
              color: palette.gold,
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              fontSize: 168,
              letterSpacing: 4,
              textTransform: "uppercase",
              lineHeight: 1,
              textShadow: "0 6px 30px rgba(214,52,64,0.55), 0 4px 16px rgba(0,0,0,0.7)",
            }}
          >
            ACHIEVE
          </div>
          <div
            style={{
              color: palette.ivory,
              fontFamily: "Fraunces, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 120,
              lineHeight: 1,
              textShadow: textShadowStrong,
            }}
          >
            it.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
