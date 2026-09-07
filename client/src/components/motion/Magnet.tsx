/**
 * Efecto magnético: el elemento se acerca al cursor cuando este entra en su
 * zona de influencia. Responde a un gesto directo de quien navega.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";

type MagnetProps = {
  children: ReactNode;
  /** Distancia en píxeles desde el borde a la que empieza a atraer. */
  padding?: number;
  /** Divisor del desplazamiento: a mayor valor, movimiento más contenido. */
  strength?: number;
  className?: string;
};

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dentro =
        Math.abs(dx) < rect.width / 2 + padding && Math.abs(dy) < rect.height / 2 + padding;

      if (dentro) {
        setActivo(true);
        setOffset({ x: dx / strength, y: dy / strength });
      } else if (activo) {
        setActivo(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [padding, strength, activo]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "inline-flex",
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: activo ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
