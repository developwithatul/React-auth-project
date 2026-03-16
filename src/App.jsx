import { useState } from 'react'
import { Routes, Route, } from "react-router-dom";
import Auth from './Pages/Auth';


function App() {
  return (  
    
 <div>
  <h1>hello sir </h1>
      <Routes>
         <Route path='/auth' element={<Auth />} />
         <Route path="/auth" element={<Auth />} />
      </Routes>
 </div>
  )
}

export default App
