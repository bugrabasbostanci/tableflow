# Türkçe Font Kurulumu - PDF İçin

## Genel Bakış

Tablio'da PDF export'unda Türkçe karakterlerin (ç, ğ, ı, ş, ü, ö, Ç, Ğ, İ, Ş, Ü, Ö) doğru görünmesi için TTF font dosyası gereklidir.

## Kurulum Adımları

### 1. Font Dosyasını İndirin

Aşağıdaki seçeneklerden birini kullanarak Türkçe destekli font edinin:

**DejaVu Sans (Önerilen):**
- https://dejavu-fonts.github.io/ 
- `dejavu-fonts-ttf-2.37.tar.bz2` dosyasını indirin
- `DejaVuSans.ttf` dosyasını bulun

**Noto Sans:**
- https://fonts.google.com/noto/specimen/Noto+Sans
- "Download family" butonuna tıklayın
- `NotoSans-Regular.ttf` dosyasını kullanın

### 2. Font Dosyasını Yerleştirin

İndirdiğiniz TTF dosyasını aşağıdaki konuma kopyalayın:
```
public/fonts/DejaVuSans.ttf
```

### 3. Test Edin

1. Uygulamayı çalıştırın: `npm run dev`
2. Türkçe karakterli tablo verisi ekleyin (örn: "Kapanış", "Analist Sayısı")
3. PDF export'unu deneyin
4. PDF'de Türkçe karakterlerin doğru görünüp görünmediğini kontrol edin

## Fallback Davranış

Font dosyası bulunamazsa:
- Sistem otomatik olarak Helvetica font'una geçer
- Türkçe karakterler düzgün görünmeyebilir
- Console'da uyarı mesajı görürsünüz

## Font Boyutu Optimizasyonu

Dosya boyutunu küçültmek için:
- Font subset'i kullanabilirsiniz (sadece gerekli karakterler)
- WOFF2 formatına dönüştürebilirsiniz
- Font compression araçları kullanabilirsiniz

## Alternatif Fontlar

DejaVu Sans dışında test edilmiş fontlar:
- Liberation Sans
- Open Sans  
- Roboto
- Source Sans Pro

## Sorun Giderme

**PDF'de Türkçe karakterler görünmüyorsa:**
1. Font dosyasının doğru konumda olduğunu kontrol edin
2. Dosya iznilerini kontrol edin
3. Browser developer console'da hata mesajlarını kontrol edin
4. Font dosyasının bozuk olmadığını doğrulayın

**Font yüklenmiyorsa:**
- Network sekmesinde `/fonts/DejaVuSans.ttf` isteğini kontrol edin
- Font dosyasının public klasöründe olduğunu doğrulayın
- Server'ın TTF dosyalarını serve ettiğini kontrol edin