"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { buildGlassLogoParts, createGlassEnvironment, type GlassFragment } from "@/lib/three/glassEngine";

// Signature visuelle K en verre optique (moteur porté du skill
// premium-3d-glass — voir lib/three/glassEngine.ts). Cycle assemblé →
// fragmenté → reconstruit en boucle lente, avec un léger biais piloté par la
// position de la zone Hero dans la fenêtre (jamais un "scroll-jacking" de
// toute la page — seulement un signal 0..1 local). Rendu uniquement si
// WebGL2 est disponible et si l'utilisateur n'a pas demandé moins de
// mouvement ; sinon ce composant ne rend rien et le K statique existant
// (components/ui/Logo.tsx) reste seul visible dans le Hero.
const CYCLE_SECONDS = 9; // assemblé → éclaté → assemblé, une fois
const EXPLODE_DISTANCE = 0.9; // modéré : le K reste lisible comme un groupe

// Géométrie réelle du logo K (barre + pointe, voir
// public/images/brand_mark_k.png) : deux parties identifiables, chacune
// coupée en deux pour l'animation — jamais une silhouette fusionnée tranchée
// arbitrairement. Coordonnées dans un repère local 0–230 x 0–240.
const BAR_X0 = 25,
  BAR_X1 = 80,
  BAR_Y0 = 15,
  BAR_Y1 = 225,
  BAR_MID = (BAR_Y0 + BAR_Y1) / 2;
const WEDGE_TIP_X = 205;

const LOGO_PARTS = [
  {
    // Barre, moitié haute (bleu)
    points: [
      [BAR_X0, BAR_Y0],
      [BAR_X1, BAR_Y0],
      [BAR_X1, BAR_MID],
      [BAR_X0, BAR_MID],
    ] as [number, number][],
    tint: "#2E8FFF",
    splitInto: 1,
  },
  {
    // Barre, moitié basse (bleu)
    points: [
      [BAR_X0, BAR_MID],
      [BAR_X1, BAR_MID],
      [BAR_X1, BAR_Y1],
      [BAR_X0, BAR_Y1],
    ] as [number, number][],
    tint: "#2E8FFF",
    splitInto: 1,
  },
  {
    // Pointe, moitié haute (orange) — apex touchant la barre à mi-hauteur
    points: [
      [BAR_X1, BAR_MID],
      [WEDGE_TIP_X, BAR_Y0],
      [WEDGE_TIP_X, BAR_MID],
    ] as [number, number][],
    tint: "#E47214",
    splitInto: 1,
  },
  {
    // Pointe, moitié basse (orange)
    points: [
      [BAR_X1, BAR_MID],
      [WEDGE_TIP_X, BAR_MID],
      [WEDGE_TIP_X, BAR_Y1],
    ] as [number, number][],
    tint: "#E47214",
    splitInto: 1,
  },
];

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

// Même principe que le moteur d'origine (lissage doux, pas de rebond) : une
// cosinus-interpolation symétrique, aller-retour sur un cycle complet.
function cycleProgress(tSeconds: number): number {
  const phase = (tSeconds % CYCLE_SECONDS) / CYCLE_SECONDS; // 0..1
  const triangle = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
  return 0.5 - 0.5 * Math.cos(triangle * Math.PI);
}

export default function GlassKMark({ containerScrollRef }: { containerScrollRef: React.RefObject<HTMLElement | null> }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(hasWebGL2());
  }, []);

  useEffect(() => {
    if (!supported || !mountRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mount = mountRef.current;
    let disposed = false;
    let frameId = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    createGlassEnvironment(renderer, scene);

    // Construction directe (pas de fetch réseau) : la géométrie du K est
    // connue et fixe, aucune raison d'en faire un aller-retour SVG.
    const built = buildGlassLogoParts(LOGO_PARTS, {
      height: 2.2,
      depth: 0.4,
      bevelSize: 0.028,
      bevelThickness: 0.024,
    });
    scene.add(built.group);
    const fragments: GlassFragment[] = built.fragments;

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const start = performance.now();
    const animate = (now: number) => {
      if (disposed) return;
      frameId = requestAnimationFrame(animate);
      const elapsed = (now - start) / 1000;

      // Biais de défilement : combien de la zone Hero est encore visible
      // (1 = pleinement visible, 0 = sortie de l'écran) — ralentit/estompe
      // le cycle plutôt que de l'arrêter net.
      let visibility = 1;
      const el = containerScrollRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight || 1;
        visibility = THREE.MathUtils.clamp(1 - Math.max(0, -rect.top) / (rect.height || viewportH), 0, 1);
      }

      const explode = prefersReducedMotion ? 0 : cycleProgress(elapsed * visibility) * EXPLODE_DISTANCE;
      for (const fragment of fragments) {
        const target = fragment.home.clone().addScaledVector(fragment.drift, explode);
        fragment.mesh.position.lerp(target, 0.1);
        fragment.mesh.rotation.y = explode * 0.35 * Math.sign(fragment.drift.x || 1);
      }
      built.group.rotation.y = Math.sin(elapsed * 0.12) * 0.16;

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.isMesh) mesh.geometry.dispose();
      });
      built.materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [supported, containerScrollRef]);

  if (!supported) return null;

  return <div ref={mountRef} aria-hidden className="h-full w-full" />;
}
