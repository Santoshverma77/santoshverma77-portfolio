import { useEffect, useState } from "react";

interface Leaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const LeafParticles = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const newLeaves: Leaf[] = [];
    for (let i = 0; i < 20; i++) {
      newLeaves.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 10,
        size: 10 + Math.random() * 20,
      });
    }
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute opacity-60"
          style={{
            left: `${leaf.left}%`,
            top: "-50px",
            animation: `leaf-fall ${leaf.duration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary drop-shadow-lg"
          >
            <path
              d="M12 2C8 6 4 10 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 10 16 6 12 2Z"
              fill="currentColor"
              opacity="0.8"
            />
            <path
              d="M12 22V8"
              stroke="hsl(var(--naruto-orange-glow))"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default LeafParticles;
