"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ContactButton } from "@/components/Hero";

const CARDS = [
  {
    label: "Engineering",
    title: "Build tomorrow's AI canvas",
    desc: "Own entire systems end-to-end — from model inference and GPU optimization to the editor your millions of users touch every day. Ship in weeks, not quarters.",
    img: "/life-launch.JPG",
    accent: "#7C3AED",
    accentSoft: "rgba(124,58,237,0.12)",
  },
  {
    label: "Design",
    title: "Shape how millions create",
    desc: "Design the surface between frontier AI and human imagination. Your decisions live in the hands of 800K+ daily creators. Make it beautiful and make it simple.",
    img: "/life-event.JPG",
    accent: "#A855F7",
    accentSoft: "rgba(168,85,247,0.12)",
  },
  {
    label: "Growth",
    title: "Scale what the world uses",
    desc: "Drive the metrics that matter at a company already doing $35M+ ARR and growing fast. You'll own campaigns, channels, and growth loops — and see the results in days.",
    img: "/life-meet2.jpg",
    accent: "#EC4899",
    accentSoft: "rgba(236,72,153,0.12)",
  },
];

function StickyCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: (typeof CARDS)[0];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleFrom = (index + 1) / total;
  const scaleTo = Math.min(1, (index + 1.6) / total);
  const scale = useTransform(
    scrollYProgress,
    [scaleFrom, scaleTo],
    [1, index < total - 1 ? 0.9 : 1]
  );

  return (
    <motion.div
      style={{
        position: "sticky",
        top: `${16 + index * 24}px`,
        height: "84vh",
        borderRadius: 40,
        overflow: "hidden",
        background: "var(--bg-raised)",
        zIndex: index + 1,
        scale,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        border: "1px solid var(--glass-border)",
        boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Inner top glow strip matching accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent 0%, ${card.accent} 50%, transparent 100%)`,
        zIndex: 5,
      }} />

      {/* Left: text content */}
      <div style={{
        padding: "clamp(40px, 5vw, 72px)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", zIndex: 2,
      }}>
        {/* Accent glow behind content */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: "300px", height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${card.accentSoft} 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{
            display: "inline-block",
            color: card.accent,
            fontSize: "clamp(10px, 0.8vw, 12px)",
            letterSpacing: "0.16em", textTransform: "uppercase",
            marginBottom: 24, fontWeight: 600,
            padding: "5px 14px",
            borderRadius: 100,
            background: card.accentSoft,
            border: `1px solid ${card.accent}40`,
          }}>
            {card.label}
          </span>
          <h3 className="hero-heading" style={{
            fontSize: "clamp(28px, 3.5vw, 52px)",
            lineHeight: 1.0, fontWeight: 800,
            margin: "0 0 24px", letterSpacing: "-0.03em",
          }}>
            {card.title}
          </h3>
          <p style={{
            color: "var(--text-2)",
            fontSize: "clamp(13px, 1.1vw, 16px)",
            lineHeight: 1.7, margin: 0, maxWidth: 400,
          }}>
            {card.desc}
          </p>
        </div>

        <div style={{ marginTop: 40, position: "relative", zIndex: 1 }}>
          <ContactButton
            label="View open roles →"
            onClick={() => {
              const el = document.getElementById("roles");
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {/* Right: image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={card.img}
          alt={card.label}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="50vw"
        />
        {/* Gradient blend to card bg */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, var(--bg-raised) 0%, transparent 40%)`,
        }} />
        {/* Right edge fade */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to right, transparent 60%, var(--bg-raised) 100%)`,
        }} />
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="work"
      style={{
        height: `${CARDS.length * 100}vh`,
        background: "var(--bg)",
        padding: "0 clamp(16px, 2.5vw, 40px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "clamp(60px, 8vw, 100px) clamp(8px, 2vw, 40px) clamp(40px, 5vw, 64px)",
      }}>
        <p style={{
          color: "var(--text-3)",
          fontSize: "clamp(10px, 0.85vw, 12px)",
          letterSpacing: "0.14em", textTransform: "uppercase",
          margin: "0 0 12px",
        }}>
          Open roles
        </p>
        <h2 style={{
          color: "var(--text-1)",
          fontSize: "clamp(28px, 4vw, 56px)",
          fontWeight: 700, margin: 0,
          letterSpacing: "-0.03em", lineHeight: 1.1,
        }}>
          Find your team.
        </h2>
      </div>

      {CARDS.map((card, i) => (
        <StickyCard
          key={card.label}
          card={card}
          index={i}
          total={CARDS.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  );
}
