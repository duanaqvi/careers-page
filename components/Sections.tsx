import Image from "next/image";
import { Icon, Eyebrow, Button, ImageSlot } from "@/components/ui";
import { STATS, FOUNDERS, TEAM, VALUES, PERKS, GALLERY, PROCESS, ASHBY_URL } from "@/lib/data";
import StatsBandClient from "@/components/StatsBandClient";

export function StatsBand() {
  return (
    <section className="section-tight" id="numbers">
      <div className="wrap">
        <div className="stats-band">
          <div className="glow" />
          <div className="stats-band-head reveal">
            <Eyebrow style={{ color: "rgb(var(--primary-70))" }}>By the numbers</Eyebrow>
            <h2>Bootstrapped from Pakistan to one of the world&apos;s top creative AI platforms.</h2>
          </div>
          <StatsBandClient stats={STATS} />
        </div>
      </div>
    </section>
  );
}

export function Mission() {
  return (
    <section className="section" id="mission">
      <div className="wrap">
        <div className="mission-tagline reveal">
          Most people have ideas they can&apos;t yet make real — we are changing that.
          An all-in-one platform, just without the tabs, jargon, or the massive budgets.
        </div>
        <div className="mission-grid reveal">
          <div>
            <Eyebrow>Why ImagineArt</Eyebrow>
            <h2 className="mission-h">
              We&apos;re building the creative engine for the next billion makers.
            </h2>
          </div>
          <div className="mission-body">
            <p>
              Most people have ideas they can&apos;t yet make real. We&apos;re changing that — bundling
              every frontier model into one canvas so anyone can generate images, video, music and more
              without the tabs, the jargon, or the cost.
            </p>
            <p>
              We&apos;re already there for over 100 million creators. The next chapter is bigger, and it&apos;s
              wide open. If you want your work in the hands of millions within weeks of building it,
              you&apos;ll feel at home here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className="section" id="team">
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>Who you&apos;ll work with</Eyebrow>
          <h2>The people behind ImagineArt.</h2>
          <p>Founders who still ship code daily, and a team that moves like a startup inside one.</p>
        </div>

        {/* Founders */}
        <div className="team-label reveal">Founders</div>
        <div className="team-grid reveal-grid">
          {FOUNDERS.map((m) => (
            <div className="team-card reveal" key={m.id}>
              <div className="team-photo">
                <ImageSlot src={m.photo} radius="20px" />
                {m.li && (
                  <a className="team-li" href={m.li} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`}>
                    <Icon name="linkedin" size={18} />
                  </a>
                )}
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>

        {/* Broader team */}
        <div className="team-label reveal" style={{ marginTop: 48 }}>Team</div>
        <div className="team-members-grid reveal-grid">
          {TEAM.map((m) => (
            <div className="member-card reveal" key={m.id}>
              <div className="member-photo">
                <ImageSlot src={m.photo} radius="14px" />
                {m.li ? (
                  <a className="team-li" href={m.li} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`}>
                    <Icon name="linkedin" size={16} />
                  </a>
                ) : (
                  <span className="team-li" style={{ opacity: 0.35, cursor: "default" }}>
                    <Icon name="linkedin" size={16} />
                  </span>
                )}
              </div>
              <div className="member-name">{m.name}</div>
              <div className="member-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="section" id="life">
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>Life at ImagineArt</Eyebrow>
          <h2>A small team that ships, together.</h2>
          <p>Where ambitious people come to build, learn, and create together.</p>
        </div>
        <div className="gallery-grid reveal-grid">
          {GALLERY.map((g) => (
            <div className={`gallery-item reveal${g.span ? ` ${g.span}` : ""}`} key={g.id}>
              <ImageSlot src={g.src} alt={g.label} radius="20px" />
              <span className="glabel">{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Values() {
  return (
    <section className="section" id="values">
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>How we work</Eyebrow>
          <h2>Six things we believe.</h2>
          <p>Not posters on a wall — the actual operating principles behind how we hire, build and decide.</p>
        </div>
        <div className="values-grid reveal-grid">
          {VALUES.map((v) => (
            <div className="value-card reveal" key={v.title}>
              <div className="v-icon"><Icon name={v.icon} size={22} /></div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Perks() {
  return (
    <section className="section perks" id="perks">
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>The package</Eyebrow>
          <h2>Set up to do your best work.</h2>
          <p>We take care of the essentials so you can focus on building things people love.</p>
        </div>
        <div className="perks-grid reveal-grid">
          {PERKS.map((p) => (
            <div className="perk-card reveal" key={p.title}>
              <div className="p-icon"><Icon name={p.icon} size={20} /></div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>Hiring process</Eyebrow>
          <h2>What to expect.</h2>
          <p>We move fast — most hiring decisions are made within 1–2 weeks.</p>
        </div>
        <div className="process-steps reveal-grid">
          {PROCESS.map((s) => (
            <div className="step reveal" key={s.n}>
              {s.img && (
                <div className="step-img">
                  <Image src={s.img} alt={s.title} fill sizes="260px" style={{ objectFit: "cover" }} />
                </div>
              )}
              <div className="step-body" data-n={s.n}>
                <div className="step-circle">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="brand" href="https://www.imagine.art/" target="_blank" rel="noreferrer">
          <Image src="/imagine-logo.svg" alt="" width={30} height={30} />
          <b>ImagineArt</b>
        </a>
        <div className="footer-links">
          <a href={ASHBY_URL} target="_blank" rel="noreferrer">Open roles</a>
          <a href="https://www.imagine.art/" target="_blank" rel="noreferrer">Product</a>
        </div>
        <small>© 2026 ImagineArt</small>
      </div>
    </footer>
  );
}
