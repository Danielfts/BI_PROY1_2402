from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.lib.prediction_model import Model
from src.lib.data_model import ModelPredictionIn, ModelPredictionOut, ModelTrainIn, ModelTrainOut   
import pandas as pd
from src.lib.data_model import ModelPredictionOutUnit

app = FastAPI()
# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL donde corre el front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = Model()

@app.get('/')
def ping():
    return {'message': 'Analytics service is running'}

@app.post('/predict', response_model=ModelPredictionOut)
def predict(body: ModelPredictionIn):
    predictions = model.predict(body.Textos_espanol)
    return {'predictions': predictions}

@app.post('/predict/multiple', response_model=list[ModelPredictionOutUnit])
def predict_multiple(file: UploadFile = File(...)):
    try:
        # Leer el archivo CSV en un DataFrame de pandas
        df = pd.read_csv(file.file)

        # Asegúrate de que la columna de texto tenga el nombre correcto
        if 'Textos_espanol' not in df.columns:
            raise HTTPException(status_code=400, detail="El archivo CSV debe tener una columna 'Textos_espanol'.")

        # Realiza la predicción en todos los textos
        predictions = model.predict(df['Textos_espanol'].tolist())
        return predictions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post('/train', response_model=ModelTrainOut)
async def train_model(file: UploadFile = File(...)):
    try:
        # Leer el archivo CSV en un DataFrame de pandas
        df = pd.read_csv(file.file)

        # Asegúrate de que las columnas 'Textos_espanol' y 'sdg' existan
        if 'Textos_espanol' not in df.columns or 'sdg' not in df.columns:
            raise HTTPException(status_code=400, detail="El archivo CSV debe tener columnas 'Textos_espanol' y 'sdg'.")

        # Entrenar el modelo
        metrics = model.train(df['Textos_espanol'].tolist(), df['sdg'].tolist())
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

