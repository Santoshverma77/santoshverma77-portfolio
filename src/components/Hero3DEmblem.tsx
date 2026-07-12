import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles,
  Text,
  TorusKnot,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Inner distorted core (creative spark) ── */
const Core = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.3;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.35) * 0.25;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={ref} scale={0.85}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#ef4444"
          emissive="#dc2626"
          emissiveIntensity={0.9}
          distort={0.5}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Inner halo bloom-fake */}
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
const KnotRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.16;
    ref.current.rotation.y = s.clock.elapsedTime * 0.22;
  });
  return (
    <Float speed={0.7} rotationIntensity={0.18} floatIntensity={0.35}>
      <TorusKnot ref={ref} args={[1.55, 0.055, 260, 28, 2, 3]}>
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
const OuterRing = ({ radius, tilt, color, speed = 0.1 }: {
  radius: number; tilt: number; color: string; speed?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0, tilt]} scale={radius}>
      <torusGeometry args={[1, 0.006, 8, 160]} />
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

const OrbitGlyphs = ({ mobile }: { mobile: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(
    () =>
      GLYPHS.map((g, i) => ({
        glyph: g,
        radius: mobile ? 2.05 : 2.45,
        speed: 0.16 + (i % 3) * 0.04,
        offset: (i / GLYPHS.length) * Math.PI * 2,
        tilt: (i % 2 === 0 ? 0.15 : -0.2) + i * 0.04,
        color: i % 2 === 0 ? "#ffffff" : "#fca5a5",
      })),
    [mobile]
  );

  useFrame((s) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const it = items[i];
      if (!it) return;
      const t = s.clock.elapsedTime * it.speed + it.offset;
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

const Scene = ({ mobile }: { mobile: boolean }) => (
  <Suspense fallback={null}>
    {/* Cinematic HDRI reflections for chrome */}
    <Environment preset="night" />

    {/* 3-point cinematic lighting */}
    <ambientLight intensity={0.18} />
    {/* Key — warm rim */}
    <spotLight
      position={[5, 4, 5]}
      angle={0.6}
      penumbra={0.8}
      intensity={2.2}
      color="#fef3c7"
      distance={15}
      decay={2}
    />
    {/* Fill — cool */}
    <pointLight position={[-4, -2, -3]} intensity={2.8} color="#ef4444" distance={12} decay={2} />
    {/* Rim */}
    <pointLight position={[3, -3, 2]} intensity={1.4} color="#3b82f6" distance={10} decay={2} />
    {/* Top hair */}
    {!mobile && (
      <pointLight position={[0, 5, -2]} intensity={0.9} color="#ffffff" distance={8} decay={2} />
    )}

    <Core />
    <KnotRing />

    {/* Layered rings for depth */}
    <OuterRing radius={2.35} tilt={0}    color="#f87171" speed={0.08} />
    <OuterRing radius={2.7}  tilt={0.4}  color="#60a5fa" speed={-0.06} />
    {!mobile && <OuterRing radius={3.05} tilt={-0.3} color="#ffffff" speed={0.04} />}

    <OrbitGlyphs mobile={mobile} />

    <Sparkles
      count={mobile ? 40 : 90}
      scale={7}
      size={mobile ? 2.2 : 3.5}
      speed={0.35}
      color="#fca5a5"
      opacity={0.85}
    />
    {!mobile && (
      <Sparkles count={40} scale={9} size={2} speed={0.2} color="#93c5fd" opacity={0.5} />
    )}
  </Suspense>
);

interface Props {
  className?: string;
}

const Hero3DEmblem = ({ className = "" }: Props) => {
  const mobile = useIsMobile();
  return (
    <div className={`pointer-events-none ${className}`}>
      {/* CSS bloom vignette behind canvas — cinematic glow */}
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
        dpr={mobile ? [1, 1.25] : [1, 2]}
        gl={{
          antialias: !mobile,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <Scene mobile={mobile} />
      </Canvas>
    </div>
  );
};

export default Hero3DEmblem;
