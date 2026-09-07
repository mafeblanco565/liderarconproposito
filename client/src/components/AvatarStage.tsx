/**
 * Estilo Materia en movimiento: el avatar es una escultura humana central,
 * iluminada sobre grafito y con respuesta sutil al cursor, sin distracciones.
 */
import { ContactShadows, Float, Html, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const AVATAR_URL = "/assets/avatar.glb";

/**
 * El puntero se sigue a nivel de ventana (no solo sobre el canvas) para que el
 * avatar acompañe el cursor en toda la página. Se guarda fuera de React para no
 * provocar renders por cada movimiento del mouse.
 */
const pointer = { x: 0, y: 0 };

function usePointerTracking(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const handleLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled]);
}

function Model({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const { scene } = useGLTF(AVATAR_URL);
  const model = useMemo(() => scene.clone(true), [scene]);
  const framing = useMemo(() => {
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.6 / maxDimension;

    return { center, scale };
  }, [model]);

  useFrame((_, delta) => {
    if (!root.current) return;
    // `delta` se acota para que un frame perdido no dispare un giro brusco.
    const step = Math.min(delta, 0.1);
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      pointer.x * 0.42,
      4,
      step,
    );
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      -pointer.y * 0.16,
      4,
      step,
    );
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.05}
      rotationIntensity={reducedMotion ? 0 : 0.08}
      floatIntensity={reducedMotion ? 0 : 0.18}
    >
      <group ref={root} dispose={null}>
        <primitive
          object={model}
          scale={framing.scale}
          position={[
            -framing.center.x * framing.scale,
            -framing.center.y * framing.scale - 0.25,
            -framing.center.z * framing.scale,
          ]}
        />
      </group>
    </Float>
  );
}

function AvatarFallback() {
  return (
    <Html center>
      <span className="avatar-loading">Cargando presencia 3D</span>
    </Html>
  );
}

export default function AvatarStage() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  usePointerTracking(visible);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /** Fuera de pantalla el canvas deja de renderizar: libera GPU al desplazarse. */
  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className="avatar-stage"
      aria-label="Avatar tridimensional de María Fernanda Blanco"
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.15, 5.8], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[3.8, 5, 4]} intensity={3.1} color="#dfe9ff" />
        <pointLight position={[-4, 1, 2]} intensity={9} color="#7ce0cd" distance={10} />
        <pointLight position={[0, -2, 3]} intensity={4} color="#d4a867" distance={8} />
        <Suspense fallback={<AvatarFallback />}>
          <Model reducedMotion={reducedMotion} />
          <ContactShadows
            position={[0, -2.15, 0]}
            opacity={0.46}
            scale={4.7}
            blur={2.8}
            far={4.2}
            resolution={256}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(AVATAR_URL);
