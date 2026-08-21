
import {Routes,Route} from "react-router"
import './App.css'
import Home from "./pages/Home"
import About from "./pages/About"
import NavBar from "./components/NavBar"
import RecipeForm from "./pages/RecipeForm"
import RecipeDetial from "./pages/RecipeDetial"
import Register from "./pages/Register"
import Login from "./pages/LogIn"
function App() {


  return (
    <div className="">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/recipe/create" element={<RecipeForm/>}/>
          <Route path="/recipes/:id" element = {<RecipeDetial/>}/>
          <Route path="/recipe/edit/:id" element={<RecipeForm/>}/>
          <Route path="/sign-up" element={<Register/>}/>
          <Route path="/sign-in" element={<Login/>}/>
        </Routes>

    </div>
  )
}

export default App
