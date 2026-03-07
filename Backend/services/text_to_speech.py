"""
Text-to-speech: generate audio from text for caller.
Owned by: Voice & AI Processing Lead.
Contract: generate_speech(text, language) -> audio_bytes
"""
from typing import Optional

# Placeholder: for hackathon use Google TTS, Azure, or ElevenLabs.


def generate_speech(text: str, language: str) -> bytes:
    """
    Generate speech audio from text in the given language (ISO 639-1).
    Returns raw audio bytes (e.g. MP3 or WAV).
    """
    text = (text or "").strip()
    if not text:
        return b""
    # TODO: Integrate TTS API
    # For demo, return empty bytes so API can return base64 or stream later
    return b""
