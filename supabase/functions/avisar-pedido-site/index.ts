const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const emailDestino = Deno.env.get("EMAIL_DESTINO_PEDIDOS");

    if (!resendApiKey || !emailDestino) {
      throw new Error("Variáveis de ambiente não configuradas.");
    }

    const pedidoId = body?.pedido_id;
    const nomeCliente = body?.nome_cliente || "Cliente não informado";
    const telefoneCliente =
      body?.telefone_cliente || "Telefone não informado";
    const quantidadeTotal = body?.quantidade_total || 0;
    const valorTotal = body?.valor_total || 0;

    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Degustar <onboarding@resend.dev>",
        to: [emailDestino],
        subject: "Novo pedido recebido pelo site",
        html: `
          <h2>Novo pedido recebido pelo site</h2>

          <p>
            Um novo pedido foi recebido pelo site da Degustar.
          </p>

          <hr />

          <p><strong>Pedido:</strong> #${pedidoId}</p>
          <p><strong>Cliente:</strong> ${nomeCliente}</p>
          <p><strong>Telefone:</strong> ${telefoneCliente}</p>
          <p><strong>Quantidade:</strong> ${quantidadeTotal} marmitas</p>
          <p>
            <strong>Valor estimado:</strong>
            R$ ${Number(valorTotal).toFixed(2)}
          </p>

          <hr />

          <p>
            Acesse o sistema da Degustar para visualizar o pedido completo.
          </p>
        `,
      }),
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro Resend:", resultado);
      throw new Error("Erro ao enviar e-mail.");
    }

    return new Response(
      JSON.stringify({
        ok: true,
        resultado,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Erro na função:", error);

    return new Response(
      JSON.stringify({
        ok: false,
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
}); 