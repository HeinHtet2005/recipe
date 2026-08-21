
import {useParams} from "react-router"
import {useEffect} from "react"
export default function RecipeDetial(){




    const  param = useParams();
    const id = param.id;
    console.log(id)

    useEffect(()=>{
         const fetchRecipes = async () => {
         const responses = await fetch(`http://localhost:4000/api/recipes/${id}`);
         if (responses.ok) {   
        const data = await responses.json();
      }
    };
    fetchRecipes();
    },[id])
    return (
        <div>Recipe Detail</div>
    )
}