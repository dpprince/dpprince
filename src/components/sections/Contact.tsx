import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { LinkedInIcon } from "../ui/icons";
import Reveal from "../ui/Reveal";
import { profile } from "../../data/profile";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phoneRaw}`,
    icon: Phone,
    external: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="orb orb--cyan orb--md" style={{ top: "-10%", left: "-8%" }} aria-hidden="true" />
      <div className="orb orb--violet orb--md" style={{ bottom: "-12%", right: "-8%" }} aria-hidden="true" />
      <div className="contact__glow" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">
        <div className="contact__inner">
          <Reveal>
            <p className="sec-head__label">
              <span className="num">06</span>
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="contact__title">
              Let's Build Something{" "}
              <span className="gradient-text">Intelligent.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="contact__sub">
              Whether it's an embedded system, an automation workflow or a
              research idea worth pursuing — I'd be glad to talk.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="contact__channels">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="contact__channel"
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                <span className="contact__channel-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                    <span className="contact__channel-body">
                      <span className="contact__channel-label mono">{channel.label}</span>
                      <span className="contact__channel-value">{channel.value}</span>
                    </span>
                    <ArrowUpRight size={18} className="contact__channel-arrow" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={`mailto:${profile.email}?subject=Let's%20connect`}
              className="contact__cta btn btn--primary"
            >
              Let's Connect
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
