"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui";

export default function AlertSignup({ departments: _ }: { departments: string[] }) {
  const [name,   setName]   = useState("");
  const [email,  setEmail]  = useState("");
  const [about,  setAbout]  = useState("");
  const [li,     setLi]     = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          about: about.trim() || null,
          linkedIn: li.trim() || null,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

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

          {status === "success" ? (
            <div className="alert-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>You&apos;re on the list — we&apos;ll reach out when something matches.</span>
            </div>
          ) : (
            <form className="alert-form" onSubmit={handleSubmit}>
              <div className="alert-row">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="alert-input"
                />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="alert-input"
                />
              </div>
              <textarea
                placeholder="What are you great at, and which role would you want — even if it's not listed?"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="alert-textarea"
                rows={3}
              />
              <input
                type="url"
                placeholder="LinkedIn URL (optional)"
                value={li}
                onChange={(e) => setLi(e.target.value)}
                className="alert-input"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="alert-submit"
              >
                {status === "loading" ? "Saving…" : "Notify me"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="alert-error">
              Something went wrong — try again or email{" "}
              <a href="mailto:talent@imagine.art">talent@imagine.art</a>.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
