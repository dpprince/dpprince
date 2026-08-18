import { Code2, Cpu, Zap, BarChart3, Monitor } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { skillGroups } from "../../data/skills";

const icons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  code: Code2,
  cpu: Cpu,
  zap: Zap,
  "bar-chart": BarChart3,
  monitor: Monitor,
};

export default function Skills() {
  return (
    <section id="skills" className="section section--alt skills">
      <div className="orb orb--violet orb--lg" style={{ top: "-6%", left: "-12%" }} aria-hidden="true" />
      <div className="orb orb--cyan orb--md" style={{ bottom: "-6%", right: "-8%" }} aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          index="04"
          label="Technical Skills"
          title={
            <>
              A technical <span className="gradient-text">toolbox</span>, not a
              scorecard.
            </>
          }
          sub="Grouped by discipline — from firmware and simulation to ad operations and IT support. No fake percentages, just the tools I actually work with."
        />

        <div className="skills__grid">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon] ?? Code2;
            return (
              <Reveal key={group.id} delay={(i % 3) * 0.08}>
                <article className="skill-card">
                  <div className="skill-card__head">
                    <span className="skill-card__icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="skill-card__id mono">/{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="skill-card__title">{group.title}</h3>
                  <p className="skill-card__blurb">{group.blurb}</p>
                  <ul className="skill-card__list">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="skill-card__item">
                        <span className="skill-card__dot" aria-hidden="true" />
                        <div className="skill-card__item-txt">
                          <span className="skill-card__name">{skill.name}</span>
                          {skill.note && (
                            <span className="skill-card__note">{skill.note}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="skill-card__trace" aria-hidden="true" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
