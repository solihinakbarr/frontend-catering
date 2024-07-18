import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const TestimonialItem = ({ testimonial }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Set to false to allow multiple triggers
    threshold: 0.1,
  });

  const getStarRating = (rate) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else {
        stars.push(<FaStar key={i} className="star" />);
      }
    }
    return stars;
  };

  const getStarColor = (rate) => {
    if (rate >= 4) {
      return "green";
    } else if (rate >= 2) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 20,
      }}
      transition={{ duration: 0.5 }}
      className="testimonial-item"
    >
      <div className="username">{testimonial.name}</div>
      <div className={`stars ${getStarColor(testimonial.rate)}`}>
        {getStarRating(testimonial.rate)}
      </div>
      <div className="comment">{testimonial.content}</div>
      <div className="family-info">
        <strong>{testimonial.familyName}</strong>,{" "}
        {testimonial.familyOccupation}
      </div>
    </motion.div>
  );
};

export default TestimonialItem;
