export function ContentSections() {
  return (
    <div className="mt-16">
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
            <h3 className="text-lg font-semibold">Paste Data</h3>
            <p className="text-muted-foreground text-sm">
              Paste table data from Excel, Google Sheets, or websites
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              2
            </div>
            <h3 className="text-lg font-semibold">Edit if Needed</h3>
            <p className="text-muted-foreground text-sm">
              Make quick edits to cells or add/remove rows as needed
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              3
            </div>
            <h3 className="text-lg font-semibold">Download</h3>
            <p className="text-muted-foreground text-sm">
              Choose your format and download instantly
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}