import { lazy, Suspense } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import SceneCanvas from "../three/SceneCanvas";
import FallbackVisual from "../three/FallbackVisual";
import { profile } from "../../data/profile";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { useInViewport } from "../../hooks/useInViewport";

const HeroCore = lazy(() => import("../three/HeroCore"));

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile(768);
  const { ref, inView } = useInViewport<HTMLElement>();

  return (
    <section id="home" className="hero" ref={ref} aria-label="Introduction">
      <div className="grid-bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      {inView && (
        <div className="hero__stage" aria-hidden="true">
          <SceneCanvas
            className="hero__canvas"
            fallback={<FallbackVisual variant="core" />}
            camera={{ position: [0, 0.2, 7], fov: 42 }}
          >
            <Suspense fallback={<FallbackVisual variant="core" />}>
              <HeroCore />
            </Suspense>
          </SceneCanvas>
        </div>
      )}

      <div className="container hero__content">
        <div className="hero__layout">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="hero__text"
          >
            <motion.p variants={item} className="hero__eyebrow mono">
              <span className="hero__eyebrow-line" aria-hidden="true" />
              {profile.role}
            </motion.p>

            <motion.h1 variants={item} className="hero__name">
              <span>{profile.firstName}</span>
              <span className="gradient-text">{profile.lastName}</span>
            </motion.h1>

            <motion.p variants={item} className="hero__tagline">
              {profile.tagline}
            </motion.p>

            <motion.p variants={item} className="hero__summary">
              {profile.summary}
            </motion.p>

            <motion.div variants={item} className="hero__actions">
              <a href="#projects" className="btn btn--primary">
                View My Work
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn--ghost">
                <Mail size={16} aria-hidden="true" />
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__photo-wrap"
            initial={reduce ? false : { opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          >
            <div className="hero__photo-glow" aria-hidden="true" />
            <div className="hero__photo-ring" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="hero__photo-ring-svg">
                <circle cx="100" cy="100" r="96" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.5" />
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--violet)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="hero__photo-frame">
              <img src="/dpprince/profile.jpg" alt="Dipayan Pramanik" className="hero__photo-img" loading="eager" />
              <div className="hero__photo-overlay" aria-hidden="true" />
            </div>
            <div className="hero__photo-badge mono">
              <span className="hero__photo-badge-dot" aria-hidden="true" />
              Available for opportunities
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hero__hud" aria-hidden="true">
        <div className="hero__hud-item mono">
          <span className="hero__hud-label">Based in</span>
          <span className="hero__hud-value">{profile.location}</span>
        </div>
        <div className="hero__hud-item mono">
          <span className="hero__hud-label">Degree</span>
          <span className="hero__hud-value">B.Sc. EEE · Eastern University</span>
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll to About section">
        <span>Scroll</span>
        <span className="scroll-hint__line" aria-hidden="true" />
      </a>

      {!isMobile && (
        <div className="hero__corner hero__corner--tl" aria-hidden="true" />
      )}
    </section>
  );
}
