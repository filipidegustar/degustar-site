import SectionContainer from "./SectionContainer";
import {
  BanknoteArrowDown,
  TimerOff,
  BadgeAlert,
  ArrowUpRight,
} from "lucide-react";

export default function Problema() {
  const itens = [
    {
      titulo: "Delivery caro",
      texto:
        "Pedir comida todos os dias pesa no bolso e nem sempre entrega qualidade de verdade.",
      detalhe: "Mais gasto, menos controle",
      icon: BanknoteArrowDown,
    },
    {
      titulo: "Falta de tempo",
      texto:
        "Na correria da rotina, cozinhar bem todos os dias vira algo difícil de manter.",
      detalhe: "A rotina engole o planejamento",
      icon: TimerOff,
    },
    {
      titulo: "Alimentação desregulada",
      texto:
        "Quando o tempo aperta, é fácil acabar comendo qualquer coisa e sair da rotina saudável.",
      detalhe: "Praticidade sem equilíbrio",
      icon: BadgeAlert,
    },
  ];

  return (
    <SectionContainer className="relative overflow-hidden bg-degustar-beige pb-0">
      {/* fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-10%] top-10 h-64 w-64 rounded-full bg-degustar-orange/10 blur-3xl" />
        <div className="absolute right-[-8%] top-24 h-72 w-72 rounded-full bg-degustar-green/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/30 to-transparent" />

        {/* transição para a próxima seção */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-degustar-beige/90 to-white" />
      </div>

      <div className="relative">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          <span className="inline-flex items-center rounded-full border border-white/60 bg-white/70 backdrop-blur-md px-4 py-2 text-sm font-medium text-degustar-green shadow-sm mb-5">
            A rotina real de muita gente
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-degustar-green mb-6 leading-[1.05]">
            Falta de tempo para se alimentar bem?
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            A correria do dia a dia faz muita gente abrir mão de uma alimentação
            equilibrada. Entre delivery caro, comida pesada e pouco tempo para
            cozinhar, comer bem vira um desafio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {itens.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.titulo}
                className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-sm p-7 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.18)_100%)] opacity-90" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-degustar-orange/70 via-degustar-orange to-degustar-green/50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-degustar-orange/10 blur-2xl group-hover:bg-degustar-orange/15 transition-all duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-degustar-orange/10 border border-degustar-orange/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-degustar-orange/20">
                      <Icon
                        className="w-6 h-6 text-degustar-orange"
                        strokeWidth={2.1}
                      />
                    </div>

                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-degustar-green/50 font-semibold">
                      <span>0{index + 1}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-degustar-orange mb-3">
                    {item.detalhe}
                  </p>

                  <h3 className="text-2xl font-semibold text-degustar-green mb-4 leading-tight">
                    {item.titulo}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-[1.03rem]">
                    {item.texto}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* bloco de transição narrativa */}
        <div className="mt-14 md:mt-20 flex items-center justify-center">
          <div className="h-px w-16 bg-degustar-green/15" />
          <span className="px-4 text-sm md:text-base text-degustar-green/60 font-medium">
            E é exatamente aí que a Degustar entra
          </span>
          <div className="h-px w-16 bg-degustar-green/15" />
        </div>
      </div>
    </SectionContainer>
  );
}