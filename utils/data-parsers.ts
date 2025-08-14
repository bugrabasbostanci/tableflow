import type { TableData } from '@/types/tablio';

/**
 * Parses clipboard data (tab-separated format from Excel/Google Sheets)
 */
export function parseClipboardData(text: string): TableData | null {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return null;

  const headers = lines[0].split("\t").map((h) => h.trim());
  const rows = lines
    .slice(1)
    .map((line) => line.split("\t").map((cell) => cell.trim()));

  // Validate that all rows have the same number of columns
  const expectedColumns = headers.length;
  const validRows = rows.filter((row) => row.length === expectedColumns);

  if (validRows.length === 0) return null;

  return { headers, rows: validRows };
}


/**
 * Validates table data structure
 */
export function validateTableData(data: TableData): boolean {
  if (!data.headers || data.headers.length === 0) return false;
  if (!data.rows || data.rows.length === 0) return false;
  
  const expectedColumns = data.headers.length;
  return data.rows.every(row => row.length === expectedColumns);
}