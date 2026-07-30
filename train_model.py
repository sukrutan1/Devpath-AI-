"""
Standalone model training script — extracted from the Jupyter notebook.
Run once to generate:
  - models/maas_tahmin_modeli.joblib
  - models/model_bilgisi.json
  - server/options.json
"""

import warnings
warnings.filterwarnings('ignore')

import json
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score, mean_absolute_error
import xgboost as xgb
import joblib

RANDOM_STATE = 42
np.random.seed(RANDOM_STATE)

# ── Veri yükleme ──────────────────────────────────────────────
CSV_PATH = Path('survey csv/survey_results_public.csv')
print(f'Veri yükleniyor: {CSV_PATH}')
df = pd.read_csv(CSV_PATH)
print(f'Ham veri boyutu: {df.shape}')

# ── Sütun seçimi ──────────────────────────────────────────────
cols_extended = [
    'WorkExp', 'DevType', 'Country', 'EdLevel',
    'RemoteWork', 'OrgSize', 'Industry', 'Employment', 'Age',
    'ICorPM', 'AISelect', 'LanguageHaveWorkedWith',
    'ConvertedCompYearly',
]

df_raw = df[cols_extended].copy()
df_raw = df_raw.dropna(subset=cols_extended)

# ── Uç değer filtreleme ──────────────────────────────────────
df_raw = df_raw[
    (df_raw['ConvertedCompYearly'] >= 1000) &
    (df_raw['ConvertedCompYearly'] <= 500000)
]
df_raw = df_raw[df_raw['WorkExp'] <= 50]

# ── Dil sayısı türetme ───────────────────────────────────────
df_raw['DilSayisi'] = df_raw['LanguageHaveWorkedWith'].apply(
    lambda x: len(str(x).split(';'))
)

# ── Aylık maaş ───────────────────────────────────────────────
df_clean = df_raw.copy()
df_clean['MonthlySalaryUSD'] = df_clean['ConvertedCompYearly'] / 12

print(f'Temizlenmiş veri boyutu: {df_clean.shape}')

# ── Özellik (X) ve hedef (y) ─────────────────────────────────
feature_cols = [
    'WorkExp', 'DevType', 'Country', 'EdLevel',
    'RemoteWork', 'OrgSize', 'Industry', 'Employment', 'Age',
    'ICorPM', 'AISelect', 'DilSayisi',
]

categorical_cols = [
    'DevType', 'Country', 'EdLevel', 'RemoteWork', 'OrgSize',
    'Industry', 'Employment', 'Age', 'ICorPM', 'AISelect',
]

X = df_clean[feature_cols]
y = df_clean['MonthlySalaryUSD']

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ],
    remainder='passthrough',
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=RANDOM_STATE
)
print(f'Eğitim seti: {X_train.shape}, Test seti: {X_test.shape}')

# ── XGBoost + GridSearch ─────────────────────────────────────
model_xgb_base = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', xgb.XGBRegressor(random_state=RANDOM_STATE, n_jobs=-1)),
])

param_grid = {
    'regressor__n_estimators': [200, 300, 400],
    'regressor__learning_rate': [0.03, 0.05, 0.1],
    'regressor__max_depth': [3, 4, 5],
}

grid_search = GridSearchCV(
    model_xgb_base, param_grid, cv=3, scoring='r2', n_jobs=-1, verbose=1
)

print('GridSearch başlıyor (birkaç dakika sürebilir)...')
grid_search.fit(X_train, y_train)

print(f'\nEn iyi parametreler: {grid_search.best_params_}')
print(f'En iyi CV R²: {grid_search.best_score_:.4f}')

model = grid_search.best_estimator_
y_pred = model.predict(X_test)

test_r2 = r2_score(y_test, y_pred)
test_mae = mean_absolute_error(y_test, y_pred)
print(f'\nTest R²: {test_r2:.4f}')
print(f'Test MAE: {test_mae:.2f} USD/ay')

# ── Modeli kaydet ────────────────────────────────────────────
models_dir = Path('models')
models_dir.mkdir(exist_ok=True)

MODEL_PATH = models_dir / 'maas_tahmin_modeli.joblib'
joblib.dump(model, MODEL_PATH)
print(f'\nModel kaydedildi: {MODEL_PATH}')

# ── Model bilgisi ────────────────────────────────────────────
USD_TO_TRY = 40

model_bilgisi = {
    'ozellik_sirasi': feature_cols,
    'kategorik_sutunlar': categorical_cols,
    'sayisal_sutunlar': ['WorkExp', 'DilSayisi'],
    'hedef_degisken': 'MonthlySalaryUSD (USD)',
    'usd_to_try_sabit_kur': USD_TO_TRY,
    'test_r2': round(test_r2, 4),
    'test_mae': round(test_mae, 2),
    'best_params': grid_search.best_params_,
}

INFO_PATH = models_dir / 'model_bilgisi.json'
with open(INFO_PATH, 'w', encoding='utf-8') as f:
    json.dump(model_bilgisi, f, ensure_ascii=False, indent=2)
print(f'Model bilgisi kaydedildi: {INFO_PATH}')

# ── Dropdown seçenekleri (options.json) ──────────────────────
options = {}
for col in categorical_cols:
    values = sorted(df_clean[col].dropna().unique().tolist())
    options[col] = values

options['DilSayisi'] = {
    'min': int(df_clean['DilSayisi'].min()),
    'max': int(df_clean['DilSayisi'].max()),
}
options['WorkExp'] = {
    'min': 0,
    'max': 50,
}

server_dir = Path('server')
server_dir.mkdir(exist_ok=True)

OPTIONS_PATH = server_dir / 'options.json'
with open(OPTIONS_PATH, 'w', encoding='utf-8') as f:
    json.dump(options, f, ensure_ascii=False, indent=2)
print(f'Dropdown seçenekleri kaydedildi: {OPTIONS_PATH}')

print('\n✅ Eğitim tamamlandı! Artık backend başlatılabilir.')
