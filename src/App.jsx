import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Contato from "./pages/Contato";
import OutubroRosa from "./pages/OutubroRosa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <main className="bg-white text-gray-800 pt-16">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/outubro-rosa" element={<OutubroRosa />} />
        </Routes>

        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
