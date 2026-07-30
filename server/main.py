"""
FastAPI application — serves the ML prediction API and the React frontend.
"""

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from server.schemas import PredictRequest, PredictResponse, QuizSubmission, QuizResult
from server.predict import load_model, get_options, predict_salary
from server.quiz import get_quiz_questions, calculate_recommendation


# ── Lifespan (model loading) ─────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    load_model()
    yield


app = FastAPI(
    title='DevPath AI',
    description='Yazılım Kariyer Rehberi — Maaş Tahmini ve Alan Önerici',
    version='1.0.0',
    lifespan=lifespan,
)

# ── CORS (development) ──────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# ── API Routes ───────────────────────────────────────────────
@app.get('/api/options')
def api_options():
    """Return dropdown options for the salary prediction form."""
    return get_options()


@app.post('/api/predict', response_model=PredictResponse)
def api_predict(req: PredictRequest):
    """Predict monthly salary from user profile."""
    try:
        return predict_salary(req)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))


@app.get('/api/quiz')
def api_quiz():
    """Return the 15 quiz questions."""
    return get_quiz_questions()


@app.post('/api/recommend', response_model=QuizResult)
def api_recommend(submission: QuizSubmission):
    """Calculate career field recommendation from quiz answers."""
    return calculate_recommendation(submission)


# ── Serve React static files ────────────────────────────────
DIST_DIR = Path(__file__).resolve().parent.parent / 'client' / 'dist'

if DIST_DIR.exists():
    app.mount('/assets', StaticFiles(directory=DIST_DIR / 'assets'), name='assets')

    @app.get('/{full_path:path}')
    async def serve_spa(full_path: str):
        """Serve React SPA — all non-API routes return index.html."""
        file_path = DIST_DIR / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(DIST_DIR / 'index.html')
