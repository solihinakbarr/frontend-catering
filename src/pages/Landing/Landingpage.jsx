import React from "react";
import HeroComp from "../../components/Hero/HeroComp";
import MenuComp from "../../components/Menu/MenuComp";
import RateComp from "../../components/Rate/RateComp";
import FooterComp from "../../components/Footer/FooterComp";

const Landingpage = () => {
  return (
    <div>
      <HeroComp />
      <MenuComp />
      <RateComp />
      <FooterComp />
    </div>
  );
};

export default Landingpage;
