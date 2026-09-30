import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LEAD_EMAIL = "tfammc@gmail.com";

const leadSchema = z.object({
  nome: z.string().min(1),
  telefone: z.string().min(1),
  email: z.string().email(),
  detalhes: z.string().min(1),
  operacao: z.string().min(1),
});

export const enviarSimulacao = createServerFn({ method: "POST" })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const res = await fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `Nova simulação de crédito — ${data.nome}`,
        _template: "table",
        _captcha: "false",
        Nome: data.nome,
        Telefone: data.telefone,
        Email: data.email,
        Operação: data.operacao,
        Detalhes: data.detalhes,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Falha no envio do email [${res.status}]: ${body}`);
      throw new Error("Não foi possível enviar o pedido. Tente novamente.");
    }

    return { ok: true };
  });
