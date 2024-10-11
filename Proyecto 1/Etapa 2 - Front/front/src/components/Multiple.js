import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Multiple = () => {
  const [predictions, setPredictions] = useState([]);
  const [file, setFile] = useState(null); // Estado para almacenar el archivo CSV
  const [error, setError] = useState(''); // Estado para manejar el error
  const navigate = useNavigate();

  const handlePredict = () => {
    if (!file) {
      setError('Por favor, sube un archivo CSV antes de predecir.');
      return;
    }
    setError(''); // Limpiar el error si hay un archivo

    // Simulación de predicciones para varios textos (aquí procesarías el CSV)
    const simulatedPredictions = [
      { text: 'Texto No. 1', value: 3 },
      { text: 'Texto No. 2', value: 4 },
      { text: 'Texto No. 3', value: 3 },
      { text: 'Texto No. 4', value: 5 },
      { text: 'Texto No. 5', value: 5 },
    ];
    setPredictions(simulatedPredictions);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const goToUnico = () => {
    navigate('/unico');
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
            style={{ color: '#666', textDecoration: 'none' }} 
            onClick={goToUnico}
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
            onClick={goToEntrenar}
          >
            Entrenar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-flex">
          <Form.Control 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange}
            className="mb-3" 
            style={{ borderRadius: '20px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
          />
          <Button 
            variant="info" 
            onClick={handlePredict} 
            style={{ borderRadius: '20px', marginLeft: '10px', backgroundColor: '#6CC3D5', borderColor: '#6CC3D5', height: '40px' }}
          >
            PREDECIR
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
