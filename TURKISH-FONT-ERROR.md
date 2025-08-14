Bu sorun, jsPDF'te Türkçe karakterlerin düzgün görüntülenmemesinden kaynaklanıyor. Temel sebep, varsayılan fontların Türkçe karakterleri desteklememesi. İşte çözüm yolları:

## Çözüm: Türkçe Destekli Font Kullanımı## Sorunun Kaynağı

jsPDF'in varsayılan fontları (Helvetica, Times, Courier) Latin-1 karakter setini kullanır ve Türkçe karakterleri (ç, ğ, ı, ö, ş, ü) desteklemez. Bu yüzden "Kapanış" yerine "Kapanis" veya garip karakterler görürsünüz.

## En Pratik Çözüm

**1. Font Hazırlama:**

- Roboto, Open Sans veya Arial Unicode MS gibi Unicode destekli bir TTF font indirin
- Font dosyasını [bu tür araçlarla](https://www.giftofspeed.com/base64-encoder/) Base64'e çevirin

**2. Kod Implementasyonu:**

```javascript
// Font'u Base64 olarak ekle
const fontBase64 = "AAEAAAALAIAAAwAwT1M..."; // Tam base64 string

// jsPDF'e font'u yükle
doc.addFileToVFS("MyFont.ttf", fontBase64);
doc.addFont("MyFont.ttf", "MyFont", "normal");
doc.setFont("MyFont");

// AutoTable için
doc.autoTable({
  styles: {
    font: "MyFont", // Özel fontu kullan
  },
  // ... diğer ayarlar
});
```

---

## Tam Çalışan Örnek Kod

```JavaScript
// jsPDF ve jspdf-autotable kütüphanelerini yükleyin
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

<script>
// Font yükleme fonksiyonu
async function createPDFWithTurkishSupport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Font base64 stringi (kısaltılmış örnek)
    // Gerçek uygulamada tam font base64'ünü kullanın
    const fontBase64 = "AAEAAAALAIAAAwAwT1MvMg8S..."; // Tam base64 string

    // Font'u ekle
    doc.addFileToVFS('CustomFont.ttf', fontBase64);
    doc.addFont('CustomFont.ttf', 'CustomFont', 'normal');
    doc.setFont('CustomFont');

    // Başlık ekle
    doc.setFontSize(16);
    doc.text('Türkçe Karakter Testi', 20, 20);

    // Tablo verisi
    const tableData = [
        ['Ürün', 'Açıklama', 'Kapanış'],
        ['Çikolata', 'Özel üretim', 'Çarşamba'],
        ['Şeker', 'Organik şeker', 'Perşembe'],
        ['Böğürtlen', 'Taze böğürtlen', 'Cumartesi']
    ];

    // Tablo oluştur
    doc.autoTable({
        head: [tableData[0]],
        body: tableData.slice(1),
        startY: 30,
        styles: {
            font: 'CustomFont', // Özel font kullan
            fontSize: 10
        },
        headStyles: {
            fillColor: [102, 126, 234]
        }
    });

    // PDF'i kaydet
    doc.save('turkce-icerik.pdf');
}
</script>
```
