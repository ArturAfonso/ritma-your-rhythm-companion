import { useState, useCallback, useEffect } from "react";
import { Preset } from "@/components/metronome/PresetCard";

const STORAGE_KEY = "ritma-presets";

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [activePresetId, setActivePresetId] = useState<string | undefined>();

  // Load presets from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPresets(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load presets:", e);
      }
    }
  }, []);

  // Save presets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  }, [presets]);

  const addPreset = useCallback(
    (
      name: string,
      bpm: number,
      beatsPerMeasure: number,
      beatUnit: number,
      key?: string
    ) => {
      const newPreset: Preset = {
        id: Date.now().toString(),
        name,
        bpm,
        beatsPerMeasure,
        beatUnit,
        key,
      };
      setPresets((prev) => [newPreset, ...prev]);
      setActivePresetId(newPreset.id);
    },
    []
  );

  const deletePreset = useCallback((id: string) => {
    setPresets((prev) => prev.filter((p) => p.id !== id));
    setActivePresetId((prev) => (prev === id ? undefined : prev));
  }, []);

  const selectPreset = useCallback((preset: Preset) => {
    setActivePresetId(preset.id);
    return preset;
  }, []);

  return {
    presets,
    activePresetId,
    addPreset,
    deletePreset,
    selectPreset,
  };
}
