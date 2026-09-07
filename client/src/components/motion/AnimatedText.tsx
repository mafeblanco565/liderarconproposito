/**
 * Revelado letra a letra guiado por el scroll: cada carácter pasa de tenue a
 * pleno según el avance de la lectura. Solo cambia la opacidad, de modo que el
 * texto siempre es legible y seleccionable.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

function Caracter({
  children,
  progress,
  desde,
  hasta,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  desde: number;
  hasta: number;
}) {
  const opacity = useTransform(progress, [desde, hasta], [0.2, 1]);
  return (
    <span style={{ position: "relative" }}>
      {/* Copia invisible: reserva el espacio real y mantiene el salto de línea. */}
      <span style={{ opacity: 0 }}>{children}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }} aria-hidden="true">
        {children}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const palabras = text.split(" ");
  let recorridos = 0;
  const total = text.length;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {palabras.map((palabra, wi) => {
        const letras = `${palabra}${wi < palabras.length - 1 ? " " : ""}`.split("");
        const nodo = (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "pre" }}>
            {letras.map((letra, li) => {
              const desde = recorridos / total;
              const hasta = (recorridos + 1) / total;
              recorridos += 1;
              return (
                <Caracter key={li} progress={scrollYProgress} desde={desde} hasta={hasta}>
                  {letra}
                </Caracter>
              );
            })}
          </span>
        );
        return nodo;
      })}
    </p>
  );
}
