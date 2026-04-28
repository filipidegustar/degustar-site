import SectionContainer from "./SectionContainer";
import CTAButton from "./CTAButton";
import { MapPin, Truck, Clock3, Building2, Check } from "lucide-react";

const cidades = [
  "Tramandaí",
  "Xangri-Lá",
  "Capão da Canoa",
  "Osório",
  "Cidreira",
];

const diferenciais = [
  {
    icon: Truck,
    titulo: "Entregas organizadas",
    descricao:
      "Rotas planejadas ao longo da semana para levar mais praticidade ao seu dia a dia.",
  },
  {
    icon: Clock3,
    titulo: "Produção contínua",
    descricao:
      "Produção de segunda a sexta-feira, com possibilidade de entregas aos sábados e domingos.",
  },
  {
    icon: Building2,
    titulo: "Atendimento versátil",
    descricao:
      "Atendemos tanto clientes finais quanto empresas, conforme a necessidade de cada rotina.",
  },
];

export default function RegiaoEntrega() {
  return (
    <SectionContainer className="relative overflow-hidden bg-degustar-beige">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(40,88,72,0.08),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(231,106,62,0.08),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_45%)]" />

      <div className="relative">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <span className="inline-flex items-center rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-degustar-green shadow-sm mb-6">
            Atendimento regional com praticidade
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-degustar-green mb-4">
            Região de entrega
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            A Degustar atende clientes em boa parte do litoral norte, com uma
            operação organizada para levar praticidade, qualidade e sabor até você.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 items-stretch">
          <div className="relative rounded-[2rem] bg-white p-8 md:p-10 shadow-sm border border-white/70 overflow-hidden">
            <div className="absolute top-0 right-0 h-36 w-36 rounded-full bg-degustar-orange/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-degustar-green/10 blur-3xl" />

            {/* textura premium inspirada em mapa/rota */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.11]">
              <svg
                viewBox="0 0 800 800"
                className="absolute inset-0 h-full w-full scale-[1.02]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >
                <path
                  d="M150 70C220 110 255 150 288 220C314 276 350 322 418 362C470 393 516 438 546 500C572 554 592 617 634 690"
                  stroke="#285848"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="1 14"
                />
                <path
                  d="M186 98C238 130 270 168 300 230C325 281 362 326 420 362C470 393 505 432 530 482"
                  stroke="#285848"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M120 160C172 185 212 215 255 265"
                  stroke="#e76a3e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="8 12"
                />
                <path
                  d="M450 400C500 425 545 468 578 524"
                  stroke="#e76a3e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="8 12"
                />

                <circle cx="150" cy="70" r="10" fill="#285848" />
                <circle cx="288" cy="220" r="7" fill="#e76a3e" />
                <circle cx="418" cy="362" r="9" fill="#285848" />
                <circle cx="546" cy="500" r="7" fill="#e76a3e" />
                <circle cx="634" cy="690" r="10" fill="#285848" />

                <circle cx="150" cy="70" r="24" stroke="#285848" strokeWidth="1" />
                <circle cx="418" cy="362" r="20" stroke="#285848" strokeWidth="1" />
                <circle cx="634" cy="690" r="24" stroke="#285848" strokeWidth="1" />

                <path
                  d="M650 120C615 165 600 215 604 270C608 325 632 372 680 415"
                  stroke="#e76a3e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <path
                  d="M90 510C148 495 205 504 252 538C292 567 320 610 338 662"
                  stroke="#285848"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </svg>
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-degustar-green/10 px-4 py-2 text-sm font-medium text-degustar-green mb-6">
                <MapPin size={16} />
                Cobertura regional
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold text-degustar-green mb-4 max-w-xl">
                Entregamos em cidades estratégicas do litoral norte
              </h3>

              <p className="text-gray-700 leading-relaxed max-w-2xl mb-8">
                Nossa logística é pensada para manter o atendimento próximo,
                eficiente e compatível com a rotina de quem busca praticidade sem
                abrir mão de uma alimentação bem preparada.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {cidades.map((cidade) => (
                  <span
                    key={cidade}
                    className="inline-flex items-center gap-2 rounded-full border border-degustar-green/10 bg-white/80 backdrop-blur-[2px] px-4 py-2 text-sm md:text-base text-gray-700 shadow-sm"
                  >
                    <span className="h-2 w-2 rounded-full bg-degustar-orange" />
                    {cidade}
                  </span>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-degustar-green/10 bg-degustar-green/[0.04] backdrop-blur-[2px] p-5 md:p-6">
                <p className="text-degustar-green font-semibold mb-2">
                  Atendimento com proximidade e previsibilidade
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Para confirmar disponibilidade, rota e melhor dia de entrega para
                  sua região, fale com a Degustar diretamente no WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 md:p-10 shadow-sm border border-white/70">
            <h3 className="text-2xl font-semibold text-degustar-green mb-6">
              Como funcionam as entregas
            </h3>

            <div className="space-y-4 mb-8">
              {diferenciais.map(({ icon: Icon, titulo, descricao }) => (
                <div
                  key={titulo}
                  className="group rounded-[1.5rem] border border-gray-100 bg-gradient-to-br from-white to-gray-50 px-5 py-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-degustar-orange/12 text-degustar-orange">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="text-degustar-green font-semibold mb-1">
                        {titulo}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {descricao}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] bg-degustar-beige/70 border border-white px-5 py-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-degustar-green text-white">
                  <Check size={14} />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Se a sua cidade estiver próxima da nossa rota, consulte a
                  possibilidade de atendimento.
                </p>
              </div>
            </div>

            <CTAButton
              href="https://wa.me/5551994597667"
              target="_blank"
              variant="secondary"
            >
              Consultar entrega
            </CTAButton>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}