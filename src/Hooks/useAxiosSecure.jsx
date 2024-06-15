import React, { useEffect } from "react";
import axios from "axios";
import Authentication from "./Authentication";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = Authentication();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {return res},
      (error) => {
        if (
          error.response.status === 401 ||
          error.response.status === 403
        ) {
          logOut()
            .then(() => {
              Swal.fire({
                icon: "error",
                title: "Warning... Warning...",
                text: "If you are trying to break through the security purpose please don't do it legal action will be taken against you if you are caught.",
                footer:
                  '<a href="#">Why do I have this issue?</a>',
              });
              navigate("/logIn");
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);
  return [axiosSecure];
};

export default useAxiosSecure;
