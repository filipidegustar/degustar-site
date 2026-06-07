import { useState } from "react";
import {
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  Mail,
  Phone,
  Globe,
  Send,
} from "lucide-react";

import Navbar from "../components/Navbar";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [telefoneContato, setTelefoneContato] = useState("");

  const telefone = "(51) 99459-7667";
  const telefoneWhatsapp = "5551994597667";
  const email = "contato@degustarsaudavel.com.br";
  const site = "www.degustarsaudavel.com.br";
  const instagram = "https://www.instagram.com/degustar.adriana";
  
  const whatsappLink =
  `https://wa.me/${telefoneWhatsapp}?text=${encodeURIComponent(
    "Olá! Gostaria de falar com a Degustar."
  )}`;

  const emailLink = `mailto:${email}?subject=Contato pelo site Degustar&body=${encodeURIComponent(
    `Nome: ${nome}\nTelefone/WhatsApp: ${telefoneContato}\n\nMensagem: ${mensagem}`
  )}`;

  async function enviarFormulario(e) {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://yuqqdzwenretslrguttb.supabase.co/functions/v1/contato-site",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome,
            telefone: telefoneContato,
            mensagem,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao enviar");
    }

    alert("Mensagem enviada com sucesso!");

    setNome("");
    setTelefoneContato("");
    setMensagem("");
  } catch (error) {
    console.error(error);
    alert("Não foi possível enviar a mensagem.");
  }
}

  return (
    <main className="min-h-screen bg-[#fff8e6] text-[#285848]">
      <Navbar />

        <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-[#ffebb5] px-4 py-2 text-sm font-semibold">
                Fale com a Degustar
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                Quer montar seu combo ou tirar alguma dúvida?
            </h1>

            <p className="mt-5 text-lg text-[#285848]/80 leading-relaxed">
                Entre em contato para consultar sabores disponíveis, combinar entregas,
                montar seu pedido ou saber mais sobre a Degustar.
            </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#285848] px-5 py-4 text-white font-semibold hover:opacity-90 transition"
            >
                <MessageCircle size={22} />
                WhatsApp
            </a>

            <a
                href={emailLink}
                className="flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 font-semibold border border-[#285848]/15 hover:bg-[#ffebb5]/50 transition"
            >
                <Mail size={22} />
                E-mail
            </a>

            <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 font-semibold border border-[#285848]/15 hover:bg-[#ffebb5]/50 transition"
            >
                <Instagram size={22} />
                Instagram
            </a>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-start">
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl border border-[#285848]/10">
                <h2 className="text-2xl font-bold mb-2">Envie sua mensagem</h2>

                <p className="mb-6 text-[#285848]/70">
                Preencha os dados abaixo e retornaremos assim que possível.
                </p>

                <form onSubmit={enviarFormulario} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">
                    Seu nome
                    </label>
                    <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#285848]/20 px-4 py-3 outline-none focus:border-[#e76a3e]"
                    placeholder="Digite seu nome"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">
                    Telefone/WhatsApp
                    </label>
                    <input
                    type="text"
                    value={telefoneContato}
                    onChange={(e) => setTelefoneContato(e.target.value)}
                    className="w-full rounded-xl border border-[#285848]/20 px-4 py-3 outline-none focus:border-[#e76a3e]"
                    placeholder="Digite seu telefone ou WhatsApp"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">
                    Mensagem
                    </label>
                    <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    rows="5"
                    required
                    className="w-full rounded-xl border border-[#285848]/20 px-4 py-3 outline-none focus:border-[#e76a3e]"
                    placeholder="Escreva sua mensagem"
                    />
                </div>

                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e76a3e] px-5 py-3 font-bold text-white hover:opacity-90 transition"
                >
                    <Send size={20} />
                    Enviar mensagem
                </button>
                </form>
            </div>

            <div className="rounded-3xl bg-[#285848] p-6 md:p-8 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Canais de atendimento</h2>

                <div className="space-y-5">
                <Info icon={Phone} title="Telefone" text={telefone} />
                <Info icon={Mail} title="E-mail" text={email} />
                <Info icon={Globe} title="Site" text={site} />
                <Info
                    icon={MapPin}
                    title="Região de entrega"
                    text="Litoral norte gaúcho conforme programação."
                />
                <Info
                    icon={Clock}
                    title="Atendimento"
                    text="Envie sua mensagem e retornaremos assim que possível."
                />
                </div>
            </div>
            </div>
        </div>
        </section>
    </main>
  );
}

function Info({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-[#ffebb5]">
        <Icon size={22} />
      </div>

      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-white/75">{text}</p>
      </div>
    </div>
  );
}