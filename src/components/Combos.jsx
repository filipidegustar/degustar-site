import SectionContainer from "./SectionContainer";
import CTAButton from "./CTAButton";

const combos = [
  {
    titulo: "Combo 5",
    descricao: "Ideal para conhecer os sabores da Degustar com praticidade.",
    destaque: "",
    principal: false,
  },
  {
    titulo: "Combo 10",
    descricao: "Uma escolha equilibrada para unir praticidade e ótimo aproveitamento.",
    destaque: "Mais pedido",
    principal: true,
  },
  {
    titulo: "Combo 15",
    descricao: "Mais variedade para facilitar sua rotina com ainda mais conveniência.",
    destaque: "",
    principal: false,
  },
  {
    titulo: "Combo 20",
    descricao: "O melhor aproveitamento para quem busca praticidade no dia a dia.",
    destaque: "Mais vendido",
    principal: true,
  },
];

export default function Combos() {
  return (
    <SectionContainer
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#ffffff_35%,#fffaf0_100%)]"
      id="combos"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-10 h-40 w-40 rounded-full bg-degustar-beige/40 blur-3xl" />
        <div className="absolute right-[-6%] bottom-0 h-56 w-56 rounded-full bg-degustar-orange/10 blur-3xl" />
      </div>

      <div className="relative text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center rounded-full border border-degustar-green/10 bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-degustar-green shadow-sm mb-5">
          Combos pensados para facilitar sua rotina
        </span>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-degustar-green mb-4">
          Escolha o combo ideal para sua rotina
        </h2>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          Mais praticidade, variedade e melhor aproveitamento para montar seu
          pedido do seu jeito.
        </p>
      </div>

      <div className="relative grid md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
        {combos.map((combo) => (
          <div
            key={combo.titulo}
            className={`group relative overflow-hidden rounded-[1.9rem] p-[1px] transition-all duration-300 hover:-translate-y-1 ${
              combo.principal
                ? "bg-[linear-gradient(180deg,rgba(231,106,62,0.35),rgba(255,235,181,0.55),rgba(40,88,72,0.08))] shadow-[0_18px_50px_-24px_rgba(40,88,72,0.30)]"
                : "bg-[linear-gradient(180deg,rgba(40,88,72,0.10),rgba(0,0,0,0.04))] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_48px_-24px_rgba(40,88,72,0.18)]"
            }`}
          >
            <div
              className={`relative h-full rounded-[1.8rem] px-6 py-6 text-center ${
                combo.principal
                  ? "bg-[linear-gradient(180deg,rgba(255,248,232,0.96),rgba(255,255,255,0.98))]"
                  : "bg-white/95"
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-20 ${
                  combo.principal
                    ? "bg-[radial-gradient(circle_at_top,rgba(231,106,62,0.16),transparent_70%)]"
                    : "bg-[radial-gradient(circle_at_top,rgba(40,88,72,0.08),transparent_70%)]"
                }`}
              />

              {combo.destaque && (
                <div className="relative inline-flex items-center rounded-full border border-degustar-orange/15 bg-degustar-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white mb-4 shadow-sm">
                  {combo.destaque}
                </div>
              )}

              <h3 className="relative text-2xl font-semibold tracking-tight text-degustar-green mb-3">
                {combo.titulo}
              </h3>

              <p className="relative text-gray-600 leading-relaxed mb-6 min-h-[72px] text-[15px]">
                {combo.descricao}
              </p>

              <div className="relative">
                <CTAButton
                  href="/produtos"
                  variant={combo.principal ? "primary" : "secondary"}
                  className={`w-full ${
                    combo.principal
                      ? "shadow-[0_12px_26px_-14px_rgba(231,106,62,0.65)]"
                      : ""
                  }`}
                >
                  Montar combo
                </CTAButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}