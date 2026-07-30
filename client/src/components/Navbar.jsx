import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkBase =
    'font-label text-label-md text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 px-3 py-2 rounded-md';
  const linkActive =
    'font-label text-label-md text-primary border-b-2 border-primary pb-1';

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(208,188,255,0.1)]">
      <div className="flex items-center justify-between px-md py-xs max-w-container-max mx-auto h-[72px]">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-xs">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            terminal
          </span>
          <span className="font-headline text-headline-md font-bold text-primary tracking-tight">
            DevPath
          </span>
        </NavLink>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-lg">
          <NavLink
            to="/predict"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Salary Prediction
          </NavLink>
          <NavLink
            to="/quiz"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Area Finder
          </NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-sm">
          <NavLink
            to="/predict"
            className="bg-gradient-to-r from-primary to-secondary text-on-primary-fixed font-label text-label-md px-6 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(208,188,255,0.4)] transition-all active:scale-95 font-semibold"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
