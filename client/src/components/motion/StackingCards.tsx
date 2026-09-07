/**
 * Tarjetas que se apilan: cada una queda fija mientras la siguiente sube por
 * encima, y la de atrás se reduce ligeramente para dar profundidad.
 */
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Children, useRef, type ReactNode } from "react";

/** Cuánto se encoge cada tarjeta por cada nivel de profundidad. */
const MERMA = 0.03;
/** Desplazamiento vertical entre tarjetas apiladas, en píxeles. */
const ESCALON = 28;

function Slot({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const escalaFinal = 1 - (total - 1 - index) * MERMA;
  const scale = useTransform(progress, [index / total, 1], [1, escalaFinal]);

  return (
    <div className="stack-slot">
      <motion.div
        className="stack-card"
        style={{ scale, top: `calc(var(--stack-top) + ${index * ESCALON}px)` }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function StackingCards({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const tarjetas = Children.toArray(children);

  return (
    <div className="stack-container" ref={container}>
      {tarjetas.map((tarjeta, index) => (
        <Slot key={index} index={index} total={tarjetas.length} progress={scrollYProgress}>
          {tarjeta}
        </Slot>
      ))}
    </div>
  );
}
