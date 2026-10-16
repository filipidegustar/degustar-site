import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "Produtos", to: "/produtos" },
  { label: "Monte seu Combo", to: "/produtos" },
  { label: "Almoço do Dia", to: "/almoco", novo: true },
  { label: "Contato", to: "/contato" },
];

// Opções do botão "Fazer pedido"
const opcoesPedido = [
  {
    titulo: "Marmitas congeladas",
    descricao: "Monte seu combo para o freezer",
    to: "/produtos",
  },
  {
    titulo: "Almoço do Dia",
    descricao: "Marmita pronta para consumo, entregue hoje no almoço",
    to: "/almoco",
    novo: true,
  },
];

function SeloNovo() {
  return (
    <span className="ml-1.5 rounded-full bg-degustar-orange px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
      Novo
    </span>
  );
}

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [pedidoAberto, setPedidoAberto] = useState(false);
  const pedidoRef = useRef(null);

  // Fecha o menu de "Fazer pedido" ao clicar fora
  useEffect(() => {
    function aoClicarFora(e) {
      if (pedidoRef.current && !pedidoRef.current.contains(e.target)) {
        setPedidoAberto(false);
      }
    }
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-black/5 bg-white/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="shrink-0 flex items-center">
            <img
              src={logo}
              alt="Degustar"
              className="h-28 md:h-32 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
            {links.map((item) => (
              <Link
                key={`${item.label}-${item.to}`}
                to={item.to}
                className="inline-flex items-center transition-colors duration-200 hover:text-degustar-green"
              >
                {item.label}
                {item.novo && <SeloNovo />}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/5551994597667"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-degustar-green/15 px-5 py-2.5 text-sm font-semibold text-degustar-green transition-all duration-300 hover:bg-degustar-beige"
            >
              WhatsApp
            </a>

            <div className="relative" ref={pedidoRef}>
              <button
                type="button"
                onClick={() => setPedidoAberto(!pedidoAberto)}
                aria-expanded={pedidoAberto}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-degustar-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-degustar-orange/20 transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
              >
                Fazer pedido
                <ChevronDown
                  size={16}
                  className={`transition-transform ${pedidoAberto ? "rotate-180" : ""}`}
                />
              </button>

              {pedidoAberto && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-black/5 bg-white p-2 shadow-xl">
                  {opcoesPedido.map((op) => (
                    <Link
                      key={op.to}
                      to={op.to}
                      onClick={() => setPedidoAberto(false)}
                      className="block rounded-xl px-4 py-3 transition hover:bg-degustar-beige"
                    >
                      <span className="flex items-center font-semibold text-degustar-green">
                        {op.titulo}
                        {op.novo && <SeloNovo />}
                      </span>
                      <span className="block text-sm text-gray-600">
                        {op.descricao}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-degustar-green transition hover:bg-degustar-beige"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            {menuAberto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuAberto && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            <nav className="flex flex-col gap-1">
              {links.map((item) => (
                <Link
                  key={`${item.label}-${item.to}`}
                  to={item.to}
                  onClick={() => setMenuAberto(false)}
                  className="flex items-center rounded-xl px-4 py-3 text-gray-700 font-medium transition hover:bg-degustar-beige hover:text-degustar-green"
                >
                  {item.label}
                  {item.novo && <SeloNovo />}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-3">
              <a
                href="https://wa.me/5551994597667"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-degustar-green/15 px-5 py-3 font-semibold text-degustar-green transition hover:bg-degustar-beige"
              >
                Falar no WhatsApp
              </a>

              <Link
                to="/produtos"
                onClick={() => setMenuAberto(false)}
                className="inline-flex items-center justify-center rounded-full bg-degustar-green px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Pedir congeladas
              </Link>

              <Link
                to="/almoco"
                onClick={() => setMenuAberto(false)}
                className="inline-flex items-center justify-center rounded-full bg-degustar-orange px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Pedir Almoço do Dia
              </Link>
              <Link to="/contato">Contato</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}