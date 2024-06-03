import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { ImAmazon } from "react-icons/im";
import Swal from "sweetalert2";

const UpdateThemMember = () => {
  const loaderData = useLoaderData();
  console.log("loader dat", loaderData);
  const [preview, setPreview] = useState("");
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_BB_KEY
  }`;
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data?.image[0]);
    if (data?.image && data?.image?.length > 0) {
      axios.post(url, formData).then((imageResponse) => {
        const imageURL = imageResponse?.data?.data?.display_url;
        const { name, role, faceBook, instaGram, tikTok } = data;
        const updateData = {
          name,
          role,
          faceBook,
          instaGram,
          tikTok,
          imageURL,
        };

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Update it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure
              .put(`/updateThemMember/${loaderData?._id}`, updateData)
              .then((res) => {
                if (res.data.acknowledged === true) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Your them member ${name} has success fully Update`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/dashBoard/allThemMember");
                }
              });
          }
        });

        console.log(updateData);
      });
    }
  };

  const handleImageChange = (image) => {
    setPreview(window.URL.createObjectURL(image));
  };
  return (
    <section
      className="w-full max-w-lg flex items-center justify-center 
 h-[820px] mt-10 p-5 rounded-lg bg-[#f6f6f6]"
    >
      <UseHelmetTitle title={"Add Them Member"} />

      <div
        className="container flex items-center justify-center 
     min-h-screen px-6 mx-auto"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg py-28"
        >
          <div className="flex justify-center mx-auto">
            <h1>Please provide your them member update information..</h1>
          </div>
          <div className="flex justify-center mx-auto mt-8">
            {preview ? (
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <PhotoProvider>
                    <PhotoView src={preview}>
                      <img src={preview} alt="Preview" />
                    </PhotoView>
                  </PhotoProvider>
                </div>
              </div>
            ) : (
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <PhotoProvider>
                    <PhotoView src={loaderData?.imageURL}>
                      <img src={loaderData?.imageURL} alt="Preview" />
                    </PhotoView>
                  </PhotoProvider>
                </div>
              </div>
            )}
          </div>

          {/* Title input field */}
          <div className="form-control mt-8">
            <input
              {...register("name", { required: true })}
              defaultValue={loaderData?.name}
              type="text"
              className="block w-full py-3 text-gray-700 bg-white 
             border rounded-lg px-5  border-none   dark:text-gray-700
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-2">
                name is required
              </span>
            )}
          </div>

          {/* selector */}
          <div className="form-control mt-8">
            <select
              {...register("role", { required: true })}
              defaultValue={loaderData?.role}
              className="select select-bordered block w-full py-3 text-gray-700 bg-white 
             border rounded-lg px-5  border-none   dark:text-gray-700
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
            >
              <option>Admin</option>
              <option>Moderator</option>
            </select>
          </div>

          {/* image upload input field */}

          <div className="form-control mt-6">
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className=" block w-full py-3 text-gray-700 bg-white 
           border rounded-lg px-5  border-none   dark:text-gray-700
            dark:border-gray-600 focus:border-blue-400 
            dark:focus:border-blue-300 focus:ring-blue-300 
            focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(event) => handleImageChange(event.target.files[0])}
            />
            {errors.image && (
              <span className="text-red-500 text-sm mt-2">
                image is required
              </span>
            )}
          </div>

          {/* faceBook input field */}
          <div className="form-control mt-6">
            <input
              {...register("faceBook", { required: true })}
              defaultValue={loaderData?.faceBook}
              type="Text"
              className="block w-full py-3 text-gray-700 
             bg-white border rounded-lg px-5  border-none 
               dark:text-gray-700 dark:border-gray-600 
             focus:border-blue-400 dark:focus:border-blue-300 
             focus:ring-blue-300 focus:outline-none focus:ring 
             focus:ring-opacity-40"
              placeholder="FaceBook Link"
            />
            {errors.faceBook && (
              <span className="text-red-500 text-sm mt-2">
                faceBook is required
              </span>
            )}
          </div>
          {/* instaGram input field */}
          <div className="form-control mt-6">
            <input
              {...register("instaGram")}
              defaultValue={loaderData?.instaGram}
              type="Text"
              className="block w-full py-3 text-gray-700 
             bg-white border rounded-lg px-5  border-none 
               dark:text-gray-700 dark:border-gray-600 
             focus:border-blue-400 dark:focus:border-blue-300 
             focus:ring-blue-300 focus:outline-none focus:ring 
             focus:ring-opacity-40"
              placeholder="Instagram Link"
            />
            
          </div>
          {/* tikTok input field */}
          <div className="form-control mt-6">
            <input
              {...register("tikTok")}
              defaultValue={loaderData?.tikTok}
              type="Text"
              className="block w-full py-3 text-gray-700 
             bg-white border rounded-lg px-5  border-none 
               dark:text-gray-700 dark:border-gray-600 
             focus:border-blue-400 dark:focus:border-blue-300 
             focus:ring-blue-300 focus:outline-none focus:ring 
             focus:ring-opacity-40"
              placeholder="TikTok Link"
            />
          </div>
          <input
            value={"Add A Member"}
            type="submit"
            className="w-full px-6 py-3 text-sm font-medium 
           tracking-wide text-white capitalize transition-colors 
           duration-300 transform bg-blue-500 rounded-lg 
           hover:bg-blue-400 focus:outline-none focus:ring 
           focus:ring-blue-300 focus:ring-opacity-50 mt-6 cursor-pointer"
          />
        </form>
      </div>
    </section>
  );
};

export default UpdateThemMember;
