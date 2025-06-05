//envolves all the global state management for the application by adding slices of state and actions to update that state.

//create a Zustand store for managing the global state of the application
import { create } from 'zustand'; // Zustand is a small, fast and scalable bearbones state-management solution
import {devtools} from 'zustand/middleware'; // Middleware for Zustand to enhance the store functionality and add devtools support 
import { createRecipeSlice, type RecipesSliceType } from './recipeSlice';
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice';
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice';
import { createAISlice, type AISlice } from './aiSlice';


//set allows us to update the state of the store
// ...a is a rest parameter that allows us to pass any number of arguments to the function as set, get, api 
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({ //add the type of the store
  ...createRecipeSlice(...a), // Spread the recipe slice into the store
  ...createFavoritesSlice(...a), // Spread the recipe slice into the store
  ...createNotificationSlice(...a), // Spread the recipe slice into the store
  ...createAISlice(...a), // Spread the recipe slice into the store
})))

