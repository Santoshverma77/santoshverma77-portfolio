import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Text,
  TorusKnot,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Inner distorted core (represents the "spark" / creative core) ── */
const Core = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.35;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} scale={0.95}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#dc2626"
          emissive="#7f1d1d"
          emissiveIntensity={0.35}
          distort={0.45}
          speed={1.6}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
    </Float>
  );
};

/* ── Chrome torus-knot (film-reel curve + code loop) ── */
const KnotRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.18;
    ref.current.rotation.y = s.clock.elapsedTime * 0.24;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <TorusKnot ref={ref} args={[1.6, 0.06, 220, 24, 2, 3]}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.2}
          envMapIntensity={1.2}
          transparent
          opacity={0.85}
        />
      </TorusKnot>
    </Float>
  );
};

/* ── Slim outer ring (viewer / film-strip vibe) ── */
const OuterRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.PI / 2.4;
  });
  return (
    <mesh ref={ref} scale={2.4}>
      <torusGeometry args={[1, 0.008, 8, 128]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} />
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
        radius: mobile ? 2.1 : 2.5,
        speed: 0.15 + (i % 3) * 0.05,
        offset: (i / GLYPHS.length) * Math.PI * 2,
        tilt: (i % 2 === 0 ? 0.15 : -0.2) + i * 0.05,
        color: i % 2 === 0 ? "#ffffff" : "#f87171",
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
      child.position.y = Math.sin(t * 1.5) * 0.35 + it.tilt;
      child.lookAt(0, 0, 0);
      // face outward
      child.rotateY(Math.PI);
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Text
          key={i}
          fontSize={0.28}
          color={it.color}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.85}
        >
          {it.glyph}
        </Text>
      ))}
    </group>
  );
};

const Scene = ({ mobile }: { mobile: boolean }) => (
  <Suspense fallback={null}>
    <color attach="background" args={["#000000"]} />
    <ambientLight intensity={0.35} />
    <directionalLight position={[4, 4, 4]} intensity={1.1} color="#ffffff" />
    <pointLight position={[-4, -2, -3]} intensity={1.2} color="#dc2626" />
    <pointLight position={[3, -2, 2]} intensity={0.8} color="#3b82f6" />

    <Core />
    <KnotRing />
    <OuterRing />
    <OrbitGlyphs mobile={mobile} />

    <Sparkles
      count={mobile ? 30 : 70}
      scale={6}
      size={mobile ? 2 : 3}
      speed={0.35}
      color="#f87171"
      opacity={0.7}
    />
  </Suspense>
);

interface Props {
  className?: string;
}

const Hero3DEmblem = ({ className = "" }: Props) => {
  const mobile = useIsMobile();
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        dpr={mobile ? [1, 1] : [1, 1.75]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene mobile={mobile} />
      </Canvas>
    </div>
  );
};

export default Hero3DEmblem;
