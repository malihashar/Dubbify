"""
Supabase client and persistence for call sessions and messages.
Owned by: Database & Supabase Integration.
"""
import os
from typing import Any, Optional
from supabase import create_client, Client  # type: ignore

# Import shared types from repo root
import sys
from pathlib import Path
_ROOT = Path(__file__).resolve().parent.parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))
from shared.types import CallSession, TranscriptMessage, SessionStatus, MessageSender  # noqa: E402


def get_supabase_client() -> Client:
    """Initialize and return Supabase client. Uses SUPABASE_URL and SUPABASE_KEY from env."""
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key:
        raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY in environment.")
    return create_client(url, key)


def ensure_tables(client: Optional[Client] = None) -> None:
    """
    Ensure required tables exist. In production these would be created via migrations.
    For hackathon we document the expected schema; Supabase dashboard can create them.
    """
    # Schema (for reference; create in Supabase SQL editor if needed):
    # call_sessions: id (uuid/text), status (text), caller_language (text), receiver_language (text), created_at (timestamptz), ended_at (timestamptz)
    # messages: id (uuid/text), session_id (fk), sender (text), original_text (text), translated_text (text), language_code (text), created_at (timestamptz)
    pass


def insert_session(client: Client, session: CallSession) -> None:
    """Insert a call session into call_sessions table."""
    row: dict[str, Any] = {
        "id": session.id,
        "status": session.status.value,
        "caller_language": session.caller_language,
        "receiver_language": session.receiver_language,
        "created_at": session.created_at,
        "ended_at": session.ended_at,
    }
    client.table("call_sessions").insert(row).execute()


def update_session_status(client: Client, session_id: str, status: SessionStatus) -> None:
    """Update session status."""
    client.table("call_sessions").update({"status": status.value}).eq("id", session_id).execute()


def insert_message(client: Client, msg: TranscriptMessage) -> None:
    """Insert a message into messages table."""
    row: dict[str, Any] = {
        "id": msg.id,
        "session_id": msg.session_id,
        "sender": msg.sender.value,
        "original_text": msg.original_text,
        "translated_text": msg.translated_text,
        "language_code": msg.language_code,
        "created_at": msg.timestamp,
    }
    client.table("messages").insert(row).execute()


def get_session(client: Client, session_id: str) -> Optional[dict[str, Any]]:
    """Fetch session by id. Returns raw dict or None."""
    r = client.table("call_sessions").select("*").eq("id", session_id).execute()
    if r.data and len(r.data) > 0:
        return r.data[0]
    return None


def get_messages_for_session(client: Client, session_id: str) -> list[dict[str, Any]]:
    """Fetch all messages for a session, ordered by created_at."""
    r = client.table("messages").select("*").eq("session_id", session_id).order("created_at").execute()
    return r.data or []
