import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Swal from "sweetalert2";

const AddlatestPlan = () => {
  const [preview, setPreview] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_BB_KEY
  }`;

  // query Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    if (data?.image && data?.image?.length > 0) {
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageResponse) => {
          const { description, date, title } = data;
          const imageUrl = imageResponse?.data?.display_url;
          const newData = {
            description,
            date,
            title,
            imageUrl,
          };

          axiosSecure
            .post("/latestPlan", newData)
            .then((res) => {
              if (res && res?.data?.acknowledged === true) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your Plan Successfully Added",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/dashBoard/allLatestPlan");
              }
            });
        });
    }
  };

  const handleImageChange = (image) => {
    setPreview(window.URL.createObjectURL(image));
  };

  return (
    <section
      className="w-full max-w-lg flex flex-col  justify-center 
    h-[820px] mt-10 p-5 rounded-lg bg-[#f6f6f6]">
      <UseHelmetTitle title={"Add latest plan"} />

      <div
        className="container flex flex-col  justify-center 
        min-h-screen px-6 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg">
          <div className="flex flex-col justify-center mx-auto">
            <h1>Please provide your information..</h1>
          </div>
          {/* Title input field */}
          {/* Title input field */}
          <div className="relative flex flex-col  mt-8">
            <input
              {...register("title", { required: true })}
              type="text"
              className="block w-full py-3 text-gray-700 bg-white 
              border rounded-lg px-5 border-none dark:text-gray-700 
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Title"
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-2">
                Title is required
              </span>
            )}
          </div>
          <div className="relative flex flex-col  mt-8">
            {preview ? (
              <div
                className="w-full "
                style={{ height: "100px", overflow: "hidden" }}>
                <PhotoProvider>
                  <PhotoView src={preview}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "20px",
                      }}
                    />
                  </PhotoView>
                </PhotoProvider>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </div>
            ) : null}
          </div>
          {/* image upload input field */}

          <div className="relative flex flex-col  mt-6">
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className=" block w-full py-3 text-gray-700 bg-white 
              border rounded-lg px-5 border-none dark:text-gray-700 
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(event) =>
                handleImageChange(event.target.files[0])
              }
            />
            {errors.image && (
              <span className="text-red-500 text-sm mt-2">
                image is required
              </span>
            )}
          </div>

          {/* Description input field */}
          <div className="relative flex flex-col  mt-6">
            <input
              {...register("date", { required: true })}
              type="Text"
              className="block w-full py-3 text-gray-700 bg-white 
              border rounded-lg px-5 border-none dark:text-gray-700 
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Date"
            />
            {errors.date && (
              <span className="text-red-500 text-sm mt-2">
                date is required
              </span>
            )}
          </div>

          <div className="mt-6">
            <textarea
              {...register("description", {
                required: true,
              })}
              className="  block w-full min-h-[220px] py-3 text-gray-700 
                bg-white border rounded-lg px-5  border-none 
                  dark:text-gray-700 dark:border-gray-600 
                focus:border-blue-400 dark:focus:border-blue-300 
                focus:ring-blue-300 focus:outline-none focus:ring 
                focus:ring-opacity-40"
              placeholder="Description"></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm mt-2">
                description is required
              </span>
            )}
            <input
              value={"Add Plan"}
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium 
              tracking-wide text-white capitalize transition-colors 
              duration-300 transform bg-blue-500 rounded-lg 
              hover:bg-blue-400 focus:outline-none focus:ring 
              focus:ring-blue-300 focus:ring-opacity-50 mt-6 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddlatestPlan;
