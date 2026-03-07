/**
 * Global call state for the agent dashboard.
 * View state: idle | active with sessionId.
 */

export type CallViewState =
  | { view: "idle" }
  | { view: "active"; sessionId: string };

export type TranscriptMessage = {
  id: string;
  sender: "caller" | "agent" | "receiver";
  original_text: string;
  translated_text: string | null;
  language_code: string | null;
  timestamp?: string | null;
};

export type SessionStatus = "idle" | "active" | "ended";

export type SessionState = {
  id: string;
  status: SessionStatus;
  caller_language: string | null;
  receiver_language: string;
  messages: TranscriptMessage[];
  created_at?: string | null;
  ended_at?: string | null;
};

type CallState = {
  view: CallViewState;
  session: SessionState | null;
  wsConnected: boolean;
};

type CallActions = {
  setView: (view: CallViewState) => void;
  setSession: (session: SessionState | null) => void;
  appendMessage: (msg: TranscriptMessage) => void;
  setCallerLanguage: (lang: string) => void;
  setWsConnected: (connected: boolean) => void;
  reset: () => void;
};

const initialState: CallState = {
  view: { view: "idle" },
  session: null,
  wsConnected: false,
};

export function createCallStore() {
  let state: CallState = { ...initialState };
  const listeners = new Set<() => void>();

  function getState() {
    return state;
  }

  function setState(partial: Partial<CallState>) {
    state = { ...state, ...partial };
    listeners.forEach((l) => l());
  }

  const actions: CallActions = {
    setView(view) {
      setState({ view });
    },
    setSession(session) {
      setState({ session });
    },
    appendMessage(msg) {
      if (!state.session) return;
      setState({
        session: {
          ...state.session,
          messages: [...state.session.messages, msg],
        },
      });
    },
    setCallerLanguage(caller_language) {
      if (!state.session) return;
      setState({
        session: { ...state.session, caller_language },
      });
    },
    setWsConnected(wsConnected) {
      setState({ wsConnected });
    },
    reset() {
      state = { ...initialState };
      listeners.forEach((l) => l());
    },
  };

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getState, setState, ...actions, subscribe };
}

export const callStore = createCallStore();
