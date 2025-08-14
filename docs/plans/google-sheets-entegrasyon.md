Google Sheets Entegrasyonu Planı

    1. Kütüphane Kurulumu

    - google-spreadsheet ve google-auth-library kütüphanelerini package.json'a ekle
    - OAuth2 ve Google Sheets API bağımlılıklarını kur

    2. Google Cloud Console Kurulumu

    - Google Cloud Project oluştur
    - Google Sheets API ve Google Drive API'yi enable et
    - OAuth2 credentials oluştur (Client ID ve Secret)
    - Authorized redirect URIs'leri yapılandır

    3. Environment Variables ve Konfigürasyon

    - .env.local dosyasında Google OAuth credentials'ları tanımla
    - TypeScript tiplerini güncelle (OAuth state, credentials)

    4. OAuth2 Authentication Flow

    - Kullanıcıyı Google'da authenticate etmek için yeni endpoint oluştur
    - OAuth2 callback handler implement et
    - Token yönetimi (access/refresh token storage)

    5. Google Sheets Export Fonksiyonu

    - Yeni Google Sheet oluştur
    - Table data'yı Sheets'e transfer et
    - Header row ve data rows'ları doğru formatta ekle

    6. UI/UX İyileştirmeleri

    - handleGoogleSheetsExport fonksiyonunu implement et
    - Loading states (OAuth popup, sheet creation, data transfer)
    - Error handling ve kullanıcı feedback'i
    - Türkçe mesajlar (başarı/hata durumları)

    7. Test ve Doğrulama

    - Farklı tablo boyutları ile test
    - OAuth flow test'i
    - Error scenarios test'i

    Bu plan, kullanıcıların tablolarını doğrudan kendi Google Drive'larında yeni bir Google Sheet olarak
    kaydetmelerini sağlayacak.
