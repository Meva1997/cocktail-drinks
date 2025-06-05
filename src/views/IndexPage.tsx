import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"



export default function IndexPage() {

  const drinks = useAppStore((state) => state.drinks) 
  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])

  return (
    <>
      <h1 className="text-6xl font-extrabold">Recipes</h1>

      {hasDrinks ? (
        <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto my-10 md:grid-cols-2 lg:grid-cols-3">
          {drinks.drinks.map((drink) => (
            <DrinkCard 
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className="my-10 text-2xl text-center text-orange-500 animate-pulse">Complete the Search Form to get Recipes...</p>
      )}
    </>
    
  )
}
