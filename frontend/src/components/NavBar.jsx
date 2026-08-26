import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";


export default function NavBar() {

const {name} = useContext(AuthContext)
console.log(name)

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
          </ul>
        </div>
        
      </div>
    </nav>
  );
}
