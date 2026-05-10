import SectionContainer from "./SectionContainer";
import CTAButton from "./CTAButton";
import { UtensilsCrossed, Leaf, Beef, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import tradicionalImg from "../assets/images/linha-tradicional.jpg";
import fitImg from "../assets/images/linha-fit.jpg";
import lowCarbImg from "../assets/images/linha-lowcarb.jpg";

const linhas = [
  {
    titulo: "Tradicional",
    descricao:
      "Pratos com sabor caseiro e combinações clássicas para quem busca praticidade sem abrir mão de uma refeição acolhedora no dia a dia.",
    imagem: tradicionalImg,
    icone: UtensilsCrossed,
    destaque: false,
    tag: "Sabor de casa",
  },
  {
    titulo: "Fit",
    descricao:
      "Refeições pensadas para quem busca equilíbrio e ingredientes leves, com muito sabor e praticidade na rotina.",
    imagem: fitImg,
    icone: Leaf,
    destaque: true,
    tag: "Mais procurada",
  },
  {
    titulo: "Low Carb",
    descricao:
      "Opções com menos carboidratos  e mais proteína para uma alimentação estratégica, sem perder prazer à mesa.",
    imagem: lowCarbImg,
    icone: Beef,
    destaque: false,
    tag: "Leveza no dia a dia",
  },
];

export default function LinhasProdutos() {
  return (
    <SectionContainer className="relative overflow-hidden bg-degustar-beige">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(40,88,72,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(231,106,62,0.08),transparent_24%)]" />

      <div className="relative">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">

          <h2 className="text-3xl md:text-5xl font-bold text-degustar-green leading-tight mb-4">
            Uma linha para cada objetivo,
            <span className="block text-degustar-orange">sempre com sabor e praticidade</span>
          </h2>

          <p className="text-base md:text-[17px] text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Da alimentação do dia a dia às escolhas mais leves e equilibradas,
            a Degustar reúne linhas pensadas para diferentes momentos da sua rotina.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {linhas.map((linha) => {
            const Icone = linha.icone;

            return (
              <article
                key={linha.titulo}
                className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-1 ${
                  linha.destaque
                    ? "bg-white border-degustar-orange/20 shadow-xl md:-translate-y-2"
                    : "bg-white/95 border-black/5 shadow-md hover:shadow-xl"
                }`}
              >
                <div className="relative h-44 md:h-48 overflow-hidden">
                  <img
                    src={linha.imagem}
                    alt={`Linha ${linha.titulo} da Degustar`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
                        linha.destaque
                          ? "bg-degustar-orange text-white"
                          : "bg-white/90 text-degustar-green"
                      }`}
                    >
                      {linha.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        linha.destaque
                          ? "bg-degustar-orange/12 text-degustar-orange"
                          : "bg-degustar-green/8 text-degustar-green"
                      }`}
                    >
                      <Icone size={22} />
                    </div>

                    <h3 className="text-2xl font-semibold text-degustar-green">
                      {linha.titulo}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {linha.descricao}
                  </p>

                  <Link
                    to="/produtos"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-degustar-green transition-all duration-300 group-hover:gap-3"
                  >
                    Explorar linha
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {linha.destaque && (
                  <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-degustar-orange/50 to-transparent" />
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10 flex justify-center">
          <CTAButton href="/produtos">Ver cardápio completo</CTAButton>
        </div>
      </div>
    </SectionContainer>
  );
}