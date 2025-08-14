import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import type { TableData, GoogleSheetsExportOptions, GoogleSheetsExportResult } from '@/types/tablio';

const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableData, options }: { tableData: TableData; options?: GoogleSheetsExportOptions } = body;

    if (!tableData || !tableData.headers || !tableData.rows) {
      return NextResponse.json(
        { error: 'Geçersiz tablo verisi' },
        { status: 400 }
      );
    }

    // Get tokens from cookies
    const accessToken = request.cookies.get('google_access_token')?.value;
    const refreshToken = request.cookies.get('google_refresh_token')?.value;
    const expiryDate = request.cookies.get('google_expiry_date')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Google OAuth token bulunamadı. Lütfen tekrar giriş yapın.' },
        { status: 401 }
      );
    }

    // Setup OAuth2 client with tokens
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
      expiry_date: expiryDate ? parseInt(expiryDate) : undefined,
    });

    // Listen for token refresh
    oauth2Client.on('tokens', (tokens) => {
      // In a real app, you might want to update cookies here
      console.log('Tokens refreshed:', tokens);
    });

    // Create new Google Spreadsheet
    const title = options?.title || `Tablio Export ${new Date().toLocaleDateString('tr-TR')}`;
    const doc = await GoogleSpreadsheet.createNewSpreadsheetDocument(oauth2Client, { title });
    
    // Get the first sheet
    const sheet = doc.sheetsByIndex[0];
    
    // Set sheet title
    const sheetName = options?.sheetName || 'Tablio Verisi';
    await sheet.updateProperties({ title: sheetName });

    // Set header row
    await sheet.setHeaderRow(tableData.headers);

    // Add data rows
    if (tableData.rows.length > 0) {
      const rowData = tableData.rows.map(row => {
        const rowObject: { [key: string]: string } = {};
        tableData.headers.forEach((header, index) => {
          rowObject[header] = row[index] || '';
        });
        return rowObject;
      });

      // Add rows in batches to handle large datasets
      const batchSize = 100;
      for (let i = 0; i < rowData.length; i += batchSize) {
        const batch = rowData.slice(i, i + batchSize);
        await sheet.addRows(batch);
      }
    }

    // Set public access if requested
    if (options?.makePublic) {
      try {
        await doc.setPublicAccessLevel('reader');
      } catch (error) {
        console.warn('Could not set public access:', error);
      }
    }

    const result: GoogleSheetsExportResult = {
      spreadsheetId: doc.spreadsheetId,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${doc.spreadsheetId}/edit`,
      success: true,
      message: 'Google Sheets\'e başarıyla aktarıldı',
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Google Sheets export error:', error);
    
    let errorMessage = 'Google Sheets\'e aktarım sırasında hata oluştu';
    if (error instanceof Error) {
      if (error.message.includes('insufficient authentication scopes')) {
        errorMessage = 'Yetki eksikliği. Lütfen tekrar giriş yapın.';
      } else if (error.message.includes('invalid_grant')) {
        errorMessage = 'Oturum süresi doldu. Lütfen tekrar giriş yapın.';
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}