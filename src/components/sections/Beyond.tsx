import { CircuitBoard, Mic, Music, Gavel, BookOpen, Gamepad2, Heart } from "lucide-react";
import Reveal from "../ui/Reveal";
import { leadership, languages, extracurricular } from "../../data/people";

const leadIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  ieee: CircuitBoard,
  circuit: CircuitBoard,
  mic: Mic,
};

const actIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  mic: Mic,
  music: Music,
  gavel: Gavel,
  book: BookOpen,
  gamepad: Gamepad2,
};

const levelDots: Record<string, number> = {
  Native: 4,
  Fluent: 3,
  Moderate: 2,
  Basic: 1,
};

export default function Beyond() {
  return (
    <section className="section beyond" id="community">
      <div className="orb orb--violet orb--md" style={{ top: "-2%", right: "-8%" }} aria-hidden="true" />
      <div className="orb orb--cyan orb--sm" style={{ bottom: "6%", left: "2%" }} aria-hidden="true" />
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <p className="sec-head__label">
              <span className="num">+</span>
              Beyond the circuit
            </p>
            <h2 className="sec-head__title">
              Leadership, <span className="gradient-text">language &amp; life.</span>
            </h2>
            <p className="sec-head__sub">
              The engineering mindset shows up outside the lab too — in student
              leadership, campus community, languages and the hobbies that keep
              things fun.
            </p>
          </div>
        </Reveal>

        <div className="beyond__grid">
          <div className="beyond__col">
            <Reveal>
              <h3 className="beyond__block-title mono">Leadership &amp; Membership</h3>
            </Reveal>
            <div className="beyond__cards">
              {leadership.map((item, i) => {
                const Icon = leadIcons[item.icon] ?? CircuitBoard;
                return (
                  <Reveal key={item.org} delay={i * 0.08}>
                    <div className="lead-card">
                      <span className="lead-card__icon" aria-hidden="true">
                        <Icon size={19} strokeWidth={1.6} />
                      </span>
                      <div>
                        <h4 className="lead-card__role">{item.role}</h4>
                        <p className="lead-card__org">{item.org}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal>
              <h3 className="beyond__block-title mono">Extracurricular</h3>
            </Reveal>
            <div className="beyond__acts">
              {extracurricular.map((act, i) => {
                const Icon = actIcons[act.icon] ?? Gamepad2;
                return (
                  <Reveal key={act.name} delay={i * 0.05}>
                    <div className="act-chip">
                      <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
                      {act.name}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="beyond__col">
            <Reveal>
              <h3 className="beyond__block-title mono">Languages</h3>
            </Reveal>
            <div className="lang-grid">
              {languages.map((lang, i) => (
                <Reveal key={lang.name} delay={i * 0.07}>
                  <div className="lang-card">
                    <div className="lang-card__top">
                      <span className="lang-card__name">{lang.name}</span>
                      <span className={`lang-card__level lang-card__level--${lang.level.toLowerCase()}`}>
                        {lang.level}
                      </span>
                    </div>
                    <div className="lang-card__dots" aria-hidden="true">
                      {[1, 2, 3, 4].map((d) => (
                        <span
                          key={d}
                          className={`lang-card__dot ${d <= (levelDots[lang.level] ?? 1) ? "is-on" : ""}`}
                        />
                      ))}
                    </div>
                    <p className="lang-card__note">{lang.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="beyond__quote">
                <Heart size={16} strokeWidth={1.6} aria-hidden="true" />
                <p>
                  Engineering curiosity doesn't switch off when the work day
                  ends — it just finds new problems to play with.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
