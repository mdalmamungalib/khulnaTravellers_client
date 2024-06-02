import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import Loader from "../../../Loader/Loader";
import UseHelmetTitle from "../../../Hooks/UseHelmetTitle";

const Destinations = () => {
  const navigate = useNavigate();
 
  const {
    data: latestPlan = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["latestPlan"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/allLatestPlan`
      );
      return res.data;
    },
  });

  const handleExplorePlan = (item) => {
    console.log("a single data", item);
    navigate("/explorePlan", {state: { itemData: item }});
    window.scrollTo(0, 0);
  };

  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="max-w-screen-2xl mx-auto mt-32 px-5 ">
      <UseHelmetTitle title={"Destination"} />
      <div>
        <h3 className="text-lg  text-[#a1787f]">
          TRAVEL STORIES AND NEWS
        </h3>
        <h2 className="sm:text-5xl text-3xl font-semibold mt-5 ">
          Explore our latest Plane
        </h2>
      </div>
      <div
        className="  mx-auto mt-20 flex flex-wrap gap-10 
    justify-center  px-5 ">
        {latestPlan.map((item, index) => (
          <div
            key={index}
            className="card2 max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full object-cover"
              src={item?.imageUrl}
              alt={item?.imageUrl}
            />
            <div className="info px-6 py-4">
              <h1 className="font-bold text-2xl mb-2">
                {item?.title}
              </h1>
              <p className="text-gray-400 text-base">
                {item?.date}
              </p>
              <p className="text-gray-400 text-base">
                {item?.description.slice(0, 65)}{" "}
                <Link>more...</Link>
              </p>
              <button
                onClick={() => handleExplorePlan(item)}
                className="mt-4  hover:bg-blue-600 text-xs 
              text-white  py-2 px-4 rounded-full">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="divider mt-28 bg-gray-400 h-px w-full"></div>
    </div>
  );
};

export default Destinations;
