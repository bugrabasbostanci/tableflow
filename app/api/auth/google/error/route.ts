import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Google Sheets - Authorization Error</title>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
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
          .error-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #f44336;
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
          <div class="error-icon">✗</div>
          <h1>Authorization Error</h1>
          <p>There was a problem connecting to your Google account. This window will close...</p>
        </div>
        <script>
          // Signal error to parent window
          if (window.opener) {
            window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR' }, '*');
          }
          
          // Close popup after a brief delay
          setTimeout(() => {
            window.close();
          }, 2000);
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