import React from "react"
import {BrowserRouter,Link, Route,Routes} from 'react-router-dom'
import {logo} from "./description"
import { Landing } from "./pages"

function App() {

  return (
    <BrowserRouter>
    <header className="w-full flex justify-center bg-[#4A4D6D] sm:px-8 px-4 py-4 border-b border-b-[#4A4D6D]">
      <Link to= '/' className="flex w-1/2 justify-center items-center">
        <div className="w-full flex justify-start rounded-lg items-center bg-[#797DA4] shadow-lg ">
          <img src={logo} alt="logo" className=" p-2 w-14 object-contain flex-none"/>
          <div className="p-3 text-2xl subpixel-antialiased grow	font-bold tracking-wide text-center text-[#DBDCE6]">
            GOAL COMP
          </div>
          <div className="flex-none w-14"></div>
        </div>
      </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 bg-[#4A4D6D]  min-h-[calc(100vh-73px)]">
        <Routes>
        <Route path='/' element={<Landing></Landing>}></Route>
        </Routes>

      
      </main>
    </BrowserRouter>
  )
}

export default App