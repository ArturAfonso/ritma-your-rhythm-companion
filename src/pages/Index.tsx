import { useMetronome } from "@/hooks/useMetronome";
import { useOrientation } from "@/hooks/useOrientation";
import { usePresets } from "@/hooks/usePresets";
import { MetronomePortraitLayout } from "@/components/metronome/MetronomePortraitLayout";
import { MetronomeLandscapeLayout } from "@/components/metronome/MetronomeLandscapeLayout";
import { Preset } from "@/components/metronome/PresetCard";

const Index = () => {
  const { isLandscape } = useOrientation();
  const {
    bpm,
    beatsPerMeasure,
    beatUnit,
    currentBeat,
    isPlaying,
    togglePlay,
    setBpm,
    setBeatsPerMeasure,
    setBeatUnit,
  } = useMetronome();

  const {
    presets,
    activePresetId,
    addPreset,
    deletePreset,
    selectPreset,
  } = usePresets();

  const handleSelectPreset = (preset: Preset) => {
    selectPreset(preset);
    setBpm(preset.bpm);
    setBeatsPerMeasure(preset.beatsPerMeasure);
    setBeatUnit(preset.beatUnit);
  };

  const handleSavePreset = (name: string) => {
    addPreset(name, bpm, beatsPerMeasure, beatUnit);
  };

  const commonProps = {
    bpm,
    beatsPerMeasure,
    beatUnit,
    currentBeat,
    isPlaying,
    onTogglePlay: togglePlay,
    onBpmChange: setBpm,
    onBeatsChange: setBeatsPerMeasure,
    onBeatUnitChange: setBeatUnit,
    presets,
    activePresetId,
    onSelectPreset: handleSelectPreset,
    onDeletePreset: deletePreset,
    onSavePreset: handleSavePreset,
  };

  return isLandscape ? (
    <MetronomeLandscapeLayout {...commonProps} />
  ) : (
    <MetronomePortraitLayout {...commonProps} />
  );
};

export default Index;
