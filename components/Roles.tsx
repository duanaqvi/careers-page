"use client";

import { useState, useMemo, useEffect } from "react";
import { Icon, Button, Eyebrow } from "@/components/ui";
import type { Role } from "@/lib/ashby";

const ASHBY_URL = "https://jobs.ashbyhq.com/imagineart";

// Maps every Ashby locationName → { country, city }
// SF neighbourhoods are normalised to city "San Francisco"
const LOC: Record<string, { country: string; city: string }> = {
  "Islamabad":           { country: "Pakistan",      city: "Islamabad" },
  "Karachi":             { country: "Pakistan",      city: "Karachi" },
  "Lahore":              { country: "Pakistan",      city: "Lahore" },
  "San Francisco":       { country: "United States", city: "San Francisco" },
  "San Jose":            { country: "United States", city: "San Jose" },
  "Oakland":             { country: "United States", city: "Oakland" },
  "Hayes Valley":        { country: "United States", city: "San Francisco" },
  "Mission District":    { country: "United States", city: "San Francisco" },
  "Noe Valley":          { country: "United States", city: "San Francisco" },
  "San Franciso Office": { country: "United States", city: "San Francisco" },
  "Germany":             { country: "Germany",       city: "" },
  "India":               { country: "India",         city: "" },
  "China":               { country: "China",         city: "" },
  "Indonesia":           { country: "Indonesia",     city: "" },
  "Malaysia":            { country: "Malaysia",      city: "" },
  "Nigeria":             { country: "Nigeria",       city: "" },
  "Singapore":           { country: "Singapore",     city: "" },
  "Ukraine":             { country: "Ukraine",       city: "" },
};

function locOf(raw: string) {
  return LOC[raw] ?? { country: raw, city: "" };
}

const ALL_COUNTRIES = "All countries";
const ALL_CITIES    = "All cities";

export default function Roles({ roles }: { roles: Role[] }) {
  const [dept,    setDept]    = useState<string | null>(null);
  const [country, setCountry] = useState(ALL_COUNTRIES);
  const [city,    setCity]    = useState(ALL_CITIES);
  const [q,       setQ]       = useState("");
  const [limit,   setLimit]   = useState(12);
  const [geoHint, setGeoHint] = useState("");   // e.g. "📍 Detected: Pakistan"

  // ── Location auto-detect ──────────────────────────────────────────────────
  // Tries browser geolocation first (accurate), falls back to IP if denied.
  useEffect(() => {
    function applyLocation(detectedCountry: string, detectedCity: string) {
      const hasCountry = roles.some((r) => locOf(r.loc).country === detectedCountry);
      if (!hasCountry) return;

      setCountry(detectedCountry);
      setGeoHint(`📍 Detected: ${detectedCountry}`);

      const hasCity = roles.some((r) => {
        const l = locOf(r.loc);
        return l.country === detectedCountry && l.city === detectedCity;
      });
      if (hasCity) {
        setCity(detectedCity);
        setGeoHint(`📍 Detected: ${detectedCountry}, ${detectedCity}`);
      }
    }

    function fallbackToIP() {
      fetch("https://ipapi.co/json/")
        .then((r) => r.json())
        .then((d) => applyLocation(d.country_name ?? "", d.city ?? ""))
        .catch(() => {});
    }

    if (!navigator.geolocation) { fallbackToIP(); return; }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        )
          .then((r) => r.json())
          .then((d) => {
            const detectedCountry = d.countryName ?? "";
            const detectedCity    = d.city || d.locality || d.principalSubdivision || "";
            applyLocation(detectedCountry, detectedCity);
          })
          .catch(fallbackToIP);
      },
      () => fallbackToIP(),   // permission denied → fall back to IP
      { timeout: 6000 }
    );
  }, [roles]);

  // ── Derived filter options ─────────────────────────────────────────────────
  const departments = useMemo(() => {
    const seen = new Set<string>();
    roles.forEach((r) => seen.add(r.dept));
    return ["All", ...Array.from(seen).sort()];
  }, [roles]);

  const countries = useMemo(() => {
    const seen = new Set<string>();
    roles.forEach((r) => seen.add(locOf(r.loc).country));
    return [ALL_COUNTRIES, ...Array.from(seen).sort()];
  }, [roles]);

  const cities = useMemo(() => {
    if (country === ALL_COUNTRIES) return [ALL_CITIES];
    const seen = new Set<string>();
    roles.forEach((r) => {
      const l = locOf(r.loc);
      if (l.country === country && l.city) seen.add(l.city);
    });
    return seen.size > 0 ? [ALL_CITIES, ...Array.from(seen).sort()] : [ALL_CITIES];
  }, [roles, country]);

  const showCityFilter = country !== ALL_COUNTRIES && cities.length > 1;

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return roles.filter((r) => {
      if (dept !== "All" && r.dept !== dept) return false;
      const l = locOf(r.loc);
      if (country !== ALL_COUNTRIES && l.country !== country) return false;
      if (city !== ALL_CITIES && l.city !== city) return false;
      if (q.trim()) {
        const s = (r.title + " " + r.dept + " " + r.loc).toLowerCase();
        if (!s.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [roles, dept, country, city, q]);

  const shown = filtered.slice(0, limit);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleDept = (d: string) => { setDept(d); setLimit(12); };
  const handleCountry = (c: string) => { setCountry(c); setCity(ALL_CITIES); setLimit(12); };
  const handleCity = (c: string) => { setCity(c); setLimit(12); };
  const handleQ = (v: string) => { setQ(v); setLimit(12); };

  return (
    <section className="section" id="roles">
      <div className="wrap">

        {/* Department pills */}
        <div className="hiring-teams">
          <div className="ht-head">
            <Eyebrow>Open roles</Eyebrow>
            <h2 className="ht-title">Teams we are<br />currently hiring for</h2>
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
            {/* Controls */}
            <div className="roles-controls">
              {/* Search */}
              <div className="search-wrap">
                <span className="ic"><Icon name="search" size={16} /></span>
                <input
                  placeholder="Search roles…"
                  value={q}
                  onChange={(e) => handleQ(e.target.value)}
                />
              </div>

              {/* Country */}
              <div className="loc-select">
                <select value={country} onChange={(e) => handleCountry(e.target.value)}>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <span className="ic"><Icon name="chevron" size={16} /></span>
              </div>

              {/* City — only shown when a country with multiple cities is selected */}
              {showCityFilter && (
                <div className="loc-select">
                  <select value={city} onChange={(e) => handleCity(e.target.value)}>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <span className="ic"><Icon name="chevron" size={16} /></span>
                </div>
              )}

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

            {/* Geo hint */}
            {geoHint && (
              <div className="geo-hint">
                {geoHint}
                <button onClick={() => { setCountry(ALL_COUNTRIES); setCity(ALL_CITIES); setGeoHint(""); }}>
                  Clear
                </button>
              </div>
            )}

            <div className="roles-count">
              Showing {filtered.length} of {roles.length} open{" "}
              {filtered.length === 1 ? "role" : "roles"}
            </div>

            {filtered.length === 0 ? (
              <div className="roles-empty">
                No roles in this location yet —{" "}
                <a href={ASHBY_URL} target="_blank" rel="noreferrer" style={{ color: "rgb(var(--content-brand))" }}>
                  browse everything on Ashby
                </a>
                .
              </div>
            ) : (
              <>
                <div className="role-list">
                  {shown.map((r) => (
                    <a className="role-row" key={r.id} href={r.url} target="_blank" rel="noreferrer">
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
                    <Button variant="outline" size="md" icon="chevron" onClick={() => setLimit((n) => n + 12)}>
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
