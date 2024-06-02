import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { ImFacebook2 } from "react-icons/im";
import { SlSocialInstagram } from "react-icons/sl";
import { AiFillTikTok } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import Swal from "sweetalert2";

const AllThemMember = () => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: themMember = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["themMember"],
    queryFn: async () => {
      const res = await axiosSecure.get("/them");
      return res?.data;
    },
  });

  //   delete a member
  const handleDeleteMember = (member) => {
    if (member?._id) {
      Swal.fire({
        title: `Are you sure you delete your them member ${member?.name}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .delete(`/deleteAMember/${member?._id}`)
            .then((res) => {
              if (res?.data?.acknowledged === true) {
                Swal.fire({
                  title: "Deleted!",
                  text: `Your them member ${member?.name} has been deleted.`,
                  icon: "success",
                });
                refetch();
              }
            });
        }
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <UseHelmetTitle title={"All-Them Member"} />
      <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
        <div className="flex justify-evenly items-center gap-10  uppercase text-black">
          <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">
            Total users: {themMember.length}
          </h1>
        </div>
        {/* table aria....... */}
        <div className="overflow-x-auto w-full h-full  mt-[38px]">
          <div className="md:flex">
            <table className="table w-full">
              {/* head */}
              <thead
                style={{
                  "border-radius": "15px 15px 0px 0px",
                  background: "#86A789",
                }}
                className="text-white uppercase">
                <tr>
                  <th></th>
                  <th>image</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Facebook Link</th>
                  <th>Instagram Link</th>
                  <th>TikTok Link</th>
                  <th>Edit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {/* row 1 */}
                {themMember.map((aMember, index) => (
                  <tr key={aMember._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <PhotoProvider>
                              <PhotoView src={aMember?.imageURL}>
                                <img src={aMember?.imageURL} />
                              </PhotoView>
                            </PhotoProvider>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">
                        {aMember?.name}
                      </div>
                    </td>
                    {/* todo: change image name */}
                    <th>{aMember?.role}</th>
                    <th>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={`${aMember?.faceBook}`}>
                        <ImFacebook2 className="text-4xl text-[#1877F2]" />
                      </Link>
                    </th>
                    <th>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={`${aMember?.instaGram}`}>
                        <SlSocialInstagram
                          className="text-5xl text-white"
                          style={{
                            borderRadius: "30%",
                            backgroundImage:
                              "linear-gradient(45deg, #405DE6 0%, #5851DB 10%, #833AB4 20%, #C13584 30%, #E1306C 40%, #FD1D1D 50%, #F56040 60%, #F77737 70%, #FCAF45 80%, #FFDC80 90%)",
                          }}
                        />
                      </Link>
                    </th>
                    <th>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={`${aMember?.tikTok}`}>
                        <AiFillTikTok className="text-5xl text-[#ff0050]" />
                      </Link>
                    </th>

                    <th>
                      <td>
                        <button className="text-2xl hover:text-orange-400">
                          <Link
                            to={`/dashBoard/updateMember/${aMember?._id}`}>
                            <FaEdit />
                          </Link>
                        </button>
                      </td>
                    </th>
                    <th>
                      <button
                        onClick={() =>
                          handleDeleteMember(aMember)
                        }
                        className="btn bg-[#B91C1C] border-none 
                      hover:bg-[white] hover:text-[#B91C1C] btn-xs 
                      w-12 h-12 text-white text-lg">
                        <FaTrash></FaTrash>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllThemMember;
