import { useLocation, Navigate } from "react-router-dom";
import Authentication from "../Hooks/Authentication";
import Loader from "../Loader/Loader";

const PrivetRout = ({ children }) => {
  const { user, loading } = Authentication();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user && user.emailVerified === true) {
    return children;
  }

  return (
    <Navigate
      to={"/login"}
      state={{ from: location }}
      replace></Navigate>
  );
};

export default PrivetRout;
