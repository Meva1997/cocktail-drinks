import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

  const[searchFilters, setSearchFilters] = useState({
    ingridient: '',
    category: ''
  })


  const {pathname} = useLocation(); // Get the current location to determine the active route

  // Use useMemo to determine if the current route is the home page
  const isHome = useMemo(() => pathname === '/' ,[pathname])
  const fetchCategories = useAppStore((state) => state.fetchCategories); // Get the fetchCategories action from the store
  const categories = useAppStore((state) => state.categories); // Get the categories from the store
  const searchRecipes = useAppStore((state) => state.searchRecipes); // Get the categories from the store
  const showNotification = useAppStore((state) => state.showNotification)

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories()
  }, [fetchCategories]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(Object.values(searchFilters).includes('')){
      showNotification({
        text: "Fill in All Fields",
        error: true
      })
      return
    }

    //consultar recetas
    searchRecipes(searchFilters)
  }

  return (

    <header className={isHome ? "bg-[url('/bg.jpg')] bg-no-repeat bg-cover": "bg-slate-800"}>
      <div className="container px-5 py-16 mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <img src="/logo.svg" alt="logo" className="w-32" />
          </div>
          <nav className="flex gap-4">
            {/* // Use NavLink to create links that can be styled based on the active route */}
            <NavLink to="/" className={({isActive}) => isActive ? "font-bold uppercase text-orange-400" : "font-bold text-white uppercase cursor-pointer hover:text-orange-400" }>Main Page</NavLink>
            <NavLink to="/favorites" className={({isActive}) => isActive ? "font-bold uppercase text-orange-400" : "font-bold text-white uppercase cursor-pointer hover:text-orange-400"}>Favorites</NavLink>
            <NavLink to="/ai" className={({isActive}) => isActive ? "font-bold uppercase text-orange-400" : "font-bold text-white uppercase cursor-pointer hover:text-orange-400"}>AI Recipe</NavLink>
          </nav>
        </div>
        
        {/* Show the search form only on the home page */}
        {isHome && (
          <form action="" className="p-10 my-32 space-y-6 bg-orange-400 rounded-lg shadow-lg md:w-1/2 2xl:w-1/3" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label htmlFor="ingridient" className="block text-lg font-extrabold text-white uppercase">Name or Ingridient</label>
              <input type="text" id="ingridient" name="ingridient" className="w-full p-3 bg-white rounded-lg focus:outline-none" placeholder="Name or Ingridient. Ex. Vodka, Tequila, coffee" onChange={handleChange} value={searchFilters.ingridient}/>
            </div>
            <div className="space-y-4">
              <label htmlFor="category" className="block text-lg font-extrabold text-white uppercase">Category</label>
              <select id="category" name="category" className="w-full p-3 bg-white rounded-lg focus:outline-none" onChange={handleChange} value={searchFilters.category}>
                <option value="">--Select a Category--</option> 
                {categories.drinks.map(category => (
                  <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                ))}
              </select>
            </div>
            <input type="submit" value="Search recipe" className="w-full p-2 font-extrabold text-center text-white uppercase bg-orange-800 rounded-lg cursor-pointer hover:bg-orange-900" />
          </form>
        )}
      </div>
    </header>
  )
}
