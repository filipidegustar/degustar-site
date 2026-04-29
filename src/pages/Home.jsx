import Hero from "../components/Hero";
import Problema from "../components/Problema";
import Solucao from "../components/Solucao";
import LinhasProdutos from "../components/LinhasProdutos";
import Combos from "../components/Combos";
import ComoFunciona from "../components/ComoFunciona";
import Empresas from "../components/Empresas";
import VideoInstitucional from "../components/VideoInstitucional";
import Portfolio from "../components/Portfolio";
import RegiaoEntrega from "../components/RegiaoEntrega";
import CTAFinal from "../components/CTAFinal";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      <Reveal>
        <Problema />
      </Reveal>

      <Reveal>
        <Solucao />
      </Reveal>

      <Reveal>
        <LinhasProdutos />
      </Reveal>

      <Reveal>
        <Combos />
      </Reveal>

      <Reveal>
        <ComoFunciona />
      </Reveal>

      <Empresas />

      <Reveal>
        <VideoInstitucional />
      </Reveal>

      <Reveal>
        <Portfolio />
      </Reveal>

      <Reveal>
        <RegiaoEntrega />
      </Reveal>

      <Reveal>
        <CTAFinal />
      </Reveal>
    </>
  );
}