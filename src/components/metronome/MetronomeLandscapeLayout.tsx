import { BpmDisplay } from "./BpmDisplay";
import { BeatIndicator } from "./BeatIndicator";
import { PlayButton } from "./PlayButton";
import { BpmControls } from "./BpmControls";
import { TimeSignatureSelector } from "./TimeSignatureSelector";
import { PresetList } from "./PresetList";
import { Preset } from "./PresetCard";

interface MetronomeLandscapeLayoutProps {
  bpm: number;
  beatsPerMeasure: number;
  beatUnit: number;
  currentBeat: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onBpmChange: (bpm: number) => void;
  onBeatsChange: (beats: number) => void;
  onBeatUnitChange: (unit: number) => void;
  presets: Preset[];
  activePresetId?: string;
  onSelectPreset: (preset: Preset) => void;
  onDeletePreset: (id: string) => void;
  onSavePreset: (name: string) => void;
}

export function MetronomeLandscapeLayout({
  bpm,
  beatsPerMeasure,
  beatUnit,
  currentBeat,
  isPlaying,
  onTogglePlay,
  onBpmChange,
  onBeatsChange,
  onBeatUnitChange,
  presets,
  activePresetId,
  onSelectPreset,
  onDeletePreset,
  onSavePreset,
}: MetronomeLandscapeLayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-4 md:p-8">
      {/* Left section - Play button */}
      <div className="flex flex-1 items-center justify-center">
        <PlayButton isPlaying={isPlaying} onToggle={onTogglePlay} isLandscape />
      </div>

      {/* Center section - Main display */}
      <div className="flex flex-[2] flex-col items-center justify-center gap-6">
        {/* Beat indicator - larger for stage visibility */}
        <BeatIndicator
          totalBeats={beatsPerMeasure}
          currentBeat={currentBeat}
          isPlaying={isPlaying}
          isLandscape
        />

        {/* BPM Display - extra large */}
        <BpmDisplay bpm={bpm} isPlaying={isPlaying} isLandscape />

        {/* Time Signature */}
        <TimeSignatureSelector
          beatsPerMeasure={beatsPerMeasure}
          beatUnit={beatUnit}
          onBeatsChange={onBeatsChange}
          onBeatUnitChange={onBeatUnitChange}
          isLandscape
        />
      </div>

      {/* Right section - Controls */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <BpmControls bpm={bpm} onBpmChange={onBpmChange} isLandscape />
        <PresetList
          presets={presets}
          activePresetId={activePresetId}
          onSelectPreset={onSelectPreset}
          onDeletePreset={onDeletePreset}
          onSavePreset={onSavePreset}
          isLandscape
        />
      </div>
    </div>
  );
}
