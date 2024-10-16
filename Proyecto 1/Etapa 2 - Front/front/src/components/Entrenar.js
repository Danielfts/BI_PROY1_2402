import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Entrenar = () => {
  const [metrics, setMetrics] = useState(null);
  const [file, setFile] = useState(null); // Estado para almacenar el archivo CSV
  const [error, setError] = useState(''); // Estado para manejar el error
  const navigate = useNavigate();

  const handleTrain = async () => {
    if (!file) {
      setError('Por favor, sube un archivo CSV antes de entrenar.');
      return;
    }
    setError(''); // Limpiar el error si hay un archivo

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/train', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMetrics(response.data); // Actualizar con las métricas devueltas desde el backend
    } catch (err) {
      console.error(err);
      setError('Error al entrenar el modelo. Intenta nuevamente.');
    }
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

  const goToMultiple = () => {
    navigate('/multiple');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12} className="d-flex justify-content-start mb-3">
          <Button variant="link" style={{ color: '#666', textDecoration: 'none' }} onClick={goToUnico}>
            Único
          </Button>
          <Button variant="link" style={{ color: '#666', textDecoration: 'none', marginLeft: '20px' }} onClick={goToMultiple}>
            Múltiple
          </Button>
          <Button variant="link" className="active" style={{ color: '#000', textDecoration: 'none', borderBottom: '2px solid orange', marginLeft: '20px' }}>
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
            onClick={handleTrain} 
            style={{ borderRadius: '20px', marginLeft: '10px', backgroundColor: '#6CC3D5', borderColor: '#6CC3D5', height: '40px' }}
          >
            ENTRENAR
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
      {metrics && (
        <Row className="mt-4">
          <Col md={12}>
            <Card className="text-center" style={{ borderRadius: '20px', backgroundColor: '#f5f1e9' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
                  Métricas
                </Card.Title>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'left', color: '#fff', backgroundColor: '#6CC3D5', borderRadius: '10px', padding: '10px' }}>
                        F1-Score
                      </td>
                      <td style={{ textAlign: 'right', padding: '10px 0', color: '#333' }}>{metrics.f1_score}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left', color: '#fff', backgroundColor: '#6CC3D5', borderRadius: '10px', padding: '10px' }}>
                        Recall
                      </td>
                      <td style={{ textAlign: 'right', padding: '10px 0', color: '#333' }}>{metrics.recall}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left', color: '#fff', backgroundColor: '#6CC3D5', borderRadius: '10px', padding: '10px' }}>
                        Precision
                      </td>
                      <td style={{ textAlign: 'right', padding: '10px 0', color: '#333' }}>{metrics.precision}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left', color: '#fff', backgroundColor: '#6CC3D5', borderRadius: '10px', padding: '10px' }}>
                        Accuracy
                      </td>
                      <td style={{ textAlign: 'right', padding: '10px 0', color: '#333' }}>{metrics.accuracy}</td>
                    </tr>
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

export default Entrenar;

