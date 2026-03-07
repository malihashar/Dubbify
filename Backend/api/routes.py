"""
REST endpoints for the Multilingual Call Relay.
Owned by: Backend API Lead.
Endpoints: POST /process-audio, POST /translate-response, GET /session/{id}, POST /session (create).
"""
import base64
from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

import sys
from pathlib import Path
_BACKEND = Path(__file__).resolve().parent.parent
_ROOT = _BACKEND.parent
for _p in (_ROOT, str(_BACKEND)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

from pipeline.call_session import create_session, get_session_state, get_session  # noqa: E402
from pipeline.message_router import add_message  # noqa: E402
from shared.types import SessionStatus, MessageSender  # noqa: E402
from services.speech_to_text import transcribe_audio  # noqa: E402
from services.language_detect import detect_language  # noqa: E402
from services.translate import translate_text  # noqa: E402
from services.text_to_speech import generate_speech  # noqa: E402

router = APIRouter()


# --- Request/response models ---
class ProcessAudioBody(BaseModel):
    session_id: str
    audio_base64: Optional[str] = None


class TranslateResponseBody(BaseModel):
    session_id: str
    english_text: str


class CreateSessionBody(BaseModel):
    receiver_language: str = "en"


# --- Process caller audio: STT -> detect lang -> translate to English -> add message ---
@router.post("/process-audio")
async def process_audio(body: ProcessAudioBody):
    session_id = body.session_id
    session = get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    audio_b64 = body.audio_base64 or ""
    if not audio_b64:
        raise HTTPException(status_code=400, detail="audio_base64 required")
    try:
        audio_bytes = base64.b64decode(audio_b64)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid base64 audio")
    original_text = transcribe_audio(audio_bytes)
    if not original_text:
        return {"session_id": session_id, "original_text": "", "translated_text": "", "detected_language": "en"}
    detected_lang = detect_language(original_text)
    translated_text = translate_text(original_text, "en", source_language=detected_lang)
    msg = add_message(session_id, MessageSender.CALLER, original_text, translated_text=translated_text, language_code=detected_lang)
    if session.caller_language is None:
        session.caller_language = detected_lang
    return {
        "session_id": session_id,
        "original_text": original_text,
        "translated_text": translated_text,
        "detected_language": detected_lang,
        "message_id": msg.id if msg else None,
    }


# --- Translate receiver response to caller language and optionally TTS ---
@router.post("/translate-response")
async def translate_response(body: TranslateResponseBody):
    session_id = body.session_id
    session = get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    target_lang = session.caller_language or "en"
    translated = translate_text(body.english_text, target_lang, source_language="en")
    add_message(session_id, MessageSender.RECEIVER, body.english_text, translated_text=translated, language_code="en")
    audio_bytes = generate_speech(translated, target_lang)
    audio_base64 = base64.b64encode(audio_bytes).decode("utf-8") if audio_bytes else None
    return {
        "session_id": session_id,
        "translated_text": translated,
        "target_language": target_lang,
        "audio_base64": audio_base64,
    }


# --- Get session state ---
@router.get("/session/{session_id}")
async def get_session_endpoint(session_id: str):
    state = get_session_state(session_id)
    if not state:
        raise HTTPException(status_code=404, detail="Session not found")
    return state


# --- Create session ---
@router.post("/session")
async def post_create_session(body: CreateSessionBody):
    session = create_session(receiver_language=body.receiver_language)
    return get_session_state(session.id)
