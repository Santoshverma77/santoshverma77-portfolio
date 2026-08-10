import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus } from "@react-three/drei";
import { Suspense, useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMotion3D } from "@/hooks/useMotion3D";
import { Sparkles, SparklesIcon, SlidersHorizontal } from "lucide-react";

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
  const {
    enabled,
    toggle,
    grain,
    setGrain,
    aberration,
    setAberration,
    resetEffects,
  } = useMotion3D();
  const [panelOpen, setPanelOpen] = useState(false);

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

      <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
        {/* Cinematic effects panel */}
        {enabled && panelOpen && (
          <div className="w-60 rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl p-4 shadow-2xl text-white/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">
                Cinematic
              </span>
              <button
                type="button"
                onClick={resetEffects}
                className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                Reset
              </button>
            </div>

            <label className="block mb-4">
              <span className="flex items-center justify-between text-[11px] text-white/60 mb-2">
                Film grain <span className="tabular-nums text-white/40">{grain}%</span>
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={grain}
                onChange={(e) => setGrain(Number(e.target.value))}
                aria-label="Film grain intensity"
                className="w-full accent-primary cursor-pointer"
              />
            </label>

            <label className="block">
              <span className="flex items-center justify-between text-[11px] text-white/60 mb-2">
                Chromatic aberration{" "}
                <span className="tabular-nums text-white/40">{aberration}%</span>
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={aberration}
                onChange={(e) => setAberration(Number(e.target.value))}
                aria-label="Chromatic aberration intensity"
                className="w-full accent-primary cursor-pointer"
              />
            </label>

            {quality === "low" && (
              <p className="mt-3 text-[10px] leading-relaxed text-white/35">
                Post-processing is off on Low quality — switch to Med/High to see these.
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Reduced-motion toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={enabled ? "Disable 3D motion" : "Enable 3D motion"}
            title={enabled ? "Disable 3D motion" : "Enable 3D motion"}
            className="w-9 h-9 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-white/70 hover:text-white hover:border-primary/50 transition-all flex items-center justify-center shadow-lg"
          >
            {enabled ? <Sparkles className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4 opacity-40" />}
          </button>

          {/* HDRI / render quality */}
          {enabled && (
            <button
              type="button"
              onClick={cycleQuality}
              aria-label={`3D quality: ${quality}. Click to change`}
              title={`3D quality: ${quality}`}
              className="h-9 px-3 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-[10px] tracking-[0.25em] uppercase text-white/70 hover:text-white hover:border-primary/50 transition-all shadow-lg"
            >
              {quality === "high" ? "High" : quality === "medium" ? "Med" : "Low"}
            </button>
          )}

          {/* Effects panel toggle */}
          {enabled && (
            <button
              type="button"
              onClick={() => setPanelOpen((v) => !v)}
              aria-expanded={panelOpen}
              aria-label="Cinematic effect settings"
              title="Grain & chromatic aberration"
              className={`w-9 h-9 rounded-full border bg-black/60 backdrop-blur-md transition-all flex items-center justify-center shadow-lg ${
                panelOpen
                  ? "border-primary/60 text-white"
                  : "border-white/15 text-white/70 hover:text-white hover:border-primary/50"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};


export default Scene3DBackground;
