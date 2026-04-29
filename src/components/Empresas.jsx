import { useEffect, useRef, useState } from "react";
import SectionContainer from "./SectionContainer";
import CTAButton from "./CTAButton";
import { Building2, ClipboardList, ShieldCheck } from "lucide-react";
import estruturaImg from "../assets/images/estrutura-degustar.jpg";
import equipeImg from "../assets/images/equipe-producao.jpg";
import refeicoesImg from "../assets/images/refeicoes-prontas.jpg";

const solucoes = [
  "Marmitas congeladas para rotina operacional",
  "Sanduíches naturais e lanches prontos",
  "Frutas picadas e opções leves",
  "Sobremesas e complementos",
  "Refeições frescas sob demanda",
];

const diferenciais = [
  {
    icon: Building2,
    titulo: "Atendimento recorrente",
    descricao:
      "Fornecimento pensado para operações que precisam de constância e organização.",
  },
  {
    icon: ClipboardList,
    titulo: "Mais praticidade",
    descricao:
      "Soluções prontas para simplificar a rotina e otimizar o serviço interno.",
  },
  {
    icon: ShieldCheck,
    titulo: "Cuidado na produção",
    descricao:
      "Processos organizados e atenção em cada etapa do preparo e fornecimento.",
  },
];

export default function Empresas() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  const [pinHeight, setPinHeight] = useState(0);
  const [pinOffset, setPinOffset] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function updatePin() {
      if (!sectionRef.current || !pinRef.current) return;

      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      const navbarOffset = 112;

      const sectionEl = sectionRef.current;
      const pinEl = pinRef.current;

      const sectionTop =
        sectionEl.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = sectionEl.offsetHeight;
      const pinElHeight = pinEl.offsetHeight;
      const scrollY = window.scrollY;

      setPinHeight(pinElHeight);

      if (!desktop) {
        setPinOffset(0);
        return;
      }

      const maxOffset = Math.max(sectionHeight - pinElHeight, 0);

      const nextOffset = Math.min(
        Math.max(scrollY + navbarOffset - sectionTop, 0),
        maxOffset
      );

      setPinOffset(nextOffset);
    }

    let ticking = false;

    function onScrollOrResize() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePin();
          ticking = false;
        });
        ticking = true;
      }
    }

    updatePin();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const pinStyle = isDesktop
  ? {
      transform: `translateY(${pinOffset}px)`,
      willChange: "transform",
    }
  : {};

  return (
    <SectionContainer
      className="bg-gradient-to-b from-[#fffaf2] via-[#fff7e8] to-[#fffaf2]"
      id="empresas"
    >
      <div
        ref={sectionRef}
        className="relative flex flex-col gap-12 md:flex-row md:items-start md:gap-16"
      >
        <div className="max-w-2xl md:flex-1">
          <span className="mb-5 inline-flex items-center rounded-full border border-[#f1e7cf] bg-white px-4 py-2 text-sm font-medium text-degustar-green shadow-sm">
            Alimentação prática para operações recorrentes
          </span>

          <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-degustar-green md:text-5xl">
            Alimentação organizada para empresas e instituições
          </h2>

          <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
            A Degustar atende empresas, hospitais e instituições que precisam de
            refeições práticas, bem organizadas e prontas para o consumo, com
            regularidade no fornecimento, cuidado na produção e mais eficiência
            para a rotina operacional.
          </p>

          <div className="mb-8 grid gap-3">
            {solucoes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-white/60"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-degustar-orange text-xs font-bold text-white">
                  ✓
                </div>

                <p className="leading-relaxed text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {diferenciais.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.titulo}
                  className="rounded-2xl border border-[#f1e7cf] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-degustar-green/10 text-degustar-green">
                    <Icon size={20} />
                  </div>

                  <h3 className="mb-2 text-sm font-semibold text-degustar-green">
                    {item.titulo}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.descricao}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mb-8 space-y-4">
            <div className="rounded-2xl border border-[#f1e7cf] bg-white p-6 shadow-sm">
              <p className="text-lg font-semibold leading-relaxed text-degustar-green md:text-xl">
                Empresas que precisam de regularidade e praticidade encontram na
                Degustar uma solução confiável para a alimentação do dia a dia.
              </p>
            </div>

            <div className="rounded-2xl border border-[#f1e7cf] bg-white p-6 shadow-sm">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-degustar-orange">
                Exemplo de aplicação
              </p>

              <p className="mb-4 leading-relaxed text-gray-700">
                Fornecimento recorrente de marmitas e lanches para equipes
                operacionais, garantindo refeições práticas ao longo da rotina,
                com organização e previsibilidade.
              </p>
            </div>
          </div>

          <CTAButton href="/contato" className="min-w-[220px]">
            Solicitar proposta
          </CTAButton>
        </div>

        <div
            className="relative md:w-[420px] md:shrink-0"
            style={{ minHeight: isDesktop && pinHeight ? `${pinHeight}px` : undefined }}
          >
            <div
              ref={pinRef}
              style={pinStyle}
              className="space-y-6 transition-transform duration-150 ease-out"
            >
            <div className="overflow-hidden rounded-[2rem] border border-[#f1e7cf] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
              <img
                src={estruturaImg}
                alt="Estrutura da Degustar"
                className="h-[260px] w-full object-cover md:h-[320px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="overflow-hidden rounded-2xl border border-[#f1e7cf] bg-white shadow-sm">
              <img
                src={equipeImg}
                alt="Equipe em produção"
                className="h-[140px] w-full object-cover"
              />
            </div>

              <div className="overflow-hidden rounded-2xl border border-[#f1e7cf] bg-white shadow-sm">
                <img
                  src={refeicoesImg}
                  alt="Refeições prontas"
                  className="h-[140px] w-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[#f1e7cf] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold leading-relaxed text-degustar-green">
                Estrutura preparada para atender diferentes volumes e
                necessidades com organização e consistência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}