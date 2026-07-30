import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuiz, submitQuiz } from '../api/client';

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [direction, setDirection] = useState('forward');
  const [animKey, setAnimKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuiz()
      .then((qs) => {
        setQuestions(qs);
        setAnswers(new Array(qs.length).fill(0));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectAnswer = (optionKey) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionKey;
      return next;
    });
  };

  const goNext = async () => {
    if (current < questions.length - 1) {
      setDirection('forward');
      setAnimKey((k) => k + 1);
      setCurrent((c) => c + 1);
    } else {
      // Submit
      setSubmitting(true);
      try {
        const result = await submitQuiz(answers);
        navigate('/results', { state: { result } });
      } catch {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const goBack = () => {
    if (current > 0) {
      setDirection('backward');
      setAnimKey((k) => k + 1);
      setCurrent((c) => c - 1);
    }
  };

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center pt-[120px]">
        <p className="text-on-surface-variant font-body text-body-lg">
          Sorular yükleniyor...
        </p>
      </main>
    );
  }

  if (!questions.length) {
    return (
      <main className="flex-grow flex items-center justify-center pt-[120px]">
        <p className="text-error font-body text-body-lg">
          Sorular yüklenemedi. Backend çalışıyor mu?
        </p>
      </main>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const isLast = current === questions.length - 1;
  const hasAnswer = answers[current] > 0;

  return (
    <main className="flex-grow flex flex-col justify-center items-center px-sm md:px-lg py-xs pt-[80px] w-full max-w-container-max mx-auto relative z-10">
      {/* Progress */}
      <div className="w-full max-w-2xl mb-xs">
        <div className="flex items-center justify-center mb-1">
          <div className="font-label text-label-sm md:text-label-md text-tertiary">
            Question {current + 1} of {questions.length}
          </div>
        </div>
        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full shadow-[0_0_10px_rgba(208,188,255,0.5)] progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl relative" key={animKey}>
        <div
          className={`glass-panel rounded-xl p-sm md:p-md w-full ${
            direction === 'forward' ? 'slide-enter' : 'slide-enter-reverse'
          }`}
        >
          {/* Category Badge */}
          <div className="inline-flex items-center px-2 py-1 rounded-full bg-tertiary/10 text-tertiary font-label text-label-sm mb-2 border border-tertiary/20">
            <span className="material-symbols-outlined text-[14px] mr-1">
              {q.category_icon}
            </span>
            {q.category}
          </div>

          {/* Question Text */}
          <h2 className="font-headline text-headline-sm md:text-headline-md text-on-surface mb-xs md:mb-sm font-bold leading-tight">
            {q.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => {
              const isSelected = answers[current] === opt.key;
              const labels = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => selectAnswer(opt.key)}
                  className={`choice-button glass-panel rounded-lg p-2 md:p-sm flex items-center justify-between text-left group w-full ${
                    isSelected ? 'selected border-primary' : 'border border-white/10'
                  }`}
                >
                  <span
                    className={`font-body text-body-sm md:text-body-md ${
                      isSelected
                        ? 'text-primary'
                        : 'text-on-surface group-hover:text-primary'
                    } transition-colors pr-2 leading-snug`}
                  >
                    {labels[opt.key - 1]}. {opt.text}
                  </span>
                  <span
                    className={`material-symbols-outlined ${
                      isSelected
                        ? 'text-primary'
                        : 'text-outline-variant group-hover:text-primary'
                    } transition-colors`}
                    style={
                      isSelected
                        ? { fontVariationSettings: "'FILL' 1" }
                        : undefined
                    }
                  >
                    {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-2xl mt-sm mb-sm flex justify-between gap-sm">
        <button
          type="button"
          onClick={goBack}
          disabled={current === 0}
          className="glass-panel border border-white/10 hover:bg-white/5 text-on-surface font-label text-label-sm md:text-label-md py-2 px-md md:px-lg rounded-lg transition-all active:scale-95 flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!hasAnswer || submitting}
          className="bg-gradient-to-r from-primary to-inverse-primary text-white font-label text-label-sm md:text-label-md py-2 px-md md:px-lg rounded-lg transition-all hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] active:scale-95 font-bold flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting
            ? 'Calculating...'
            : isLast
            ? 'See Results'
            : 'Next Question'}
          <span className="material-symbols-outlined text-[18px]">
            {isLast ? 'check' : 'arrow_forward'}
          </span>
        </button>
      </div>
    </main>
  );
}
