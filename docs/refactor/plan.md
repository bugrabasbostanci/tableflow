🎯 Öncelikli Adımlar

1. Tip tanımları ve utility fonksiyonları çıkarılmalı
2. Data processing logic ayrı hook'lara taşınmalı
3. Table editing bileşenlere bölünmeli
4. Loading states ayrı component'lere çıkarılmalı

📁 Önerilen Yapı

components/tablio/
├── data/ # Veri işleme
├── input/ # Veri girişi
├── table/ # Tablo bileşenleri
├── controls/ # Kontrol butonları
├── feedback/ # Loading/skeleton
└── layout/ # Header/Footer

Refactor işlemine başlayalım mı? Hangi aşamadan başlamak istersiniz:

1. Tip tanımları ve utility'ler (En güvenli)
2. Loading component'leri (Görsel iyileştirme)
3. Tablo bileşenleri (En büyük etki)
