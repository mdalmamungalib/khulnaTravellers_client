import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import Swal from "sweetalert2";
import Loader from "../../Loader/Loader";

const AddBanner = () => {
  const [preview, setPreview] = useState("");
  const [axiosSecure] = useAxiosSecure();

  // get banner
  const {
    data: banner = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBanner");
      return res.data;
    },
  });

  // from
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (image) => {
    setPreview(window.URL.createObjectURL(image));
  };

  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_BB_KEY
  }`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    if (data?.image && data.image.length > 0) {
      axios.post(url, formData).then((imageResponse) => {
        if (imageResponse?.data?.data?.display_url) {
          const imageURL = imageResponse?.data?.data?.display_url;
          const bannerData = { imageURL };
          axiosSecure.post("/addBanner", bannerData).then((res) => {
            reset, refetch(), console.log(" res data", res);
          });
        }
      });
    }
    reset();
  };

  if (isLoading) {
    return <Loader />;
  }
  console.log(banner);

  // handleDelete
  const handleDelete = (data) => {
    console.log("delete user in data", data);
    Swal.fire({
      title: `Are you sure you delete a banner`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteBanner/${data?._id}`).then((res) => {
          if (res?.data?.acknowledged === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `A banner has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <UseHelmetTitle title={"Add-Banner && Preview"} />
      <div
        style={{
          borderRadius: "50px",
          background: "#e0e0e0",
          boxShadow: "39px 39px 77px #bebebe, -39px -39px 77px #ffffff",
        }}
      >
        {preview ? (
          <PhotoProvider>
            <PhotoView src={preview}>
              <img
                src={preview}
                alt="Responsive Image"
                style={{
                  width: "406px",
                  height: "200px", // Set your fixed height here
                  borderRadius: "50px",
                  background: "#e0e0e0",
                  boxShadow: "39px 39px 77px #bebebe, -39px -39px 77px #ffffff",
                  objectFit: "cover", // Ensures the image covers the set dimensions
                }}
              />
            </PhotoView>
          </PhotoProvider>
        ) : null}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border max-w-md p-11 rounded-lg border-none bg-slate-100 mt-8">
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className=" w-full max-w-xs block  py-3  bg-white 
              border rounded-lg px-5  border-none   
               dark:border-gray-600 focus:border-blue-400 
               dark:focus:border-blue-300 focus:ring-blue-300 
               focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={(event) => handleImageChange(event.target.files[0])}
          />
        </div>
        <input
          value={"Add Banner"}
          type="submit"
          className="w-full px-6 py-3 text-sm font-medium 
              tracking-wide text-white capitalize transition-colors 
              duration-300 transform bg-blue-500 rounded-lg 
              hover:bg-blue-400 focus:outline-none focus:ring 
              focus:ring-blue-300 focus:ring-opacity-50 mt-6 cursor-pointer"
        />
      </form>

      <div className="w-full mt-10">
        <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
          <div className="flex justify-evenly items-center gap-10  uppercase text-black">
            <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">
              Total Banner: {banner.length}
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
                  className="text-white uppercase"
                >
                  <tr>
                    <th></th>
                    <th>Banner Image</th>
                    <th>Delete Banner</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {/* row 1 */}
                  {banner.map((banner, index) => (
                    <tr key={banner._id}>
                      <td>{index + 1}</td>
                      <td>
                        <PhotoProvider>
                          <PhotoView src={banner?.imageURL}>
                            <img
                              src={banner?.imageURL}
                              alt=""
                              className="max-w-[600px] h-[100px]"
                            />
                          </PhotoView>
                        </PhotoProvider>
                      </td>

                      <th>
                        <button
                          onClick={() => handleDelete(banner)}
                          className="btn bg-[#B91C1C] border-none 
                      hover:bg-[white] hover:text-[#B91C1C] btn-xs 
                      w-12 h-12 text-white text-lg"
                        >
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
    </>
  );
};

export default AddBanner;
