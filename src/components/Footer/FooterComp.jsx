import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "./FooterComp.css";

const FooterComp = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow multiple triggers
    threshold: 0.1,
  });

  return (
    <footer className="footer">
      <Container>
        <Row ref={ref}>
          <Col className="footer-brand" md="auto" style={{ width: 350 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2>
                Tama <span className="highlight">Catering</span>
              </h2>
              <p className="brand-tagline">
                Penyedia Makanan Catering dengan Pemesanan mudah dan praktis
              </p>
            </motion.div>
          </Col>
          <Col md="auto" className="footer-link-section ms-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h6 className="footer-heading">Menu Lain</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <a href="/register">Buat Akun</a>
                </li>
                <li className="list-group-item">
                  <a href="/properties">Pesan Catering</a>
                </li>
                <li className="list-group-item">
                  <a href="/use-payments">Pembayaran</a>
                </li>
              </ul>
            </motion.div>
          </Col>
          <Col md="auto" className="footer-link-section ms-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h6 className="footer-heading">Explore Us</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <a href="/careers">Our Careers</a>
                </li>
                <li className="list-group-item">
                  <a href="/privacy">Privacy</a>
                </li>
                <li className="list-group-item">
                  <a href="/term">Term & Condition</a>
                </li>
              </ul>
            </motion.div>
          </Col>
          <Col md="auto" className="footer-link-section ms-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h6 className="footer-heading">Hubungi Kami</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <a href="mailto:info@tamacatering.com">
                    info@tamacatering.com
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    href="https://wa.me/6281324507609"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    081-324-507-609
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    href="https://maps.app.goo.gl/Xjpn6ooEfmF5Y76W7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jl. Botani IV No.17, Tanimulya, <br />
                    Kec. Ngamprah, Kabupaten Bandung Barat,
                    <br /> Jawa Barat 40552
                  </a>
                </li>
              </ul>
            </motion.div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center copyrights">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              &copy; 2019 • All rights reserved • Tama Catering
            </motion.div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComp;
