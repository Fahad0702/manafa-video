import { useEffect, useRef } from 'react';
import * as Sonic from './sonicBranding';

// Scene-index → cue mapping. Indices match the order of SCENE_DURATIONS
// in VideoTemplate.tsx.
//
//  0  s00_intro            -
//  1  s01_map              tick burst (suppliers light up)
//  2  s02_data             tick on each counter beat
//  3  s03_chart            tick when the bar lifts
//  4  s04_problem          low whoosh
//  5  s05_manafa           whoosh + brand sting (logo reveal)
//  6  s06_network          partner blips
//  7  s06b_difference      whoosh
//  8  s07_divider          whoosh
//  9  s08_dashboard        tick (UI appears)
// 10  s09_invoices         tick
// 11  s10_offer            blip
// 12  s10b_processing      blip pattern
// 13  s11_complete         success chime
// 14  s12_end              brand sting

export function useSonicBranding(currentScene: number, playing: boolean, muted: boolean) {
  const lastFiredScene = useRef(-1);
  const timeoutsRef = useRef<number[]>([]);

  // Reflect mute changes onto the master gain.
  useEffect(() => {
    Sonic.setMuted(muted);
  }, [muted]);

  // Ambient bed runs while the video is playing and unmuted.
  useEffect(() => {
    if (muted || !playing) {
      Sonic.stopAmbient();
      return;
    }
    Sonic.startAmbient();
    return () => Sonic.stopAmbient();
  }, [muted, playing]);

  useEffect(() => {
    // Clear any cue timers from the previous scene so we don't bleed into the next.
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];

    if (muted || !playing) return;
    if (lastFiredScene.current === currentScene) return;
    lastFiredScene.current = currentScene;

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timeoutsRef.current.push(id);
    };

    switch (currentScene) {
      case 1: // map — three suppliers blip in
        schedule(() => Sonic.playTick(), 200);
        schedule(() => Sonic.playTick(), 700);
        schedule(() => Sonic.playTick(), 1200);
        break;

      case 2: // data — three big numbers
        schedule(() => Sonic.playTick(), 250);
        schedule(() => Sonic.playTick(), 3500);
        schedule(() => Sonic.playTick(), 6800);
        break;

      case 3: // chart — bar rises
        schedule(() => Sonic.playTick(), 400);
        schedule(() => Sonic.playBlip('low'), 4500);
        break;

      case 4: // problem — slow descending whoosh
        Sonic.playWhoosh(0.6);
        break;

      case 5: // Manafa reveal — act boundary
        Sonic.playWhoosh(1.1);
        schedule(() => Sonic.playSting('reveal'), 850); // lands with the logo
        break;

      case 6: // partner network — five institutions appear
        [400, 900, 1400, 1900, 2400].forEach((ms) =>
          schedule(() => Sonic.playBlip('high'), ms)
        );
        break;

      case 7: // difference — comparison wipe
        Sonic.playWhoosh(0.8);
        break;

      case 8: // divider — "Here is how it works"
        Sonic.playWhoosh(1.0);
        break;

      case 9: // dashboard
        schedule(() => Sonic.playBlip('high'), 200);
        break;

      case 10: // invoices
        schedule(() => Sonic.playTick(), 300);
        schedule(() => Sonic.playTick(), 900);
        break;

      case 11: // offer
        schedule(() => Sonic.playBlip('high'), 200);
        break;

      case 12: // processing handshake
        [200, 700, 1200, 1700].forEach((ms) =>
          schedule(() => Sonic.playBlip('low'), ms)
        );
        break;

      case 13: // funded — payoff moment
        schedule(() => Sonic.playSuccess(), 200);
        break;

      case 14: // end frame
        schedule(() => Sonic.playSting('end'), 100);
        break;
    }
  }, [currentScene, muted, playing]);

  // Clean up any pending cue timers on unmount.
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
      Sonic.stopAmbient();
    };
  }, []);
}
