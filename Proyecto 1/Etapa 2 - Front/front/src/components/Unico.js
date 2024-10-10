import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

const Unico = () => {
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate(); // Hook de navegación

  const handlePredict = () => {
    // Simulación de la predicción
    setPrediction(2);
  };

  const goToMultiple = () => {
    navigate('/multiple'); // Navega a la ruta '/multiple'
  };

  const goToEntrenar = () => {
    navigate('/entrenar'); // Navega a la ruta '/entrenar'
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12} className="d-flex justify-content-start mb-3">
          <Button 
            variant="link" 
            className="active" 
            style={{ color: '#000', textDecoration: 'none', borderBottom: '2px solid orange' }}
          >
            Único
          </Button>
          <Button 
            variant="link" 
            style={{ color: '#666', textDecoration: 'none', marginLeft: '20px' }}
            onClick={goToMultiple} // Navegar a "Múltiples" al hacer clic
          >
            Múltiples
          </Button>
          <Button 
            variant="link" 
            style={{ color: '#666', textDecoration: 'none', marginLeft: '20px' }}
            onClick={goToEntrenar} // Navegar a "Entrenar" al hacer clic
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
            className="mb-3" 
            style={{ borderRadius: '20px', border: '1px solid #ddd', padding: '10px' }}
          />
          <Button 
            variant="info" 
            onClick={handlePredict} 
            style={{ borderRadius: '20px', marginLeft: '10px', backgroundColor: '#6CC3D5', borderColor: '#6CC3D5' }}
          >
            PREDECIR
          </Button>
        </Col>
      </Row>
      {prediction !== null && (
        <Row className="mt-4">
          <Col md={12}>
            <Card className="text-center" style={{ borderRadius: '20px', backgroundColor: '#f5f1e9' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
                  Clase
                </Card.Title>
                <h1 style={{ fontSize: '60px', margin: '0', color: '#333' }}>{prediction}</h1>
                <Card.Text className="text-muted" style={{ marginTop: '10px', fontSize: '14px', color: '#e07b39' }}>
                  Resultado
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
