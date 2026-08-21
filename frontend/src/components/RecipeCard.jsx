import Ingredients from "./Ingredients";
import { Link } from "react-router";
export default function RecipeCard({ recipe,deleteRecipe }) {
  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg space-y-6 flex justify-between ">
     <div className = "space-y-4">
       <h3 className="text-xl font-bold text-orange-400">
        How To Make {recipe.title}
      </h3>
      <p>Description: </p>
      <p>{recipe.description}</p>
      <Ingredients ingredients={recipe.ingredients}/>
      <p className="text-gray-500 text-sm">
        {recipe.createdAt.toLocaleString()}
      </p>
     </div>
     <div className = "flex items-end space-x-4">
      <Link to={`/recipe/edit/${recipe._id}`}><button className="bg-orange-400 px-4 py-2 text-white font-bold text-md cursor-pointer rounded-lg" type="submit">Edit</button></Link>
      <button className="bg-red-700 px-4 py-2 text-white font-bold text-md cursor-pointer rounded-lg" onClick={()=>deleteRecipe(recipe._id)}>Delete</button>
     </div>

    </div>
  );
}
