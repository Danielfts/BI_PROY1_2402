import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Multiple = () => {
  const [predictions, setPredictions] = useState([]);
  const navigate = useNavigate(); // Hook de navegación

  const handlePredict = () => {
    // Simulación de predicciones para varios textos
    const simulatedPredictions = [
      { text: 'Texto No. 1', value: 3 },
      { text: 'Texto No. 2', value: 4 },
      { text: 'Texto No. 3', value: 3 },
      { text: 'Texto No. 4', value: 5 },
      { text: 'Texto No. 5', value: 5 },
    ];
    setPredictions(simulatedPredictions);
  };

  const goToUnico = () => {
    navigate('/unico'); // Navega a la ruta '/unico'
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
            style={{ color: '#666', textDecoration: 'none' }} 
            onClick={goToUnico} // Navega a "Único" al hacer clic
          >
            Único
          </Button>
          <Button 
            variant="link" 
            className="active" 
            style={{ color: '#000', textDecoration: 'none', borderBottom: '2px solid orange', marginLeft: '20px' }}
          >
            Múltiple
          </Button>
          <Button 
            variant="link" 
            style={{ color: '#666', textDecoration: 'none', marginLeft: '20px' }}
            onClick={goToEntrenar} // Navega a "Entrenar" al hacer clic
          >
            Entrenar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-flex">
          <Form.Control 
            type="text" 
            placeholder="Inserta tu set de datos" 
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
      {predictions.length > 0 && (
        <Row className="mt-4">
          <Col md={12}>
            <Card className="text-center" style={{ borderRadius: '20px', backgroundColor: '#f5f1e9' }}>
              <Card.Body>
                <Table borderless>
                  <tbody>
                    {predictions.map((item, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: 'left', padding: '10px 0', color: '#666' }}>{item.text}</td>
                        <td style={{ textAlign: 'right', padding: '10px 0', color: '#333' }}>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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

export default Multiple;
