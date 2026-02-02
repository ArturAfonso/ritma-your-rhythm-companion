import { cn } from "@/lib/utils";

interface BpmDisplayProps {
  bpm: number;
  isPlaying: boolean;
  isLandscape?: boolean;
}

export function BpmDisplay({ bpm, isPlaying, isLandscape = false }: BpmDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={cn(
          "font-mono font-bold tabular-nums tracking-tight transition-all",
          isLandscape
            ? "text-[10rem] md:text-[14rem] leading-none"
            : "text-8xl md:text-9xl",
          isPlaying && "bpm-glow"
        )}
      >
        {bpm}
      </span>
      <span
        className={cn(
          "text-muted-foreground uppercase tracking-widest font-medium",
          isLandscape ? "text-2xl md:text-3xl mt-2" : "text-sm md:text-base"
        )}
      >
        BPM
      </span>
    </div>
  );
}
