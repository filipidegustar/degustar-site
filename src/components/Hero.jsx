import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";
import heroImage from "../assets/images/hero-marmita-premium.jpeg";
import { Leaf, ChefHat, Snowflake, Truck } from "lucide-react";

const diferenciais = [
  {
    icon: Leaf,
    title: "Ingredientes selecionados",
  },
  {
    icon: ChefHat,
    title: "Produção artesanal",
  },
  {
    icon: Snowflake,
    title: "Congelamento que preserva o sabor",
  },
  {
    icon: Truck,
    title: "Entregas no litoral",
  },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-b-[2.5rem]"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center 24%",
      }}
    >
      {/* lado esquerdo mais sólido, transição gradual para revelar a marmita */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,66,55,0.96)_0%,rgba(20,72,59,0.92)_22%,rgba(25,79,66,0.80)_38%,rgba(26,78,64,0.55)_52%,rgba(27,76,62,0.28)_66%,rgba(27,76,62,0.08)_80%,rgba(27,76,62,0.00)_100%)]" />

      {/* profundidade geral */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/12" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 pt-10 md:pt-14 pb-20 md:pb-24">
        <div className="flex items-center min-h-[560px] md:min-h-[620px]">
          <div className="max-w-[640px]">
            <h1 className="text-white mb-6">
              <span className="block text-[38px] sm:text-[46px] md:text-[56px] lg:text-[64px] font-semibold tracking-tight leading-[0.98]">
                Alimentação
              </span>

              <span className="font-script block ml-4 sm:ml-6 md:ml-10 lg:ml-12 text-[#f57c20] text-[58px] sm:text-[74px] md:text-[88px] lg:text-[98px] leading-[0.82] drop-shadow-[0_6px_18px_rgba(244,122,42,0.22)] -mt-1">
                Saudável,
              </span>

              <span className="block ml-8 sm:ml-12 md:ml-16 lg:ml-20 text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-medium text-white tracking-tight leading-[0.96] -mt-1">
                prática de verdade.
              </span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white leading-relaxed mb-8 md:mb-9">
              Marmitas congeladas artesanais para facilitar sua rotina com
              sabor, qualidade e equilíbrio. Opções tradicionais, fit e low
              carb prontas para o seu dia a dia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/produtos" className="inline-block">
                <CTAButton as="span" className="min-w-[210px] text-base">
                  Monte seu combo
                </CTAButton>
              </Link>

              <Link to="/produtos" className="inline-block">
                <CTAButton
                  as="span"
                  variant="secondary"
                  className="min-w-[210px] text-base bg-white/10 text-white border-white/20 hover:bg-white/15"
                >
                  Ver produtos
                </CTAButton>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-white/90">
              <span className="rounded-full border border-white/12 bg-white/10 px-4 py-2 backdrop-blur-sm">
                Tradicional
              </span>

              <span className="rounded-full border border-white/12 bg-white/10 px-4 py-2 backdrop-blur-sm">
                Fit
              </span>

              <span className="rounded-full border border-white/12 bg-white/10 px-4 py-2 backdrop-blur-sm">
                Low Carb
              </span>
            </div>
          </div>
        </div>

        {/* faixa inferior inspirada no layout de referência */}
        <div className="relative translate-y-10 md:translate-y-12 z-20">
          <div className="mx-auto max-w-6xl rounded-[28px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] px-5 md:px-8 py-3 md:py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:gap-x-8 md:gap-y-4">
              {diferenciais.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 min-w-0 sm:flex-[0_1_auto]"
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className="shrink-0 text-degustar-orange"
                  />

                  <p className="text-sm md:text-[15px] font-semibold leading-tight text-degustar-green whitespace-nowrap">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}