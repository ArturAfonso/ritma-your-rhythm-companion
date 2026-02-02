import { cn } from "@/lib/utils";

interface TimeSignatureDisplayProps {
  beatsPerMeasure: number;
  beatUnit: number;
  isLandscape?: boolean;
}

export function TimeSignatureDisplay({
  beatsPerMeasure,
  beatUnit,
  isLandscape = false,
}: TimeSignatureDisplayProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center font-mono font-bold",
        isLandscape ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"
      )}
    >
      <span className="leading-tight">{beatsPerMeasure}</span>
      <div className="w-8 h-0.5 bg-muted-foreground/50 my-0.5" />
      <span className="leading-tight">{beatUnit}</span>
    </div>
  );
}
