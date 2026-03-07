"use client";

export function Header() {
  return (
    <header
      style={{
        padding: "1rem 1.5rem",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--bg-tertiary)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: "1.25rem" }}>Multilingual Call Relay</span>
      <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
        Agent dashboard
      </span>
    </header>
  );
}
