import { useState, useCallback } from "react";
import { toast } from "sonner";
import { parseClipboardData, parseCSVFile } from "@/utils/data-parsers";
import type { TableData } from "@/types/tablio";

interface UseDataInputProps {
  onDataLoaded: (data: TableData, fileName?: string) => void;
}

export function useDataInput({ onDataLoaded }: UseDataInputProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set drag over to false if we're leaving the drop zone itself
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (!file) return;

      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const content = event.target?.result as string;
          const parsed = parseCSVFile(content);

          if (parsed) {
            await onDataLoaded(parsed, file.name.replace(/\.[^/.]+$/, ""));
          } else {
            toast.error(
              "Geçersiz dosya formatı: Lütfen geçerli bir CSV dosyası yükleyin."
            );
          }
        };
        reader.readAsText(file);
      } else {
        toast.error(
          "Desteklenmeyen dosya formatı: Şu anda sadece CSV dosyaları desteklenmektedir."
        );
      }
    },
    [onDataLoaded]
  );

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const content = event.target?.result as string;
          const parsed = parseCSVFile(content);

          if (parsed) {
            await onDataLoaded(parsed, file.name.replace(/\.[^/.]+$/, ""));
          }
        };
        reader.readAsText(file);
      }
    },
    [onDataLoaded]
  );

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = parseClipboardData(text);

      if (parsed) {
        await onDataLoaded(parsed);
      } else {
        toast.error(
          "Geçersiz tablo formatı: Lütfen geçerli bir tablo verisi kopyalayıp tekrar deneyin."
        );
      }
    } catch {
      toast.error(
        "Yapıştırma hatası: Panoya erişim sağlanamadı. Lütfen CTRL+V ile manuel olarak yapıştırın."
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
    isDragOver,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleFileUpload,
    handlePaste,
    handleKeyDown,
  };
}