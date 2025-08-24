# OAuth Consent Screen Configuration Guide

This guide provides step-by-step instructions for configuring the Google OAuth consent screen for Tablio production deployment.

## Prerequisites

Before configuring the OAuth consent screen, ensure you have:
- [ ] Privacy Policy page live at: `https://tablio-deu.pages.dev/privacy-policy`
- [ ] Terms of Service page live at: `https://tablio-deu.pages.dev/terms-of-service`
- [ ] Valid support email address set up
- [ ] Google Cloud Console project with APIs enabled

## Required APIs

Ensure the following APIs are enabled in your Google Cloud Console:
- [ ] Google Sheets API
- [ ] Google Drive API
- [ ] Google Identity API

## OAuth Consent Screen Configuration

### 1. Access OAuth Consent Screen
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **OAuth consent screen**

### 2. Choose User Type
- Select **External** (for public app available to all users)
- Click **CREATE**

### 3. App Information (Required Fields)

Fill in the following mandatory fields:

#### Basic Information
- **App name**: `Tablio`
- **User support email**: `support@tablio.app` (or your chosen support email)
- **App logo**: Upload Tablio logo (optional but recommended)

#### App Domain Information
- **Application homepage**: `https://tablio-deu.pages.dev`
- **Privacy Policy link**: `https://tablio-deu.pages.dev/privacy-policy`
- **Terms of Service link**: `https://tablio-deu.pages.dev/terms-of-service`

#### Developer Contact Information
- **Developer contact information**: `support@tablio.app`

#### App Description
```
Tablio is a web-based table conversion tool that helps users convert table data from various formats (copied data, CSV files) into Excel, CSV, JSON, XML, and other structured formats. Users can also export data directly to Google Sheets with secure OAuth authentication.
```

### 4. Scopes Configuration

Add the following OAuth scopes that Tablio currently uses:

#### Required Scopes:
- `openid` - For user identification
- `https://www.googleapis.com/auth/userinfo.email` - For user email access
- `https://www.googleapis.com/auth/userinfo.profile` - For user profile information
- `https://www.googleapis.com/auth/drive.file` - For creating files in Google Drive
- `https://www.googleapis.com/auth/spreadsheets` - For creating and editing Google Sheets

#### Scope Justifications:
Provide clear justifications for sensitive scopes:

**Google Drive API (`drive.file`)**:
- Purpose: Create and save exported table files to user's Google Drive
- Data usage: Only creates new files based on user's converted table data
- User benefit: Allows seamless export of converted data to user's personal storage

**Google Sheets API (`spreadsheets`)**:
- Purpose: Create new Google Sheets with user's converted table data
- Data usage: Creates new spreadsheets with user's processed table content
- User benefit: Direct export to Google Sheets for immediate data analysis

### 5. Test Users (During Development)
While in testing mode, add test user emails:
- Add your development team email addresses
- Include any beta testers' email addresses

### 6. OAuth Client Configuration

#### Authorized Redirect URIs
Add the following redirect URIs:
- Development: `http://localhost:3000/api/auth/google/callback`
- Production: `https://tablio-deu.pages.dev/api/auth/google/callback`

#### Authorized JavaScript Origins
- Development: `http://localhost:3000`
- Production: `https://tablio-deu.pages.dev`

## Publishing Process

### Phase 1: Testing Mode (Current)
- App is in testing mode
- Only test users can access
- Refresh tokens expire in 7 days
- "This app isn't verified" warning shown

### Phase 2: Publishing to Production

⚠️ **WARNING: This is a one-way process and cannot be reversed!**

1. **Prepare for Publishing**
   - Ensure all required fields are filled
   - Verify all links are working
   - Test with multiple users in testing mode

2. **Publish App**
   - In OAuth consent screen, click **"PUBLISH APP"**
   - Status changes from "Testing" to "In production"
   - Click **"Prepare for Verification"** if prompted

3. **Submit for Verification**
   - Complete the verification questionnaire
   - Provide detailed scope justifications
   - Submit security assessment if required

### Verification Requirements

#### For Sensitive/Restricted Scopes
Google may require additional verification for `drive.file` and `spreadsheets` scopes:

- **Security Assessment**: May require third-party security audit
- **Penetration Testing**: Security vulnerability assessment
- **Privacy Policy Review**: Detailed review of data handling practices
- **Domain Verification**: Proof of domain ownership

#### Timeline
- **Review Process**: 1-8 weeks
- **Response Time**: Google will email updates on verification status
- **Resubmission**: May be required if additional information is needed

## Post-Publishing Considerations

### User Experience Changes
- ✅ No more "This app isn't verified" warning
- ✅ Refresh tokens won't expire automatically
- ✅ App available to all Google users
- ✅ Professional appearance in OAuth consent

### Monitoring and Maintenance
- Monitor OAuth consent screen for any Google policy changes
- Update legal pages as needed
- Maintain valid support email
- Keep API usage within quotas and limits

## Troubleshooting Common Issues

### Verification Rejected
If verification is rejected:
1. Review Google's feedback carefully
2. Update documentation and security measures
3. Revise privacy policy if needed
4. Resubmit with requested improvements

### Domain Verification Issues
- Ensure domain is properly verified in Google Search Console
- Check DNS records and SSL certificate
- Verify all redirect URIs match exactly

### Scope Permission Issues
- Ensure scope justifications are clear and specific
- Document exactly how each permission is used
- Provide screenshots or examples if helpful

## Checklist for Production Readiness

- [ ] Privacy Policy page deployed and accessible
- [ ] Terms of Service page deployed and accessible
- [ ] OAuth consent screen fully configured
- [ ] All required APIs enabled
- [ ] Test users thoroughly tested the integration
- [ ] Domain verification completed
- [ ] Support email set up and monitored
- [ ] Security measures documented
- [ ] Backup authentication method considered

## Support and Resources

- [Google Cloud Console](https://console.developers.google.com/)
- [Google API Console](https://console.developers.google.com/apis)
- [OAuth 2.0 Verification Requirements](https://developers.google.com/identity/protocols/oauth2)
- [Google API Policy Compliance](https://developers.google.com/terms/api-services-user-data-policy)

For questions or issues with this configuration, contact the development team or create an issue in the project repository.