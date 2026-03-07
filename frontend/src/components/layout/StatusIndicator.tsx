"use client";

type Status = "idle" | "active" | "ended" | "connecting";

const statusConfig: Record<Status, { label: string; color: string }> = {
  idle: { label: "No call", color: "var(--text-muted)" },
  active: { label: "Call active", color: "var(--success)" },
  ended: { label: "Ended", color: "var(--warning)" },
  connecting: { label: "Connecting…", color: "var(--accent)" },
};

export function StatusIndicator({ status, wsConnected }: { status: Status; wsConnected?: boolean }) {
  const config = statusConfig[status];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: config.color,
          boxShadow: status === "active" ? `0 0 8px ${config.color}` : undefined,
        }}
      />
      <span style={{ color: "var(--text-muted)" }}>{config.label}</span>
      {wsConnected !== undefined && (
        <span style={{ color: wsConnected ? "var(--success)" : "var(--text-muted)", fontSize: "0.75rem" }}>
          {wsConnected ? "Live" : "Offline"}
        </span>
      )}
    </div>
  );
}
