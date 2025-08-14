import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for OAuth error
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(new URL('/api/auth/google/error', request.url));
    }

    // Validate state parameter
    const storedState = request.cookies.get('oauth_state')?.value;
    if (!state || state !== storedState) {
      console.error('State mismatch');
      return NextResponse.redirect(new URL('/api/auth/google/error', request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/api/auth/google/error', request.url));
    }

    // Exchange code for tokens using fetch API
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', await tokenResponse.text());
      return NextResponse.redirect(new URL('/api/auth/google/error', request.url));
    }

    const tokens: TokenResponse = await tokenResponse.json();
    
    if (!tokens.access_token) {
      return NextResponse.redirect(new URL('/api/auth/google/error', request.url));
    }

    // Instead of redirecting to main page, redirect to a success page that will close the popup
    const redirectUrl = new URL('/api/auth/google/success', request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Calculate expiry date from expires_in seconds
    const expiryDate = Date.now() + (tokens.expires_in * 1000);

    // Set tokens in cookies
    response.cookies.set('google_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokens.expires_in || 3600, // Use expires_in or 1 hour default
    });

    if (tokens.refresh_token) {
      response.cookies.set('google_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    response.cookies.set('google_expiry_date', expiryDate.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Clear the state cookie
    response.cookies.delete('oauth_state');

    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL('/api/auth/google/error', request.url));
  }
}