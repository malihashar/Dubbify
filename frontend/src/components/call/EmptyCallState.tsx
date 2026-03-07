"use client";

import { Phone } from "lucide-react";

type EmptyCallStateProps = {
  children?: React.ReactNode;
};

/**
 * EmptyCallState - Displayed when there is no active call.
 * Shows a muted phone icon with "No Active Call" messaging.
 */
export function EmptyCallState({ children }: EmptyCallStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <div className="w-full max-w-md text-center">
        {/* Muted phone icon */}
        <div className="inline-flex items-center justify-center size-24 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
          <Phone className="size-12 text-gray-400 dark:text-gray-500" />
        </div>

        <h1 className="text-2xl mb-2 text-gray-900 dark:text-gray-100">No Active Call</h1>
        <p className="text-gray-500 dark:text-gray-400">Waiting for incoming calls...</p>
        {children}
      </div>
    </div>
  );
}
