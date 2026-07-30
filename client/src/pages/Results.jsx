import { useLocation, useNavigate, NavLink } from 'react-router-dom';

// Gradient colors for top bars, grayed for bottom
const BAR_STYLES = [
  'bg-gradient-to-r from-primary to-tertiary shadow-[0_0_10px_rgba(208,188,255,0.5)]',
  'bg-gradient-to-r from-secondary-container to-secondary',
  'bg-gradient-to-r from-tertiary-container to-tertiary',
  'bg-primary-fixed-dim',
  'bg-secondary-fixed-dim',
];

const TEXT_COLORS = [
  'text-primary font-bold',
  'text-secondary font-bold',
  'text-tertiary font-bold',
  'text-primary-fixed-dim font-bold',
  'text-secondary-fixed-dim font-bold',
];

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center pt-[120px] px-md">
        <p className="text-on-surface-variant font-body text-body-lg mb-md">
          Henüz quiz sonucu yok.
        </p>
        <NavLink
          to="/quiz"
          className="bg-gradient-to-r from-primary to-inverse-primary text-white font-label text-label-md py-sm px-xl rounded-lg glow-button transition-all font-bold"
        >
          Anketi Başlat
        </NavLink>
      </main>
    );
  }

  const { recommended_field, description, skills, icon, percentages, roadmap_link, alternative_field, alternative_percentage } = result;

  return (
    <main className="flex-grow pt-[120px] pb-xl px-sm md:px-lg max-w-container-max mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-md md:gap-lg">
      {/* Header */}
      <header className="col-span-1 lg:col-span-12 text-center mb-md fade-in">
        <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface mb-xs">
          Quiz Results
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Based on your responses, we&apos;ve analyzed your strengths and
          interests to recommend your ideal development path.
        </p>
      </header>

      {/* Left Column */}
      <div className="col-span-1 lg:col-span-5 flex flex-col gap-md fade-in">
        {/* Hero Result Card */}
        <div className="glass-panel rounded-xl p-md md:p-lg flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
          <div className="w-24 h-24 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center mb-sm relative z-10 glow-shadow">
            <span
              className="material-symbols-outlined text-[48px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {icon}
            </span>
          </div>
          <h2 className="font-label text-label-md text-primary uppercase tracking-wider mb-base relative z-10">
            Your Recommended Path
          </h2>
          <h3 className="font-headline text-headline-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary mb-sm relative z-10">
            {recommended_field}
          </h3>
          <p className="font-body text-body-md text-on-surface-variant mb-md relative z-10">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-xs mb-md relative z-10">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-primary-container/10 border border-primary/20 text-primary px-sm py-base rounded-full font-label text-label-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          <a
            href={roadmap_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-surface-container-high/50 border border-white/10 hover:border-primary/50 text-on-surface py-sm px-sm rounded-lg flex items-center justify-between transition-all hover:bg-surface-container-highest relative z-10"
          >
            <span className="flex items-center gap-xs font-label text-label-md">
              <span className="material-symbols-outlined text-primary">map</span>
              Learning path on roadmap.sh
            </span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Alternative Path */}
        <div className="glass-panel rounded-xl p-md">
          <h3 className="font-headline text-[20px] font-bold text-on-surface mb-sm flex items-center gap-xs">
            <span className="material-symbols-outlined text-secondary">alt_route</span>
            Alternative Path
          </h3>
          <div className="flex items-center justify-between border-t border-white/5 pt-sm">
            <div>
              <h4 className="font-label text-label-md text-on-surface">
                {alternative_field}
              </h4>
              <p className="font-label text-label-sm text-on-surface-variant mt-base">
                Your second strongest match based on quiz answers.
              </p>
            </div>
            <span className="font-headline text-headline-md text-secondary">
              {alternative_percentage}%
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-sm mt-auto">
          <button
            onClick={() => navigate('/quiz')}
            className="flex-1 glass-panel border border-white/10 hover:bg-white/5 text-on-surface font-label text-label-md py-sm rounded-lg transition-all active:scale-95 flex items-center justify-center gap-xs"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Try Again
          </button>
          <NavLink
            to="/predict"
            className="flex-1 bg-gradient-to-r from-primary to-inverse-primary text-white font-label text-label-md py-sm rounded-lg transition-all hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] active:scale-95 font-bold flex items-center justify-center gap-xs"
          >
            Go to Salary Prediction
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </NavLink>
        </div>
      </div>

      {/* Right Column — Area Analysis Breakdown */}
      <div className="col-span-1 lg:col-span-7 glass-panel rounded-xl p-md md:p-lg flex flex-col fade-in">
        <div className="flex items-center justify-between mb-lg border-b border-white/10 pb-xs">
          <h2 className="font-headline text-headline-md text-on-surface flex items-center gap-xs">
            <span className="material-symbols-outlined text-tertiary">analytics</span>
            Area Analysis Breakdown
          </h2>
        </div>
        <div className="flex flex-col gap-sm flex-grow justify-center">
          {percentages.map((field, i) => {
            const isTop = i < 5;
            const barStyle = isTop
              ? BAR_STYLES[i] || BAR_STYLES[4]
              : 'bg-outline-variant';
            const textColor = isTop
              ? TEXT_COLORS[i] || TEXT_COLORS[4]
              : 'text-on-surface-variant';

            return (
              <div key={field.name} className={`w-full ${isTop ? '' : 'opacity-70'}`}>
                <div className="flex justify-between font-label text-label-sm mb-base">
                  <span className="text-on-surface">{field.name}</span>
                  <span className={textColor}>{field.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full progress-fill ${barStyle}`}
                    style={{ width: `${field.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
