import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { BrandBug } from "../components/Monogram";
import { Eyebrow, Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

const PhoneCard: React.FC<{
  number: string;
  delay: number;
}> = ({ number, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;
  const enter = spring({
    frame: local,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const pulse = local >= 0 ? Math.sin((local / fps) * Math.PI * 2 * 2.4) * 0.5 + 0.5 : 0;

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateX(${interpolate(enter, [0, 1], [-26, 0])}px)`,
        position: "relative",
        padding: "24px 30px",
        background:
          "linear-gradient(135deg, rgba(214,52,64,0.30) 0%, rgba(160,36,48,0.12) 100%)",
        border: `1.5px solid rgba(214,52,64,0.65)`,
        borderRadius: 20,
        backdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        gap: 22,
        boxShadow: `0 12px 36px rgba(214,52,64,${0.30 + pulse * 0.18})`,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${palette.gold}, ${palette.goldDeep})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transform: `scale(${1 + pulse * 0.05})`,
          boxShadow: `0 6px 18px rgba(214,52,64,0.55)`,
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.13 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
            stroke={palette.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div
          style={{
            color: palette.gold,
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            letterSpacing: 3.5,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Helpline
        </div>
        <div
          style={{
            color: palette.ivory,
            fontFamily: "Fraunces, serif",
            fontSize: 58,
            fontWeight: 400,
            letterSpacing: 0.4,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            textShadow: textShadowStrong,
          }}
        >
          {number}
        </div>
      </div>
    </div>
  );
};

export const CTA: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();

  const exitOpacity = interpolate(frame, [duration - 6, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <FullBleedPhoto
        src="images/round-building.jpeg"
        duration={duration}
        zoomFrom={1.12}
        zoomTo={1.20}
        position="50% 50%"
        overlay="linear-gradient(180deg, rgba(4,10,34,0.45) 0%, rgba(4,10,34,0.55) 50%, rgba(4,10,34,0.78) 100%)"
        filter="saturate(1.15) contrast(1.05) brightness(0.72)"
      />
      <BrandBug />

      <div
        style={{
          position: "absolute",
          top: 260,
          left: 70,
          right: 70,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <Eyebrow text="Call now  ·  Apply today" delay={0} textShadow={textShadowStrong} />
        <Reveal
          text="Your call,"
          delay={2}
          size={78}
          family="display"
          weight={400}
          color={palette.ivory}
          letterSpacing={-1.5}
          lineHeight={0.95}
          textShadow={textShadowStrong}
        />
        <Reveal
          text="our promise."
          delay={8}
          size={78}
          family="displayItalic"
          weight={400}
          color={palette.gold}
          letterSpacing={-1.5}
          lineHeight={0.95}
          textShadow={textShadowStrong}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 780,
          left: 70,
          right: 70,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <PhoneCard number="98149-66663" delay={16} />
        <PhoneCard number="98149-66664" delay={30} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          color: palette.ivorySoft,
          fontFamily: "Inter, sans-serif",
          fontSize: 16,
          letterSpacing: 4,
          textTransform: "uppercase",
          fontWeight: 600,
          opacity: 0.85,
          textShadow: textShadowStrong,
        }}
      >
        kcinstitutes.com  ·  Nawanshahr · Una
      </div>
    </AbsoluteFill>
  );
};
