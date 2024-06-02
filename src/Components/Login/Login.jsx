import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Authentication from "../../Hooks/Authentication";
import Swal from "sweetalert2";
import { useState } from "react";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { loginUser, resetPassword } = Authentication();
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form?.pathname || "/";
  const [userEmail, setUserEmail] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          title: "Login Successful!",
          text: `Welcome ${user.displayName}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(form, { replace: true });
      })
      .catch((error) => console.log(error.message));
  };

  // Forget Password
  const handleForgetPassword = () => {
    resetPassword(userEmail)
      .then(() => {
        alert("Please check your email to reset your password.");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-[#e0eefa]">
      <UseHelmetTitle title={"Login"} />
      <div className="max-w-full min-h-full">
        <div className="hero max-w-full min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-[100%] sm:max-w-md shadow-2xl bg-white py-[66px]">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-center">
                  Welcome to Lonely Planet
                </h1>
                <p className="text-center mt-2">Log in to your account</p>
              </div>

              {/* social login */}
              <div className="flex justify-center mt-[35px]">
                <SocialLogin />
              </div>
              {/* OR */}
              <div className="">
                <div className="divider">OR</div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                {/* Email field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: { 
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address" 
                      } 
                    })}
                    placeholder="Email"
                    className="input input-bordered bg-white"
                    onBlur={(event) => setUserEmail(event.target.value)}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Password field */}
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
                
                <label className="label">
                  <Link
                    onClick={handleForgetPassword}
                    className="label-text-alt hover:text-[#0057d9] text-[#0057d9] font-bold">
                    Forgot password?
                  </Link>
                </label>
                <div className="form-control mt-6">
                  <input
                    className="btn bg-[#0057d9] hover:bg-[#5385cf] border-none text-white rounded-full"
                    type="submit"
                    value="Continue"
                  />
                </div>
                <p className="text-center mt-5 text-sm">
                  Don't have an account?{" "}
                  <span className="text-[#0057d9] font-bold pl-2">
                    <Link to="/signUp">Sign up</Link>
                  </span>
                </p>
              </form>
            </div>
            <div className="max-w-6xl pr-5 text-center lg:text-left hidden md:block">
              <h1 className="text-5xl font-bold">
                The trip of your dreams starts with Khulna Travellers
              </h1>
              <p className="py-6 text-3xl font-[10px]">
                Covering hundreds of destinations and countless experiences, Khulna Travellers is your guide for traveling better and smarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
