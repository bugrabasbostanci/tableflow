# Domain Verification Guide for Google OAuth

This guide explains how to verify your domain for Google OAuth production deployment of TableFlow.

## Overview

Domain verification is required to prove ownership of `tablio-deu.pages.dev` domain for Google OAuth app verification. This process ensures that you control the domain you're requesting to use in your OAuth configuration.

## Prerequisites

- [ ] Access to Cloudflare Pages dashboard (for `tablio-deu.pages.dev`)
- [ ] Google Search Console account
- [ ] Administrator access to the domain settings

## Domain Verification Methods

### Method 1: Google Search Console (Recommended)

#### Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account (same account used for OAuth setup)

#### Step 2: Add Property

1. Click **"+ Add property"**
2. Select **"URL prefix"** option
3. Enter: `https://tablio-deu.pages.dev`
4. Click **"CONTINUE"**

#### Step 3: Choose Verification Method

Google will provide several verification methods:

**Option A: HTML File Upload (Recommended for Cloudflare Pages)**

1. Download the HTML verification file provided by Google
2. Upload it to the root of your Cloudflare Pages site
3. Ensure the file is accessible at: `https://tablio-deu.pages.dev/google[...].html`
4. Click **"VERIFY"** in Google Search Console

**Option B: HTML Meta Tag**

1. Copy the meta tag provided by Google
2. Add it to the `<head>` section of your site's homepage
3. Deploy the change to production
4. Click **"VERIFY"** in Google Search Console

**Option C: DNS Record (If you control DNS)**

1. Add the TXT record provided by Google to your DNS settings
2. Wait for DNS propagation (can take up to 24 hours)
3. Click **"VERIFY"** in Google Search Console

### Method 2: Direct Domain Verification in Google Cloud Console

#### Step 1: Access Domain Verification

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Navigate to **IAM & Admin** → **Settings**
3. Go to **Domain verification** tab
4. Click **"Add domain"**

#### Step 2: Add Domain

1. Enter: `tablio-deu.pages.dev`
2. Follow the verification steps provided (similar to Search Console)

## Implementation for Cloudflare Pages

### HTML File Upload Method (Recommended)

#### For Current Deployment Structure:

1. **Download Verification File**

   - Get the HTML file from Google Search Console
   - File will be named something like `google1234567890abcdef.html`

2. **Add to Next.js Public Directory**

   ```bash
   # Create public directory if it doesn't exist
   mkdir -p public

   # Move the Google verification file to public directory
   cp google1234567890abcdef.html public/
   ```

3. **Verify File Accessibility**

   - Build and deploy to Cloudflare Pages
   - Test access: `https://tablio-deu.pages.dev/google1234567890abcdef.html`
   - File should display Google's verification content

4. **Complete Verification**
   - Return to Google Search Console
   - Click **"VERIFY"**

### HTML Meta Tag Method (Alternative)

If HTML file method doesn't work, add meta tag to `app/layout.tsx`:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add Google verification meta tag here */}
        <meta
          name="google-site-verification"
          content="YOUR_VERIFICATION_CODE"
        />
      </head>
      <body className={`${geistSans.className} antialiased dark`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

## Cloudflare Pages Specific Considerations

### DNS and SSL

- **HTTPS Required**: Google OAuth requires HTTPS (Cloudflare Pages provides this automatically)
- **SSL Certificate**: Ensure SSL certificate is active and valid
- **Domain Status**: Verify domain is properly connected to Cloudflare Pages

### Deployment Process

1. Make changes to verification files or meta tags
2. Commit and push to your repository
3. Cloudflare Pages will automatically rebuild and deploy
4. Wait for deployment to complete (usually 1-2 minutes)
5. Test verification file accessibility
6. Complete verification in Google Search Console

## Verification Status and Troubleshooting

### Successful Verification

✅ Google Search Console shows "Ownership verified"  
✅ Green checkmark appears next to your property  
✅ You can access property data and settings

### Common Issues and Solutions

#### Issue: "Verification failed - file not found"

**Solutions:**

- Check file is in correct location (`public/` directory for Next.js)
- Ensure deployment completed successfully
- Test file access directly in browser
- Check for typos in filename

#### Issue: "Verification failed - meta tag not found"

**Solutions:**

- Verify meta tag is in `<head>` section
- Check for syntax errors in the meta tag
- Clear browser cache and test
- Ensure deployment included the meta tag changes

#### Issue: "DNS verification failed"

**Solutions:**

- Wait 24-48 hours for DNS propagation
- Use DNS checker tools to verify TXT record
- Contact Cloudflare support if DNS issues persist

#### Issue: "Access denied" or permission errors

**Solutions:**

- Ensure you're using the same Google account for both services
- Check Google account has necessary permissions
- Try incognito/private browsing mode

## Post-Verification Steps

### 1. Confirm Verification Status

- [ ] Google Search Console shows verified status
- [ ] Can access all Search Console features for the domain
- [ ] No verification warnings or errors

### 2. Update OAuth Configuration

- [ ] Confirm domain verification in Google Cloud Console
- [ ] Update OAuth consent screen if needed
- [ ] Test OAuth flow with verified domain

### 3. Monitor Domain Status

- Set up monitoring for:
  - SSL certificate expiration
  - Domain verification status
  - OAuth consent screen warnings

## Security Considerations

### File Security

- Verification files contain no sensitive information
- Safe to keep verification files permanently
- Consider adding verification files to `.gitignore` if preferred

### Access Control

- Only administrators should have verification access
- Use separate Google accounts for different environments if needed
- Monitor domain verification status regularly

## Maintenance and Renewal

### Regular Checks

- **Monthly**: Verify domain verification status
- **Before OAuth changes**: Confirm verification is still active
- **SSL renewal**: Monitor SSL certificate status (automatic with Cloudflare)

### Documentation Updates

- Keep record of verification methods used
- Document any special configurations
- Update team on verification status changes

## Support Resources

- [Google Search Console Help](https://support.google.com/webmasters/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Google Domain Verification](https://developers.google.com/site-verification/)
- [OAuth 2.0 Domain Verification](https://developers.google.com/identity/protocols/oauth2)

## Checklist for Completion

- [ ] Domain added to Google Search Console
- [ ] Verification method chosen and implemented
- [ ] Verification file deployed to production (if using file method)
- [ ] Meta tag added to layout (if using meta tag method)
- [ ] DNS record added (if using DNS method)
- [ ] Verification completed successfully
- [ ] Green verified status showing in Search Console
- [ ] OAuth consent screen updated with verified domain
- [ ] Testing completed with verified domain

For technical issues or questions, consult the development team or create an issue in the project repository.
