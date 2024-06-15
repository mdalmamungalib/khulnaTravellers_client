import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { SlSocialPintarest } from "react-icons/sl";
import { Link } from "react-router-dom";
import Authentication from "../../Hooks/Authentication";
const Footer = () => {
  const { user } = Authentication();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center  sm:justify-start">
              <h3 className="text-2xl font-bold sm:text-5xl text-[#0057d9]">
                Khulna Travelers
              </h3>
            </div>

            <p className="mt-3 max-w-md text-center leading-relaxed text-[20px] font-medium  sm:max-w-xs sm:text-left">
              For Explorers Everywhere
            </p>

            <p className="mt-8 max-w-md text-center leading-relaxed text-base font-bold  sm:max-w-xs sm:text-left">
              FOLLOW US
            </p>
            <ul className="mt-3 flex justify-center gap-2 sm:justify-start ">
              <li>
                <FaFacebook className="text-3xl text-[#1877f2]" />
              </li>

              <li>
                <FaInstagram className="text-3xl text-[#f00073]" />
              </li>

              <li>
                <RiTwitterXLine className="text-3xl " />
              </li>

              <li>
                <FaYoutube className="text-3xl text-[#ff0000]" />
              </li>

              <li>
                <SlSocialPintarest className="text-3xl text-[#e60023]" />
              </li>
            </ul>
            <p
              className="mt-8 max-w-md text-center leading-relaxed text-[15px] 
            font-bold  sm:max-w-xs sm:text-left">
              BECOME A MEMBER
            </p>
            <div className="flex justify-center  sm:justify-start">
              <h3 className="text-2xl font-bold sm:text-3xl text-[#0057d9]">
                Join the Khulna Travelers
              </h3>
            </div>
            {!user ? (
              <div className="flex justify-center  sm:justify-start mt-5">
                <Link to={"/signUp"}>
                  <button
                    className="btn bg-[#267dff] hover:btn-info border-none
               text-white hover:text-white rounded-full">
                    Create account
                  </button>
                </Link>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium ">
                About Us
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#">
                    Company History
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#">
                    Meet the Team
                  </a>
                </li>

              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium ">
                Our Services
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#">
                    Traveling
                  </a>
                </li>

              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium ">
                Helpful Links
              </p>

              <ul className="mt-8 space-y-4 text-sm">
              

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#">
                    {" "}
                    Support{" "}
                  </a>
                </li>
              
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium ">
                Contact Us
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="flex-1 text-gray-700">
                      john@doe.com
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>

                    <span className="flex-1 text-gray-700">
                      0123456789
                    </span>
                  </a>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                    213 Lane, London, United Kingdom
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-black flex justify-center items-center 
      min-h-[120px] mt-12 pt-6">
        <p className=" text-sm text-white font-bold text-center">
          &copy; {currentYear} Khulna Travel, a Red Ventures
          company. All rights reserved. No part of this site may
          be reproduced without our written permission.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
