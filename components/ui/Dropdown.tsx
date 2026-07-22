"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export type DropdownHandle = {
  /** Runs validation, updates the error message, returns whether the field is valid. */
  validate: () => boolean;
};

/** Override the default validation message. */
type ErrorMessages = {
  /** Shown when `required` and no option is selected. Defaults to `"<name> is required."`. */
  required?: string;
};

type DropdownProps = {
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  errorMessages?: ErrorMessages;
  value?: string;
  onChange?: (value: string) => void;
  /** Fires whenever this field's error status changes, so a parent can track
   * section-wide validity (e.g. to disable a "Next" button) without polling. */
  onValidityChange?: (hasError: boolean) => void;
  className?: string;
};

/** Matches the panel background the field sits on (see backgroundBook.tsx), so
 * it can mask the gradient behind the field's interior — border-radius +
 * a gradient `background` clipped to border-box renders correctly, unlike
 * `border-image`, which ignores border-radius and produces a hard
 * rectangular seam at rounded corners. Same trick as TextField's
 * "application" theme, duplicated here to keep the two components
 * independent. */
const FIELD_BACKGROUND = "#312A82";

const BORDER_GRADIENT = "linear-gradient(90deg, #c5c9e4 0%, #8288a1 100%)";
const BORDER_GRADIENT_BACKGROUND = `linear-gradient(${FIELD_BACKGROUND}, ${FIELD_BACKGROUND}) padding-box, ${BORDER_GRADIENT} border-box`;

/** Focused/open-state border: same shape, reversed direction, swapped to a
 * slightly-darker-white -> white pair instead of the brand colors. */
const FOCUS_BORDER_GRADIENT =
  "linear-gradient(270deg, rgba(255,255,255,0.6) 0%, #FFFFFF 100%)";
const FOCUS_BORDER_GRADIENT_BACKGROUND = `linear-gradient(${FIELD_BACKGROUND}, ${FIELD_BACKGROUND}) padding-box, ${FOCUS_BORDER_GRADIENT} border-box`;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-[clamp(14px,1.2vw,18px)] w-auto shrink-0 text-white transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dropdown(
  {
    name,
    options,
    placeholder = "Select an Answer",
    required = false,
    errorMessages = {},
    value: controlledValue,
    onChange,
    onValidityChange,
    className = "",
  }: DropdownProps,
  ref: React.Ref<DropdownHandle>,
) {
  const [internalValue, setInternalValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const value = controlledValue ?? internalValue;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [listRect, setListRect] = React.useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const fieldId = React.useId();
  const errorId = `${fieldId}-error`;
  const listId = `${fieldId}-listbox`;

  function computeError(val: string): string | null {
    if (required && !val) {
      return errorMessages.required ?? `${name} is required.`;
    }
    return null;
  }

  function validate(): boolean {
    const message = computeError(value);
    setError(message);
    onValidityChange?.(message !== null);
    return message === null;
  }

  React.useImperativeHandle(ref, () => ({ validate }));

  React.useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        !containerRef.current?.contains(target) &&
        !listRef.current?.contains(target)
      ) {
        setOpen(false);
        validate();
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, value]);

  // The list is portaled to <body> so it can escape any scrollable/clipped
  // ancestor (e.g. the overflow-y-auto panels in backgroundBook.tsx); track
  // the trigger's viewport position ourselves since it's no longer a normal
  // absolutely-positioned descendant.
  React.useLayoutEffect(() => {
    if (!open) return;
    function updateRect() {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        setListRect({ top: rect.bottom + 6, left: rect.left, width: rect.width });
      }
    }
    updateRect();
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [open]);

  function selectOption(option: string) {
    setInternalValue(option);
    onChange?.(option);
    setOpen(false);

    if (error && !computeError(option)) {
      setError(null);
      onValidityChange?.(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false);
      validate();
    }
  }

  // Keep the minimum at 16px: anything smaller makes iOS Safari zoom the page
  // when the field is focused on mobile.
  const inputSizeClass = "text-[clamp(16px,1.2vw,21px)]";

  return (
    <div className={`w-full font-figtree ${className}`} ref={containerRef}>
      <span className="mb-1.5 block text-[clamp(13px,1vw,16px)] font-normal text-white/80">
        {name}
      </span>

      <div className="relative" onKeyDown={handleKeyDown}>
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-invalid={error !== null}
          aria-describedby={error ? errorId : undefined}
          onClick={() => setOpen((prev) => !prev)}
          onBlur={() => {
            if (!open) validate();
          }}
          className={`
            group relative flex h-[47px] w-full items-center justify-between
            gap-2.5 rounded-[10px] border-0 bg-transparent px-5 py-2.5
            text-left shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
            transition-[border-color,box-shadow] duration-300 ease-out
          `}
        >
          {/* Base + focus border gradients are stacked layers that crossfade via
           * opacity, since `background` can't be transitioned between two
           * different gradients. */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 rounded-[10px] border-2 border-transparent transition-opacity duration-300 ease-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
            style={{ background: BORDER_GRADIENT_BACKGROUND }}
          />
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 rounded-[10px] border-2 border-transparent transition-opacity duration-300 ease-out ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: FOCUS_BORDER_GRADIENT_BACKGROUND }}
          />

          <span
            className={`relative z-10 min-w-0 flex-1 truncate font-normal leading-[clamp(30px,2.6vw,44px)] ${inputSizeClass} ${
              value ? "text-white" : "text-white/40"
            }`}
          >
            {value || placeholder}
          </span>
          <span className="relative z-10">
            <ChevronIcon open={open} />
          </span>
        </button>

        {open &&
          listRect &&
          createPortal(
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={fieldId}
              className="fixed z-20 max-h-60 overflow-y-auto rounded-[10px] border-2 border-transparent p-1.5 shadow-[0px_4px_10px_rgba(0,0,0,0.35)]"
              style={{
                background: BORDER_GRADIENT_BACKGROUND,
                top: listRect.top,
                left: listRect.left,
                width: listRect.width,
              }}
            >
              {options.map((option) => (
                <li
                  key={option}
                  role="option"
                  aria-selected={option === value}
                  onMouseDown={(event) => {
                    // Prevent the trigger from blurring before the click
                    // registers, which would close the list first and drop it.
                    event.preventDefault();
                    selectOption(option);
                  }}
                  className={`
                    cursor-pointer rounded-[8px] px-[13px] py-2 font-figtree
                    ${inputSizeClass}
                    ${option === value ? "bg-white/15 text-white" : "text-white/80"}
                    hover:bg-white/10 hover:text-white
                  `}
                >
                  {option}
                </li>
              ))}
            </ul>,
            document.body,
          )}
      </div>

      {/* Always reserve space so showing an error doesn't shift content below. */}
      <p
        id={errorId}
        role="alert"
        aria-hidden={error === null}
        className={`mt-[clamp(8px,0.8vw,12px)] pl-5 text-[clamp(12px,1.06vw,16px)] text-[#FFDADA] ${
          error ? "" : "invisible"
        }`}
      >
        {error ?? " "}
      </p>
    </div>
  );
}

export default React.forwardRef(Dropdown);
