import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TimeSignatureSelectorProps {
  beatsPerMeasure: number;
  beatUnit: number;
  onBeatsChange: (beats: number) => void;
  onBeatUnitChange: (unit: number) => void;
  isLandscape?: boolean;
}

const BEATS_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 12];
const BEAT_UNIT_OPTIONS = [2, 4, 8, 16];

export function TimeSignatureSelector({
  beatsPerMeasure,
  beatUnit,
  onBeatsChange,
  onBeatUnitChange,
  isLandscape = false,
}: TimeSignatureSelectorProps) {
  return (
    <div className={cn(
      "flex items-center gap-2",
      isLandscape ? "text-xl" : "text-base"
    )}>
      <Select
        value={beatsPerMeasure.toString()}
        onValueChange={(value) => onBeatsChange(parseInt(value))}
      >
        <SelectTrigger className={cn(
          "font-mono font-bold",
          isLandscape ? "w-20 h-14 text-2xl" : "w-16 h-12 text-xl"
        )}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {BEATS_OPTIONS.map((beats) => (
            <SelectItem key={beats} value={beats.toString()} className="font-mono text-lg">
              {beats}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className={cn(
        "text-muted-foreground font-bold",
        isLandscape ? "text-3xl" : "text-2xl"
      )}>
        /
      </span>

      <Select
        value={beatUnit.toString()}
        onValueChange={(value) => onBeatUnitChange(parseInt(value))}
      >
        <SelectTrigger className={cn(
          "font-mono font-bold",
          isLandscape ? "w-20 h-14 text-2xl" : "w-16 h-12 text-xl"
        )}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {BEAT_UNIT_OPTIONS.map((unit) => (
            <SelectItem key={unit} value={unit.toString()} className="font-mono text-lg">
              {unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
