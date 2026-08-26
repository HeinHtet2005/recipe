import { useContext  } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../helpers/axios"


export default function NavBar() {
const navigate = useNavigate();
const logout = async ()=>{
 const res = await axios.post("/api/users/logout");
 if(res.status ==200){
    navigate("/sign-in")
 }else{
  console.log("error")
 }

}

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-between items-center h-16 cursor-pointer text-orange-500 font-bold">
          <div><Link to="/">Recipe</Link></div>
          <ul className="flex space-x-10">
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/about">About</Link></li>
            <li><Link to="/recipe/create">Create</Link></li>
            <li> <Link to="/sign-up">Register</Link></li>
           <li> <Link to="/sign-in">Log In</Link></li>
           <li><button onClick={logout}>Logout</button></li>
          </ul>
        </div>
        
      </div>
    </nav>
  );
}
