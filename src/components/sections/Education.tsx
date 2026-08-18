import { GraduationCap, Award, BadgeCheck } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { education } from "../../data/education";
import { certifications } from "../../data/certifications";

export default function Education() {
  return (
    <section id="education" className="section section--alt education">
      <div className="orb orb--cyan orb--lg" style={{ top: "-6%", left: "-12%" }} aria-hidden="true" />
      <div className="orb orb--violet orb--md" style={{ bottom: "-4%", right: "-6%" }} aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          index="05"
          label="Education & Certifications"
          title={
            <>
              A foundation in <span className="gradient-text">electrical engineering</span>.
            </>
          }
        />

        <div className="edu__grid">
          <div className="edu__list">
            {education.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08}>
                <div className="edu__row">
                  <div className="edu__year mono">{item.year}</div>
                  <div className="edu__mid" aria-hidden="true">
                    <span className="edu__node">
                      <GraduationCap size={16} strokeWidth={1.6} />
                    </span>
                  </div>
                  <div className="edu__info">
                    <h3 className="edu__degree">{item.degree}</h3>
                    <p className="edu__school">{item.school}</p>
                    <p className="edu__board mono">{item.board} Board</p>
                  </div>
                  <div className="edu__score" title={`${item.score} out of ${item.scoreScale}`}>
                    <span className="edu__score-num">{item.score}</span>
                    <span className="edu__score-scale mono">/ {item.scoreScale}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="cert">
            <Reveal>
              <div className="cert__head">
                <span className="cert__head-icon" aria-hidden="true">
                  <Award size={20} strokeWidth={1.6} />
                </span>
                <h3 className="cert__head-title">Certifications</h3>
              </div>
            </Reveal>
            {certifications.map((cert, i) => (
              <Reveal key={cert.title} delay={0.06 * i}>
                <div className="cert__card">
                  <span className="cert__card-icon" aria-hidden="true">
                    <BadgeCheck size={18} strokeWidth={1.6} />
                  </span>
                  <div className="cert__card-body">
                    <h4 className="cert__card-title">{cert.title}</h4>
                    <p className="cert__card-issuer">{cert.issuer}</p>
                    <p className="cert__card-detail mono">{cert.detail}</p>
                  </div>
                  <span className="cert__card-year mono">{cert.year}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
