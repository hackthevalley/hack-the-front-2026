"use client";

import * as React from "react";
import {
  getPasswordValidationMessage,
  isValidEmail,
  isValidPhoneNumber,
  formatPhoneNumber,
} from "@/components/ui/validation";
import EyeIcon from "@/components/ui/EyeIcon";

export type TextFieldHandle = {
  /** Runs validation, updates the error message, returns whether the field is valid. */
  validate: () => boolean;
  /** Moves keyboard focus to the underlying input. */
  focus: () => void;
};

type TextFieldType = "text" | "email" | "password" | "number" | "tel";

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
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
  required?: boolean;
  type?: TextFieldType;
  /** Enforce the strength rule (8+ chars, a capital, a number). Use for sign-up, not login. */
  requireStrongPassword?: boolean;
  /** Hide the reveal control on password fields whose design does not include it. */
  showPasswordToggle?: boolean;
  /** For `type="number"`: minimum accepted value (inclusive). */
  min?: number;
  /** For `type="number"`: maximum accepted value (inclusive). */
  max?: number;
  errorMessages?: ErrorMessages;
  value?: string;
  onChange?: (value: string) => void;
  /** Fires whenever this field's error status changes, so a parent can track
   * section-wide validity (e.g. to disable a "Next" button) without polling. */
  onValidityChange?: (hasError: boolean) => void;
  className?: string;
  /** Visual theme. "default" is the existing gradient-label look; "application" is the plain
   * label-above-box look used by the application wizard; "auth" matches the LOGIN frame. */
  theme?: "default" | "application" | "auth";
};

const LABEL_GRADIENT =
  "linear-gradient(95.06deg, #F6C7FC -13.3%, #7839DC 113.68%)";

/** Horizontal two-color border gradient for the "application" theme. */
const APPLICATION_BORDER_GRADIENT =
  "linear-gradient(90deg, #c5c9e4 0%, #8288a1 100%)";

/** Matches the panel background the "application" theme field sits on
 * (see backgroundBook.tsx), so it can mask the gradient behind the field's
 * interior — border-radius + a gradient `background` clipped to border-box
 * renders correctly, unlike `border-image`, which ignores border-radius and
 * produces a hard rectangular seam at rounded corners. */
const APPLICATION_FIELD_BACKGROUND = "#312A82";

const APPLICATION_BORDER_GRADIENT_BACKGROUND = `linear-gradient(${APPLICATION_FIELD_BACKGROUND}, ${APPLICATION_FIELD_BACKGROUND}) padding-box, ${APPLICATION_BORDER_GRADIENT} border-box`;

/** Focused-state border: same horizontal gradient shape, reversed direction,
 * swapped to a slightly-darker-white -> white pair instead of the brand
 * colors — replaces the pink glow used on the "default" theme. */
const APPLICATION_FOCUS_BORDER_GRADIENT =
  "linear-gradient(270deg, rgba(255,255,255,0.6) 0%, #FFFFFF 100%)";

const APPLICATION_FOCUS_BORDER_GRADIENT_BACKGROUND = `linear-gradient(${APPLICATION_FIELD_BACKGROUND}, ${APPLICATION_FIELD_BACKGROUND}) padding-box, ${APPLICATION_FOCUS_BORDER_GRADIENT} border-box`;

function TextField(
  {
    name,
    placeholder = "",
    autoComplete,
    disabled = false,
    required = false,
    type = "text",
    requireStrongPassword = false,
    showPasswordToggle = true,
    min,
    max,
    errorMessages = {},
    value: controlledValue,
    onChange,
    onValidityChange,
    className = "",
    theme = "default",
  }: TextFieldProps,
  ref: React.Ref<TextFieldHandle>,
) {
  const [internalValue, setInternalValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    if (type === "password" && requireStrongPassword) {
      const passwordMessage = getPasswordValidationMessage(val);
      if (passwordMessage) {
        return errorMessages.invalid ?? passwordMessage;
      }
    }
    if (type === "number") {
      if (!/^\d+$/.test(trimmed)) {
        return errorMessages.invalid ?? `${name} must be a valid number.`;
      }
      const num = Number(trimmed);
      if (min !== undefined && num < min) {
        return errorMessages.invalid ?? `${name} must be ${min} or greater.`;
      }
      if (max !== undefined && num > max) {
        return errorMessages.invalid ?? `${name} must be ${max} or less.`;
      }
    }
    if (type === "tel" && !isValidPhoneNumber(trimmed)) {
      return errorMessages.invalid ?? "Please enter a valid 10-digit phone number.";
    }
    return null;
  }

  function validate(): boolean {
    const message = computeError(value);
    setError(message);
    onValidityChange?.(message !== null);
    return message === null;
  }

  React.useImperativeHandle(ref, () => ({
    validate,
    focus: () => inputRef.current?.focus(),
  }));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next =
      type === "number"
        ? event.target.value.replace(/[^\d]/g, "")
        : type === "tel"
          ? formatPhoneNumber(event.target.value.replace(/\D/g, ""))
          : event.target.value;
    setInternalValue(next);
    onChange?.(next);

    // Clear the error once the field becomes valid again.
    if (error && !computeError(next)) {
      setError(null);
      onValidityChange?.(false);
    }
  }

  // Numeric fields stay a plain text input (with a numeric keyboard hint via
  // inputMode) rather than type="number", since native number inputs allow
  // "e", "+", "-", and "." to be typed even though our validation treats the
  // field as a non-negative integer.
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type === "number"
      ? "text"
      : type;

  const isApplicationTheme = theme === "application";
  const isAuthTheme = theme === "auth";

  // Keep the minimum at 16px: anything smaller makes iOS Safari zoom the page
  // when the field is focused on mobile.
  const inputSizeClass = isAuthTheme
    ? ""
    : "text-[clamp(16px,1.2vw,21px)]";

  return (
    <div
      className={`w-full font-figtree ${isAuthTheme ? "h-full" : ""} ${className}`}
    >
      {isApplicationTheme && (
        <span className="mb-1.5 block text-[clamp(13px,1vw,16px)] font-normal text-white/80">
          {name}
        </span>
      )}
      <label
        htmlFor={fieldId}
        className={`
          group relative flex items-center
          bg-transparent
          transition-[border-color,box-shadow] duration-300 ease-out
          ${
            isAuthTheme
              ? "h-full gap-[3.85cqw] rounded-[34.31cqh] border-[2.573cqh] border-white px-[3.85cqw] py-[11cqh]"
              : isApplicationTheme
              ? "h-11.75 gap-2.5 rounded-[10px] border-0 px-5 py-2.5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
              : "gap-3 rounded-[clamp(16px,1.6vw,24px)] border-2 border-white px-[clamp(16px,1.6vw,28px)] py-[clamp(12px,1.2vw,20px)] focus-within:border-[#F6C7FC] focus-within:shadow-[0_0_12px_2px_rgba(246,199,252,0.55)]"
          }
        `}
      >
        {isApplicationTheme && (
          <>
            {/* Base + focus border gradients are stacked layers that crossfade via
             * opacity, since `background` can't be transitioned between two
             * different gradients. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[10px] border-2 border-transparent"
              style={{ background: APPLICATION_BORDER_GRADIENT_BACKGROUND }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[10px] border-2 border-transparent opacity-0 transition-opacity duration-300 ease-out group-focus-within:opacity-100"
              style={{
                background: APPLICATION_FOCUS_BORDER_GRADIENT_BACKGROUND,
              }}
            />
          </>
        )}
        <div
          className={`relative z-10 min-w-0 flex-1 ${
            isAuthTheme ? "flex h-full flex-col justify-center" : ""
          }`}
        >
          {!isApplicationTheme && (
            <span
              className={`block ${
                isAuthTheme
                  ? "font-semibold leading-[normal] text-[#F6C7FC]"
                  : "bg-clip-text text-[clamp(14px,1.2vw,20px)] font-normal leading-tight text-transparent"
              }`}
              style={
                isAuthTheme
                  ? { fontSize: "max(14px,24.02cqh)" }
                  : { backgroundImage: LABEL_GRADIENT }
              }
            >
              {name}
            </span>
          )}

          <input
            ref={inputRef}
            id={fieldId}
            name={name}
            type={inputType}
            autoComplete={autoComplete}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onBlur={validate}
            placeholder={placeholder}
            required={required}
            inputMode={
              type === "number" ? "numeric" : type === "tel" ? "tel" : undefined
            }
            pattern={type === "number" ? "[0-9]*" : undefined}
            // Backs up the JS truncation in handleChange with a hard DOM cap —
            // on mobile keyboards, an input event can render a keystroke before
            // React's controlled-value re-render catches up and trims it.
            maxLength={type === "tel" ? 12 : undefined}
            aria-invalid={error !== null}
            aria-describedby={error ? errorId : undefined}
            className={`
              w-full bg-transparent outline-none font-figtree disabled:cursor-not-allowed disabled:text-white/60
              font-normal leading-[clamp(30px,2.6vw,44px)] text-white
              placeholder:tracking-normal
              ${
                isAuthTheme
                  ? "auth-autofill-input mt-0 text-[#EAEFFF] placeholder:text-[#EAEFFF]"
                  : isApplicationTheme
                    ? "mt-0 placeholder:text-white/40"
                    : "mt-1 placeholder:text-[#EAEFFF]"
              }
              ${inputSizeClass}
            `}
          />
        </div>

        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            // Negative margin keeps the icon in place while enlarging the tap
            // target to a comfortable size for touch.
            className="relative z-10 shrink-0 -m-2 flex items-center justify-center p-2 text-white outline-none focus-visible:opacity-70"
          >
            <EyeIcon
              open={isAuthTheme ? !showPassword : showPassword}
              className={
                isAuthTheme
                  ? "h-[24.878cqh] w-[5.051cqw]"
                  : "h-[clamp(16px,1.5vw,24px)] w-auto"
              }
            />
          </button>
        )}
      </label>

      {/* Auth layouts render their visible error separately, so keep this copy
       * available only to assistive technology. Other themes reserve space to
       * prevent validation from shifting nearby content. */}
      {isAuthTheme ? (
        error ? (
          <p id={errorId} className="sr-only">
            {error}
          </p>
        ) : null
      ) : (
        <p
          id={errorId}
          role="alert"
          aria-hidden={error === null}
          className={`mt-[clamp(8px,0.8vw,12px)] text-[clamp(12px,1.06vw,16px)] text-[#FFDADA] ${
            isApplicationTheme ? "pl-5" : "pl-[clamp(16px,1.6vw,28px)]"
          } ${error ? "" : "invisible"}`}
        >
          {error ?? " "}
        </p>
      )}
    </div>
  );
}

export default React.forwardRef(TextField);
