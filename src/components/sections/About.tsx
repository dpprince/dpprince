import { lazy, Suspense } from "react";
import SceneCanvas from "../three/SceneCanvas";
import FallbackVisual from "../three/FallbackVisual";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { about } from "../../data/profile";
import { useInViewport } from "../../hooks/useInViewport";

const AboutScene = lazy(() => import("../three/AboutScene"));

export default function About() {
  const { ref, inView } = useInViewport<HTMLDivElement>("30% 0px");

  return (
    <section id="about" className="section about">
      <div className="orb orb--cyan orb--sm" style={{ top: "4%", left: "2%" }} aria-hidden="true" />
      <div className="orb orb--violet orb--md" style={{ bottom: "-6%", right: "-5%" }} aria-hidden="true" />
      <div className="container">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              Where <span className="gradient-text">circuits</span> meet code.
            </>
          }
          sub={about.intro}
        />

        <div className="about__grid">
          <div className="about__copy">
            <Reveal>
              <p className="about__lead">
                Electrical & Electronic Engineering graduate combining hardware
                thinking, software skill and hands-on operations experience.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="about__story">
                <p>
                  From designing Arduino-based systems to coordinating digital
                  advertising operations, I build across the full stack of a
                  technical workplace — hardware, firmware, tools and teams.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="about__tags">
                <li className="chip">Arduino</li>
                <li className="chip">C</li>
                <li className="chip">Python</li>
                <li className="chip">MATLAB</li>
                <li className="chip">Embedded Systems</li>
                <li className="chip">Automation</li>
                <li className="chip">Google Ad Manager</li>
              </ul>
            </Reveal>
          </div>

          <div className="about__visual" ref={ref}>
            <div className="about__frame" aria-hidden="true">
              {inView && (
                <SceneCanvas
                  className="about__canvas"
                  fallback={<FallbackVisual variant="chip" />}
                  camera={{ position: [0, 0.4, 6.2], fov: 40 }}
                >
                  <Suspense fallback={<FallbackVisual variant="chip" />}>
                    <AboutScene />
                  </Suspense>
                </SceneCanvas>
              )}
              <div className="about__frame-label mono">
                <span className="about__frame-dot" aria-hidden="true" />
                SYSTEMS / EMBEDDED
              </div>
            </div>
          </div>
        </div>

        <div className="about__pillars">
          {about.pillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08}>
              <div className="about__pillar">
                <span className="about__pillar-num mono">0{i + 1}</span>
                <h3 className="about__pillar-title">{p.key}</h3>
                <p className="about__pillar-text">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
