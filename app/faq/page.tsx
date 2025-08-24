import type { Metadata } from "next";
import { AppHeader } from "@/components/tablio/layout/AppHeader";
import { AppFooter } from "@/components/tablio/layout/AppFooter";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Table Converter Help",
  description: "Get answers to common questions about using Tablio table converter. Learn how to convert Excel, CSV, and other table formats with our free online tool.",
  keywords: [
    "table converter FAQ",
    "excel converter help", 
    "csv converter questions",
    "how to convert tables",
    "table format converter help"
  ],
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQ() {
  const faqs = [
    {
      question: "How do I convert a table to Excel format?",
      answer: "Simply copy your table data from any source (Excel, Google Sheets, website), paste it into Tablio, and click export. Choose Excel format and download your converted file instantly."
    },
    {
      question: "Can I export directly to Google Sheets?",
      answer: "Yes, Tablio offers direct Google Sheets integration. After pasting your table data, select Google Sheets export and authenticate with your Google account to create a new spreadsheet."
    },
    {
      question: "What table formats are supported?",
      answer: "Tablio supports exporting to Excel (XLSX), CSV, PDF, HTML, JSON, and XML formats. You can also export directly to Google Sheets."
    },
    {
      question: "Is Tablio free to use?",
      answer: "Yes, Tablio is completely free to use. There are no subscription fees, usage limits, or hidden costs."
    },
    {
      question: "Is my data safe and private?",
      answer: "Absolutely. Your table data is processed locally in your browser for maximum privacy. For Google Sheets exports, data may be temporarily stored on secure servers only for the duration of the export process and is immediately deleted afterward."
    },
    {
      question: "Can I edit the table data before exporting?",
      answer: "Yes, you can click on any cell to edit its content, add new rows and columns, and make any necessary changes before exporting your data."
    },
    {
      question: "What file size limits exist?",
      answer: "Tablio can handle large datasets efficiently. The tool is optimized to process thousands of rows in seconds, with special handling for large datasets to maintain performance."
    },
    {
      question: "Does Tablio work on mobile devices?",
      answer: "Yes, Tablio is fully responsive and works perfectly on desktop, tablet, and mobile devices with a touch-friendly interface."
    },
    {
      question: "How do I paste table data?",
      answer: "You can paste table data by clicking the paste area and pressing Ctrl+V (or Cmd+V on Mac), or by clicking directly on the paste area. You can also drag and drop CSV files."
    },
    {
      question: "What if my table has special characters or international text?",
      answer: "Tablio supports international text and special characters. The tool handles various character encodings to ensure your data is preserved correctly during conversion."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mb-6">
            Find answers to common questions about using Tablio table converter. 
            Need more help? <Link href="/" className="text-primary hover:underline">Try the converter</Link> or check our other resources.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {faq.question}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Convert Your Tables?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start converting your table data to Excel, CSV, PDF, HTML, JSON, and XML formats instantly.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Converting Tables
            </Link>
          </Card>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}