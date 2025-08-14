import type { TableData, ExportFormat, ExportResult } from "@/types/tablio";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { loadTurkishFont } from "./turkish-font-base64";

/**
 * Fixes Turkish characters for PDF when custom font is not available
 * Uses clean, readable Latin equivalents
 * ONLY called when Turkish font definitely fails to load
 */
function fixTurkishCharsForPDF(text: string): string {
  return (
    text
      // Turkish character fixes - clean and readable
      .replace(/ş/g, "s") // ş → s
      .replace(/Ş/g, "S") // Ş → S
      .replace(/ç/g, "c") // ç → c
      .replace(/Ç/g, "C") // Ç → C
      .replace(/ğ/g, "g") // ğ → g
      .replace(/Ğ/g, "G") // Ğ → G
      .replace(/ü/g, "u") // ü → u
      .replace(/Ü/g, "U") // Ü → U
      .replace(/ö/g, "o") // ö → o
      .replace(/Ö/g, "O") // Ö → O
      .replace(/ı/g, "i") // ı → i
      .replace(/İ/g, "I") // İ → I
  );
}

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
    // Create PDF with Turkish font support
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true,
    });

    // Load Turkish-compatible Roboto font from Base64
    let fontLoaded = false;
    let fontName = "helvetica"; // Default fallback

    try {
      fontLoaded = await loadTurkishFont(doc);
      fontName = "helvetica"; // Always use helvetica as loadTurkishFont registers with helvetica encoding
      doc.setLanguage("tr");

      if (fontLoaded) {
        console.log("Turkish font loaded successfully with Base64 data");
      } else {
        console.log("Using fallback helvetica font");
      }
    } catch (error) {
      console.warn("Failed to load Turkish font from Base64:", error);
      doc.setFont("helvetica");
      fontLoaded = false;
      fontName = "helvetica";
    }

    // Add title
    doc.setFontSize(16);
    doc.text("Tablio Raporu", 20, 20);

    // Add generation date
    const dateText = new Date().toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.setFontSize(10);
    doc.text(dateText, 20, 30);

    // Get page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const availableWidth = pageWidth - 30; // 15mm margins

    // Prepare table data - apply character fixes only if Roboto font failed to load
    let headers = tableData.headers;
    let rows = tableData.rows;

    if (!fontLoaded) {
      console.warn("Roboto font not loaded from Base64, applying Turkish character fixes");
      headers = tableData.headers.map(fixTurkishCharsForPDF);
      rows = tableData.rows.map((row) => row.map(fixTurkishCharsForPDF));
    } else {
      console.log(
        "Roboto font loaded successfully from Base64, Turkish characters will render correctly"
      );
    }

    // Create table with autoTable using Roboto font
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 40,
      styles: {
        font: fontName,
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
        font: fontName,
        minCellHeight: 20,
        valign: "middle",
        halign: "center",
      },
      bodyStyles: {
        font: fontName,
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250],
        font: fontName,
      },
      // Force correct font in ALL drawing hooks
      didParseCell: function (data) {
        if (fontLoaded) {
          data.doc.setFont(fontName);
        }
      },
      willDrawCell: function (data) {
        if (fontLoaded) {
          data.doc.setFont(fontName);
        }
      },
      didDrawCell: function (data) {
        if (fontLoaded) {
          data.doc.setFont(fontName);
        }
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
      didDrawPage: function (data) {
        // Footer with page numbers - force font here too
        const pageCount = (doc as any).internal.getNumberOfPages();
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height || pageSize.getHeight();

        // Force correct font before drawing text
        if (fontLoaded) {
          doc.setFont(fontName);
        }
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);

        // Page number
        doc.text(
          `Sayfa ${data.pageNumber} / ${pageCount}`,
          data.settings.margin.left,
          pageHeight - 8
        );

        // Summary info
        doc.text(
          `${tableData.rows.length} kayıt • ${tableData.headers.length} sütun`,
          pageWidth - 50,
          pageHeight - 8
        );
      },
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

    // Fallback with character replacement
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("helvetica");
    doc.text("Tablio Raporu", 20, 20);

    // Apply character fixes in fallback
    const processedHeaders = tableData.headers.map(fixTurkishCharsForPDF);
    const processedRows = tableData.rows.map((row) =>
      row.map(fixTurkishCharsForPDF)
    );

    autoTable(doc, {
      head: [processedHeaders],
      body: processedRows,
      startY: 30,
      styles: { font: "helvetica", fontSize: 8 },
    });

    const fallbackBuffer = new Uint8Array(doc.output("arraybuffer"));

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
