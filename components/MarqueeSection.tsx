"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const LOCAL_IMAGES = [
  "/life-team.jpg",
  "/life-event.JPG",
  "/life-meet.jpg",
  "/life-meet2.jpg",
  "/life-launch.JPG",
  "/process-01-apply.png",
  "/process-02-intro.png",
  "/process-03-technical.png",
  "/process-04-task.png",
  "/process-05-founder.png",
  "/process-06-offer.png",
];

function buildRow(shift = 0): string[] {
  const out: string[] = [];
  for (let i = 0; i < 14; i++) out.push(LOCAL_IMAGES[(i + shift) % LOCAL_IMAGES.length]);
  return out;
}

const ROW1 = buildRow(0);
const ROW2 = buildRow(4);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) * 0.22;
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${-progress}px)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${progress}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="life"
      style={{
        background: "var(--bg)",
        padding: "clamp(60px, 8vw, 120px) 0",
        overflowX: "clip",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {/* Subtle radial glow behind the strips */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw", height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Section label */}
      <div style={{
        padding: "0 clamp(24px, 5vw, 80px)",
        marginBottom: "clamp(32px, 4vw, 56px)",
        position: "relative", zIndex: 1,
      }}>
        <p style={{
          color: "var(--text-3)",
          fontSize: "clamp(10px, 0.85vw, 12px)",
          letterSpacing: "0.14em", textTransform: "uppercase",
          margin: "0 0 12px",
        }}>
          Life at ImagineArt
        </p>
        <h2 style={{
          color: "var(--text-1)",
          fontSize: "clamp(28px, 4vw, 56px)",
          fontWeight: 700, margin: 0,
          letterSpacing: "-0.03em", lineHeight: 1.1,
        }}>
          Where ambitious people<br />
          build, learn, and create.
        </h2>
      </div>

      {/* 3D perspective wrapper */}
      <div style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ transform: "rotateX(4deg)", transformStyle: "preserve-3d" }}>
          {/* Row 1 */}
          <div style={{ marginBottom: "clamp(12px, 1.5vw, 18px)", willChange: "transform" }}>
            <div ref={row1Ref} style={{
              display: "flex",
              gap: "clamp(12px, 1.5vw, 18px)",
              transition: "transform 0.06s linear",
              width: "max-content",
            }}>
              {ROW1.map((src, i) => (
                <MarqueeItem key={`r1-${i}`} src={src} />
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ willChange: "transform" }}>
            <div ref={row2Ref} style={{
              display: "flex",
              gap: "clamp(12px, 1.5vw, 18px)",
              transition: "transform 0.06s linear",
              width: "max-content",
            }}>
              {ROW2.map((src, i) => (
                <MarqueeItem key={`r2-${i}`} src={src} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeItem({ src }: { src: string }) {
  return (
    <div style={{
      position: "relative",
      width: "clamp(260px, 28vw, 420px)",
      height: "clamp(160px, 18vw, 260px)",
      borderRadius: "clamp(12px, 1.5vw, 20px)",
      overflow: "hidden", flexShrink: 0,
      background: "var(--bg-elevated)",
      border: "1px solid var(--glass-border)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
    }}>
      <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="420px" />
    </div>
  );
}
