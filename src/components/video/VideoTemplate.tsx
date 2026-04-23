import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video/hooks';
import { useSceneAudio } from '@/lib/video/useSceneAudio';
import ArcMotif from './ArcMotif';
import TransportBar from './TransportBar';

import Scene00_Intro from './scenes/Scene00_Intro';
import Scene01_Map from './scenes/Scene01_Map';
import Scene02_Data from './scenes/Scene02_Data';
import Scene03_Chart from './scenes/Scene03_Chart';
import Scene04_Problem from './scenes/Scene04_Problem';
import Scene05_Manafa from './scenes/Scene05_Manafa';
import Scene06_Network from './scenes/Scene06_Network';
import Scene06b_Difference from './scenes/Scene06b_Difference';
import Scene07_Divider from './scenes/Scene07_Divider';
import Scene08_Dashboard from './scenes/Scene08_Dashboard';
import Scene09_Invoices from './scenes/Scene09_Invoices';
import Scene10_Offer from './scenes/Scene10_Offer';
import Scene10b_Processing from './scenes/Scene10b_Processing';
import Scene11_Complete from './scenes/Scene11_Complete';
import Scene12_EndFrame from './scenes/Scene12_EndFrame';

const SCENE_DURATIONS = {
  s00_intro: 4000,
  s01_map: 7200,
  s02_data: 10000,
  s03_chart: 10600,
  s04_problem: 15900,
  s05_manafa: 8600,
  s06_network: 16200,
  s06b_difference: 12200,
  s07_divider: 2300,
  s08_dashboard: 8900,
  s09_invoices: 7000,
  s10_offer: 8300,
  s10b_processing: 6700,
  s11_complete: 4700,
  s12_end: 2800,
};

const ACT_BOUNDARY_SCENES = new Set([5, 7, 8]);

export default function VideoTemplate() {
  const {
    currentScene,
    playing,
    togglePlayPause,
    seekToScene,
    totalElapsed,
    totalDuration,
    totalScenes,
    sceneDurationsArray,
    sceneStartTimes,
  } = useVideoPlayer({
    durations: SCENE_DURATIONS,
    loop: true,
  });

  const { muted, toggleMute } = useSceneAudio(currentScene, playing);

  const prevScene = useRef(currentScene);
  const [blackout, setBlackout] = useState(false);

  useEffect(() => {
    prevScene.current = currentScene;

    if (ACT_BOUNDARY_SCENES.has(currentScene)) {
      setBlackout(true);
      const t = setTimeout(() => setBlackout(false), 400);
      return () => clearTimeout(t);
    }
  }, [currentScene]);

  const HIDE_TOP_LOGO = new Set([0, 4, 5, 6, 7, 14]);
  const showTopLogo = !HIDE_TOP_LOGO.has(currentScene);

  return (
      <div className="w-full h-screen overflow-hidden relative bg-[#03020F] text-white select-none" style={{ contain: 'strict', willChange: 'transform', transform: 'translateZ(0)' }}>
        <ArcMotif currentScene={currentScene} />

        <AnimatePresence>
          {showTopLogo && (
            <motion.div
              key="top-logo"
              className="absolute z-[90] pointer-events-none"
              style={{ top: 32, right: 40 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              <img
                src={`${import.meta.env.BASE_URL}logos/logo-white.png`}
                alt="Manafa"
                style={{ height: 108, objectFit: 'contain' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ position: 'absolute', inset: 0, contain: 'layout style paint', transform: 'translateZ(0)', willChange: 'contents' }}>
          <AnimatePresence mode="wait">
            {currentScene === 0 && (
              <Scene00_Intro key="s00" />
            )}
            {currentScene === 1 && (
              <Scene01_Map key="s01" />
            )}
            {currentScene === 2 && (
              <Scene02_Data key="s02" />
            )}
            {currentScene === 3 && (
              <Scene03_Chart key="s03" />
            )}
            {currentScene === 4 && (
              <Scene04_Problem key="s04" />
            )}
            {currentScene === 5 && (
              <Scene05_Manafa key="s05" />
            )}
            {currentScene === 6 && (
              <Scene06_Network key="s06" />
            )}
            {currentScene === 7 && (
              <Scene06b_Difference key="s06b" />
            )}
            {currentScene === 8 && (
              <Scene07_Divider key="s07" />
            )}
            {currentScene === 9 && (
              <Scene08_Dashboard key="s08" />
            )}
            {currentScene === 10 && (
              <Scene09_Invoices key="s09" />
            )}
            {currentScene === 11 && (
              <Scene10_Offer key="s10" />
            )}
            {currentScene === 12 && (
              <Scene10b_Processing key="s10b" />
            )}
            {currentScene === 13 && (
              <Scene11_Complete key="s11" />
            )}
            {currentScene === 14 && (
              <Scene12_EndFrame key="s12" />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {blackout && (
            <motion.div
              className="absolute inset-0 bg-[#03020F] z-[100] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>

        <TransportBar
          playing={playing}
          muted={muted}
          onTogglePlayPause={togglePlayPause}
          onToggleMute={toggleMute}
          onSeekToScene={seekToScene}
          currentScene={currentScene}
          totalScenes={totalScenes}
          totalElapsed={totalElapsed}
          totalDuration={totalDuration}
          sceneDurationsArray={sceneDurationsArray}
          sceneStartTimes={sceneStartTimes}
        />
      </div>
  );
}
