import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"


type DrinkCardProps = {
  drink: Drink
}

export default function DrinkCard({drink} : DrinkCardProps) {

  const selectRecipe = useAppStore((state) => state.selectRecipe)

  return (

    <div className="border-4 border-orange-400 rounded-lg shadow-2xl">
      <div className="overflow-hidden ">
        <img src={drink.strDrinkThumb} alt={`Image of ${drink.strDrink}`} className="mx-auto transition-all hover:scale-110 hover:rotate-2"/>
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-black truncate">{drink.strDrink}</h2>
        <button type="button" className="w-full p-3 mt-5 text-lg font-bold text-white bg-orange-400 cursor-pointer hover:bg-orange-500"
          onClick={() => selectRecipe(drink.idDrink)}
        >Recipe</button>
      </div>
    </div>

  )
}
