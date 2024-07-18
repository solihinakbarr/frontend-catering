import React, { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import "./RateComp.css";
import TestimonialItem from "./TestimonialItem"; // Komponen terpisah untuk testimonial item

const RateComp = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/testimonis"
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTestimonial = currentPage * itemsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - itemsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  return (
    <div className="rated">
      <Container>
        <h3>Apa Kata Mereka?</h3>
        <div className="rate-comp">
          {currentTestimonials.map((testimonial, index) => (
            <TestimonialItem key={index} testimonial={testimonial} />
          ))}
        </div>
        <Pagination className="justify-content-center mt-4">
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, pageIndex) => (
            <Pagination.Item
              key={pageIndex + 1}
              active={pageIndex + 1 === currentPage}
              onClick={() => handlePageChange(pageIndex + 1)}
            >
              {pageIndex + 1}
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
  );
};

RateComp.propTypes = {
  testimonials: PropTypes.array,
};

export default RateComp;
