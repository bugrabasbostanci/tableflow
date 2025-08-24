import type { TableData } from "@/types/tablio";

/**
 * Adds a new row to the table data
 */
export function addRowToTable(tableData: TableData): TableData {
  const newRow = new Array(tableData.headers.length).fill("");
  return {
    ...tableData,
    rows: [...tableData.rows, newRow],
  };
}

/**
 * Removes a row from the table data
 */
export function removeRowFromTable(
  tableData: TableData,
  rowIndex: number
): TableData | null {
  if (tableData.rows.length <= 1) return null; // Don't allow removing the last row

  return {
    ...tableData,
    rows: tableData.rows.filter((_, index) => index !== rowIndex),
  };
}

/**
 * Adds a new column to the table data
 */
export function addColumnToTable(
  tableData: TableData,
  headerName?: string
): TableData {
  const newHeader = headerName || `Column ${tableData.headers.length + 1}`;
  return {
    headers: [...tableData.headers, newHeader],
    rows: tableData.rows.map((row) => [...row, ""]),
  };
}

/**
 * Removes a column from the table data
 */
export function removeColumnFromTable(
  tableData: TableData,
  colIndex: number
): TableData | null {
  if (tableData.headers.length <= 1) return null; // Don't allow removing the last column

  return {
    headers: tableData.headers.filter((_, index) => index !== colIndex),
    rows: tableData.rows.map((row) =>
      row.filter((_, index) => index !== colIndex)
    ),
  };
}

/**
 * Updates a specific cell in the table data
 */
export function updateTableCell(
  tableData: TableData,
  rowIndex: number,
  colIndex: number,
  newValue: string
): TableData {
  const newRows = [...tableData.rows];
  newRows[rowIndex] = [...newRows[rowIndex]];
  newRows[rowIndex][colIndex] = newValue;

  return {
    ...tableData,
    rows: newRows,
  };
}

/**
 * Gets table statistics
 */
export function getTableStats(tableData: TableData) {
  const totalCells = tableData.headers.length * tableData.rows.length;
  const emptyCells = tableData.rows.reduce(
    (count, row) => count + row.filter((cell) => cell.trim() === "").length,
    0
  );

  return {
    rows: tableData.rows.length,
    columns: tableData.headers.length,
    totalCells,
    emptyCells,
    filledCells: totalCells - emptyCells,
    isLargeDataset: totalCells > 1000,
  };
}
