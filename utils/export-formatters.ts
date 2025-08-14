import type { TableData, ExportFormat, ExportResult } from "@/types/tablio";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { AutoTableOptions } from "@/types/jspdf-autotable";
import { 
  setupPDFFont, 
  createTurkishPDF, 
  addPDFHeader, 
  processTextForPDF,
  fixTurkishCharsForPDF,
  applyFontToPDF,
  createFontHooks,
  createPDFFooter
} from "./pdf-font-utils";

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
    fileExtension: "csv",
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
    fileExtension: "json",
  };
}

/**
 * Formats table data as XLSX using the xlsx library
 */
export function formatAsXLSX(tableData: TableData): ExportResult {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([tableData.headers, ...tableData.rows]);

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const content = XLSX.write(wb, {
    type: "array",
    bookType: "xlsx",
  });

  return {
    content: new Uint8Array(content),
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileExtension: "xlsx",
  };
}

/**
 * Formats table data as PDF using jsPDF with Turkish font support
 * Returns async function to handle font loading
 */
export async function formatAsPDF(tableData: TableData): Promise<ExportResult> {
  try {
    // Create PDF document with standard Turkish configuration
    const doc = createTurkishPDF();

    // Setup font with Turkish support
    const fontConfig = await setupPDFFont(doc);

    // Add standard header with title and date
    addPDFHeader(doc, fontConfig);

    // Get page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const availableWidth = pageWidth - 30; // 15mm margins

    // Process table data with font-appropriate character handling
    const headers = tableData.headers.map(header => processTextForPDF(header, fontConfig));
    const rows = tableData.rows.map(row => 
      row.map(cell => processTextForPDF(cell, fontConfig))
    );

    // Generate font hooks for consistent font application
    const fontHooks = createFontHooks(fontConfig);

    // Create table with autoTable
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 40,
      styles: {
        font: fontConfig.fontName,
        fontSize: 9,
        cellPadding: 4,
        overflow: "linebreak",
        halign: "left",
        valign: "middle",
        minCellHeight: 18,
        cellWidth: "wrap",
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [45, 45, 45],
        textColor: 255,
        fontSize: 9,
        fontStyle: "normal",
        font: fontConfig.fontName,
        minCellHeight: 20,
        valign: "middle",
        halign: "center",
      },
      bodyStyles: {
        font: fontConfig.fontName,
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250],
        font: fontConfig.fontName,
      },
      margin: {
        top: 20,
        right: 15,
        bottom: 20,
        left: 15,
      },
      theme: "grid",
      pageBreak: "auto",
      showHead: "everyPage",
      tableWidth: availableWidth,
      didDrawPage: createPDFFooter(fontConfig, tableData),
      ...fontHooks,
    });

    // Generate PDF buffer
    const pdfBuffer = new Uint8Array(doc.output("arraybuffer"));

    return {
      content: pdfBuffer,
      mimeType: "application/pdf",
      fileExtension: "pdf",
    };
  } catch (error) {
    console.error("PDF generation failed:", error);

    // Fallback with basic configuration and character fixes
    const fallbackDoc = new jsPDF({
      orientation: "landscape",
      unit: "mm", 
      format: "a4",
    });

    fallbackDoc.setFont("helvetica");
    fallbackDoc.text("Tablio Raporu", 20, 20);

    // Apply character fixes for fallback
    const processedHeaders = tableData.headers.map(fixTurkishCharsForPDF);
    const processedRows = tableData.rows.map(row => 
      row.map(fixTurkishCharsForPDF)
    );

    autoTable(fallbackDoc, {
      head: [processedHeaders],
      body: processedRows,
      startY: 30,
      styles: { font: "helvetica", fontSize: 8 },
    });

    const fallbackBuffer = new Uint8Array(fallbackDoc.output("arraybuffer"));

    return {
      content: fallbackBuffer,
      mimeType: "application/pdf",
      fileExtension: "pdf",
    };
  }
}

/**
 * Formats table data as HTML with embedded CSS styling
 */
export function formatAsHTML(tableData: TableData): ExportResult {
  const styles = `
    <style>
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        margin: 20px;
        background-color: #f8fafc;
      }
      .container {
        max-width: 100%;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      h2 { 
        color: #1e293b; 
        margin-bottom: 16px; 
        font-weight: 600;
      }
      table { 
        border-collapse: collapse; 
        width: 100%; 
        font-family: inherit;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        overflow: hidden;
      }
      th, td { 
        border: 1px solid #e2e8f0; 
        padding: 12px 16px; 
        text-align: left; 
        vertical-align: top;
      }
      th { 
        background-color: #2980b9; 
        color: white; 
        font-weight: 600;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      tr:nth-child(even) { 
        background-color: #f8fafc; 
      }
      tr:hover {
        background-color: #f1f5f9;
      }
      td {
        font-size: 14px;
        color: #334155;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        color: #64748b;
        font-size: 12px;
      }
    </style>
  `;

  const tableHTML = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tablio Veri Tablosu</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <h2>Tablio Veri Tablosu</h2>
        <table>
          <thead>
            <tr>${tableData.headers.map((h) => `<th>${h}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${tableData.rows
              .map(
                (row) =>
                  `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
        <div class="footer">
          <p>Tablio ile oluşturuldu - ${new Date().toLocaleDateString(
            "tr-TR"
          )}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    content: tableHTML,
    mimeType: "text/html;charset=utf-8",
    fileExtension: "html",
  };
}

/**
 * Main export formatter that handles all formats
 * PDF format is async due to font loading
 */
export async function formatTableData(
  tableData: TableData,
  format: ExportFormat
): Promise<ExportResult> {
  switch (format) {
    case "csv":
      return formatAsCSV(tableData);
    case "json":
      return formatAsJSON(tableData);
    case "pdf":
      return await formatAsPDF(tableData);
    case "html":
      return formatAsHTML(tableData);
    case "xlsx":
    default:
      return formatAsXLSX(tableData);
  }
}
