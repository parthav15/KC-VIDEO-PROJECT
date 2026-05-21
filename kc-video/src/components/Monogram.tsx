import React from "react";
import { Img, staticFile } from "remotion";
import { palette } from "../theme";

export const Monogram: React.FC<{
  size?: number;
  withRing?: boolean;
}> = ({ size = 120, withRing = true }) => {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {withRing && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `1.5px solid ${palette.gold}`,
              opacity: 0.55,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 8,
              borderRadius: "50%",
              border: `1px solid ${palette.gold}`,
              opacity: 0.25,
            }}
          />
        </>
      )}
      <div
        style={{
          width: size * 0.78,
          height: size * 0.78,
          borderRadius: "50%",
          background: palette.ivory,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 32px rgba(0,0,0,0.35)`,
        }}
      >
        <Img
          src={staticFile("images/kc-logo-round.png")}
          style={{
            width: size * 0.55,
            height: size * 0.55,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

export const Wordmark: React.FC<{ width?: number; opacity?: number }> = ({
  width = 320,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        position: "relative",
        background: palette.ivory,
        padding: "16px 28px",
        borderRadius: 10,
        boxShadow: `0 8px 28px rgba(0,0,0,0.30)`,
        opacity,
      }}
    >
      <Img
        src={staticFile("images/kc-logo.png")}
        style={{
          width,
          height: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
};

export const BrandBug: React.FC<{ opacity?: number }> = ({ opacity = 0.95 }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 70,
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity,
        zIndex: 10,
      }}
    >
      <Monogram size={64} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <div
          style={{
            color: palette.ivory,
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 2.6,
            textTransform: "uppercase",
            textShadow: "0 2px 8px rgba(0,0,0,0.55)",
          }}
        >
          KC Group
        </div>
        <div
          style={{
            color: palette.gold,
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 3.2,
            textTransform: "uppercase",
            textShadow: "0 2px 8px rgba(0,0,0,0.55)",
          }}
        >
          Est. 1999
        </div>
      </div>
    </div>
  );
};
