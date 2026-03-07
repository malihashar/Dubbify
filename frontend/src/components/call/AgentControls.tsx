"use client";

import { useState } from "react";
import { translateResponse } from "@/services/api";

export function AgentControls({
  sessionId,
  onTranslated,
  disabled,
}: {
  sessionId: string;
  onTranslated?: (translatedText: string) => void;
  disabled?: boolean;
}) {
  const [receiverText, setReceiverText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    const text = receiverText.trim();
    if (!text || disabled) return;
    setLoading(true);
    setError(null);
    try {
      const res = await translateResponse(sessionId, text);
      onTranslated?.(res.translated_text);
      setReceiverText("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to translate");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem" }}>
      <label style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
        Receiver reply (English) → translated for caller
      </label>
      <textarea
        value={receiverText}
        onChange={(e) => setReceiverText(e.target.value)}
        placeholder="Type what the receiver said in English..."
        disabled={disabled}
        rows={3}
        style={{
          width: "100%",
          padding: "0.75rem",
          background: "var(--bg-secondary)",
          border: "1px solid var(--bg-tertiary)",
          borderRadius: "var(--radius)",
          color: "var(--text-primary)",
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || loading || !receiverText.trim()}
        style={{
          padding: "0.5rem 1rem",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius)",
          fontWeight: 600,
          opacity: disabled || loading ? 0.6 : 1,
        }}
      >
        {loading ? "Sending…" : "Send translated to caller"}
      </button>
      {error && <p style={{ fontSize: "0.875rem", color: "var(--error)" }}>{error}</p>}
    </div>
  );
}
