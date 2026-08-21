export default function Ingredients({ingredients}){
    return (
         <div className="flex space-x-2">
        Ingredients - 
        {!!ingredients.length && ingredients.map((ingredient, index) => (
          <span
            className="bg-orange-400 text-white px-2 py-1 rounded-full text-sm"
            key={index}
          >
            {ingredient}
          </span>
        ))}
      </div>
    )
}