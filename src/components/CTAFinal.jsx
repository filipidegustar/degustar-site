import SectionContainer from "./SectionContainer";
import CTAButton from "./CTAButton";

export default function CTAFinal() {
  return (
    <SectionContainer className="relative overflow-hidden bg-degustar-green" id="cta-final">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-degustar-orange/20 blur-3xl" />
        <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-white/6 blur-2xl" />
      </div>

      <div className="relative text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white mb-6 backdrop-blur-sm">
          Praticidade para sua rotina
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Agora é só escolher seu combo e pedir
        </h2>

        <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
          Marmitas congeladas com praticidade, cuidado e muito sabor para facilitar
          o seu dia a dia. Escolha seu combo e faça seu pedido da forma que for mais
          confortável para você.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <CTAButton
            href="/produtos"
            className="min-w-[220px]"
          >
            Montar meu combo
          </CTAButton>

          <CTAButton
            href="https://wa.me/55519994597667"
            target="_blank"
            variant="secondary"
            className="min-w-[220px]"
          >
            Chamar no WhatsApp
          </CTAButton>
        </div>

        <p className="text-sm text-white/60">
          Atendimento para clientes finais e empresas • Entrega na sua região
        </p>
      </div>
    </SectionContainer>
  );
}