import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: ReactNode;
  sub?: string;
  aside?: ReactNode;
}

export default function SectionHeading({
  index,
  label,
  title,
  sub,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="sec-head">
      <div className="sec-head__row">
        <Reveal>
          <p className="sec-head__label">
            <span className="num">{index}</span>
            {label}
          </p>
          <h2 className="sec-head__title">{title}</h2>
        </Reveal>
        {aside && (
          <Reveal delay={0.12}>
            <div className="sec-head__aside">{aside}</div>
          </Reveal>
        )}
      </div>
      {sub && (
        <Reveal delay={0.1}>
          <p className="sec-head__sub">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
