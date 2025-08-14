# Export Format Development Plan

## 🎯 **Hedef Format Listesi**

### **Mevcut Durumu**
- ✅ **CSV**: Çalışıyor
- ✅ **JSON**: Çalışıyor  
- ❌ **XLSX**: Fake (CSV export ediyor)
- ❌ **TSV**: Gereksiz
- ❌ **XML**: Gereksiz

### **Yeni Hedef**
```
CSV    → Evrensel uyumluluk ✅
JSON   → API/web uygulamaları ✅  
XLSX   → Gerçek Excel export 🔥
PDF    → Rapor/yazdırma 🔥
HTML   → Web embed/email 🔥
```

---

## 🚀 **Geliştirme Sırası**

### **Phase 1: Core Functionality**
1. **XLSX Implementation** (Yüksek Öncelik)
   - Library: `xlsx` veya `exceljs`
   - Gerçek .xlsx dosyası export
   - Formatting support potansiyeli

2. **PDF Implementation** (Orta Öncelik)
   - Library: `jspdf` + `jspdf-autotable`
   - Tabular format
   - Turkish character support
   - Professional styling

3. **HTML Implementation** (Düşük Öncelik)
   - Clean HTML table generation
   - CSS styling included
   - Email-friendly format

### **Phase 2: Enhancement & Polish**
4. **Format Cleanup**
   - TSV ve XML kaldır
   - UI'da format sıralaması
   - Popular formats önce

5. **Advanced Features**
   - Excel formatting options
   - PDF styling options
   - Export preview

---

## 🛠 **Teknik Implementasyon**

### **1. XLSX Implementation**

```bash
# Dependencies to add
npm install xlsx
npm install @types/xlsx --dev
```

```typescript
// New function in utils/export-formatters.ts
import * as XLSX from 'xlsx';

export function formatAsXLSX(tableData: TableData): ExportResult {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    tableData.headers,
    ...tableData.rows
  ]);
  
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const content = XLSX.write(wb, { 
    type: 'binary', 
    bookType: 'xlsx' 
  });
  
  return {
    content,
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileExtension: "xlsx"
  };
}
```

### **2. PDF Implementation**

```bash
# Dependencies to add  
npm install jspdf jspdf-autotable
npm install @types/jspdf --dev
```

```typescript
// New function in utils/export-formatters.ts
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function formatAsPDF(tableData: TableData): ExportResult {
  const doc = new jsPDF();
  
  // Turkish font support
  doc.setFont('helvetica');
  doc.text('Tablio Raporu', 20, 20);
  
  (doc as any).autoTable({
    head: [tableData.headers],
    body: tableData.rows,
    startY: 30,
    styles: {
      font: 'helvetica',
      fontSize: 10
    },
    headStyles: {
      fillColor: [41, 128, 185]
    }
  });
  
  return {
    content: doc.output('datauristring'),
    mimeType: "application/pdf",
    fileExtension: "pdf"
  };
}
```

### **3. HTML Implementation**

```typescript
// New function in utils/export-formatters.ts
export function formatAsHTML(tableData: TableData): ExportResult {
  const styles = `
    <style>
      table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; font-weight: bold; }
      tr:nth-child(even) { background-color: #f9f9f9; }
    </style>
  `;
  
  const tableHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Tablio Export</title>
      ${styles}
    </head>
    <body>
      <h2>Tablio Veri Tablosu</h2>
      <table>
        <thead>
          <tr>${tableData.headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${tableData.rows.map(row => 
            `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
          ).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  return {
    content: tableHTML,
    mimeType: "text/html;charset=utf-8",
    fileExtension: "html"
  };
}
```

---

## 📊 **UI Değişikleri**

### **Format Selector Update**
```typescript
// types/tablio.ts update
export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'html' | 'json';

// Format list with priorities
const EXPORT_FORMATS = [
  { value: 'xlsx', label: '📊 Excel (XLSX)', popular: true },
  { value: 'csv', label: '📄 CSV', popular: true },
  { value: 'pdf', label: '📋 PDF Raporu', popular: true },
  { value: 'html', label: '🌐 HTML Tablo', popular: false },
  { value: 'json', label: '⚙️ JSON', popular: false },
];
```

### **Loading Messages Update**
```typescript
// Format-specific loading messages
const formatMessages: Record<ExportFormat, string> = {
  csv: "CSV dosyası oluşturuluyor...",
  xlsx: "Excel dosyası oluşturuluyor...",
  pdf: "PDF raporu hazırlanıyor...",
  html: "HTML tablosu oluşturuluyor...",
  json: "JSON verisi hazırlanıyor..."
};
```

---

## 🎯 **Kullanıcı Deneyimi İyileştirmeleri**

### **Format Descriptions**
- **CSV**: "Excel ve Google Sheets'e aktarım için"
- **XLSX**: "Excel'de formül ve formatting ile çalışma"  
- **PDF**: "Rapor paylaşımı ve yazdırma için"
- **HTML**: "Web'de gömme ve email gönderme"
- **JSON**: "API'lara gönderme ve web uygulamaları"

### **Download Feedback**
- Format-specific success messages
- File size display
- Preview option (HTML için)

---

## 🔄 **Implementation Phases**

### **Phase 1: XLSX Priority** 
- [ ] Install xlsx library
- [ ] Implement formatAsXLSX
- [ ] Update types
- [ ] Test with large datasets

### **Phase 2: PDF Addition**
- [ ] Install jspdf libraries  
- [ ] Implement formatAsPDF
- [ ] Turkish character testing
- [ ] Styling optimization

### **Phase 3: HTML & Cleanup**
- [ ] Implement formatAsHTML
- [ ] Remove TSV/XML formats
- [ ] Update UI descriptions
- [ ] Final testing

### **Phase 4: Polish**
- [ ] Loading message improvements
- [ ] Error handling
- [ ] Performance optimization
- [ ] Documentation update

---

## 📈 **Expected Impact**

### **User Benefits**
- ✅ Real Excel file export (en büyük eksik)
- ✅ Professional PDF reports
- ✅ Email-friendly HTML tables
- ✅ Cleaner format list
- ✅ Better user guidance

### **Technical Benefits**  
- ✅ Proper binary file handling
- ✅ Format-specific optimizations
- ✅ Library-based implementations
- ✅ Future-proof architecture

---

## ⚠️ **Risk & Mitigation**

### **Potential Issues**
1. **Bundle size increase** (new libraries)
2. **Browser compatibility** (binary downloads)
3. **Turkish character encoding**
4. **Large dataset performance**

### **Mitigation Strategies**
1. **Dynamic imports** for format libraries
2. **Progressive enhancement** approach
3. **Encoding tests** with Turkish data
4. **Chunk processing** for large exports

---

**Bu plan uygulamaya hazır durumda. İlk adım olarak XLSX implementation'dan başlanabilir.**