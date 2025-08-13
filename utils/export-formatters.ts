import type { TableData, ExportFormat, ExportResult } from '@/types/tablio';

/**
 * Formats table data as CSV
 */
export function formatAsCSV(tableData: TableData): ExportResult {
  const content = [
    tableData.headers.join(","),
    ...tableData.rows.map((row) => row.join(",")),
  ].join("\n");

  return {
    content,
    mimeType: "text/csv;charset=utf-8;",
    fileExtension: "csv"
  };
}

/**
 * Formats table data as TSV
 */
export function formatAsTSV(tableData: TableData): ExportResult {
  const content = [
    tableData.headers.join("\t"),
    ...tableData.rows.map((row) => row.join("\t")),
  ].join("\n");

  return {
    content,
    mimeType: "text/tab-separated-values;charset=utf-8;",
    fileExtension: "tsv"
  };
}

/**
 * Formats table data as JSON
 */
export function formatAsJSON(tableData: TableData): ExportResult {
  const jsonData = tableData.rows.map((row) => {
    const obj: Record<string, string> = {};
    tableData.headers.forEach((header, index) => {
      obj[header] = row[index] || "";
    });
    return obj;
  });

  const content = JSON.stringify(jsonData, null, 2);

  return {
    content,
    mimeType: "application/json;charset=utf-8;",
    fileExtension: "json"
  };
}

/**
 * Formats table data as XML
 */
export function formatAsXML(tableData: TableData): ExportResult {
  const xmlRows = tableData.rows
    .map((row) => {
      const fields = tableData.headers
        .map(
          (header, index) =>
            `    <${header.replace(/\s+/g, "_")}>${
              row[index] || ""
            }</${header.replace(/\s+/g, "_")}>`
        )
        .join("\n");
      return `  <row>\n${fields}\n  </row>`;
    })
    .join("\n");

  const content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${xmlRows}\n</data>`;

  return {
    content,
    mimeType: "application/xml;charset=utf-8;",
    fileExtension: "xml"
  };
}

/**
 * Formats table data as XLSX (currently exports as CSV)
 * TODO: Implement proper XLSX export with a library like xlsx or exceljs
 */
export function formatAsXLSX(tableData: TableData): ExportResult {
  // For now, XLSX will download as CSV until we add a proper XLSX library
  return formatAsCSV(tableData);
}

/**
 * Main export formatter that handles all formats
 */
export function formatTableData(tableData: TableData, format: ExportFormat): ExportResult {
  switch (format) {
    case "csv":
      return formatAsCSV(tableData);
    case "tsv":
      return formatAsTSV(tableData);
    case "json":
      return formatAsJSON(tableData);
    case "xml":
      return formatAsXML(tableData);
    case "xlsx":
    default:
      return formatAsXLSX(tableData);
  }
}