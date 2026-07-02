"use client";

import * as React from "react";
import { isValidEmail, isValidPassword } from "@/components/ui/validation";
import EyeIcon from "@/components/ui/EyeIcon";

export type TextFieldHandle = {
  /** Runs validation, updates the error message, returns whether the field is valid. */
  validate: () => boolean;
};

type TextFieldType = "text" | "email" | "password";

/** Override the default validation messages. Any omitted key falls back to the default. */
type ErrorMessages = {
  /** Shown when `required` and the field is empty. Defaults to `"<name> is required."`. */
  required?: string;
  /** Shown when a non-empty value fails the email/password rule for this `type`. */
  invalid?: string;
};

type TextFieldProps = {
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: TextFieldType;
  /** Enforce the strength rule (8+ chars, a capital, a number). Use for sign-up, not login. */
  requireStrongPassword?: boolean;
  errorMessages?: ErrorMessages;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const LABEL_GRADIENT =
  "linear-gradient(95.06deg, #F6C7FC -13.3%, #7839DC 113.68%)";

function TextField(
  {
    name,
    placeholder = "",
    required = false,
    type = "text",
    requireStrongPassword = false,
    errorMessages = {},
    value: controlledValue,
    onChange,
    className = "",
  }: TextFieldProps,
  ref: React.Ref<TextFieldHandle>,
) {
  const [internalValue, setInternalValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const value = controlledValue ?? internalValue;
  const isPassword = type === "password";

  const fieldId = React.useId();
  const errorId = `${fieldId}-error`;

  function computeError(val: string): string | null {
    const trimmed = val.trim();
    if (required && !trimmed) {
      return errorMessages.required ?? `${name} is required.`;
    }
    if (!trimmed) return null;
    if (type === "email" && !isValidEmail(trimmed)) {
      return errorMessages.invalid ?? "Please enter a valid email.";
    }
    if (type === "password" && requireStrongPassword && !isValidPassword(val)) {
      return (
        errorMessages.invalid ??
        "Password must be at least 8 characters with a capital letter and a number."
      );
    }
    return null;
  }

  function validate(): boolean {
    const message = computeError(value);
    setError(message);
    return message === null;
  }

  React.useImperativeHandle(ref, () => ({ validate }));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    setInternalValue(next);
    onChange?.(next);

    // Clear the error once the field becomes valid again.
    if (error && !computeError(next)) setError(null);
  }

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  // Mask glyphs (•) render smaller than letters, so enlarge + space them out
  // while masked to match the visual weight of the normal text.
  // Keep the minimum at 16px: anything smaller makes iOS Safari zoom the page
  // when the field is focused on mobile.
  const isMasked = isPassword && !showPassword;
  const inputSizeClass = isMasked
    ? "text-[clamp(18px,1.6vw,28px)] tracking-[0.05em]"
    : "text-[clamp(16px,1.2vw,21px)]";

  return (
    <div className={`w-full font-figtree ${className}`}>
      <label
        htmlFor={fieldId}
        className="
          relative flex items-center gap-3
          rounded-[clamp(16px,1.6vw,24px)] border-2 border-white
          bg-transparent
          px-[clamp(16px,1.6vw,28px)] py-[clamp(12px,1.2vw,20px)]
        "
      >
        <div className="min-w-0 flex-1">
          <span
            className="block font-normal text-[clamp(14px,1.2vw,20px)] leading-tight bg-clip-text text-transparent"
            style={{ backgroundImage: LABEL_GRADIENT }}
          >
            {name}
          </span>

          <input
            id={fieldId}
            type={inputType}
            value={value}
            onChange={handleChange}
            onBlur={validate}
            placeholder={placeholder}
            required={required}
            aria-invalid={error !== null}
            aria-describedby={error ? errorId : undefined}
            className={`
              mt-1 w-full bg-transparent outline-none font-figtree
              font-normal leading-[clamp(30px,2.6vw,44px)] text-white
              placeholder:text-[#EAEFFF] placeholder:tracking-normal
              ${inputSizeClass}
            `}
          />
        </div>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            // Negative margin keeps the icon in place while enlarging the tap
            // target to a comfortable size for touch.
            className="shrink-0 -m-2 flex items-center justify-center p-2 text-white outline-none focus-visible:opacity-70"
          >
            <EyeIcon open={showPassword} className="h-[clamp(16px,1.5vw,24px)] w-auto" />
          </button>
        )}
      </label>

      {/* Always reserve space so showing an error doesn't shift content below. */}
      <p
        id={errorId}
        role="alert"
        aria-hidden={error === null}
        className={`mt-[clamp(8px,0.8vw,12px)] pl-[clamp(16px,1.6vw,28px)] text-[clamp(12px,1.06vw,16px)] text-[#FFDADA] ${
          error ? "" : "invisible"
        }`}
      >
        {error ?? " "}
      </p>
    </div>
  );
}

export default React.forwardRef(TextField);
