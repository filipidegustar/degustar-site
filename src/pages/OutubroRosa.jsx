import SectionContainer from "../components/SectionContainer";
import CTAButton from "../components/CTAButton";
import {
  Ribbon,
  HeartPulse,
  CircleAlert,
  Sparkles,
  Stethoscope,
  CalendarCheck,
  Search,
  ShieldCheck,
  Heart,
  Instagram,
} from "lucide-react";
import buqueRosa from "../assets/images/ilustracao-buque-rosa.svg";
import autocuidadoImg from "../assets/images/ilustracao-autocuidado.svg";
import agendaImg from "../assets/images/ilustracao-agenda.svg";
import logoLigaTramandai from "../assets/images/logo-liga-tramandai.png";

const sinaisDeAlerta = [
  {
    titulo: "Nódulo (caroço) fixo",
    descricao:
      "Geralmente indolor e endurecido. É a principal manifestação da doença, presente em cerca de 90% dos casos.",
    icon: CircleAlert,
  },
  {
    titulo: "Alterações na pele",
    descricao:
      "Vermelhidão, retração ou pele da mama com aspecto de casca de laranja.",
    icon: CircleAlert,
  },
  {
    titulo: "Mudança no formato do mamilo",
    descricao:
      "Alteração na posição, formato ou aparência do mamilo.",
    icon: CircleAlert,
  },
  {
    titulo: "Saída de líquido pelo mamilo",
    descricao:
      "Secreção espontânea e anormal, fora do período de amamentação.",
    icon: CircleAlert,
  },
  {
    titulo: "Nódulos na axila ou pescoço",
    descricao:
      "Pequenos caroços na região embaixo dos braços ou próximos ao pescoço.",
    icon: CircleAlert,
  },
];

const fontes = [
  {
    nome: "INCA — Instituto Nacional de Câncer",
    descricao: "Estatísticas, sinais de alerta e diretrizes de rastreamento",
    url: "https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama",
  },
  {
    nome: "Ministério da Saúde",
    descricao: "Diretrizes brasileiras de detecção precoce do câncer de mama",
    url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/cancer-de-mama",
  },
];

/**
 * Composição decorativa: ícone central em destaque, sobre círculos
 * concêntricos e blur — substitui uma "figura" ilustrativa sem depender
 * de fotos de terceiros. Reaproveita o padrão visual já usado no resto
 * do site (ex: RegiaoEntrega, ComoFunciona).
 */
function IlustracaoIcone({ Icon, tone = "orange", size = "md" }) {
  const toneClasses =
    tone === "green"
      ? { ring: "border-degustar-green/15", bg: "bg-degustar-green/10", icon: "text-degustar-green", blur: "bg-degustar-green/20" }
      : { ring: "border-degustar-orange/15", bg: "bg-degustar-orange/10", icon: "text-degustar-orange", blur: "bg-degustar-orange/20" };

  const dims = size === "lg" ? "h-56 w-56 md:h-64 md:w-64" : "h-40 w-40";
  const iconSize = size === "lg" ? 56 : 36;

  return (
    <div className={`relative mx-auto flex ${dims} items-center justify-center`}>
      <div className={`absolute inset-0 rounded-full blur-3xl ${toneClasses.blur} opacity-60`} />
      <div className={`absolute inset-4 rounded-full border ${toneClasses.ring}`} />
      <div className={`absolute inset-10 rounded-full border ${toneClasses.ring}`} />
      <div className={`relative flex h-24 w-24 items-center justify-center rounded-full ${toneClasses.bg} ${toneClasses.icon} shadow-sm`}>
        <Icon size={iconSize} strokeWidth={1.8} />
      </div>
    </div>
  );
}

export default function OutubroRosa() {
  return (
    // Esta página é sobre a campanha em si, então mantém o tema rosa
    // sempre ativo — independente da data, diferente da Home.
    <div className="tema-outubro-rosa">
      {/* HERO da página */}
      <section className="relative overflow-hidden bg-degustar-green">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-degustar-orange/25 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-24">
          <div className="text-center md:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Ribbon size={16} />
              Outubro Rosa
            </span>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl">
              Prevenção começa com informação
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 md:mx-0 md:text-lg">
              A Degustar apoia o Outubro Rosa e acredita que cuidar da sua
              saúde é um ato de amor-próprio. Nesta página, reunimos
              orientações oficiais do INCA e do Ministério da Saúde sobre
              detecção precoce do câncer de mama — informação simples,
              confiável e que pode salvar vidas.
            </p>
          </div>

          {/* Ilustração decorativa — buquê floral original */}
          <div className="relative mx-auto hidden h-72 w-72 items-center justify-center md:flex">
            <div className="absolute inset-0 rounded-full bg-white/8 blur-3xl" />
            <img
              src={buqueRosa}
              alt="Ilustração de um buquê de flores rosa"
              className="relative h-64 w-64 object-contain"
            />
          </div>
        </div>
      </section>

      {/* POR QUE A DETECÇÃO PRECOCE IMPORTA */}
      <SectionContainer className="bg-white">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <IlustracaoIcone Icon={HeartPulse} tone="orange" size="lg" />

          <div className="text-center md:text-left">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-degustar-beige/60 px-4 py-2 text-sm font-medium text-degustar-green">
              <HeartPulse size={16} />
              Por que isso importa
            </span>

            <h2 className="mb-6 text-2xl font-bold text-degustar-green md:text-4xl">
              Quanto antes for descoberto, maiores as chances de tratamento
            </h2>

            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              O câncer de mama é o tipo mais comum entre as mulheres no
              Brasil (sem contar tumores de pele não-melanoma), segundo o
              Instituto Nacional de Câncer (INCA). Quando identificado em
              estágio inicial, as chances de um tratamento bem-sucedido
              aumentam consideravelmente — por isso, conhecer os sinais de
              alerta e manter o acompanhamento médico em dia faz toda a
              diferença.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* SINAIS DE ALERTA */}
      <SectionContainer className="relative overflow-hidden bg-degustar-beige">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--color-degustar-green)/0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgb(var(--color-degustar-orange)/0.07),transparent_24%)]" />

        <div className="relative">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
            <h2 className="mb-4 text-2xl font-bold text-degustar-green md:text-4xl">
              Sinais de alerta
            </h2>
            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              De acordo com o INCA, esses são os principais sinais que devem
              ser observados. A presença de um deles não significa
              necessariamente câncer — muitas alterações têm causas benignas
              — mas merece avaliação médica.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sinaisDeAlerta.map((sinal) => {
              const Icon = sinal.icon;
              return (
                <div
                  key={sinal.titulo}
                  className="rounded-[1.5rem] border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-degustar-orange/12 text-degustar-orange">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-degustar-green">
                    {sinal.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {sinal.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* CONHECER O PRÓPRIO CORPO */}
      <SectionContainer className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-degustar-beige/60 px-4 py-2 text-sm font-medium text-degustar-green">
              <Sparkles size={16} />
              Autoconhecimento
            </span>

            <h2 className="mb-5 text-2xl font-bold text-degustar-green md:text-4xl">
              Conhecer o próprio corpo, no seu tempo
            </h2>

            <p className="mb-4 text-base leading-relaxed text-gray-700 md:text-lg">
              Hoje, o INCA e o Ministério da Saúde não recomendam mais uma
              técnica rígida de autoexame mensal. A orientação atual é mais
              simples: preste atenção ao seu corpo no dia a dia — no banho,
              ao se vestir, sem pressa e sem cobrança.
            </p>

            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              Quanto mais familiarizada você estiver com a aparência e a
              sensação normais das suas mamas, mais fácil perceber quando
              algo muda — e é isso que realmente importa.
            </p>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] bg-degustar-beige/40">
              <img
                src={autocuidadoImg}
                alt="Ilustração de um cantinho de autocuidado com chá, livro e planta"
                className="w-full"
              />
            </div>

            <div className="rounded-[2rem] border border-degustar-beige bg-degustar-beige/40 p-8 md:p-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-degustar-green/10 text-degustar-green">
                <ShieldCheck size={24} />
              </div>
              <p className="text-lg font-semibold leading-relaxed text-degustar-green">
                Autoconhecimento não substitui a mamografia — os dois andam
                juntos.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Observar o próprio corpo ajuda a notar sinais entre um exame
                e outro, mas o rastreamento por mamografia continua sendo a
                ferramenta mais eficaz para detectar alterações antes mesmo
                de gerarem sintomas.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* MAMOGRAFIA */}
      <SectionContainer className="relative overflow-hidden bg-degustar-green">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-degustar-orange/20 blur-3xl" />
          <div className="absolute -top-16 right-10 h-40 w-40 rounded-full bg-white/8 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
          <div className="text-center md:text-left">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <CalendarCheck size={16} />
              Rastreamento
            </span>

            <h2 className="mb-6 text-2xl font-bold text-white md:text-4xl">
              Mamografia: a principal aliada da detecção precoce
            </h2>

            <p className="mb-4 text-base leading-relaxed text-white/85 md:text-lg">
              As diretrizes brasileiras (INCA / Ministério da Saúde)
              recomendam mamografia a cada 2 anos para mulheres entre 50 e
              69 anos, a faixa etária com maior benefício comprovado do
              rastreamento.
            </p>

            <p className="text-base leading-relaxed text-white/85 md:text-lg">
              Se você tem histórico familiar da doença ou outros fatores de
              risco, converse com seu médico — ele pode indicar um
              acompanhamento diferenciado para o seu caso.
            </p>
          </div>

          <div className="relative mx-auto hidden h-72 w-72 items-center justify-center md:flex">
            <div className="absolute inset-0 rounded-full bg-white/8 blur-3xl" />
            <img
              src={agendaImg}
              alt="Ilustração de uma agenda com uma data de mamografia marcada"
              className="relative h-64 w-64 object-contain"
            />
          </div>
        </div>
      </SectionContainer>

      {/* O QUE FAZER */}
      <SectionContainer className="bg-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-degustar-beige bg-degustar-beige/30 p-8 text-center md:p-12">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-degustar-orange/12 text-degustar-orange">
            <Stethoscope size={26} />
          </div>

          <h2 className="mb-4 text-2xl font-bold text-degustar-green md:text-3xl">
            Notou algo diferente? Não espere
          </h2>

          <p className="text-base leading-relaxed text-gray-700 md:text-lg">
            A recomendação do INCA e da Sociedade Brasileira de Mastologia é
            unânime: diante de qualquer alteração suspeita, procure um
            médico o quanto antes. Na rede pública, a Unidade Básica de
            Saúde (UBS) mais próxima é a porta de entrada para investigação
            e encaminhamento.
          </p>
        </div>
      </SectionContainer>

      {/* PARCERIA COM A LIGA DE TRAMANDAÍ */}
      <SectionContainer className="bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-8 rounded-[2rem] border border-degustar-beige bg-degustar-beige/25 p-8 text-center md:flex-row md:gap-10 md:p-12 md:text-left">
            <img
              src={logoLigaTramandai}
              alt="Logo da Liga Feminina de Combate ao Câncer de Tramandaí"
              className="h-28 w-auto shrink-0 md:h-32"
            />

            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-degustar-green shadow-sm">
                Parceria
              </span>

              <h2 className="mb-4 text-2xl font-bold text-degustar-green md:text-3xl">
                Liga Feminina de Combate ao Câncer de Tramandaí
              </h2>

              <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                Durante o Outubro Rosa, parte da renda das vendas da Degustar
                é destinada à Liga de Tramandaí — uma ONG que atua desde 2001
                acolhendo e apoiando mulheres em tratamento oncológico na
                nossa região. Ao escolher a Degustar neste período, você
                também ajuda quem está mais perto de você.
              </p>

              <a
                href="https://www.instagram.com/ligatramandai"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-degustar-orange transition-opacity hover:opacity-80"
              >
                <Instagram size={18} />
                Siga a Liga de Tramandaí no Instagram — @ligatramandai
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA FINAL */}
      <SectionContainer className="relative overflow-hidden bg-degustar-orange" id="cta-final-outubro-rosa">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
            <Search size={22} />
          </div>

          <h2 className="mb-5 text-2xl font-bold text-white md:text-4xl">
            Cuide de você. É por aí que tudo começa.
          </h2>

          <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
            Compartilhe essa informação com quem você ama — às vezes, um
            lembrete gentil é o empurrão que falta pra alguém marcar aquele
            exame.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton
              href="https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama"
              target="_blank"
              variant="secondary"
              className="bg-white text-degustar-orange border-white"
            >
              Saiba mais no site do INCA
            </CTAButton>
          </div>
        </div>
      </SectionContainer>

      {/* FONTES */}
      <SectionContainer className="bg-white pt-0">
        <div className="mx-auto max-w-3xl border-t border-gray-100 pt-10 text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Fontes consultadas
          </p>

          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {fontes.map((fonte) => (
              <a
                key={fonte.nome}
                href={fonte.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 text-left transition-colors duration-300 hover:bg-degustar-beige/30"
              >
                <p className="text-sm font-semibold text-degustar-green">
                  {fonte.nome}
                </p>
                <p className="text-xs text-gray-500">{fonte.descricao}</p>
              </a>
            ))}
          </div>

          <p className="mx-auto max-w-xl text-xs leading-relaxed text-gray-400">
            Conteúdo informativo, baseado nas diretrizes públicas do INCA e
            do Ministério da Saúde. Não substitui consulta, diagnóstico ou
            orientação médica profissional.
          </p>
        </div>
      </SectionContainer>
    </div>
  );
}
