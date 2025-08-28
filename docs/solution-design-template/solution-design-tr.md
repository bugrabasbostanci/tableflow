# TableFlow MVP Çözüm Tasarım Dokümanı

## 1. Problem Tanımı ve Değer/Çözüm Önerisi

### Problem Tanımı

- **Mevcut Durum:** Kullanıcılar web sitelerinden, PDF'lerden veya dokümanlardaken tablo verilerini kopyalıyor ancak bu verileri analiz için yapılandırılmış formatlara dönüştürmekte zorlanıyorlar
- **Problem Etkisi:** Veri analistleri, araştırmacılar ve ofis çalışanları kopyalanan tablo verilerini manuel olarak yeniden formatlamak için önemli zaman kaybediyor
- **Çözümsüz Kalırsa:** Veri işleme iş akışlarında verimsizliğin devam etmesi, manuel veri girişinde hata oranlarının artması

### Çözüm Önerisi

- **Çözümün Kısa Tanımı:** Kopyalanan tablo verilerini anında Excel, CSV ve diğer yapılandırılmış formatlara dönüştüren web uygulaması
- **Değer Önerisi:** Popüler formatlara doğrudan aktarım özellikli, sürtünmesiz tablo veri dönüştürme
- **Beklenen Faydalar:**
  - [ ] Veri dönüştürme süresini dakikalardan saniyelere düşürme
  - [ ] Manuel yeniden formatlama hatalarını ortadan kaldırma
  - [ ] Farklı kullanım durumları için çoklu aktarım formatı desteği

## 2. Ürün Kapsamı

### Must-Have (Olmazsa Olmaz)

| Özellik             | Açıklama                                                | Öncelik |
| ------------------- | ------------------------------------------------------- | ------- |
| Pano'dan Yapıştırma | Panodan sekmeyle ayrılmış tablo verilerini kabul etme   | P0      |
| CSV Dosya Yükleme   | Sürükle-bırak ile CSV dosyalarını yükleme ve ayrıştırma | P0      |
| Tablo Düzenleme     | Satır içi düzenleme ile hücrelere tıklayarak düzenleme  | P0      |
| Excel Aktarımı      | Verileri XLSX formatında aktarma                        | P0      |
| CSV Aktarımı        | Verileri CSV formatında aktarma                         | P0      |
| Mobil Uyumlu        | Mobil cihazlar için dokunma dostu arayüz                | P0      |

### Nice-to-Have (Olsa İyi Olur)

| Özellik                    | Açıklama                                     | Öncelik |
| -------------------------- | -------------------------------------------- | ------- |
| JSON Aktarımı              | Verileri JSON formatında aktarma             | P1      |
| XML Aktarımı               | Verileri XML formatında aktarma              | P1      |
| Google Sheets Entegrasyonu | Google Sheets'e doğrudan aktarım             | P1      |
| Satır/Sütun Yönetimi       | Satır ve sütun ekleme/silme                  | P1      |
| Karanlık Tema              | Varsayılan karanlık tema, açık tema seçeneği | P1      |

### Out of Scope (Kapsam Dışı)

- Kullanıcı verilerinin veritabanında saklanması
- Kullanıcı kimlik doğrulama sistemi
- Gelişmiş veri analizi özellikleri
- Gerçek zamanlı işbirliği

## 3. Kullanıcı Akışı

### Birincil Kullanıcılar

- **Kullanıcı Tipi:** Veri Analistleri ve Ofis Çalışanları
- **Demografik:** 25-45 yaş, küresel, ofis/uzaktan çalışanlar
- **Teknik Yetkinlik:** Orta
- **Kullanım Sıklığı:** Günlük-haftalık
- **Temel İhtiyaçları:** Hızlı tablo veri dönüştürme ve aktarım

### İkincil Kullanıcılar

- **Kullanıcı Tipi:** Öğrenciler ve Araştırmacılar
- **Özellikleri:** Akademik projeler için ara sıra kullanım

### Kullanıcı Personaları

**Persona 1: Ayşe - Veri Analisti**

- Yaş: 32
- Meslek: İş Veri Analisti
- Problem: Sık sık raporlardan tabloları Excel'e kopyalıyor
- Motivasyon: Veri hazırlama görevlerinde zaman tasarrufu

### User Flows

#### Akış 1: Pano Verisi Dönüştürme

```
1. Kullanıcı herhangi bir kaynaktan tablo verisini kopyalıyor
2. Sistem yapıştırma sırasında pano içeriğini algılıyor
3. Kullanıcı düzenlenebilir hücreli ayrıştırılmış tabloyu görüyor
4. Kullanıcı aktarım formatını seçiyor ve dosyayı indiriyor
```

#### Akış 2: CSV Dosya Yükleme

```
1. Kullanıcı CSV dosyasını yükleme alanına sürüklüyor
2. Sistem tablo verisini ayrıştırıyor ve görüntülüyor
3. Kullanıcı gerekirse verileri düzenliyor
4. Kullanıcı istediği formatta aktarım yapıyor
```

## 4. Teknik Tasarım (Basitleştirilmiş)

### Tech Stack

| Katman             | Teknoloji               | Neden Seçildi?                                    |
| ------------------ | ----------------------- | ------------------------------------------------- |
| **Frontend**       | Next.js 15 (App Router) | Sunucu tarafı rendering, modern React özellikleri |
| **Dil**            | TypeScript              | Tip güvenliği ve daha iyi geliştirme deneyimi     |
| **Stil**           | Tailwind CSS v4         | Utility-first CSS, karanlık tema desteği          |
| **UI Bileşenleri** | shadcn/ui + Radix UI    | Erişilebilir, özelleştirilebilir bileşenler       |
| **İkonlar**        | Lucide React            | Tutarlı ikon kütüphanesi                          |
| **Build Aracı**    | Turbopack               | Hızlı geliştirme build'leri                       |

### 3rd Party Servisler

| Servis            | Kullanım Amacı                   | Maliyet                  |
| ----------------- | -------------------------------- | ------------------------ |
| Google Sheets API | Google Sheets'e doğrudan aktarım | Ücretsiz katman mevcut   |
| Vercel/Netlify    | Hosting ve deployment            | MVP için ücretsiz katman |

### Sistem Mimarisi

```
[Next.js Frontend] → [İstemci Tarafı İşleme]
         ↓
[Tarayıcı API'leri] (Pano, Dosya)
         ↓
[Aktarım Kütüphaneleri] (XLSX, CSV ayrıştırıcıları)
```

## 5. Veri modeli (schema)

### Veri Yapıları (İstemci tarafı)

#### Tablo Veri Yapısı

```typescript
interface TableData {
  headers: string[];
  rows: string[][];
  metadata: {
    rowCount: number;
    columnCount: number;
    lastModified: Date;
  };
}
```

#### Aktarım Format Seçenekleri

```typescript
type ExportFormat = "xlsx" | "csv" | "json" | "xml";

interface ExportOptions {
  format: ExportFormat;
  filename: string;
  includeHeaders: boolean;
}
```

## 6. API Tasarımı

### İstemci Tarafı Fonksiyonlar

| Fonksiyon              | Amaç                                   | Girdi             | Çıktı       |
| ---------------------- | -------------------------------------- | ----------------- | ----------- |
| `parseClipboardData()` | Yapıştırılan tablo verisini ayrıştırma | `string`          | `TableData` |
| `parseCSVFile()`       | Yüklenen CSV dosyasını ayrıştırma      | `File`            | `TableData` |
| `exportToXLSX()`       | Excel dosyası oluşturma                | `TableData`       | `Blob`      |
| `exportToCSV()`        | CSV dosyası oluşturma                  | `TableData`       | `string`    |
| `updateCell()`         | Tek hücre güncelleme                   | `row, col, value` | `TableData` |

### Google Sheets API Entegrasyonu

| Endpoint             | Method | Amaç                    | Auth Gerekli |
| -------------------- | ------ | ----------------------- | ------------ |
| `/api/auth/google`   | GET    | OAuth akışını başlatma  | ❌           |
| `/api/sheets/export` | POST   | Google Sheets'e aktarım | ✅           |

## 7. Başarı Metrikleri

### Teknik Metrikler

| Metrik                | Hedef       | Ölçüm Yöntemi            |
| --------------------- | ----------- | ------------------------ |
| Sayfa Yüklenme Süresi | < 2 saniye  | Lighthouse/PageSpeed     |
| İşleme Süresi         | < 1 saniye  | İstemci tarafı zamanlama |
| Hata Oranı            | < %2        | Tarayıcı hata takibi     |
| Mobil Uyumluluk       | %100 uyumlu | Çapraz cihaz testleri    |

### İş Metrikleri

| Metrik                   | Hedef               | Ölçüm Yöntemi      |
| ------------------------ | ------------------- | ------------------ |
| Günlük Aktif Kullanıcı   | 50+                 | Analytics          |
| Dönüştürme Başarı Oranı  | > %95               | Başarı/hata takibi |
| Aktarım Format Kullanımı | Tercihleri takip et | Analytics          |
| Mobil Kullanım           | > %30               | Cihaz analytics    |

### MVP Doğrulama Kriterleri

- [ ] En az 100 başarılı tablo dönüştürme
- [ ] Kullanıcıların en az %80'i başarıyla veri aktarımı yapıyor
- [ ] Ortalama işleme süresi 1 saniyenin altında
- [ ] Veri ayrıştırmada %2'den az hata oranı
- [ ] Kullanım kolaylığı konusunda pozitif kullanıcı geri bildirimleri
