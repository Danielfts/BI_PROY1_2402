# API Documentation

<details><summary>GET / (ping)</summary>

**Description:** Check if the server is running

**Response:** 200 OK

```json
{
    "message": "Analytics service is running"
}
```

</details>


<details><summary>GET /version</summary>

**Description:** Get the version of the API

**Response:** 200 OK

```json
{
    "version": "v1.0"
}
```

</details>


<details><summary>DELETE /reset</summary>

**Description:** Go back to the initial model (v1.0)

**Response:** 204 No Content

</details>


<details><summary>POST /predict</summary>

**Description:** Predict the ODS of a given text

**Request:**

```json
{
  "Textos_espanol": [
    "text 1",
    "text 2",
    ...
  ]
}
```

**Response:** 200 OK

```json
{
    "predictions": [
        {
            "sdg": 3,
            "prob": 1.0
        },
        {
            "sdg": 4,
            "prob": 1.0
        },
        {
            "sdg": 5,
            "prob": 0.999999996375152
        }
    ]
}
```

</details>


<details><summary>POST /train</summary>

**Description:** Train the model with new data and save a new version

**Request:**

```json
{
  "Textos_espanol": [
    "text 1",
    "text 2",
    ...
  ],
  "sdg": [
    3,
    4,
    ...
  ]
}
```

**Response:** 200 OK

```json
{
    "accuracy": 0.982,
    "f1-score": 0.982045128256982,
    "precision": 0.9823029066802651,
    "recall": 0.982,
    "message": "Model trained successfully"
}
```

</details>


<details><summary>POST /rollback</summary>

**Description:** Rollback to the previous version of the model

**Response:** 200 OK

```json
{
    "message": "Model rolled back to version v1.0"
}
```

</details>


# Running the Backend

## Prerequisites

Ensure you have the following installed:
- Python 3.x
- pip (Python package installer)
- venv (Python virtual environment tool)

## Setup

1. Navigate to the backend directory:

    ```sh
    cd "Proyecto 1/Etapa 2 - Back"
    ```

2. Create a Python virtual environment (optional):

    ```sh
    python -m venv venv
    source venv/bin/activate
    ```

3. Install the required dependencies:

    ```sh
    pip install -r requirements.txt
    ```

## Running the Backend

1. Use uvicorn to run the backend application:

    ```sh
    uvicorn src.app:app --reload --port 8080
    ```

2. Check the API documentation at `http://localhost:8080/docs`.

# Testing the Backend

## Using Postman

1. Open Postman.
2. Import the System tests Postman collection: [system-tests.postman_collection.json](./tests/system-tests.postman_collection.json).
3. Run the requests defined in the collection to test the backend endpoints.

## Using Newman

1. Ensure you have Newman installed. If not, install it using npm:

    ```sh
    npm install -g newman
    ```

2. Run the Postman collection using Newman:

    ```sh
    newman run "Proyecto 1/Etapa 2 - Back/tests/system-tests.postman_collection.json"
    ```

This will execute all the tests defined in the Postman collection and provide you with a summary of the results.

> Remember to modify the environment variables in the collection to match your local setup.
