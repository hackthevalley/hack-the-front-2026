/** Shared, pure form-field validators. */

/** True when `value` looks like a valid email address. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

/** Returns the first unmet password requirement, or `null` when valid. */
export function getPasswordValidationMessage(value: string): string | null {
  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`;
  }
  if (value.length > PASSWORD_MAX_LENGTH) {
    return `Password must be at most ${PASSWORD_MAX_LENGTH} characters long.`;
  }
  if (!/[A-Z]/.test(value)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(value)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/\d/.test(value)) {
    return "Password must contain at least one number.";
  }
  return null;
}

/** Mirrors the backend password policy. */
export function isValidPassword(value: string): boolean {
  return getPasswordValidationMessage(value) === null;
}

/** True when `value` contains exactly 10 digits (US phone number, formatting ignored). */
export function isValidPhoneNumber(value: string): boolean {
  return /^\d{10}$/.test(value.replace(/\D/g, ""));
}

/** Formats up to 10 raw digits as `XXX-XXX-XXXX`, growing the dashes in as the user types. */
export function formatPhoneNumber(digits: string): string {
  const truncated = digits.slice(0, 10);
  const parts = [
    truncated.slice(0, 3),
    truncated.slice(3, 6),
    truncated.slice(6, 10),
  ].filter(Boolean);
  return parts.join("-");
}

export type ProfilePlatform = "GitHub" | "LinkedIn" | "Devpost";

const PROFILE_HOSTS: Record<ProfilePlatform, string> = {
  GitHub: "github.com",
  LinkedIn: "linkedin.com",
  Devpost: "devpost.com",
};

/** Returns a platform-specific error for malformed or wrong-domain profile URLs. */
export function getProfileUrlValidationMessage(
  value: string,
  platform: ProfilePlatform,
): string | null {
  let url: URL;

  try {
    url = new URL(value.trim());
  } catch {
    return `Enter a valid ${platform} URL, including https://.`;
  }

  const expectedHost = PROFILE_HOSTS[platform];
  const hostname = url.hostname.toLowerCase();
  const isExpectedHost =
    hostname === expectedHost ||
    hostname === `www.${expectedHost}` ||
    (platform !== "GitHub" && hostname.endsWith(`.${expectedHost}`));
  const hasProfilePath = url.pathname.split("/").some(Boolean);

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    !isExpectedHost ||
    !hasProfilePath
  ) {
    return `Enter a valid ${platform} profile URL on ${expectedHost}.`;
  }

  return null;
}
