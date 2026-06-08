/* Nav, Mission, Values, Perks, Gallery (Life), Process, CTA, Footer */
const { Icon: SIcon, Eyebrow: SEyebrow, Button: SButton } = window;
const { useState: useStateS, useEffect: useEffectS } = React;

function Nav() {
  const [scrolled, setScrolled] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-inner">
        <a className="brand" href="https://www.imagine.art/" target="_blank" rel="noreferrer"><img src={(window.__resources && window.__resources.imagineLogo) || "assets/imagine-logo.svg"} alt="" /><b>ImagineArt</b></a>
        <div className="nav-links">
          <a onClick={() => window.scrollToId('mission')}>Mission</a>
          <a onClick={() => window.scrollToId('life')}>Life</a>
          <a onClick={() => window.scrollToId('team')}>Founders</a>
          <a onClick={() => window.scrollToId('process')}>Hiring process</a>
          <a onClick={() => window.scrollToId('roles')}>Open roles</a>
        </div>
      </div>
    </nav>
  );
}

function StatsBand() {
  return (
    <section className="section-tight" id="numbers">
      <div className="wrap">
        <div className="stats-band">
          <div className="glow" />
          <div className="stats-band-head">
            <SEyebrow style={{ color: "rgb(var(--primary-30))" }}>By the numbers</SEyebrow>
            <h2>Bootstrapped from Pakistan to one of the world's top creative AI platforms.</h2>
          </div>
          <div className="stats-band-grid">
            {window.STATS.map((s) => (
              <div key={s.label} className="sb-stat">
                <div className="sb-n gtext">{s.n}</div>
                <div className="sb-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section" id="team">
      <div className="wrap">
        <div className="sec-head">
          <SEyebrow>Who you'll work with</SEyebrow>
          <h2>Meet the founders.</h2>
          <p>Three engineers who bootstrapped ImagineArt from scratch — and still ship alongside the team every week.</p>
        </div>
        <div className="team-grid">
          {window.TEAM.map((m) => (
            <div className="team-card" key={m.id}>
              <div className="team-photo">
                <image-slot id={m.id} radius="20" placeholder={"Photo of " + m.name}></image-slot>
                <a className="team-li" href={m.li} target="_blank" rel="noreferrer" aria-label={m.name + " on LinkedIn"}>
                  <SIcon name="linkedin" size={18} />
                </a>
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="section" id="mission">
      <div className="wrap">
        <div className="mission-grid">
          <div>
            <SEyebrow>Why ImagineArt</SEyebrow>
            <h2 className="mission-h">We're building the creative engine for the next billion makers.</h2>
          </div>
          <div className="mission-body">
            <p>Most people have ideas they can't yet make real. We're changing that — bundling every frontier model into one canvas so anyone can generate images, video, music and more without the tabs, the jargon, or the cost.</p>
            <p>We're already there for over 100 million creators. The next chapter is bigger, and it's wide open. If you want your work in the hands of millions within weeks of building it, you'll feel at home here.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section" id="values">
      <div className="wrap">
        <div className="sec-head">
          <SEyebrow>How we work</SEyebrow>
          <h2>Six things we believe.</h2>
          <p>Not posters on a wall — the actual operating principles behind how we hire, build and decide.</p>
        </div>
        <div className="values-grid">
          {window.VALUES.map((v) => (
            <div className="value-card" key={v.title}>
              <div className="v-icon"><SIcon name={v.icon} size={22} /></div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Perks() {
  return (
    <section className="section perks" id="perks">
      <div className="wrap">
        <div className="sec-head">
          <SEyebrow>The package</SEyebrow>
          <h2>Set up to do your best work.</h2>
          <p>We take care of the essentials so you can focus on building things people love.</p>
        </div>
        <div className="perks-grid">
          {window.PERKS.map((p) => (
            <div className="perk-card" key={p.title}>
              <div className="p-icon"><SIcon name={p.icon} size={20} /></div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section" id="life">
      <div className="wrap">
        <div className="sec-head">
          <SEyebrow>Life at ImagineArt</SEyebrow>
          <h2>A small team that ships, together.</h2>
          <p>Demo Fridays, real ownership, and a few offsites a year. Drop your own photos into any frame below.</p>
        </div>
        <div className="gallery-grid">
          {window.GALLERY.map((g) => (
            <div className={"gallery-item " + g.span} key={g.id}>
              <image-slot id={g.id} radius="20" placeholder={g.label}></image-slot>
              <span className="glabel">{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="sec-head">
          <SEyebrow>Hiring process</SEyebrow>
          <h2>What to expect.</h2>
          <p>We move fast — from first conversation to offer usually takes just 1–2 weeks. Transparent, and built around your craft, not trick questions.</p>
        </div>
        <div className="process-steps">
          {window.PROCESS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section-tight">
      <div className="wrap">
        <div className="cta-band">
          <div className="glow" />
          <h2>Don't see your role?</h2>
          <p>We're always meeting exceptional people. Tell us what you'd build and why it should exist.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <SButton variant="brand" size="lg" icon="arrow-right" href={window.ASHBY_URL}>Browse all roles</SButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="brand" href="https://www.imagine.art/" target="_blank" rel="noreferrer"><img src={(window.__resources && window.__resources.imagineLogo) || "assets/imagine-logo.svg"} alt="" /><b>ImagineArt</b></a>
        <div className="footer-links">
          <a href={window.ASHBY_URL} target="_blank" rel="noreferrer">Open roles</a>
          <a href="https://www.imagine.art/" target="_blank" rel="noreferrer">Product</a>
          <a href="mailto:talent@imagine.art">talent@imagine.art</a>
        </div>
        <small>© 2026 ImagineArt</small>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, StatsBand, Team, Mission, Values, Perks, Gallery, Process, CTA, Footer });
