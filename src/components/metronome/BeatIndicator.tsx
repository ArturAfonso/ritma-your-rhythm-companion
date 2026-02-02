import { cn } from "@/lib/utils";

interface BeatIndicatorProps {
  totalBeats: number;
  currentBeat: number;
  isPlaying: boolean;
  isLandscape?: boolean;
}

export function BeatIndicator({
  totalBeats,
  currentBeat,
  isPlaying,
  isLandscape = false,
}: BeatIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3",
        isLandscape ? "gap-6" : "gap-3 md:gap-4"
      )}
    >
      {Array.from({ length: totalBeats }, (_, index) => {
        const isActive = isPlaying && currentBeat === index;
        const isDownbeat = index === 0;

        return (
          <div
            key={index}
            className={cn(
              "rounded-full transition-all duration-100",
              isLandscape ? "h-10 w-10 md:h-14 md:w-14" : "h-6 w-6 md:h-8 md:w-8",
              isActive && isDownbeat && "bg-beat-downbeat shadow-[0_0_30px_hsl(var(--beat-downbeat)/0.6)] scale-125",
              isActive && !isDownbeat && "bg-beat-active shadow-[0_0_25px_hsl(var(--beat-active)/0.5)] scale-110",
              !isActive && isDownbeat && "bg-beat-inactive border-2 border-beat-downbeat/50",
              !isActive && !isDownbeat && "bg-beat-inactive"
            )}
          />
        );
      })}
    </div>
  );
}
