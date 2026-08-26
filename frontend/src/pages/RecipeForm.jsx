import { useEffect, useState } from "react";
import plus from "../assets/plus.svg";
import Ingredients from "../components/Ingredients";
import { useNavigate,useParams } from "react-router";
import axios from "../helpers/axios";
export default function RecipeForm() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const addIngredient = () => {
    setIngredient((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const recipe = {
      title,
      description,
      ingredients: ingredient,
    };

    try {
      const response = id ? await axios.patch( "/api/recipes/"+id,recipe):await axios.post("/api/recipes",recipe,);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setErrors(Object.keys(error.response.data.errors));
    } finally {
      setLoading(false);
      setTitle("");
      setDescription("");
      setIngredient([]);
      setNewIngredient("");
    }
  };

  useEffect(()=>{
    const fetchRecipe = async ()=> {
      if(id){
        const response = await axios.get(`/api/recipes/${id}`);
        if(response.status === 200){
          console.log(response.data)
          setTitle(response.data.title)
          setDescription(response.data.description)
          setIngredient(response.data.ingredients)
        }
      }

    }

    fetchRecipe();
  },[id])
  return (
    <div className="mx-auto max-w-md mt-12">
      <h1 className="text-2xl text-orange-400 text-center font-bold">
        { id ? "Update ": "Create "}Recipe
       
      </h1>
      <form action="" className="space-y-5  p-5 " onSubmit={handleSubmit}>
        <ul className = "list-disc">
          {!!errors.length &&
            errors.map((error, index) => <li key={index} className="text-red-500">Requried {error}!</li>)}
        </ul>

        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="recipe description"
          className=""
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Recipe Ingredient"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          <img
            src={plus}
            alt=""
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={addIngredient}
          />
        </div>
        <Ingredients ingredients={ingredient} />
        <button
          type="submit"
          className={`${loading ? "bg-orange-300" : "bg-orange-400 "}px-4 py-2 text-white font-bold text-md cursor-pointer rounded-lg w-full`}
        >
          {loading ? (id ? "Updating..." : "Creating...") : (id ? "Update Recipe" : "Create Recipe")}
        </button>
      </form>
    </div>
  );
}
