import type { Metadata } from "next";
import { AppHeader } from "@/components/tablio/layout/AppHeader";
import { AppFooter } from "@/components/tablio/layout/AppFooter";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy - Tablio",
  description: "Privacy Policy for Tablio - Table Converter application",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  1.1 Data You Provide
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Table data that you input or upload for conversion</li>
                  <li>File names you specify for exports</li>
                  <li>Configuration preferences for data formatting</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground">
                  1.2 Google Account Information
                </h3>
                <p>
                  When you choose to export data to Google Sheets, we may
                  access:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Profile information:</strong> Your name and email
                    address for authentication
                  </li>
                  <li>
                    <strong>Google Sheets access:</strong> Permission to create
                    and modify sheets in your Google Drive
                  </li>
                  <li>
                    <strong>Google Drive access:</strong> Permission to save
                    exported files to your Google Drive
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. How We Use Your Information
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  2.1 Data Processing
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Convert your table data into requested formats (Excel, CSV,
                    JSON, etc.)
                  </li>
                  <li>
                    Process and format data according to your specifications
                  </li>
                  <li>
                    Generate downloadable files or export to Google Sheets
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-foreground">
                  2.2 Google Services Integration
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create new Google Sheets with your converted data</li>
                  <li>Save exported files to your Google Drive</li>
                  <li>
                    Authenticate your identity for secure access to your Google
                    account
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. Data Storage and Security
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  3.1 Local Processing
                </h3>
                <p>
                  Your table data is processed locally in your browser whenever
                  possible. We do not store your table data on our servers
                  unless explicitly required for Google Sheets integration.
                </p>

                <h3 className="text-lg font-medium text-foreground">
                  3.2 Temporary Storage
                </h3>
                <p>
                  For Google Sheets exports, your data may be temporarily stored
                  on our secure servers only for the duration of the export
                  process and is immediately deleted afterward.
                </p>

                <h3 className="text-lg font-medium text-foreground">
                  3.3 Security Measures
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All data transmission is encrypted using HTTPS</li>
                  <li>
                    Google OAuth 2.0 authentication for secure Google account
                    access
                  </li>
                  <li>No long-term storage of your personal or table data</li>
                  <li>Regular security updates and monitoring</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Third-Party Services
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  4.1 Google Services
                </h3>
                <p>
                  When you use Google Sheets integration, you are also subject
                  to Google&apos;s Privacy Policy. We use the following Google
                  APIs:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Google Sheets API:</strong> To create and populate
                    spreadsheets
                  </li>
                  <li>
                    <strong>Google Drive API:</strong> To save files to your
                    Drive
                  </li>
                  <li>
                    <strong>Google Identity API:</strong> For secure
                    authentication
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-foreground">
                  4.2 Hosting Services
                </h3>
                <p>
                  This application is hosted on Cloudflare Pages, which may
                  collect standard web analytics data as outlined in their
                  privacy policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Table data:</strong> Processed locally and not
                    retained on our servers
                  </li>
                  <li>
                    <strong>Google authentication tokens:</strong> Stored
                    securely and can be revoked at any time
                  </li>
                  <li>
                    <strong>Exported files:</strong> Saved only to your chosen
                    destination (Google Drive or local download)
                  </li>
                  <li>
                    <strong>Temporary processing data:</strong> Automatically
                    deleted within 24 hours
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  6.1 Access and Control
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Revoke Google account access at any time through your Google
                    Account settings
                  </li>
                  <li>Request deletion of any data we may have stored</li>
                  <li>Export your data in standard formats</li>
                  <li>
                    Contact us for any privacy-related questions or requests
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-foreground">
                  6.2 Opt-Out Options
                </h3>
                <p>
                  You can use Tablio without Google integration by choosing
                  local download options instead of Google Sheets export.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Children&apos;s Privacy
              </h2>
              <p className="text-muted-foreground">
                Tablio is not intended for use by children under 13 years of
                age. We do not knowingly collect personal information from
                children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <div className="text-muted-foreground">
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Email:</strong> support@tablio.app
                  </li>
                  <li>
                    <strong>Website:</strong> https://tablio-deu.pages.dev
                  </li>
                  <li>
                    <strong>GitHub:</strong>{" "}
                    https://github.com/bugrabasbostanci/tablio
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
}
