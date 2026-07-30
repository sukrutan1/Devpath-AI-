<div align="center">
  <img src="readme%20banner/screen.png" alt="DevPath AI Banner" width="100%" />

  <h1>DevPath AI</h1>
  <p><strong>A Next-Generation Software Career Navigator & Salary Predictor</strong></p>

  <br />
  <a href="https://devpath-ai-yerc.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Available-success?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo" />
  </a>
</div>

<br />

## 📖 Project Overview
DevPath AI is a full-stack, data-driven web application designed to guide software developers in their career journeys. Leveraging the **Stack Overflow Developer Survey 2025** data (analyzing over 49,000+ responses), this platform offers two main features:
1. **Salary Prediction**: An AI model trained using XGBoost to predict your potential software engineering salary based on your experience, location, education, and tech stack.
2. **Career Quiz**: A comprehensive 15-question assessment that matches your personality and skills with 9 major software fields (Frontend, Backend, AI/Data, Cloud, etc.) and generates a personalized learning roadmap.

## 🛠️ Tech Stack
This project leverages modern frameworks and machine learning libraries:

### Frontend
- <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
- <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
- <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
- <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />

### Backend & Machine Learning
- <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
- <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
- <img src="https://img.shields.io/badge/XGBoost-000000?style=for-the-badge&logo=xgboost&logoColor=white" />
- <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" />

## 📂 File Structure

```text
ML Internship Project/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── api/                # API client configuration
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Main view routes (Home, Predict, Quiz, Results)
│   │   ├── App.jsx             # Main routing and layout wrapper
│   │   └── index.css           # Global Tailwind & Theme CSS
│   ├── package.json            # Node dependencies
│   └── tailwind.config.js      # Tailwind UI configurations
├── server/                     # Backend Python application
│   ├── main.py                 # FastAPI endpoints & static file serving
│   ├── quiz.py                 # Quiz logic and scoring engine
│   └── schemas.py              # Pydantic data models
├── models/                     # Saved ML models (Joblib)
│   ├── maas_tahmin_modeli.joblib
│   └── model_bilgisi.json
├── readme banner/              # Banner assets for GitHub README
├── stitch_devcareer_navigator/ # UI Mockups and wireframes
├── train_model.py              # ML model training pipeline
└── yazilim_kariyer_rehberi_final_1.ipynb  # Data exploration & Jupyter Notebook
```

## 🚀 Installation & Setup

### Prerequisites
Make sure you have installed on your local machine:
- **Python 3.10+**
- **Node.js 20+**

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd "your-repo-name"
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Train the Machine Learning Model
This script processes the dataset and exports the XGBoost model into the `models/` directory.
```bash
python train_model.py
```

### 4. Setup the Frontend
Install the Node.js packages and build the frontend bundle.
```bash
cd client
npm install
npm run build
cd ..
```

### 5. Run the Application (Production Mode)
This will serve both the backend API and the compiled frontend static files simultaneously on port `8000`.
```bash
python -m uvicorn server.main:app --reload --port 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

---

### 👨‍💻 Development Mode
If you wish to make changes to the frontend and see them update in real-time, run the services separately:

**Terminal 1 (Backend):**
```bash
python -m uvicorn server.main:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
The Vite development server will start at `http://localhost:5173` and automatically proxy API requests to your FastAPI backend.

---
*Developed as part of the Software Persona ML Internship Project.*
