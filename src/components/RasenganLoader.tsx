import { cn } from "@/lib/utils";

interface RasenganLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const RasenganLoader = ({ className, size = "md" }: RasenganLoaderProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Core */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-300 animate-spin" 
           style={{ animationDuration: "0.5s" }} />
      
      {/* Inner glow */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/80 via-cyan-200 to-blue-400 animate-pulse" />
      
      {/* Spiral lines */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-300/50 animate-spin" 
           style={{ animationDuration: "0.3s", animationDirection: "reverse" }} />
      <div className="absolute inset-2 rounded-full border border-white/60 animate-spin" 
           style={{ animationDuration: "0.4s" }} />
      
      {/* Outer chakra glow */}
      <div className="absolute -inset-2 rounded-full bg-cyan-400/30 blur-md animate-pulse" />
      <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl animate-pulse" 
           style={{ animationDelay: "0.2s" }} />
    </div>
  );
};

export default RasenganLoader;
