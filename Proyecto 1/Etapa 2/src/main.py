from fastapi import FastAPI
from src.lib.prediction_model import Model
from src.lib.data_model import ModelPredictionIn, ModelPredictionOut, ModelTrainIn

app = FastAPI()
model = Model()

@app.get('/')
def ping():
    return {'message': 'Analytics service is running'}


@app.post('/predict', response_model=ModelPredictionOut)
def predict(body: ModelPredictionIn):
    predictions = model.predict(body.Textos_espanol)
    return {'predictions': predictions}

@app.post('/train')
def train(data: ModelTrainIn):
    return model.train(data.Textos_espanol, data.sdg)

@app.post('/rollback')
def rollback():
    version = model.rollback()
    return {'message': f"Model rolled back to version {version}"}

@app.delete('/reset', status_code=204)
def reset():
    model.reset() 
    return {'message': 'Model reset successfully'}

