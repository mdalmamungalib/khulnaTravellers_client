import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./ExplorePlan.css";
import { IoArrowBackSharp } from "react-icons/io5";
import UseHelmetTitle from "../../../Hooks/UseHelmetTitle";

const ExplorePlan = () => {
  const location = useLocation();
  const itemData = location.state?.itemData;

  const { title, date, description, imageUrl } = itemData;
  return (
    <div className="relative mx-auto mt-32 px-0 sm:px-5">
      <UseHelmetTitle title={"ExplorePlan"} />
      <div className="relative overflow-hidden rounded-none sm:rounded-3xl">
        <div
          className="absolute inset-0 bg-black bg-opacity-30 
        rounded-none sm:rounded-3xl pointer-events-none z-10"></div>
        <img
          className="min-w-full max-h-[575px] object-cover 
          rounded-none sm:rounded-3xl"
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="max-w-screen-2xl mx-auto mt-8  lg:mt-16  px-3 sm:px-0">
        <h1
          className="lg:inline text-3xl lg:text-6xl
         text-[#0057d9] font-bold">
          {title}
          <span className="text-base text-slate-700">
            {" "}
            Date: {date}
          </span>
        </h1>
        <p className="max-w-2xl min-h-[90px] my-6  leading-loose text-black-400 text-sm lg:text-lg">
          {description}
        </p>
        <div className="max-w-screen-sm flex justify-end">
          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost border border-gray-500 
        hover:bg-sky-600 hover:text-white rounded-full">
            <IoArrowBackSharp className="text-xl" /> Back page
          </button>
        </div>
        <div className="divider mt-28 bg-gray-400 h-px w-full"></div>
      </div>
    </div>
  );
};

export default ExplorePlan;
