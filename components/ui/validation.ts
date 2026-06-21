/** Shared, pure form-field validators. */

/** True when `value` looks like a valid email address. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** True when `value` is at least 8 chars with an uppercase letter and a digit. */
export function isValidPassword(value: string): boolean {
  return value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value);
}
