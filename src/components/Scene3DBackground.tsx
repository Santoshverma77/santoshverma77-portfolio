import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const FloatingBlob = ({ position, color, scale = 1, speed = 1 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
  });
  return (
    <Float speed={1.2 * speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1, 4]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0.45}
          speed={1.5}
          roughness={0.2}
          metalness={0.6}
          transparent
          opacity={0.55}
        />
      </Icosahedron>
    </Float>
  );
};

const FloatingRing = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.8}>
      <Torus ref={ref} args={[1.2, 0.05, 16, 100]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.35} metalness={0.9} roughness={0.2} />
      </Torus>
    </Float>
  );
};

const Scene3DBackground = () => {
  return (
    <div className="fixed inset-0 -z-0 pointer-events-none opacity-70">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#60a5fa" />
          <pointLight position={[-5, -3, -2]} intensity={0.6} color="#3b82f6" />

          <FloatingBlob position={[-3.2, 1.5, -1]} color="#3b82f6" scale={1.2} speed={0.8} />
          <FloatingBlob position={[3.5, -1.2, -2]} color="#1e40af" scale={1.6} speed={0.5} />
          <FloatingBlob position={[0, -2.5, -3]} color="#60a5fa" scale={0.9} speed={1.1} />
          <FloatingRing position={[2.8, 2, -2.5]} color="#93c5fd" />
          <FloatingRing position={[-2.5, -2, -2]} color="#3b82f6" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3DBackground;
