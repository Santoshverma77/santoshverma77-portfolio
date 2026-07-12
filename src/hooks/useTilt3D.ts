import { useRef, useCallback, useState } from "react";

export const useTilt3D = (max = 12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotY = (x - 0.5) * (max * 2);
      const rotX = -(y - 0.5) * (max * 2);
      setStyle({
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [max]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
    });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
};
