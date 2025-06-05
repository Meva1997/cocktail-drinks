//slice helps to manage the state of the recipe and divide it into actions and reducers

import type { StateCreator } from "zustand"
import { getCategories, getRecipeByID, getRecipes } from "../services/recipeService" // Import the API function to fetch categories
import type { Categories, Drinks, SearchFilter, Drink, Recipe } from "../types" // Import the Category type

export type RecipesSliceType = {
  categories: Categories
  drinks: Drinks
  selectedRecipe: Recipe
  modal: boolean
  fetchCategories: () => Promise<void>
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>
  selectRecipe: (id: Drink['idDrink']) => Promise<void>
  closeModal: () => void
}

//stateCreator is a function that creates a slice of the store and we add the type of the slice
export const createRecipeSlice : StateCreator<RecipesSliceType> = (set) => ({ //set is a function that allows us to update the state of the store
  categories: {
    drinks: [], // Initialize drinks as an empty array added drinks because it is a part of the Categories type
  }, // Initialize categories as an empty array
  drinks: {
    drinks: []
  },
  selectedRecipe: {} as Recipe,
  modal: false,

  fetchCategories: async () => { // Define the action to fetch categories
    const categories = await getCategories() // Call the API function to fetch categories
    set({
      categories
    })
  },
  searchRecipes: async (searchFilters) =>{
    const drinks =  await getRecipes(searchFilters)
    set({
      drinks
    })
  },
  selectRecipe: async(id) => {
    const selectedRecipe = await getRecipeByID(id)
    set({
      selectedRecipe,
      modal: true
    })
  } ,
  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe
    })
  }
})