import { useState } from "react";
import { Plus, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PresetCard, Preset } from "./PresetCard";
import { cn } from "@/lib/utils";

interface PresetListProps {
  presets: Preset[];
  activePresetId?: string;
  onSelectPreset: (preset: Preset) => void;
  onDeletePreset: (id: string) => void;
  onSavePreset: (name: string) => void;
  isLandscape?: boolean;
}

export function PresetList({
  presets,
  activePresetId,
  onSelectPreset,
  onDeletePreset,
  onSavePreset,
  isLandscape = false,
}: PresetListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);

  const handleSave = () => {
    if (newPresetName.trim()) {
      onSavePreset(newPresetName.trim());
      setNewPresetName("");
      setShowSaveInput(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "rounded-full",
            isLandscape ? "h-16 w-16" : "h-12 w-12"
          )}
        >
          <List className={cn(isLandscape ? "h-7 w-7" : "h-5 w-5")} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl">Presets</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {showSaveInput ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Nome da música..."
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
              />
              <Button onClick={handleSave} size="sm">
                Salvar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowSaveInput(false);
                  setNewPresetName("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowSaveInput(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Salvar preset atual
            </Button>
          )}

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2 pr-4">
              {presets.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum preset salvo ainda.
                  <br />
                  <span className="text-sm">
                    Salve configurações para suas músicas!
                  </span>
                </p>
              ) : (
                presets.map((preset) => (
                  <PresetCard
                    key={preset.id}
                    preset={preset}
                    onSelect={(p) => {
                      onSelectPreset(p);
                      setIsOpen(false);
                    }}
                    onDelete={onDeletePreset}
                    isActive={activePresetId === preset.id}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
