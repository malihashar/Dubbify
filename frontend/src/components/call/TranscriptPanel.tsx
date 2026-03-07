"use client";

import type { TranscriptMessage } from "@/state/callStore";

export function TranscriptPanel({ messages }: { messages: TranscriptMessage[] }) {
  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {messages.length === 0 ? (
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Transcript will appear here. Caller speech is translated to English for the agent.
        </p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              padding: "0.75rem 1rem",
              background: msg.sender === "caller" ? "var(--bg-tertiary)" : "var(--bg-secondary)",
              borderRadius: "var(--radius)",
              borderLeft: `4px solid ${
                msg.sender === "caller" ? "var(--accent)" : msg.sender === "receiver" ? "var(--success)" : "var(--text-muted)"
              }`,
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              {msg.sender}
              {msg.language_code && ` · ${msg.language_code}`}
            </div>
            {msg.translated_text && msg.translated_text !== msg.original_text && (
              <div style={{ marginBottom: "0.25rem", color: "var(--text-primary)" }}>
                {msg.translated_text}
              </div>
            )}
            <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              {msg.original_text}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
