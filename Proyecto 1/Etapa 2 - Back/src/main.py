from fastapi import FastAPI, HTTPException
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
    if len(data.Textos_espanol) != len(data.sdg):
        raise HTTPException(status_code=400, detail='Data and labels must have the same length')
    return model.train(data.Textos_espanol, data.sdg)

@app.get('/version')
def version():
    return {'version': model.model_version}

@app.post('/rollback')
def rollback():
    version = model.rollback()
    return {'message': f"Model rolled back to version {version}"}

@app.delete('/reset', status_code=204)
def reset():
    model.reset() 
    return {'message': 'Model reset successfully'}

