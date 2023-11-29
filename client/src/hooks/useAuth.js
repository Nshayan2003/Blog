import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  //  useContext(AuthContext)
  return useContext(AuthContext);
};

export default useAuth;
