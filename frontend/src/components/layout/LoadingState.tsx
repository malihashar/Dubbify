"use client";

export function LoadingState({ message = "Loading…" }: { message?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        color: "var(--text-muted)",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid var(--bg-tertiary)",
          borderTopColor: "var(--accent)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ marginTop: "1rem" }}>{message}</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
