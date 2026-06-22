"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// ── FadeIn ─────────────────────────────────────────────────────────────────────
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Card3D ─────────────────────────────────────────────────────────────────────
// Mouse-following 3D tilt with optional shimmer highlight.
export function Card3D({
  children,
  className = "",
  style,
  intensity = 14,
  shimmer = true,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  shimmer?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(8px)`;
    el.style.transition = "transform 0.08s ease-out";
    if (shimmerRef.current) {
      const sx = ((e.clientX - rect.left) / rect.width) * 100;
      const sy = ((e.clientY - rect.top) / rect.height) * 100;
      shimmerRef.current.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    el.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
    if (shimmerRef.current) shimmerRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: "preserve-3d", willChange: "transform", position: "relative" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {shimmer && (
        <div
          ref={shimmerRef}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 10,
            transition: "background 0.1s ease",
          }}
        />
      )}
    </div>
  );
}

// ── Magnet ─────────────────────────────────────────────────────────────────────
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const within =
        e.clientX > rect.left - padding &&
        e.clientX < rect.right + padding &&
        e.clientY > rect.top - padding &&
        e.clientY < rect.bottom + padding;
      if (within) {
        setActive(true);
        setTransform(
          `translate3d(${(e.clientX - cx) / strength}px, ${(e.clientY - cy) / strength}px, 0)`
        );
      } else {
        setActive(false);
        setTransform("translate3d(0,0,0)");
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition: active ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// ── AnimatedText ───────────────────────────────────────────────────────────────
function AnimatedChar({
  char,
  scrollYProgress,
  index,
  total,
}: {
  char: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const p = index / total;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, p - 0.1), Math.min(1, p + 0.05)],
    [0.2, 1]
  );
  return (
    <span style={{ position: "relative", display: "inline" }}>
      <span style={{ opacity: 0, whiteSpace: "pre" }}>{char}</span>
      <motion.span style={{ opacity, position: "absolute", left: 0, top: 0, whiteSpace: "pre" }}>
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = text.split("");
  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <AnimatedChar key={i} char={char} scrollYProgress={scrollYProgress} index={i} total={chars.length} />
      ))}
    </p>
  );
}
