import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext();


const AuthReducer = (state,action) =>{
        //state represents data (user)
        //action contains {type,payload}
        switch (action.type) {
            case "LOGIN":
                localStorage.setItem('user',JSON.stringify(action.payload))
                return {user:action.payload};
            case "LOGOUT":
                localStorage.removeItem('user')
                return {user:null}; 
            default:
                return state;
        }
    }
const AuthContextProvider = ({children}) =>{

  const [state,dispatch]=  useReducer(AuthReducer,{user:null});
    useEffect(()=>{
       try{ const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            dispatch({type:'LOGIN',payload:user})
        }else{
            dispatch({type:'LOGOUT'})
        }}catch(e){
            dispatch({type:'LOGOUT'})
        }
    },[])
  
    return (
       < AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider>
    )

}

export {AuthContext,AuthContextProvider}