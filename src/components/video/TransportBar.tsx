import React, { useRef, useCallback } from 'react';

interface TransportBarProps {
  playing: boolean;
  onTogglePlayPause: () => void;
  onSeekToScene: (index: number) => void;
  currentScene: number;
  totalScenes: number;
  totalElapsed: number;
  totalDuration: number;
  sceneDurationsArray: number[];
  sceneStartTimes: number[];
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function TransportBar({
  playing,
  onTogglePlayPause,
  onSeekToScene,
  currentScene,
  totalScenes,
  totalElapsed,
  totalDuration,
  sceneDurationsArray,
  sceneStartTimes,
}: TransportBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const progress = totalDuration > 0 ? totalElapsed / totalDuration : 0;

  const handleBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = barRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const fraction = clickX / rect.width;
      const targetMs = fraction * totalDuration;

      let targetScene = 0;
      for (let i = 0; i < totalScenes; i++) {
        if (targetMs >= sceneStartTimes[i]!) {
          targetScene = i;
        }
      }
      onSeekToScene(targetScene);
    },
    [totalDuration, totalScenes, sceneStartTimes, onSeekToScene]
  );

  return (
    <div
      className="absolute z-[95] flex items-center gap-3"
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        height: 52,
        padding: '0 20px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
      }}
    >
      <button
        onClick={onTogglePlayPause}
        className="flex items-center justify-center shrink-0"
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        }}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </button>

      <span
        style={{
          fontSize: 12,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.5)',
          minWidth: 36,
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}
      >
        {formatTime(totalElapsed)}
      </span>

      <div
        ref={barRef}
        onClick={handleBarClick}
        className="flex-1 relative"
        style={{
          height: 32,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.12)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: 'rgba(255,255,255,0.45)',
              borderRadius: 2,
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {sceneStartTimes.map((startMs, i) => {
          if (i === 0) return null;
          const x = (startMs / totalDuration) * 100;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1,
                height: 10,
                background:
                  i === currentScene
                    ? 'rgba(255,255,255,0.5)'
                    : 'rgba(255,255,255,0.2)',
              }}
            />
          );
        })}

        <div
          style={{
            position: 'absolute',
            left: `${progress * 100}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
            borderRadius: 5,
            background: '#fff',
            boxShadow: '0 0 4px rgba(0,0,0,0.4)',
            transition: 'left 0.05s linear',
          }}
        />
      </div>

      <span
        style={{
          fontSize: 12,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.5)',
          minWidth: 36,
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}
      >
        {formatTime(totalDuration)}
      </span>

    </div>
  );
}
