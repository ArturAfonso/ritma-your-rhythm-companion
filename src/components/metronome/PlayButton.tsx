import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  isLandscape?: boolean;
}

export function PlayButton({ isPlaying, onToggle, isLandscape = false }: PlayButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant="default"
      className={cn(
        "rounded-full transition-all duration-200",
        isLandscape
          ? "h-28 w-28 md:h-36 md:w-36"
          : "h-20 w-20 md:h-24 md:w-24",
        isPlaying && "shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
      )}
    >
      {isPlaying ? (
        <Pause className={cn(isLandscape ? "h-14 w-14 md:h-16 md:w-16" : "h-10 w-10 md:h-12 md:w-12")} />
      ) : (
        <Play className={cn("ml-1", isLandscape ? "h-14 w-14 md:h-16 md:w-16" : "h-10 w-10 md:h-12 md:w-12")} />
      )}
    </Button>
  );
}
