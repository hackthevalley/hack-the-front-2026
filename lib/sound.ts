const CHIME_SRC = "/sounds/faq-chime.mp3";

const CHIME_VOLUME = 0.22;

const MIN_INTERVAL_MS = 350;

export const SOUND_PREFERENCE_KEY = "htv:sound";

let element: HTMLAudioElement | null = null;
let lastPlayedAt = 0;

export function isSoundMuted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(SOUND_PREFERENCE_KEY) === "off";
  } catch {
    return false;
  }
}

export function setSoundMuted(muted: boolean): void {
  try {
    window.localStorage.setItem(SOUND_PREFERENCE_KEY, muted ? "off" : "on");
  } catch {
  }
  if (muted && element) {
    element.pause();
    element.currentTime = 0;
  }
}

export function playChime(): void {
  if (typeof window === "undefined") return;
  if (isSoundMuted()) return;

  const now = Date.now();
  if (now - lastPlayedAt < MIN_INTERVAL_MS) return;
  lastPlayedAt = now;

  if (!element) {
    element = new Audio(CHIME_SRC);
    element.preload = "auto";
    element.volume = CHIME_VOLUME;
  }

  element.currentTime = 0;
  void element.play().catch(() => {});
}
