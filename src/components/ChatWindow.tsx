import { useEffect, useRef, useState } from "react";
import { Loader2, Send, X } from "lucide-react";
import { IDENTITY } from "@/data/santoshProfile";
import ChatMessage, { ChatRole } from "@/components/ChatMessage";
import SuggestedQuestions from "@/components/SuggestedQuestions";
import QuickReplies from "@/components/QuickReplies";
import AnswerFeedback from "@/components/AnswerFeedback";
import brandMark from "@/assets/brand-mark.png";

type Msg = { role: ChatRole; content: string };

const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-agent`;

const TypingIndicator = () => (
  <div className="mr-auto flex items-center gap-1 py-1" aria-label="Santosh AI is typing">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || loading) return;
    const history: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    const patchLast = (content: string) =>
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content };
        return next;
      });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        patchLast(
          res.status === 429
            ? "Too many requests right now — please try again in a moment."
            : res.status === 402
              ? "The assistant is temporarily unavailable. You can contact Santosh directly for more details."
              : "Sorry, I couldn't answer that right now. Please try again.",
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        patchLast(acc);
      }
    } catch {
      patchLast("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const streaming = loading && messages[messages.length - 1]?.content === "";

  return (
    <div
      role="dialog"
      aria-label={`${IDENTITY.assistantName} — ${IDENTITY.assistantRole}`}
      className="fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col overflow-hidden rounded-t-2xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-56 sm:right-6 sm:h-[30rem] sm:w-[min(25rem,calc(100vw-2rem))] sm:rounded-2xl"
    >
      <header className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
        <img
          src={brandMark}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 rounded-lg object-cover"
        />
        <div className="leading-tight">
          <p className="text-xs font-medium">{IDENTITY.assistantName}</p>
          <p className="text-[10px] text-muted-foreground">{IDENTITY.assistantRole}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="ml-auto rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-muted-foreground">{IDENTITY.greeting}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
              {IDENTITY.status}
            </p>
            <SuggestedQuestions onSelect={ask} disabled={loading} />
          </div>
        )}

        {messages.map((m, i) =>
          m.content ? (
            <div key={i}>
              <ChatMessage role={m.role} content={m.content} />
              {m.role === "assistant" && !(loading && i === messages.length - 1) && (
                <AnswerFeedback
                  question={messages[i - 1]?.role === "user" ? messages[i - 1].content : ""}
                  answer={m.content}
                />
              )}
            </div>
          ) : null,
        )}
        {streaming && <TypingIndicator />}
      </div>

      <QuickReplies onSelect={ask} disabled={loading} />



      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-end gap-2 border-t border-border/60 px-3 pb-24 pt-3 sm:pb-3"
      >
        <textarea
          ref={inputRef}
          value={input}
          rows={1}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(input);
            }
          }}
          placeholder="Ask about Santosh…"
          aria-label="Ask Santosh AI"
          className="max-h-24 flex-1 resize-none bg-transparent py-1.5 text-xs outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
