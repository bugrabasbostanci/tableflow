import { useState, useCallback } from "react";
import type { LoadingState } from "@/types/tablio";

/**
 * Custom hook for managing unified loading state
 */
export function useLoading() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    progress: 0,
    message: "",
    type: 'idle'
  });

  const startLoading = useCallback((type: 'processing' | 'downloading', message?: string) => {
    setLoadingState({
      isLoading: true,
      progress: 0,
      message: message || "",
      type
    });
  }, []);

  const updateProgress = useCallback((progress: number, message?: string) => {
    setLoadingState(prev => ({
      ...prev,
      progress,
      message: message || prev.message
    }));
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      progress: 0,
      message: "",
      type: 'idle'
    });
  }, []);

  const resetProgress = useCallback(() => {
    setLoadingState(prev => ({
      ...prev,
      progress: 0,
      message: ""
    }));
  }, []);

  return {
    loadingState,
    startLoading,
    updateProgress,
    stopLoading,
    resetProgress,
    // Convenience getters
    isProcessing: loadingState.type === 'processing',
    isDownloading: loadingState.type === 'downloading',
    isLoading: loadingState.isLoading,
    progress: loadingState.progress,
    message: loadingState.message
  };
}