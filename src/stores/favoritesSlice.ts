import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[]
  handleClickFavorite: (recipe: Recipe) => void
  favoriteExists: (id: Recipe['idDrink']) => boolean
  loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if(get().favoriteExists(recipe.idDrink)){ //chech if a recipe already exists in the favorites array 
      set((state) => ({
        favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
      }))
      createNotificationSlice(set, get, api).showNotification({text: 'Deleted from favorites', error: false})
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe]
      }))
      createNotificationSlice(set, get, api).showNotification({text: 'Added to favorites', error: false})
    }
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
  },
  favoriteExists: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  }, 
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem('favorites')
    if(storedFavorites){
      set({
        favorites: JSON.parse(storedFavorites)
      })
    }
  }
})