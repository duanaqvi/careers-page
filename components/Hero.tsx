"use client";

import Image from "next/image";
import { FadeIn, Magnet } from "@/components/animations";

const NAV_LINKS = [
  { label: "About",   id: "mission" },
  { label: "Life",    id: "life" },
  { label: "Team",    id: "team" },
  { label: "Roles",   id: "roles" },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
}

export function ContactButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)",
        color: "#fff",
        border: "none",
        borderRadius: 100,
        padding: "clamp(11px,1.2vw,15px) clamp(22px,2.2vw,34px)",
        fontSize: "clamp(13px, 1.1vw, 15px)",
        fontFamily: "inherit",
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        boxShadow: "0 0 32px rgba(124,58,237,0.45), 0 4px 16px rgba(0,0,0,0.3)",
        transition: "opacity 0.2s, transform 0.1s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
    >
      {label}
    </button>
  );
}

export default function Hero() {
  return (
    <section style={{
      height: "100vh", minHeight: 640,
      background: "var(--bg)",
      display: "flex", flexDirection: "column",
      overflowX: "clip", position: "relative",
    }}>
      {/* Ambient glows */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        overflow: "hidden",
      }}>
        {/* Top-left purple orb */}
        <div style={{
          position: "absolute",
          top: "-20%", left: "-10%",
          width: "55vw", height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)",
        }} />
        {/* Bottom-right pink orb */}
        <div style={{
          position: "absolute",
          bottom: "-10%", right: "-5%",
          width: "40vw", height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 65%)",
        }} />
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }} />
      </div>

      {/* Navbar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "clamp(20px, 2.5vw, 40px) clamp(24px, 5vw, 80px)",
        flexShrink: 0, position: "relative", zIndex: 2,
      }}>
        <FadeIn delay={0} duration={0.6}>
          <a href="https://www.imagine.art/" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Image src="/imagine-logo.svg" alt="ImagineArt" width={32} height={32} />
            <span style={{ color: "var(--text-1)", fontWeight: 700, fontSize: "clamp(14px, 1.2vw, 16px)", letterSpacing: "-0.01em" }}>
              ImagineArt
            </span>
          </a>
        </FadeIn>

        <FadeIn delay={0.1} duration={0.6}>
          <nav style={{ display: "flex", gap: "clamp(16px, 2.5vw, 40px)", alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToId(link.id)}
                style={{
                  color: "var(--text-2)",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "clamp(10px, 0.85vw, 12px)",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: 0, transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-1)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)")}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </FadeIn>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>

        {/* Tagline — upper left */}
        <FadeIn delay={0.5} duration={0.7} style={{
          position: "absolute",
          top: "clamp(10px, 2vw, 30px)",
          left: "clamp(24px, 5vw, 80px)",
        }}>
          <p style={{
            color: "var(--text-3)",
            fontSize: "clamp(11px, 0.9vw, 13px)",
            lineHeight: 1.7, margin: 0, letterSpacing: "0.04em",
          }}>
            Creative AI Platform<br />
            100M+ Creators Worldwide
          </p>
        </FadeIn>

        {/* Portrait — upper right, magnetic + 3D float */}
        <div style={{
          position: "absolute",
          top: "clamp(0px, 1vw, 16px)",
          right: "clamp(24px, 5vw, 80px)",
          zIndex: 2,
        }}>
          <Magnet padding={200} strength={3.5}>
            <FadeIn delay={0.3} duration={0.9} y={-10}>
              <div style={{
                position: "relative",
                width: "clamp(130px, 15vw, 240px)",
                height: "clamp(180px, 22vw, 340px)",
                borderRadius: "clamp(20px, 2.5vw, 36px)",
                overflow: "hidden",
                background: "var(--bg-elevated)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px rgba(124,58,237,0.15)",
              }}>
                <Image
                  src="/life-launch.JPG"
                  alt="ImagineArt team"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  sizes="240px"
                />
                {/* Glass overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, rgba(124,58,237,0.08) 0%, transparent 50%)",
                  pointerEvents: "none",
                }} />
              </div>
            </FadeIn>
          </Magnet>
        </div>

        {/* Giant heading — bottom left */}
        <div style={{
          position: "absolute",
          bottom: "clamp(20px, 3vw, 40px)",
          left: "clamp(24px, 5vw, 80px)",
          right: 0, zIndex: 1,
        }}>
          <FadeIn y={60} delay={0.2} duration={0.9}>
            <h1 className="hero-heading" style={{
              fontSize: "clamp(11vw, 14vw, 18vw)",
              lineHeight: 0.88, fontWeight: 800,
              margin: 0, letterSpacing: "-0.04em",
            }}>
              ImagineArt
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Bottom bar */}
      <FadeIn delay={0.65} duration={0.7}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "clamp(14px, 1.8vw, 22px) clamp(24px, 5vw, 80px)",
          borderTop: "1px solid var(--border)",
          flexShrink: 0, gap: 16, flexWrap: "wrap",
          position: "relative", zIndex: 2,
          background: "rgba(7,7,12,0.5)",
          backdropFilter: "blur(8px)",
        }}>
          <p style={{
            color: "var(--text-3)",
            fontSize: "clamp(11px, 0.85vw, 13px)",
            margin: 0, maxWidth: 500, lineHeight: 1.5,
          }}>
            Bootstrapped from Islamabad · 800K+ daily creators · $35M+ ARR · Come build what&apos;s next.
          </p>
          <ContactButton label="Join the team →" onClick={() => scrollToId("roles")} />
        </div>
      </FadeIn>
    </section>
  );
}
