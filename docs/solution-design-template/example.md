## 1. Problem Tanımı ve Değer/Çözüm Önerisi

Temel problemi net şekilde tanımla

### Problem Tanımı

- **Mevcut Durum:** [Şu anda yaşanan problem nedir?]
- **Problem Etkisi:** [Bu problem kimi etkiliyor ve nasıl?]
- **Çözümsüz Kalırsa:** [Problem çözülmezse ne olur?]

### Çözüm Önerisi

- **Çözümün Kısa Tanımı:** [1-2 cümle ile çözümü özetleyin]
- **Değer Önerisi:** [Bu çözüm neden benzersiz/değerli?]
- **Beklenen Faydalar:**
  - [ ] [Fayda 1]
  - [ ] [Fayda 2]
  - [ ] [Fayda 3]

## 2. Ürün Kapsamı

### Must-Have (Olmazsa Olmaz)

| Özellik     | Açıklama        | Öncelik |
| ----------- | --------------- | ------- |
| [Özellik 1] | [Neden kritik?] | P0      |
| [Özellik 2] | [Neden kritik?] | P0      |
| [Özellik 3] | [Neden kritik?] | P0      |

### Nice-to-Have (Olsa İyi Olur)

| Özellik     | Açıklama        | Öncelik |
| ----------- | --------------- | ------- |
| [Özellik 1] | [Kısa açıklama] | P1      |
| [Özellik 2] | [Kısa açıklama] | P1      |

### Out of Scope (Kapsam Dışı)

- [Bu versiyonda OLMAYACAK özellik 1]
- [Bu versiyonda OLMAYACAK özellik 2]

## 3. Kullanıcı Akışı

`"bir [kullanıcı tipi] olarak [ne istiyorum], böylece [neden/fayda]"`

### Birincil Kullanıcılar

- **Kullanıcı Tipi:** [Kim?]
- **Demografik:** [Yaş, lokasyon, özellikler]
- **Teknik Yetkinlik:** [Düşük/Orta/Yüksek]
- **Kullanım Sıklığı:** [Günlük/Haftalık/Aylık]
- **Temel İhtiyaçları:** [Ne istiyor?]

### İkincil Kullanıcılar

- **Kullanıcı Tipi:** [Varsa]
- **Özellikleri:** [Kısa açıklama]

### Kullanıcı Personaları

**Persona 1:** [İsim]

- Yaş: [X]
- Meslek: [Y]
- Problem: [Z]
- Motivasyon: [T]

### User Flows

#### Akış 1: [Akış Adı]

```
1. Kullanıcı [başlangıç noktası]
2. Sistem [tepki/aksiyon]
3. Kullanıcı [sonraki adım]
4. Sistem [sonuç]
```

#### Akış 2: [Akış Adı]

```
1. [Adım 1]
2. [Adım 2]
3. [Adım 3]
```

## 4. Teknik Tasarım (Basitleştirilmiş)

### Tech Stack

| Katman       | Teknoloji             | Neden Seçildi? |
| ------------ | --------------------- | -------------- |
| **Frontend** | [React/Vue/Angular]   | [Gerekçe]      |
| **Backend**  | [Node.js/Python/Java] | [Gerekçe]      |
| **Database** | [PostgreSQL/MongoDB]  | [Gerekçe]      |
| **Cache**    | [Redis/Memcached]     | [Gerekçe]      |
| **Queue**    | [RabbitMQ/Kafka]      | [Gerekçe]      |

### 3rd Party Servisler

| Servis          | Kullanım Amacı | Maliyet       |
| --------------- | -------------- | ------------- |
| [AWS/Azure/GCP] | Hosting        | [$X/ay]       |
| [Stripe/PayPal] | Ödeme          | [%X komisyon] |
| [SendGrid]      | Email          | [$X/ay]       |
| [Auth0]         | Authentication | [$X/ay]       |

### Sistem Mimarisi

```
[Frontend] → [API Gateway] → [Backend Services]
                                    ↓
                            [Database] [Cache]
```

## 5. Veri modeli (table/schema)

### Veritabanı Şeması

#### Tablo: `users`

| Alan          | Tip          | Açıklama         |
| ------------- | ------------ | ---------------- |
| id            | UUID         | Primary Key      |
| email         | VARCHAR(255) | Unique, Not Null |
| password_hash | VARCHAR(255) | Not Null         |
| created_at    | TIMESTAMP    | Default: NOW()   |
| updated_at    | TIMESTAMP    |                  |

#### Tablo: `products`

| Alan    | Tip           | Açıklama            |
| ------- | ------------- | ------------------- |
| id      | UUID          | Primary Key         |
| name    | VARCHAR(255)  | Not Null            |
| price   | DECIMAL(10,2) | Not Null            |
| user_id | UUID          | Foreign Key → users |

### İlişkiler

```
users (1) ← → (N) products
users (1) ← → (N) orders
orders (N) ← → (N) products (through order_items)
```

## 6. API Tasarımı

### REST API Endpoints

| Endpoint             | Method | Açıklama             | Auth | Request Body        | Response        |
| -------------------- | ------ | -------------------- | ---- | ------------------- | --------------- |
| `/api/auth/register` | POST   | Yeni kullanıcı kaydı | ❌   | `{email, password}` | `{token, user}` |
| `/api/auth/login`    | POST   | Kullanıcı girişi     | ❌   | `{email, password}` | `{token, user}` |
| `/api/users/profile` | GET    | Profil bilgileri     | ✅   | -                   | `{user}`        |
| `/api/products`      | GET    | Ürün listesi         | ❌   | -                   | `{products[]}`  |
| `/api/products/:id`  | GET    | Ürün detayı          | ❌   | -                   | `{product}`     |
| `/api/products`      | POST   | Ürün ekle            | ✅   | `{name, price}`     | `{product}`     |
| `/api/orders`        | POST   | Sipariş oluştur      | ✅   | `{items[]}`         | `{order}`       |

### Response Formatı

```json
{
  "success": true,
  "data": {},
  "message": "İşlem başarılı",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERR_001",
    "message": "Hata açıklaması",
    "details": []
  }
}
```

## 7. Başarı Metrikleri

### Teknik Metrikler

| Metrik            | Hedef      | Ölçüm Yöntemi    |
| ----------------- | ---------- | ---------------- |
| Page Load Time    | < 3 saniye | Google PageSpeed |
| API Response Time | < 200ms    | APM Tool         |
| Uptime            | > 99%      | Monitoring Tool  |
| Error Rate        | < 1%       | Logging System   |

### İş Metrikleri

| Metrik                  | Hedef | Ölçüm Yöntemi |
| ----------------------- | ----- | ------------- |
| Günlük Aktif Kullanıcı  | 100+  | Analytics     |
| Kullanıcı Tutma (7 gün) | > 40% | Analytics     |
| Conversion Rate         | > 5%  | Analytics     |
| User Satisfaction       | > 4/5 | Survey        |

### MVP Doğrulama Kriterleri

- [ ] En az [X] kullanıcı sisteme kayıt oldu
- [ ] En az [Y]% kullanıcı [core action] gerçekleştirdi
- [ ] Kullanıcı geri bildirimleri [Z] puanın üzerinde
- [ ] Teknik hatalar [T]% altında
