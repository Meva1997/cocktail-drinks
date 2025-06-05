import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useAppStore } from "../stores/useAppStore"
import Notification from "../components/Notification"

export default function Layout() {

  const loadFromStorage =  useAppStore((state) => state.loadFromStorage)
  
  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])
  
  return (

    <>
      
      <Header />
      {/* The Outlet component renders the child routes defined in the router */}

      {/* This is where the child routes will be rendered */}
      <main className="container py-16 mx-auto">
        {/* // The Outlet component is used to render the child routes like IndexPage and FavoritesPage */}
        <Outlet /> 
      </main>

      <Modal />
     <Notification />
    </>
  )
}
