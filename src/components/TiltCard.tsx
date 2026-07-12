import { ReactNode } from "react";
import { useTilt3D } from "@/hooks/useTilt3D";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
  as?: "a" | "div" | "button";
  href?: string;
  target?: string;
  rel?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  type?: "button" | "submit";
}

const TiltCard = ({
  children,
  className,
  max = 10,
  as = "div",
  style,
  onMouseEnter,
  onMouseLeave: userLeave,
  type,
  ...rest
}: Props) => {
  const { ref, style: tiltStyle, onMouseMove, onMouseLeave } = useTilt3D(max);
  const Tag: any = as;
  const btnType = as === "button" ? (type ?? "button") : undefined;
  return (
    <Tag
      {...rest}
      type={btnType}
      ref={ref as any}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={(e: React.MouseEvent) => {
        onMouseLeave();
        userLeave?.(e);
      }}
      className={className}
      style={{ ...style, ...tiltStyle, transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </Tag>
  );
};

export default TiltCard;
