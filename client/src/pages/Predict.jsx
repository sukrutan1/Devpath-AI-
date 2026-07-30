import { useState, useEffect } from 'react';
import { fetchOptions, predictSalary } from '../api/client';

export default function Predict() {
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    WorkExp: '',
    DevType: '',
    Country: '',
    EdLevel: '',
    RemoteWork: '',
    OrgSize: '',
    Industry: '',
    Employment: '',
    Age: '',
    ICorPM: '',
    AISelect: '',
    DilSayisi: '',
  });

  useEffect(() => {
    fetchOptions().then(setOptions).catch(() => setError('Seçenekler yüklenemedi'));
  }, []);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = {
        ...form,
        WorkExp: parseInt(form.WorkExp, 10),
        DilSayisi: parseInt(form.DilSayisi, 10),
      };
      const res = await predictSalary(data);
      setResult(res);
    } catch (err) {
      setError(err.message || 'Tahmin başarısız');
    } finally {
      setLoading(false);
    }
  };

  const formatUSD = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  const formatTRY = (n) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

  const renderSelect = (field, label, placeholder) => (
    <div>
      <label className="block font-label text-label-sm text-on-surface-variant mb-base">
        {label}
      </label>
      <select
        value={form[field]}
        onChange={handleChange(field)}
        className="font-body text-body-md"
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options?.[field]?.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <main className="flex-grow pt-[120px] pb-xl px-sm md:px-md max-w-container-max mx-auto w-full">
      {/* Header */}
      <div className="mb-lg text-center md:text-left fade-in">
        <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface mb-xs">
          Predict Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
            Market Value
          </span>
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
          Leverage our AI model to estimate your optimal salary based on current
          tech market trends, your skills, and location.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        {/* Form Column */}
        <div className="lg:col-span-8 space-y-md fade-in">
          <div className="glass-panel rounded-xl p-md md:p-lg">
            <form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <div className="mb-lg">
                <h2 className="font-headline text-headline-md text-on-surface border-b border-white/10 pb-xs mb-md flex items-center gap-xs">
                  <span className="material-symbols-outlined text-primary">person</span>
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                  <div>
                    <label className="block font-label text-label-sm text-on-surface-variant mb-base">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      placeholder="e.g. 3"
                      value={form.WorkExp}
                      onChange={handleChange('WorkExp')}
                      className="font-body text-body-md"
                    />
                  </div>
                  {renderSelect('Age', 'Age Range', 'Select Age Range')}
                  {renderSelect('EdLevel', 'Highest Education', 'Select Education Level')}
                </div>
              </div>

              {/* Role Details */}
              <div className="mb-lg">
                <h2 className="font-headline text-headline-md text-on-surface border-b border-white/10 pb-xs mb-md flex items-center gap-xs">
                  <span className="material-symbols-outlined text-secondary">work</span>
                  Role Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="md:col-span-2">
                    {renderSelect('DevType', 'Primary Role', 'Select your role')}
                  </div>
                  {renderSelect('Country', 'Country', 'Select Country')}
                  {renderSelect('RemoteWork', 'Work Arrangement', 'Select Mode')}
                  {renderSelect('OrgSize', 'Company Size', 'Select Size')}
                  {renderSelect('Industry', 'Industry', 'Select Industry')}
                  {renderSelect('Employment', 'Employment Type', 'Select Type')}
                  {renderSelect('ICorPM', 'Current Level', 'Select Level')}
                </div>
              </div>

              {/* Technical Arsenal */}
              <div className="mb-xl">
                <h2 className="font-headline text-headline-md text-on-surface border-b border-white/10 pb-xs mb-md flex items-center gap-xs">
                  <span className="material-symbols-outlined text-tertiary">code</span>
                  Technical Arsenal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {renderSelect('AISelect', 'AI Tool Usage', 'Select Frequency')}
                  <div>
                    <label className="block font-label text-label-sm text-on-surface-variant mb-base">
                      Known Languages Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      placeholder="e.g. 5"
                      value={form.DilSayisi}
                      onChange={handleChange('DilSayisi')}
                      className="font-body text-body-md"
                    />
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-error font-label text-label-md mb-md text-center">
                  {error}
                </p>
              )}

              {/* Submit */}
              <div className="flex justify-end border-t border-white/10 pt-md">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-inverse-primary text-white font-label text-label-md px-xl py-3 rounded-lg hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all active:scale-95 font-bold flex items-center justify-center gap-xs disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">analytics</span>
                  {loading ? 'Hesaplanıyor...' : 'Calculate Prediction'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-[100px]">
            {/* Prediction Result Card */}
            <div className="glass-panel rounded-xl p-md overflow-hidden relative border border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full z-0" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-sm border border-primary/30">
                  <span className="material-symbols-outlined text-primary">monitoring</span>
                </div>
                <h3 className="font-label text-label-md text-primary uppercase tracking-wider mb-sm">
                  Estimated Valuation
                </h3>

                {/* Primary Metric */}
                <div className="mb-lg w-full">
                  <p className="font-label text-label-sm text-on-surface-variant mb-1">
                    Monthly (USD)
                  </p>
                  <div className="font-display text-display-lg text-on-surface font-extrabold flex items-baseline justify-center count-up">
                    <span className="text-3xl text-primary/70 mr-1">$</span>
                    {result ? Math.round(result.monthly_usd).toLocaleString() : '—'}
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full mt-sm overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full progress-fill"
                      style={{ width: result ? '75%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-sm w-full border-t border-white/10 pt-md">
                  <div>
                    <p className="font-label text-label-sm text-on-surface-variant mb-1">
                      Annual (USD)
                    </p>
                    <p className="font-headline text-headline-md text-secondary font-bold">
                      {result ? formatUSD(result.yearly_usd) : '—'}
                    </p>
                  </div>
                  <div className="border-l border-white/10 pl-sm">
                    <p className="font-label text-label-sm text-on-surface-variant mb-1">
                      Monthly (TRY)
                    </p>
                    <p className="font-headline text-headline-md text-tertiary font-bold">
                      {result ? formatTRY(result.monthly_tl) : '—'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Insight */}
            <div className="glass-panel rounded-xl p-md mt-md">
              <h4 className="font-label text-label-md text-on-surface mb-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-secondary text-sm">lightbulb</span>
                Market Insight
              </h4>
              <p className="font-label text-label-sm text-on-surface-variant leading-relaxed">
                Stack Overflow Developer Survey 2025 verilerine dayalı tahminler.
                Model doğruluğu:{' '}
                <span className="text-tertiary font-bold">XGBoost R² ~ 0.55</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-md">
                <span className="bg-tertiary-container/10 text-tertiary border border-tertiary/20 px-2 py-1 rounded-full font-label text-label-sm">
                  49K+ Veri
                </span>
                <span className="bg-primary-container/10 text-primary border border-primary/20 px-2 py-1 rounded-full font-label text-label-sm">
                  GridSearch Optimized
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
