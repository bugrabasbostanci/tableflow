/**
 * Google Sheets integration utilities for Tablio
 */

import type { 
  TableData, 
  GoogleSheetsExportOptions, 
  GoogleSheetsExportResult,
  GoogleOAuthState 
} from '@/types/tablio';

/**
 * Check if user is authenticated with Google
 */
export function checkGoogleAuthStatus(): GoogleOAuthState {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false };
  }

  // In a real application, you might check for valid tokens
  // For now, we'll rely on the backend to validate tokens
  return { isAuthenticated: true };
}

/**
 * Initiate Google OAuth flow
 */
export async function initiateGoogleAuth(): Promise<{ authUrl: string }> {
  const response = await fetch('/api/auth/google');
  
  if (!response.ok) {
    throw new Error('OAuth başlatma hatası');
  }
  
  return response.json();
}

/**
 * Export table data to Google Sheets
 */
export async function exportToGoogleSheets(
  tableData: TableData,
  options?: GoogleSheetsExportOptions
): Promise<GoogleSheetsExportResult> {
  const response = await fetch('/api/export/google-sheets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tableData,
      options: {
        title: options?.title || `Tablio Export ${new Date().toLocaleDateString('tr-TR')}`,
        sheetName: options?.sheetName || 'Tablio Verisi',
        makePublic: options?.makePublic || false,
        ...options,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Google Sheets export hatası');
  }

  return result;
}

/**
 * Open Google OAuth popup window
 */
export function openGoogleAuthPopup(authUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const popup = window.open(
      authUrl,
      'google-oauth',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    if (!popup) {
      resolve(false);
      return;
    }

    // Listen for messages from popup
    const messageListener = (event: MessageEvent) => {
      // Only accept messages from our domain
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        cleanup();
        resolve(true);
      } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
        cleanup();
        resolve(false);
      }
    };

    // Cleanup function
    const cleanup = () => {
      window.removeEventListener('message', messageListener);
      if (checkClosed) {
        clearInterval(checkClosed);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      if (!popup.closed) {
        popup.close();
      }
    };

    // Add message listener
    window.addEventListener('message', messageListener);

    // Fallback: Check if popup is manually closed
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        cleanup();
        resolve(false);
      }
    }, 1000);

    // Timeout after 10 minutes
    const timeout = setTimeout(() => {
      cleanup();
      resolve(false);
    }, 600000);
  });
}

/**
 * Handle the complete Google Sheets export flow
 */
export async function handleGoogleSheetsExportFlow(
  tableData: TableData,
  options?: GoogleSheetsExportOptions
): Promise<GoogleSheetsExportResult> {
  try {
    // First try to export directly (user might already be authenticated)
    return await exportToGoogleSheets(tableData, options);
  } catch (error) {
    // If authentication fails, initiate OAuth flow
    if (error instanceof Error && error.message.includes('token')) {
      const { authUrl } = await initiateGoogleAuth();
      const authSuccess = await openGoogleAuthPopup(authUrl);
      
      if (!authSuccess) {
        throw new Error('Google OAuth yetkilendirmesi başarısız');
      }

      // Retry export after authentication
      return await exportToGoogleSheets(tableData, options);
    }
    
    throw error;
  }
}

/**
 * Validate table data before export
 */
export function validateTableDataForExport(tableData: TableData): boolean {
  if (!tableData) return false;
  if (!tableData.headers || tableData.headers.length === 0) return false;
  if (!Array.isArray(tableData.rows)) return false;
  
  // Check if all rows have consistent column count
  const expectedColumnCount = tableData.headers.length;
  return tableData.rows.every(row => 
    Array.isArray(row) && row.length <= expectedColumnCount
  );
}

/**
 * Sanitize sheet title to comply with Google Sheets requirements
 */
export function sanitizeSheetTitle(title: string): string {
  // Google Sheets title restrictions:
  // - Max 100 characters
  // - No special characters like [ ] / \ ? * : 
  return title
    .replace(/[\[\]\/\\?\*:]/g, '')
    .trim()
    .substring(0, 100);
}

/**
 * Generate default sheet title with current date
 */
export function generateDefaultSheetTitle(prefix = 'Tablio Export'): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return sanitizeSheetTitle(`${prefix} ${dateStr}`);
}