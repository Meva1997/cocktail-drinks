import { Dialog, Transition } from '@headlessui/react';
import { Fragment, type JSX } from 'react';
import { useAppStore } from '../stores/useAppStore';
import type { Recipe } from '../types';

export default function Modal() {

  const modal = useAppStore((state) => state.modal)
  const closeModal = useAppStore((state) => state.closeModal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe)
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
  const favoriteExists = useAppStore((state) => state.favoriteExists)
  

  const renderIngredients = () => {
    const ingredients : JSX.Element[] = []
    for (let i = 1; i <= 6; i++){
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

      if(ingredient && measure){
        ingredients.push(
          <li key={i} className='text-lg font-normal'>{ingredient} - {measure}</li>
        )
      }
    }
    return ingredients
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="my-5 text-4xl font-extrabold text-center text-orange-500">
                    {selectedRecipe.strDrink}
                  </Dialog.Title>

                  <img src={selectedRecipe.strDrinkThumb} alt={`Image of the Drink: ${selectedRecipe.strDrink}`} className='mx-auto w-96'/>

                  <Dialog.Title as="h3" className="my-5 text-2xl font-extrabold text-gray-900">
                    {renderIngredients()}
                  </Dialog.Title>

                  <Dialog.Title as="h3" className="my-5 text-2xl font-extrabold text-orange-500">
                    Instruccions
                  </Dialog.Title>
                    <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                    <div className='flex max-w-lg gap-10 mx-auto mt-2 justify-evenly'>
                      <button type='button' className='w-full p-3 font-bold text-white uppercase bg-gray-400 border-2 border-gray-700 rounded shadow cursor-pointer hover:bg-gray-700' onClick={closeModal}>Close</button>
                      <button type='button' className='w-full p-3 font-bold text-white uppercase bg-orange-400 border-2 border-orange-700 rounded shadow cursor-pointer hover:bg-orange-700' onClick={() => {
                        handleClickFavorite(selectedRecipe)
                        closeModal()
                      }}>{favoriteExists(selectedRecipe.idDrink) ? "Delete Favorite" : "Add to Favorite"}</button>
                    </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}