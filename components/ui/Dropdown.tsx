"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  parseMultiSelectValue,
  serializeMultiSelectValue,
} from "@/lib/multiSelectValue";

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
  multiple?: boolean;
  /** Fires whenever this field's error status changes, so a parent can track
   * section-wide validity (e.g. to disable a "Next" button) without polling. */
  onValidityChange?: (hasError: boolean) => void;
  className?: string;
  labelClassName?: string;
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
    multiple = false,
    onValidityChange,
    className = "",
    labelClassName = "",
  }: DropdownProps,
  ref: React.Ref<DropdownHandle>,
) {
  const [internalValue, setInternalValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const value = controlledValue ?? internalValue;
  const selectedOptions = multiple ? parseMultiSelectValue(value) : [value];
  const displayValue = multiple
    ? `${selectedOptions.length} selected`
    : value;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [listRect, setListRect] = React.useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
    opensUpward: boolean;
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
        const viewportGutter = 12;
        const menuGap = 6;
        const preferredMaxHeight = 240;
        const spaceBelow = window.innerHeight - rect.bottom - viewportGutter;
        const spaceAbove = rect.top - viewportGutter;
        const opensUpward =
          spaceBelow < preferredMaxHeight && spaceAbove > spaceBelow;
        const availableSpace = opensUpward ? spaceAbove : spaceBelow;

        setListRect({
          top: opensUpward ? rect.top - menuGap : rect.bottom + menuGap,
          left: rect.left,
          width: rect.width,
          maxHeight: Math.max(
            0,
            Math.min(preferredMaxHeight, availableSpace - menuGap),
          ),
          opensUpward,
        });
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
    if (multiple) {
      const nextOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((selected) => selected !== option)
        : [...selectedOptions, option];
      const nextValue = serializeMultiSelectValue(nextOptions);
      setInternalValue(nextValue);
      onChange?.(nextValue);

      if (error && !computeError(nextValue)) {
        setError(null);
        onValidityChange?.(false);
      }
      return;
    }

    setInternalValue(option);
    onChange?.(option);
    setOpen(false);
    triggerRef.current?.focus();

    if (error && !computeError(option)) {
      setError(null);
      onValidityChange?.(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      validate();
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        const selectedIndex = options.indexOf(value);
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        setOpen(true);
        return;
      }
      setActiveIndex((current) => {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + options.length) % options.length;
      });
      return;
    }

    if (open && event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (open && event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) {
        const option = options[activeIndex];
        if (option) selectOption(option);
      } else {
        const selectedIndex = options.indexOf(value);
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        setOpen(true);
      }
    }
  }

  React.useEffect(() => {
    if (!open) return;
    document
      .getElementById(`${listId}-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId, open]);

  // Keep the minimum at 16px: anything smaller makes iOS Safari zoom the page
  // when the field is focused on mobile.
  const inputSizeClass = "text-[clamp(16px,1.2vw,21px)]";

  return (
    <div className={`w-full font-figtree ${className}`} ref={containerRef}>
      <span
        className={`mb-1.5 block text-[clamp(13px,1vw,16px)] font-normal text-white/80 ${labelClassName}`}
      >
        {name}
      </span>

      <div className="relative" onKeyDown={handleKeyDown}>
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open ? `${listId}-option-${activeIndex}` : undefined
          }
          aria-invalid={error !== null}
          aria-describedby={error ? errorId : undefined}
          onClick={() => {
            const selectedIndex = options.findIndex((option) =>
              selectedOptions.includes(option),
            );
            setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
            setOpen((prev) => !prev);
          }}
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
              selectedOptions.length > 0 ? "text-white" : "text-white/40"
            }`}
          >
            {selectedOptions.length > 0 ? displayValue : placeholder}
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
              aria-multiselectable={multiple || undefined}
              aria-labelledby={fieldId}
              onKeyDown={handleKeyDown}
              className="fixed z-50 overflow-y-auto rounded-[10px] border-2 border-transparent p-1.5 shadow-[0px_4px_10px_rgba(0,0,0,0.35)]"
              style={{
                background: BORDER_GRADIENT_BACKGROUND,
                top: listRect.top,
                left: listRect.left,
                width: listRect.width,
                maxHeight: listRect.maxHeight,
                transform: listRect.opensUpward
                  ? "translateY(-100%)"
                  : undefined,
              }}
            >
              {options.map((option, index) => (
                <li
                  key={option}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={selectedOptions.includes(option)}
                  data-active={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => {
                    // Prevent the trigger from blurring before the click
                    // registers, which would close the list first and drop it.
                    event.preventDefault();
                    selectOption(option);
                  }}
                  className={`
                    cursor-pointer rounded-[8px] px-[13px] py-2 font-figtree
                    transition-colors duration-200 ease-out
                    ${inputSizeClass}
                    ${selectedOptions.includes(option) ? "bg-white/15 text-white" : "text-white/80"}
                    ${index === activeIndex ? "bg-white/10 text-white outline-none ring-1 ring-white/50" : ""}
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
