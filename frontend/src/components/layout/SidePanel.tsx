"use client";

import { ReactNode } from "react";

export function SidePanel({ children }: { children: ReactNode }) {
  return (
    <aside
      style={{
        width: "280px",
        minWidth: "280px",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--bg-tertiary)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {children}
    </aside>
  );
}
