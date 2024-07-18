import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "./MenuComp.css";

const MenuComp = () => {
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched menus:", data); // Tambahkan log ini untuk debug
        setMenus(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Calculate the indices for slicing the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menus.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(menus.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (id) => {
    navigate(`/description/${id}`);
  };

  const { ref, inView } = useInView({
    triggerOnce: false, // Allow multiple triggers
    threshold: 0.1,
  });

  return (
    <section id="menu">
      <div className="menu-section">
        <h2 className="text-center mt-4 mb-3">Paket yang Tersedia</h2>
        <Container ref={ref}>
          <Row className="menu-grid">
            {currentItems.map((item, index) => (
              <Col key={index} md={3} sm={4} className="mb-4">
                <motion.div
                  className="menu-card-small"
                  style={{
                    backgroundImage: `url(http://localhost:5000/images/${item.image})`,
                  }}
                  onClick={() => handleCardClick(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                ></motion.div>
                <motion.div
                  className="menu-info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                >
                  <h3>{item.title}</h3>
                  <p>
                    Min. Order: {item.min_order} {item.unit}
                  </p>
                  <div className="price">Rp {item.price}</div>
                </motion.div>
              </Col>
            ))}
          </Row>
          <Pagination className="justify-content-center mt-4">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Container>
      </div>
    </section>
  );
};

export default MenuComp;
