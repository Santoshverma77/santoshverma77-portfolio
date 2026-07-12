import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMotion3D } from "@/hooks/useMotion3D";
import { Sparkles, SparklesIcon } from "lucide-react";

const FloatingBlob = ({
  position,
  color,
  scale = 1,
  speed = 1,
  detail = 4,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  detail?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
  });
  return (
    <Float speed={1.2 * speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1, detail]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={1.2}
          roughness={0.3}
          metalness={0.5}
          transparent
          opacity={0.5}
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
      <Torus ref={ref} args={[1.2, 0.05, 12, 64]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.3} metalness={0.9} roughness={0.2} />
      </Torus>
    </Float>
  );
};

const Scene = ({ mobile }: { mobile: boolean }) => {
  const blobs = useMemo(
    () =>
      mobile
        ? [
            { pos: [-2.5, 1.5, -1] as [number, number, number], color: "#3b82f6", scale: 1.1, speed: 0.6 },
            { pos: [3, -1.5, -2] as [number, number, number], color: "#1e40af", scale: 1.4, speed: 0.4 },
          ]
        : [
            { pos: [-3.2, 1.5, -1] as [number, number, number], color: "#3b82f6", scale: 1.2, speed: 0.8 },
            { pos: [3.5, -1.2, -2] as [number, number, number], color: "#1e40af", scale: 1.6, speed: 0.5 },
            { pos: [0, -2.5, -3] as [number, number, number], color: "#60a5fa", scale: 0.9, speed: 1.1 },
          ],
    [mobile]
  );

  const detail = mobile ? 2 : 4;

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#60a5fa" />
      {!mobile && <pointLight position={[-5, -3, -2]} intensity={0.6} color="#3b82f6" />}

      {blobs.map((b, i) => (
        <FloatingBlob key={i} position={b.pos} color={b.color} scale={b.scale} speed={b.speed} detail={detail} />
      ))}
      {!mobile && (
        <>
          <FloatingRing position={[2.8, 2, -2.5]} color="#93c5fd" />
          <FloatingRing position={[-2.5, -2, -2]} color="#3b82f6" />
        </>
      )}
    </Suspense>
  );
};

const Scene3DBackground = () => {
  const mobile = useIsMobile();
  const { enabled, toggle } = useMotion3D();

  return (
    <>
      {enabled && (
        <div className={`fixed inset-0 -z-0 pointer-events-none ${mobile ? "opacity-40" : "opacity-70"}`}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={mobile ? [1, 1] : [1, 1.5]}
            frameloop={mobile ? "demand" : "always"}
            gl={{ antialias: !mobile, alpha: true, powerPreference: "low-power" }}
          >
            <Scene mobile={mobile} />
          </Canvas>
        </div>
      )}

      {/* Reduced-motion toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-label={enabled ? "Disable 3D background" : "Enable 3D background"}
        title={enabled ? "Disable 3D background" : "Enable 3D background"}
        className="fixed bottom-4 left-4 z-50 w-9 h-9 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-white/70 hover:text-white hover:border-primary/50 transition-all flex items-center justify-center shadow-lg"
      >
        {enabled ? <Sparkles className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4 opacity-40" />}
      </button>
    </>
  );
};

export default Scene3DBackground;
