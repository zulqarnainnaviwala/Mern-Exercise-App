//custom hook
import { AuthContext } from "../context/AuthContext";

//built-in hook
import { useContext } from "react";
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext  must be used inside an AuthsContextProvider");
  }
  return context;
};
