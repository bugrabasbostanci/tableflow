# Security Measures Documentation for Google OAuth Verification

This document outlines the security measures implemented in TableFlow for Google OAuth verification submission.

## Overview

TableFlow implements multiple layers of security to protect user data and ensure secure integration with Google services. This documentation is prepared to support the Google OAuth app verification process.

## Application Architecture Security

### 1. Client-Side Security

#### Local Data Processing

- **Principle**: All table data processing occurs locally in the user's browser
- **Implementation**: Data parsing, validation, and formatting happens client-side using JavaScript
- **Benefit**: User data never leaves their device for basic conversion operations
- **Code Location**: `utils/data-parsers.ts`, `utils/export-formatters.ts`

#### Secure Data Handling

```typescript
// Example: Data is processed locally before any external API calls
const processTableData = (rawData: string): TableData => {
  // Local validation and parsing
  // No data transmission during processing
  return validatedData;
};
```

### 2. Authentication and Authorization

#### OAuth 2.0 Implementation

- **Standard**: Google OAuth 2.0 with PKCE (Proof Key for Code Exchange)
- **Flow**: Authorization Code flow with state parameter
- **Token Storage**: Secure token handling with automatic refresh
- **Implementation**: NextAuth.js for secure authentication management

#### Scope Minimization

```typescript
// Only request necessary scopes
const requiredScopes = [
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/drive.file", // Only for file creation
  "https://www.googleapis.com/auth/spreadsheets", // Only for sheet creation
];
```

#### Access Control

- **Principle**: Users authenticate directly with Google
- **Token Management**: Secure token storage and automatic refresh
- **Session Management**: Proper session handling with expiration
- **Revocation**: Users can revoke access at any time through Google Account settings

### 3. Data Transmission Security

#### HTTPS Enforcement

- **Requirement**: All communications over HTTPS/TLS 1.3
- **Implementation**: Cloudflare Pages provides automatic SSL/TLS
- **Certificate**: Valid SSL certificate with automatic renewal
- **HSTS**: HTTP Strict Transport Security headers enforced

#### API Communication

```typescript
// Secure API calls with proper error handling
const apiCall = async (endpoint: string, data: any) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Secure API communication failed");
  }

  return response.json();
};
```

### 4. Data Storage and Retention

#### No Persistent Storage

- **User Data**: Table data is not stored on our servers
- **Temporary Processing**: Data exists only during active Google Sheets export
- **Automatic Cleanup**: All temporary data deleted after processing completion

#### Token Management

```typescript
// Secure token handling
const tokenStorage = {
  store: (tokens: Tokens) => {
    // Secure storage with encryption
    // Automatic expiration handling
  },
  retrieve: () => {
    // Validate token before use
    // Automatic refresh if expired
  },
  revoke: () => {
    // Clean token removal
    // Google revocation call
  },
};
```

### 5. Input Validation and Sanitization

#### Client-Side Validation

```typescript
// Comprehensive input validation
const validateTableData = (data: unknown): TableData => {
  // Type checking
  if (!Array.isArray(data)) {
    throw new ValidationError("Invalid data format");
  }

  // Content sanitization
  const sanitized = data.map((row) => row.map((cell) => sanitizeInput(cell)));

  // Structure validation
  validateTableStructure(sanitized);

  return sanitized;
};
```

#### Server-Side Validation

```typescript
// API route validation
export async function POST(request: Request) {
  try {
    // Input validation
    const body = await request.json();
    const validatedData = validateExportRequest(body);

    // Authentication check
    const session = await getServerSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Process with validated data
    return await processExport(validatedData);
  } catch (error) {
    // Secure error handling
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### 6. Error Handling and Logging

#### Secure Error Management

- **User Errors**: Generic error messages to users
- **Logging**: No sensitive data in logs
- **Monitoring**: Error tracking without exposing user data
- **Recovery**: Graceful error recovery with user feedback

#### Example Implementation

```typescript
const secureErrorHandler = (error: Error, context: string) => {
  // Log error details securely (no user data)
  console.error(`[${context}] Application error:`, {
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  // Return generic message to user
  return "An error occurred while processing your request. Please try again.";
};
```

## Infrastructure Security

### 1. Hosting Security (Cloudflare Pages)

#### Platform Security Features

- **DDoS Protection**: Cloudflare's enterprise-grade DDoS protection
- **WAF**: Web Application Firewall with automatic threat detection
- **SSL/TLS**: Automatic SSL certificate management and renewal
- **CDN**: Global content delivery network with edge security

#### Deployment Security

- **Automatic Deployments**: Secure CI/CD pipeline from GitHub
- **Environment Isolation**: Separate staging and production environments
- **Access Control**: Limited deployment access via GitHub permissions

### 2. Development Security

#### Code Security

```typescript
// Environment variable security
const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`);
  }
  return value;
};

// No secrets in code
const googleClientId = getEnvVar("GOOGLE_CLIENT_ID");
const googleClientSecret = getEnvVar("GOOGLE_CLIENT_SECRET");
```

#### Dependency Management

- **Regular Updates**: Automated dependency updates via Dependabot
- **Vulnerability Scanning**: GitHub security alerts for dependencies
- **Minimal Dependencies**: Only essential packages included
- **License Compliance**: All dependencies properly licensed

### 3. API Security

#### Rate Limiting

```typescript
// API route protection
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // Rate limiting
  const rateLimitResult = await rateLimit(request);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // Process request
}
```

#### Request Validation

- **Content-Type Validation**: Proper MIME type checking
- **Size Limits**: Request size limitations to prevent abuse
- **Origin Validation**: CORS properly configured
- **CSRF Protection**: Built-in CSRF protection via NextAuth.js

## Privacy and Data Protection

### 1. Data Minimization

- **Collection**: Only collect necessary data for functionality
- **Processing**: Process data only for stated purposes
- **Storage**: No unnecessary data storage
- **Transmission**: Minimal data transmission to external services

### 2. User Control

- **Consent**: Clear consent for Google integration
- **Revocation**: Easy access revocation process
- **Transparency**: Clear privacy policy explaining data use
- **Choice**: Option to use application without Google integration

### 3. Google API Compliance

#### API Usage Compliance

```typescript
// Compliant API usage
const createGoogleSheet = async (data: TableData, title: string) => {
  // Only create files - no reading of existing files
  // User data only - no access to other user's data
  // Clear purpose - table data conversion

  const response = await googleSheetsAPI.spreadsheets.create({
    requestBody: {
      properties: { title },
      sheets: [
        {
          data: formatTableDataForSheets(data),
        },
      ],
    },
  });

  return response.data;
};
```

#### Scope Justification

- **`drive.file`**: Only for creating new files with user's converted data
- **`spreadsheets`**: Only for creating new spreadsheets with user's table data
- **`userinfo.*`**: Only for user identification and authentication
- **No excessive permissions**: No reading of existing files or data

## Incident Response

### 1. Security Incident Procedure

1. **Detection**: Automated monitoring and user reports
2. **Assessment**: Immediate impact assessment
3. **Containment**: Isolate affected systems
4. **Investigation**: Determine root cause and scope
5. **Recovery**: Restore secure operations
6. **Communication**: Notify affected users if necessary

### 2. Data Breach Response

1. **Immediate Actions**: Stop data processing, secure systems
2. **Assessment**: Determine data affected and user impact
3. **Notification**: Comply with applicable breach notification laws
4. **Remediation**: Implement fixes and security improvements
5. **Monitoring**: Enhanced monitoring post-incident

## Security Testing and Monitoring

### 1. Regular Security Assessments

- **Code Reviews**: Regular security-focused code reviews
- **Dependency Audits**: Regular vulnerability scans
- **Penetration Testing**: Planned security testing (as required for Google verification)
- **Compliance Checks**: Regular compliance with Google API policies

### 2. Monitoring and Alerting

- **Error Monitoring**: Application error tracking
- **Performance Monitoring**: System performance alerts
- **Security Alerts**: Automated security issue detection
- **Access Monitoring**: Authentication and authorization logging

## Compliance and Standards

### 1. Standards Compliance

- **OAuth 2.0**: Full compliance with OAuth 2.0 specification
- **Google API Policies**: Compliance with all Google API policies
- **Web Security**: Following OWASP security guidelines
- **Privacy Regulations**: GDPR and applicable privacy law compliance

### 2. Documentation and Policies

- **Security Policy**: Comprehensive security policy documentation
- **Privacy Policy**: Clear and comprehensive privacy policy
- **Terms of Service**: Detailed terms covering security aspects
- **Incident Response Plan**: Documented incident response procedures

## Verification Support Documentation

### 1. Technical Architecture

- Clean, security-focused codebase
- Comprehensive error handling
- Secure authentication implementation
- Minimal data collection and processing

### 2. Operational Security

- Secure hosting environment
- Regular security updates
- Monitoring and alerting systems
- Incident response capabilities

### 3. Compliance Evidence

- Privacy policy implementation
- Terms of service coverage
- User consent mechanisms
- Data protection measures

## Contact and Support

For security-related questions or to report security issues:

- **Email**: security@tablio.app
- **Response Time**: 24-48 hours for security issues
- **Escalation**: Direct contact available for critical security issues

This documentation demonstrates TableFlow's commitment to security and provides the necessary evidence for Google OAuth verification.
