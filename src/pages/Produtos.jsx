import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase";

const filtros = ["Todas", "Tradicional", "Fit", "Low Carb", "Inverno"];

const LINHA_INVERNO_ID = 8;
const GRUPO_PADRAO_ID = 1;
const GRUPO_INVERNO_ID = 2;

const combosPadrao = [5, 10, 15, 20];
const combosInverno = [5, 10];

const combosMaisVendidos = [10, 20];

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getLinhaBadgeClasses(linha) {
  switch (linha) {
    case "Tradicional":
      return "bg-[#eaf6ef] text-[#285848]";
    case "Fit":
      return "bg-[#fff3e8] text-[#c65a2e]";
    case "Low Carb":
      return "bg-[#ffebb5] text-[#285848]";
    default:
      return "bg-gray-100 text-gray-700";
    case "Inverno":
      return "bg-[#eef6ff] text-[#1f4e79]";  
  }
}

function getComboInfo(totalSelecionado, tipo = "padrao") {
  const combos = tipo === "inverno" ? combosInverno : combosPadrao;

  if (totalSelecionado === 0) {
    return {
      comboAlvo: 5,
      faltam: 5,
      progresso: 0,
      mensagem:
        tipo === "inverno"
          ? "Escolha seus primeiros 5 produtos da Linha Inverno para montar um combo."
          : "Escolha suas primeiras 5 marmitas para montar um combo.",
      destaque: "Comece seu pedido",
    };
  }

  const comboExato = combos.find((combo) => combo === totalSelecionado);

  if (comboExato) {
    const proximoCombo = combos.find((combo) => combo > totalSelecionado);

    return {
      comboAlvo: comboExato,
      faltam: 0,
      progresso: 100,
      mensagem:
        tipo === "inverno"
          ? `Você fechou o combo Inverno de ${comboExato} unidades.`
          : `Você fechou o combo de ${comboExato} marmitas.`,
      destaque: combosMaisVendidos.includes(comboExato)
        ? "Combo mais pedido ⭐"
        : "Combo fechado",
      proximoCombo,
    };
  }

  const proximoCombo = combos.find((combo) => combo > totalSelecionado);

  if (proximoCombo) {
    const faltam = proximoCombo - totalSelecionado;
    const comboAnterior = [...combos]
      .reverse()
      .find((combo) => combo < totalSelecionado);

    const baseProgresso = comboAnterior || 0;
    const intervalo = proximoCombo - baseProgresso;
    const progresso = ((totalSelecionado - baseProgresso) / intervalo) * 100;

    return {
      comboAlvo: proximoCombo,
      faltam,
      progresso,
      mensagem:
        tipo === "inverno"
          ? `Adicione mais ${faltam} produto${faltam > 1 ? "s" : ""} da Linha Inverno para liberar o Combo ${proximoCombo}.`
          : `Adicione mais ${faltam} marmita${faltam > 1 ? "s" : ""} para liberar o valor do Combo ${proximoCombo}.`,
      destaque: combosMaisVendidos.includes(proximoCombo)
        ? "Combo mais pedido ⭐"
        : "Continue montando seu pedido",
    };
  }

  return {
    comboAlvo: combos[combos.length - 1],
    faltam: 0,
    progresso: 100,
    mensagem:
      tipo === "inverno"
        ? `Você selecionou ${totalSelecionado} produtos da Linha Inverno.`
        : `Você selecionou ${totalSelecionado} marmitas.`,
    destaque: "Pedido acima dos combos",
  };
}

function normalizarProduto(produto) {
  const nomeBase = produto.nome || "Produto sem nome";
  const codigoBase = produto.codigo ? String(produto.codigo) : "";

  return {
    id: produto.id,
    codigo: codigoBase,
    nome: nomeBase,
    nomeExibicao: codigoBase ? `${codigoBase} - ${nomeBase}` : nomeBase,
    linha: produto.linhas_marmita?.nome || "Tradicional",
    linha_id: Number(produto.linha_id || 999),
    grupo_preco_id: Number(produto.linhas_marmita?.grupo_preco_id || 0),
    descricao:
      produto.descricao_site ||
      produto.observacoes ||
      "Sem descrição cadastrada.",
    imagem:
      produto.foto_url ||
      "https://via.placeholder.com/400x280?text=Degustar",
  };
}

export default function Produtos() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todas");
  const [carrinho, setCarrinho] = useState({});
  const [resumoAberto, setResumoAberto] = useState(false);

  const [produtos, setProdutos] = useState([]);
  const [regrasPreco, setRegrasPreco] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroProdutos, setErroProdutos] = useState("");

  const [modalPedidoAberto, setModalPedidoAberto] = useState(false);
  const [enviandoPedido, setEnviandoPedido] = useState(false);
  const [erroPedido, setErroPedido] = useState("");
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    telefone: "",
    cidadeBairro: "",
    cupom: "",
    observacoes: "",
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErroProdutos("");

        const { data: produtosData, error: produtosError } = await supabase
          .from("produtos")
          .select(`
            id,
            codigo,
            nome,
            observacoes,
            descricao_site,
            foto_url,
            ativo,
            publicar_no_site,
            categoria_id,
            linha_id,
            linhas_marmita (
              id,
              nome,
              grupo_preco_id
            )
          `)
          .eq("ativo", true)
          .eq("publicar_no_site", true)
          .eq("categoria_id", 1)
          .order("codigo", { ascending: true });

        if (produtosError) throw produtosError;

        const { data: regrasData, error: regrasError } = await supabase
          .from("regras_preco_grupo")
          .select("*")
          .eq("ativo", true)
          .order("quantidade_minima", { ascending: true });

        if (regrasError) throw regrasError;

        const produtosNormalizados = (produtosData || [])
          .map(normalizarProduto)
          .sort((a, b) => {
            if (a.linha_id !== b.linha_id) {
              return a.linha_id - b.linha_id;
            }

            return Number(a.codigo) - Number(b.codigo);
          });

        setProdutos(produtosNormalizados);
        setRegrasPreco(regrasData || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setErroProdutos("Não foi possível carregar os produtos no momento.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const produtosFiltrados = useMemo(() => {
    if (filtroAtivo === "Todas") return produtos;
    return produtos.filter((produto) => produto.linha === filtroAtivo);
  }, [filtroAtivo, produtos]);

  const totalSelecionado = useMemo(() => {
    return Object.values(carrinho).reduce(
      (total, quantidade) => total + quantidade,
      0
    );
  }, [carrinho]);

  const itensSelecionados = useMemo(() => {
    return produtos
      .filter((produto) => carrinho[produto.id] > 0)
      .map((produto) => ({
        ...produto,
        quantidade: carrinho[produto.id],
      }));
  }, [carrinho, produtos]);

  const resumoPorGrupo = useMemo(() => {
  const grupos = {};

  itensSelecionados.forEach((item) => {
    const grupoId = Number(item.grupo_preco_id || 0);

    if (!grupos[grupoId]) {
      grupos[grupoId] = {
        grupo_preco_id: grupoId,
        linha_id: item.linha_id,
        linha: item.linha,
        quantidade: 0,
        itens: [],
      };
    }

    grupos[grupoId].quantidade += item.quantidade;
    grupos[grupoId].itens.push(item);
  });

  return Object.values(grupos).map((grupo) => {
    const regra = [...regrasPreco]
      .filter((regra) => Number(regra.grupo_preco_id) === Number(grupo.grupo_preco_id))
      .reverse()
      .find((regra) => grupo.quantidade >= regra.quantidade_minima);

    const precoUnitario = Number(regra?.preco_unitario || 0);
    const subtotal = grupo.quantidade * precoUnitario;

    return {
      ...grupo,
      regra,
      precoUnitario,
      subtotal,
      tipo: Number(grupo.grupo_preco_id) === GRUPO_INVERNO_ID ? "inverno" : "padrao",
    };
  });
}, [itensSelecionados, regrasPreco]);

const totalPadrao = resumoPorGrupo
  .filter((grupo) => grupo.tipo === "padrao")
  .reduce((total, grupo) => total + grupo.quantidade, 0);

const totalInverno = resumoPorGrupo
  .filter((grupo) => grupo.tipo === "inverno")
  .reduce((total, grupo) => total + grupo.quantidade, 0);

    const comboInfoPadrao = useMemo(() => {
  return getComboInfo(totalPadrao, "padrao");
}, [totalPadrao]);

const comboInfoInverno = useMemo(() => {
  return getComboInfo(totalInverno, "inverno");
}, [totalInverno]);

const valorTotalPedido = resumoPorGrupo.reduce(
  (total, grupo) => total + grupo.subtotal,
  0
);

const precoUnitarioAtual =
  resumoPorGrupo.length === 1 ? resumoPorGrupo[0].precoUnitario : 0;

  function adicionarProduto(produtoId) {
    setCarrinho((prev) => ({
      ...prev,
      [produtoId]: (prev[produtoId] || 0) + 1,
    }));
  }

  function removerProduto(produtoId) {
    setCarrinho((prev) => {
      const quantidadeAtual = prev[produtoId] || 0;

      if (quantidadeAtual <= 1) {
        const novoCarrinho = { ...prev };
        delete novoCarrinho[produtoId];
        return novoCarrinho;
      }

      return {
        ...prev,
        [produtoId]: quantidadeAtual - 1,
      };
    });
  }

  function limparCarrinho() {
    setCarrinho({});
    setResumoAberto(false);
  }

  function acessoMobile() {
    return /Android|iPhone|iPod|Opera Mini|IEMobile|Mobile/i.test(
      navigator.userAgent
    );
  }

  function montarMensagemPedido(dados = null) {
    const linhas = itensSelecionados.map((item) => {
      return `• ${item.quantidade}x ${item.nomeExibicao}`;
    });

    return `
  Olá! Gostaria de fazer o seguinte pedido:

  ${linhas.join("\n")}

  Total de marmitas: ${totalSelecionado}

    Resumo por linha:
  ${resumoPorGrupo
    .map(
      (grupo) =>
        `• ${grupo.linha}: ${grupo.quantidade} unidade(s) x ${formatarMoeda(
          grupo.precoUnitario
        )} = ${formatarMoeda(grupo.subtotal)}`
    )
    .join("\n")}

  Valor total estimado:
  ${formatarMoeda(valorTotalPedido)}
  ${
    dados
      ? `

  Dados do cliente:
  Nome: ${dados.nome}
  Telefone/WhatsApp: ${dados.telefone}
  Cidade/Bairro: ${dados.cidadeBairro || "Não informado"}
  Cupom: ${dados.cupom || "Não informado"}
  Observações: ${dados.observacoes || "Nenhuma"}`
      : ""
  }

  O valor final será confirmado no atendimento.
  `;
  }

  function abrirWhatsApp() {
    const mensagem = montarMensagemPedido();

    const url = `https://wa.me/5551994597667?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
  }

  function handleFinalizarPedido() {
    if (itensSelecionados.length === 0) return;

    if (acessoMobile()) {
      abrirWhatsApp();
      return;
    }

    setErroPedido("");
    setPedidoEnviado(false);
    setModalPedidoAberto(true);
  }

  async function enviarPedidoDesktop(event) {
    event.preventDefault();

    if (!dadosCliente.nome.trim() || !dadosCliente.telefone.trim()) {
      setErroPedido("Informe seu nome e telefone/WhatsApp para continuar.");
      return;
    }

    try {
      setEnviandoPedido(true);
      setErroPedido("");

      const itensPedido = itensSelecionados.map((item) => {
        const grupo = resumoPorGrupo.find(
          (grupo) => grupo.grupo_preco_id === item.grupo_preco_id
        );

        return {
          produto_id: item.id,
          codigo: item.codigo,
          nome: item.nome,
          nome_exibicao: item.nomeExibicao,
          linha: item.linha,
          grupo_preco_id: item.grupo_preco_id,
          quantidade: item.quantidade,
          preco_unitario: grupo?.precoUnitario || 0,
          subtotal: item.quantidade * (grupo?.precoUnitario || 0),
        };
      });

      const pedidoPayload = {
        nome_cliente: dadosCliente.nome.trim(),
        telefone_cliente: dadosCliente.telefone.trim(),
        cidade_bairro: dadosCliente.cidadeBairro.trim() || null,
        observacoes: dadosCliente.observacoes.trim() || null,
        cupom: dadosCliente.cupom.trim() || null,
        itens: itensPedido,
        quantidade_total: totalSelecionado,
        valor_unitario: precoUnitarioAtual || null,
        valor_total: valorTotalPedido,
        atendido: false,
        origem: "site",
      };

      const { data: pedidoCriado, error: erroInsert } = await supabase
        .from("pedidos_site")
        .insert(pedidoPayload)
        .select()
        .single();

      if (erroInsert) throw erroInsert;

      const { error: erroEmail } = await supabase.functions.invoke(
        "avisar-pedido-site",
        {
          body: {
            pedido_id: pedidoCriado.id,
            nome_cliente: pedidoPayload.nome_cliente,
            telefone_cliente: pedidoPayload.telefone_cliente,
            quantidade_total: pedidoPayload.quantidade_total,
            valor_total: pedidoPayload.valor_total,
          },
        }
      );

      if (erroEmail) {
        console.error("Erro ao avisar pedido por e-mail:", erroEmail);
      }

      setPedidoEnviado(true);
      limparCarrinho();

      setDadosCliente({
        nome: "",
        telefone: "",
        cidadeBairro: "",
        cupom: "",
        observacoes: "",
      });
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      setErroPedido(
        "Não foi possível enviar o pedido agora. Tente novamente ou entre em contato pelo WhatsApp."
      );
    } finally {
      setEnviandoPedido(false);
    }
  }

  const nomesCombos = {
    5: "PROVAR & AMAR",
    10: "SEMANA TRANQUILA",
    15: "ROTINA LEVE",
    20: "VIDA PRÁTICA",
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#fffaf0] pb-40 pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex rounded-full bg-[#eaf6ef] px-4 py-2 text-sm font-medium text-[#285848]">
              Cardápio Degustar
            </span>

            <h1 className="mb-4 text-3xl font-bold text-[#1f4337] md:text-5xl">
              Nosso cardápio
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#4b5563] md:text-lg">
              Escolha suas marmitas, acompanhe sua seleção e monte seu combo sem sair da página.
            </p>
          </div>

        {regrasPreco.length > 0 && (
          <div className="mx-auto mb-12 max-w-6xl rounded-3xl border border-[#eadfbe] bg-white p-6 shadow-sm">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-[#1f4337]">
                Escolha seu combo
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Você pode misturar marmitas Tradicionais, Fit e Low Carb no mesmo pedido.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {regrasPreco
                .filter(
                  (regra) =>
                    Number(regra.grupo_preco_id) === GRUPO_PADRAO_ID &&
                    regra.quantidade_minima > 1
                )
                .map((regra) => {
                  const quantidade = regra.quantidade_minima;

                  const valorOriginal = quantidade * 23;
                  const valorCombo = quantidade * Number(regra.preco_unitario);
                  const economia = valorOriginal - valorCombo;

                  const isMaisPedido = quantidade === 10;
                  const isMelhorValor = quantidade === 20;

                  return (
                    <div
                      key={regra.id}
                      className={`relative overflow-hidden rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-lg ${
                        isMelhorValor
                          ? "border-[#e76a3e] bg-[#fff3e8]"
                          : "border-[#eadfbe] bg-[#fffdf8]"
                      }`}
                    >
                      {isMaisPedido && (
                        <span className="absolute right-4 top-4 rounded-full bg-[#285848] px-3 py-1 text-xs font-semibold text-white">
                          Mais pedido
                        </span>
                      )}

                      {isMelhorValor && (
                        <span className="absolute right-4 top-4 rounded-full bg-[#e76a3e] px-3 py-1 text-xs font-semibold text-white">
                          Melhor valor
                        </span>
                      )}

                      <p className="text-sm font-semibold uppercase tracking-wide text-[#e76a3e]">
                        Combo
                      </p>

                      <h3 className="mt-1 text-2xl font-black text-[#1f4337] leading-tight">
                        {nomesCombos[quantidade] || `${quantidade} marmitas`}
                      </h3>

                      <p className="mb-6 text-sm text-gray-500">
                        {quantidade} marmitas
                      </p>

                      <div className="mb-2">
                        <p className="text-sm text-gray-400 line-through">
                          De {formatarMoeda(valorOriginal)}
                        </p>

                        <p className="text-3xl font-black text-[#1f4337]">
                          {formatarMoeda(valorCombo)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#eef6f1] px-4 py-3">
                        <p className="text-xs font-medium text-[#285848]">
                          Economia de {formatarMoeda(economia)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="mt-10 border-t border-[#eadfbe] pt-8">
  <div className="mb-6 text-center">
    <h3 className="text-xl font-bold text-[#1f4337]">
      Combos Linha Inverno
    </h3>

    <p className="mt-2 text-sm text-gray-600">
      Combos exclusivos para sopas e cremes da Linha Inverno.
    </p>
  </div>

  <div className="grid gap-5 md:grid-cols-2">
    {regrasPreco
      .filter(
        (regra) =>
          Number(regra.grupo_preco_id) === GRUPO_INVERNO_ID &&
          regra.quantidade_minima > 1
      )
      .map((regra) => {
        const quantidade = regra.quantidade_minima;
        const valorOriginal = quantidade * 19;
        const valorCombo = quantidade * Number(regra.preco_unitario);
        const economia = valorOriginal - valorCombo;

        return (
          <div
            key={regra.id}
            className="relative overflow-hidden rounded-3xl border border-[#b9d7ef] bg-[#f4faff] p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1f4e79]">
              Combo Inverno
            </p>

            <h3 className="mt-1 text-2xl font-black text-[#1f4337] leading-tight">
              {quantidade} unidades
            </h3>

            <p className="mb-6 text-sm text-gray-500">
              Sopas e cremes da Linha Inverno
            </p>

            <div className="mb-2">
              <p className="text-sm text-gray-400 line-through">
                De {formatarMoeda(valorOriginal)}
              </p>

              <p className="text-3xl font-black text-[#1f4337]">
                {formatarMoeda(valorCombo)}
              </p>
            </div>

            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-medium text-[#1f4e79]">
                Economia de {formatarMoeda(economia)}
              </p>
            </div>
          </div>
        );
      })}
  </div>
</div>
          </div>
        )}

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {filtros.map((filtro) => {
              const ativo = filtro === filtroAtivo;

              return (
                <button
                  key={filtro}
                  type="button"
                  onClick={() => setFiltroAtivo(filtro)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    ativo
                      ? "bg-[#285848] text-white shadow-md"
                      : "border border-[#d8e5de] bg-white text-[#285848] hover:bg-[#f3f8f5]"
                  }`}
                >
                  {filtro}
                </button>
              );
            })}
          </div>

          

          {carregando && (
            <div className="rounded-3xl border border-[#eadfbe] bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-base font-medium text-[#1f4337]">
                Carregando produtos...
              </p>
            </div>
          )}

          {!carregando && erroProdutos && (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center shadow-sm">
              <p className="text-base font-medium text-red-700">
                {erroProdutos}
              </p>
            </div>
          )}

          {!carregando && !erroProdutos && produtosFiltrados.length === 0 && (
            <div className="rounded-3xl border border-[#eadfbe] bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-base font-medium text-[#1f4337]">
                Nenhum produto encontrado para este filtro.
              </p>
            </div>
          )}

          {!carregando && !erroProdutos && produtosFiltrados.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {produtosFiltrados.map((produto) => {
                const quantidadeSelecionada = carrinho[produto.id] || 0;

                return (
                  <article
                    key={produto.id}
                    className="overflow-hidden rounded-3xl border border-[#efe6cc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#f4efe2]">
                      <img
                        src={produto.imagem}
                        alt={produto.nomeExibicao}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <div className="mb-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getLinhaBadgeClasses(
                            produto.linha
                          )}`}
                        >
                          {produto.linha}
                        </span>
                      </div>

                      <h2 className="mb-2 text-lg font-bold text-[#1f4337]">
                        {produto.nomeExibicao}
                      </h2>

                      <p className="mb-5 text-sm leading-relaxed text-gray-600">
                        {produto.descricao}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => adicionarProduto(produto.id)}
                          className="rounded-xl bg-[#e76a3e] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                        >
                          + Adicionar
                        </button>

                        {quantidadeSelecionada > 0 && (
                          <div className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] px-2 py-1">
                            <button
                              type="button"
                              onClick={() => removerProduto(produto.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f5f5] text-lg font-semibold text-[#1f4337] hover:bg-[#ebebeb]"
                            >
                              -
                            </button>

                            <span className="min-w-[24px] text-center text-sm font-bold text-[#1f4337]">
                              {quantidadeSelecionada}
                            </span>

                            <button
                              type="button"
                              onClick={() => adicionarProduto(produto.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f5f5] text-lg font-semibold text-[#1f4337] hover:bg-[#ebebeb]"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

<div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 backdrop-blur-md">
  <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
    <div className="rounded-2xl border border-[#eadfbe] bg-white px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="grid gap-3 md:grid-cols-2">
          {resumoPorGrupo.map((grupo) => {
            const comboInfoGrupo =
              grupo.tipo === "inverno" ? comboInfoInverno : comboInfoPadrao;

            return (
              <div
                key={grupo.grupo_preco_id}
                className="rounded-2xl bg-[#fffaf0] px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#1f4337]">
                      {grupo.tipo === "inverno"
                        ? "Linha Inverno"
                        : "Tradicional, Fit e Low Carb"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {grupo.quantidade} item
                      {grupo.quantidade !== 1 ? "s" : ""} x{" "}
                      {formatarMoeda(grupo.precoUnitario)}
                    </p>
                  </div>

                  <p className="text-lg font-black text-[#e76a3e]">
                    {formatarMoeda(grupo.subtotal)}
                  </p>
                </div>

                {comboInfoGrupo.faltam > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Faltam {comboInfoGrupo.faltam} para o combo de{" "}
                    {comboInfoGrupo.comboAlvo}.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 lg:min-w-[240px]">
          <div className="rounded-2xl bg-[#eef6f1] px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-[#1f4337]">
                Total
              </p>

              <p className="text-xl font-black text-[#e76a3e]">
                {formatarMoeda(valorTotalPedido)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setResumoAberto(true)}
              disabled={totalSelecionado === 0}
              className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition ${
                totalSelecionado === 0
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "border border-[#285848]/15 bg-[#f7fbf8] text-[#285848] hover:bg-[#eef6f1]"
              }`}
            >
              Ver itens
            </button>

            <button
              type="button"
              onClick={handleFinalizarPedido}
              disabled={totalSelecionado === 0}
              className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition ${
                totalSelecionado === 0
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "bg-[#e76a3e] text-white shadow-lg shadow-[#e76a3e]/20 hover:opacity-90"
              }`}
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </section>

      {resumoAberto && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 md:items-center">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#f0ead8] px-5 py-4 md:px-6">
              <div>
                <p className="text-sm text-gray-500">Resumo do pedido</p>
                <h3 className="text-xl font-bold text-[#1f4337]">
                  {totalSelecionado} item{totalSelecionado !== 1 ? "s" : ""} selecionado
                  {totalSelecionado !== 1 ? "s" : ""}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setResumoAberto(false)}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Fechar
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto px-5 py-5 md:px-6">
              {itensSelecionados.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#d9d9d9] bg-[#fafafa] px-6 py-10 text-center">
                  <p className="text-base font-medium text-[#1f4337]">
                    Nenhuma marmita selecionada ainda.
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Adicione itens ao pedido para visualizar o resumo aqui.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {resumoPorGrupo.map((grupo) => (
                    <div key={grupo.grupo_preco_id}>
                      <div className="mb-3 rounded-2xl bg-[#fffaf0] px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-[#1f4337]">
                              {grupo.tipo === "inverno"
                                ? "Linha Inverno"
                                : "Tradicional, Fit e Low Carb"}
                            </p>

                            <p className="text-xs text-gray-500">
                              {grupo.quantidade} item
                              {grupo.quantidade !== 1 ? "s" : ""} x{" "}
                              {formatarMoeda(grupo.precoUnitario)}
                            </p>
                          </div>

                          <p className="text-lg font-black text-[#e76a3e]">
                            {formatarMoeda(grupo.subtotal)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {grupo.itens.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 rounded-2xl border border-[#efe6cc] bg-[#fffdf8] p-4"
                          >
                            <div className="h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f4efe2]">
                              <img
                                src={item.imagem}
                                alt={item.nomeExibicao}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <h4 className="text-base font-semibold text-[#1f4337]">
                                  {item.nomeExibicao}
                                </h4>

                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getLinhaBadgeClasses(
                                    item.linha
                                  )}`}
                                >
                                  {item.linha}
                                </span>
                              </div>

                              <p className="mb-4 text-sm text-gray-600">
                                {item.descricao}
                              </p>

                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-gray-500">
                                  Quantidade: {item.quantidade}
                                </span>

                                <div className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] px-2 py-1">
                                  <button
                                    type="button"
                                    onClick={() => removerProduto(item.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f5f5] text-lg font-semibold text-[#1f4337] hover:bg-[#ebebeb]"
                                  >
                                    -
                                  </button>

                                  <span className="min-w-[24px] text-center text-sm font-bold text-[#1f4337]">
                                    {item.quantidade}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => adicionarProduto(item.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f5f5] text-lg font-semibold text-[#1f4337] hover:bg-[#ebebeb]"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#f0ead8] bg-[#fffaf0] px-5 py-4 md:px-6">
              <div className="mb-4 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Resumo final</p>
                    <p className="text-lg font-bold text-[#1f4337]">
                      {totalSelecionado} item{totalSelecionado !== 1 ? "s" : ""} no pedido
                    </p>
                  </div>

                  {itensSelecionados.length > 0 && (
                    <button
                      type="button"
                      onClick={limparCarrinho}
                      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Limpar seleção
                    </button>
                  )}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {resumoPorGrupo.map((grupo) => {
                    const comboInfoGrupo =
                      grupo.tipo === "inverno" ? comboInfoInverno : comboInfoPadrao;

                    return (
                      <div
                        key={grupo.grupo_preco_id}
                        className="rounded-2xl bg-white px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-[#1f4337]">
                              {grupo.tipo === "inverno"
                                ? "Linha Inverno"
                                : "Tradicional, Fit e Low Carb"}
                            </p>

                            <p className="text-xs text-gray-500">
                              {grupo.quantidade} item
                              {grupo.quantidade !== 1 ? "s" : ""} x{" "}
                              {formatarMoeda(grupo.precoUnitario)}
                            </p>
                          </div>

                          <p className="text-lg font-black text-[#e76a3e]">
                            {formatarMoeda(grupo.subtotal)}
                          </p>
                        </div>

                        <p className="mt-2 text-xs text-gray-600">
                          {comboInfoGrupo.mensagem}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl bg-[#eef6f1] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-[#1f4337]">
                      Total geral
                    </p>

                    <p className="text-2xl font-black text-[#e76a3e]">
                      {formatarMoeda(valorTotalPedido)}
                    </p>
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    Valor estimado. O total final será confirmado no atendimento.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <button
                  type="button"
                  onClick={() => setResumoAberto(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl border border-[#285848]/15 bg-white px-5 py-3 text-sm font-semibold text-[#285848] transition hover:bg-[#f5faf7]"
                >
                  Continuar escolhendo
                </button>

                <button
                  type="button"
                  onClick={handleFinalizarPedido}
                  disabled={totalSelecionado === 0}
                  className={`inline-flex flex-1 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    totalSelecionado === 0
                      ? "cursor-not-allowed bg-gray-200 text-gray-500"
                      : "bg-[#e76a3e] text-white shadow-lg shadow-[#e76a3e]/20 hover:opacity-90"
                  }`}
                >
                  Finalizar pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalPedidoAberto && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/40 p-4 md:items-center">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-[#f0ead8] px-5 py-4 md:px-6">
              <h3 className="text-xl font-bold text-[#1f4337]">
                {pedidoEnviado ? "Pedido enviado" : "Finalizar pedido"}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {pedidoEnviado
                  ? "Recebemos seu pedido com sucesso."
                  : "Informe seus dados para recebermos o pedido e entrarmos em contato."}
              </p>
            </div>

            {pedidoEnviado ? (
              <div className="px-5 py-6 md:px-6">
                <div className="rounded-2xl bg-[#eef6f1] px-5 py-5 text-center">
                  <p className="text-lg font-bold text-[#285848]">
                    Pedido recebido!
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Pronto! Recebemos seu pedido e entraremos em contato pelo WhatsApp para confirmar os detalhes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setModalPedidoAberto(false);
                    setPedidoEnviado(false);
                  }}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#e76a3e] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={enviarPedidoDesktop} className="px-5 py-5 md:px-6">
                <div className="grid gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#1f4337]">
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={dadosCliente.nome}
                      onChange={(e) =>
                        setDadosCliente((prev) => ({
                          ...prev,
                          nome: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-[#eadfbe] px-4 py-3 text-sm outline-none focus:border-[#e76a3e]"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#1f4337]">
                      Telefone/WhatsApp *
                    </label>
                    <input
                      type="text"
                      value={dadosCliente.telefone}
                      onChange={(e) =>
                        setDadosCliente((prev) => ({
                          ...prev,
                          telefone: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-[#eadfbe] px-4 py-3 text-sm outline-none focus:border-[#e76a3e]"
                      placeholder="(51) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#1f4337]">
                      Cidade/Bairro
                    </label>
                    <input
                      type="text"
                      value={dadosCliente.cidadeBairro}
                      onChange={(e) =>
                        setDadosCliente((prev) => ({
                          ...prev,
                          cidadeBairro: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-[#eadfbe] px-4 py-3 text-sm outline-none focus:border-[#e76a3e]"
                      placeholder="Ex: Capão da Canoa, Centro"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#1f4337]">
                      Cupom
                    </label>
                    <input
                      type="text"
                      value={dadosCliente.cupom}
                      onChange={(e) =>
                        setDadosCliente((prev) => ({
                          ...prev,
                          cupom: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-[#eadfbe] px-4 py-3 text-sm outline-none focus:border-[#e76a3e]"
                      placeholder="Se tiver algum cupom, informe aqui"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#1f4337]">
                      Observações
                    </label>
                    <textarea
                      value={dadosCliente.observacoes}
                      onChange={(e) =>
                        setDadosCliente((prev) => ({
                          ...prev,
                          observacoes: e.target.value,
                        }))
                      }
                      className="min-h-[90px] w-full rounded-2xl border border-[#eadfbe] px-4 py-3 text-sm outline-none focus:border-[#e76a3e]"
                      placeholder="Alguma observação sobre o pedido? Se quiser pode inserir seu endereço, dia e horário de entrega."
                    />
                  </div>
                </div>

                {erroPedido && (
                  <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {erroPedido}
                  </p>
                )}

                <div className="mt-5 rounded-2xl bg-[#fffaf0] px-4 py-3">
                  <p className="text-sm font-semibold text-[#1f4337]">
                    {totalSelecionado} marmita{totalSelecionado !== 1 ? "s" : ""} •{" "}
                    {formatarMoeda(valorTotalPedido)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Valor estimado. O total final será confirmado no atendimento.
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setModalPedidoAberto(false)}
                    disabled={enviandoPedido}
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border border-[#285848]/15 bg-white px-5 py-3 text-sm font-semibold text-[#285848] transition hover:bg-[#f5faf7]"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={enviandoPedido}
                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#e76a3e] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#e76a3e]/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {enviandoPedido ? "Enviando..." : "Enviar pedido"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}