import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landing/Landingpage";
import NavbarComp from "./components/Navbar/NavbarComp";
import Description from "./pages/Description/Description";
import FormTestimoni from "./components/Testimoni/FormTestimoni";
import Menuspage from "./pages/Menus/Menuspage";
import Ratepages from "./pages/Rate/Ratepages";

const App = () => {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/menu" element={<Menuspage />} />
        <Route path="/rate" element={<Ratepages />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="/testimoni" element={<FormTestimoni />} />
      </Routes>
    </Router>
  );
};

export default App;
