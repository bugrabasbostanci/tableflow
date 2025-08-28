# Google OAuth App Publishing Requirements - Production Ready

Bu belge TableFlow projesinin Google OAuth entegrasyonunu production ortamına hazırlamak için gerekli adımları içerir.

## Mevcut Durum

Proje şu anda **Testing** modunda çalışıyor ve sadece test kullanıcıları erişim sağlayabiliyor. Production'da herkese açık hale getirmek için aşağıdaki adımların tamamlanması gerekiyor.

## Gerekli Adımlar

### 1. OAuth Consent Screen Yapılandırması

Google Cloud Console'da OAuth Consent Screen'i production için yapılandırın:

#### Zorunlu Alanlar:

- **App name**: TableFlow
- **User support email**: Geçerli bir support e-mail adresi
- **Developer contact information**: Geliştirici iletişim bilgileri
- **App domain**: https://tablio-deu.pages.dev
- **Privacy Policy URL**: Gizlilik politikası linki (zorunlu)
- **Terms of Service URL**: Kullanım şartları linki (zorunlu)
- **App Homepage**: Ana sayfa linki

#### Scopes (İzinler):

Mevcut projede kullanılan scopes:

```
- openid
- .../auth/userinfo.email
- .../auth/userinfo.profile
- .../auth/drive.file
- .../auth/spreadsheets
```

### 2. Gerekli Belgeler

Production'a geçmek için şu belgeler hazırlanmalı:

#### A. Privacy Policy (Gizlilik Politikası)

- Hangi verilerin toplandığı
- Verilerin nasıl kullanıldığı
- Google API'lerden hangi bilgilerin alındığı
- Veri saklama ve silme politikaları
- Kullanıcı hakları

#### B. Terms of Service (Kullanım Şartları)

- Hizmet kullanım koşulları
- Sorumluluk reddi
- Hizmet kesintileri
- Kullanıcı yükümlülükleri

### 3. App Verification Süreci

#### Brand Verification

- Google'ın marka doğrulaması gerekebilir
- İş e-mail adresi gerekli
- Domain ownership verification

#### Security Assessment

Sensitive/Restricted scope'lar için:

- Güvenlik değerlendirmesi gerekebilir
- Penetrasyon testi raporları
- Güvenlik politikası belgeleri

### 4. Publishing Status Değişikliği

Google Cloud Console'da:

1. **OAuth consent screen** → **Publishing status**
2. **"PUBLISH APP"** butonuna tıkla
3. Status "Testing" → "In production" olarak değişir
4. **"Prepare for Verification"** butonuna tıkla

⚠️ **Önemli**: Bu değişiklik geri alınamaz!

### 5. Verification Submission

Gerekli belgeler hazırlandıktan sonra:

1. Google'a verification için başvuru yapın
2. Tüm belgeler ve domain verification tamamlanmış olmalı
3. İnceleme süreci 1-8 hafta sürebilir

### 6. Domain Verification

Production domain için:

- Domain ownership verification (Google Search Console)
- SSL sertifikası aktif olmalı
- HTTPS zorunlu

### 7. Refresh Token Expiry

**Dikkat**: Production'a geçiş sonrası:

- Testing modunda refresh token'lar 7 gün sonra expire olur
- Production'da bu sınırlama kalkar
- Kullanıcılar yeniden authorize etmek zorunda kalabilir

## Hazırlık Listesi

- [ ] Privacy Policy sayfası oluştur
- [ ] Terms of Service sayfası oluştur
- [ ] Domain verification tamamla
- [ ] Support email adresi belirle
- [ ] OAuth consent screen'i güncelle
- [ ] Publishing status'u "In production" yap
- [ ] Verification'a başvur
- [ ] Google'ın incelemesini bekle

## Risk ve Önemli Notlar

### Potansiel Riskler:

1. **Verification Red**: Google uygulamayı reddedebilir
2. **Kullanıcı Güveni**: Verified olmayan uygulamalar "This app isn't verified" uyarısı gösterir
3. **Rate Limits**: Production'da farklı rate limit'ler uygulanabilir

### Öneriler:

1. İlk önce tüm belgeleri hazırlayın
2. Test kullanıcıları ile kapsamlı test yapın
3. Verification süreci için 2-8 hafta zaman ayırın
4. Backup authentication method'u düşünün

## Timeline

| Adım                | Süre      | Açıklama                         |
| ------------------- | --------- | -------------------------------- |
| Belge hazırlığı     | 1-2 hafta | Privacy Policy, Terms of Service |
| Domain verification | 1 gün     | Search Console setup             |
| OAuth yapılandırma  | 1 gün     | Consent screen update            |
| Publishing          | Anında    | Status değişikliği               |
| Google Review       | 1-8 hafta | Verification süreci              |

## Sonraki Adımlar

1. **Öncelik**: Privacy Policy ve Terms of Service sayfaları oluşturun
2. Bu sayfaları tablio-deu.pages.dev domain'inde yayınlayın
3. OAuth consent screen'i bu linklerle güncelleyin
4. Publishing status'u değiştirin
5. Verification'a başvurun

## İletişim

Sorularınız için: [support email buraya]
