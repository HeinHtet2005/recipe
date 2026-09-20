import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import axios from "../helpers/axios"
const AuthContext = createContext();

const AuthReducer = (state, action) => {
  //state represents data (user)
  //action contains {type,payload}
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });
  useEffect(() => {
    try {

      axios.get("/api/users/me").then((res)=>{
        const user = res.data;
         if (user) {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
      })

     
    } catch (e) {
      dispatch({ type: "LOGOUT" });
      console.log(e.message)
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
