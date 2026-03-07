/**
 * WebSocket client for real-time transcript updates.
 */

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws";

export type TranscriptUpdateMessage = {
  id: string;
  sender: string;
  original_text: string;
  translated_text: string | null;
  language_code: string | null;
};

export type WsMessage =
  | { type: "transcript_update"; session_id: string; message: TranscriptUpdateMessage }
  | { type: "session_status"; status: string; session_id: string }
  | { type: "error"; error: string };

export function createSessionWebSocket(
  sessionId: string,
  onMessage: (msg: WsMessage) => void,
  onOpen?: () => void,
  onClose?: () => void
): WebSocket {
  const ws = new WebSocket(WS_URL);
  ws.onopen = () => {
    ws.send(JSON.stringify({ action: "subscribe", session_id: sessionId }));
    onOpen?.();
  };
  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data) as WsMessage;
      onMessage(msg);
    } catch {
      // ignore
    }
  };
  ws.onclose = () => onClose?.();
  ws.onerror = () => onClose?.();
  return ws;
}
