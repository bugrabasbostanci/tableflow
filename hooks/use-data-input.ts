import { useCallback } from "react";
import { toast } from "sonner";
import { parseClipboardData } from "@/utils/data-parsers";
import type { TableData } from "@/types/tablio";

interface UseDataInputProps {
  onDataLoaded: (data: TableData, fileName?: string) => void;
}

export function useDataInput({ onDataLoaded }: UseDataInputProps) {

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = parseClipboardData(text);

      if (parsed) {
        await onDataLoaded(parsed);
      } else {
        toast.error(
          "Invalid table format: Please copy valid table data and try again."
        );
      }
    } catch {
      toast.error(
        "Paste error: Could not access clipboard. Please paste manually with CTRL+V."
      );
    }
  }, [onDataLoaded]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, isProcessing: boolean) => {
      if (e.ctrlKey && e.key === "v" && !isProcessing) {
        e.preventDefault();
        handlePaste();
      }
    },
    [handlePaste]
  );

  return {
    handlePaste,
    handleKeyDown,
  };
}