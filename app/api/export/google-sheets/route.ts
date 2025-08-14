import { NextRequest, NextResponse } from 'next/server';
import type { TableData, GoogleSheetsExportOptions, GoogleSheetsExportResult } from '@/types/tablio';

export const runtime = 'edge';

interface SpreadsheetCreateResponse {
  spreadsheetId: string;
  sheets: Array<{
    properties: {
      sheetId: number;
      title: string;
    };
  }>;
}

async function createSpreadsheet(accessToken: string, title: string, sheetName: string = 'Tablio Verisi'): Promise<SpreadsheetCreateResponse> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: title,
      },
      sheets: [{
        properties: {
          title: sheetName,
        },
      }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create spreadsheet: ${error}`);
  }

  return response.json();
}

async function updateSheetData(
  accessToken: string,
  spreadsheetId: string,
  headers: string[],
  rows: string[][],
  sheetName: string = 'Tablio Verisi'
) {
  // Prepare all data including headers
  const allData = [headers, ...rows];
  
  // Convert to the format expected by the API
  const values = allData.map(row => 
    row.map(cell => cell || '') // Ensure no null values
  );

  // Calculate the actual range based on data dimensions
  const maxCol = Math.max(headers.length, ...rows.map(row => row.length));
  const endColumn = String.fromCharCode(65 + Math.min(maxCol - 1, 25)); // A-Z
  const range = `A1:${endColumn}${allData.length}`;

  // Format the range with proper sheet name quoting and encoding
  const fullRange = `'${sheetName}'!${range}`;

  // Use the simpler values API with proper range encoding
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(fullRange)}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update sheet data: ${error}`);
  }

  return response.json();
}

async function makeSpreadsheetPublic(accessToken: string, spreadsheetId: string) {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${spreadsheetId}/permissions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to make spreadsheet public: ${error}`);
  }

  return response.json();
}

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

    // Get access token from cookies
    const accessToken = request.cookies.get('google_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Google OAuth token bulunamadı. Lütfen tekrar giriş yapın.' },
        { status: 401 }
      );
    }

    // Create new Google Spreadsheet
    const title = options?.title || `Tablio Export ${new Date().toLocaleDateString('tr-TR')}`;
    const sheetName = options?.sheetName || 'Tablio Verisi';
    const spreadsheet = await createSpreadsheet(accessToken, title, sheetName);
    
    // Update sheet with data
    await updateSheetData(
      accessToken,
      spreadsheet.spreadsheetId,
      tableData.headers,
      tableData.rows,
      sheetName
    );

    // Set public access if requested
    if (options?.makePublic) {
      try {
        await makeSpreadsheetPublic(accessToken, spreadsheet.spreadsheetId);
      } catch (error) {
        console.warn('Could not set public access:', error);
      }
    }

    const result: GoogleSheetsExportResult = {
      spreadsheetId: spreadsheet.spreadsheetId,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheet.spreadsheetId}/edit`,
      success: true,
      message: 'Google Sheets\'e başarıyla aktarıldı',
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Google Sheets export error:', error);
    
    let errorMessage = 'Google Sheets\'e aktarım sırasında hata oluştu';
    if (error instanceof Error) {
      if (error.message.includes('insufficient authentication scopes') || 
          error.message.includes('Invalid Credentials')) {
        errorMessage = 'Yetki eksikliği. Lütfen tekrar giriş yapın.';
      } else if (error.message.includes('invalid_grant') ||
                 error.message.includes('Token has been expired or revoked')) {
        errorMessage = 'Oturum süresi doldu. Lütfen tekrar giriş yapın.';
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}