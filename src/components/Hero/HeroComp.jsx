import React from "react";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./HeroComp.css";

const HeroComp = () => {
  return (
    <motion.section
      id="home"
      className="hero-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="overlay"></div>
      <div className="hero-content">
        <motion.h1
          className="font-weight-bold line-height-1 mb-3"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Acara spesial Perlu, <br />
          Hidangan Spesial
        </motion.h1>
        <motion.p
          className="mb-3 font-weight-light text-white"
          style={{ lineHeight: "170%" }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Kami Menyediakan Paket Catering untuk membantu Menyiapkan makanan
          dalam acara anda Dengan baik dan praktis
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <Button className="btn-success px-5">Lihat Catering</Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroComp;
