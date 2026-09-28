import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Home,
  Repeat,
  Layers,
  ShieldCheck,
  Clock,
  ArrowRight,
  Check,
  Landmark,
  UserRound,
  MessageSquare,
  SlidersHorizontal,
  BadgeEuro,
  Menu,
  X,
  Quote,
  ExternalLink,
} from "lucide-react";
import { SimulacaoForm } from "@/components/SimulacaoForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Filipa Alves · Gestora de Crédito em Coimbra | Simulação Gratuita" },
      {
        name: "description",
        content:
          "Crédito habitação, transferência de crédito e consolidação com garantia hipotecária. Acompanhamento personalizado em Coimbra.",
      },
      { property: "og:title", content: "Filipa Alves · Gestora de Crédito em Coimbra | Simulação Gratuita" },
      {
        property: "og:description",
        content:
          "Crédito habitação, transferência de crédito e consolidação com garantia hipotecária. Acompanhamento personalizado em Coimbra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const LINKS = {
  bdp: "https://www.bportugal.pt/intermediariocreditofar/creditwise-intermediacao-de-credito-lda",
  privacidade: "https://my-credit.pt/politica-de-privacidade/",
  termos: "https://my-credit.pt/termos-e-condicoes/",
  reclamacoes: "https://www.livroreclamacoes.pt/",
};

const btnBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200";
const btnPrimary = `${btnBase} bg-navy text-cream hover:bg-navy-deep`;
const btnSecondary = `${btnBase} border border-navy/25 bg-background text-navy hover:border-navy hover:bg-surface`;

function Btn({ href = "#simulacao", children, variant = "primary", className = "" }: { href?: string; children: React.ReactNode; variant?: "primary" | "secondary"; className?: string }) {
  return (
    <a href={href} className={`${variant === "primary" ? btnPrimary : btnSecondary} ${className}`}>
      {children}
    </a>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

const NAV = [
  { href: "#servicos", label: "Soluções" },
  { href: "#sobre", label: "Sobre" },
  { href: "#testemunhos", label: "Clientes" },
  { href: "#processo", label: "Processo" },
  { href: "#legal", label: "Informação Legal" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-40 bg-background transition-shadow ${scrolled ? "shadow-[0_1px_0_var(--border),0_4px_16px_-12px_color-mix(in_oklab,var(--navy)_25%,transparent)]" : ""}`}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <a href="#top" aria-label="Filipa Alves — Gestora de Crédito, voltar ao início" className="shrink-0">
          <img src="/filipa-alves-logo.png" width={300} height={378} alt="Filipa Alves — Gestora de Crédito" className="h-11 w-auto md:h-12" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] font-medium text-foreground lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-navy">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Btn className="hidden !h-11 !px-5 !text-sm sm:inline-flex">Simulação Gratuita</Btn>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-border text-navy lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-background px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-3.5 text-base font-medium text-navy">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <Btn className="mt-5 w-full" href="#simulacao">Simulação Gratuita</Btn>
        </nav>
      )}
    </header>
  );
}

function SectionHead({ title, sub, center = true }: { title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="text-3xl leading-[1.15] md:text-[2.625rem]">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1200px] px-5 md:px-8 ${className}`}>{children}</div>
);

const sectionPad = "py-16 md:py-28";

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        {/* 1. Hero */}
        <section id="top" className="bg-background pb-16 pt-10 md:pb-24 md:pt-16">
          <Container>
            <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
              <div className="md:col-span-7">
                <a href="#legal" className="block max-w-xl rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-snug transition-colors hover:border-navy/30">
                  <span className="block font-semibold text-navy">Filipa Alves | Gestora de Crédito</span>
                  <span className="block text-foreground">Creditwise – Intermediação de Crédito, Lda.</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">Intermediário de Crédito Vinculado | Registo Banco de Portugal n.º 0008492</span>
                </a>
                <h1 className="mt-8 text-[2.25rem] leading-[1.08] sm:text-5xl md:text-[3.5rem]">
                  Vários bancos. Diferentes propostas. <span className="text-gold">Uma solução adequada ao seu perfil.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                  Analiso propostas dos bancos parceiros e acompanho todo o processo, para encontrar uma solução adequada às suas necessidades.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Btn>
                    Fazer simulação gratuita <ArrowRight className="h-4 w-4" />
                  </Btn>
                  <Btn href="#servicos" variant="secondary">Ver soluções</Btn>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Simulação sem custos e sem compromisso.</p>
              </div>
              <div className="md:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-border bg-surface aspect-[4/5]">
                  <img
                    src="/filipa-hero-office.png"
                    alt="Filipa Alves, gestora de crédito em Coimbra, no escritório"
                    width={1536}
                    height={1024}
                    className="h-full w-full object-cover object-[60%_center]"
                  />
                </div>
              </div>
            </div>

            <ul className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-3 md:mt-20">
              {[
                { icon: Landmark, t: "Bancos parceiros" },
                { icon: UserRound, t: "Acompanhamento pessoal" },
                { icon: Clock, t: "Resposta em 1 dia útil" },
              ].map((i) => (
                <li key={i.t} className="flex items-center gap-3 text-[15px] font-medium text-navy">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface text-navy">
                    <i.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  {i.t}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* 2. Soluções */}
        <section id="servicos" className={`bg-surface ${sectionPad}`}>
          <Container>
            <Reveal>
              <SectionHead title="Soluções para cada situação" sub="Analiso propostas dos bancos parceiros para o seu caso." />
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {SERVICES.map((s) => (
                <Reveal key={s.title} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elegant)]">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-surface text-navy">
                      <s.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 text-xl leading-snug">{s.title}</h3>
                    <p className="mt-2 text-[15px] text-muted-foreground">{s.desc}</p>
                    <ul className="mt-5 space-y-2 border-t border-border pt-5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[15px] text-foreground">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>


            <p className="mt-8 text-center text-xs text-muted-foreground">
              Qualquer financiamento está sujeito a análise e aprovação pela instituição financeira.
            </p>
          </Container>
        </section>

        {/* 3. Sobre */}
        <section id="sobre" className={`bg-background ${sectionPad}`}>
          <Container>
            <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
              <Reveal className="md:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-border bg-surface aspect-[4/5]">
                  <img
                    src="/filipa-about-cut.png"
                    alt="Retrato de Filipa Alves, gestora de crédito"
                    width={1024}
                    height={1536}
                    loading="lazy"
                    className="h-full w-full object-contain object-bottom"
                  />
                </div>
              </Reveal>
              <Reveal className="md:col-span-7">
                <p className="text-sm font-semibold uppercase tracking-wider text-gold">Olá, sou a Filipa</p>
                <h2 className="mt-3 text-3xl leading-[1.15] md:text-[2.625rem]">
                  Acompanho o seu processo, do primeiro contacto à contratação.
                </h2>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                  Ajudo famílias a compreender as opções de financiamento disponíveis e acompanho cada etapa junto dos bancos parceiros, com clareza e transparência, para que possa decidir com tranquilidade.
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: ShieldCheck, t: "Acompanhamento personalizado" },
                    { icon: MessageSquare, t: "Comunicação clara em cada etapa" },
                    { icon: SlidersHorizontal, t: "Soluções ajustadas a cada situação" },
                    { icon: BadgeEuro, t: "Simulação sem custos" },
                  ].map((v) => (
                    <li key={v.t} className="flex items-start gap-3 text-[15px] text-foreground">
                      <v.icon className="mt-0.5 h-5 w-5 shrink-0 text-navy" strokeWidth={1.75} />
                      {v.t}
                    </li>
                  ))}
                </ul>
                <Btn className="mt-9">
                  Falar com a Filipa <ArrowRight className="h-4 w-4" />
                </Btn>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 4. Testemunhos */}
        <section id="testemunhos" className={`bg-surface ${sectionPad}`}>
          <Container>
            <Reveal>
              <SectionHead title="O que dizem os clientes" />
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <Reveal key={t.name} className="h-full">
                  <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
                    <Quote className="h-6 w-6 text-gold" strokeWidth={1.75} aria-hidden />
                    <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-navy">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                      <span>
                        <span className="block font-semibold text-navy">{t.name}</span>
                        <span className="block text-sm text-muted-foreground">{t.location}</span>
                      </span>
                      {t.tag && <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-navy">{t.tag}</span>}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* 5. Processo */}
        <section id="processo" className={`bg-background ${sectionPad}`}>
          <Container>
            <Reveal>
              <SectionHead title="Um processo simples em 3 passos" sub="Com acompanhamento em todas as etapas." />
            </Reveal>
            <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              <span aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block" />
              <span aria-hidden className="absolute bottom-0 left-7 top-0 w-px bg-border md:hidden" />
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative pl-20 md:pl-0">
                  <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border border-border bg-background font-display text-2xl font-semibold text-navy md:relative">
                    {i + 1}
                  </span>
                  <h3 className="text-xl leading-snug md:mt-6">{s.title}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground">{s.desc}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 text-center">
              <Btn>
                Começar agora <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </Container>
        </section>

        {/* 6. Formulário */}
        <section id="simulacao" className={`bg-surface ${sectionPad}`}>
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <SectionHead title="Peça a sua simulação gratuita" sub="Preencha os dados abaixo. Respondo em menos de 1 dia útil." />
            <div className="mt-10 rounded-2xl bg-card shadow-[var(--shadow-elegant)]">
              <SimulacaoForm />
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Todos os dados são tratados de forma confidencial e utilizados apenas para efeitos de contacto, conforme a{" "}
              <a href={LINKS.privacidade} target="_blank" rel="noopener noreferrer" className="text-navy underline underline-offset-2 hover:text-navy-deep">
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </section>

        {/* 7. CTA final */}
        <section className="bg-background py-16 md:py-24">
          <Container>
            <div className="rounded-2xl border border-border bg-cream px-6 py-12 text-center md:px-12 md:py-16">
              <h2 className="text-3xl leading-[1.15] md:text-4xl">Vamos analisar o seu caso?</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Faça a simulação e entro em contacto consigo em menos de 1 dia útil.
              </p>
              <Btn className="mt-8">
                Fazer simulação gratuita <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </Container>
        </section>

        {/* 8. Informação Legal */}
        <section id="legal" className={`bg-surface ${sectionPad}`}>
          <Container>
            <h2 className="text-3xl leading-[1.15] md:text-4xl">Informação Legal</h2>
            <div className="mt-10 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="font-semibold text-navy">Creditwise – Intermediação de Crédito, Lda.</p>
                <p className="mt-1 text-[15px]">Intermediário de Crédito Vinculado | Registo Banco de Portugal n.º 0008492</p>
                <p className="mt-4 text-[15px] text-muted-foreground">
                  A atividade de intermediação de crédito é exercida pela Creditwise nos termos, categoria e âmbito constantes do respetivo registo oficial no Banco de Portugal.
                </p>
                <p className="mt-6 text-sm font-semibold text-navy">Mutuantes</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {MUTUANTES.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm font-semibold text-navy">Documentos e entidades</p>
                <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
                  {[
                    { href: LINKS.bdp, t: "Consultar registo oficial no Banco de Portugal" },
                    { href: LINKS.privacidade, t: "Política de Privacidade" },
                    { href: LINKS.termos, t: "Termos de Utilização" },
                    { href: LINKS.reclamacoes, t: "Livro de Reclamações" },
                  ].map((l) => (
                    <li key={l.t}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 px-5 py-4 text-[15px] font-medium text-navy transition-colors hover:bg-surface">
                        {l.t}
                        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* 9. Rodapé */}
      <footer className="bg-navy pb-8 pt-14 text-cream/80">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-cream">Soluções</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="#servicos" className="hover:text-cream">Crédito Habitação</a></li>
                <li><a href="#servicos" className="hover:text-cream">Transferência de Crédito</a></li>
                <li><a href="#servicos" className="hover:text-cream">Consolidação com Garantia Hipotecária</a></li>
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-cream">Informação legal</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="#legal" className="hover:text-cream">Informação Legal</a></li>
                <li><a href={LINKS.privacidade} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Política de Privacidade</a></li>
                <li><a href={LINKS.termos} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Termos de Utilização</a></li>
                <li><a href={LINKS.reclamacoes} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Livro de Reclamações</a></li>
              </ul>
            </div>
            <div>
              <img
                src="/mycredit-coimbra-logo-footer-new.jpg"
                alt="MyCredit Coimbra"
                width={300}
                height={93}
                loading="lazy"
                className="h-auto w-full max-w-[260px] rounded-lg object-contain"
              />
              <a href="#simulacao" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cream hover:underline">
                Pedir simulação gratuita <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/65 md:flex-row md:justify-between">
            <p>© 2026 Filipa Alves · Gestora de Crédito. Todos os direitos reservados.</p>
            <p>Creditwise – Intermediação de Crédito, Lda. | Intermediário de Crédito Vinculado | Registo Banco de Portugal n.º 0008492</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

const SERVICES = [
  {
    icon: Home,
    title: "Crédito Habitação",
    desc: "Apoio na compra de casa, construção e obras.",
    points: ["Compra de casa", "Construção e obras", "Acompanhamento personalizado"],
  },
  {
    icon: Repeat,
    title: "Transferência de Crédito Habitação",
    desc: "Análise das condições do seu crédito atual e das alternativas junto dos bancos parceiros.",
    points: ["Análise das condições atuais", "Comparação de propostas", "Gestão do processo"],
  },
  {
    icon: Layers,
    title: "Consolidação com Garantia Hipotecária",
    desc: "Junte os seus créditos e avalie a possibilidade de reduzir os encargos mensais.",
    points: ["Uma só prestação", "Gestão mais simples", "Uma prestação mais ajustada ao seu orçamento"],
  },
];

const TESTIMONIALS = [
  { quote: "Processo rápido, transparente e sem surpresas.", name: "Ana Costa", location: "Coimbra", tag: "Crédito Habitação" },
  { quote: "A Filipa explicou tudo ao detalhe. Senti-me seguro em cada etapa.", name: "Ricardo Alves", location: "Figueira da Foz", tag: "" },
];

const STEPS = [
  { title: "Simulação online", desc: "Preencha o formulário em cerca de 2 minutos e fico a conhecer o seu caso." },
  { title: "Análise personalizada", desc: "Analiso propostas dos bancos parceiros e procuro uma solução adequada ao seu perfil." },
  { title: "Decisão do banco & contratação", desc: "Acompanho o processo junto da instituição financeira e, após aprovação, ajudo em todas as etapas até à contratação." },
];

const MUTUANTES = [
  "ABANCA PORTUGAL, S.A.",
  "BANKINTER, S.A. – SUCURSAL EM PORTUGAL",
  "CAIXA GERAL DE DEPÓSITOS, S.A.",
  "BANCO SANTANDER TOTTA, S.A.",
  "UCI – UNIÃO DE CRÉDITOS IMOBILIÁRIOS, S.A.",
  "ABANCA SERVICIOS FINANCIEROS, E.F.C., S.A. – SUCURSAL EM PORTUGAL",
];
