import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import Authentication from "../../Hooks/Authentication";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loader from "../../Loader/Loader";

const SingUp = () => {
  const {
    loading,
    createUser,
    verifyEmail,
    updateUserProfile,
  } = Authentication();

  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state?.form?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data?.email, data?.password)
      .then((result) => {
        const user = result?.user;
        console.log("sing up user", user);

        if (user) {
          updateUserProfile(data?.name)
            .then(() => {
              verifyEmail().then(() => {
                const saveUser = {
                  name: data?.name,
                  email: data?.email,
                };
                fetch(
                  `${import.meta.env.VITE_SERVER_URL}/user`,
                  {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    if (data?.insertedId) {
                      Swal.fire({
                        title: `${user?.displayName} Please Verify Your Account !`,
                        text: "Please cake your email & verify your account ?",
                        icon: "question",
                      });
                      navigate(form, { replace: true });
                    }
                  });
              });
            })
            .catch((errors) => console.log(errors))

            .catch((errors) => console.log(errors));
        }
      })
      .catch((errors) => console.log(errors));
  };

  //password show and hidden
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (!loading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#e0eefa]">
      <UseHelmetTitle title={"Sign Up"} />
      <div className="max-w-full min-h-full">
        <div className="hero max-w-full min-h-screen ">
          <div className="hero-content flex-col  lg:flex-row-reverse">
            <div
              className="card shrink-0 w-[100%] sm:max-w-md 
            shadow-2xl bg-white py-[66px]">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-center">
                  Welcome to Khulna Travellers
                </h1>
                <p className="text-center mt-2">
                  Sign Up to continue
                </p>
              </div>

              {/* social login */}
              <div className="flex justify-center mt-[35px]">
                <SocialLogin />
              </div>

              {/* OR */}

              <div className="">
                <div className=" divider">OR</div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body">
                {/* tis is name field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="name"
                    {...register("name", { required: true })}
                    placeholder="name"
                    className="input input-bordered bg-white"
                    
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-2">
                      name is required
                    </span>
                  )}
                </div>
                {/* tis is email field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="input input-bordered bg-white"
                    
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-2">
                      email is required
                    </span>
                  )}
                </div>

                {/* this is password field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", { 
                      required: "Password is required", 
                      minLength: {
                        value: 6, 
                        message: "Password must be at least 6 characters"
                      },
                      maxLength: {
                        value: 15, 
                        message: "Password must be less than 15 characters"
                      }
                    })}
                    placeholder="Password"
                    className="input input-bordered bg-white"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-2">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn bg-[#0057d9] hover:bg-[#5385cf] 
                    border-none text-white rounded-full"
                    type="submit"
                    value={"Continue"}
                  />
                </div>
                
                <p className="text-center mt-5 text-sm">
                  Already have an account?{" "}
                  <span className="text-[#0057d9] font-bold pl-2">
                    <Link to={"/login"}> Log in</Link>
                  </span>
                </p>
              </form>
            </div>
            <div className="max-w-6xl pr-5 text-center lg:text-left hidden md:block">
              <h1 className="text-5xl font-bold">
                The trip of your dreams starts with Khulna
                Travellers
              </h1>
              <p className="py-6 text-3xl font-[10px]">
                Covering hundreds of destinations and countless
                experiences, Khulna Travellers is your guide for
                traveling better and smarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
