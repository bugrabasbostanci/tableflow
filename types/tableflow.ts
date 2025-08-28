/**
 * Core data types for TableFlow table converter
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
  type: "idle" | "processing" | "downloading";
}

export interface ExportOptions {
  fileName: string;
  format: "xlsx" | "csv" | "pdf" | "html" | "json";
}

export type ExportFormat = ExportOptions["format"];

export interface ExportResult {
  content: string | Uint8Array;
  mimeType: string;
  fileExtension: string;
}

export interface ProcessingOptions {
  baseDelay?: number;
  isLargeDataset?: boolean;
}

/**
 * Google Sheets integration types
 */
export interface GoogleOAuthState {
  isAuthenticated: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiryDate?: number;
}

export interface GoogleSheetsExportOptions {
  title?: string;
  sheetName?: string;
  makePublic?: boolean;
}

export interface GoogleSheetsExportResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
  success: boolean;
  message: string;
}
