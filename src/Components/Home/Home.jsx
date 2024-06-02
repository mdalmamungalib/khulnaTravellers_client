import Banner from "./Home/Banner/Banner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HomeCard from "./Home/HomeCard/HomeCard";
import Video from "./Home/Video/Video";
import ExploreTraveling from "./Home/ExploreTraveling/ExploreTraveling";
import MiddleBanner from "./Home/MiddleBanner/MiddleBanner";
import LonelyPlanet from "./Home/LonelyPlanet/LonelyPlanet";
import OurTem from "./Home/OurTem/OurTem";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import { useState } from "react";

const Home = () => {
  

  return (
    <div className="overflow-hidden">
      
      <UseHelmetTitle title={"Home"} />
      <Banner />
      {/* <CardSection/> */}
      <ExploreTraveling />
      <Video />
      <OurTem />
      {/* <HomeCard /> */}
      <MiddleBanner />
      <LonelyPlanet />
    </div>
  );
};

export default Home;
