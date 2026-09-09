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
import BannerOutubroRosa from "../components/BannerOutubroRosa";
import { useTemaSazonal } from "../hooks/useTemaSazonal";

export default function Home() {
  // Ativa o tema Outubro Rosa automaticamente durante a janela de datas
  // configurada em useTemaSazonal.js — sem ação manual necessária.
  // temaAtivo também controla a exibição do banner explicativo abaixo.
  const temaAtivo = useTemaSazonal();

  return (
    <>
      {temaAtivo && <BannerOutubroRosa />}

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
