// src/pages/Almoco.jsx
// Página do Almoço do Dia (marmitas frescas) — pedidos pelo Anota.ai.
import { Link } from "react-router-dom";

const LINK_ANOTA_AI = "https://pedido.anota.ai/loja/anotaai-degustar-alimentao-saudvel";

const destaques = [
  {
    titulo: "Prato do dia",
    texto: "Um prato diferente a cada dia, nas versões Tradicional e Fit.",
  },
  {
    titulo: "Ala minuta",
    texto: "Todos os dias, opções de gado e de frango.",
  },
  {
    titulo: "Entrega no almoço",
    texto: "De segunda a sexta, das 11h às 13h, em Imbé e Tramandaí.",
  },
  {
    titulo: "Agende com antecedência",
    texto: "Escolha o horário de entrega e garanta seu almoço sem correria.",
  },
];

function BotaoPedido({ children }) {
  return (
    <a
      href={LINK_ANOTA_AI}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-degustar-orange px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-degustar-orange/20 transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
    >
      {children}
    </a>
  );
}

export default function Almoco() {
  return (
    <div className="min-h-screen">
      {/* Cabeçalho */}
      <section className="bg-degustar-beige">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-12 text-center">
          <span className="inline-block rounded-full bg-degustar-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Novidade
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-degustar-green">
            Almoço do Dia
          </h1>
          <p className="mt-2 text-lg font-semibold text-degustar-green/80">
            Marmitas frescas, feitas no dia
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Comida caseira e saudável, preparada e entregue
            quentinha na hora do almoço.
          </p>
          <div className="mt-8">
            <BotaoPedido>Pedir meu almoço</BotaoPedido>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            O pedido é feito pelo nosso cardápio no Anota.ai.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {destaques.map((d) => (
            <div
              key={d.titulo}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-degustar-green">
                {d.titulo}
              </h2>
              <p className="mt-2 text-gray-700">{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Passo a passo */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-center text-degustar-green">
          Como pedir
        </h2>
        <ol className="mt-6 space-y-3 text-lg text-gray-700">
          <li>1. Clique em <strong>Pedir meu almoço</strong>.</li>
          <li>2. Veja o cardápio do dia.</li>
          <li>3. Informe o endereço.</li>
          <li>4. Pronto! É só aguardar seu almoço.</li>
        </ol>
        <div className="mt-10 text-center">
          <BotaoPedido>Pedir meu almoço</BotaoPedido>
        </div>
      </section>

      {/* Desvio para as congeladas */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="rounded-2xl border border-degustar-green/15 p-6 text-center">
          <p className="font-semibold text-degustar-green">
            Procurando as marmitas congeladas?
          </p>
          <p className="mt-1 text-gray-600">
            Para estocar no freezer e comer quando quiser, monte seu pedido
            direto aqui no site.
          </p>
          <Link
            to="/produtos"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-degustar-green/20 px-6 py-2.5 font-semibold text-degustar-green transition hover:bg-degustar-beige"
          >
            Ver marmitas congeladas
          </Link>
        </div>
      </section>
    </div>
  );
}