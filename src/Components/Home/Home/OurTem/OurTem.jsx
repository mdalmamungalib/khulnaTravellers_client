import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./OurTem.css";
import { ImFacebook2 } from "react-icons/im";
import { SlSocialInstagram } from "react-icons/sl";
import { AiFillTikTok } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import Loader from "../../../../Loader/Loader";

const OurTem = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const {
    data: themMember = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["themMember"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/them`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="text-center px-6 py-10 mt-28">
        <h1 className="text-4xl  font-bold">Our them</h1>
        <p className="text-gray-500 max-w-2xl mx-auto my-6">
        Welcome to Khulna Travels! Our dedicated team is passionate about making your travel experiences unforgettable. With a deep love for the rich culture and stunning landscapes of Khulna, we strive to showcase the best our region has to offer. Meet the leaders who ensure your journeys are filled with wonder and excitement
        </p>
      </div>

      <div>
        <Slider {...settings}>
          {themMember.map((member, index) => (
            <div className="card" key={index}>
              <div className="image-content">
                <span className="overlay"></span>
                <div className="card-image">
                  <PhotoProvider>
                    <PhotoView src={member?.imageURL}>
                      <img src={member?.imageURL} className="card-img" />
                    </PhotoView>
                  </PhotoProvider>
                </div>
              </div>
              <div className="card-content">
                <h2 className="name">{member?.name}</h2>
                <p className="description">{member?.role}</p>
                <div className="flex justify-between items-center gap-10 m-6">
                  <Link to={member?.faceBook} target="_blank">
                    <ImFacebook2 className="text-4xl text-[#1877F2]" />
                  </Link>
                  <Link to={member?.instaGram} target="_blank">
                    <SlSocialInstagram
                      className="text-5xl text-white"
                      style={{
                        borderRadius: "30%",
                        backgroundImage:
                          "linear-gradient(45deg, #405DE6 0%, #5851DB 10%, #833AB4 20%, #C13584 30%, #E1306C 40%, #FD1D1D 50%, #F56040 60%, #F77737 70%, #FCAF45 80%, #FFDC80 90%)",
                      }}
                    />
                  </Link>
                  <Link to={member?.tikTok} target="_blank">
                    <AiFillTikTok className="text-5xl text-[#ff0050]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OurTem;
