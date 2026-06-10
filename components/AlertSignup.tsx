"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui";

export default function AlertSignup({ departments }: { departments: string[] }) {
  const [email, setEmail]   = useState("");
  const [dept, setDept]     = useState("Any department");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), department: dept }),
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
            Drop your email and we&apos;ll ping you when a matching role opens.
          </p>

          {status === "success" ? (
            <div className="alert-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>You&apos;re on the list — we&apos;ll reach out when something matches.</span>
            </div>
          ) : (
            <form className="alert-form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="alert-input"
              />
              <div className="alert-select-wrap">
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="alert-select"
                >
                  <option value="Any department">Any department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <svg className="alert-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
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
