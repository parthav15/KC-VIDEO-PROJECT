import React from "react";
import { Composition } from "remotion";
import { KCAd } from "./Composition";
import { KCHMAd } from "./HMComposition";
import {
  HM_DURATION_IN_FRAMES,
  HM_FPS,
  HM_HEIGHT,
  HM_WIDTH,
} from "./hm-theme";
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KCAd"
        component={KCAd}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="KCHMAd"
        component={KCHMAd}
        durationInFrames={HM_DURATION_IN_FRAMES}
        fps={HM_FPS}
        width={HM_WIDTH}
        height={HM_HEIGHT}
      />
    </>
  );
};
