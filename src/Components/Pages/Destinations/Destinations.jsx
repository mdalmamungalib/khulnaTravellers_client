import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import UseHelmetTitle from "../../../Hooks/UseHelmetTitle";
import { FaSearch } from "react-icons/fa";

const Destinations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
    navigate("/explorePlan", { state: { itemData: item } });
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <Loader />;
  }

 //search plan
  const filteredPlans = latestPlan.filter((plan) =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-screen-2xl mx-auto mt-32 px-5">
      <UseHelmetTitle title={"Destination"} />
      <div className="flex flex-col  sm:flex-row sm:justify-between items-center mb-5">
        <div>
          <h3 className="text-lg text-[#a1787f]">TRAVEL STORIES AND NEWS</h3>
          <h2 className="sm:text-5xl text-3xl font-semibold mt-5 ">
            Explore our latest Plane
          </h2>
        </div>
        <div className="relative w-full sm:w-auto mt-5 sm:mt-0">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full md:w-64 bg-white p-2 pl-10"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div className="mx-auto mt-20 flex flex-wrap gap-10 justify-center px-5">
        {filteredPlans.map((item, index) => (
          <div key={index} className="card2 max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full object-cover"
              src={item?.imageUrl}
              alt={item?.imageUrl}
            />
            <div className="info px-6 py-4">
              <h1 className="font-bold text-2xl mb-2">{item?.title}</h1>
              <p className="text-gray-400 text-base">{item?.date}</p>
              <p className="text-gray-400 text-base">
                {item?.description.slice(0, 65)} <Link to={`/explorePlan/${item.id}`}>more...</Link>
              </p>
              <button
                onClick={() => handleExplorePlan(item)}
                className="mt-4 hover:bg-blue-600 text-xs text-white py-2 px-4 rounded-full"
              >
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
