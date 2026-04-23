import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    startRecording?: () => Promise<void>;
    stopRecording?: () => void;
  }
}

export interface SceneDurations {
  [key: string]: number;
}

export interface UseVideoPlayerOptions {
  durations: SceneDurations;
  onVideoEnd?: () => void;
  loop?: boolean;
}

export interface UseVideoPlayerReturn {
  currentScene: number;
  totalScenes: number;
  currentSceneKey: string;
  hasEnded: boolean;
  playing: boolean;
  togglePlayPause: () => void;
  seekToScene: (index: number) => void;
  elapsedInScene: number;
  totalElapsed: number;
  totalDuration: number;
  sceneDurationsArray: number[];
  sceneStartTimes: number[];
}

export function useVideoPlayer(options: UseVideoPlayerOptions): UseVideoPlayerReturn {
  const { durations, onVideoEnd, loop = true } = options;

  const sceneKeys = useRef(Object.keys(durations)).current;
  const totalScenes = sceneKeys.length;
  const durationsArray = useRef(Object.values(durations)).current;
  const totalDuration = useRef(durationsArray.reduce((a, b) => a + b, 0)).current;

  const sceneStartTimes = useRef(
    durationsArray.reduce<number[]>((acc, dur, i) => {
      acc.push(i === 0 ? 0 : acc[i - 1]! + durationsArray[i - 1]!);
      return acc;
    }, [])
  ).current;

  const [currentScene, setCurrentScene] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [elapsedInScene, setElapsedInScene] = useState(0);

  const sceneStartedAt = useRef(Date.now());
  const pausedElapsed = useRef(0);

  useEffect(() => {
    window.startRecording?.();
  }, []);

  useEffect(() => {
    sceneStartedAt.current = Date.now();
    pausedElapsed.current = 0;
    setElapsedInScene(0);
  }, [currentScene]);

  useEffect(() => {
    if (!playing) {
      pausedElapsed.current = elapsedInScene;
      return;
    }

    if (hasEnded && !loop) return;

    const sceneDur = durationsArray[currentScene]!;
    const remaining = sceneDur - pausedElapsed.current;

    sceneStartedAt.current = Date.now();

    const timer = setTimeout(() => {
      if (currentScene >= totalScenes - 1) {
        if (!hasEnded) {
          window.stopRecording?.();
          setHasEnded(true);
          onVideoEnd?.();
        }
        if (loop) {
          setCurrentScene(0);
        }
      } else {
        setCurrentScene(prev => prev + 1);
      }
    }, remaining);

    let rafId: number;
    const tick = () => {
      const now = Date.now();
      const elapsed = pausedElapsed.current + (now - sceneStartedAt.current);
      setElapsedInScene(Math.min(elapsed, sceneDur));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [currentScene, playing, totalScenes, durationsArray, hasEnded, loop, onVideoEnd]);

  const togglePlayPause = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const seekToScene = useCallback((index: number) => {
    if (index < 0 || index >= totalScenes) return;
    pausedElapsed.current = 0;
    setCurrentScene(index);
    setHasEnded(false);
  }, [totalScenes]);

  const totalElapsed = sceneStartTimes[currentScene]! + elapsedInScene;

  return {
    currentScene,
    totalScenes,
    currentSceneKey: sceneKeys[currentScene]!,
    hasEnded,
    playing,
    togglePlayPause,
    seekToScene,
    elapsedInScene,
    totalElapsed,
    totalDuration,
    sceneDurationsArray: durationsArray,
    sceneStartTimes,
  };
}

export function useSceneTimer(events: Array<{ time: number; callback: () => void }>) {
  const firedRef = useRef<Set<number>>(new Set());
  const callbacksRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    callbacksRef.current = events.map(e => e.callback);
  }, [events]);

  const scheduleKey = events.map((event, i) => `${i}:${event.time}`).join('|');

  useEffect(() => {
    firedRef.current = new Set();

    const timers = events.map(({ time }, index) => {
      return setTimeout(() => {
        if (!firedRef.current.has(index)) {
          firedRef.current.add(index);
          callbacksRef.current[index]?.();
        }
      }, time);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [scheduleKey]);
}
