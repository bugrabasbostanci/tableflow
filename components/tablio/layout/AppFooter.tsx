export function AppFooter() {
  return (
    <footer className="mt-12 sm:mt-16 py-6 sm:py-8 text-center border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <a
            href="/faq"
            className="hover:text-primary transition-colors duration-200 touch-manipulation"
          >
            FAQ
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="/privacy-policy"
            className="hover:text-primary transition-colors duration-200 touch-manipulation"
          >
            Privacy Policy
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="/terms-of-service"
            className="hover:text-primary transition-colors duration-200 touch-manipulation"
          >
            Terms of Service
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