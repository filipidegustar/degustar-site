import SectionContainer from "./SectionContainer";
import heroImage from "../assets/images/hero-marmita.jpeg";
import { Check, Sparkles } from "lucide-react";

const beneficios = [
  "Ingredientes selecionados",
  "Receitas equilibradas por nutricionista",
  "Congelamento que preserva sabor e qualidade",
  "Pronto em poucos minutos",
];

export default function Solucao() {
  return (
    <SectionContainer className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-8%] top-10 h-64 w-64 rounded-full bg-degustar-orange/8 blur-3xl" />
        <div className="absolute right-[-8%] bottom-10 h-72 w-72 rounded-full bg-degustar-green/8 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-degustar-beige/30 to-transparent" />
      </div>

      <div className="relative grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-degustar-orange/10 blur-2xl" />
          <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-degustar-green/10 blur-3xl" />

          <div className="relative rounded-[2.2rem] border border-[#f1e4c3] bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,245,220,0.65)_100%)] p-3 md:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 backdrop-blur-md shadow-sm">
              <Sparkles className="h-4 w-4 text-degustar-orange" />
              <span className="text-xs font-medium text-degustar-green">
                Praticidade com sabor de verdade
              </span>
            </div>

            <img
              src={heroImage}
              alt="Marmita saudável Degustar"
              className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover rounded-[1.7rem]"
            />
          </div>
        </div>

        <div className="order-1 md:order-2 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-degustar-beige bg-degustar-beige/60 px-4 py-2 text-sm font-medium text-degustar-green shadow-sm mb-5">
            A praticidade com qualidade de verdade
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-degustar-green mb-6 leading-[1.05]">
            A Degustar resolve isso
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            Marmitas saudáveis, desenvolvidas por nutricionista e pensadas para
            facilitar sua rotina com sabor, equilíbrio e praticidade no dia a dia.
          </p>

          <div className="grid gap-4">
            {beneficios.map((beneficio) => (
              <div
                key={beneficio}
                className="group flex items-start gap-4 rounded-[1.4rem] border border-[#f1f1f1] bg-white/85 px-5 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(0,0,0,0.08)]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-degustar-orange/12 text-degustar-orange transition-all duration-300 group-hover:scale-105 group-hover:bg-degustar-orange/18">
                  <Check className="h-4.5 w-4.5" strokeWidth={3} />
                </div>

                <p className="text-gray-700 leading-relaxed">{beneficio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}