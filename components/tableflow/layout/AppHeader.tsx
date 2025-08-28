import Link from "next/link";
import Image from "next/image";

export function AppHeader() {
  return (
    <header className="py-6 sm:py-8 text-center px-4">
      <Link href="/" className="inline-block">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 hover:opacity-80 transition-opacity cursor-pointer">
          <Image
            src="/tableflow-logo.svg"
            alt="TableFlow Logo"
            width={64}
            height={64}
            className="w-12 h-12 sm:w-16 sm:h-16"
            priority
          />
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
            TableFlow
          </h1>
        </div>
      </Link>
      <p className="text-sm sm:text-base text-muted-foreground px-4 max-w-2xl mx-auto">
        Free online table converter - Transform copied table data into Excel,
        CSV, JSON, and XML formats instantly. Export directly to Google Sheets
        or download files.
      </p>
    </header>
  );
}
