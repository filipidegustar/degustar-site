import SectionContainer from "./SectionContainer";
import CTAButton from "./CTAButton";
import { Play, ChefHat, ShieldCheck, HeartHandshake } from "lucide-react";

const diferenciais = [
  {
    icon: ChefHat,
    titulo: "Produção cuidadosa",
    descricao: "Processos organizados e atenção real em cada etapa.",
  },
  {
    icon: ShieldCheck,
    titulo: "Qualidade percebida",
    descricao: "Estrutura, padrão e apresentação que transmitem confiança.",
  },
  {
    icon: HeartHandshake,
    titulo: "Proximidade no atendimento",
    descricao: "Uma marca feita por pessoas, com presença e propósito.",
  },
];

export default function VideoInstitucional() {
  return (
    <SectionContainer className="bg-degustar-beige overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
        <span className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-medium text-degustar-green shadow-sm backdrop-blur-sm mb-6">
          Estrutura real, cuidado em cada etapa
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-degustar-green mb-4 leading-tight">
          Veja de perto como a
          <span className="block text-degustar-orange">Degustar acontece</span>
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Mais do que mostrar a cozinha, este vídeo apresenta o padrão de
          cuidado, organização e atenção que fazem parte da rotina da Degustar.
        </p>
      </div>

      <div className="relative rounded-[2.25rem] border border-white/50 bg-white/70 p-5 md:p-8 shadow-[0_25px_70px_rgba(40,88,72,0.10)] backdrop-blur-sm">
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-degustar-orange/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-degustar-green/10 blur-3xl" />

        <div className="relative grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-center">
          {/* TEXTO */}
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-degustar-green/8 px-3 py-1.5 text-sm font-medium text-degustar-green mb-5">
                <Play size={16} className="text-degustar-orange" />
                Bastidores que reforçam confiança
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold text-degustar-green mb-4 leading-snug">
                Uma produção que valoriza sabor, praticidade e cuidado de
                verdade
              </h3>

              <p className="text-gray-700 leading-relaxed mb-8">
                Quando você vê a estrutura, o processo e as pessoas por trás da
                Degustar, fica mais fácil entender por que nossas marmitas unem
                conveniência, qualidade e uma experiência mais confiável no dia
                a dia.
              </p>

              <div className="space-y-4 mb-8">
                {diferenciais.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-2xl bg-white/80 p-4 border border-white shadow-sm"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-degustar-orange/12 text-degustar-orange">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h4 className="text-base font-semibold text-degustar-green mb-1">
                          {item.titulo}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.descricao}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <CTAButton
                href="https://www.instagram.com/degustar.adriana/"
                target="_blank"
                variant="secondary"
              >
                Ver mais no Instagram
              </CTAButton>
            </div>
          </div>

          {/* VÍDEO */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[380px]">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2.2rem] bg-degustar-green/10 blur-sm" />

              <div className="relative rounded-[2.2rem] bg-white p-3 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-white/70">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.7rem] bg-gray-200">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/7Md16XehtFE"
                    title="Vídeo institucional Degustar"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}