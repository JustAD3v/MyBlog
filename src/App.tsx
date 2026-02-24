import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* Home component */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
