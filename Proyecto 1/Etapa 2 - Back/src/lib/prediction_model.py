from joblib import load
from cloudpickle import dumps

from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score, classification_report

import pandas as pd
import os

class Model:
    ASSETS_DIRNAME = 'assets'

    def __init__(self):
        # Load latest model
        self.models_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), self.ASSETS_DIRNAME)
        self.validation_loaded = False
        self.__load_model()

    def __load_validation_data(self):
        # Load validation data
        validation_data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), self.ASSETS_DIRNAME, 'validation-data.csv')
        validation_df = pd.read_csv(validation_data_path)
        self.x_validation = validation_df['Textos_espanol']
        self.y_validation = validation_df['sdg']
        self.validation_loaded = True

    def __load_model(self):
        self.models_list = sorted([x for x in os.listdir(self.models_dir) if 'model-' in x], reverse=True)
        load_path = os.path.join(os.path.dirname(__file__), self.models_dir, self.models_list[0])
        self.model_version = self.models_list[0].removeprefix('model-').removesuffix('.pkl')
        self.model = load(load_path)
        self.class_index = {i: self.model.classes_[i] for i in range(len(self.model.classes_))}

    def __get_prediction_result(self, class_probabilities):
        class_probabilities = list(class_probabilities)
        max_prob = max(class_probabilities)

        return {
            'sdg': self.class_index[class_probabilities.index(max_prob)],
            'prob': max_prob
        }

    def predict(self, text):
        probabilities = list(self.model.predict_proba(text))
        results = map(self.__get_prediction_result, probabilities)
        return list(results)

    def train(self, data, labels):
        if not self.validation_loaded:
            self.__load_validation_data()

        vectorized_result = self.model.named_steps['preprocessing'].transform(data)
        self.model.named_steps['clf'].partial_fit(vectorized_result, labels, classes=self.model.named_steps['clf'].classes_)

        # Evaluate model
        y_pred = self.model.predict(self.x_validation)
        accuracy = accuracy_score(self.y_validation, y_pred)
        f1 = f1_score(self.y_validation, y_pred, average='weighted')
        precision = precision_score(self.y_validation, y_pred, average='weighted')
        recall = recall_score(self.y_validation, y_pred, average='weighted')

        self.save()

        return {
            'accuracy': float(accuracy),
            'f1_score': float(f1),
            'precision': float(precision),
            'recall': float(recall),
            'message': 'Model trained successfully'
        }

    def save(self):
        # Make new version
        latest_version = self.models_list[0].removeprefix('model-').removesuffix('.pkl')
        new_subversion = int(latest_version.split('.')[1]) + 1
        new_version = latest_version.split('.')[0] + '.' + str(new_subversion)
        self.model_version = new_version

        # Save model
        with open(f"{self.models_dir}/model-{new_version}.pkl", 'wb') as f:
            f.write(dumps(self.model))
        print(f"Model saved as version {new_version}")
        self.__load_model()

    def rollback(self):
        if len(self.models_list) > 1:
            os.remove(os.path.join(self.models_dir, self.models_list[0]))
            self.__load_model()
        return self.model_version

    def reset(self):
        for model in self.models_list[:-1]:
           if 'v1.0' in model:
               continue
           os.remove(os.path.join(self.models_dir, model))
        self.__load_model()
