/**
 * Tarjeta que abre el video personal en una ventana emergente.
 * El reproductor usa los controles nativos (reproducir, pausa, barra de avance,
 * volumen y pantalla completa) y añade saltos de diez segundos.
 */
import { Play, RotateCcw, RotateCw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const VIDEO_SRC = "/assets/video-personal.mp4";
const POSTER_SRC = "/assets/video-personal-poster.webp";
/** Segundos que avanza o retrocede cada salto. */
const SALTO = 10;

export default function PersonalVideo() {
  const [abierto, setAbierto] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const cerrar_ref = useRef<HTMLButtonElement>(null);
  const disparador = useRef<HTMLButtonElement>(null);

  const cerrar = useCallback(() => setAbierto(false), []);

  /** Escape para cerrar y bloqueo del desplazamiento de fondo. */
  useEffect(() => {
    if (!abierto) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    const scrollPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    // El foco pasa al diálogo; al cerrar vuelve a la tarjeta que lo abrió.
    cerrar_ref.current?.focus();
    video.current?.play().catch(() => {
      /* Si el navegador bloquea la reproducción, quedan los controles. */
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = scrollPrevio;
      disparador.current?.focus();
    };
  }, [abierto, cerrar]);

  const saltar = (segundos: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = Math.min(Math.max(v.currentTime + segundos, 0), v.duration || 0);
  };

  return (
    <>
      <button
        ref={disparador}
        type="button"
        className="video-trigger"
        onClick={() => setAbierto(true)}
        aria-haspopup="dialog"
      >
        <img src={POSTER_SRC} alt="" aria-hidden="true" />
        <span className="video-trigger__glow" aria-hidden="true" />
        <span className="video-trigger__play" aria-hidden="true"><Play size={22} fill="currentColor" /></span>
        <span className="video-trigger__label">Ver mi video personal</span>
      </button>

      {abierto &&
        createPortal(
          <div
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Video personal de María Fernanda Blanco"
            onClick={cerrar}
          >
            {/* El clic dentro del panel no debe cerrar la ventana. */}
            <div className="video-modal__panel" onClick={(e) => e.stopPropagation()}>
              <div className="video-modal__bar">
                <span>Video personal</span>
                <button ref={cerrar_ref} type="button" onClick={cerrar} aria-label="Cerrar video">
                  <X size={19} />
                </button>
              </div>

              <video ref={video} src={VIDEO_SRC} poster={POSTER_SRC} controls playsInline preload="metadata" />

              <div className="video-modal__jumps">
                <button type="button" onClick={() => saltar(-SALTO)} aria-label={`Retroceder ${SALTO} segundos`}>
                  <RotateCcw size={17} /> {SALTO}s
                </button>
                <button type="button" onClick={() => saltar(SALTO)} aria-label={`Adelantar ${SALTO} segundos`}>
                  {SALTO}s <RotateCw size={17} />
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
