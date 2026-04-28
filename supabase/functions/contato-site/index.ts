import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { nome, telefone, mensagem } = await req.json();

    if (!nome || !telefone || !mensagem) {
      return new Response(
        JSON.stringify({
          error: "Preencha nome, telefone/WhatsApp e mensagem.",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Site Degustar <onboarding@resend.dev>",
        to: ["degustarmarmitas@gmail.com"],
        subject: "Novo contato pelo site da Degustar",
        html: `
          <h2>Novo contato pelo site da Degustar</h2>

          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Telefone/WhatsApp:</strong> ${telefone}</p>

          <p><strong>Mensagem:</strong></p>
          <p>${mensagem}</p>
        `,
      }),
    });

    if (!response.ok) {
      const erro = await response.text();
      console.error("Erro Resend:", erro);
      throw new Error("Erro ao enviar e-mail.");
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Erro na função:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});