import SectionContainer from "./SectionContainer";
import {
  UtensilsCrossed,
  PackageOpen,
  Truck,
  Microwave,
} from "lucide-react";

const passos = [
  {
    numero: "1",
    titulo: "Escolha seus sabores",
    descricao:
      "Explore o cardápio e selecione as marmitas que fazem sentido para a sua rotina.",
    icon: UtensilsCrossed,
  },
  {
    numero: "2",
    titulo: "Monte seu combo",
    descricao:
      "Organize suas escolhas em um combo prático, com mais conveniência para o dia a dia.",
    icon: PackageOpen,
  },
  {
    numero: "3",
    titulo: "Receba com praticidade",
    descricao:
      "Suas marmitas chegam congeladas, prontas para armazenar e usar quando quiser.",
    icon: Truck,
  },
  {
    numero: "4",
    titulo: "Aqueça e aproveite",
    descricao:
      "Em poucos minutos, você tem uma refeição saborosa sempre à mão.",
    icon: Microwave,
  },
];

export default function ComoFunciona() {
  return (
    <SectionContainer className="relative overflow-hidden bg-degustar-beige">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(40,88,72,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(231,106,62,0.07),transparent_24%)]" />

      <div className="relative">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <span className="inline-flex items-center rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-medium text-degustar-green shadow-sm backdrop-blur-sm mb-6">
            Simples, prático e pensado para sua rotina
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-degustar-green mb-5">
            Como funciona
          </h2>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Da escolha dos sabores ao momento da refeição, tudo foi pensado
            para tornar sua rotina mais prática, leve e saborosa.
          </p>
        </div>

        <div className="relative">
          {/* linha de conexão no desktop */}
          <div className="hidden xl:block absolute left-[12.5%] right-[12.5%] top-16 h-px bg-gradient-to-r from-transparent via-degustar-green/20 to-transparent" />

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {passos.map((passo) => {
              const Icon = passo.icon;

              return (
                <div
                  key={passo.numero}
                  className="group relative rounded-[1.75rem] border border-white/70 bg-white/90 p-7 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-degustar-green/8 text-degustar-green">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <div className="flex h-10 min-w-10 items-center justify-center rounded-full bg-degustar-orange/12 px-3 text-sm font-semibold text-degustar-orange">
                      {passo.numero}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-degustar-green mb-3 leading-snug">
                    {passo.titulo}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {passo.descricao}
                  </p>

                  <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-degustar-orange/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}