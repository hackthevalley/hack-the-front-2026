"use client";

import * as React from "react";
import Image from "next/image";

export type CheckboxHandle = {
  /** Runs validation, updates the error state, returns whether the field is valid. */
  validate: () => boolean;
};

type CheckboxProps = {
  /** Accessible name; also used in the default required error message. */
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  onValidityChange?: (hasError: boolean) => void;
  className?: string;
};

const FIELD_TINT = "rgba(234, 239, 255, 0.3)";
const BORDER_GRADIENT = "linear-gradient(90deg, #EAEFFF 0%, #9CA3AF 100%)";

/** Matches the panel background the checkbox sits on (see backgroundBook.tsx),
 * so it can mask the border gradient behind the interior tint — without this,
 * the translucent tint blends against the gradient instead of the page,
 * reading as solid/opaque instead of a light tint over the panel. */
const APPLICATION_FIELD_BACKGROUND = "#312A82";

const CHECKBOX_BACKGROUND = [
  `linear-gradient(${FIELD_TINT}, ${FIELD_TINT}) padding-box`,
  `linear-gradient(${APPLICATION_FIELD_BACKGROUND}, ${APPLICATION_FIELD_BACKGROUND}) padding-box`,
  `${BORDER_GRADIENT} border-box`,
].join(", ");

function Checkbox(
  {
    name,
    checked = false,
    onChange,
    required = false,
    onValidityChange,
    className = "",
  }: CheckboxProps,
  ref: React.Ref<CheckboxHandle>,
) {
  const [hasError, setHasError] = React.useState(false);

  function validate(): boolean {
    const invalid = required && !checked;
    setHasError(invalid);
    onValidityChange?.(invalid);
    return !invalid;
  }

  React.useImperativeHandle(ref, () => ({ validate }));

  function handleClick() {
    const next = !checked;
    onChange?.(next);
    if (hasError && next) {
      setHasError(false);
      onValidityChange?.(false);
    }
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={name}
      aria-invalid={hasError}
      onClick={handleClick}
      style={{ background: CHECKBOX_BACKGROUND }}
      className={`relative flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[10px] border border-transparent shadow-[0px_4px_4px_rgba(0,0,0,0.25)] outline-none transition-shadow duration-200 focus-visible:shadow-[0_0_0_2px_rgba(255,255,255,0.6)] ${
        hasError ? "shadow-[0_0_0_2px_#FFDADA]" : ""
      } ${className}`}
    >
      {checked && (
        <Image
          src="/application/checkmark.svg"
          alt=""
          width={32}
          height={32}
          className="pointer-events-none"
        />
      )}
    </button>
  );
}

export default React.forwardRef(Checkbox);
