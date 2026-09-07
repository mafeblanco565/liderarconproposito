/**
 * Video en bucle del hero.
 *
 * React aplica `muted` como propiedad del elemento, no como atributo HTML, y la
 * política de autoreproducción del navegador consulta el atributo. Sin esto el
 * video se queda en pausa en el primer fotograma, así que se silencia y se
 * lanza la reproducción desde el propio componente.
 */
import { useEffect, useRef } from "react";

const SRC = "/assets/hero-loop.mp4";
const POSTER = "/assets/hero-loop-poster.webp";

export default function HeroLoop() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;

    v.muted = true;
    v.setAttribute("muted", "");
    v.play().catch(() => {
      /* Si el navegador lo impide, queda visible el póster del primer cuadro. */
    });
  }, []);

  return (
    <video
      ref={video}
      src={SRC}
      poster={POSTER}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      tabIndex={-1}
    />
  );
}
