export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-surface-container-lowest border-t border-white/5 shadow-none">
      <div className="flex flex-col md:flex-row justify-between items-center px-lg py-md max-w-container-max mx-auto">
        <div className="flex flex-col items-center md:items-start mb-md md:mb-0">
          <span className="font-headline text-[20px] font-bold text-on-surface mb-xs">
            DevPath AI
          </span>
          <p className="font-label text-label-sm text-tertiary">
            © 2025 DevPath AI. Built for the next generation of engineers.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-md">
          <a
            className="flex items-center gap-2 font-label text-label-sm text-on-surface-variant hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100"
            href="https://github.com/sukrutan1/Devpath-AI-"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Github
          </a>
          <a
            className="font-label text-label-sm text-on-surface-variant hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100"
            href="https://github.com/sukrutan1/Devpath-AI-#readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
}
