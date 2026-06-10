interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  italic?: string;
  visible: boolean;
}

/**
 * Unified editorial section header matching the hero aesthetic.
 * Consistent eyebrow, divider width, and typography scale across sections.
 */
const SectionHeader = ({ eyebrow, title, italic, visible }: SectionHeaderProps) => {
  return (
    <div className="mb-16 md:mb-20">
      <div
        className="flex items-center gap-4 mb-6 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <div className="w-12 h-px bg-white/40" />
        <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50">
          {eyebrow}
        </span>
      </div>
      <h2
        className="font-light leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-700 delay-100"
        style={{
          fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {title}
        {italic && (
          <>
            {" "}
            <span className="italic text-white/60">{italic}</span>
          </>
        )}
      </h2>
    </div>
  );
};

export default SectionHeader;
