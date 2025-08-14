import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
});

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

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    
    if (!tokens.access_token) {
      return NextResponse.redirect(new URL('/api/auth/google/error', request.url));
    }

    // Instead of redirecting to main page, redirect to a success page that will close the popup
    const redirectUrl = new URL('/api/auth/google/success', request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Set tokens in cookies
    response.cookies.set('google_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokens.expiry_date ? Math.floor((tokens.expiry_date - Date.now()) / 1000) : 3600, // 1 hour default
    });

    if (tokens.refresh_token) {
      response.cookies.set('google_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    if (tokens.expiry_date) {
      response.cookies.set('google_expiry_date', tokens.expiry_date.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    // Clear the state cookie
    response.cookies.delete('oauth_state');

    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL('/api/auth/google/error', request.url));
  }
}