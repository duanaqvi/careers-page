"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <a className="brand" href="https://www.imagine.art/" target="_blank" rel="noreferrer">
          <Image src="/imagine-logo.svg" alt="" width={30} height={30} />
          <b>ImagineArt</b>
        </a>
        <div className="nav-links">
          <a onClick={() => scrollToId("mission")}>Mission</a>
          <a onClick={() => scrollToId("life")}>Life</a>
          <a onClick={() => scrollToId("team")}>Team</a>
          <a onClick={() => scrollToId("process")}>Process</a>
        </div>
        <button className="nav-cta" onClick={() => scrollToId("roles")}>
          View open roles
        </button>
      </div>
    </nav>
  );
}
