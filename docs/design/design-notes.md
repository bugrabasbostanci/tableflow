# TableFlow - Arayüz Tasarım Kılavuzu (v1.0)

Bu doküman, TableFlow uygulamasının v1 sürümü için hedeflenen kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) prensiplerini detaylandırmaktadır. Amaç, modern, minimalist ve kullanıcıyı hedefine en hızlı şekilde ulaştıran bir arayüz oluşturmaktır.

## 1. Genel Stil ve Felsefe

- **Felsefe:** Modern, temiz, dikkat dağıtmayan ve odaklanmış bir kullanıcı deneyimi. Kullanıcı saniyeler içinde kopyaladığı tabloyu yapıştırıp istediği formatta indirmeli.
- **Tema:** Koyu Tema (Dark Mode) ana tema olarak benimsenecektir.

### Renk Paleti (Koyu Tema)

- **Ana Arka Plan:** `#121212` (Göz yormayan, saf siyahtan daha yumuşak bir antrasit.)
- **Yüzey Rengi:** `#1E1E1E` (Kartlar, giriş alanları ve ana bileşenlerin arka planı için.)
- **Vurgu Rengi (Primary Accent):** `#2ECC71` (Canlı, modern bir yeşil. Ana butonlar, linkler ve aktif durum göstergeleri için.)
- **Ana Metin Rengi:** `#EAEAEA` (Yüksek kontrastlı, okunabilir ana metinler.)
- **İkincil Metin Rengi:** `#A0A0A0` (Daha az önemli metinler, ipuçları ve etiketler için.)

### Tipografi

- **Font Ailesi:** `Inter` veya benzeri modern bir `sans-serif` font.
- **Ana Başlık (TableFlow):** `28px`, Kalın (600 veya 700).
- **Alt Başlık / Slogan:** `16px`, Normal (400), İkincil Metin Rengi.

### Boşluk Kullanımı ve Köşe Yuvarlaklığı

- **Boşluklar:** Arayüzde ferahlık hissi yaratmak için elementler arasında geniş boşluklar kullanılmalıdır.
- **Köşe Yuvarlaklığı:** `8px`. Kart ve buton gibi elementlerde hafif yuvarlatılmış köşeler modern bir görünüm sağlar.

## 2. Sayfa Düzeni ve Akış

Uygulama, **tek sayfalı (Single Page Application)** bir yapıya sahip olacaktır. Kullanıcı deneyimi **iki ana duruma** ayrılır:

1.  **Başlangıç Durumu (`initialState`):** Kullanıcı sayfaya ilk girdiğinde veya veriyi temizlediğinde karşılaştığı ekran. Odak noktası, kullanıcıyı veri yapıştırmaya teşvik etmektir.
2.  **Aktif Durum (`activeState`):** Kullanıcı geçerli bir tablo verisi yapıştırdığında arayüz dinamik olarak bu duruma geçer. Odak noktası, veriyi önizlemek ve indirme seçeneklerini sunmaktır.

## 3. Arayüz Bileşenleri (Components)

### 3.1. Header (Üst Başlık)

- Sayfanın üst kısmında, ortalanmış şekilde yer alır.
- **Elementler:**
  - Basit, ikonik TableFlow logosu.
  - "TableFlow" uygulama adı.

### 3.2. Ana Bileşen (İşlem Alanı)

Bu alan, uygulamanın kalbidir ve yukarıda bahsedilen iki duruma göre görünümü değişir.

#### Durum 1: Başlangıç (Veri Yok - `initialState`)

- Ekranın merkezinde kullanıcıyı karşılayan, **büyük ve davetkar bir yapıştırma alanı** bulunur.
- Bu alanın içinde `Kopyaladığınız tabloyu buraya yapıştırın (CTRL+V)` gibi bir yönlendirici metin ve bir "yapıştırma" ikonu yer alabilir.
- Dikkat çekmek için kesik çizgili (dashed) bir çerçeveye sahip olabilir.

#### Durum 2: Aktif (Veri Yapıştırıldı - `activeState`)

- Geçerli bir veri yapıştırıldığında, başlangıçtaki yapıştırma alanı kaybolur.
- Yerine **iki yeni bileşen** gelir:
  1.  **Önizleme Tablosu:** Yapıştırılan veriden oluşturulan, temiz ve okunabilir bir tablo. Eğer tablo uzunsa, dikeyde kaydırılabilir (scrollable) olmalıdır.
  2.  **Eylem Paneli (Action Panel):** İndirme ayarlarının ve butonlarının bulunduğu kontrol paneli.

### 3.3. Eylem Paneli (Action Panel)

Önizleme tablosunun hemen üstünde veya altında yer alır ve sadece **aktif durumda** görünürdür.

| Bileşen            | Açıklama                                                                   | Stil ve Davranış                                                               |
| :----------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **Dosya Adı**      | Kullanıcının indireceği dosyanın adını belirlediği metin giriş alanı.      | Varsayılan olarak `tablio-export` gibi bir isimle gelir.                       |
| **Format Seçimi**  | Çıktı formatının (Excel, CSV vb.) seçildiği açılır menü (dropdown).        | Varsayılan olarak `Excel (XLSX)` seçili gelir.                                 |
| **Temizle Butonu** | Tıklandığında tüm veriyi siler ve arayüzü **başlangıç durumuna** döndürür. | İkincil buton stilinde (sade metin veya ince çerçeveli).                       |
| **İndir Butonu**   | Kullanıcının seçtiği ayarlarla dosyayı indirmesini sağlar.                 | **Ana Eylem Çağrısı (CTA).** Vurgu rengi (`#2ECC71`) ile belirginleştirilmeli. |

### 3.4. Footer (Alt Bilgi)

- Sayfanın en altında, dikkat dağıtmayacak şekilde konumlandırılır.
- **İçerik:**
  - "Nasıl Kullanılır?" ve "Hakkında" gibi bilgilendirici sayfalara linkler.
  - İsteğe bağlı olarak projeye destek için bir not veya link.
