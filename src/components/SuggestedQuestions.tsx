import { SUGGESTED_QUESTIONS } from "@/data/santoshProfile";

const SuggestedQuestions = ({
  onSelect,
  disabled,
}: {
  onSelect: (question: string) => void;
  disabled?: boolean;
}) => (
  <div className="flex flex-wrap gap-2">
    {SUGGESTED_QUESTIONS.map((q) => (
      <button
        key={q}
        type="button"
        disabled={disabled}
        onClick={() => onSelect(q)}
        className="rounded-full border border-border/60 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
      >
        {q}
      </button>
    ))}
  </div>
);

export default SuggestedQuestions;
