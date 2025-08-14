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
 * Parses CSV file content with RFC 4180 compliance
 * Handles quoted fields, escaped quotes, and commas within quotes
 */
export function parseCSVFile(content: string): TableData | null {
  try {
    const trimmedContent = content.trim();
    if (!trimmedContent) return null;

    const rows = parseCSVContent(trimmedContent);
    if (rows.length < 2) return null;

    const headers = rows[0];
    const dataRows = rows.slice(1);

    // Validate that all rows have the same number of columns
    const expectedColumns = headers.length;
    const validRows = dataRows.filter((row) => row.length === expectedColumns);

    if (validRows.length === 0) return null;

    return { headers, rows: validRows };
  } catch (error) {
    console.warn('CSV parsing error:', error);
    return null;
  }
}

/**
 * RFC 4180 compliant CSV parser
 * Handles:
 * - Quoted fields containing commas
 * - Escaped quotes (double quotes)
 * - Multi-line fields
 * - Leading/trailing whitespace
 */
function parseCSVContent(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;

  while (i < content.length) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote (double quote)
        currentField += '"';
        i += 2; // Skip both quotes
        continue;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      currentRow.push(sanitizeField(currentField));
      currentField = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // Row separator
      if (currentField || currentRow.length > 0) {
        currentRow.push(sanitizeField(currentField));
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      }
      // Skip \r\n combination
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
    } else {
      // Regular character
      currentField += char;
    }

    i++;
  }

  // Handle last field and row
  if (currentField || currentRow.length > 0) {
    currentRow.push(sanitizeField(currentField));
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Sanitizes and trims CSV field content
 */
function sanitizeField(field: string): string {
  return field.trim();
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