"use client";

import Image from "next/image";
import { Icon, Eyebrow, Button, ImageSlot } from "@/components/ui";
import { STATS, FOUNDERS, TEAM, VALUES, PERKS, GALLERY, PROCESS, ASHBY_URL } from "@/lib/data";
import StatsBandClient from "@/components/StatsBandClient";
import { FadeIn, AnimatedText, Card3D } from "@/components/animations";
import { ContactButton } from "@/components/Hero";

// ── Stats Band ────────────────────────────────────────────────────────────────

export function StatsBand() {
  return (
    <section className="section-tight" id="numbers">
      <div className="wrap">
        <div className="stats-band">
          <div className="glow" />
          <div className="stats-band-head reveal">
            <Eyebrow>By the numbers</Eyebrow>
            <h2>Bootstrapped from Pakistan to one of the world&apos;s top creative AI platforms.</h2>
          </div>
          <StatsBandClient stats={STATS} />
        </div>
      </div>
    </section>
  );
}

// ── Mission ────────────────────────────────────────────────────────────────────

export function Mission() {
  return (
    <section
      id="mission"
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        position: "relative",
        overflowX: "clip",
      }}
    >
      {/* Corner 3D floating cards */}
      <FadeIn delay={0.2} duration={1.2} style={{ position: "absolute", top: 48, left: 48, zIndex: 0 }}>
        <Card3D intensity={8} shimmer={false}>
          <div style={{
            width: "clamp(110px, 13vw, 190px)",
            height: "clamp(140px, 17vw, 250px)",
            borderRadius: "clamp(16px, 2vw, 24px)",
            overflow: "hidden",
            opacity: 0.55,
            position: "relative",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
          }}>
            <Image src="/life-meet.jpg" alt="" fill style={{ objectFit: "cover" }} sizes="190px" />
          </div>
        </Card3D>
      </FadeIn>

      <FadeIn delay={0.3} duration={1.2} style={{ position: "absolute", top: 64, right: 48, zIndex: 0 }}>
        <Card3D intensity={8} shimmer={false}>
          <div style={{
            width: "clamp(90px, 10vw, 160px)",
            height: "clamp(110px, 14vw, 210px)",
            borderRadius: "clamp(14px, 1.8vw, 22px)",
            overflow: "hidden",
            opacity: 0.4,
            position: "relative",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}>
            <Image src="/life-event.JPG" alt="" fill style={{ objectFit: "cover" }} sizes="160px" />
          </div>
        </Card3D>
      </FadeIn>

      <FadeIn delay={0.25} duration={1.2} style={{ position: "absolute", bottom: 64, left: 64, zIndex: 0 }}>
        <Card3D intensity={8} shimmer={false}>
          <div style={{
            width: "clamp(80px, 9vw, 140px)",
            height: "clamp(100px, 12vw, 180px)",
            borderRadius: "clamp(12px, 1.5vw, 20px)",
            overflow: "hidden",
            opacity: 0.35,
            position: "relative",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}>
            <Image src="/team-ahmed.jpg" alt="" fill style={{ objectFit: "cover" }} sizes="140px" />
          </div>
        </Card3D>
      </FadeIn>

      <FadeIn delay={0.35} duration={1.2} style={{ position: "absolute", bottom: 48, right: 64, zIndex: 0 }}>
        <Card3D intensity={8} shimmer={false}>
          <div style={{
            width: "clamp(90px, 10vw, 150px)",
            height: "clamp(110px, 13vw, 200px)",
            borderRadius: "clamp(14px, 1.8vw, 22px)",
            overflow: "hidden",
            opacity: 0.38,
            position: "relative",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}>
            <Image src="/life-team.jpg" alt="" fill style={{ objectFit: "cover" }} sizes="150px" />
          </div>
        </Card3D>
      </FadeIn>

      {/* Center content */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 800, margin: "0 auto",
        textAlign: "center", width: "100%",
      }}>
        <FadeIn delay={0.1}>
          <p style={{
            color: "var(--text-3)",
            fontSize: "clamp(10px, 0.85vw, 12px)",
            letterSpacing: "0.16em", textTransform: "uppercase",
            margin: "0 0 clamp(20px, 3vw, 36px)",
          }}>
            Why ImagineArt
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={40}>
          <h2 className="hero-heading" style={{
            fontSize: "clamp(40px, 6.5vw, 96px)",
            lineHeight: 0.92, fontWeight: 800,
            margin: "0 0 clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.04em",
          }}>
            About
          </h2>
        </FadeIn>

        <AnimatedText
          text="Most people have ideas they can't yet make real — we are changing that. An all-in-one platform, just without the tabs, jargon or the massive budgets. We're already there for over 100 million creators. The next chapter is bigger, and it's wide open. If you want your work in the hands of millions within weeks of building it, you'll feel at home here."
          style={{
            color: "var(--text-1)",
            fontSize: "clamp(15px, 1.4vw, 19px)",
            lineHeight: 1.75,
            maxWidth: 680,
            marginLeft: "auto", marginRight: "auto",
            marginBottom: "clamp(36px, 5vw, 56px)",
          }}
        />

        <FadeIn delay={0.4}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ContactButton
              label="Explore open roles →"
              onClick={() => {
                const el = document.getElementById("roles");
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
              }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Team ──────────────────────────────────────────────────────────────────────

export function Team() {
  return (
    <section className="section" id="team" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>Who you&apos;ll work with</Eyebrow>
          <h2>The people behind ImagineArt.</h2>
          <p>Founders who still ship code daily, and a team that moves like a startup inside one.</p>
        </div>

        <div className="team-label reveal">Founders</div>
        <div className="team-grid reveal-grid">
          {FOUNDERS.map((m) => (
            <Card3D key={m.id} intensity={10} className="reveal">
              <div className="team-card">
                <div className="team-photo" style={{ aspectRatio: "3/4" }}>
                  <ImageSlot src={m.photo} radius="16px" />
                  {m.li && (
                    <a className="team-li" href={m.li} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`}>
                      <Icon name="linkedin" size={18} />
                    </a>
                  )}
                </div>
                <div className="team-name" style={{ marginTop: 12 }}>{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
            </Card3D>
          ))}
        </div>

        <div className="team-label reveal" style={{ marginTop: 56 }}>Team</div>
        <div className="team-members-grid reveal-grid">
          {TEAM.map((m) => (
            <Card3D key={m.id} intensity={12} className="member-card reveal">
              <div className="member-photo">
                <ImageSlot src={m.photo} radius="0" />
                {m.li ? (
                  <a className="team-li" href={m.li} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`}>
                    <Icon name="linkedin" size={16} />
                  </a>
                ) : (
                  <span className="team-li" style={{ opacity: 0.3, cursor: "default" }}>
                    <Icon name="linkedin" size={16} />
                  </span>
                )}
              </div>
              <div className="member-name">{m.name}</div>
              <div className="member-role">{m.role}</div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export function Gallery() {
  return (
    <section className="section section-bordered" id="gallery" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>Behind the scenes</Eyebrow>
          <h2>Demo Fridays, offsites, and real ownership.</h2>
          <p>A glimpse into how we work and celebrate together.</p>
        </div>
        <div className="gallery-grid reveal-grid">
          {GALLERY.map((g) => (
            <div className={`gallery-item reveal${g.span ? ` ${g.span}` : ""}`} key={g.id}>
              <ImageSlot src={g.src} alt={g.label} radius="0" />
              {g.label && <span className="glabel">{g.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Values ────────────────────────────────────────────────────────────────────

export function Values() {
  return (
    <section
      id="values"
      style={{
        background: "var(--bg)",
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        position: "relative",
        overflowX: "clip",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "80vw", height: "400px", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            color: "var(--text-3)", fontSize: "clamp(10px, 0.85vw, 12px)",
            letterSpacing: "0.16em", textTransform: "uppercase",
            margin: "0 0 12px",
          }}>
            How we work
          </p>
          <h2 style={{
            color: "var(--text-1)",
            fontSize: "clamp(32px, 5vw, 72px)",
            fontWeight: 800, margin: "0 0 clamp(48px, 6vw, 80px)",
            letterSpacing: "-0.04em", lineHeight: 1.0,
          }}>
            Our Values
          </h2>
        </FadeIn>

        <div className="values-grid">
          {VALUES.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.06} y={24}>
              <Card3D intensity={12} className="value-card">
                <div className="v-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Card3D>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Perks ─────────────────────────────────────────────────────────────────────

export function Perks() {
  return (
    <section className="section section-bordered" id="perks" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>The package</Eyebrow>
          <h2>Set up to do your best work.</h2>
          <p>We take care of the essentials so you can focus on building things people love.</p>
        </div>
        <div className="perks-grid reveal-grid">
          {PERKS.map((p) => (
            <Card3D key={p.title} intensity={14} className="perk-card reveal">
              <div className="p-icon"><Icon name={p.icon} size={20} /></div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────

export function Process() {
  return (
    <section className="section section-bordered" id="process" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <Eyebrow>Hiring process</Eyebrow>
          <h2>What to expect.</h2>
          <p>We move fast with most hiring decisions made within 1–2 weeks.</p>
        </div>
        <div className="process-steps reveal-grid">
          {PROCESS.map((s) => (
            <Card3D key={s.n} intensity={12} className="step reveal">
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
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="brand" href="https://www.imagine.art/" target="_blank" rel="noreferrer">
          <Image src="/imagine-logo.svg" alt="" width={28} height={28} />
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
