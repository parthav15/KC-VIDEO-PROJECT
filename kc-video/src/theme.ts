export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_SECONDS = 45;
export const DURATION_IN_FRAMES = DURATION_SECONDS * FPS;

export const palette = {
  inkDeep: "#040A22",
  ink: "#0E1A3A",
  inkSoft: "#1A2A4F",
  goldDeep: "#A02430",
  gold: "#E03E4A",
  goldLight: "#FF7B86",
  ivory: "#FBF6E8",
  ivorySoft: "#EFE7D2",
  navy: "#0E1A3A",
  navyDeep: "#040A22",
  ember: "#FF7B86",
  white: "#FFFFFF",
  hairline: "rgba(251, 246, 232, 0.28)",
  glassFog: "rgba(14, 26, 58, 0.45)",
  redGlow: "rgba(224, 62, 74, 0.22)",
  teal: "#3EB8B4",
};

export const SCENES = {
  intro: { from: 0, duration: Math.round(4.01 * FPS) },
  admissions: { from: Math.round(4.01 * FPS), duration: Math.round(3.98 * FPS) },
  courses: { from: Math.round(7.99 * FPS), duration: Math.round(13.41 * FPS) },
  labTraining: { from: Math.round(21.40 * FPS), duration: Math.round(3.71 * FPS) },
  scholarships: { from: Math.round(25.11 * FPS), duration: Math.round(4.31 * FPS) },
  hostelBus: { from: Math.round(29.42 * FPS), duration: Math.round(3.71 * FPS) },
  dreamAchieve: { from: Math.round(33.13 * FPS), duration: Math.round(1.92 * FPS) },
  cta: { from: Math.round(35.05 * FPS), duration: Math.round(3.43 * FPS) },
  closing: { from: Math.round(38.48 * FPS), duration: Math.round(6.52 * FPS) },
};
