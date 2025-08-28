# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TableFlow is a web application for converting copied table data into Excel, CSV, and other structured formats. Built for international users who need to convert table data from websites into formats suitable for analysis and processing.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS v4 with custom theme and dark mode
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist Sans (Google Fonts)

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Structure

- `app/` - Next.js App Router pages and layouts
  - `page.tsx` - Main application component with table conversion logic
  - `layout.tsx` - Root layout with English locale and dark theme
  - `globals.css` - Tailwind CSS with custom TableFlow styles
- `components/ui/` - shadcn/ui components (Button, Card, Input, Select)
- `lib/utils.ts` - Utility functions for component variants
- `docs/` - Project documentation including PRD and design notes

## Key Features Implementation

The main application (`app/page.tsx`) implements:

- **Clipboard Integration**: Paste table data directly from clipboard
- **File Upload**: CSV file drag-and-drop and file input
- **Table Editing**: Click-to-edit cells with inline editing
- **Format Export**: Excel (XLSX), CSV, JSON, XML formats
- **Google Sheets Integration**: Direct export to Google Sheets with OAuth2 authentication
- **Progress Indicators**: Loading states for processing and downloads
- **Mobile Responsive**: Touch-friendly interface with mobile controls
- **English Interface**: All UI text in English

## Configuration Files

- **TypeScript**: Configured with strict mode, path aliases (`@/` -> `./`)
- **Tailwind**: v4 configuration with custom design tokens and dark theme
- **shadcn/ui**: New York style, RSC enabled, uses Lucide icons
- **Next.js**: Default configuration, ready for production deployment

## Data Processing Logic

The application handles:

- Tab-separated values from clipboard (Excel/Google Sheets copy format)
- CSV file parsing with comma separation
- Table validation (consistent column counts)
- Cell editing with save/cancel functionality
- Row/column addition and removal
- Decimal format handling for international use

## Styling Conventions

- Uses Tailwind CSS with custom CSS variables for theming
- Dark mode as default (`dark` class on body)
- Custom `.tableflow-*` classes for app-specific styling
- Responsive design with `sm:` breakpoints
- Hover and focus states with smooth transitions
- Custom scrollbar styling for table overflow

## Google Sheets Integration Setup

To enable Google Sheets export functionality:

1. **Google Cloud Console Setup**:

   - Go to [Google Cloud Console](https://console.developers.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Sheets API and Google Drive API
   - Create OAuth 2.0 credentials (Application type: Web application)
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/google/callback` (for development)

2. **Environment Variables**:

   - Copy `.env.example` to `.env.local`
   - Fill in your Google OAuth Client ID and Client Secret
   - Set `NEXTAUTH_URL` to your application URL

3. **Production Deployment**:
   - Add your production domain to authorized redirect URIs
   - Update `NEXTAUTH_URL` to your production URL
   - Ensure environment variables are set in your deployment platform

## Important Notes

- Application defaults to English language and dark theme
- Financial data formatting handles international decimal notation
- Excel export currently generates CSV format (XLSX library not implemented)
- Google Sheets integration implemented with OAuth2 authentication
- Mobile-first responsive design with touch-friendly interactions
