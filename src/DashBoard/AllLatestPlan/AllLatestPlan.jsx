import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../Loader/Loader";

const AllLatestPlan = () => {
  const [axiosSecure] = useAxiosSecure();
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
  console.log(latestPlan);

  // handle delete
  const handleDeletePlan = (plan) => {
    Swal.fire({
      title: `Are you sure Delete ${plan?.title}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/deletePlan/${plan?._id}`)
          .then((res) => {
            console.log("delete result", res)
            if (res?.data?.acknowledged === true) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${plan?.title} has been success fully deleted.`,
                icon: "success",
              });
            }
          });
      }
    });
  };
  const [expandedDescriptions, setExpandedDescriptions] =
    useState({});

  const toggleDescription = (planId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const resetDescription = (planId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [planId]: false,
    }));
  };

  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
      <div className="flex justify-evenly items-center gap-10  uppercase 
      text-black">
          <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">
            Total Latest Plan: {latestPlan.length}
          </h1>
        </div>
    <div className="overflow-x-auto w-full p-5">
      
      
      <table className="table w-full">
        {/* head */}
        <thead style={{
                  "border-radius": "15px 15px 0px 0px",
                  background: "#86A789",
                }} className="text-white ">
          <tr>
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="text-slate-500">
          {latestPlan.map((plan, index) => (
            <tr key={plan._id} >
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <PhotoProvider>
                        <PhotoView src={plan?.imageUrl}>
                          <img src={plan?.imageUrl} alt="" />
                        </PhotoView>
                      </PhotoProvider>
                    </div>
                  </div>
                </div>
              </td>
              <td>{plan?.title}</td>
              <td className="max-w-[200px] ">
                {expandedDescriptions[plan._id] ? (
                  <>
                    {plan.description}
                    <br />
                    <button
                      className="text-blue-600 underline mt-1"
                      onClick={() => resetDescription(plan._id)}>
                      See lese
                    </button>
                  </>
                ) : (
                  <>
                    {plan.description.slice(0, 100)}
                    {plan.description.length > 100 && (
                      <button
                        className="text-blue-600 underline ml-1"
                        onClick={() =>
                          toggleDescription(plan._id)
                        }>
                        See More...
                      </button>
                    )}
                  </>
                )}
              </td>
              <td>{plan?.date}</td>
              <td>
                <button className="text-2xl hover:text-orange-400">
                  <Link
                    to={`/dashBoard/updateLatestPlan/${plan._id}`}>
                    <FaEdit />
                  </Link>
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeletePlan(plan)}
                  className="hover:text-red-600 text-2xl">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
          {/* row 1 */}
        </tbody>
      </table>
    </div>
    
    </div>
  );
};

export default AllLatestPlan;
