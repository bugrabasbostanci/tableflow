# Türkçe Font Desteği

## Genel Bakış

Tablio, Türkçe karakterleri (ç, ğ, ı, ö, ş, ü, Ç, Ğ, İ, Ö, Ş, Ü) desteklemek için özel font yapılandırması kullanır.

## Mevcut Durum

### Web Arayüzü
- **Font**: Geist Sans (Google Fonts)
- **Karakter desteği**: Tam Türkçe desteği
- **Kullanım**: CSS'de otomatik olarak yüklenir

### PDF Export
- **Font**: jsPDF varsayılan fontları (Helvetica, Times)
- **Karakter desteği**: ✅ Türkçe karakterler çalışıyor
- **Durum**: "Kapanış", "Analist Sayısı" gibi Türkçe kelimeler düzgün görünüyor

## Mevcut Çözüm

✅ **Türkçe desteği zaten çalışıyor!** 

jsPDF'in varsayılan fontları beklenenden daha iyi Türkçe karakter desteği sunuyor:
- Helvetica fontu Türkçe karakterleri düzgün render ediyor
- Ek font yüklemeye gerek kalmıyor
- autoTable ile tablo export'u sorunsuz

## Test Sonuçları

- ✅ **Web'de**: "Kapanış, Değişim, Açıklama" düzgün görünür
- ✅ **PDF'de**: "Kapanış", "Analist Sayısı", "Tavsiyeleri" sorunsuz

## Sonuç

Türkçe font desteği başarıyla çalışıyor. Ek font konfigürasyonu gerekmemektedir.