"""
WebSocket handler for real-time transcript updates.
Owned by: Backend API Lead.
"""
import json
from typing import Dict, Set
from fastapi import WebSocket

import sys
from pathlib import Path
_BACKEND = Path(__file__).resolve().parent.parent
_ROOT = _BACKEND.parent
if str(_BACKEND) not in sys.path:
    sys.path.insert(0, str(_BACKEND))
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from pipeline.message_router import register_transcript_listener, unregister_transcript_listener  # noqa: E402
from shared.constants import WS_MSG_TRANSCRIPT_UPDATE, WS_MSG_SESSION_STATUS, WS_MSG_ERROR  # noqa: E402

# Session id -> set of WebSocket connections subscribed to that session
_subscriptions: Dict[str, Set[WebSocket]] = {}


def _broadcast(session_id: str, payload: dict) -> None:
    """Send payload to all clients subscribed to session_id."""
    for ws in _subscriptions.get(session_id, set()).copy():
        try:
            ws.send_json(payload)
        except Exception:
            pass


def _on_transcript(session_id: str, message_payload: dict) -> None:
    _broadcast(session_id, {"type": WS_MSG_TRANSCRIPT_UPDATE, "session_id": session_id, "message": message_payload})


# Register with message_router so new messages trigger WebSocket broadcast
register_transcript_listener(_on_transcript)


async def websocket_endpoint(websocket: WebSocket) -> None:
    """Handle WebSocket connection. Client sends { 'action': 'subscribe', 'session_id': '...' }."""
    await websocket.accept()
    current_session: str | None = None

    try:
        while True:
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
            except json.JSONDecodeError:
                await websocket.send_json({"type": WS_MSG_ERROR, "error": "Invalid JSON"})
                continue
            action = msg.get("action")
            session_id = msg.get("session_id")
            if action == "subscribe" and session_id:
                if current_session:
                    _subscriptions.get(current_session, set()).discard(websocket)
                _subscriptions.setdefault(session_id, set()).add(websocket)
                current_session = session_id
                await websocket.send_json({"type": WS_MSG_SESSION_STATUS, "status": "subscribed", "session_id": session_id})
            elif action == "unsubscribe" and current_session:
                _subscriptions.get(current_session, set()).discard(websocket)
                current_session = None
    except Exception:
        pass
    finally:
        if current_session:
            _subscriptions.get(current_session, set()).discard(websocket)
