import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { Bot, X, Send, RotateCcw, Square } from "lucide-react";

const STORAGE_KEY = "aihub-mimo-chat";
const SUGGESTIONS = ["Which tool should a beginner start with?", "Best free AI image tools?", "How do quizzes work here?"];

export function MimoChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, setMessages, status, stop, error } = useChat({
    id: "mimo",
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved) as UIMessage[]);
    } catch {}
  }, [setMessages]);

  useEffect(() => {
    if (status === "ready" || status === "error") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, status]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, status]);

  const busy = status === "submitted" || status === "streaming";
  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[min(600px,calc(100vh-8rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl sm:right-6">
          <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold leading-tight">Mimo</div>
              <div className="text-xs opacity-80">AI Hub assistant</div>
            </div>
            <button aria-label="New chat" title="New chat" onClick={() => { setMessages([]); localStorage.removeItem(STORAGE_KEY); }} className="rounded-md p-1.5 hover:bg-primary-foreground/15">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button aria-label="Close Mimo" onClick={() => setOpen(false)} className="rounded-md p-1.5 hover:bg-primary-foreground/15">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-muted-foreground">Hi! I'm Mimo 👋 Ask me anything about AI Hub — tools, lessons, learning paths, or your account.</p>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="block w-full rounded-xl border border-border px-3 py-2 text-left hover:bg-muted">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              if (!text) return null;
              return m.role === "user" ? (
                <div key={m.id} className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">{text}</div>
              ) : (
                <div key={m.id} className="prose prose-sm max-w-none text-foreground dark:prose-invert prose-a:text-primary">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex gap-1 py-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            )}
            {error && <p className="text-destructive">Sorry, Mimo couldn't answer. Please try again.</p>}
            <div ref={endRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-end gap-2 border-t border-border p-3">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Message Mimo…"
              className="max-h-32 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {busy ? (
              <button type="button" onClick={() => stop()} aria-label="Stop" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
                <Square className="h-4 w-4" />
              </button>
            ) : (
              <button type="submit" disabled={!input.trim()} aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40">
                <Send className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Mimo" : "Chat with Mimo"}
        className="fixed bottom-5 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-primary-foreground shadow-xl transition-transform hover:scale-105 sm:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && <span className="font-semibold">Mimo</span>}
      </button>
    </>
  );
}
