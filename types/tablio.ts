/**
 * Core data types for Tablio table converter
 */

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface EditingCell {
  row: number;
  col: number;
}

export interface LoadingState {
  isLoading: boolean;
  progress: number;
  message: string;
}

export interface ExportOptions {
  fileName: string;
  format: 'xlsx' | 'csv' | 'tsv' | 'json' | 'xml';
}

export type ExportFormat = ExportOptions['format'];

export interface ExportResult {
  content: string;
  mimeType: string;
  fileExtension: string;
}

export interface ProcessingOptions {
  baseDelay?: number;
  isLargeDataset?: boolean;
}