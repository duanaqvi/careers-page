/* Roles — filterable by department + location, with search */
const { Icon: RIcon, Eyebrow: REyebrow, Button: RButton } = window;
const { useState: useStateR, useMemo: useMemoR } = React;

function Roles() {
  const [dept, setDept] = useStateR(null);
  const [loc, setLoc] = useStateR("All locations");
  const [q, setQ] = useStateR("");
  const [limit, setLimit] = useStateR(12);
  const selected = dept !== null;

  const filtered = useMemoR(() => window.ROLES.filter((r) => {
    if (dept !== "All" && r.dept !== dept) return false;
    if (loc !== "All locations" && r.loc !== loc) return false;
    if (q.trim()) {
      const s = (r.title + " " + r.dept + " " + r.loc + " " + r.desc).toLowerCase();
      if (!s.includes(q.trim().toLowerCase())) return false;
    }
    return true;
  }), [dept, loc, q]);

  React.useEffect(() => { setLimit(12); }, [dept, loc, q]);
  const shown = filtered.slice(0, limit);

  return (
    <section className="section" id="roles">
      <div className="wrap">
        <div className="hiring-teams">
          <div className="ht-head">
            <REyebrow>Open roles</REyebrow>
            <h2 className="ht-title">Teams we are<br />currently hiring for</h2>
          </div>
          <div className="ht-pills">
            {window.DEPARTMENTS.map((d) => (
              <button key={d} className={"team-pill" + (dept === d ? " active" : "")} onClick={() => setDept(d)}>
                <span>{d === "All" ? "All teams" : d}</span>
                <RIcon name="arrow-right" size={26} stroke={1.8} />
              </button>
            ))}
          </div>
        </div>

        {!selected ? (
          <div className="roles-prompt">
            <RIcon name="arrow-up-right" size={22} />
            <p>Pick a team above to see its open roles.</p>
          </div>
        ) : (
        <React.Fragment>
        <div className="roles-controls">
          <div className="search-wrap">
            <span className="ic"><RIcon name="search" size={16} /></span>
            <input placeholder="Search roles…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="loc-select">
            <select value={loc} onChange={(e) => setLoc(e.target.value)}>
              {window.LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <span className="ic"><RIcon name="chevron" size={16} /></span>
          </div>
          <RButton variant="ghost" size="sm" icon="arrow-up-right" href={window.ASHBY_URL} style={{ marginLeft: "auto" }}>See all on Ashby</RButton>
        </div>

        <div className="roles-count">Showing {filtered.length} of {window.ROLES.length} open {filtered.length === 1 ? "role" : "roles"}</div>

        {filtered.length === 0 ? (
          <div className="roles-empty">No roles match those filters yet — try widening your search or <a href={window.ASHBY_URL} target="_blank" rel="noreferrer" style={{ color: "rgb(var(--content-brand))" }}>browse everything on Ashby</a>.</div>
        ) : (
          <React.Fragment>
          <div className="role-list">
            {shown.map((r) => (
              <a className="role-row" key={r.url} href={r.url} target="_blank" rel="noreferrer">
                <div className="role-main">
                  <h3 className="role-title">{r.title}</h3>
                  {r.desc ? <p className="role-desc">{r.desc}</p> : null}
                </div>
                <div className="role-meta">
                  {r.remote ? <span className="role-tag remote">Remote</span> : null}
                  <span className="role-tag">{r.dept}</span>
                  <span className="role-loc"><RIcon name="pin" size={14} /> {r.loc}</span>
                </div>
                <div className="role-arrow"><RIcon name="arrow-right" size={18} /></div>
              </a>
            ))}
          </div>
          {filtered.length > limit ? (
            <div className="roles-more">
              <RButton variant="outline" size="md" icon="chevron" onClick={() => setLimit((n) => n + 12)}>
                Load more roles ({filtered.length - limit} left)
              </RButton>
            </div>
          ) : null}
          </React.Fragment>
        )}
        </React.Fragment>
        )}
      </div>
    </section>
  );
}

window.Roles = Roles;
