import { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { IDENTITY } from "@/data/santoshProfile";

/** The chat panel (and its streaming logic) only loads once the visitor opens it. */
const ChatWindow = lazy(() => import("@/components/ChatWindow"));

const PortfolioAI = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Santosh AI" : `Open ${IDENTITY.assistantName}, ${IDENTITY.assistantRole}`}
        aria-expanded={open}
        className="fixed bottom-40 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Suspense fallback={null}>
              <ChatWindow onClose={() => setOpen(false)} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAI;
