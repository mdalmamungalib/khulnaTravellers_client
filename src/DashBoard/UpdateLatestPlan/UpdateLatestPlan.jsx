import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import { PhotoProvider, PhotoView } from "react-photo-view";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import Swal from "sweetalert2";

const UpdateLatestPlan = () => {
  const [preview, setPreview] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_BB_KEY
  }`;
  const update = useLoaderData();
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
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageResponse) => {
          const imageUrl = imageResponse?.data?.display_url;
          const { description, date, title } = data;
          const updatePlan = {
            description,
            date,
            title,
            imageUrl,
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
                .put(`/updatePlan/${update?._id}`, updatePlan)
                .then((res) => {
                  if (res?.data?.acknowledged === true) {
                    if (
                      res &&
                      res?.data?.acknowledged === true
                    ) {
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Plan update Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      navigate("/dashBoard/allLatestPlan");
                    }
                  }
                });
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
      className="w-full max-w-lg flex items-center justify-center 
    h-[820px] mt-10 p-5 rounded-lg bg-[#f6f6f6]">
      <UseHelmetTitle title={"Update latest plan"} />

      <div
        className="container flex items-center justify-center 
        min-h-screen px-6 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg">
          <div className="flex justify-center mx-auto">
            <h1>Please update your plan...</h1>
          </div>
          {/* Title input field */}
          <div className="relative flex items-center mt-8">
            <input
              {...register("title")}
              defaultValue={update?.title}
              type="text"
              className="block w-full py-3 text-gray-700 bg-white 
                border rounded-lg px-5  border-none   dark:text-gray-700
                 dark:border-gray-600 focus:border-blue-400 
                 dark:focus:border-blue-300 focus:ring-blue-300 
                 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Title"
            />
          </div>
          <div className="relative flex items-center mt-8">
            <div
              className="w-full "
              style={{ height: "100px", overflow: "hidden" }}>
              {preview ? (
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
              ) : (
                <PhotoProvider>
                  <PhotoView src={update?.imageUrl}>
                    <img
                      src={update?.imageUrl}
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
              )}
            </div>
          </div>
          {/* image upload input field */}

          <div className="relative flex items-center mt-6">
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className=" w-full max-w-xs block  py-3  bg-white 
              border rounded-lg px-5  border-none   
               dark:border-gray-600 focus:border-blue-400 
               dark:focus:border-blue-300 focus:ring-blue-300 
               focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(event) =>
                handleImageChange(event.target.files[0])
              }
            />
          </div>

          {/* Description input field */}
          <div className="relative flex items-center mt-6">
            <input
              {...register("date")}
              defaultValue={update?.date}
              type="Text"
              className="block w-full py-3 text-gray-700 
                bg-white border rounded-lg px-5  border-none 
                  dark:text-gray-700 dark:border-gray-600 
                focus:border-blue-400 dark:focus:border-blue-300 
                focus:ring-blue-300 focus:outline-none focus:ring 
                focus:ring-opacity-40"
              placeholder="Date"
            />
          </div>

          <div className="mt-6">
            <textarea
              {...register("description")}
              defaultValue={update?.description}
              className="  block w-full min-h-[220px] py-3 text-gray-700 
                bg-white border rounded-lg px-5  border-none 
                  dark:text-gray-700 dark:border-gray-600 
                focus:border-blue-400 dark:focus:border-blue-300 
                focus:ring-blue-300 focus:outline-none focus:ring 
                focus:ring-opacity-40"
              placeholder="Description"></textarea>
            <input
              value={"Update Plan"}
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

export default UpdateLatestPlan;
