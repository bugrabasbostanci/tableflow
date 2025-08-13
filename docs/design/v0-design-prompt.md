```JSON
{
  "projectName": "Tablio",
  "fileVersion": "1.0",
  "designTool": "v0_design_prompt",
  "promptDetails": {
    "overallStyle": {
      "theme": "Modern ve Minimalist",
      "colorPalette": {
        "primary": "Koyu tema (Dark Mode)",
        "background": "#121212 (Saf siyah yerine koyu antrasit)",
        "surface": "#1E1E1E (Kartlar ve ana bileşenlerin arka planı)",
        "primaryAccent": "#2ECC71 (Canlı, modern bir yeşil - Butonlar, linkler ve aktif durumlar için)",
        "textPrimary": "#EAEAEA (Ana metinler)",
        "textSecondary": "#A0A0A0 (Yardımcı metinler, ipuçları)"
      },
      "typography": {
        "fontFamily": "Inter, sans-serif",
        "headerSize": "28px, font-weight: 600",
        "subHeaderSize": "16px, font-weight: 400, color: textSecondary"
      },
      "spacing": "Geniş ve ferah boşluklar kullanılmalı, elementler arası mesafe net olmalı.",
      "cornerRadius": "8px (Hafif yuvarlatılmış köşeler)"
    },
    "layout": {
      "structure": "Tek sayfalı uygulama (Single Page Application). Tüm etkileşim ana ekranda gerçekleşir.",
      "flow": "İki aşamalı bir akış hedeflenmeli: 1. Yapıştırma (Giriş) -> 2. Önizleme ve İndirme (Çıktı). Kullanıcı arayüzü bu iki duruma göre dinamik olarak değişmeli."
    },
    "header": {
      "elements": [
        { "type": "logo", "asset": "Tablio'nun sadeleştirilmiş yeşil logosu" },
        { "type": "appName", "text": "Tablio", "style": "font-size: 24px, font-weight: 700" }
      ],
      "alignment": "Merkezi"
    },
    "mainComponent": {
      "description": "Uygulamanın kalbi. İki durumu vardır: 'initialState' (veri yapıştırılmadan önce) ve 'activeState' (veri yapıştırıldıktan sonra).",
      "initialState": {
        "elements": [
          {
            "type": "pasteArea",
            "description": "Ekranın merkezinde, kullanıcıyı davet eden büyük bir yapıştırma alanı. İçinde 'Kopyaladığınız tabloyu buraya yapıştırın (CTRL+V)' gibi bir metin ve bir 'paste' ikonu olmalı. Kesik çizgili (dashed) bir kenarlığı olabilir."
          }
        ]
      },
      "activeState": {
        "description": "Kullanıcı geçerli bir tablo yapıştırdığında, 'pasteArea' kaybolur ve yerine 'previewTable' ile 'actionPanel' gelir.",
        "elements": [
          {
            "type": "previewTable",
            "description": "Yapıştırılan verinin anında oluşturulmuş, temiz ve okunabilir bir önizleme tablosu. Tablo, 'surface' rengi üzerinde gösterilmeli ve scroll edilebilir olmalı."
          }
        ]
      }
    },
    "actionPanel": {
      "description": "Önizleme tablosunun hemen üzerinde veya altında yer alan, indirme işlemlerinin yapıldığı kontrol paneli. Bu panel, sadece 'activeState' durumunda görünür ve aktif olmalıdır.",
      "elements": [
        {
          "type": "textInput",
          "label": "Dosya Adı",
          "defaultValue": "tablio-export"
        },
        {
          "type": "dropdown",
          "label": "Format",
          "options": ["Excel (XLSX)", "CSV", "JSON"],
          "defaultValue": "Excel (XLSX)"
        },
        {
          "type": "button",
          "label": "Temizle",
          "style": "secondary (Sadece metin veya ince kenarlıklı)",
          "action": "Arayüzü 'initialState' durumuna döndürür."
        },
        {
          "type": "button",
          "label": "İndir",
          "style": "primary (Vurgulu, 'primaryAccent' renginde, yanında bir indirme ikonu olabilir)",
          "description": "Ana Eylem Çağrısı (Call to Action - CTA). Diğer butonlardan daha belirgin olmalı."
        }
      ],
      "layout": "Tüm elementler yatayda tek bir sırada, mantıksal bir gruplama ile dizilmeli."
    },
    "footer": {
      "elements": [
        { "type": "link", "text": "Nasıl Kullanılır?", "url": "/nasil-kullanilir" },
        { "type": "link", "text": "Hakkında", "url": "/hakkinda" },
        { "type": "text", "content": "Bir fincan kahve ısmarlayarak destek ol ☕" }
      ],
      "style": "Minimalist ve sayfanın en altında, dikkat dağıtmayan bir tasarım."
    }
  }
}
```
