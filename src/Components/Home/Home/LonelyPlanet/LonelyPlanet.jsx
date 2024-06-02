import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Album from "./Album/Album";

const LonelyPlanet = () => {
  return (
    <div>
      <div className="bg-[#0057d9] p-20">
        <div className="max-w-screen-2xl mx-auto flex justify-center xl:justify-between items-center">
          <div className="">
            <h5 className="text-clip text-3xl font-semibold sm:text-5xl text-white">
              <span className="font-bold">#</span>
              khulnatravellers
            </h5>
          </div>
          <div className=" hidden sm:block">
            <div className="flex">
              <div>
                <h4 className="text-xl font-semibold text-white">
                  FOLLOW LONELY PLANET:{" "}
                </h4>
              </div>
              <div className="flex pl-2  text-[30px] text-white gap-2">
                <FaFacebook />
                <FaInstagram />
                <RiTwitterXLine />
                <FaTiktok />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Album />
      <div className="bg-[#0057d9] p-10 text-center">
        <div className=" block sm:hidden">
          <div className="">
            <div>
              <h4 className="text-xl font-semibold text-white">
                FOLLOW LONELY PLANET:{" "}
              </h4>
            </div>
            <div className="flex pl-2  text-[30px] text-white gap-3 mt-2 justify-center">
              <FaFacebook />
              <FaInstagram />
              <RiTwitterXLine />
              <FaTiktok />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LonelyPlanet;
