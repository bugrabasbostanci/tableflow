# Font Yükleme Rehberi - Türkçe Karakter Desteği

## Adım 1: Font İndir
1. https://fonts.google.com/specimen/Roboto adresine git
2. "Download family" butonuna tıkla
3. ZIP dosyasını indir ve çıkart
4. `Roboto-Regular.ttf` dosyasını bul

## Adım 2: Base64'e Çevir
İki seçenek:

### Seçenek A - Online:
1. https://www.base64-image.de/ sitesine git
2. Roboto-Regular.ttf dosyasını yükle
3. Base64 string'ini kopyala

### Seçenek B - Terminal:
```bash
# Windows PowerShell
$bytes = [System.IO.File]::ReadAllBytes("Roboto-Regular.ttf")
$base64 = [System.Convert]::ToBase64String($bytes)
$base64 | Out-File -FilePath "font-base64.txt"
```

```bash
# Linux/Mac
base64 Roboto-Regular.ttf > font-base64.txt
```

## Adım 3: Koda Ekle
`utils/turkish-font-base64.ts` dosyasında:

```javascript
// Gerçek Roboto font base64 stringi (çok uzun olacak)
const ROBOTO_FONT_BASE64 = `BURAYA_GERÇEK_BASE64_STRING_YAPISTIR`;

export async function loadTurkishFont(doc: any): Promise<boolean> {
  try {
    // jsPDF'e font ekle
    doc.addFileToVFS('Roboto-Regular.ttf', ROBOTO_FONT_BASE64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
    
    console.log('Roboto font loaded successfully');
    return true;
  } catch (error) {
    console.error('Font loading failed:', error);
    return false;
  }
}
```

## Adım 4: Test
1. `npm run build` çalıştır
2. PDF export yap
3. "Kapanış" kelimesinin düzgün görünmesini kontrol et

## Beklenen Sonuçlar
- ✅ "Kapanış" → düzgün görünür (garbled chars yok)
- ✅ Tüm Türkçe karakterler çalışır
- ✅ Font loading console'da success gösterir

## Problem Çözme
Eğer hata alırsan:
1. Base64 string'in doğru kopyalandığını kontrol et
2. TTF dosyasının bozuk olmadığını doğrula
3. Console error'larını kontrol et
4. Font boyutunu kontrol et (çok büyükse browser memory problemi olabilir)

## Alternatif Fontlar
Roboto çalışmazsa dene:
- Noto Sans
- Source Sans Pro  
- Open Sans
- IBM Plex Sans

Hepsi Türkçe karakter destekler.