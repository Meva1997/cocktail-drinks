import {lazy, Suspense} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./layout/Layout"
const IndexPage = lazy(() => import("./views/IndexPage")) //lazy loading
const FavoritesPage = lazy(() => import("./views/FavoritesPage")) //lazy loading
const GenerateAI = lazy(() => import("./views/GenerateAI"))

export default function AppRouter() {

  return (

    <BrowserRouter>
      <Routes>
        {/* layout to design de header in every component*/}
        <Route element={<Layout />}> 
          <Route path="/" element={
            <Suspense fallback="loading...">
              <IndexPage />
            </Suspense>
          } index/>
          <Route path="/favorites" element={
            <Suspense fallback="Loading...">
              <FavoritesPage />
            </Suspense>
          } />
          <Route path="/ai" element={
            <Suspense fallback="Loading...">
              <GenerateAI />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}
