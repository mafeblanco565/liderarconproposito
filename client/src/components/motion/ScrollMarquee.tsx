/**
 * Cinta que se desplaza según el scroll de la página en lugar de girar sola.
 * El movimiento lo controla quien navega, no un bucle continuo.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollMarqueeProps = {
  children: ReactNode;
  /** -1 desplaza hacia la izquierda; 1 hacia la derecha. */
  direction?: 1 | -1;
  /** Píxeles recorridos por cada píxel de scroll. */
  speed?: number;
  className?: string;
};

export default function ScrollMarquee({
  children,
  direction = -1,
  speed = 0.3,
  className,
}: ScrollMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const node = ref.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * speed);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          display: "flex",
          flex: "0 0 auto",
          alignItems: "center",
          whiteSpace: "nowrap",
          transform: `translateX(${direction * (offset - 200)}px)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
