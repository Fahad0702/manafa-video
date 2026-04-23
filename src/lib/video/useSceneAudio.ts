import { useEffect, useRef, useState, useCallback } from 'react';

const SCENE_AUDIO_FILES = [
  's00.wav',
  's01.wav',
  's02.wav',
  's03.wav',
  's04.wav',
  's05.wav',
  's06.wav',
  's06b.wav',
  's07.wav',
  's08.wav',
  's09.wav',
  's10.wav',
  's10b.wav',
  's11.wav',
  's12.wav',
];

export function useSceneAudio(currentScene: number, playing: boolean) {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [muted, setMuted] = useState(true);
  const preloaded = useRef(false);

  useEffect(() => {
    if (preloaded.current) return;
    preloaded.current = true;

    const baseUrl = import.meta.env.BASE_URL;
    audioRefs.current = SCENE_AUDIO_FILES.map((file) => {
      const audio = new Audio(`${baseUrl}vo/${file}`);
      audio.preload = 'auto';
      return audio;
    });

    return () => {
      audioRefs.current.forEach((a) => {
        a.pause();
        a.src = '';
      });
    };
  }, []);

  useEffect(() => {
    const audios = audioRefs.current;
    if (audios.length === 0) return;

    audios.forEach((a) => {
      a.pause();
      a.currentTime = 0;
    });

    if (!muted && playing && currentScene >= 0 && currentScene < audios.length) {
      const current = audios[currentScene]!;
      current.currentTime = 0;
      current.play().catch(() => {});
    }
  }, [currentScene, muted, playing]);

  useEffect(() => {
    const audios = audioRefs.current;
    if (audios.length === 0) return;
    const current = audios[currentScene];
    if (!current) return;

    if (muted || !playing) {
      current.pause();
    } else {
      current.play().catch(() => {});
    }
  }, [muted, playing]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  return { muted, toggleMute };
}
