import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Instagram, Clock3 } from "lucide-react";
import logo from "../assets/images/logo-footer.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1f4337] text-white">
      {/* textura/fundo suave */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,235,181,0.10),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(231,106,62,0.10),transparent_18%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-10">
        {/* topo */}
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marca */}
          <div className="max-w-sm -mt-6">
            <img
              src={logo}
              alt="Degustar"
              className="h-28 mb-5"
            />

            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              Alimentação prática, saborosa e pensada para a sua rotina.
            </h3>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55 mb-5">
              Navegação
            </h4>

            <ul className="space-y-3 text-white/75">
              <li>
                <Link to="/" className="transition hover:text-white hover:translate-x-0.5 inline-block">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/produtos" className="transition hover:text-white hover:translate-x-0.5 inline-block">
                  Produtos
                </Link>
              </li>

              <li>
                <Link to="/produtos" className="transition hover:text-white hover:translate-x-0.5 inline-block">
                  Combos
                </Link>
              </li>

              <li>
                <Link to="/contato" className="transition hover:text-white hover:translate-x-0.5 inline-block">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Região */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55 mb-5">
              Região de entrega
            </h4>

            <ul className="space-y-3 text-white/75">
              <li>Tramandaí</li>
              <li>Xangri-Lá</li>
              <li>Capão da Canoa</li>
              <li>Osório</li>
              <li>Cidreira</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55 mb-5">
              Contato
            </h4>

            <ul className="space-y-4 text-white/75">
              <li>
                <a
                  href="https://wa.me/5551994597667"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 hover:text-white transition"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition group-hover:bg-white/10">
                    <MessageCircle size={16} />
                  </span>
                  <span>WhatsApp</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/degustar.adriana/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 hover:text-white transition"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition group-hover:bg-white/10">
                    <Instagram size={16} />
                  </span>
                  <span>Instagram</span>
                </a>
              </li>

              <li className="inline-flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Clock3 size={16} />
                </span>

                <span className="leading-relaxed">
                  Atendimento todos os dias, com organização das entregas ao longo da semana.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* linha divisória */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* rodapé inferior */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© 2026 Degustar. Todos os direitos reservados.</p>

          <p className="inline-flex items-center gap-2 text-center md:text-right">
            <MapPin size={14} />
            Tramandaí • Litoral Norte RS
          </p>
        </div>

        {/* crédito */}
        <div className="mt-4 text-center text-xs text-white/40">
          Criado e desenvolvido por <span className="text-white/60">Filipi Dariva</span>
        </div>
      </div>
    </footer>
  );
}