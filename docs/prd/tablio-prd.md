## TableFlow - Ürün Gereksinimleri Dokümanı (PRD)

Doküman Sürümü: 1.1

Tarih: 13.08.2025

Proje Adı: TableFlow

**Sürüm 1.1 Değişiklik Notları:**

- **Hedef Kitle:** Genel kullanıcı kitlesi yerine, "Bireysel Borsa Yatırımcıları" olarak özelleştirildi ve yeni bir persona eklendi.
- **Problem Tanımı:** Finans ve borsa sitelerindeki tabloları Excel'e aktarma zorluğu özelinde netleştirildi.
- **Gelecek Vizyonu:** "Google Sheets Entegrasyonu" potansiyel bir geliştirme olarak eklendi.
- **Riskler:** Finansal verilerdeki ondalık ayırıcı (virgül) sorunu potansiyel bir risk olarak eklendi.

### 1. Projeye Genel Bakış

TableFlow, özellikle borsa ve finans verileriyle ilgilenen kullanıcıların, web sitelerinden kopyaladıkları tabloları analiz ve raporlama için doğrudan Excel ve diğer yapısal formatlara dönüştürmelerini sağlayan basit, hızlı ve odaklı bir web aracıdır.

### 2. Problem Tanımı

Bireysel yatırımcılar, piyasa analizi yapmak için sık sık çeşitli finans ve haber sitelerindeki (hisse senedi fiyatları, temel analiz oranları, analist beklentileri vb.) tabloları inceler. Bu tabloları kendi analizlerini yapacakları Excel gibi bir ortama aktarmak istediklerinde, web sitelerinin yapısı nedeniyle genellikle düzgün bir kopyala-yapıştır işlemi yapamazlar. Verileri manuel olarak tek tek girmek ise aşırı zaman alıcı ve hataya açık bir süreçtir. TableFlow, bu süreci saniyelere indirerek yatırımcıların veri toplama yerine analiz yapmaya odaklanmasını sağlar.

### 3. Hedef Kitle (Özelleştirilmiş)

**Birincil Hedef Kitle:** Bireysel borsa yatırımcıları, finans okuryazarlığı yüksek olan ve kendi analizlerini yapmak isteyen kişiler.

**Persona: Yatırımcı Barış**

- **Kim:** 35 yaşında, bir teknoloji şirketinde çalışan ve ek gelir olarak borsada yatırım yapan biri.
- **Hedefleri:** Farklı web sitelerinden beğendiği hisselerin PD/DD, F/K gibi temel rasyolarını ve analist tavsiyelerini tek bir Excel dosyasında toplayarak kendi karşılaştırma tablosunu oluşturmak.
- **Engelleri:** Beğendiği bir tabloyu (görseldeki gibi) kopyalayıp Excel'e yapıştırdığında tüm veriler tek bir sütuna yığılıyor veya format tamamen bozuluyor. Her gün 10-15 hisse için bu verileri elle girmekten yorulmuş durumda.
- **Motivasyonu:** Veri girişine harcadığı zamanı ortadan kaldıracak, sadece kopyalayıp yapıştırarak temiz bir Excel çıktısı alabileceği basit ve reklamsız bir araç bulmak.

### 4. Başarı Metrikleri (MVP için)

- **Haftalık Aktif Kullanıcı Sayısı:** En az 100+ haftalık aktif kullanıcıya ulaşmak.
- **Dönüştürme Oranı:** Siteye gelen her 100 kullanıcıdan en az 30'unun başarılı bir dönüştürme yapması.
- **Birincil Format Tercihi:** Yapılan dönüştürmelerin %80'inin **Excel (.xlsx)** olması.
- **Geri Bildirim:** Finans odaklı forumlar, sosyal medya grupları ve Twitter'da TableFlow hakkında paylaşılan olumlu kullanıcı deneyimleri.

### 5. Gereksinimler ve Özellikler (MVP)

_Bu bölümdeki kullanıcı akışı ve fonksiyonel gereksinimler (FR1-FR5) önceki versiyonda olduğu gibi geçerlidir. Ancak desteklenecek formatlar ve veri işleme mantığı artık daha nettir._

#### 5.1. Desteklenecek Formatlar (Önceliklendirilmiş)

1. **Excel (.xlsx):** **EN ÖNCELİKLİ FORMAT.** Kullanıcının temel ihtiyacını karşılar. Çıktı, görseldeki gibi temiz ve yapılandırılmış olmalıdır.
2. **CSV (.csv):** Veriyi daha basit bir metin formatında isteyen veya farklı analiz programlarına aktaracak kullanıcılar için ikinci öncelikli format.
3. **JSON (.json):** Daha teknik kullanıcılar veya veriyi kendi uygulamalarında kullanmak isteyebilecek küçük bir kitle için.
4. **Markdown:** Düşük öncelikli. Yatırımcı kitlesi için acil bir ihtiyaç olmayabilir, MVP'den çıkarılması düşünülebilir.

#### 5.2. Veri İşleme Detayları

- **Sayısal Veri Tanıma:** Görseldeki "15,77" veya "66,67" gibi virgüllü ondalık sayıların, Excel'de metin olarak değil, **sayısal değer** olarak tanınması kritik öneme sahiptir. Veri işleme motoru, bu virgülleri ondalık ayırıcı olarak doğru bir şekilde yorumlamalıdır.

### 6. MVP Kapsamı Dışındakiler (Gelecek Sürümler İçin)

- **Google Sheets Entegrasyonu:** Kullanıcının dönüştürülen tabloyu tek tıkla kendi Google Sheets hesabında yeni bir sayfaya aktarması. (Bu, gelecek vizyonunuz için harika bir sonraki adım!)
- Tarayıcı Eklentisi (Chrome/Firefox Extension).
- URL'den otomatik veri çekme.
- Kullanıcı hesapları ve dönüştürme geçmişi.
- Dönüştürme öncesi veri düzenleme (filtreleme, sıralama vb.).

### 7. Açık Sorular ve Riskler (Güncellenmiş)

- **Risk 1 (Teknik): Sayısal Veri Formatları.** Finansal tablolarda ondalık ayırıcı olarak virgül ("15,77") kullanılması yaygındır. Excel'in bölgesel ayarlarına göre bu verinin doğru şekilde sayı olarak tanınması kritik bir risktir. Dönüştürme motoru, bu durumu (örn: veriyi Excel'e aktarmadan önce virgülü noktaya çevirerek) tutarlı bir şekilde ele almalıdır. Aksi takdirde, kullanıcılar analiz (toplama, ortalama alma) yapamaz.
- **Risk 2 (Kullanıcı Deneyimi): Kopyalanan Verinin Kalitesi.** Kullanıcılar bazen tablonun sadece bir kısmını, bazen de başlıklar olmadan sadece veri satırlarını kopyalayabilir. Sistemin bu gibi eksik kopyalama durumlarında nasıl tepki vereceği (hata mesajı, eksik önizleme vb.) düşünülmelidir.
