"use client";

import { ANKIT_SYSTEM } from "@/lib/ankit-system";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const MODEL = "meta/llama-3.3-70b-instruct";
const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";

const SUGGESTIONS = [
  "Why should I hire Ankit?",
  "Tell me about the sleep detection project in depth",
  "How does the malware classifier work?",
  "What's his strongest technical skill?",
  "Is he available — how do I contact him?",
  "What did he do in his Diploma?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! 👋 I'm **ANKIT GPT** — your AI guide to Ankit's work. Ask me about his projects, skills, or how to get in touch!",
};

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br />");
}

export default function AnkitGPT() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    const history = next.filter((m) => m !== GREETING);

    try {
      const apiKey = process.env.NEXT_PUBLIC_NVIDIA_API_KEY;
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "API key not configured. Please add `NEXT_PUBLIC_NVIDIA_API_KEY` to your environment." },
        ]);
        return;
      }

      const res = await fetch(`${NVIDIA_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: ANKIT_SYSTEM }, ...history],
          stream: true,
          max_tokens: 600,
          temperature: 0.7,
        }),
      });

      if (!res.ok || !res.body) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Hmm, something went wrong. Please try again." },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let reply = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === "data: [DONE]") continue;
          if (trimmed.startsWith("data: ")) {
            try {
              const json = JSON.parse(trimmed.slice(6));
              const chunk = json.choices?.[0]?.delta?.content ?? "";
              if (chunk) {
                reply += chunk;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: reply };
                  return updated;
                });
              }
            } catch {
              // skip malformed SSE lines
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error — check your network or API key." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([GREETING]);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-[9998] flex flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{
              width: "min(420px, calc(100vw - 2rem))",
              height: "min(560px, calc(100dvh - 8rem))",
              border: "1px solid rgba(0,255,159,0.15)",
              background: "#070c14",
              boxShadow: "0 0 60px rgba(0,255,159,0.1), 0 24px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div
              className="flex shrink-0 items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(0,255,159,0.1)" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="grid h-8 w-8 place-items-center rounded-lg"
                  style={{ background: "linear-gradient(135deg, #00ff9f, #ff1a6b)" }}
                >
                  <Bot size={16} className="text-black" />
                </div>
                <div>
                  <p className="font-display font-black text-sm tracking-wide" style={{ color: "#00ff9f" }}>
                    ANKIT GPT
                  </p>
                  <p className="font-mono text-[10px]" style={{ color: "#414d63" }}>
                    Powered by NVIDIA NIM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  className="grid h-7 w-7 place-items-center rounded-lg transition-all"
                  style={{ color: "#414d63" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#7885a0"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#414d63"; }}
                  title="Reset conversation"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-7 w-7 place-items-center rounded-lg transition-all"
                  style={{ color: "#414d63" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ff1a6b"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#414d63"; }}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="mr-2 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md"
                      style={{ background: "linear-gradient(135deg, #00ff9f30, #ff1a6b30)", border: "1px solid rgba(0,255,159,0.2)" }}
                    >
                      <Bot size={11} style={{ color: "#00ff9f" }} />
                    </div>
                  )}
                  <div
                    className="max-w-[82%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: "rgba(0,255,159,0.12)",
                            border: "1px solid rgba(0,255,159,0.2)",
                            color: "#eef2ff",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#c0cce0",
                          }
                    }
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                  />
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
                    style={{ background: "rgba(0,255,159,0.1)", border: "1px solid rgba(0,255,159,0.2)" }}
                  >
                    <Bot size={11} style={{ color: "#00ff9f" }} />
                  </div>
                  <div
                    className="flex items-center gap-1 rounded-xl px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ background: "#00ff9f", animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggestions — shown only on first message */}
              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-1.5 pt-1"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider px-1" style={{ color: "#414d63" }}>
                    Try asking
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-xs transition-all duration-150"
                      style={{
                        border: "1px solid rgba(0,255,159,0.12)",
                        background: "rgba(0,255,159,0.04)",
                        color: "#7885a0",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(0,255,159,0.08)";
                        el.style.borderColor = "rgba(0,255,159,0.25)";
                        el.style.color = "#00ff9f";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(0,255,159,0.04)";
                        el.style.borderColor = "rgba(0,255,159,0.12)";
                        el.style.color = "#7885a0";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="shrink-0 p-3"
              style={{ borderTop: "1px solid rgba(0,255,159,0.08)" }}
            >
              <div
                className="flex items-end gap-2 rounded-xl p-2"
                style={{ border: "1px solid rgba(0,255,159,0.15)", background: "rgba(0,255,159,0.03)" }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything about Ankit…"
                  rows={1}
                  disabled={loading}
                  className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-fg-subtle text-fg leading-relaxed"
                  style={{ maxHeight: "100px", overflowY: "auto" }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-all duration-150"
                  style={{
                    background: input.trim() && !loading ? "#00ff9f" : "rgba(0,255,159,0.12)",
                    boxShadow: input.trim() && !loading ? "0 0 16px rgba(0,255,159,0.4)" : "none",
                  }}
                >
                  <ArrowUp size={14} style={{ color: input.trim() && !loading ? "#020306" : "#414d63" }} />
                </button>
              </div>
              <p className="mt-1.5 text-center font-mono text-[10px]" style={{ color: "#2a3448" }}>
                Press Enter to send · Shift+Enter for newline
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger — label + button stacked */}
      <div className="fixed bottom-5 right-4 z-[9998] flex flex-col items-end gap-2">
        {/* Label — hidden when panel is open */}
        <AnimatePresence>
          {!open && (
            <motion.div
              key="label"
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: "rgba(7,12,20,0.92)",
                border: "1px solid rgba(0,255,159,0.2)",
                boxShadow: "0 0 16px rgba(0,255,159,0.12)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: "#00ff9f" }}
              />
              <span
                className="font-display font-semibold text-xs whitespace-nowrap"
                style={{ color: "#c0cce0" }}
              >
                Talk more about Ankit &amp; his Projects
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2.5 rounded-full shadow-lg"
          style={{
            background: open
              ? "rgba(255,26,107,0.15)"
              : "linear-gradient(135deg, #00ff9f, #ff1a6b)",
            border: open ? "1px solid rgba(255,26,107,0.3)" : "none",
            padding: open ? "10px 18px" : "12px 20px",
            boxShadow: open
              ? "0 0 20px rgba(255,26,107,0.25)"
              : "0 0 28px rgba(0,255,159,0.45), 0 8px 24px rgba(0,0,0,0.4)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          aria-label={open ? "Close ANKIT GPT" : "Open ANKIT GPT"}
        >
          {open ? (
            <>
              <X size={16} style={{ color: "#ff1a6b" }} />
              <span className="font-display font-bold text-sm" style={{ color: "#ff1a6b" }}>Close</span>
            </>
          ) : (
            <>
              <Bot size={17} className="text-black" />
              <span className="font-display font-black text-sm text-black tracking-wide">ANKIT GPT</span>
            </>
          )}
        </motion.button>
      </div>
    </>
  );
}
