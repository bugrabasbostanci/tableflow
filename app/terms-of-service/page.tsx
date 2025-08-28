import type { Metadata } from "next";
import { AppHeader } from "@/components/tableflow/layout/AppHeader";
import { AppFooter } from "@/components/tableflow/layout/AppFooter";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service - TableFlow",
  description: "Terms of Service for TableFlow - Table Converter application",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing and using TableFlow (&quot;the Service&quot;), you
                accept and agree to be bound by the terms and provisions of this
                agreement. If you do not agree to these terms, you should not
                use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Description of Service
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TableFlow is a web-based table conversion tool that allows
                  users to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Convert table data from various formats (copied data, CSV
                    files)
                  </li>
                  <li>
                    Export converted data to multiple formats (Excel, CSV, JSON,
                    XML)
                  </li>
                  <li>Export data directly to Google Sheets</li>
                  <li>Edit and manipulate table data before export</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. User Responsibilities
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  3.1 Acceptable Use
                </h3>
                <p>
                  You agree to use the Service only for lawful purposes and in a
                  way that does not infringe upon the rights of others. You must
                  not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Upload or process copyrighted data without proper
                    authorization
                  </li>
                  <li>
                    Use the Service to process sensitive personal information of
                    others without consent
                  </li>
                  <li>
                    Attempt to reverse engineer, hack, or compromise the Service
                  </li>
                  <li>
                    Use the Service for any illegal or unauthorized purpose
                  </li>
                  <li>Overload the Service with excessive requests or data</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground">
                  3.2 Data Responsibility
                </h3>
                <p>You are solely responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    The accuracy and legality of data you upload or process
                  </li>
                  <li>
                    Ensuring you have the right to process and export the data
                  </li>
                  <li>Backing up your important data before processing</li>
                  <li>Complying with applicable data protection laws</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Google Services Integration
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  4.1 Third-Party Services
                </h3>
                <p>
                  When using Google Sheets integration, you also agree to comply
                  with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google&apos;s Terms of Service</li>
                  <li>Google APIs Terms of Service</li>
                  <li>Google Drive and Google Sheets specific terms</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground">
                  4.2 Authentication
                </h3>
                <p>You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Maintaining the security of your Google account credentials
                  </li>
                  <li>
                    Revoking access if you no longer wish to use Google
                    integration
                  </li>
                  <li>
                    Any activity that occurs under your authenticated session
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. Service Availability
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  5.1 Service Uptime
                </h3>
                <p>
                  We strive to maintain high availability of the Service, but we
                  do not guarantee uninterrupted access. The Service may be
                  temporarily unavailable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Scheduled maintenance and updates</li>
                  <li>Emergency repairs or security updates</li>
                  <li>
                    Third-party service outages (Google services, hosting
                    providers)
                  </li>
                  <li>Force majeure events</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground">
                  5.2 Service Modifications
                </h3>
                <p>
                  We reserve the right to modify, suspend, or discontinue the
                  Service at any time with reasonable notice to users.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Intellectual Property
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  6.1 Service Ownership
                </h3>
                <p>
                  The Service, including its design, functionality, and code, is
                  owned by TableFlow and is protected by intellectual property
                  laws.
                </p>

                <h3 className="text-lg font-medium text-foreground">
                  6.2 User Data Rights
                </h3>
                <p>
                  You retain all rights to your data. We do not claim ownership
                  of any data you process through the Service.
                </p>

                <h3 className="text-lg font-medium text-foreground">
                  6.3 Open Source
                </h3>
                <p>
                  Portions of this Service may be released under open source
                  licenses. Such components are subject to their respective
                  license terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Disclaimer of Warranties
              </h2>
              <div className="text-muted-foreground">
                <p className="mb-4">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
                  AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER
                  EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT
                  NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Merchantability and fitness for a particular purpose</li>
                  <li>Accuracy, completeness, or reliability of the Service</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Security of data transmission or storage</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Limitation of Liability
              </h2>
              <div className="text-muted-foreground">
                <p className="mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE
                  FOR:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Any indirect, incidental, special, or consequential damages
                  </li>
                  <li>Loss of data, profits, or business opportunities</li>
                  <li>Service interruptions or data processing errors</li>
                  <li>Third-party service failures or data breaches</li>
                  <li>
                    Damages exceeding the amount you paid for the Service (which
                    is currently $0)
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                9. Privacy and Data Protection
              </h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our Privacy
                Policy to understand how we collect, use, and protect your
                information. By using the Service, you consent to the collection
                and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  10.1 User Termination
                </h3>
                <p>
                  You may stop using the Service at any time. You can revoke
                  Google account access through your Google Account settings.
                </p>

                <h3 className="text-lg font-medium text-foreground">
                  10.2 Service Termination
                </h3>
                <p>
                  We may terminate or suspend access to the Service immediately,
                  without prior notice, for any breach of these Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance
                with applicable international law and the laws of Turkey,
                without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will
                notify users of significant changes by updating the &quot;Last
                updated&quot; date. Continued use of the Service after changes
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                13. Contact Information
              </h2>
              <div className="text-muted-foreground">
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Email:</strong> support@tablio.app
                  </li>
                  <li>
                    <strong>Website:</strong> https://tableflow-3bm.pages.dev
                  </li>
                  <li>
                    <strong>GitHub:</strong>{" "}
                    https://github.com/bugrabasbostanci/tablio
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is held to be invalid or
                unenforceable, the remaining provisions shall remain in full
                force and effect.
              </p>
            </section>
          </div>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
}
