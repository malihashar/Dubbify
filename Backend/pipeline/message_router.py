"""
Route messages between caller, agent, and receiver; maintain transcript history.
Owned by: Call Logic & Session Manager.
"""
import uuid
from typing import Optional, Callable, Any
import sys
from pathlib import Path
_ROOT = Path(__file__).resolve().parent.parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))
from shared.types import CallSession, TranscriptMessage, MessageSender  # noqa: E402
from .call_session import get_session

# Callback type for broadcasting transcript updates (e.g. to WebSocket)
OnTranscriptUpdate = Callable[[str, dict[str, Any]], None]
_transcript_listeners: list[OnTranscriptUpdate] = []


def add_message(
    session_id: str,
    sender: MessageSender,
    original_text: str,
    translated_text: Optional[str] = None,
    language_code: Optional[str] = None,
) -> Optional[TranscriptMessage]:
    """
    Add a message to the session transcript and notify listeners.
    Returns the created TranscriptMessage or None if session not found.
    """
    session = get_session(session_id)
    if not session:
        return None
    msg_id = f"msg_{uuid.uuid4().hex[:12]}"
    msg = TranscriptMessage(
        id=msg_id,
        session_id=session_id,
        sender=sender,
        original_text=original_text,
        translated_text=translated_text,
        language_code=language_code,
    )
    session.messages.append(msg)
    payload = {
        "id": msg.id,
        "sender": msg.sender.value,
        "original_text": msg.original_text,
        "translated_text": msg.translated_text,
        "language_code": msg.language_code,
    }
    for cb in _transcript_listeners:
        try:
            cb(session_id, payload)
        except Exception:
            pass
    return msg


def register_transcript_listener(callback: OnTranscriptUpdate) -> None:
    """Register a callback for transcript updates (e.g. WebSocket broadcast)."""
    _transcript_listeners.append(callback)


def unregister_transcript_listener(callback: OnTranscriptUpdate) -> None:
    """Unregister a transcript listener."""
    if callback in _transcript_listeners:
        _transcript_listeners.remove(callback)
