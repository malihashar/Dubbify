"""
Shared constants for the Multilingual Call Relay System.
"""
# Default languages
DEFAULT_RECEIVER_LANGUAGE = "en"
SUPPORTED_CALLER_LANGUAGES = ["es", "fr", "zh", "ar", "hi", "pt", "de", "ja", "ko"]

# Session
SESSION_ID_PREFIX = "cs_"

# WebSocket message types
WS_MSG_TRANSCRIPT_UPDATE = "transcript_update"
WS_MSG_SESSION_STATUS = "session_status"
WS_MSG_ERROR = "error"

# API paths (for reference; actual routes in backend)
API_PROCESS_AUDIO = "/process-audio"
API_TRANSLATE_RESPONSE = "/translate-response"
API_SESSION = "/session"
