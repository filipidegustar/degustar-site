import { useEffect, useState } from "react";

const TEMA_CLASS = "tema-outubro-rosa";

// Janela de ativação travada no ano de 2026 — não repete sozinha em anos
// seguintes. Para reativar em outro ano, é preciso atualizar estas datas
// deliberadamente (decisão consciente, não automática).
const INICIO = new Date(2026, 9, 1, 0, 0, 0);   // 1º de outubro de 2026
const FIM = new Date(2026, 9, 31, 23, 59, 59);  // 31 de outubro de 2026

/**
 * Ativa o tema visual do Outubro Rosa automaticamente durante a janela
 * de datas definida acima, aplicando a classe `.tema-outubro-rosa` no
 * elemento <html>. Isso faz as variáveis CSS de cor mudarem em cascata
 * para toda a página, sem precisar alterar nenhum componente.
 *
 * Retorna um booleano (`ativo`) que os componentes podem usar para
 * decidir se mostram algo extra (ex: o banner explicativo).
 *
 * Override manual (útil para testar antes da data, estender o prazo,
 * ou desligar em caso de imprevisto) via variável de ambiente do Vercel
 * ou de um .env.local NA RAIZ do projeto:
 *   VITE_FORCAR_TEMA_ROSA = "true"  -> força ativado
 *   VITE_FORCAR_TEMA_ROSA = "false" -> força desativado
 *   (não definida) -> segue a data automaticamente
 */
export function useTemaSazonal() {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const forcar = import.meta.env.VITE_FORCAR_TEMA_ROSA;

    let estaAtivo;
    if (forcar === "true") {
      estaAtivo = true;
    } else if (forcar === "false") {
      estaAtivo = false;
    } else {
      const agora = new Date();
      estaAtivo = agora >= INICIO && agora <= FIM;
    }

    setAtivo(estaAtivo);

    if (estaAtivo) {
      document.documentElement.classList.add(TEMA_CLASS);
    }

    return () => {
      document.documentElement.classList.remove(TEMA_CLASS);
    };
  }, []);

  return ativo;
}
