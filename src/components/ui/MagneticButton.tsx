import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
  external?: boolean;
}

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  external,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0)";
  };

  const props = {
    className,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ...rest,
  };

  return (
    <motion.div
      className="mag"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          {...props}
          ref={ref as React.Ref<HTMLButtonElement>}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
