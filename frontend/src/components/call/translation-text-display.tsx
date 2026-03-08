/**
 * Displays the latest translation text in a semi-transparent textbox.
 * Used on the TranslatePhoneCall screen during active calls.
 */
type TranslationTextDisplayProps = {
  text: string | null;
};

export function TranslationTextDisplay({ text }: TranslationTextDisplayProps) {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-4 mb-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Translation</p>
      <p className="text-base text-gray-900 dark:text-gray-100 min-h-[3rem]">
        {text || "Waiting for translation..."}
      </p>
    </div>
  );
}
