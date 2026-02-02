import { Music, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Preset {
  id: string;
  name: string;
  bpm: number;
  beatsPerMeasure: number;
  beatUnit: number;
  key?: string;
}

interface PresetCardProps {
  preset: Preset;
  onSelect: (preset: Preset) => void;
  onDelete: (id: string) => void;
  isActive?: boolean;
}

export function PresetCard({ preset, onSelect, onDelete, isActive }: PresetCardProps) {
  return (
    <Card
      className={cn(
        "flex items-center justify-between p-4 cursor-pointer transition-all hover:bg-secondary/50",
        isActive && "ring-2 ring-primary bg-secondary/30"
      )}
      onClick={() => onSelect(preset)}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Music className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium">{preset.name}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono">{preset.bpm} BPM</span>
            <span>•</span>
            <span className="font-mono">
              {preset.beatsPerMeasure}/{preset.beatUnit}
            </span>
            {preset.key && (
              <>
                <span>•</span>
                <span>{preset.key}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(preset.id);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </Card>
  );
}
