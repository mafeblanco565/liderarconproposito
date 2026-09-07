/**
 * Aparición al entrar en pantalla: opacidad y un desplazamiento corto.
 * Se dispara una sola vez y deja el contenido en su estado final.
 */
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";

/** Margen extra, en píxeles, para empezar la entrada justo antes de asomar. */
const MARGEN = 50;

type FadeInProps = {
  children: ReactNode;
  /** Etiqueta a renderizar; conserva la semántica del bloque que envuelve. */
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
};

export default function FadeIn({
  children,
  as = "div",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: FadeInProps) {
  // motion.create() se memoriza: crearlo en cada render remontaría el subárbol.
  const Motion = useMemo(() => motion.create(as as ElementType), [as]);
  const ref = useRef<HTMLElement>(null);
  const enVista = useInView(ref, { once: true, margin: `${MARGEN}px`, amount: 0 });
  const [respaldo, setRespaldo] = useState(false);

  /**
   * Red de seguridad: si IntersectionObserver no está disponible o no emite
   * (ocurre en algunos navegadores embebidos), el contenido nunca se mostraría
   * porque arranca en opacidad 0. Aquí se comprueba la posición a mano.
   */
  useEffect(() => {
    if (enVista || respaldo) return;

    const comprobar = () => {
      const nodo = ref.current;
      if (!nodo) return;
      const caja = nodo.getBoundingClientRect();
      if (caja.top < window.innerHeight + MARGEN && caja.bottom > -MARGEN) {
        setRespaldo(true);
      }
    };

    comprobar();
    window.addEventListener("scroll", comprobar, { passive: true });
    window.addEventListener("resize", comprobar, { passive: true });
    return () => {
      window.removeEventListener("scroll", comprobar);
      window.removeEventListener("resize", comprobar);
    };
  }, [enVista, respaldo]);

  const visible = enVista || respaldo;

  return (
    <Motion
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Motion>
  );
}
