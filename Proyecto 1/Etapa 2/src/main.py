from fastapi import FastAPI
from src.lib.prediction_model import Model
from src.lib.data_model import ModelPredictionIn, ModelPredictionOut, ModelTrainIn


app = FastAPI()

@app.get('/')
def ping():
    return {'message': 'Analytics service is running'}


@app.post('/predict', response_model=ModelPredictionOut)
def predict(body: ModelPredictionIn):
    model = Model()
    predictions = model.predict(body.Textos_espanol)
    return {'predictions': predictions}
    

@app.post('/train')
def train(data: ModelTrainIn):
    return {'message': 'Model trained successfully'}
