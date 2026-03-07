"use client";

import { Phone, PhoneOff, Languages } from "lucide-react";

type IncomingCallStateProps = {
  phoneNumber: string;
  onAccept: () => void;
  onDecline: () => void;
  detectedLanguage?: string;
};

/**
 * IncomingCallState - Displayed when a call is ringing but not yet answered.
 * Animated phone icon, phone number card, accept/decline buttons.
 */
export function IncomingCallState({
  phoneNumber,
  onAccept,
  onDecline,
  detectedLanguage,
}: IncomingCallStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Animated ringing icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-24 rounded-full bg-blue-100 dark:bg-blue-900 mb-6 relative">
            <Phone className="size-12 text-blue-600 dark:text-blue-400" />
            <div className="absolute inset-0 rounded-full bg-blue-400 dark:bg-blue-600 animate-ping opacity-20" />
          </div>
          <h1 className="text-2xl mb-2 text-gray-900 dark:text-gray-100">Incoming Call</h1>
          <p className="text-gray-500 dark:text-gray-400">Ringing...</p>
        </div>

        {/* Phone number card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Calling from</p>
            <p className="text-3xl tracking-wide text-gray-900 dark:text-gray-100">{phoneNumber}</p>
          </div>
        </div>

        {/* Language detection badge */}
        {detectedLanguage && (
          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-full bg-amber-100 dark:bg-amber-900">
                <Languages className="size-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-amber-900 dark:text-amber-200">Foreign Language Detected</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">{detectedLanguage} identified</p>
              </div>
            </div>
          </div>
        )}

        {/* Accept / Decline buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onDecline}
            className="flex flex-col items-center justify-center py-6 rounded-2xl bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors cursor-pointer"
          >
            <PhoneOff className="size-8 mb-2" />
            <span className="text-sm">Decline</span>
          </button>

          <button
            onClick={onAccept}
            className="flex flex-col items-center justify-center py-6 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg transition-colors cursor-pointer"
          >
            <Phone className="size-8 mb-2" />
            <span className="text-sm">Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
}
