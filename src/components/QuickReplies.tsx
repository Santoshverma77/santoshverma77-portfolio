import { QUICK_REPLIES } from "@/data/santoshProfile";

const QuickReplies = ({
  onSelect,
  disabled,
}: {
  onSelect: (question: string) => void;
  disabled?: boolean;
}) => (
  <div className="flex gap-1.5 overflow-x-auto border-t border-border/60 px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {QUICK_REPLIES.map((q) => (
      <button
        key={q.label}
        type="button"
        disabled={disabled}
        onClick={() => onSelect(q.question)}
        className="shrink-0 rounded-full border border-border/60 px-2.5 py-1 text-[10px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
      >
        {q.label}
      </button>
    ))}
  </div>
);

export default QuickReplies;
