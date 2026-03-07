"use client";

/**
 * VoiceWaveAnimation - Animated sound wave bars that simulate real voice input.
 * Uses CSS animations with staggered delays for a natural waveform effect.
 */
export function VoiceWaveAnimation({ barCount = 5 }: { barCount?: number }) {
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          className="w-1 rounded-full bg-white animate-voice-wave"
          style={{
            animationDelay: `${i * 0.15}s`,
            height: "100%",
          }}
        />
      ))}
    </div>
  );
}
