from pydantic import BaseModel
from typing import List

class ModelPredictionIn(BaseModel):
    Textos_espanol: List[str]

class ModelPredictionOutUnit(BaseModel):
    sdg: int
    prob: float

class ModelPredictionOut(BaseModel):
    predictions: List[ModelPredictionOutUnit]

class ModelTrainIn(BaseModel):
    Textos_espanol: List[str]
    sdg: List[int]

class ModelTrainOut(BaseModel):
    accuracy: float
    f1_score: float
    precision: float
    recall: float
    message: str
