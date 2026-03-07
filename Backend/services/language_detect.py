"""
Language detection: detect language of text.
Owned by: Voice & AI Processing Lead.
Contract: detect_language(text) -> language_code
"""
from typing import Optional

# Placeholder: for hackathon use a library (e.g. langdetect) or API (Google, Azure).


def detect_language(text: str) -> str:
    """
    Detect the language of the given text. Returns ISO 639-1 code (e.g. 'es', 'fr').
    Default to 'en' if detection fails or text is empty.
    """
    text = (text or "").strip()
    if not text:
        return "en"
    # TODO: Integrate langdetect or API
    # import langdetect; return langdetect.detect(text)
    return "en"
