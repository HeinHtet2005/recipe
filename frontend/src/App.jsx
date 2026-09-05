
import {Routes,Route, Navigate} from "react-router"
import './App.css'
import Home from "./pages/Home"
import About from "./pages/About"
import NavBar from "./components/NavBar"
import RecipeForm from "./pages/RecipeForm"
import { useContext } from "react"

import { AuthContext } from "./contexts/AuthContext"
import Register from "./pages/Register"
import Login from "./pages/LogIn"
function App() {

const {user} = useContext(AuthContext)
  return (
    <div className="">
        <NavBar/>
        <Routes>
          <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/sign-in" replace />}
        />
          <Route 
            path="/about" 
            element={user ? <About /> : <Navigate to="/sign-in" replace />}
          />
          <Route path="/recipe/create" element={user? <RecipeForm/>:<Navigate to="/sign-in" replace />}/>

          <Route path="/recipe/edit/:id" element={<RecipeForm/>}/>
          <Route path="/sign-up" element={!user ?<Register/>:<Navigate to ="/"/>}/>
          <Route path="/sign-in" element={!user ?<Login/>:<Navigate to ="/"/>}/>
        </Routes>

    </div>
  )
}

export default App
