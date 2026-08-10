import { memo } from "react";

export type ChatRole = "user" | "assistant";

/** The model answers in plain text; strip stray markdown syntax and linkify URLs. */
const clean = (text: string) =>
  text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^\s*[*-]\s+/gm, "• ")
    .replace(/`{1,3}/g, "");

const URL_RE = /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?])/g;

const linkify = (text: string) =>
  text.split(URL_RE).map((part, i) =>
    URL_RE.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-primary underline underline-offset-2 break-all"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

const ChatMessage = ({ role, content }: { role: ChatRole; content: string }) => {
  if (role === "user") {
    return (
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-xs leading-relaxed text-primary-foreground whitespace-pre-wrap">
        {content}
      </div>
    );
  }

  return (
    <div className="mr-auto max-w-[92%] text-xs leading-relaxed text-foreground whitespace-pre-wrap">
      {linkify(clean(content))}
    </div>
  );
};

export default memo(ChatMessage);
