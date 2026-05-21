import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Admissions } from "./scenes/Admissions";
import { Closing } from "./scenes/Closing";
import { Courses } from "./scenes/Courses";
import { CTA } from "./scenes/CTA";
import { DreamAchieve } from "./scenes/DreamAchieve";
import { HostelTransport } from "./scenes/HostelTransport";
import { Intro } from "./scenes/Intro";
import { LabTraining } from "./scenes/LabTraining";
import { Scholarships } from "./scenes/Scholarships";
import { palette, SCENES } from "./theme";

loadFraunces();
loadInter();

const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const offset = (frame * 7) % 60;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: 0.05,
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
        backgroundPosition: `${offset}px ${offset}px`,
        width,
        height,
      }}
    />
  );
};

const SafeAreaBorder: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        inset: 30,
        borderRadius: 6,
        border: `1px solid ${palette.hairline}`,
        opacity: 0.5,
      }}
    />
  </AbsoluteFill>
);

const SceneTransition: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 6, to - 6, to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: palette.inkDeep,
        opacity: opacity * 0,
        pointerEvents: "none",
      }}
    />
  );
};

export const KCAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: palette.inkDeep }}>
      <Audio src={staticFile("music/music.mp3")} volume={0.22} />
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1.0} />

      <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.duration}>
        <Intro duration={SCENES.intro.duration} />
      </Sequence>

      <Sequence from={SCENES.admissions.from} durationInFrames={SCENES.admissions.duration}>
        <Admissions duration={SCENES.admissions.duration} />
      </Sequence>

      <Sequence from={SCENES.courses.from} durationInFrames={SCENES.courses.duration}>
        <Courses duration={SCENES.courses.duration} />
      </Sequence>

      <Sequence from={SCENES.labTraining.from} durationInFrames={SCENES.labTraining.duration}>
        <LabTraining duration={SCENES.labTraining.duration} />
      </Sequence>

      <Sequence from={SCENES.scholarships.from} durationInFrames={SCENES.scholarships.duration}>
        <Scholarships duration={SCENES.scholarships.duration} />
      </Sequence>

      <Sequence from={SCENES.hostelBus.from} durationInFrames={SCENES.hostelBus.duration}>
        <HostelTransport duration={SCENES.hostelBus.duration} />
      </Sequence>

      <Sequence from={SCENES.dreamAchieve.from} durationInFrames={SCENES.dreamAchieve.duration}>
        <DreamAchieve duration={SCENES.dreamAchieve.duration} />
      </Sequence>

      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.duration}>
        <CTA duration={SCENES.cta.duration} />
      </Sequence>

      <Sequence from={SCENES.closing.from} durationInFrames={SCENES.closing.duration}>
        <Closing duration={SCENES.closing.duration} />
      </Sequence>

      <FilmGrain />
    </AbsoluteFill>
  );
};
