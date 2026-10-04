// Moteur de verre optique — porté depuis le skill premium-3d-glass
// (template/js/app.js, Three.js r160), pas réécrit : les fonctions de
// découpage radial (cross2 → partitionContour) et le matériau verre
// (createGlassMaterial / createGlassEnvironment) sont une traduction directe
// de l'algorithme original en TypeScript + imports npm `three`, pour
// réutilisation dans un composant React plutôt que dans la page monofichier
// d'origine. Voir INSTALL.md du skill pour la source.
//
// Différence volontaire avec l'original : le K n'est pas traité comme une
// silhouette unique qu'on tranche radialement (ça produit des fragments
// géométriques abstraits, sans rapport visuel avec les vraies parties du
// logo). `buildGlassLogoParts` construit à la place chaque partie réelle du
// logo (barre bleue, pointe orange — public/images/brand_mark_k.png)
// séparément, chacune avec sa propre teinte de verre ; `partitionContour`
// reste utilisé, mais à l'intérieur de chaque partie.
import * as THREE from "three";

type V2 = THREE.Vector2;
const V2 = (x = 0, y = 0) => new THREE.Vector2(x, y);
const cross2 = (a: V2, b: V2) => a.x * b.y - a.y * b.x;

// ---- Matériau et environnement verre (ports quasi verbatim) ----------------

// Studio de panneaux lumineux procédural : convertit en environnement via
// PMREMGenerator pour des reflets nets et spectraux sans dépendre du fond de
// la page. Identique au moteur d'origine (createGlassEnvironment).
export function createGlassEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const studio = new THREE.Scene();
  studio.background = new THREE.Color("#080b10");
  const panels: [number, number, number, number, number, string, number][] = [
    [2.8, 8, -4, 2, 3, "#ffffff", 2.6],
    [0.65, 7, 3, 1, 2, "#dceeff", 4.0],
    [5, 0.7, 0, 5, -1, "#ffffff", 3.5],
    [0.5, 6, -2, 0, -4, "#a78bfa", 3.0],
    [1.0, 5, 3, -1, -3, "#ffc2e0", 2.4],
    [4, 0.35, 0, -3, 3, "#92bbff", 3.0],
    [0.16, 5, -3, 0, 2, "#ffffff", 5.0],
    [0.35, 4, 4, 0, -2, "#ffb36b", 2.0],
  ];
  for (const [w, h, x, y, z, color, intensity] of panels) {
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
        side: THREE.DoubleSide,
      })
    );
    panel.position.set(x, y, z);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.025, 0.1, 100);
  scene.environment = environment.texture;
  studio.traverse((object) => {
    if ((object as THREE.Mesh).isMesh) {
      const mesh = object as THREE.Mesh;
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    }
  });
  pmrem.dispose();
}

// Verre KRISALYS : transmission totale, dispersion chromatique injectée via
// onBeforeCompile (Three r160 n'a pas de paramètre `dispersion` natif) —
// identique au moteur d'origine (createGlassMaterial), à une différence
// volontaire près : `attenuationColor`/`attenuationDistance` sont
// paramétrables pour teinter le verre (bleu électrique / orange KRISALYS,
// comme le logo réel) par absorption physique (Beer-Lambert) plutôt que par
// une simple couleur de surface — une `attenuationDistance` courte est ce
// qui rend la teinte réellement visible à travers la matière, au lieu d'un
// verre qui reste blanc quelle que soit la couleur choisie.
export function createGlassMaterial(tint?: { color: string; attenuationDistance?: number }) {
  const glass = new THREE.MeshPhysicalMaterial({
    color: "#fafcff",
    metalness: 0.0,
    roughness: 0.025,
    transmission: 0.92,
    thickness: 0.6,
    ior: 1.46,
    attenuationColor: new THREE.Color(tint?.color ?? "#edf7ff"),
    attenuationDistance: tint ? (tint.attenuationDistance ?? 0.9) : 8.0,
    clearcoat: 0.65,
    clearcoatRoughness: 0.018,
    iridescence: 0.6,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 420],
    envMapIntensity: 1.1,
    side: THREE.DoubleSide,
  });
  glass.onBeforeCompile = (shader) => {
    shader.uniforms.uChromaticSpread = { value: 0.018 };
    shader.fragmentShader = "uniform float uChromaticSpread;\n" + shader.fragmentShader;
    const transmission = THREE.ShaderChunk.transmission_fragment.replace(
      /vec4 transmitted = getIBLVolumeRefraction\([\s\S]*?\);/,
      `float chromaticSpread = uChromaticSpread * mix(0.35, 1.0,
                smoothstep(0.15, 0.85, 1.0 - abs(dot(n, v))));
            vec4 transmitted = getIBLVolumeRefraction(
                n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
                pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
                material.attenuationColor, material.attenuationDistance );
            vec4 transmittedRed = getIBLVolumeRefraction(
                n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
                pos, modelMatrix, viewMatrix, projectionMatrix, material.ior - chromaticSpread, material.thickness,
                material.attenuationColor, material.attenuationDistance );
            vec4 transmittedBlue = getIBLVolumeRefraction(
                n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
                pos, modelMatrix, viewMatrix, projectionMatrix, material.ior + chromaticSpread, material.thickness,
                material.attenuationColor, material.attenuationDistance );
            transmitted = vec4(transmittedRed.r, transmitted.g, transmittedBlue.b,
                (transmittedRed.a + transmitted.a + transmittedBlue.a) / 3.0);`
    );
    shader.fragmentShader = shader.fragmentShader.replace("#include <transmission_fragment>", transmission);
  };
  glass.customProgramCacheKey = () => "krisalys-glass-edge-dispersion-v1";
  return glass;
}

// ---- Contours 2D (ports verbatim des utilitaires géométriques) ------------

function cleanContour(points: V2[], epsilon = 1e-4): V2[] {
  const contour: V2[] = [];
  for (const p of points) {
    if (!contour.length || contour[contour.length - 1].distanceTo(p) > epsilon) contour.push(p.clone());
  }
  while (contour.length > 1 && contour[0].distanceTo(contour[contour.length - 1]) <= epsilon) contour.pop();
  const result = contour.filter((p, i) => {
    const prev = contour[(i - 1 + contour.length) % contour.length];
    const next = contour[(i + 1) % contour.length];
    return Math.abs(cross2(p.clone().sub(prev), next.clone().sub(p))) > 1e-7;
  });
  if (THREE.ShapeUtils.isClockWise(result)) result.reverse();
  return result;
}

function clipContour(points: V2[], halfPlanes: { origin: V2; normal: V2 }[]): V2[] {
  let polygon = points.map((p) => p.clone());
  for (const { origin, normal } of halfPlanes) {
    const clipped: V2[] = [];
    for (let i = 0; i < polygon.length; i++) {
      const p = polygon[i],
        q = polygon[(i + 1) % polygon.length];
      const dp = p.clone().sub(origin).dot(normal),
        dq = q.clone().sub(origin).dot(normal);
      if (dp >= 0) clipped.push(p);
      if (dp >= 0 !== dq >= 0) clipped.push(p.clone().lerp(q, dp / (dp - dq)));
    }
    polygon = clipped;
    if (!polygon.length) break;
  }
  return cleanContour(polygon);
}

function wedgeHalfPlanes(center: V2, startDeg: number, endDeg: number) {
  const dir = (deg: number) => V2(Math.cos(THREE.MathUtils.degToRad(deg)), Math.sin(THREE.MathUtils.degToRad(deg)));
  const a = dir(startDeg),
    b = dir(endDeg);
  return [
    { origin: center, normal: V2(-a.y, a.x) },
    { origin: center, normal: V2(b.y, -b.x) },
  ];
}

function visibilityKernel(points: V2[]): V2[] {
  const contour = points.slice();
  if (THREE.ShapeUtils.isClockWise(contour)) contour.reverse();
  const span = new THREE.Box2().setFromPoints(contour).getSize(V2()).length() * 2 + 1;
  let kernel = [V2(-span, -span), V2(span, -span), V2(span, span), V2(-span, span)];
  for (let i = 0; i < contour.length; i++) {
    const a = contour[i];
    const edge = contour[(i + 1) % contour.length].clone().sub(a);
    const clipped: V2[] = [];
    for (let j = 0; j < kernel.length; j++) {
      const p = kernel[j],
        q = kernel[(j + 1) % kernel.length];
      const dp = cross2(edge, p.clone().sub(a)),
        dq = cross2(edge, q.clone().sub(a));
      if (dp >= -1e-10) clipped.push(p);
      if (dp >= 0 !== dq >= 0) clipped.push(p.clone().lerp(q, dp / (dp - dq)));
    }
    kernel = clipped;
    if (!kernel.length) return [];
  }
  return kernel;
}

// Découpe un contour en `count` fragments radiaux ; balaye l'angle de départ
// pour maximiser le plus petit noyau de visibilité (morph sans pli).
function partitionContour(outline: V2[], count: number): V2[][] {
  if (count <= 1) return [outline];
  const centre = new THREE.Box2().setFromPoints(outline).getCenter(V2());
  const step = 360 / count;
  let best: { worst: number; pieces: V2[][] } | null = null;
  for (let offset = 0; offset < step - 0.001; offset += 5) {
    const pieces: V2[][] = [];
    let worst = Infinity;
    for (let i = 0; i < count; i++) {
      const piece = clipContour(outline, wedgeHalfPlanes(centre, offset + i * step, offset + (i + 1) * step));
      if (piece.length < 3) {
        worst = -1;
        break;
      }
      const kernel = visibilityKernel(piece);
      const ratio = kernel.length ? Math.abs(THREE.ShapeUtils.area(kernel)) / Math.abs(THREE.ShapeUtils.area(piece)) : 0;
      worst = Math.min(worst, ratio);
      pieces.push(piece);
    }
    if (worst >= 0 && (!best || worst > best.worst)) best = { worst, pieces };
  }
  if (!best) throw new Error(`Could not split this shape into ${count} fragments.`);
  return best.pieces;
}

function recentre(points: V2[]) {
  const centre = new THREE.Box2().setFromPoints(points).getCenter(V2());
  return {
    contour: points.map((p) => p.clone().sub(centre)),
    home: new THREE.Vector3(centre.x, centre.y, 0),
  };
}

function makePrism(points: V2[], depth: number, bevelSize: number, bevelThickness: number) {
  const geometry = new THREE.ExtrudeGeometry(new THREE.Shape(points), {
    depth,
    steps: 1,
    bevelEnabled: true,
    bevelSize,
    bevelThickness,
    bevelSegments: 6,
    curveSegments: 24,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

function fitParts(parts: V2[][], height: number): V2[][] {
  const bounds = new THREE.Box2().setFromPoints(parts.flat());
  const centre = bounds.getCenter(V2());
  const size = bounds.getSize(V2());
  const scale = height / Math.max(size.x, size.y);
  return parts.map((part) => part.map((p) => p.clone().sub(centre).multiplyScalar(scale)));
}

export interface GlassFragment {
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  /** Direction de dispersion au-delà de `home`, normalisée. */
  drift: THREE.Vector3;
}

export interface GlassLogoPart {
  /** Contour fermé en coordonnées locales (ex. coin haut-gauche à (0,0)). */
  points: [number, number][];
  /** Teinte de verre physique (absorption Beer-Lambert) — pas une couleur plaquée en surface. */
  tint: string;
  /** Découpe ce morceau en `splitInto` fragments radiaux (défaut 1 = pas de découpe). */
  splitInto?: number;
}

// Construit le K à partir de ses vraies parties géométriques (barre bleue,
// pointe orange — voir public/images/brand_mark_k.png), pas d'une silhouette
// unique découpée arbitrairement en tranches radiales : chaque fragment
// correspond à un morceau réellement identifiable du logo, avec sa propre
// teinte de verre. `partitionContour` reste utilisé, mais appliqué à
// l'intérieur de chaque partie plutôt qu'à la forme entière.
export function buildGlassLogoParts(
  parts: GlassLogoPart[],
  options: { height: number; depth: number; bevelSize: number; bevelThickness: number }
): { group: THREE.Group; fragments: GlassFragment[]; materials: THREE.MeshPhysicalMaterial[] } {
  const rawContours = parts.map((part) => cleanContour(part.points.map(([x, y]) => V2(x, y))));
  const fitted = fitParts(rawContours, options.height);

  const group = new THREE.Group();
  const fragments: GlassFragment[] = [];
  const materials: THREE.MeshPhysicalMaterial[] = [];

  parts.forEach((part, i) => {
    const material = createGlassMaterial({ color: part.tint });
    materials.push(material);
    const pieces = partitionContour(fitted[i], Math.max(1, part.splitInto ?? 1));
    for (const piece of pieces) {
      const { contour, home } = recentre(piece);
      const geometry = makePrism(contour, options.depth, options.bevelSize, options.bevelThickness);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(home);
      group.add(mesh);
      const drift = home.clone().normalize();
      if (!isFinite(drift.x) || (drift.x === 0 && drift.y === 0)) drift.set(1, 0, 0);
      fragments.push({ mesh, home, drift });
    }
  });

  return { group, fragments, materials };
}
