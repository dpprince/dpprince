import { lazy, Suspense } from "react";
import { Home, Flame, Waves, Plane, Car, ArrowUpRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import SceneCanvas from "../three/SceneCanvas";
import FallbackVisual from "../three/FallbackVisual";
import { projects, embeddedSubProjects } from "../../data/projects";
import { useInViewport } from "../../hooks/useInViewport";
import { useIsDesktop } from "../../hooks/useMediaQuery";

const EkgScene = lazy(() => import("../three/EkgScene"));
const RocketScene = lazy(() => import("../three/RocketScene"));

const subIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  home: Home,
  flame: Flame,
  wave: Waves,
  plane: Plane,
  car: Car,
};

function ProjectVisual({
  visual,
  inView,
}: {
  visual: "ecg" | "rocket" | "embedded";
  inView: boolean;
}) {
  const isDesktop = useIsDesktop(1024);
  const fbVariant = visual === "embedded" ? "chip" : visual;
  if (!inView) return <FallbackVisual variant={fbVariant} />;
  if (!isDesktop) return <FallbackVisual variant={fbVariant} />;

  if (visual === "ecg") {
    return (
      <SceneCanvas
        className="project-canvas"
        fallback={<FallbackVisual variant="ecg" />}
        camera={{ position: [0, 0, 6.4], fov: 40 }}
      >
        <Suspense fallback={<FallbackVisual variant="ecg" />}>
          <EkgScene />
        </Suspense>
      </SceneCanvas>
    );
  }
  return (
    <SceneCanvas
      className="project-canvas"
      fallback={<FallbackVisual variant="rocket" />}
      camera={{ position: [0, 0.6, 6.6], fov: 42 }}
    >
      <Suspense fallback={<FallbackVisual variant="rocket" />}>
        <RocketScene />
      </Suspense>
    </SceneCanvas>
  );
}

export default function Projects() {
  const { ref, inView } = useInViewport<HTMLDivElement>("20% 0px");
  const ecg = projects.find((p) => p.id === "ecg")!;
  const rocket = projects.find((p) => p.id === "rocketry")!;
  const embedded = projects.find((p) => p.id === "embedded")!;

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="orb orb--blue orb--lg" style={{ top: "-4%", right: "-10%" }} aria-hidden="true" />
      <div className="orb orb--violet orb--md" style={{ top: "48%", left: "-8%" }} aria-hidden="true" />
      <div className="container">
        <SectionHeading
          index="02"
          label="Featured Projects"
          title={
            <>
              Work that turns <span className="gradient-text">ideas into systems</span>.
            </>
          }
          sub="A thesis prototype, independent engineering research, and the embedded systems I built along the way."
        />

        {/* ECG */}
        <Reveal>
          <article className="project-card">
            <div className="project-card__visual">
              <div className="project-card__visual-frame" aria-hidden="true">
                <ProjectVisual visual="ecg" inView={inView} />
                <span className="project-card__tag mono">THESIS PROTOTYPE</span>
              </div>
            </div>
            <div className="project-card__body">
              <span className="project-card__index mono">{ecg.index}</span>
              <h3 className="project-card__title">{ecg.title}</h3>
              <p className="project-card__type mono">{ecg.type}</p>
              <p className="project-card__desc">{ecg.description}</p>
              <ul className="project-card__list">
                {ecg.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="project-card__tags">
                {ecg.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        {/* Rocketry */}
        <Reveal>
          <article className="project-card project-card--reverse">
            <div className="project-card__visual">
              <div className="project-card__visual-frame" aria-hidden="true">
                <ProjectVisual visual="rocket" inView={inView} />
                <span className="project-card__tag mono">INDEPENDENT RESEARCH</span>
              </div>
            </div>
            <div className="project-card__body">
              <span className="project-card__index mono">{rocket.index}</span>
              <h3 className="project-card__title">{rocket.title}</h3>
              <p className="project-card__type mono">{rocket.type}</p>
              <p className="project-card__desc">{rocket.description}</p>
              <ul className="project-card__list">
                {rocket.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="project-card__tags">
                {rocket.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        {/* Embedded ecosystem */}
        <Reveal>
          <article className="project-card project-card--flat">
            <div className="project-card__body">
              <span className="project-card__index mono">{embedded.index}</span>
              <h3 className="project-card__title">{embedded.title}</h3>
              <p className="project-card__type mono">{embedded.type}</p>
              <p className="project-card__desc">{embedded.description}</p>
            </div>

            <div className="ecosystem" aria-label="Embedded projects">
              <div className="ecosystem__line" aria-hidden="true" />
              {embeddedSubProjects.map((sp, i) => {
                const Icon = subIcons[sp.icon] ?? Home;
                return (
                  <div className="ecosystem__node" key={sp.name}>
                    <div className="ecosystem__node-card">
                      <span className="ecosystem__icon" aria-hidden="true">
                        <Icon size={20} strokeWidth={1.6} />
                      </span>
                      <span className="ecosystem__name">{sp.name}</span>
                      <span className="ecosystem__note">{sp.note}</span>
                      <span className="ecosystem__num mono">0{i + 1}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <a href="#contact" className="project-card__cta mono">
              Build something similar with me
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
