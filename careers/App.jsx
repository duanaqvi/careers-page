/* App — composition + Tweaks (theme, hero direction, accent gradient) */
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect } = window;
const { useEffect: useEffectA } = React;

const ACCENTS = {
  Pink:  "linear-gradient(133deg, #FFADE8 30%, #FF85DD 75%)",
  Brand: "linear-gradient(135deg, rgb(138 63 252), rgb(190 149 255))",
  Sky:   "linear-gradient(120deg, rgb(138 63 252) 20%, #38BDF8 95%)",
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "Dark",
  "hero": "Centered",
  "accent": "Pink"
}/*EDITMODE-END*/;

window.scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => {
    document.documentElement.className = t.theme === "Dark" ? "dark" : "light";
  }, [t.theme]);

  useEffectA(() => {
    document.documentElement.style.setProperty("--accent-grad", ACCENTS[t.accent] || ACCENTS.Pink);
  }, [t.accent]);

  const heroVariant = { Centered: "centered", Split: "split", Immersive: "immersive" }[t.hero] || "centered";

  return (
    <React.Fragment>
      <div className="ambient" />
      <window.Nav />
      <main className="page" id="top">
        <section className="section" style={{ paddingTop: 24, paddingBottom: 96 }}>
          <window.Hero variant={heroVariant} />
        </section>
        <window.StatsBand />
        <window.Mission />
        <window.Gallery />
        <window.Team />
        <window.Process />
        <window.Roles />
        <window.CTA />
        <window.Footer />
      </main>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={t.theme} options={["Dark", "Light"]} onChange={(v) => setTweak("theme", v)} />
        <TweakSection label="Hero direction" />
        <TweakRadio label="Layout" value={t.hero} options={["Centered", "Split", "Immersive"]} onChange={(v) => setTweak("hero", v)} />
        <TweakSection label="Accent" />
        <TweakRadio label="Gradient" value={t.accent} options={["Pink", "Brand", "Sky"]} onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
