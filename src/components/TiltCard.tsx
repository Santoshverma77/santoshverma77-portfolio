import { ReactNode } from "react";
import { useTilt3D } from "@/hooks/useTilt3D";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
  as?: "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  style?: React.CSSProperties;
}

const TiltCard = ({ children, className, max = 10, as = "div", style, ...rest }: Props) => {
  const { ref, style: tiltStyle, onMouseMove, onMouseLeave } = useTilt3D(max);
  const Tag: any = as;
  return (
    <Tag
      {...rest}
      ref={ref as any}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ ...style, ...tiltStyle, transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </Tag>
  );
};

export default TiltCard;
