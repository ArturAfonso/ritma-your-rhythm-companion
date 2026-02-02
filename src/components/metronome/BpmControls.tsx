import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface BpmControlsProps {
  bpm: number;
  onBpmChange: (bpm: number) => void;
  isLandscape?: boolean;
}

export function BpmControls({ bpm, onBpmChange, isLandscape = false }: BpmControlsProps) {
  const handleIncrement = (amount: number) => {
    const newBpm = Math.max(20, Math.min(300, bpm + amount));
    onBpmChange(newBpm);
  };

  return (
    <div className={cn(
      "flex items-center gap-4",
      isLandscape ? "flex-row" : "flex-col w-full max-w-sm"
    )}>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => handleIncrement(-5)}
          className={cn(
            "rounded-full",
            isLandscape ? "h-14 w-14" : "h-12 w-12"
          )}
        >
          <span className="text-lg font-bold">-5</span>
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => handleIncrement(-1)}
          className={cn(
            "rounded-full",
            isLandscape ? "h-14 w-14" : "h-12 w-12"
          )}
        >
          <Minus className="h-5 w-5" />
        </Button>
      </div>

      {!isLandscape && (
        <Slider
          value={[bpm]}
          onValueChange={([value]) => onBpmChange(value)}
          min={20}
          max={300}
          step={1}
          className="w-full"
        />
      )}

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => handleIncrement(1)}
          className={cn(
            "rounded-full",
            isLandscape ? "h-14 w-14" : "h-12 w-12"
          )}
        >
          <Plus className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => handleIncrement(5)}
          className={cn(
            "rounded-full",
            isLandscape ? "h-14 w-14" : "h-12 w-12"
          )}
        >
          <span className="text-lg font-bold">+5</span>
        </Button>
      </div>
    </div>
  );
}
