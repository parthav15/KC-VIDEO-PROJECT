import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { palette } from "../theme";

type Props = {
  src: string;
  duration: number;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  panY?: number;
  position?: React.CSSProperties["objectPosition"];
  vignette?: boolean;
  overlay?: string;
  borderRadius?: number;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
};

export const PhotoStage: React.FC<Props> = ({
  src,
  duration,
  zoomFrom = 1.08,
  zoomTo = 1.18,
  panX = 0,
  panY = 0,
  position = "center",
  vignette = true,
  overlay,
  borderRadius = 0,
  width = "100%",
  height = "100%",
  style,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(t, [0, 1], [zoomFrom, zoomTo]);
  const tx = interpolate(t, [0, 1], [0, panX]);
  const ty = interpolate(t, [0, 1], [0, panY]);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        borderRadius,
        ...style,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
          filter: "saturate(0.9) contrast(1.05) brightness(0.92)",
        }}
      />
      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: overlay,
            pointerEvents: "none",
          }}
        />
      )}
      {vignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(5,10,20,0.30) 0%, rgba(5,10,20,0) 30%, rgba(5,10,20,0) 60%, rgba(5,10,20,0.85) 100%)`,
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 120px rgba(5,10,20,0.55)`,
          pointerEvents: "none",
          borderRadius,
        }}
      />
      {borderRadius > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `1px solid ${palette.hairline}`,
            borderRadius,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
