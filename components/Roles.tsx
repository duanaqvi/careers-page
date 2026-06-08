"use client";

import { useState, useMemo } from "react";
import { Icon, Button, Eyebrow } from "@/components/ui";
import type { Role } from "@/lib/ashby";

const ASHBY_URL = "https://jobs.ashbyhq.com/imagineart";

export default function Roles({ roles }: { roles: Role[] }) {
  const [dept, setDept] = useState<string | null>(null);
  const [loc, setLoc] = useState("All locations");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(12);

  const departments = useMemo(() => {
    const seen = new Set<string>();
    roles.forEach((r) => seen.add(r.dept));
    return ["All", ...Array.from(seen).sort()];
  }, [roles]);

  const locations = useMemo(() => {
    const seen = new Set<string>();
    roles.forEach((r) => seen.add(r.loc));
    return ["All locations", ...Array.from(seen).sort()];
  }, [roles]);

  const filtered = useMemo(
    () =>
      roles.filter((r) => {
        if (dept !== "All" && r.dept !== dept) return false;
        if (loc !== "All locations" && r.loc !== loc) return false;
        if (q.trim()) {
          const s = (r.title + " " + r.dept + " " + r.loc).toLowerCase();
          if (!s.includes(q.trim().toLowerCase())) return false;
        }
        return true;
      }),
    [roles, dept, loc, q]
  );

  const shown = filtered.slice(0, limit);

  const handleDept = (d: string) => {
    setDept(d);
    setLimit(12);
  };
  const handleLoc = (l: string) => {
    setLoc(l);
    setLimit(12);
  };
  const handleQ = (v: string) => {
    setQ(v);
    setLimit(12);
  };

  return (
    <section className="section" id="roles">
      <div className="wrap">
        <div className="hiring-teams">
          <div className="ht-head">
            <Eyebrow>Open roles</Eyebrow>
            <h2 className="ht-title">
              Teams we are<br />currently hiring for
            </h2>
          </div>
          <div className="ht-pills">
            {departments.map((d) => (
              <button
                key={d}
                className={`team-pill${dept === d ? " active" : ""}`}
                onClick={() => handleDept(d)}
              >
                <span>{d === "All" ? "All teams" : d}</span>
                <Icon name="arrow-right" size={26} stroke={1.8} />
              </button>
            ))}
          </div>
        </div>

        {dept === null ? (
          <div className="roles-prompt">
            <Icon name="arrow-up-right" size={22} />
            <p>Pick a team above to see its open roles.</p>
          </div>
        ) : (
          <>
            <div className="roles-controls">
              <div className="search-wrap">
                <span className="ic"><Icon name="search" size={16} /></span>
                <input
                  placeholder="Search roles…"
                  value={q}
                  onChange={(e) => handleQ(e.target.value)}
                />
              </div>
              <div className="loc-select">
                <select value={loc} onChange={(e) => handleLoc(e.target.value)}>
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <span className="ic"><Icon name="chevron" size={16} /></span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon="arrow-up-right"
                href={ASHBY_URL}
                style={{ marginLeft: "auto" }}
              >
                See all on Ashby
              </Button>
            </div>

            <div className="roles-count">
              Showing {filtered.length} of {roles.length} open{" "}
              {filtered.length === 1 ? "role" : "roles"}
            </div>

            {filtered.length === 0 ? (
              <div className="roles-empty">
                No roles match those filters yet — try widening your search or{" "}
                <a
                  href={ASHBY_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "rgb(var(--content-brand))" }}
                >
                  browse everything on Ashby
                </a>
                .
              </div>
            ) : (
              <>
                <div className="role-list">
                  {shown.map((r) => (
                    <a
                      className="role-row"
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="role-main">
                        <h3 className="role-title">{r.title}</h3>
                      </div>
                      <div className="role-meta">
                        {r.remote && <span className="role-tag remote">Remote</span>}
                        <span className="role-tag">{r.dept}</span>
                        <span className="role-loc">
                          <Icon name="pin" size={14} /> {r.loc}
                        </span>
                      </div>
                      <div className="role-arrow">
                        <Icon name="arrow-right" size={18} />
                      </div>
                    </a>
                  ))}
                </div>
                {filtered.length > limit && (
                  <div className="roles-more">
                    <Button
                      variant="outline"
                      size="md"
                      icon="chevron"
                      onClick={() => setLimit((n) => n + 12)}
                    >
                      Load more roles ({filtered.length - limit} left)
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
