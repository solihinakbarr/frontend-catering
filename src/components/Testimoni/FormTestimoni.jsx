import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { FaStar } from "react-icons/fa";
// import "./FormTestimoni.css";

const FormTestimoni = () => {
  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    content: "",
    rate: 0,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRateChange = (rate) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.name || !formData.content || formData.rate === 0) {
      setError("Semua kolom harus diisi dan rating harus diberikan");
      return;
    }

    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/testimonis",
        formData
      );

      if (response.status === 201) {
        setSuccess(true);
      } else {
        throw new Error("Failed to submit testimonial");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setError("Gagal mengirim testimoni. Silakan coba lagi.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ width: "100%", maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title>Berikan Testimoni Anda</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">Testimoni berhasil dikirim!</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFamilyName" className="mb-3">
              <Form.Label>Nama Keluarga</Form.Label>
              <Form.Control
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formContent" className="mb-3">
              <Form.Label>Komentar</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRate" className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div className="rate">
                {[...Array(5)].map((star, index) => (
                  <FaStar
                    key={index}
                    className={`star ${index < formData.rate ? "filled" : ""}`}
                    onClick={() => handleRateChange(index + 1)}
                  />
                ))}
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Kirim Testimoni
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormTestimoni;
