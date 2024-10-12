import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Unico = () => {
  const [inputText, setInputText] = useState(''); // Agregué la declaración para inputText
  const [predictions, setPredictions] = useState([]); // Estado para almacenar las predicciones
  const [error, setError] = useState(''); // Estado para manejar el error
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();

  const handlePredict = async () => {
    if (inputText.trim() === '') {  // inputText se utiliza aquí
      setError('Por favor, ingrese un texto antes de predecir.');
      return;
    }

    console.log('Predecir clicado');  // Verificar si la función se ejecuta

    setError('');
    setLoading(true); // Bloquear el botón

    try {
      const response = await axios.post('http://localhost:8080/predict', {
        Textos_espanol: [inputText]  // inputText se utiliza aquí
      });
      console.log('Respuesta:'); // Verificar la respuesta
      console.log(response); 
      setPredictions(response.data.predictions); // Actualizar con las predicciones devueltas
    } catch (err) {
      setError('Error al hacer la predicción.');
    } finally {
      setLoading(false); // Habilitar el botón de nuevo
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);  // setInputText se utiliza aquí
  };

  const goToMultiple = () => {
    navigate('/multiple');
  };

  const goToEntrenar = () => {
    navigate('/entrenar');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12} className="d-flex justify-content-start mb-3">
          <Button 
            variant="link" 
            className="active" 
            style={{ color: '#000', textDecoration: 'none', borderBottom: '2px solid #e07b39' }}
          >
            Único
          </Button>
          <Button 
            variant="link" 
            style={{ color: '#666', textDecoration: 'none', marginLeft: '20px' }}
            onClick={goToMultiple}
          >
            Múltiples
          </Button>
          <Button 
            variant="link" 
            style={{ color: '#666', textDecoration: 'none', marginLeft: '20px' }}
            onClick={goToEntrenar}
          >
            Entrenar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-flex">
          <Form.Control 
            type="text" 
            placeholder="Inserta tu texto" 
            value={inputText} // Enlazar el estado al input
            onChange={handleInputChange} // Manejar el cambio en el input
            className="mb-3" 
            style={{ borderRadius: '20px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
          />
          <Button 
            variant="info" 
            onClick={handlePredict} 
            disabled={loading} // Deshabilitar el botón mientras se carga
            style={{ borderRadius: '20px', marginLeft: '10px', backgroundColor: '#6CC3D5', borderColor: '#6CC3D5', height: '40px' }}
          >
            {loading ? 'Cargando...' : 'PREDECIR'}
          </Button>
        </Col>
      </Row>
      {error && (
        <Row>
          <Col md={12}>
            <Alert variant="danger" style={{ borderRadius: '20px' }}>
              {error}
            </Alert>
          </Col>
        </Row>
      )}
      {predictions.length > 0 && (
        <Row className="mt-4">
          <Col md={12}>
            <Card className="text-center" style={{ borderRadius: '20px', backgroundColor: '#f5f1e9', padding: '20px' }}>
              <Card.Body>
                <Table borderless>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'center', color: '#666' }}>Clase</th>
                      <th style={{ textAlign: 'center', color: '#666' }}>Probabilidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictions.map((prediction, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: 'center', padding: '10px 0', color: '#333' }}>{prediction.sdg}</td>
                        <td style={{ textAlign: 'center', padding: '10px 0', color: '#333' }}>{prediction.prob.toFixed(5)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Card.Text className="text-muted" style={{ marginTop: '10px', fontSize: '14px', color: '#e07b39' }}>
                  Resultados de predicción
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Unico;