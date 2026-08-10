import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles,
  Text,
  TorusKnot,
} from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Quality3D } from "@/hooks/useMotion3D";

type Pointer = { x: number; y: number };

/* ── Inner distorted core (creative spark) ── */
const Core = ({ still }: { still: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current || still) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.3;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.35) * 0.25;
  });
  return (
    <Float
      speed={still ? 0 : 1.1}
      rotationIntensity={still ? 0 : 0.25}
      floatIntensity={still ? 0 : 0.5}
    >
      <mesh ref={ref} scale={0.85}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#ef4444"
          emissive="#dc2626"
          emissiveIntensity={0.9}
          distort={still ? 0.25 : 0.5}
          speed={still ? 0 : 1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh scale={1.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#dc2626"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.45}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#7f1d1d"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
};

/* ── Chrome torus-knot (film-reel + code loop) ── */
const KnotRing = ({ segments, still }: { segments: number; still: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current || still) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.16;
    ref.current.rotation.y = s.clock.elapsedTime * 0.22;
  });
  return (
    <Float
      speed={still ? 0 : 0.7}
      rotationIntensity={still ? 0 : 0.18}
      floatIntensity={still ? 0 : 0.35}
    >
      <TorusKnot ref={ref} args={[1.55, 0.055, segments, 24, 2, 3]}>
        <meshPhysicalMaterial
          color="#f8fafc"
          metalness={1}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.6}
          reflectivity={1}
        />
      </TorusKnot>
    </Float>
  );
};

/* ── Slim outer ring — viewfinder ── */
const OuterRing = ({
  radius,
  tilt,
  color,
  speed = 0.1,
  still,
}: {
  radius: number;
  tilt: number;
  color: string;
  speed?: number;
  still: boolean;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current || still) return;
    ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0, tilt]} scale={radius}>
      <torusGeometry args={[1, 0.006, 8, 140]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

/* ── Orbiting glyphs — dev + editor language ── */
const GLYPHS = ["{ }", "< />", "▶", "●", "//", "fx"];

const OrbitGlyphs = ({
  orbitRadius,
  still,
}: {
  orbitRadius: number;
  still: boolean;
}) => {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(
    () =>
      GLYPHS.map((g, i) => ({
        glyph: g,
        radius: orbitRadius,
        speed: 0.16 + (i % 3) * 0.04,
        offset: (i / GLYPHS.length) * Math.PI * 2,
        tilt: (i % 2 === 0 ? 0.15 : -0.2) + i * 0.04,
        color: i % 2 === 0 ? "#ffffff" : "#fca5a5",
      })),
    [orbitRadius]
  );

  useFrame((s) => {
    if (!group.current) return;
    const time = still ? 0 : s.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const it = items[i];
      if (!it) return;
      const t = time * it.speed + it.offset;
      child.position.x = Math.cos(t) * it.radius;
      child.position.z = Math.sin(t) * it.radius;
      child.position.y = Math.sin(t * 1.4) * 0.3 + it.tilt;
      child.lookAt(0, 0, 0);
      child.rotateY(Math.PI);
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Text
          key={i}
          fontSize={0.26}
          color={it.color}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.9}
          outlineWidth={0.005}
          outlineColor="#000000"
          outlineOpacity={0.4}
        >
          {it.glyph}
        </Text>
      ))}
    </group>
  );
};

/* ── Pointer parallax rig — tilts the whole emblem + drifts the key light ── */
const ParallaxRig = ({
  pointer,
  children,
  strength = 1,
}: {
  pointer: React.MutableRefObject<Pointer>;
  children: React.ReactNode;
  strength?: number;
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((_, delta) => {
    const damp = 1 - Math.pow(0.001, delta);
    if (group.current) {
      const targetY = pointer.current.x * 0.32 * strength;
      const targetX = -pointer.current.y * 0.22 * strength;
      group.current.rotation.y += (targetY - group.current.rotation.y) * damp;
      group.current.rotation.x += (targetX - group.current.rotation.x) * damp;
    }
    const camX = pointer.current.x * 0.45 * strength;
    const camY = -pointer.current.y * 0.35 * strength;
    camera.position.x += (camX - camera.position.x) * damp;
    camera.position.y += (camY - camera.position.y) * damp;
    camera.lookAt(0, 0, 0);
  });

  return <group ref={group}>{children}</group>;
};

/* ── Key light that follows the cursor for cinematic lighting shifts ── */
const ParallaxKeyLight = ({ pointer }: { pointer: React.MutableRefObject<Pointer> }) => {
  const light = useRef<THREE.SpotLight>(null);
  useFrame((_, delta) => {
    if (!light.current) return;
    const damp = 1 - Math.pow(0.002, delta);
    const tx = 5 + pointer.current.x * 3;
    const ty = 4 - pointer.current.y * 2.5;
    light.current.position.x += (tx - light.current.position.x) * damp;
    light.current.position.y += (ty - light.current.position.y) * damp;
  });
  return (
    <spotLight
      ref={light}
      position={[5, 4, 5]}
      angle={0.6}
      penumbra={0.8}
      intensity={2.2}
      color="#fef3c7"
      distance={15}
      decay={2}
    />
  );
};

interface SceneProps {
  mobile: boolean;
  quality: Quality3D;
  still: boolean;
  orbitRadius: number;
  pointer: React.MutableRefObject<Pointer>;
  /** 0–1 normalized intensities */
  grain: number;
  aberration: number;
}

const Scene = ({ mobile, quality, still, orbitRadius, pointer, grain, aberration }: SceneProps) => {
  const high = true;
  const medium = false;

  return (
    <Suspense fallback={null}>
      {/* HDRI environment reflections — quality controlled */}
      {true && (
        <Environment preset={high ? "night" : "city"} resolution={high ? 256 : 64} />
      )}

      <ambientLight intensity={0.18} />
      {still ? (
        <spotLight
          position={[5, 4, 5]}
          angle={0.6}
          penumbra={0.8}
          intensity={2.2}
          color="#fef3c7"
          distance={15}
          decay={2}
        />
      ) : (
        <ParallaxKeyLight pointer={pointer} />
      )}
      <pointLight position={[-4, -2, -3]} intensity={2.8} color="#ef4444" distance={12} decay={2} />
      <pointLight position={[3, -3, 2]} intensity={1.4} color="#3b82f6" distance={10} decay={2} />
      {high && (
        <pointLight position={[0, 5, -2]} intensity={0.9} color="#ffffff" distance={8} decay={2} />
      )}

      <ParallaxRig pointer={pointer} strength={still ? 0 : 1}>
        <Core still={still} />
        <KnotRing segments={high ? 260 : medium ? 160 : 90} still={still} />

        <OuterRing radius={orbitRadius * 0.96} tilt={0} color="#f87171" speed={0.08} still={still} />
        <OuterRing radius={orbitRadius * 1.1} tilt={0.4} color="#60a5fa" speed={-0.06} still={still} />
        {true && (
          <OuterRing radius={orbitRadius * 1.24} tilt={-0.3} color="#ffffff" speed={0.04} still={still} />
        )}

        <OrbitGlyphs orbitRadius={orbitRadius} still={still} />
      </ParallaxRig>

      {!still && (
        <>
          <Sparkles
            count={high ? 90 : medium ? 50 : 25}
            scale={orbitRadius * 3}
            size={mobile ? 2.2 : 3.5}
            speed={0.35}
            color="#fca5a5"
            opacity={0.85}
          />
          {high && (
            <Sparkles count={40} scale={orbitRadius * 3.8} size={2} speed={0.2} color="#93c5fd" opacity={0.5} />
          )}
        </>
      )}

      {/* Cinematic post-processing: grain + chromatic aberration + bloom + vignette */}
      {true && (
        <EffectComposer multisampling={high ? 4 : 0} enableNormalPass={false}>
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={
              new THREE.Vector2(
                (high ? 0.0024 : 0.0014) * aberration,
                (high ? 0.0032 : 0.0018) * aberration
              )
            }
            radialModulation
            modulationOffset={0.35}
          />
          <Bloom intensity={high ? 0.75 : 0.45} luminanceThreshold={0.22} luminanceSmoothing={0.85} mipmapBlur />
          <Noise
            premultiply
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={(high ? 0.7 : 0.45) * grain}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.75} />
        </EffectComposer>
      )}
    </Suspense>
  );
};

interface Props {
  className?: string;
  /** Rendered size of the portrait in px — drives emblem scale + orbit radius */
  portraitSize?: number;
  quality?: Quality3D;
  reducedMotion?: boolean;
  /** 0–100 film grain intensity */
  grain?: number;
  /** 0–100 chromatic aberration intensity */
  aberration?: number;
}

const Hero3DEmblem = ({
  className = "",
  portraitSize = 300,
  quality = "high",
  reducedMotion = false,
  grain = 35,
  aberration = 30,
}: Props) => {
  const mobile = useIsMobile();
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const host = useRef<HTMLDivElement>(null);

  /* Mouse / touch parallax tracking (skipped when motion is reduced) */
  useEffect(() => {
    if (reducedMotion) {
      pointer.current = { x: 0, y: 0 };
      return;
    }
    const update = (cx: number, cy: number) => {
      const el = host.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (cx - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const ny = (cy - (r.top + r.height / 2)) / (window.innerHeight / 2);
      pointer.current = {
        x: Math.max(-1.5, Math.min(1.5, nx)),
        y: Math.max(-1.5, Math.min(1.5, ny)),
      };
    };
    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) update(t.clientX, t.clientY);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [reducedMotion]);

  /* Orbit radius scales with the portrait so glyphs always ring the face */
  const orbitRadius = useMemo(() => {
    const ratio = portraitSize / 300; // 300px is the design baseline
    return Math.max(1.9, Math.min(2.8, 2.45 * (0.82 + ratio * 0.18)));
  }, [portraitSize]);

  const dpr: [number, number] =
    [1, 2] as [number, number];

  return (
    <div ref={host} className={`pointer-events-none ${className}`}>
      {/* CSS bloom vignette behind canvas */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(220,38,38,0.35), rgba(59,130,246,0.12) 45%, transparent 70%)",
        }}
      />
      <Canvas
        className="relative"
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        dpr={dpr}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <Scene
          mobile={mobile}
          quality={quality}
          still={reducedMotion}
          orbitRadius={orbitRadius}
          pointer={pointer}
          grain={grain / 100}
          aberration={aberration / 100}
        />
      </Canvas>

      {/* Static film-grain overlay — scales with the grain control */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full mix-blend-overlay"
        style={{
          opacity: (grain / 100) * 0.34,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.55'/></svg>\")",
          backgroundSize: "140px 140px",
        }}
      />
    </div>
  );
};

export default Hero3DEmblem;
