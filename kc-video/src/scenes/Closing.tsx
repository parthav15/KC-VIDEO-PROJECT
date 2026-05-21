import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { Monogram, Wordmark } from "../components/Monogram";
import { Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

export const Closing: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const monoEnter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const wordEnter = spring({
    frame: frame - 16,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const fade = interpolate(frame, [duration - 18, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <FullBleedPhoto
        src="images/main-campus.jpeg"
        duration={duration}
        zoomFrom={1.16}
        zoomTo={1.26}
        position="50% 50%"
        overlay="linear-gradient(180deg, rgba(4,10,34,0.50) 0%, rgba(4,10,34,0.58) 50%, rgba(4,10,34,0.78) 100%)"
        filter="saturate(1.18) contrast(1.05) brightness(0.74)"
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <div
          style={{
            transform: `scale(${0.7 + monoEnter * 0.3})`,
            opacity: monoEnter,
          }}
        >
          <Monogram size={200} />
        </div>

        <Reveal
          text="Apply today."
          delay={8}
          size={86}
          family="displayItalic"
          weight={400}
          color={palette.gold}
          align="center"
          letterSpacing={-1}
          textShadow={textShadowStrong}
        />

        <div
          style={{
            opacity: wordEnter,
            transform: `translateY(${interpolate(wordEnter, [0, 1], [20, 0])}px)`,
          }}
        >
          <Wordmark width={380} />
        </div>

        <div
          style={{
            marginTop: 6,
            color: palette.ivorySoft,
            fontFamily: "Fraunces, serif",
            fontStyle: "italic",
            fontSize: 26,
            letterSpacing: 3,
            opacity: interpolate(frame, [44, 80], [0, 0.95], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            textShadow: textShadowStrong,
          }}
        >
          get life ready.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
