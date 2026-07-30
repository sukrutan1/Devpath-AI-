const BASE = '';

export async function fetchOptions() {
  const res = await fetch(`${BASE}/api/options`);
  if (!res.ok) throw new Error('Failed to fetch options');
  return res.json();
}

export async function predictSalary(data) {
  const res = await fetch(`${BASE}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Prediction failed');
  }
  return res.json();
}

export async function fetchQuiz() {
  const res = await fetch(`${BASE}/api/quiz`);
  if (!res.ok) throw new Error('Failed to fetch quiz');
  return res.json();
}

export async function submitQuiz(answers) {
  const res = await fetch(`${BASE}/api/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error('Recommendation failed');
  return res.json();
}
