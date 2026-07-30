/** Shared, pure form-field validators. */

/** True when `value` looks like a valid email address. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** True when `value` is at least 8 chars with an uppercase letter and a digit. */
export function isValidPassword(value: string): boolean {
  return value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value);
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
