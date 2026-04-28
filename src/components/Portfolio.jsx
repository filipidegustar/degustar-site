import SectionContainer from "./SectionContainer";
import CTAButton from "./CTAButton";

import portfolioMarmita from "../assets/images/portfolio-marmita-individual.jpg";
import portfolioTradicional from "../assets/images/portfolio-tradicional.jpg";
import portfolioFit from "../assets/images/portfolio-fit.jpg";
import portfolioLowCarb from "../assets/images/portfolio-lowcarb.jpg";
import portfolioProducao from "../assets/images/portfolio-producao.jpg";
import portfolioCombos from "../assets/images/portfolio-combos.jpg";

function Card({ titulo, categoria, imagem, destaque }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[2rem] shadow-[0_14px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] ${
        destaque ? "min-h-[320px] md:min-h-[580px]" : "min-h-[240px] md:min-h-[185px]"
      }`}
    >
      <img
        src={imagem}
        alt={titulo}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/22 to-black/5" />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_38%,rgba(40,88,72,0.18))]" />

      <div className="relative flex h-full items-end p-5 md:p-6">
        <div className={`${destaque ? "max-w-[70%]" : "max-w-[85%]"}`}>
          <span className="inline-flex rounded-full border border-white/20 bg-white/14 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm mb-3">
            {categoria}
          </span>

          <h3
            className={`text-white font-semibold leading-tight ${
              destaque ? "text-2xl md:text-[2rem]" : "text-lg md:text-xl"
            }`}
          >
            {titulo}
          </h3>

          {destaque && (
            <p className="mt-3 hidden md:block text-white/85 text-sm leading-relaxed">
              Uma apresentação pensada para valorizar sabor, praticidade e o cuidado da Degustar.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  return (
    <SectionContainer className="bg-white" id="portfolio">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="inline-flex items-center rounded-full bg-degustar-beige px-4 py-2 text-sm font-medium text-degustar-green shadow-sm mb-6">
          Qualidade que também se vê
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-degustar-green mb-4">
          Nosso Portfólio
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Imagens que traduzem a apresentação, o cuidado e a qualidade presentes
          em cada detalhe da Degustar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        
        {/* BLOCO SUPERIOR */}
        <div className="md:col-span-2">
          <Card
            titulo="Marmitas Individuais"
            categoria="Apresentação"
            imagem={portfolioMarmita}
            destaque
          />
        </div>

        {/* COLUNA DIREITA (3 CARDS AGORA) */}
        <div className="flex flex-col gap-5 md:gap-6">
          <Card
            titulo="Linha Tradicional"
            categoria="Sabores"
            imagem={portfolioTradicional}
          />
          <Card
            titulo="Linha Fit"
            categoria="Equilíbrio"
            imagem={portfolioFit}
          />
          <Card
            titulo="Linha Low Carb"
            categoria="Leveza"
            imagem={portfolioLowCarb}
          />
        </div>

        {/* BLOCO INFERIOR */}
        <div className="md:col-span-1">
          <Card
            titulo="Produção Artesanal"
            categoria="Processo"
            imagem={portfolioProducao}
          />
        </div>

        <div className="md:col-span-2">
          <Card
            titulo="Combos Degustar"
            categoria="Praticidade"
            imagem={portfolioCombos}
          />
        </div>
      </div>

      <div className="mt-10 md:mt-12 text-center">
        <CTAButton
          href="https://www.instagram.com/degustar.adriana/"
          target="_blank"
          variant="secondary"
        >
          Ver mais no Instagram
        </CTAButton>
      </div>
    </SectionContainer>
  );
}