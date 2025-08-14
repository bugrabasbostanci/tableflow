"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { AppHeader } from "@/components/tablio/layout/AppHeader";
import { ExportControls } from "@/components/tablio/layout/ExportControls";
import { MobileControlsToggle } from "@/components/tablio/layout/MobileControlsToggle";
import { AppFooter } from "@/components/tablio/layout/AppFooter";
import { toast } from "sonner";
import type { TableData, ExportFormat } from "@/types/tablio";
import { formatTableData } from "@/utils/export-formatters";
import { getTableStats } from "@/utils/table-operations";
import { SkeletonTable } from "@/components/tablio/feedback/SkeletonTable";
import { ProcessingLoadingOverlay } from "@/components/tablio/feedback/ProcessingLoadingOverlay";
import { DownloadLoadingOverlay } from "@/components/tablio/feedback/DownloadLoadingOverlay";
import { DataInput } from "@/components/tablio/input/DataInput";
import { useDataInput } from "@/hooks/use-data-input";
import { EditableTable } from "@/components/tablio/table/EditableTable";
import { TableControls } from "@/components/tablio/table/TableControls";
import { useTableEditor } from "@/hooks/use-table-editor";

export default function TablioApp() {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [fileName, setFileName] = useState("");
  const [format, setFormat] = useState<ExportFormat>("xlsx");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");

  const processData = useCallback(
    async (parsed: TableData, fileName?: string) => {
      setIsProcessing(true);
      setLoadingProgress(0);

      const stats = getTableStats(parsed);
      const isLargeDataset = stats.isLargeDataset;

      setLoadingMessage("Veri analiz ediliyor...");
      setLoadingProgress(20);

      if (isLargeDataset) {
        setLoadingMessage("Büyük veri seti işleniyor...");
        setLoadingProgress(40);
        
        // For large datasets, allow UI updates during processing
        const chunkSize = 1000;
        const totalChunks = Math.ceil(parsed.rows.length / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
          setLoadingMessage(`Veriler işleniyor... (${i + 1}/${totalChunks})`);
          setLoadingProgress(40 + (i / totalChunks) * 40);

          // Allow UI to update every few chunks
          if (i % 10 === 0) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
          }
        }
      } else {
        setLoadingProgress(60);
      }

      setLoadingMessage("Tablo hazırlanıyor...");
      setLoadingProgress(80);

      setTableData(parsed);
      if (fileName) {
        setFileName(fileName);
      }

      setLoadingMessage("Tamamlanıyor...");
      setLoadingProgress(95);

      // Allow final UI update
      await new Promise((resolve) => requestAnimationFrame(resolve));

      setLoadingProgress(100);
      
      // Brief completion state
      setTimeout(() => {
        setIsProcessing(false);
        setLoadingProgress(0);
        setLoadingMessage("");
      }, 150);

      const finalStats = getTableStats(parsed);
      toast.success(
        `Tablo başarıyla yüklendi! ${finalStats.rows} satır ve ${
          finalStats.columns
        } sütun içeren ${
          finalStats.isLargeDataset ? "büyük " : ""
        }tablo yüklendi.`
      );
    },
    []
  );

  // Data input hook
  const dataInputProps = useDataInput({ onDataLoaded: processData });

  // Table editor hook
  const tableEditorProps = useTableEditor({
    tableData,
    onTableChange: setTableData,
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      dataInputProps.handleKeyDown(e, isProcessing);
    },
    [dataInputProps, isProcessing]
  );

  const handleClear = useCallback(() => {
    setTableData(null);
    setFileName("tablio-file");
    setFormat("xlsx");
    setShowMobileControls(false);
    toast.success("Veriler temizlendi: Yeni bir tablo yapıştırabilirsiniz.");
  }, []);

  const handleDownload = useCallback(async () => {
    if (!tableData) return;

    setIsDownloading(true);
    setLoadingProgress(0);

    const stats = getTableStats(tableData);
    const isLargeDataset = stats.isLargeDataset;

    setLoadingMessage(`${format.toUpperCase()} formatına dönüştürülüyor...`);
    setLoadingProgress(25);

    const { content, mimeType, fileExtension } = await formatTableData(
      tableData,
      format
    );

    if (isLargeDataset) {
      setLoadingMessage("Büyük dosya oluşturuluyor...");
      setLoadingProgress(60);
      // Allow UI update for large files
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }

    setLoadingMessage("Dosya hazırlanıyor...");
    setLoadingProgress(80);

    const blob = new Blob([content as BlobPart], { type: mimeType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    setLoadingMessage("İndirme başlatılıyor...");
    setLoadingProgress(95);

    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.${fileExtension}`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoadingProgress(100);
    
    // Brief completion state
    setTimeout(() => {
      setIsDownloading(false);
      setLoadingProgress(0);
      setLoadingMessage("");
    }, 150);

    const fileSizeKB = Math.round(blob.size / 1024);
    toast.success(
      `Dosya indirildi: ${fileName}.${fileExtension} dosyası başarıyla indirildi. (${fileSizeKB} KB)`
    );
  }, [tableData, fileName, format]);

  const handleGoogleSheetsExport = useCallback(() => {
    toast(
      "Yakında gelecek: Google Sheets entegrasyonu üzerinde çalışıyoruz. Çok yakında kullanıma sunulacak."
    );
  }, []);


  return (
    <div
      className="min-h-screen bg-background transition-all duration-300"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AppHeader />

      <main className="container mx-auto px-4 max-w-6xl">
        {!tableData ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
            {isProcessing ? (
              <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-500">
                <ProcessingLoadingOverlay
                  message={loadingMessage}
                  progress={loadingProgress}
                />
                <SkeletonTable />
              </div>
            ) : (
              <DataInput
                onPaste={dataInputProps.handlePaste}
              />
            )}
          </div>
        ) : (
          /* Active State - Table Preview & Actions */
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
            <MobileControlsToggle
              showMobileControls={showMobileControls}
              onToggle={() => setShowMobileControls(!showMobileControls)}
            />

            <ExportControls
              fileName={fileName}
              setFileName={setFileName}
              format={format}
              setFormat={setFormat}
              onClear={handleClear}
              onDownload={handleDownload}
              onGoogleSheetsExport={handleGoogleSheetsExport}
              isDownloading={isDownloading}
              showMobileControls={showMobileControls}
            />

            {isDownloading && (
              <DownloadLoadingOverlay
                message={loadingMessage}
                progress={loadingProgress}
              />
            )}

            <TableControls
              onAddRow={tableEditorProps.addRow}
              onAddColumn={tableEditorProps.addColumn}
            />

            <EditableTable
              tableData={tableData}
              editingCell={tableEditorProps.editingCell}
              editValue={tableEditorProps.editValue}
              onEditValueChange={tableEditorProps.setEditValue}
              onCellClick={tableEditorProps.handleCellClick}
              onCellSave={tableEditorProps.handleCellSave}
              onCellCancel={tableEditorProps.handleCellCancel}
              onRemoveRow={tableEditorProps.removeRow}
              onRemoveColumn={tableEditorProps.removeColumn}
            />
          </div>
        )}
      </main>

      <AppFooter />
    </div>
  );
}
