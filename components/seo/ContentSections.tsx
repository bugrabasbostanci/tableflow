import { Card } from "@/components/ui/card";
import { FileSpreadsheet, Upload, Download, Zap, Shield, Globe } from "lucide-react";

export function ContentSections() {
  return (
    <div className="mt-16 space-y-16">
      {/* Features Section */}
      <section className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Powerful Table Conversion Features
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Convert your table data with professional-grade tools designed for efficiency and accuracy
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <FileSpreadsheet className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Multiple Export Formats</h3>
            <p className="text-muted-foreground text-sm">
              Export to Excel (XLSX), CSV, PDF, HTML, JSON, and XML formats with one click
            </p>
          </Card>
          
          <Card className="p-6">
            <Upload className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Easy Data Import</h3>
            <p className="text-muted-foreground text-sm">
              Paste from Excel, Google Sheets, or upload CSV files directly
            </p>
          </Card>
          
          <Card className="p-6">
            <Download className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Google Sheets Integration</h3>
            <p className="text-muted-foreground text-sm">
              Export directly to Google Sheets with secure OAuth authentication
            </p>
          </Card>
          
          <Card className="p-6">
            <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground text-sm">
              Process thousands of rows in seconds with optimized performance
            </p>
          </Card>
          
          <Card className="p-6">
            <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Private & Secure</h3>
            <p className="text-muted-foreground text-sm">
              Your data is processed locally in your browser for maximum privacy
            </p>
          </Card>
          
          <Card className="p-6">
            <Globe className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mobile Friendly</h3>
            <p className="text-muted-foreground text-sm">
              Works perfectly on desktop, tablet, and mobile devices
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          How to Convert Your Tables
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transform your table data in three simple steps
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              1
            </div>
            <h3 className="text-lg font-semibold">Copy & Paste</h3>
            <p className="text-muted-foreground text-sm">
              Copy table data from Excel, Google Sheets, websites, or upload a CSV file
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              2
            </div>
            <h3 className="text-lg font-semibold">Edit & Review</h3>
            <p className="text-muted-foreground text-sm">
              Edit cells, add rows/columns, and verify your data looks correct
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              3
            </div>
            <h3 className="text-lg font-semibold">Export & Download</h3>
            <p className="text-muted-foreground text-sm">
              Choose your format and download instantly or export to Google Sheets
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Perfect for Every Use Case
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Whether you&apos;re a student, professional, or developer, Tablio makes table conversion simple
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 text-left">
            <h3 className="text-lg font-semibold mb-3">Business & Finance</h3>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>• Convert financial reports to Excel</li>
              <li>• Export sales data to CSV</li>
              <li>• Transform pricing tables for analysis</li>
            </ul>
          </Card>
          
          <Card className="p-6 text-left">
            <h3 className="text-lg font-semibold mb-3">Academic Research</h3>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>• Convert research data to spreadsheets</li>
              <li>• Export survey results to CSV</li>
              <li>• Transform statistical tables</li>
            </ul>
          </Card>
          
          <Card className="p-6 text-left">
            <h3 className="text-lg font-semibold mb-3">Web Development</h3>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>• Convert HTML tables to JSON</li>
              <li>• Export data for API integration</li>
              <li>• Transform web scraping results</li>
            </ul>
          </Card>
          
          <Card className="p-6 text-left">
            <h3 className="text-lg font-semibold mb-3">Data Analysis</h3>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>• Prepare data for analysis tools</li>
              <li>• Convert between different formats</li>
              <li>• Export clean datasets</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}