import Image from "next/image";

export function AppHeader() {
  return (
    <header className="py-6 sm:py-8 text-center px-4">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
        <Image
          src="/tablio-logo.svg"
          alt="Tablio logo"
          width={24}
          height={24}
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          Tablio
        </h1>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground px-4">
        Convert your copied tables to your desired format
      </p>
    </header>
  );
}
