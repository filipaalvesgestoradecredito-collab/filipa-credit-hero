import { createFileRoute } from "@tanstack/react-router";
import {
  Home,
  Wallet,
  Layers,
  ShieldCheck,
  Clock,
  Heart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileSignature,
  ClipboardCheck,
} from "lucide-react";
import filipaHeroAsset from "@/assets/filipa-hero-cut.png.asset.json";
import filipaAboutAsset from "@/assets/filipa-about-cut.png.asset.json";
import logoAsset from "@/assets/mycredit-logo-transparent.png.asset.json";
import { SimulacaoForm } from "@/components/SimulacaoForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Filipa Alves · Gestora de Crédito em Coimbra | Simulação Gratuita" },
      {
        name: "description",
        content:
          "Crédito Habitação, Automóvel, Pessoal e Consolidação. Encontre as melhores condições do mercado em 2026 com acompanhamento personalizado. Simulação gratuita e sem compromisso.",
      },
      { property: "og:title", content: "Filipa Alves · Gestora de Crédito | Simulação Gratuita" },
      {
        property: "og:description",
        content:
          "Compre a sua casa, financie o seu carro ou reduza as suas prestações com as melhores condições do mercado. Acompanhamento pessoal e sem burocracias.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function CTA({ children, className = "", variant = "primary" }: { children: React.ReactNode; className?: string; variant?: "primary" | "gold" | "outline" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-300 shadow-[var(--shadow-card)] hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-navy text-cream hover:bg-navy-deep"
      : variant === "gold"
        ? "bg-gold text-navy hover:brightness-105"
        : "border border-navy/20 text-navy hover:bg-navy hover:text-cream";
  return (
    <a href="#simulacao" className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

function Logo() {
  return (
    <img
      src={logoAsset.url}
      alt="MyCredit Coimbra — Intermediários de Crédito"
      className="h-9 sm:h-11 w-auto object-contain mix-blend-multiply"
    />
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:py-4">
          <Logo />
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-7 text-sm text-navy/80">
              <a href="#servicos" className="hover:text-gold transition">Serviços</a>
              <a href="#sobre" className="hover:text-gold transition">Sobre</a>
              <a href="#processo" className="hover:text-gold transition">Processo</a>
              <a href="#testemunhos" className="hover:text-gold transition">Clientes</a>
            </nav>
            <CTA className="!px-5 !py-2.5 !text-xs" variant="primary">
              Simulação Gratuita <ArrowRight className="h-3.5 w-3.5" />
            </CTA>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold-soft/60 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-navy/10 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 md:grid-cols-[1.05fr_1fr] md:items-center md:pt-20 md:pb-24">
          <div>
            <a
              href="#legal"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/40 px-4 py-1.5 text-xs font-medium text-navy hover:bg-gold-soft/70 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              + informações legais
            </a>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
              Compre a sua casa <span className="italic text-gold">ou</span> reduza as suas prestações
              <span className="block font-script text-gold text-4xl sm:text-5xl md:text-6xl mt-2">com as melhores condições</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl mt-1">do mercado em 2026.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tratamos de toda a burocracia por si. Comparamos propostas de todos os bancos e apresentamos-lhe
              a solução mais vantajosa — <strong className="text-navy">sem custos e sem compromisso</strong>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTA variant="primary">
                Fazer Simulação Gratuita <ArrowRight className="h-4 w-4" />
              </CTA>
              <a href="#servicos" className="inline-flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium text-navy hover:text-gold transition">
                Ver soluções →
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              <Stat n="+250" label="Famílias apoiadas" />
              <Stat n="€320" label="Poupança média/mês" />
              <Stat n="100%" label="Sem custos para si" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold-soft via-transparent to-navy/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-cream via-gold-soft/40 to-navy/10 shadow-[var(--shadow-elegant)] aspect-[4/5]">
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/10 to-transparent" />
              <img
                src={filipaHeroAsset.url}
                alt="Filipa Alves, gestora de crédito em Coimbra"
                width={1024}
                height={1536}
                className="relative h-full w-full object-contain object-bottom drop-shadow-[0_18px_35px_rgba(20,30,60,0.25)]"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-left-8 max-w-[80%] rounded-2xl bg-card p-4 shadow-[var(--shadow-card)] border border-border">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-navy">
                  <Heart className="h-5 w-5" fill="currentColor" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-navy">Compromisso pessoal</p>
                  <p className="text-xs text-muted-foreground truncate">A sua parceira financeira de confiança</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="O que resolvemos"
            title="Soluções à medida de cada família"
            sub="Analiso o seu caso e encontro a melhor proposta do mercado — sem que perca tempo entre bancos."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-navy text-gold">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-navy">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-navy/80">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Filipa */}
      <section id="sobre" className="relative py-20 md:py-28 bg-navy text-cream overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-gold/10 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-3 rounded-[2rem] bg-gold/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-b from-cream to-gold-soft/60 shadow-[var(--shadow-elegant)] aspect-[4/5]">
              <img
                src={filipaAboutAsset.url}
                alt="Filipa Alves, gestora de crédito"
                width={1024}
                height={1536}
                loading="lazy"
                className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_35px_rgba(20,30,60,0.2)]"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="font-script text-4xl text-gold">Olá, sou a Filipa</p>
            <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
              A sua parceira financeira,<br />sem burocracias.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream/85">
              O meu compromisso é claro: <strong className="text-gold">encontrar a melhor solução para si</strong>. Trato de toda a
              burocracia — da simulação à assinatura — para que possa tomar as melhores decisões sem stress
              e com total transparência.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/85">
              Trabalho com todos os bancos e instituições parceiras da rede MyCredit, o que me permite
              comparar dezenas de propostas em seu nome e apresentar-lhe apenas as que realmente valem a pena.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, t: "Acompanhamento personalizado" },
                { icon: Clock, t: "Processo simples e sem burocracias" },
                { icon: Home, t: "Soluções à medida de cada família" },
                { icon: Wallet, t: "Sem custos para o cliente" },
              ].map((v) => (
                <div key={v.t} className="flex items-start gap-3">
                  <v.icon className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                  <span className="text-sm text-cream/90">{v.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CTA variant="gold">
                Falar com a Filipa <ArrowRight className="h-4 w-4" />
              </CTA>
            </div>
          </div>
        </div>
      </section>

      {/* Testemunhos */}
      <section id="testemunhos" className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="O que dizem os meus clientes"
            title="Histórias que me inspiram todos os dias"
            sub="A confiança de quem já deu o passo, fala por mim."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 border ${
                  i === 1
                    ? "bg-gold text-navy border-gold"
                    : "bg-card text-navy border-border"
                } shadow-[var(--shadow-card)]`}
              >
                <div className={`font-display text-6xl leading-none ${i === 1 ? "text-navy/30" : "text-gold"}`}>"</div>
                <p className="mt-2 font-display text-lg leading-snug">{t.quote}</p>
                <div className={`mt-6 h-px w-12 ${i === 1 ? "bg-navy/30" : "bg-gold"}`} />
                <div className="mt-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className={`text-sm ${i === 1 ? "text-navy/70" : "text-gold"}`}>{t.location}</p>
                </div>
                {t.result && (
                  <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    i === 1 ? "bg-navy text-gold" : "bg-navy/5 text-navy"
                  }`}>
                    <Sparkles className="h-3 w-3" /> {t.result}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="Como funciona"
            title="Um processo simples em 3 passos"
            sub="Do primeiro contacto à assinatura, ao seu ritmo e com total acompanhamento."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-border bg-card p-8">
                <div className="absolute -top-5 left-8 grid h-10 w-10 place-items-center rounded-full bg-navy text-gold font-display text-lg font-bold border-4 border-background">
                  {i + 1}
                </div>
                <s.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-xl text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CTA variant="primary">
              Começar agora — é gratuito <ArrowRight className="h-4 w-4" />
            </CTA>
          </div>
        </div>
      </section>

      {/* Simulação */}
      <section id="simulacao" className="relative py-20 md:py-28 bg-gradient-to-b from-cream to-background">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHead
            eyebrow="Simulação gratuita"
            title="Comece agora — em apenas 2 minutos"
            sub="Preencha os dados abaixo. Respondo pessoalmente em menos de 1 dia útil com a melhor proposta do mercado para si."
          />
          <div className="mt-12">
            <SimulacaoForm />
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            🔒 Todos os dados são tratados de forma confidencial e utilizados apenas para efeitos de contacto, conforme a nossa{" "}
            <a href="https://my-credit.pt/politica-de-privacidade/" target="_blank" rel="noopener noreferrer" className="text-navy underline hover:text-gold">
              Política de Privacidade
            </a>.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-cream">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,var(--gold)_0%,transparent_40%)]" />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <p className="font-script text-3xl text-gold">Conte comigo</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl">
            Também quer uma experiência assim?
          </h2>
          <p className="mt-4 text-cream/80">Estou aqui para ajudar. Faça a simulação gratuita — respondo pessoalmente em menos de 1 dia útil.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTA variant="gold">Fala comigo! <ArrowRight className="h-4 w-4" /></CTA>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-cream/80 pt-14 pb-8 border-t border-gold/20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <div className="flex items-baseline">
                <span className="font-display text-2xl font-bold text-cream">MY</span>
                <span className="font-display text-2xl font-bold text-gold">CREDIT</span>
              </div>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-cream/60">
                Intermediários de Crédito · Coimbra
              </p>
              <p className="mt-5 text-sm leading-relaxed text-cream/70 max-w-sm">
                Filipa Alves — Gestora de Crédito, autorizada e supervisionada pelo
                Banco de Portugal.
              </p>
              <div className="mt-5 rounded-lg border border-gold/25 bg-cream/5 p-4 text-xs leading-relaxed text-cream/80">
                <p>
                  <strong className="text-gold">Creditwise – Intermediação de Crédito, Lda</strong>
                </p>
                <p className="mt-1">
                  Licença Banco de Portugal n.º 0008492
                </p>
                <p className="mt-1">
                  Mutuantes: ABANCA PORTUGAL, S.A., BANKINTER, S.A. – SUCURSAL EM PORTUGAL,
                  CAIXA GERAL DE DEPÓSITOS, S.A., BANCO SANTANDER TOTTA, S.A. e
                  ABANCA SERVICIOS FINANCIEROS, E.F.C., S.A. – SUCURSAL EM PORTUGAL.
                </p>
                <p className="mt-1">
                  Autorizado a prestar serviços de intermediação de crédito para crédito à
                  habitação e crédito aos consumidores, incluindo serviços de consultoria, sendo
                  proibido receber ou entregar quaisquer valores relacionados com contratos de
                  crédito, sob supervisão do Banco de Portugal.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg text-cream">Soluções</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#servicos" className="hover:text-gold transition">Crédito Habitação</a></li>
                <li><a href="#servicos" className="hover:text-gold transition">Crédito Automóvel</a></li>
                <li><a href="#servicos" className="hover:text-gold transition">Consolidação de Créditos</a></li>
                <li><a href="#servicos" className="hover:text-gold transition">Crédito Pessoal</a></li>
                <li><a href="#servicos" className="hover:text-gold transition">Transferência de Crédito</a></li>
              </ul>
            </div>

            <div id="legal" className="scroll-mt-24">
              <h4 className="font-display text-lg text-cream">Informação legal</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="https://www.bportugal.pt/intermediariocreditofar/segundo" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Consultar registo BdP →</a></li>
                <li><a href="https://my-credit.pt/politica-de-privacidade/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Política de Privacidade</a></li>
                <li><a href="https://my-credit.pt/termos-e-condicoes/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Termos de Utilização</a></li>
                <li><a href="https://www.livroreclamacoes.pt/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Livro de Reclamações</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-cream/60">
            <p>© {new Date().getFullYear()} Filipa Alves · Gestora de Crédito. Todos os direitos reservados.</p>
            <p>A atividade de intermediário de crédito é supervisionada pelo <span className="text-gold">Banco de Portugal</span>.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-navy sm:text-3xl">{n}</div>
      <div className="mt-1 text-xs text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-script text-3xl text-gold">{eyebrow}</p>
      <h2 className="mt-1 font-display text-3xl text-navy sm:text-4xl md:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 flex items-center justify-center gap-2">
        <span className="h-px w-10 bg-gold" />
        <Heart className="h-3 w-3 text-gold" fill="currentColor" />
        <span className="h-px w-10 bg-gold" />
      </div>
      <p className="mt-5 text-muted-foreground">{sub}</p>
    </div>
  );
}

const SERVICES = [
  {
    icon: Home,
    title: "Crédito Habitação",
    desc: "Comparamos todas as propostas para lhe dar as melhores condições.",
    points: ["Compra de casa", "Transferência de crédito", "Obras e construção"],
  },
  {
    icon: Wallet,
    title: "Crédito Automóvel",
    desc: "Novo ou usado, arranjamos a melhor solução de financiamento para o seu carro.",
    points: ["Aprovação rápida", "Taxas competitivas", "Sem burocracia"],
  },
  {
    icon: Layers,
    title: "Consolidação de Créditos",
    desc: "Junte todos os seus créditos numa única prestação, mais baixa e mais fácil de gerir.",
    points: ["Redução até 60% da prestação", "Uma só data de pagamento", "Alívio imediato no orçamento"],
  },
  {
    icon: Wallet,
    title: "Crédito Pessoal",
    desc: "Para obras, formação, viagens ou aquele projeto que faz sentido para si e para a sua família.",
    points: ["Aprovação rápida", "Sem burocracia", "Taxas competitivas"],
  },
];

const TESTIMONIALS = [
  {
    quote: "Processo rápido, transparente e sem surpresas. Recomendo!",
    name: "Ana Costa",
    location: "Coimbra",
    result: "Crédito Habitação aprovado",
  },
  {
    quote: "A Filipa explicou tudo ao detalhe. Senti-me segura em cada etapa.",
    name: "Ricardo Alves",
    location: "Figueira da Foz",
    result: "Poupança €180/mês",
  },
  {
    quote: "Conseguimos poupar €320/mês com a consolidação. Obrigado, Filipa!",
    name: "João e Maria",
    location: "Lisboa",
    result: "Família com +€320/mês",
  },
];

const STEPS = [
  { icon: ClipboardCheck, title: "Simulação Online", desc: "Preenche o formulário rápido — em apenas 2 minutos conheço o seu caso." },
  { icon: Sparkles, title: "Análise Personalizada", desc: "Comparo propostas de todos os bancos parceiros e apresento a melhor solução para si." },
  { icon: FileSignature, title: "Aprovação & Assinatura", desc: "Tratamos de toda a burocracia. Você só assina quando estiver 100% confortável." },
];
