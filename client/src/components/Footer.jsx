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
            className="font-label text-label-sm text-on-surface-variant hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="font-label text-label-sm text-on-surface-variant hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100"
            href="#"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
}
