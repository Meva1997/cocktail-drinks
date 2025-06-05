import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length ,[favorites])

  return (
    <>
    
    <h1 className="text-6xl font-extrabold">Favorites</h1>

    {hasFavorites ? (
      <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto my-10 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map(drink => (
          <DrinkCard
            key={drink.idDrink}
            drink={drink}
          />
        ))}
      </div>
    ) : (
      <p className="my-10 text-2xl text-center text-orange-600 animate-bounce">Your favorites will apear here...</p>
    )}
    </>
  )
}

