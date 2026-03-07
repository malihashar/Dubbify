"use client";

const languageNames: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  zh: "Chinese",
  ar: "Arabic",
  hi: "Hindi",
  pt: "Portuguese",
  de: "German",
  ja: "Japanese",
  ko: "Korean",
};

export function LanguageIndicator({
  callerLanguage,
  receiverLanguage = "en",
}: {
  callerLanguage: string | null;
  receiverLanguage?: string;
}) {
  const caller = callerLanguage ? languageNames[callerLanguage] ?? callerLanguage : "—";
  const receiver = languageNames[receiverLanguage] ?? receiverLanguage;
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        fontSize: "0.875rem",
        color: "var(--text-muted)",
      }}
    >
      <span>
        Caller: <strong style={{ color: "var(--text-primary)" }}>{caller}</strong>
      </span>
      <span>
        Receiver: <strong style={{ color: "var(--text-primary)" }}>{receiver}</strong>
      </span>
    </div>
  );
}
