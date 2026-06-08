"use client";

import { Button, ImageSlot } from "@/components/ui";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
}

function HeroChip({ count }: { count: number }) {
  return (
    <div className="hero-chip">
      <span className="pulse" />
      We&apos;re hiring · {count} open roles
    </div>
  );
}

function HeroCTAs() {
  return (
    <div className="hero-cta-row">
      <Button variant="brand" size="lg" icon="arrow-right" onClick={() => scrollToId("roles")}>
        View open roles
      </Button>
      <Button variant="outline" size="lg" onClick={() => scrollToId("life")}>
        Life at ImagineArt
      </Button>
    </div>
  );
}

export default function Hero({ roleCount }: { roleCount: number }) {
  return (
    <div className="wrap">
      <div className="hero hero-centered">
        <HeroChip count={roleCount} />
        <h1 className="hero-h1">
          Build the tools the<br />world creates <span className="gtext">with</span>.
        </h1>
        <p className="hero-sub">
          We&apos;re a small team building AI that&apos;s already in the hands of 100M+ creators — images,
          video, music and editing, all on one canvas. Come build the next billion creators&apos; favorite tool.
        </p>
        <HeroCTAs />
        <div className="hero-media">
          <ImageSlot radius="24px" />
        </div>
      </div>
    </div>
  );
}
