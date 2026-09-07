/**
 * Estilo Materia en movimiento: capítulo editorial oscuro, tipografía monumental,
 * metal frío y menta mineral; contenido real de CV presentado en escenas narrativas.
 */
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MoveRight,
  MessageCircle,
  X,
} from "lucide-react";
import HeroLoop from "@/components/HeroLoop";
import PersonalVideo from "@/components/PersonalVideo";
import AnimatedText from "@/components/motion/AnimatedText";
import FadeIn from "@/components/motion/FadeIn";
import Magnet from "@/components/motion/Magnet";
import ScrollMarquee from "@/components/motion/ScrollMarquee";
import StackingCards from "@/components/motion/StackingCards";

const links = [
  { label: "Saber ser", target: "saber-ser" },
  { label: "Saber saber", target: "saber-saber" },
  { label: "Saber hacer", target: "saber-hacer" },
  { label: "Contacto", target: "contacto" },
];

const knowledge = [
  {
    number: "01",
    title: "Formación",
    text: "Profesional en Finanzas y Negocios Internacionales por la Universidad de Manizales. Complementarios: diplomado en Gerencia de Proyectos, Seminario de Alta Gerencia y Curso certificado de Análisis de Datos con Python, adicional autodidacta con más de 500 horas aprendiendo inteligencia artificial.",
  },
  {
    number: "02",
    title: "Pensamiento digital",
    text: "Integro IA generativa, marketing digital y automatización a procesos de venta y prospección, conectando necesidades del negocio con soluciones tecnológicas claras y aplicables.",
  },
  {
    number: "03",
    title: "Herramientas e idioma",
    text: "Trabajo con CRM, Visual Studio Code, GitHub, Claude Code y n8n. Cuento con inglés B1 intermedio para desenvolverme en contextos de aprendizaje y colaboración.",
  },
];

const tools = [
  "Gestión comercial B2B/B2G/B2C",
  "IA generativa aplicada",
  "Alianzas estratégicas",
  "Negociación de alto nivel",
  "Marketing digital",
  "CRM",
  "Capacitación de equipos",
  "Visual Studio Code",
  "GitHub",
  "Claude Code",
  "Vercel",
  "n8n",
];

const roles = [
  {
    period: "Mar 2026 — Actualidad",
    location: "Bucaramanga",
    company: "Multicómputo · Multitech",
    sector: "Educación",
    team: "3",
    role: "Directora Comercial de Alianzas Empresariales",
    bullets: [
      "Lidero la gestión de alianzas estratégicas B2G con entidades públicas para estructurar programas de formación técnica que impulsan la empleabilidad y el desarrollo social en poblaciones clave.",
      "Diseño y comercializo programas de formación corporativa a la medida (B2B), incluyendo rutas de capacitación en inteligencia artificial, charlas y talleres cortos.",
      "Estructuro proyectos que integran la formación técnica laboral con los Objetivos de Desarrollo Sostenible (ODS), asegurando viabilidad financiera y retorno social.",
    ],
  },
  {
    period: "Mar 2025 — Mar 2026",
    location: "Bucaramanga",
    company: "Camper País · Campuslands",
    sector: "Educación y tecnología",
    team: "1",
    role: "Directora Comercial",
    bullets: [
      "Construí y lideré la estrategia de atracción de aliados privados para patrocinar formación en desarrollo de software e IA, articulando empresas, fundaciones y territorios bajo marcos de beneficios tributarios e impacto social.",
      "Diseñé propuestas comerciales B2B con impacto medible y establecí relaciones con C-Level executives y fundaciones empresariales.",
      "Consolidé acuerdos de empleabilidad y cuota SENA (lectiva y productiva) y articulé proyectos de software a la medida con viabilidad financiera y alcance técnico.",
    ],
  },
  {
    period: "Nov 2020 — Jul 2024",
    location: "Barranquilla",
    company: "Inversiones Álvarez SAS · Franquicia Don Jacobo",
    sector: "Retail · Alimentos",
    team: "6",
    role: "Directora Comercial y Administradora",
    bullets: [
      "Dirigí las áreas comercial y de marketing con campañas alineadas a objetivos estratégicos, gestión de proveedores y decisiones financieras.",
      "Incrementé las ventas anuales de forma sostenida (+15-20%, 2020-2024) estandarizando procesos comerciales y mejorando el embudo de conversión.",
      "Lideré la reapertura y reposicionamiento de la franquicia, recuperando cuota de mercado; las campañas estacionales generaron picos de +100% en ventas.",
    ],
  },
  {
    period: "Ago 2022 — Ene 2024",
    location: "Bucaramanga",
    company: "Industria de Alimentos Don Jacobo",
    sector: "Retail · Alimentos",
    team: "70",
    role: "Directora Comercial y de Marketing Nacional",
    bullets: [
      "Dirigí, capacité y evalué un equipo comercial de 70 personas (líderes de zona, fuerza de ventas presencial, call center y marketing), con planeación trimestral basada en KPIs.",
      "Superé las metas de ventas en 15% (2022-2023) e implementé estrategias de co-branding y productos de temporada a partir de análisis de tendencias de consumo.",
      "Reduje el índice de PQRS en 30% con programas de bienestar del equipo y elevé la conversión telefónica en 20% mediante reingeniería del call center y canales digitales.",
    ],
  },
  {
    period: "Feb 2019 — Nov 2019",
    location: "Bucaramanga",
    company: "Servimeters SAS",
    sector: "Construcción",
    role: "Ejecutiva Comercial",
    bullets: [
      "Apertura de cuentas clave B2B/B2C para certificaciones bajo normas RETIE y RETILAP en proyectos de infraestructura, con prospección técnica en obra.",
      "Elaboración de cotizaciones técnicas según el marco normativo vigente y gestión integral del cierre de negocios y recaudo de cartera.",
    ],
  },
  {
    period: "Feb 2016 — Jun 2018",
    location: "Bucaramanga",
    company: "Fénix Construcciones SAS",
    sector: "Inmobiliario · Construcción",
    role: "Ejecutiva Comercial Senior",
    bullets: [
      "Gerencia de sala de ventas para proyectos inmobiliarios de alto impacto y asesoría financiera integral (créditos hipotecarios, leasing habitacional y subsidios de vivienda).",
      "Ventas superiores a $1.200 millones mensuales con cierre de propiedades de alto valor en el sector inmobiliario de lujo.",
    ],
  },
];

function scrollTo(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionLabel({ number, eyebrow }: { number: string; eyebrow: string }) {
  return (
    <div className="section-label">
      <span>{number} / 03</span>
      <i />
      <span>{eyebrow}</span>
    </div>
  );
}

function PillarImage({ className, label }: { className: string; label: string }) {
  return <div className={`pillar-image ${className}`} role="img" aria-label={label} />;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 44);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (target: string) => {
    setOpen(false);
    scrollTo(target);
  };

  return (
    <main className="portfolio-shell">
      <header className={`site-header ${scrolled ? "site-header--solid" : ""}`}>
        <button className="brand-lockup" onClick={() => scrollTo("inicio")} aria-label="Volver al inicio">
          <img src="/assets/avatar-logo.webp" alt="Avatar de María Fernanda Blanco" />
          <span>María Fernanda<br />Blanco</span>
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map((link) => (
            <button key={link.target} onClick={() => navigate(link.target)}>{link.label}</button>
          ))}
        </nav>

        <button className="nav-toggle" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label="Abrir navegación">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-hidden={!open}>
          {links.map((link, index) => (
            <button key={link.target} onClick={() => navigate(link.target)}>
              <span>0{index + 1}</span>{link.label}<ArrowUpRight size={19} />
            </button>
          ))}
        </div>
      </header>

      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="hero-bg" aria-hidden="true">
          <HeroLoop />
          <div className="hero-bg__veil" />
        </div>
        <div className="hero-noise" />
        <FadeIn className="hero-topline" delay={0} y={-20}>
          <p>Dirección comercial · Desarrollo de negocios</p>
        </FadeIn>
        <FadeIn className="hero-stage" delay={0.15} y={40}>
          <h1 id="hero-title" className="hero-lockup">I&apos;m María Fernanda</h1>
        </FadeIn>
        <div className="hero-bottom">
          <FadeIn as="p" className="hero-statement" delay={0.35} y={20}>
            Conecto estrategia comercial, tecnología y relaciones de largo plazo para generar impacto.
          </FadeIn>
          <p className="hero-mark">MFB <span>·</span> 2026</p>
        </div>
      </section>

      <section className="marquee-band marquee-band--scroll" aria-label="Conceptos que definen mi perfil">
        <ScrollMarquee className="marquee-track" direction={-1} speed={0.3}>
          {[0, 1, 2].map((copia) => (
            <span className="marquee-group" key={copia}>
              <span>ESTRATEGIA</span><i>✦</i><span>CONEXIÓN</span><i>✦</i><span>IMPACTO</span><i>✦</i><span>APRENDIZAJE</span><i>✦</i><span>LIDERAZGO</span><i>✦</i>
            </span>
          ))}
        </ScrollMarquee>
      </section>

      <section id="saber-ser" className="chapter chapter--ser" aria-labelledby="ser-title">
        <FadeIn className="chapter-heading" y={40}>
          <SectionLabel number="01" eyebrow="La esencia que guía mi camino" />
          <h2 id="ser-title">SABER<br /><em>SER</em></h2>
        </FadeIn>
        <div className="ser-grid">
          <PillarImage className="pillar-image--ser" label="Composición abstracta que representa identidad y conexión" />
          <div className="ser-content">
            <AnimatedText className="chapter-lead" text="Creo en el poder de las relaciones que se construyen con escucha, intención y coherencia." />
            <p>Mi trayectoria ha fortalecido una mirada cercana de los negocios: comprender a las personas, leer el contexto y transformar las oportunidades en vínculos de valor. Me mueve aprender continuamente, liderar con propósito y aportar a iniciativas que generan desarrollo para otros.</p>
            <div className="value-cards">
              {[
                { label: "Esencia", title: <>Conexión<br />con propósito</> },
                { label: "Me inspira", title: <>El impacto<br />en la gente</> },
                { label: "Me orienta", title: <>Aprender<br />y evolucionar</> },
              ].map((card, i) => (
                <FadeIn as="article" key={card.label} delay={i * 0.1} y={24}>
                  <span>{card.label}</span><strong>{card.title}</strong>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
        <div className="personal-video" aria-label="Video personal de María Fernanda">
          <div className="personal-video__overlay" />
          <div className="personal-video__copy">
            <span className="video-label">Video personal</span>
            <h3>MI<br />ESENCIA</h3>
            <p>Este espacio está preparado para compartir, en primera persona, mi historia, mis motivaciones y las experiencias que nutren mi manera de estar en el mundo.</p>
          </div>
          <PersonalVideo />
        </div>
      </section>

      <section id="saber-saber" className="chapter chapter--saber" aria-labelledby="saber-title">
        <FadeIn className="chapter-heading chapter-heading--right" y={40}>
          <SectionLabel number="02" eyebrow="Conocimiento que se convierte en acción" />
          <h2 id="saber-title">SABER<br /><em>SABER</em></h2>
        </FadeIn>
        <div className="knowledge-intro">
          <PillarImage className="pillar-image--saber" label="Composición abstracta que representa aprendizaje y conocimiento" />
          <AnimatedText className="chapter-lead" text="La formación es más valiosa cuando amplía la capacidad de compartir conocimiento, crear soluciones y generar cambios que transformen realidades." />
        </div>
        <div className="knowledge-list">
          {knowledge.map((item, i) => (
            <FadeIn as="article" className="knowledge-item" key={item.number} delay={i * 0.1}>
              <span className="knowledge-number">{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
              <ArrowDownRight className="knowledge-arrow" size={24} />
            </FadeIn>
          ))}
        </div>
        <div className="tool-cloud" aria-label="Competencias y herramientas">
          <span className="tool-cloud__label">Competencias técnicas</span>
          <div>{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        </div>
      </section>

      <section id="saber-hacer" className="chapter chapter--hacer" aria-labelledby="hacer-title">
        <FadeIn className="chapter-heading" y={40}>
          <SectionLabel number="03" eyebrow="Experiencia que deja huella" />
          <h2 id="hacer-title">SABER<br /><em>HACER</em></h2>
        </FadeIn>
        <div className="hacer-hero">
          <PillarImage className="pillar-image--hacer" label="Composición abstracta que representa ejecución e impacto profesional" />
          <div className="hacer-hero__quote"><span>+10</span><p>Años de trayectoria comercial, construyendo estrategias sostenibles entre negocios, personas y oportunidades.</p></div>
        </div>
        <StackingCards>
          {roles.map((role) => (
            <article className="timeline-item" key={`${role.company}-${role.period}`}>
              <span className="timeline-period">
                {role.period}<i>{role.location}</i>
                {/* Solo se muestra en los cargos con equipo a cargo declarado. */}
                {role.team && <b className="timeline-team">Personas a cargo<em>{role.team}</em></b>}
              </span>
              <div className="timeline-main">
                <p className="timeline-company">{role.company}</p>
                <p className="timeline-sector">Sector: {role.sector}</p>
                <h3>{role.role}</h3>
              </div>
              <ul className="timeline-bullets">
                {role.bullets.map((punto) => <li key={punto}>{punto}</li>)}
              </ul>
            </article>
          ))}
        </StackingCards>
        <div className="impact-grid">
          <article className="impact-card impact-card--achievement">
            <span className="card-label">Logro destacado</span>
            <strong>+20<span>%</span></strong>
            <p>Incremento sostenido de ventas anuales entre 2020 y 2024 logrado por mi equipo comercial en la franquicia Don Jacobo Barranquilla, mediante la estandarización de procesos comerciales y una operación alineada a objetivos estratégicos.</p>
            <div className="impact-card__footer">También se alcanzó <b>+100 %</b> en ventas con campañas estacionales.</div>
          </article>
          <article className="impact-card impact-card--challenge">
            <span className="card-label">Reto que transformó</span>
            <h3>REABRIR,<br />REPOSICIONAR,<br />RECONECTAR.</h3>
            <p>Ante el desafío de reabrir y reposicionar con bajo presupuesto la marca Don Jacobo, primero una franquicia nueva y después todos los puntos a nivel nacional, dirigí la gestión comercial y de marketing, reforzando campañas estacionales de la mano con proveedores (gana-gana) y recuperando presencia en el mercado, tanto digital como presencial, hasta lograr el punto de equilibrio.</p>
            <div className="impact-card__footer">
              <span className="destacado">El impacto: recuperación de cuota de mercado y un nuevo impulso comercial bajo la metodología <b>«Behinder»</b>: dar valor a vendedores y líderes para que alcancen sus objetivos personales y profesionales, y que eso se traduzca en resultados; en este caso, ventas.</span>
            </div>
          </article>
        </div>
        <div className="competencies">
          <p>Fortalezas que he desarrollado</p>
          <div><span>01 · Liderazgo comercial y desarrollo de equipos</span><span>02 · Alianzas y negociación estratégica</span><span>03 · Innovación</span></div>
        </div>
      </section>

      <footer id="contacto" className="site-footer">
        <div className="footer-topline"><span>¿Hablamos?</span><i /></div>
        <div className="footer-main">
          <div><p className="footer-overline">Hagamos que las oportunidades</p><h2>SE VUELVAN<br /><em>IMPACTO.</em></h2></div>
          <Magnet padding={140} strength={3}>
            <a className="contact-orb" href="https://wa.me/573008615282" target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp a María Fernanda Blanco"><MoveRight size={37} /></a>
          </Magnet>
        </div>
        <div className="footer-details">
          <a href="mailto:mafeblanco5@gmail.com"><Mail size={17} /> mafeblanco5@gmail.com</a>
          <a href="https://wa.me/573008615282" target="_blank" rel="noreferrer"><MessageCircle size={17} /> +57 300 861 5282 <ExternalLink size={14} /></a>
          <span><MapPin size={17} /> Bucaramanga, Santander</span>
          <a href="https://www.linkedin.com/in/mariablanco-comercialymarketing" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ExternalLink size={14} /></a>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} María Fernanda Blanco Pinto</span><span>Dirección comercial · Desarrollo de negocios</span><button onClick={() => scrollTo("inicio")}>Volver arriba <ArrowUpRight size={14} /></button></div>
      </footer>
    </main>
  );
}
