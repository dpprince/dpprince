import { Briefcase } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { experience } from "../../data/experience";

const tools = ["Jira", "Google Ad Manager", "Adbook+", "LiveIntent", "Automation Tools"];

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="orb orb--cyan orb--md" style={{ top: "0%", right: "-8%" }} aria-hidden="true" />
      <div className="orb orb--violet orb--sm" style={{ bottom: "-2%", left: "4%" }} aria-hidden="true" />
      <div className="container">
        <SectionHeading
          index="03"
          label="Experience"
          title={
            <>
              Operations, led with <span className="gradient-text">engineering discipline</span>.
            </>
          }
          sub="Real-world experience running digital advertising operations — coordinating teams, platforms and delivery."
        />

        <div className="experience__layout">
          <div className="tl">
            {experience.map((job) => (
              <div className="tl__item is-active" key={job.org}>
                <span className="tl__dot" aria-hidden="true" />
                <div className="tl__meta">
                  <span>{job.period}</span>
                  <span className="tl__meta-sep" aria-hidden="true" />
                  <span>{job.location}</span>
                </div>
                <h3 className="tl__title">{job.role}</h3>
                <p className="tl__org">{job.org}</p>
                <p className="experience__summary">{job.summary}</p>
                <ul className="experience__points">
                  {job.points.map((point) => (
                    <li key={point}>
                      <span className="experience__point-icon" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="experience__aside">
            <Reveal delay={0.1}>
              <div className="experience__panel">
                <span className="experience__panel-icon" aria-hidden="true">
                  <Briefcase size={20} strokeWidth={1.6} />
                </span>
                <h3 className="experience__panel-title">Operating stack</h3>
                <p className="experience__panel-text">
                  Platforms and tools I used daily to keep client delivery on
                  target.
                </p>
                <ul className="experience__tools">
                  {tools.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="experience__panel-foot mono">
                  SERVICENGINE LIMITED · SEBPO · DHAKA
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
