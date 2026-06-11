"use client";

import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/ui";

const FORM_URL = "https://app.ashbyhq.com/forms/sourcing/59da6f59-93de-4282-a50a-a4ea421e0d82";

export default function AlertSignup() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Resize iframe to fit Ashby form content via postMessage
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://app.ashbyhq.com") return;
      const h = e.data?.height ?? e.data?.frameHeight;
      if (typeof h === "number" && iframeRef.current) {
        iframeRef.current.style.height = `${h + 32}px`;
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <section className="section-tight" id="alert">
      <div className="wrap">
        <div className="alert-band reveal">
          <div className="glow" />
          <Eyebrow style={{ color: "rgb(var(--primary-70))", marginBottom: 20 }}>
            Stay in the loop
          </Eyebrow>
          <h2 className="alert-h">Don&apos;t see your fit?</h2>
          <p className="alert-sub">
            Drop your details and we&apos;ll ping you when a matching role opens.
          </p>
          <div className="alert-iframe-wrap">
            <iframe
              ref={iframeRef}
              src={FORM_URL}
              title="Role alert signup"
              className="alert-iframe"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
