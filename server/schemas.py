from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    WorkExp: int = Field(..., ge=0, le=50)
    DevType: str
    Country: str
    EdLevel: str
    RemoteWork: str
    OrgSize: str
    Industry: str
    Employment: str
    Age: str
    ICorPM: str
    AISelect: str
    DilSayisi: int = Field(..., ge=1, le=50)


class PredictResponse(BaseModel):
    monthly_usd: float
    monthly_tl: float
    yearly_usd: float


class QuizSubmission(BaseModel):
    answers: list[int] = Field(..., min_length=15, max_length=15)


class FieldResult(BaseModel):
    name: str
    percentage: float
    raw_score: int
    max_score: int


class QuizResult(BaseModel):
    recommended_field: str
    description: str
    skills: list[str]
    icon: str
    percentages: list[FieldResult]
    roadmap_link: str
    alternative_field: str
    alternative_percentage: float
