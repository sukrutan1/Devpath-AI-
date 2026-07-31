"""
Salary prediction service — loads the trained XGBoost pipeline
and provides prediction via API.
"""

import json
from pathlib import Path

import joblib
import pandas as pd

from server.schemas import PredictRequest, PredictResponse

# ── Paths ────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / 'models' / 'maas_tahmin_modeli.joblib'
INFO_PATH = BASE_DIR / 'models' / 'model_bilgisi.json'
OPTIONS_PATH = BASE_DIR / 'server' / 'options.json'

# ── Global state (loaded once at startup) ────────────────────
model = None
model_info = None
options = None

USD_TO_TRY = 40


def load_model():
    """Load the trained model and metadata. Called once at app startup."""
    global model, model_info, options, USD_TO_TRY

    if MODEL_PATH.exists():
        model = joblib.load(MODEL_PATH)
        print(f'Model yuklendi: {MODEL_PATH}')
    else:
        print(f'Model bulunamadi: {MODEL_PATH}')
        print('   Once train_model.py calistirin!')

    if INFO_PATH.exists():
        with open(INFO_PATH, 'r', encoding='utf-8') as f:
            model_info = json.load(f)
        USD_TO_TRY = model_info.get('usd_to_try_sabit_kur', 40)
        print(f'Model bilgisi yuklendi (R^2={model_info.get("test_r2")})')

    if OPTIONS_PATH.exists():
        with open(OPTIONS_PATH, 'r', encoding='utf-8') as f:
            options = json.load(f)
        print(f'Dropdown secenekleri yuklendi')


def get_options() -> dict:
    """Return dropdown options for the prediction form."""
    if options is None:
        return {}
    return options


def predict_salary(req: PredictRequest) -> PredictResponse:
    """Run the XGBoost pipeline on user input and return salary estimates."""
    if model is None:
        raise RuntimeError('Model yüklenmemiş. train_model.py çalıştırın.')

    # Build a single-row DataFrame in the exact column order the model expects
    feature_order = [
        'WorkExp', 'DevType', 'Country', 'EdLevel',
        'RemoteWork', 'OrgSize', 'Industry', 'Employment', 'Age',
        'ICorPM', 'AISelect', 'DilSayisi',
    ]

    row = {
        'WorkExp': req.WorkExp,
        'DevType': req.DevType,
        'Country': req.Country,
        'EdLevel': req.EdLevel,
        'RemoteWork': req.RemoteWork,
        'OrgSize': req.OrgSize,
        'Industry': req.Industry,
        'Employment': req.Employment,
        'Age': req.Age,
        'ICorPM': req.ICorPM,
        'AISelect': req.AISelect,
        'DilSayisi': req.DilSayisi,
    }

    df = pd.DataFrame([row], columns=feature_order)
    prediction = model.predict(df)[0]

    monthly_usd = max(float(prediction), 0.0)
    monthly_usd = round(monthly_usd, 2)
    monthly_tl = round(monthly_usd * USD_TO_TRY, 2)
    yearly_usd = round(monthly_usd * 12, 2)

    return PredictResponse(
        monthly_usd=monthly_usd,
        monthly_tl=monthly_tl,
        yearly_usd=yearly_usd,
    )
