import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../Loader/Loader";

const EditProfile = () => {
  const loaderData = useLoaderData();
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

  const [submitting, setSubmitting] = useState(false); // State to track form submission

  const onSubmit = (data) => {
    setSubmitting(true); // Set submitting to true when form is being submitted

    const formData = new FormData();
    formData.append("image", data?.image[0]);
    if (data?.image && data?.image?.length > 0) {
      axios.post(url, formData).then((imageResponse) => {
        const imageURL = imageResponse?.data?.data?.display_url;
        const { name, email, age, address, profession, education, about } =
          data;
        const updateData = {
          name,
          email,
          userImage: imageURL,
          age,
          address,
          profession,
          education,
          about,
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
              .put(`/updateProfile/${loaderData?._id}`, updateData)
              .then((res) => {
                if (res.data.acknowledged === true) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Your profile success fully update`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/dashBoard/myProfile");
                }
              })
              .finally(() => {
                setSubmitting(false); // Set submitting to false after form submission completes
              });
          } else {
            setSubmitting(false); // Set submitting to false if user cancels the action
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
 h-[1220px] mt-10 p-5 rounded-lg bg-[#f6f6f6]"
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
            <h1>Please provide your profile information..</h1>
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
                    <PhotoView src={loaderData?.userImage}>
                      <img src={loaderData?.userImage} alt="Preview" />
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
                Name is required
              </span>
            )}
          </div>

          {/* email */}
          <div className="form-control mt-8">
            <input
              {...register("email", { required: true })}
              value={loaderData?.email}
              type="text"
              className="block w-full py-3 text-gray-700 bg-white 
             border rounded-lg px-5  border-none   dark:text-gray-700
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Name"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-2">
                Email is required
              </span>
            )}
          </div>

          {/* image upload input field */}

          <div className="form-control mt-8">
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
          <div className="form-control mt-8">
            <input
              {...register("age", { required: true })}
              defaultValue={loaderData?.age}
              type="number"
              className="block w-full py-3 text-gray-700 bg-white 
             border rounded-lg px-5  border-none   dark:text-gray-700
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Age"
            />
            {errors.age && (
              <span className="text-red-500 text-sm mt-2">Age is required</span>
            )}
          </div>
          {/*address*/}
          <div className="form-control mt-8">
            <input
              {...register("address", { required: true })}
              defaultValue={loaderData?.address}
              type="text"
              className="block w-full py-3 text-gray-700 bg-white 
             border rounded-lg px-5  border-none   dark:text-gray-700
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Address"
            />
            {errors.address && (
              <span className="text-red-500 text-sm mt-2">
                Address is required
              </span>
            )}
          </div>
          {/* Profession */}
          <div className="form-control mt-8">
            <input
              {...register("profession", { required: true })}
              defaultValue={loaderData?.profession}
              type="text"
              className="block w-full py-3 text-gray-700 bg-white 
             border rounded-lg px-5  border-none   dark:text-gray-700
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Profession"
            />
            {errors.profession && (
              <span className="text-red-500 text-sm mt-2">
                Profession is required
              </span>
            )}
          </div>

          {/* lest education certificate */}
          <div className="form-control mt-8">
            <input
              {...register("education", { required: true })}
              defaultValue={loaderData?.education}
              type="text"
              className="block w-full py-3 text-gray-700 bg-white 
             border rounded-lg px-5  border-none   dark:text-gray-700
              dark:border-gray-600 focus:border-blue-400 
              dark:focus:border-blue-300 focus:ring-blue-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your lest education certificate "
            />
            {errors.education && (
              <span className="text-red-500 text-sm mt-2">
                Education is required
              </span>
            )}
          </div>
          <div className="form-control mt-8">
            <textarea
              {...register("about", {
                required: true,
              })}

              defaultValue={loaderData?.about}
              className="  block w-full min-h-[220px] py-3 text-gray-700 
                bg-white border rounded-lg px-5  border-none 
                  dark:text-gray-700 dark:border-gray-600 
                focus:border-blue-400 dark:focus:border-blue-300 
                focus:ring-blue-300 focus:outline-none focus:ring 
                focus:ring-opacity-40"
              placeholder="About You "
            ></textarea>
            {errors.about && (
              <span className="text-red-500 text-sm mt-2">
                About You is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mt-6 cursor-pointer flex items-center justify-center"
            disabled={submitting} // Disable the button when submitting
          >
            {submitting ? (
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0l-7 7h4a8 8 0 01-5 13.3l-1.5-1.5A7.973 7.973 0 014 12z"
                ></path>
              </svg>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
