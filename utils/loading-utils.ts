import type { LoadingState } from "@/types/tablio";

/**
 * Common loading messages for different operations
 */
export const LoadingMessages = {
  // Processing messages
  ANALYZING_DATA: "Analyzing data...",
  PROCESSING_LARGE_DATASET: "Processing large dataset...",
  PROCESSING_CHUNKS: (current: number, total: number) => 
    `Processing data... (${current}/${total})`,
  PREPARING_TABLE: "Preparing table...",
  COMPLETING: "Completing...",

  // Download messages
  CONVERTING_FORMAT: (format: string) => 
    `Converting to ${format.toUpperCase()} format...`,
  CREATING_LARGE_FILE: "Creating large file...",
  PREPARING_FILE: "Preparing file...",
  STARTING_DOWNLOAD: "Starting download...",

  // Google Sheets messages
  CONNECTING_GOOGLE_SHEETS: "Connecting to Google Sheets...",
  VALIDATING_GOOGLE_ACCOUNT: "Verifying your Google account...",
  CREATING_GOOGLE_SHEET: "Creating Google Sheet...",
  SUCCESS_COMPLETED: "Successfully completed!",
} as const;

/**
 * Progress percentages for different stages
 */
export const ProgressStages = {
  START: 0,
  QUARTER: 25,
  HALF: 50,
  THREE_QUARTERS: 75,
  COMPLETE: 100,

  // Processing stages
  DATA_ANALYSIS: 20,
  LARGE_DATASET_START: 40,
  LARGE_DATASET_END: 80,
  NORMAL_DATASET: 60,
  TABLE_PREPARATION: 80,
  COMPLETION: 95,

  // Download stages
  FORMAT_CONVERSION: 25,
  LARGE_FILE_CREATION: 60,
  FILE_PREPARATION: 80,
  DOWNLOAD_START: 95,
} as const;

/**
 * Helper function to calculate progress for chunk processing
 */
export function calculateChunkProgress(
  currentChunk: number,
  totalChunks: number,
  startProgress: number = ProgressStages.LARGE_DATASET_START,
  endProgress: number = ProgressStages.LARGE_DATASET_END
): number {
  const progressRange = endProgress - startProgress;
  const chunkProgress = (currentChunk / totalChunks) * progressRange;
  return Math.round(startProgress + chunkProgress);
}

/**
 * Utility function to create loading state updates
 */
export function createLoadingUpdate(
  progress: number,
  message: string
): Partial<LoadingState> {
  return { progress, message };
}

/**
 * Utility function for async UI updates during large operations
 */
export async function allowUIUpdate(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}