import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import OrderForm from "../../components/Order/OrderForm";
import "./Description.css";

const Description = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/menu/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      }
    };

    fetchMenuDetails();
  }, [id]);

  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
    <section id="description">
      <Container>
        <Row className="mt-4">
          <Col md={6}>
            <Image
              src={`http://localhost:5000/images/${menu.image}`}
              alt={menu.title}
              fluid
            />
            <h2 className="mt-3">{menu.title}</h2>
            <p>{menu.description}</p>
            <div className="menu-details">
              <p>
                <strong>Price:</strong> Rp {menu.price}
              </p>
              <p>
                <strong>Minimum Order:</strong> {menu.min_order} {menu.unit}
              </p>
              <p>
                <strong>Details:</strong> {menu.detail}
              </p>
            </div>
          </Col>
          <Col md={6}>
            <OrderForm menu={menu} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Description;
