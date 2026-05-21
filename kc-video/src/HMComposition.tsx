import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { CoursesHostel } from "./hm-scenes/CoursesHostel";
import { GagandeepReveal } from "./hm-scenes/GagandeepReveal";
import { HMCTA } from "./hm-scenes/HMCTA";
import { Hook } from "./hm-scenes/Hook";
import { Mission } from "./hm-scenes/Mission";
import { Offer } from "./hm-scenes/Offer";
import { VinayReveal } from "./hm-scenes/VinayReveal";
import { ZabiReveal } from "./hm-scenes/ZabiReveal";
import { HM_SCENES, hmPalette } from "./hm-theme";

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
        opacity: 0.03,
        mixBlendMode: "multiply",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px",
        backgroundPosition: `${offset}px ${offset}px`,
        width,
        height,
      }}
    />
  );
};

export const KCHMAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: hmPalette.inkDeep }}>
      <Audio src={staticFile("music/hm-music.mp3")} volume={0.20} />
      <Audio src={staticFile("audio/hm-voiceover.mp3")} volume={1.0} />

      <Sequence from={HM_SCENES.hook.from} durationInFrames={HM_SCENES.hook.duration}>
        <Hook duration={HM_SCENES.hook.duration} />
      </Sequence>

      <Sequence from={HM_SCENES.vinayReveal.from} durationInFrames={HM_SCENES.vinayReveal.duration}>
        <VinayReveal duration={HM_SCENES.vinayReveal.duration} />
      </Sequence>

      <Sequence from={HM_SCENES.gagandeepReveal.from} durationInFrames={HM_SCENES.gagandeepReveal.duration}>
        <GagandeepReveal duration={HM_SCENES.gagandeepReveal.duration} />
      </Sequence>

      <Sequence from={HM_SCENES.zabiReveal.from} durationInFrames={HM_SCENES.zabiReveal.duration}>
        <ZabiReveal duration={HM_SCENES.zabiReveal.duration} />
      </Sequence>

      <Sequence from={HM_SCENES.coursesHostel.from} durationInFrames={HM_SCENES.coursesHostel.duration}>
        <CoursesHostel duration={HM_SCENES.coursesHostel.duration} />
      </Sequence>

      <Sequence from={HM_SCENES.mission.from} durationInFrames={HM_SCENES.mission.duration}>
        <Mission duration={HM_SCENES.mission.duration} />
      </Sequence>

      <Sequence from={HM_SCENES.offer.from} durationInFrames={HM_SCENES.offer.duration}>
        <Offer duration={HM_SCENES.offer.duration} />
      </Sequence>

      <Sequence from={HM_SCENES.cta.from} durationInFrames={HM_SCENES.cta.duration}>
        <HMCTA duration={HM_SCENES.cta.duration} />
      </Sequence>

      <FilmGrain />
    </AbsoluteFill>
  );
};
