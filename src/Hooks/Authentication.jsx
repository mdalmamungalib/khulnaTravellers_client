import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider/AuthProvider";

const Authentication = () => {
  const auth = useContext(AuthContext);

  return auth;
};

export default Authentication;
