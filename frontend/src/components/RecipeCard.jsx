import Ingredients from "./Ingredients";
import { Link } from "react-router";
export default function RecipeCard({ recipe,deleteRecipe }) {
  return (
   <div className="bg-white p-5 rounded-2xl space-y-3" >
            <img className='mx-auto h-64 object-contain' src={import.meta.env.VITE_BACKEND_URL + recipe.photo} alt="" />
            <div className="flex justify-between">
                <h3 className="text-xl font-bold text-orange-400">{recipe.title}</h3>
                <div className='space-x-3'>
                    <Link to={`/recipe/edit/${recipe._id}`} className='bg-yellow-300 px-2 py-1 rounded-lg text-sm'>Edit</Link>
                    <button onClick={()=>deleteRecipe(recipe._id)} className='bg-red-500 px-2 py-1 rounded-lg text-white text-sm'>Delete</button>
                </div>
            </div>
            <p>Description</p>
            <p>{recipe.description}</p>
            <Ingredients ingredients={recipe.ingredients} />
            <p className="text-gray-500">Published at - {recipe.createdAt}</p>
        </div>
  );
}
