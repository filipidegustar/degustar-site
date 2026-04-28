import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Produtos from "./pages/Produtos" // IMPORTAR
import Contato from "./pages/Contato";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} /> {/* NOVA ROTA */}
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App