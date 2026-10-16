// src/components/EscolhaPedido.jsx
// Seção da Home que separa os dois tipos de pedido:
// marmitas congeladas (no site) x almoço do dia (anota.ai).
import { Link } from "react-router-dom";

export default function EscolhaPedido() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-center text-3xl font-bold text-degustar-green">
        Como você quer pedir?
      </h2>
      <p className="mt-2 text-center text-gray-600">
        Temos duas formas de levar a Degustar até você.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Congeladas */}
        <div className="flex flex-col rounded-3xl border border-degustar-green/15 bg-white p-8 shadow-sm">
          <span className="text-sm font-bold uppercase tracking-wide text-degustar-green/70">
            Para o freezer
          </span>
          <h3 className="mt-2 text-2xl font-bold text-degustar-green">
            Marmitas Congeladas
          </h3>
          <p className="mt-3 flex-1 text-gray-700">
            Monte seu combo e tenha refeições saudáveis prontas para a semana.
            É só aquecer e comer quando quiser.
          </p>
          <Link
            to="/produtos"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-degustar-green px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Ver congeladas
          </Link>
        </div>

        {/* Almoço do dia */}
        <div className="relative flex flex-col rounded-3xl border-2 border-degustar-orange bg-degustar-beige p-8 shadow-sm">
          <span className="absolute -top-3 right-6 rounded-full bg-degustar-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Novidade
          </span>
          <span className="text-sm font-bold uppercase tracking-wide text-degustar-orange">
            Para hoje
          </span>
          <h3 className="mt-2 text-2xl font-bold text-degustar-green">
            Almoço do Dia
          </h3>
          <p className="mt-3 flex-1 text-gray-700">
            Marmitas frescas, feitas no dia e entregues quentinhas de segunda
            a sexta, das 11h às 13h, em Imbé e Tramandaí.
          </p>
          <Link
            to="/almoco"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-degustar-orange px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Pedir almoço
          </Link>
        </div>
      </div>
    </section>
  );
}