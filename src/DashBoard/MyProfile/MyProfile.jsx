import React from "react";
import Authentication from "../../Hooks/Authentication";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { PhotoProvider, PhotoView } from "react-photo-view";

const MyProfile = () => {
  const { user } = Authentication();

  const [axiosSecure] = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/${user?.email}`
      );

      return res.data;
    },
  });
  console.log("profile data", users);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg overflow-hidden md:max-w-md mx-auto">
      <div className="relative">
        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full flex items-center justify-center text-indigo-500">
          {users?.userImage ? (
            <div className="avatar">
              <div className="w-48 h-48 rounded-full">
                <PhotoProvider>
                  <PhotoView src={users?.userImage}>
                    <img src={users?.userImage} alt={users?.name} />
                  </PhotoView>
                </PhotoProvider>
              </div>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4">
          <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.414 4.586a2 2 0 10-2.828 2.828L12.172 9 7.879 13.293a2 2 0 102.828 2.828L15 11.828V13a1 1 0 102 0V8a1 1 0 00-1-1h-5a1 1 0 100 2h2.172L13.414 8.586zM10 16a4 4 0 110-8 4 4 0 010 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h1 className="text-xl font-bold text-gray-800">{users?.name}</h1>
        <p className="text-gray-500">{users?.email}</p>
        <p className="text-gray-500">{users?.age} years old</p>
        <p className="text-gray-500">{users?.address}</p>
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600">{users?.profession}</p>
        <p className="mt-2 text-gray-600">{users?.education}</p>
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600">{users?.about}</p>
        <Link to={`/dashBoard/editProfile/${users?._id}`}>
          <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
