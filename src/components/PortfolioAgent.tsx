import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, Send, Sparkles, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

/** The model answers in plain text; strip stray markdown emphasis/bullet syntax. */
const clean = (text: string) =>
  text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^\s*[*-]\s+/gm, "• ")
    .replace(/`{1,3}/g, "");

const SUGGESTIONS = [
  "Summarise my full-stack experience for a recruiter",
  "Write a short bio for a video editing client",
  "Which projects best fit a React internship?",
  "Draft a cold email pitching my reel editing work",
];

const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-agent`;

const PortfolioAgent = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

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
        const fallback =
          res.status === 429
            ? "Too many requests right now — please try again in a moment."
            : res.status === 402
            ? "AI credits are exhausted. Please top up to keep using the agent."
            : "Sorry, I couldn't answer that right now. Please try again.";
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: fallback };
          return next;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Network error — please check your connection and try again.",
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close portfolio agent" : "Ask the portfolio agent"}
        className="fixed bottom-40 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center hover:scale-105 transition-transform"
      >
        {open ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-56 right-4 sm:right-6 z-50 w-[min(24rem,calc(100vw-2rem))] h-[26rem] rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <header className="flex items-center gap-2 px-4 py-3 border-b border-border/60">
              <Bot className="w-4 h-4 text-primary" />
              <div className="leading-tight">
                <p className="text-xs font-medium">Portfolio Agent</p>
                <p className="text-[10px] text-muted-foreground">
                  Resume · projects · tailored answers
                </p>
              </div>
            </header>

            <div ref={scroller} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Ask anything about my resume, projects or creative work.
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-xs leading-relaxed whitespace-pre-wrap rounded-xl px-3 py-2 ${
                    m.role === "user"
                      ? "ml-auto max-w-[85%] bg-primary text-primary-foreground"
                      : "mr-auto max-w-[92%] bg-muted/60 text-foreground"
                  }`}
                >
                  {(m.role === "assistant" ? clean(m.content) : m.content) ||
                    (loading && i === messages.length - 1 ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : null)}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 px-3 py-3 border-t border-border/60"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my work…"
                aria-label="Ask the portfolio agent"
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAgent;
