from joblib import load
from cloudpickle import dumps

from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split

import os

class Model:
    MODELS_DIRNAME = 'assets'

    def __init__(self):
        # Load latest model
        self.models_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), self.MODELS_DIRNAME)
        self.models_list = sorted(os.listdir(self.models_dir), reverse=True)
        self.__load_model()

    def __load_model(self):
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

    def train(self, train_data, test_data):
        # Split data
        x_train, x_test, y_train, y_test = train_test_split(train_data, test_data, test_size=0.25, random_state=42)
        new_model = self.model.fit(x_train, y_train)

        # Evaluate model
        y_pred = new_model.predict(x_test)
        accuracy = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, average='weighted')
        precision = precision_score(y_test, y_pred, average='weighted')
        recall = recall_score(y_test, y_pred, average='weighted')

        self.model = new_model
        self.save()

        return {
            'accuracy': accuracy,
            'f1-score': f1,
            'precision': precision,
            'recall': recall,
            'message': 'Model trained successfully'
        }

    def save(self):
        # Make new version
        latest_version = self.models_list[0].removeprefix('model-').removesuffix('.pkl')
        new_subversion = int(latest_version.split('.')[1]) + 1
        new_version = latest_version.split('.')[0] + '.' + str(new_subversion)

        # Save model
        with open(f"{self.models_dir}/model-{new_version}.pkl", 'wb') as f:
            f.write(dumps(self.model))

    def rollback(self):
        if len(self.models_list) > 1:
            os.remove(os.path.join(self.models_dir, self.models_list[0]))
            self.__load_model()

    def reset(self):
        for model in self.models_list[:-1]:
           os.remove(os.path.join(self.models_dir, model))
        self.__load_model()
