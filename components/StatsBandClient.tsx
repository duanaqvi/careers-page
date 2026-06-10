"use client";

import { useRef, useEffect, useState } from "react";

function parseStat(raw: string): { prefix: string; value: number; suffix: string } {
  const m = raw.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/);
  if (!m) return { prefix: "", value: 0, suffix: raw };
  return { prefix: m[1], value: parseFloat(m[2]), suffix: m[3] };
}

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf: number;
    let start: number | null = null;
    const isDecimal = target % 1 !== 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const raw = (1 - Math.pow(1 - p, 3)) * target;
      setCount(p >= 1 ? target : isDecimal ? Math.round(raw * 10) / 10 : Math.round(raw));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return count;
}

function AnimatedStat({ n, label }: { n: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { prefix, value, suffix } = parseStat(n);
  const count = useCountUp(value, 1500, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sb-stat" ref={ref}>
      <div className="sb-n gtext">
        {prefix}{value >= 1000 ? count.toLocaleString() : value % 1 !== 0 ? count.toFixed(1) : count}{suffix}
      </div>
      <div className="sb-l">{label}</div>
    </div>
  );
}

export default function StatsBandClient({ stats }: { stats: { n: string; label: string }[] }) {
  return (
    <div className="stats-band-grid">
      {stats.map((s) => (
        <AnimatedStat key={s.label} n={s.n} label={s.label} />
      ))}
    </div>
  );
}
