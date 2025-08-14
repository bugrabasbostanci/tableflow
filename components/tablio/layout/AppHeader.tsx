import { FileSpreadsheet } from "lucide-react";

export function AppHeader() {
  return (
    <header className="py-6 sm:py-8 text-center px-4">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
        <FileSpreadsheet className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          Tablio
        </h1>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground px-4">
        Kopyaladığınız tabloları istediğiniz formata dönüştürün
      </p>
    </header>
  );
}