"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";

type ChatMessage = {
  id: string;
  text: string;
  from: "user" | "bot";
};

type ChatMode = "openai" | "local" | "local-fallback";

const STORAGE_KEY = "bm_chat_session";
const QUICK_ACTIONS = [
  "Ver catálogos",
  "¿Cubren mi localidad?",
  "Abrir cuenta",
  "Contacto comercial",
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getSessionId() {
  if (typeof window === "undefined") return "server-session";

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const id = window.crypto?.randomUUID?.() ?? createId();
  window.localStorage.setItem(STORAGE_KEY, id);
  return id;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [mode, setMode] = useState<ChatMode>("local");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      from: "bot",
      text: "Hola, soy el asistente de Buenimar. ¿En qué puedo ayudarte hoy?",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const sessionId = useMemo(() => getSessionId(), []);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isOpen]);

  async function sendMessage(presetText?: string) {
    const text = (presetText ?? input).trim();
    if (!text || isSending) return;

    const userMessage: ChatMessage = { id: createId(), text, from: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });

      const data = (await res.json()) as { reply?: string; mode?: ChatMode };
      const botText =
        data.reply?.trim() ||
        "No pude responder ahora. Escribinos por WhatsApp al +598 97 557 366.";

      if (data.mode) {
        setMode(data.mode);
      }

      setMessages((prev) => [...prev, { id: createId(), text: botText, from: "bot" }]);
    } catch (error) {
      console.error("Widget chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          from: "bot",
          text: "Ocurrió un error temporal. Escribinos por WhatsApp al +598 97 557 366.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div
      className={`fixed z-50 ${
        isOpen
          ? "left-2 right-2 bottom-2 md:left-auto md:right-4 md:bottom-24"
          : "right-4 bottom-44 md:bottom-40"
      }`}
    >
      {isOpen ? (
        <div
          className="w-full md:w-[360px] rounded-2xl border shadow-2xl overflow-hidden"
          style={{ background: "rgb(var(--panel))", borderColor: "rgb(var(--line))" }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: "rgb(var(--accent))", color: "white" }}
          >
            <div>
              <p className="font-semibold leading-tight">Asistente Buenimar</p>
              <p className="text-[11px] opacity-90">
                {mode === "openai" ? "Atención comercial automatizada" : "Modo gratis local"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Cerrar asistente"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          <div
            ref={listRef}
            className="h-[52dvh] min-h-[280px] max-h-[420px] md:h-[360px] md:min-h-0 md:max-h-none overflow-y-auto p-3 space-y-2"
            style={{ background: "rgb(var(--bg))" }}
          >
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 pb-1">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => void sendMessage(action)}
                    className="px-2.5 py-1.5 rounded-full text-xs border leading-tight"
                    style={{
                      borderColor: "rgba(220, 38, 38, 0.4)",
                      color: "rgb(var(--text))",
                      background: "rgba(220, 38, 38, 0.12)",
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.from === "user" ? "ml-auto" : "mr-auto"
                }`}
                style={{
                  background:
                    msg.from === "user"
                      ? "rgba(220, 38, 38, 0.18)"
                      : "rgb(var(--panel))",
                  color: "rgb(var(--text))",
                  border:
                    msg.from === "user"
                      ? "1px solid rgba(220, 38, 38, 0.35)"
                      : "1px solid rgb(var(--line))",
                }}
              >
                {msg.text}
              </div>
            ))}
            {isSending && (
              <div
                className="max-w-[85%] mr-auto px-3 py-2 rounded-xl text-sm"
                style={{
                  background: "rgb(var(--panel))",
                  border: "1px solid rgb(var(--line))",
                  color: "rgb(var(--muted))",
                }}
              >
                Un momento, ya te respondo...
              </div>
            )}
          </div>

          <div className="p-3 border-t" style={{ borderColor: "rgb(var(--line))" }}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Escribí tu consulta..."
                className="flex-1 px-3 py-2.5 rounded-xl border text-sm outline-none"
                style={{
                  background: "rgb(var(--bg))",
                  borderColor: "rgb(var(--line))",
                  color: "rgb(var(--text))",
                }}
                disabled={isSending}
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={isSending || !input.trim()}
                className="px-3.5 py-2.5 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "rgb(var(--accent))" }}
                aria-label="Enviar consulta"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-105 transition-transform"
          style={{ background: "rgb(var(--accent))" }}
          aria-label="Abrir asistente de Buenimar"
        >
          <FaRobot className="text-xl" />
        </button>
      )}
    </div>
  );
}
