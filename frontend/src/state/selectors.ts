/**
 * Derived UI state from call store.
 */
import type { CallViewState, SessionState, TranscriptMessage } from "./callStore";

export function selectCurrentTranscript(messages: TranscriptMessage[] | undefined): TranscriptMessage[] {
  return messages ?? [];
}

export function selectCallerLanguage(session: SessionState | null): string | null {
  return session?.caller_language ?? null;
}

export function selectSessionStatus(session: SessionState | null): string {
  return session?.status ?? "idle";
}

export function selectViewState(view: CallViewState): "idle" | "active" {
  return view.view;
}

export function selectActiveSessionId(view: CallViewState): string | null {
  return view.view === "active" ? view.sessionId : null;
}
