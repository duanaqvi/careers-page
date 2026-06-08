/* Hero — three directions: centered · split · immersive */
const { Icon: HIcon, Eyebrow: HEyebrow, Button: HButton } = window;

const HeroChip = () => (
  <div className="hero-chip"><span className="pulse" /> We're hiring · {window.ROLES.length} open roles</div>
);

const HeroCTAs = () => (
  <div className="hero-cta-row">
    <HButton variant="brand" size="lg" icon="arrow-right" onClick={() => window.scrollToId('roles')}>View open roles</HButton>
    <HButton variant="outline" size="lg" onClick={() => window.scrollToId('life')}>Life at ImagineArt</HButton>
  </div>
);

const HeadlineCentered = () => (
  <h1 className="hero-h1">Build the tools the<br />world creates <span className="gtext">with</span>.</h1>
);

function HeroCentered() {
  return (
    <div className="hero hero-centered">
      <HeroChip />
      <HeadlineCentered />
      <p className="hero-sub">We're a small team building AI that's already in the hands of 100M+ creators — images, video, music and editing, all on one canvas. Come build the next billion creators' favorite tool.</p>
      <HeroCTAs />
      <div className="hero-media">
        <image-slot id="hero-centered" radius="24" placeholder="Drop a team / product hero image"
          style={{ width: "100%", height: "100%" }}></image-slot>
      </div>
    </div>
  );
}

function HeroSplit() {
  return (
    <div className="hero hero-split">
      <div className="hero-split-text">
        <HeroChip />
        <h1 className="hero-h1">Make what's next in <span className="gtext">creative AI</span>.</h1>
        <p className="hero-sub">Join the team turning frontier models into tools 100M+ people use to bring ideas to life. Tiny teams, enormous scope, work that ships to the world in weeks.</p>
        <HeroCTAs />
      </div>
      <div className="hero-media">
        <image-slot id="hero-split" radius="24" placeholder="Drop a hero image"
          style={{ width: "100%", height: "100%" }}></image-slot>
      </div>
    </div>
  );
}

function HeroImmersive() {
  const caps = ["Images", "Video", "Music", "Editing", "Lipsync", "Upscale"];
  return (
    <div className="hero hero-immersive">
      <div className="wrap">
        <div className="media-frame">
          <image-slot id="hero-immersive" radius="0" placeholder="Drop a full-bleed cinematic image"
            style={{ width: "100%", height: "100%" }}></image-slot>
          <div className="scrim" />
          <div className="imm-top">
            {caps.map((c) => <span key={c} className="cap-chip"><HIcon name="sparkles" size={13} /> {c}</span>)}
          </div>
          <div className="imm-content">
            <div className="hero-chip"><span className="pulse" /> We're hiring · {window.ROLES.length} open roles</div>
            <h1 className="hero-h1">Build the creative<br />engine for everyone.</h1>
            <p className="hero-sub">One canvas. Every model. 100M+ creators. Come help us build it.</p>
            <HeroCTAs />
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ variant }) {
  if (variant === "split") return <div className="wrap"><HeroSplit /></div>;
  if (variant === "immersive") return <HeroImmersive />;
  return <div className="wrap"><HeroCentered /></div>;
}

window.Hero = Hero;
