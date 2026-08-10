import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/** Thumbs up/down on an assistant answer, stored for later review. */
const AnswerFeedback = ({ question, answer }: { question: string; answer: string }) => {
  const [rating, setRating] = useState<1 | -1 | null>(null);
  const [saving, setSaving] = useState(false);

  const send = async (value: 1 | -1) => {
    if (rating !== null || saving) return;
    setSaving(true);
    const { error } = await supabase.from("assistant_feedback").insert({
      question: question.slice(0, 2000),
      answer: answer.slice(0, 8000),
      rating: value,
    });
    setSaving(false);
    if (!error) setRating(value);
  };

  if (rating !== null) {
    return (
      <p className="mt-1 text-[10px] text-muted-foreground/70">Thanks for the feedback!</p>
    );
  }

  return (
    <div className="mt-1 flex items-center gap-1">
      <button
        type="button"
        onClick={() => send(1)}
        disabled={saving}
        aria-label="Helpful answer"
        className="rounded-full p-1 text-muted-foreground/60 transition-colors hover:text-foreground disabled:opacity-50"
      >
        <ThumbsUp className="h-3 w-3" />
      </button>
      <button
        type="button"
        onClick={() => send(-1)}
        disabled={saving}
        aria-label="Unhelpful answer"
        className="rounded-full p-1 text-muted-foreground/60 transition-colors hover:text-foreground disabled:opacity-50"
      >
        <ThumbsDown className="h-3 w-3" />
      </button>
    </div>
  );
};

export default AnswerFeedback;
