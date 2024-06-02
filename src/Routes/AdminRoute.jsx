import React from "react";
import Authentication from "../Hooks/Authentication";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import Loader from "../Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = Authentication();
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log("admin rout console",isAdmin)
  const location = useLocation();
  if (isAdminLoading || loading) {
    return <Loader/>;
  }
  if (user && isAdmin?.admin === true) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      state={{ from: location }}
      replace></Navigate>
  );
};

export default AdminRoute;
