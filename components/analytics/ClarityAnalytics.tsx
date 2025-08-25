'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    clarity?: {
      init: (projectId: string) => void;
      identify: (userId: string, sessionId?: string, pageId?: string, friendlyName?: string) => void;
      event: (eventName: string) => void;
      setTag: (key: string, value: string) => void;
      consent: (hasConsented?: boolean) => void;
    };
  }
}

export function ClarityAnalytics() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    
    if (!projectId) {
      console.warn('Clarity project ID not found');
      return;
    }

    // Dynamic import to ensure client-side only
    import('@microsoft/clarity').then((clarity) => {
      clarity.default.init(projectId);
    }).catch((error) => {
      console.error('Failed to initialize Clarity:', error);
    });
  }, []);

  return null;
}