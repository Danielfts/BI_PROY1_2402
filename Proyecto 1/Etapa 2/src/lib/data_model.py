from pydantic import BaseModel
from typing import List

class ModelPredictionIn(BaseModel):
    Textos_espanol: List[str]

class ModelPredictionOutUnit(BaseModel):
    sdg: int
    prob: float

class ModelPredictionOut(BaseModel):
    predictions: List[ModelPredictionOutUnit]

class ModelTrainUnit(BaseModel):
    Textos_espanol: str
    sdg: int

class ModelTrainIn(BaseModel):
    data: List[ModelTrainUnit]
