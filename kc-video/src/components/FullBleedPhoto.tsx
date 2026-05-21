import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { palette } from "../theme";

type Props = {
  src: string;
  duration: number;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  panY?: number;
  position?: React.CSSProperties["objectPosition"];
  overlay?: string;
  filter?: string;
};

export const FullBleedPhoto: React.FC<Props> = ({
  src,
  duration,
  zoomFrom = 1.08,
  zoomTo = 1.18,
  panX = 0,
  panY = 0,
  position = "center",
  overlay,
  filter = "saturate(1.22) contrast(1.06) brightness(0.94)",
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(t, [0, 1], [zoomFrom, zoomTo]);
  const tx = interpolate(t, [0, 1], [0, panX]);
  const ty = interpolate(t, [0, 1], [0, panY]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: palette.inkDeep }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
          filter,
        }}
      />
      {overlay && (
        <AbsoluteFill
          style={{ background: overlay, pointerEvents: "none" }}
        />
      )}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(4,10,34,0.34) 0%, rgba(4,10,34,0.04) 26%, rgba(4,10,34,0.04) 56%, rgba(4,10,34,0.58) 88%, rgba(4,10,34,0.80) 100%)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 140px rgba(4,10,34,0.45)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 28% 22%, rgba(224,62,74,0.14) 0%, rgba(224,62,74,0) 50%), radial-gradient(circle at 78% 78%, rgba(62,184,180,0.10) 0%, rgba(62,184,180,0) 55%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
