import { jsPDF } from "jspdf";
import { loadTurkishFont } from "./turkish-font-base64";

/**
 * Result of font loading operation
 */
export interface FontLoadResult {
  fontLoaded: boolean;
  fontName: string;
  shouldFixTurkishChars: boolean;
}

/**
 * Fixes Turkish characters for PDF when custom font is not available
 * Uses clean, readable Latin equivalents
 * ONLY called when Turkish font definitely fails to load
 */
export function fixTurkishCharsForPDF(text: string): string {
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
 * Loads Turkish font for PDF document and returns font configuration
 */
export async function setupPDFFont(doc: jsPDF): Promise<FontLoadResult> {
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

  return {
    fontLoaded,
    fontName,
    shouldFixTurkishChars: !fontLoaded
  };
}

/**
 * Applies font configuration to PDF document
 */
export function applyFontToPDF(doc: jsPDF, fontConfig: FontLoadResult, fontSize?: number): void {
  doc.setFont(fontConfig.fontName);
  if (fontSize) {
    doc.setFontSize(fontSize);
  }
}

/**
 * Processes text for PDF output, applying Turkish character fixes if needed
 */
export function processTextForPDF(text: string, fontConfig: FontLoadResult): string {
  return fontConfig.shouldFixTurkishChars ? fixTurkishCharsForPDF(text) : text;
}

/**
 * Creates PDF document with standard Turkish configuration
 */
export function createTurkishPDF(): jsPDF {
  return new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
    putOnlyUsedFonts: true,
    compress: true,
  });
}

/**
 * Adds standard header to PDF document
 */
export function addPDFHeader(doc: jsPDF, fontConfig: FontLoadResult): void {
  // Add title
  applyFontToPDF(doc, fontConfig, 16);
  const title = processTextForPDF("Tablio Raporu", fontConfig);
  doc.text(title, 20, 20);

  // Add generation date
  const dateText = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  
  applyFontToPDF(doc, fontConfig, 10);
  const processedDate = processTextForPDF(dateText, fontConfig);
  doc.text(processedDate, 20, 30);
}

/**
 * Creates AutoTable font hooks for consistent font application
 */
export function createFontHooks(fontConfig: FontLoadResult) {
  return {
    didParseCell: function (data: any) {
      if (fontConfig.fontLoaded) {
        data.doc.setFont(fontConfig.fontName);
      }
    },
    willDrawCell: function (data: any) {
      if (fontConfig.fontLoaded) {
        data.doc.setFont(fontConfig.fontName);
      }
    },
    didDrawCell: function (data: any) {
      if (fontConfig.fontLoaded) {
        data.doc.setFont(fontConfig.fontName);
      }
    }
  };
}

/**
 * Creates footer with page numbers and summary info
 */
export function createPDFFooter(fontConfig: FontLoadResult, tableData: { headers: string[], rows: string[][] }) {
  return function (data: any) {
    const doc = data.doc;
    
    // Type-safe way to get page count
    const docInternal = doc.internal as any;
    const pageCount = docInternal.getNumberOfPages();
    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height || pageSize.getHeight();
    const pageWidth = pageSize.width || pageSize.getWidth();

    // Apply font configuration
    if (fontConfig.fontLoaded) {
      doc.setFont(fontConfig.fontName);
    }
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);

    // Page number
    const pageText = processTextForPDF(`Sayfa ${data.pageNumber} / ${pageCount}`, fontConfig);
    doc.text(pageText, data.settings.margin.left, pageHeight - 8);

    // Summary info
    const summaryText = processTextForPDF(
      `${tableData.rows.length} records • ${tableData.headers.length} columns`, 
      fontConfig
    );
    doc.text(summaryText, pageWidth - 50, pageHeight - 8);
  };
}