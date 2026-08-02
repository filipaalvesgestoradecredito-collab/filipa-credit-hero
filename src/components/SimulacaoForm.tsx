import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

type Operacao = "comprar" | "melhorar" | "construir" | "";
type CasaEscolhida = "sim" | "nao" | "";
type Titulares = "1" | "2" | "3+" | "";
type Contrato = "semTermo" | "aTermo" | "contaPropria" | "";

interface FormData {
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  operacao: Operacao;
  localizacao: string;
  casaEscolhida: CasaEscolhida;
  preco: string;
  prazo: string;
  titulares: Titulares;
  idade: string;
  contrato: Contrato;
  rendimento: string;
  rgpd: boolean;
}

const initial: FormData = {
  nome: "",
  sobrenome: "",
  telefone: "",
  email: "",
  operacao: "",
  localizacao: "",
  casaEscolhida: "",
  preco: "",
  prazo: "",
  titulares: "",
  idade: "",
  contrato: "",
  rendimento: "",
  rgpd: false,
};

const STEPS = [
  { n: 1, label: "Contacto" },
  { n: 2, label: "Operação" },
  { n: 3, label: "Rendimento" },
] as const;

export function SimulacaoForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const validStep1 = data.nome && data.sobrenome && data.telefone.length >= 9 && /.+@.+\..+/.test(data.email);
  const validStep2 =
    data.operacao &&
    data.localizacao &&
    (data.operacao !== "comprar" || (data.casaEscolhida && data.preco && data.prazo)) &&
    data.titulares;
  const validStep3 = !!data.rendimento && data.rgpd && !!data.idade && !!data.contrato;

  const canNext = step === 1 ? validStep1 : step === 2 ? validStep2 : validStep3;

  const contratoLabel: Record<Contrato, string> = {
    semTermo: "Contrato sem termo",
    aTermo: "Contrato a termo",
    contaPropria: "Trabalhador por conta própria",
    "": "",
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validStep3) return;
    // Envia por email via mailto como fallback (sem backend). Ideal: integrar com serviço.
    const body = encodeURIComponent(
      `Nova simulação:\n\n` +
        `Nome: ${data.nome} ${data.sobrenome}\n` +
        `Telefone: +351 ${data.telefone}\n` +
        `Email: ${data.email}\n\n` +
        `Operação: ${data.operacao}\n` +
        `Localização: ${data.localizacao}\n` +
        `Casa escolhida: ${data.casaEscolhida}\n` +
        `Preço: ${data.preco}\n` +
        `Prazo: ${data.prazo}\n` +
        `Titulares: ${data.titulares}\n` +
        `Idade: ${data.idade}\n` +
        `Tipo de contrato: ${contratoLabel[data.contrato]}\n` +
        `Rendimento líquido mensal: ${data.rendimento} €\n`
    );
    window.location.href = `mailto:filipa@my-credit.pt?subject=Simulação de Crédito&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-elegant)]">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-navy">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-3xl text-navy">Pedido recebido, {data.nome}!</h3>
        <p className="mt-3 text-muted-foreground">
          Vou analisar o seu caso e entro em contacto em <strong className="text-navy">menos de 1 dia útil</strong> pelo
          telefone <strong className="text-navy">+351 {data.telefone}</strong>.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Se preferir, pode falar comigo já pelo número indicado no rodapé.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card shadow-[var(--shadow-elegant)] overflow-hidden">
      {/* Progress */}
      <div className="border-b border-border bg-cream/60 px-6 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((s, i) => {
            const active = step === s.n;
            const done = step > s.n;
            return (
              <div key={s.n} className="flex flex-1 items-center gap-3 min-w-0">
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                    done
                      ? "bg-gold text-navy"
                      : active
                        ? "bg-navy text-cream"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
                </div>
                <span
                  className={`hidden sm:block truncate text-sm font-medium ${
                    active ? "text-navy" : done ? "text-navy/70" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`ml-2 h-px flex-1 ${done ? "bg-gold" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-10">
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <StepTitle n={1} title="Dados de contacto" sub="Para que possa entrar em contacto consigo." />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome *">
                <input
                  className={inputCls}
                  placeholder="José"
                  value={data.nome}
                  onChange={(e) => set("nome", e.target.value)}
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Apelido *">
                <input
                  className={inputCls}
                  placeholder="Silva"
                  value={data.sobrenome}
                  onChange={(e) => set("sobrenome", e.target.value)}
                  autoComplete="family-name"
                />
              </Field>
            </div>
            <Field label="Telefone *">
              <div className="flex items-stretch overflow-hidden rounded-xl border border-border focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30 transition">
                <span className="flex items-center gap-2 border-r border-border bg-muted px-3 text-sm text-navy">
                  🇵🇹 +351
                </span>
                <input
                  className="flex-1 bg-transparent px-4 py-3 text-base text-navy placeholder:text-muted-foreground/60 outline-none"
                  placeholder="912 345 678"
                  inputMode="tel"
                  value={data.telefone}
                  onChange={(e) => set("telefone", e.target.value.replace(/[^0-9 ]/g, ""))}
                  autoComplete="tel-national"
                />
              </div>
            </Field>
            <Field label="E-mail *">
              <input
                type="email"
                className={inputCls}
                placeholder="alguem@exemplo.com"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <StepTitle n={2} title="Tipo de operação" sub="Conte-me o que pretende fazer." />

            <Field label="O que quer fazer? *">
              <div className="grid gap-2">
                {[
                  { v: "comprar", l: "Comprar casa com crédito habitação" },
                  { v: "melhorar", l: "Melhorar as condições do crédito atual" },
                  { v: "construir", l: "Construir casa com crédito habitação" },
                ].map((o) => (
                  <RadioCard
                    key={o.v}
                    label={o.l}
                    checked={data.operacao === o.v}
                    onSelect={() => set("operacao", o.v as Operacao)}
                  />
                ))}
              </div>
            </Field>

            <Field label="Localização do imóvel *" hint="Localidade onde se situa o imóvel (ou onde quer comprar).">
              <input
                className={inputCls}
                placeholder="Coimbra"
                value={data.localizacao}
                onChange={(e) => set("localizacao", e.target.value)}
              />
            </Field>

            {data.operacao === "comprar" && (
              <>
                <Field label="Já tem casa escolhida? *">
                  <div className="grid gap-2">
                    <RadioCard
                      label="Sim, já tenho a casa identificada e preciso de crédito habitação"
                      checked={data.casaEscolhida === "sim"}
                      onSelect={() => set("casaEscolhida", "sim")}
                    />
                    <RadioCard
                      label="Ainda não tenho casa, quero primeiro perceber quanto consigo pedir"
                      checked={data.casaEscolhida === "nao"}
                      onSelect={() => set("casaEscolhida", "nao")}
                    />
                  </div>
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Preço da compra *" hint="Valor acordado ou previsto.">
                    <div className="relative">
                      <input
                        className={inputCls + " pr-10"}
                        placeholder="250 000"
                        inputMode="numeric"
                        value={data.preco}
                        onChange={(e) => set("preco", e.target.value.replace(/[^0-9]/g, ""))}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
                    </div>
                  </Field>
                  <Field label="Prazo pretendido *" hint="Ex: até 3 meses.">
                    <input
                      className={inputCls}
                      placeholder="Nos próximos 3 meses"
                      value={data.prazo}
                      onChange={(e) => set("prazo", e.target.value)}
                    />
                  </Field>
                </div>
              </>
            )}

            <Field label="Número de titulares do crédito *">
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { v: "1", l: "1 (apenas eu)" },
                  { v: "2", l: "2 (eu e outra pessoa)" },
                  { v: "3+", l: "Mais de duas pessoas" },
                ].map((o) => (
                  <RadioCard
                    key={o.v}
                    label={o.l}
                    compact
                    checked={data.titulares === o.v}
                    onSelect={() => set("titulares", o.v as Titulares)}
                  />
                ))}
              </div>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <StepTitle n={3} title="Informação pessoal" sub="Última etapa — para uma simulação mais precisa." />

            <Field
              label="Rendimento líquido mensal *"
              hint="Valor que recebe mensalmente depois de impostos (salário, rendas, pensões, etc.). Se for variável, indique a média dos últimos 6 meses."
            >
              <div className="relative">
                <input
                  className={inputCls + " pr-10"}
                  placeholder="1 200"
                  inputMode="numeric"
                  value={data.rendimento}
                  onChange={(e) => set("rendimento", e.target.value.replace(/[^0-9]/g, ""))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
              </div>
            </Field>

            <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 cursor-pointer hover:border-gold/50 transition">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-navy shrink-0"
                checked={data.rgpd}
                onChange={(e) => set("rgpd", e.target.checked)}
              />
              <span className="text-xs leading-relaxed text-muted-foreground">
                Aceito que os meus dados sejam tratados para aconselhamento no âmbito da prestação dos serviços de
                intermediação de crédito, em conformidade com o RGPD. Ler{" "}
                <a
                  href="https://my-credit.pt/politica-de-privacidade/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy underline hover:text-gold"
                >
                  Política de Privacidade
                </a>
                .
              </span>
            </label>
          </div>
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-navy/70 hover:text-navy disabled:opacity-30 disabled:pointer-events-none transition"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => canNext && setStep((s) => s + 1)}
              disabled={!canNext}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-cream shadow-[var(--shadow-card)] hover:bg-navy-deep hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              Continuar <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canNext}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-navy shadow-[var(--shadow-card)] hover:brightness-105 hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <Sparkles className="h-4 w-4" /> Enviar simulação
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-navy placeholder:text-muted-foreground/60 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      {hint && <span className="mb-2 block text-xs text-muted-foreground">{hint}</span>}
      {children}
    </label>
  );
}

function StepTitle({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="mb-2">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Passo {n} de 3</p>
      <h3 className="mt-2 font-display text-3xl text-navy sm:text-4xl">{title}</h3>
      <p className="mt-2 text-muted-foreground">{sub}</p>
    </div>
  );
}

function RadioCard({
  label,
  checked,
  onSelect,
  compact,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex items-center gap-3 rounded-xl border px-4 text-left transition ${
        compact ? "py-3" : "py-4"
      } ${
        checked
          ? "border-gold bg-gold-soft/40 text-navy"
          : "border-border bg-background text-navy/80 hover:border-navy/30 hover:bg-muted/40"
      }`}
    >
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition ${
          checked ? "border-gold bg-gold" : "border-border bg-background"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-navy" />}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
