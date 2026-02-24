import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Post from "./pages/Post.tsx";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts/:slug" element={<Post/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
