import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  InputGroup,
  Modal,
} from "react-bootstrap";
import "./OrderForm.css";

const OrderForm = ({ menu }) => {
  const [order, setOrder] = useState({
    name: "",
    address: "",
    phone_number: "",
    start_date: "",
    end_date: "",
    quantity: menu.min_order,
    total_price: menu.price * menu.min_order,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500); // Show modal after 0.5 seconds
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleQuantityChange = (change) => {
    setOrder((prevOrder) => {
      const newQuantity = prevOrder.quantity + change;
      if (newQuantity < menu.min_order) return prevOrder;
      return {
        ...prevOrder,
        quantity: newQuantity,
        total_price: newQuantity * menu.price,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !order.name ||
      !order.phone_number ||
      !order.address ||
      !order.start_date ||
      !order.end_date
    ) {
      setError("Semua kolom harus diisi");
      return;
    }

    if (new Date(order.end_date) < new Date(order.start_date)) {
      setError("End date tidak boleh lebih awal dari start date.");
      return;
    }

    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...order,
          menu_id: menu.id,
          total_price: order.total_price,
          status: "pending",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      setSuccess(true);
    } catch (error) {
      console.error("Error submitting order:", error);
      setError(`Failed to submit order. Please try again. ${error.message}`);
    }
  };

  const handleRedirect = (type) => {
    setShowModal(false);
    if (type === "home") {
      window.location.href = "/"; // Ganti dengan URL beranda Anda
    } else if (type === "whatsapp") {
      const message = `Saya Telah Memesan Paket ${menu.title}\nNama: ${order.name}\nNomor HP: ${order.phone_number}\nAlamat: ${order.address}\nTanggal Awal: ${order.start_date}\nTanggal Akhir: ${order.end_date}\nJumlah: ${order.quantity}\nTotal Harga: Rp ${order.total_price}`;
      const phoneWithCountryCode = "6281324507609"; // Ganti dengan nomor WhatsApp (dengan kode negara) yang benar dan sesuai
      const whatsappLink = `https://web.whatsapp.com/send?phone=${phoneWithCountryCode}&text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappLink, "_blank");
    }
  };

  return (
    <>
      <Card className="order-card mt-4">
        <Card.Body>
          <Card.Title>Order Form</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">Order submitted successfully!</Alert>
          )}
          <Form onSubmit={handleSubmit} className="order-form">
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={order.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    value={order.phone_number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={order.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={order.start_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={order.end_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <InputGroup>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={order.quantity <= menu.min_order}
                >
                  -
                </Button>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={order.quantity}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formTotalPrice">
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="text"
                name="total_price"
                value={`Rp ${order.total_price}`}
                readOnly
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit Order
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Order Anda telah berhasil disubmit. Apa yang ingin Anda lakukan
          selanjutnya?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleRedirect("home")}>
            Kembali ke Beranda
          </Button>
          <Button variant="success" onClick={() => handleRedirect("whatsapp")}>
            Kirim ke WhatsApp
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderForm;
