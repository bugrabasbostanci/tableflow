export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TableFlow",
    description:
      "Free online table converter that transforms copied table data into Excel, CSV, PDF, HTML, JSON, and XML formats instantly with Google Sheets integration.",
    url: "https://tableflow-3bm.pages.dev",
    applicationCategory: "Utility",
    operatingSystem: "Web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Convert table data to Excel format",
      "Convert table data to CSV format",
      "Convert table data to PDF format",
      "Convert table data to HTML format",
      "Convert table data to JSON format",
      "Convert table data to XML format",
      "Google Sheets integration",
      "Drag and drop file upload",
      "Clipboard paste support",
      "Real-time table editing",
      "Mobile responsive interface",
    ],
    creator: {
      "@type": "Organization",
      name: "TableFlow",
    },
    publisher: {
      "@type": "Organization",
      name: "TableFlow",
    },
    softwareVersion: "1.0",
    releaseNotes: "Initial release with full table conversion capabilities",
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TableFlow",
    description: "Provider of free online table conversion tools",
    url: "https://tableflow-3bm.pages.dev",
    sameAs: ["https://github.com/bugrabasbostanci/tablio"],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I convert a table to Excel format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply copy your table data from Excel, Google Sheets, or any website, paste it into TableFlow, and click export. Choose Excel format and download your converted file instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export directly to Google Sheets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, TableFlow offers direct Google Sheets integration. After pasting your table data, select Google Sheets export and authenticate with your Google account to create a new spreadsheet.",
        },
      },
      {
        "@type": "Question",
        name: "What table formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TableFlow supports exporting to Excel (XLSX), CSV, PDF, HTML, JSON, and XML formats. You can also export directly to Google Sheets.",
        },
      },
      {
        "@type": "Question",
        name: "Is TableFlow free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, TableFlow is completely free to use. There are no subscription fees, usage limits, or hidden costs.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
