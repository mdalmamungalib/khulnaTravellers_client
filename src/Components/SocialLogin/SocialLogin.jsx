import React from "react";
import Authentication from "../../Hooks/Authentication";
import Swal from "sweetalert2";
import { ImFacebook2 } from "react-icons/im";
import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GithubAuthProvider } from "firebase/auth";
import Loader from "../../Loader/Loader";

const SocialLogin = () => {
  const {
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
    loading,
  } = Authentication();
  const navigate = useNavigate();
  const form = location.state?.form?.pathname || "/";
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result?.user;
        console.log(user);

        const saveUser = {
          name: user?.displayName,
          email: user?.email,
          userImage: user?.photoURL,
          userUID: user?.uid,
          method: user?.providerData[0].providerId,
        };
        console.log("data", user);
        if (user) {
          fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                position: "center",
                title: "Login Successful!",
                text: `Welcome ${user?.displayName}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(form, { replace: true });
            });
        }
        console.log("the result", saveUser);
      })
      .catch((errors) => console.log(errors));
  };

  //faceBook login
  const handleFaceBookLogin = () => {
    signInWithFacebook()
      .then((result) => {
        const user = result?.user;
        const saveUser = {
          name: user?.displayName,
          email: user?.email,
          userImage: user?.photoURL,
          userUID: user?.uid,
          method: user?.providerData[0].providerId,
        };
        if (user) {
          fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                position: "center",
                title: "Login Successful!",
                text: `Welcome ${user?.displayName}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(form, { replace: true });
            });
        }
        console.log("facebook user", saveUser);
      })
      .catch((error) => console.log(error));
  };

  //github login
  const handleGithubLogin = async () => {
   try {
     const result = await signInWithGithub();
     const user = result?.user;
     const credential = GithubAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;

     if (!token) {
       throw new Error("GitHub access token is missing");
     }

     // Fetch the user's email from GitHub
     const emailResponse = await axios.get("https://api.github.com/user/emails", {
       headers: {
         Authorization: `token ${token}`,
       },
     });

     const primaryEmail = emailResponse.data.find(email => email.primary)?.email;

     if (!primaryEmail) {
       throw new Error("No primary email found for GitHub user");
     }

     const saveUser = {
       name: user?.displayName,
       email: primaryEmail || user?.email,
       userImage: user?.photoURL,
       userUID: user?.uid,
       method: user?.providerData[0].providerId,
     };

     const response = await axios.post(
       `${import.meta.env.VITE_SERVER_URL}/user`,
       saveUser,
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );

     Swal.fire({
       position: "center",
       title: "Login Successful!",
       text: `Welcome ${user?.displayName}`,
       icon: "success",
       showConfirmButton: false,
       timer: 1500,
     });

     navigate(form, { replace: true });
   } catch (error) {
     console.error("Error during GitHub login:", error);

     if (error.response) {
       console.error("GitHub API response error:", error.response.data);
     }

     Swal.fire({
       position: "center",
       title: "Login Failed!",
       text: error.message || "An error occurred during GitHub login. Please try again.",
       icon: "error",
       showConfirmButton: true,
     });
   }
 };


  return (
    <div className="flex justify-between gap-3">
      <button
        onClick={handleGoogleLogin}
        className="btn w-auto bg-white hover:bg-[#e7e7e7] 
                border-[#e7e7e7] hover:border-none rounded-full flex ">
        <FcGoogle className="text-2xl" />
      </button>
      <button
        onClick={handleFaceBookLogin}
        className="btn w-auto bg-white hover:bg-[#e7e7e7] 
                border-[#e7e7e7] hover:border-none rounded-full flex ">
        <ImFacebook2 className="text-2xl text-[#1877F2]" />
      </button>
      <button
        onClick={handleGithubLogin}
        className="btn w-auto bg-white hover:bg-[#e7e7e7] 
                border-[#e7e7e7] hover:border-none rounded-full flex ">
        <VscGithub className="text-2xl text-[#4479c5]" />
      </button>
    </div>
  );
};

export default SocialLogin;
