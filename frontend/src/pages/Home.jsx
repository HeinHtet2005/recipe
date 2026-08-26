import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import { useLocation,useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "../helpers/axios";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [error,setError] = useState('')
  const [links,setLinks] = useState(null)
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search);
  
  let page = searchQuery.get('page');
  page = parseInt(page)?parseInt(page):1;
  

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get("/api/recipes?page="+page);
      if (response.status === 200) {
        const data = response.data;
        setRecipes(data.data);
        setLinks(data.links)
        window.scroll({top:0,left:0, behavior:"smooth"})
      }
    };
    fetchRecipes();
  }, [page]);


  const deleteRecipe = async (id)=>{
    if(!id){
      setError("Invalid recipe ID")
      return
    }

   
    const response = await axios.delete(`/api/recipes/${id}`)

    if(response.status == '200'){
      console.log(id," is deleted")

       if(recipes.length ==1 && page>1){
      navigate('/?page='+(page-1))
    }else{
      setRecipes((prev)=>prev.filter((recipe)=> recipe._id !== id))
    }
     
    }else{
      setError("Failed to delete recipe")
      return;
    }

  }

  return (
    <div className="p-5 space-y-4">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id || recipe._id} deleteRecipe = {deleteRecipe} />
        ))
      ) : (
        <div>There are no recipes to display.</div>
      )}
     
      {!!links &&  <Pagination links = {links} page={page || 1}/>}
      {error &&<p className= "text-red-600 text-md">{error}</p>}
    </div>
  );
}
