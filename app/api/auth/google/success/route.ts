import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Google Sheets - Yetkilendirme Başarılı</title>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .checkmark {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #4CAF50;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
          }
          h1 {
            margin: 0 0 1rem;
            font-size: 1.5rem;
            font-weight: 600;
          }
          p {
            margin: 0;
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="checkmark">✓</div>
          <h1>Yetkilendirme Başarılı!</h1>
          <p>Google hesabınız başarıyla bağlandı. Bu pencere kapanacak...</p>
        </div>
        <script>
          // Signal success to parent window
          if (window.opener) {
            window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
          }
          
          // Close popup after a brief delay
          setTimeout(() => {
            window.close();
          }, 1500);
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}