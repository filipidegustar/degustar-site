import { Ribbon } from "lucide-react";

/**
 * Faixa explicativa exibida apenas durante o Outubro Rosa (ver Home.jsx),
 * avisando o visitante do motivo da mudança de cores, reforçando o apoio
 * da Degustar à causa e convidando a conhecer a página de prevenção.
 *
 * Duas versões de texto: uma enxuta pro mobile (evita quebrar em várias
 * linhas na faixa fina) e uma completa a partir de md:, onde há espaço.
 */
export default function BannerOutubroRosa() {
  return (
    <div className="bg-degustar-orange">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-6 py-3 text-center sm:flex-row sm:gap-4 md:px-8 md:py-4">
        <div className="flex items-center gap-2 text-white">
          <Ribbon size={40} className="shrink-0" strokeWidth={2} />

          {/* Versão completa — telas médias/grandes */}
          <p className="hidden text-sm font-medium leading-snug md:block md:text-base">
            Nossas embalagens ficam rosa por um motivo: a Degustar apoia o
            Outubro Rosa. Faça parte dessa causa com a gente, confira dicas
            de prevenção e cuidado.
          </p>

          {/* Versão enxuta — mobile */}
          <p className="text-sm font-medium md:hidden">
            Outubro Rosa: a Degustar apoia a causa. Faça parte com a gente.
          </p>
        </div>

        <a
          href="/outubro-rosa"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-degustar-orange transition-transform duration-300 hover:scale-[1.02] md:text-base"
        >
          Saiba mais
        </a>
      </div>
    </div>
  );
}
