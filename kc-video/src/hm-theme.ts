export const HM_FPS = 30;
export const HM_WIDTH = 1080;
export const HM_HEIGHT = 1920;
export const HM_DURATION_SECONDS = 45;
export const HM_DURATION_IN_FRAMES = HM_DURATION_SECONDS * HM_FPS;

export const hmPalette = {
  inkDeep: "#FBF6E8",
  ink: "#FFFFFF",
  inkSoft: "#F1EAD5",
  redDeep: "#8E1F2A",
  red: "#C72839",
  redLight: "#E0404F",
  redSoft: "#FCEAEC",
  gold: "#A87F2A",
  goldDeep: "#73561A",
  goldLight: "#D4A857",
  ivory: "#0B1A36",
  ivorySoft: "#2E3650",
  white: "#FFFFFF",
  hairline: "rgba(11, 26, 54, 0.18)",
  hairlineRed: "rgba(199, 40, 57, 0.55)",
  hairlineGold: "rgba(168, 127, 42, 0.45)",
  redGlow: "rgba(199, 40, 57, 0.22)",
  goldGlow: "rgba(168, 127, 42, 0.18)",
};

export const HM_SCENES = {
  hook: { from: 0, duration: Math.round(4.19 * HM_FPS) },
  vinayReveal: { from: Math.round(4.19 * HM_FPS), duration: Math.round(9.51 * HM_FPS) },
  gagandeepReveal: { from: Math.round(13.70 * HM_FPS), duration: Math.round(8.04 * HM_FPS) },
  zabiReveal: { from: Math.round(21.74 * HM_FPS), duration: Math.round(7.96 * HM_FPS) },
  coursesHostel: { from: Math.round(29.70 * HM_FPS), duration: Math.round(4.25 * HM_FPS) },
  mission: { from: Math.round(33.95 * HM_FPS), duration: Math.round(3.97 * HM_FPS) },
  offer: { from: Math.round(37.92 * HM_FPS), duration: Math.round(3.08 * HM_FPS) },
  cta: { from: Math.round(41.00 * HM_FPS), duration: Math.round(4.00 * HM_FPS) },
};
