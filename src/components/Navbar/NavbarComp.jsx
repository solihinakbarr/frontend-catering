import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./NavbarComp.css";

const NavbarComp = () => {
  return (
    <>
      <Navbar expand="lg" className="navbar fixed-top">
        <Container>
          <Navbar.Brand href="">
            Tama <span className="span-brand">Catering.</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">
                Homepage
              </Nav.Link>
              <Nav.Link as={NavLink} to="/menu" className="nav-link">
                Menu Catering
              </Nav.Link>
              <Nav.Link as={NavLink} to="/rate" className="nav-link">
                Rating
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
