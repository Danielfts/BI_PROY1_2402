from joblib import load, dump

import os

class Model:
    MODELS_DIRNAME = 'assets'

    def __init__(self):
        # Load latest model
        models_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), self.MODELS_DIRNAME)
        self.models_list = sorted(os.listdir(models_dir), reverse=True)
        load_path = os.path.join(os.path.dirname(__file__), models_dir, self.models_list[0])
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

    def train(self, data):
        return self.model.fit(data)

    def save(self):
        # Make new version
        latest_version = self.models_list[0].split('-').removeprefix('model-').removesuffix('.pkl')
        new_subversion = int(latest_version.split('.')[1]) + 1
        new_version = latest_version.split('.')[0] + '.' + str(new_subversion)

        # Save model
        dump(self.model, f"{self.MODELS_DIR}/model-{new_version}.pkl")
