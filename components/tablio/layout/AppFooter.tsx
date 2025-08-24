export function AppFooter() {
  return (
    <footer className="mt-12 sm:mt-16 py-6 sm:py-8 text-center border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <a
            href="#"
            className="hover:text-primary transition-colors duration-200 touch-manipulation"
          >
            How to Use?
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="#"
            className="hover:text-primary transition-colors duration-200 touch-manipulation"
          >
            About
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="https://github.com/bugrabasbostanci/tablio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-200 touch-manipulation"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}