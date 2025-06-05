import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import type { SearchFilter, Drink } from "../types";

export async function getCategories(){

  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const {data} = await axios.get(url);
  const result = CategoriesAPIResponseSchema.safeParse(data); // Validate the response against the schema created using Zod

  if(result.success){
    return result.data // Return the validated data to the recipe slice
  }

}


export async function getRecipes(searchFilters : SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilters.category}&i=${searchFilters.ingridient}&`; 
  const {data} = await axios.get(url)
  const result = DrinksAPIResponse.safeParse(data)
  
  if(result.success){
    return result.data
  }
}

export async function getRecipeByID(id: Drink['idDrink']) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const {data} = await axios.get(url)
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])

  if(result.success){
    return result.data
  }
}