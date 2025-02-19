import React from "react";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import About from "./About";
import SareeCarousel from "../components/slider";

const Home = () => {
  return (
    <div>
      <SareeCarousel></SareeCarousel>
      <BestSeller></BestSeller>
      <About></About>
      <OurPolicy></OurPolicy>
    </div>
  );
};

export default Home;
