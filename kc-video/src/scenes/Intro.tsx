import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { Monogram, Wordmark } from "../components/Monogram";
import { Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

export const Intro: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const monogramSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  const wordmarkOp = interpolate(frame, [duration - 36, duration - 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <FullBleedPhoto
        src="images/main-campus.jpeg"
        duration={duration}
        zoomFrom={1.14}
        zoomTo={1.24}
        position="50% 50%"
        overlay="linear-gradient(180deg, rgba(4,10,34,0.30) 0%, rgba(4,10,34,0.18) 40%, rgba(4,10,34,0.62) 100%)"
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <div
          style={{
            transform: `scale(${0.6 + monogramSpring * 0.4})`,
            opacity: monogramSpring,
          }}
        >
          <Monogram size={220} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <Reveal
            text="YOUR FUTURE"
            delay={10}
            size={88}
            family="ui"
            weight={800}
            letterSpacing={5}
            uppercase
            color={palette.ivory}
            align="center"
            textShadow={textShadowStrong}
          />
          <Reveal
            text="begins here."
            delay={22}
            size={108}
            family="displayItalic"
            weight={400}
            color={palette.gold}
            lineHeight={1}
            align="center"
            textShadow={textShadowStrong}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 180,
            opacity: wordmarkOp,
            transform: `translateY(${interpolate(wordmarkOp, [0, 1], [20, 0])}px)`,
          }}
        >
          <Wordmark width={360} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
