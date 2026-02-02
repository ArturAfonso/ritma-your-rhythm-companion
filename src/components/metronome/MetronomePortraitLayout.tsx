import { BpmDisplay } from "./BpmDisplay";
import { BeatIndicator } from "./BeatIndicator";
import { PlayButton } from "./PlayButton";
import { BpmControls } from "./BpmControls";
import { TimeSignatureSelector } from "./TimeSignatureSelector";
import { PresetList } from "./PresetList";
import { Preset } from "./PresetCard";
import { cn } from "@/lib/utils";

interface MetronomePortraitLayoutProps {
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

export function MetronomePortraitLayout({
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
}: MetronomePortraitLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background px-4 py-8 md:py-12">
      {/* Header with logo and presets */}
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Ritma</h1>
        <PresetList
          presets={presets}
          activePresetId={activePresetId}
          onSelectPreset={onSelectPreset}
          onDeletePreset={onDeletePreset}
          onSavePreset={onSavePreset}
        />
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        {/* Beat indicator */}
        <BeatIndicator
          totalBeats={beatsPerMeasure}
          currentBeat={currentBeat}
          isPlaying={isPlaying}
        />

        {/* BPM Display */}
        <BpmDisplay bpm={bpm} isPlaying={isPlaying} />

        {/* Time Signature */}
        <TimeSignatureSelector
          beatsPerMeasure={beatsPerMeasure}
          beatUnit={beatUnit}
          onBeatsChange={onBeatsChange}
          onBeatUnitChange={onBeatUnitChange}
        />
      </main>

      {/* Controls */}
      <footer className="flex w-full max-w-md flex-col items-center gap-6">
        <BpmControls bpm={bpm} onBpmChange={onBpmChange} />
        <PlayButton isPlaying={isPlaying} onToggle={onTogglePlay} />
      </footer>
    </div>
  );
}
