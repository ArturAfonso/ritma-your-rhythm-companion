import { useState, useCallback, useEffect, useRef } from "react";

export interface MetronomeState {
  bpm: number;
  beatsPerMeasure: number;
  beatUnit: number;
  isPlaying: boolean;
  currentBeat: number;
}

export function useMetronome() {
  const [state, setState] = useState<MetronomeState>({
    bpm: 120,
    beatsPerMeasure: 4,
    beatUnit: 4,
    isPlaying: false,
    currentBeat: 0,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIdRef = useRef<number | null>(null);
  const currentBeatRef = useRef<number>(0);

  const playClick = useCallback((isDownbeat: boolean) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Different frequencies for downbeat vs regular beats
    oscillator.frequency.value = isDownbeat ? 1200 : 800;
    oscillator.type = "sine";

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0.5, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }, []);

  const scheduler = useCallback(() => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const secondsPerBeat = 60.0 / state.bpm;
    const scheduleAheadTime = 0.1; // seconds

    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const isDownbeat = currentBeatRef.current === 0;
      playClick(isDownbeat);

      setState((prev) => ({ ...prev, currentBeat: currentBeatRef.current }));

      currentBeatRef.current = (currentBeatRef.current + 1) % state.beatsPerMeasure;
      nextNoteTimeRef.current += secondsPerBeat;
    }

    timerIdRef.current = window.setTimeout(scheduler, 25);
  }, [state.bpm, state.beatsPerMeasure, playClick]);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      // Stop
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
      currentBeatRef.current = 0;
      setState((prev) => ({ ...prev, isPlaying: false, currentBeat: 0 }));
    } else {
      // Start
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      currentBeatRef.current = 0;
      nextNoteTimeRef.current = audioContextRef.current.currentTime;
      setState((prev) => ({ ...prev, isPlaying: true }));
      scheduler();
    }
  }, [state.isPlaying, scheduler]);

  const setBpm = useCallback((bpm: number) => {
    setState((prev) => ({ ...prev, bpm: Math.max(20, Math.min(300, bpm)) }));
  }, []);

  const setBeatsPerMeasure = useCallback((beats: number) => {
    currentBeatRef.current = 0;
    setState((prev) => ({ ...prev, beatsPerMeasure: beats, currentBeat: 0 }));
  }, []);

  const setBeatUnit = useCallback((unit: number) => {
    setState((prev) => ({ ...prev, beatUnit: unit }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Restart scheduler when BPM or beats change while playing
  useEffect(() => {
    if (state.isPlaying && timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      scheduler();
    }
  }, [state.bpm, state.beatsPerMeasure, state.isPlaying, scheduler]);

  return {
    ...state,
    togglePlay,
    setBpm,
    setBeatsPerMeasure,
    setBeatUnit,
  };
}
