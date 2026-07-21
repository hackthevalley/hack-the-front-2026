"use client";

import * as React from "react";

export type FileUploadHandle = {
  /** Runs validation, updates the error message, returns whether the field is valid. */
  validate: () => boolean;
};

/**
 * Mock file upload dropzone — captures a File locally and reports it via
 * onChange, styled to match TextField's "application" theme. No actual
 * upload/storage wiring yet; that lands once the backend exists.
 */
type FileUploadProps = {
  name: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  onValidityChange?: (hasError: boolean) => void;
  className?: string;
};

function UploadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 16V4" />
      <path d="M6.5 9.5 12 4l5.5 5.5" />
      <path d="M4 16.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2.5" />
    </svg>
  );
}

function FileUpload(
  {
    name,
    placeholder = "Attach File",
    required = false,
    accept,
    value,
    onChange,
    onValidityChange,
    className = "",
  }: FileUploadProps,
  ref: React.Ref<FileUploadHandle>,
) {
  const [internalFile, setInternalFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const file = value !== undefined ? value : internalFile;

  const fieldId = React.useId();
  const errorId = `${fieldId}-error`;

  function validate(): boolean {
    const message = required && !file ? `${name} is required.` : null;
    setError(message);
    onValidityChange?.(message !== null);
    return message === null;
  }

  React.useImperativeHandle(ref, () => ({ validate }));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    setInternalFile(next);
    onChange?.(next);

    if (error && next) {
      setError(null);
      onValidityChange?.(false);
    }
  }

  return (
    <div className={`w-full font-figtree ${className}`}>
      <span className="mb-1.5 block text-[clamp(13px,1vw,16px)] font-normal text-white/80">
        {name}
      </span>

      <label
        htmlFor={fieldId}
        className="group relative flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-white/30 px-5 py-6 text-center transition-colors duration-300 ease-out hover:border-white/50 focus-within:border-white"
      >
        <span className="relative z-10 flex flex-col items-center gap-2 text-white/40">
          <UploadIcon className="h-5 w-5" />
          <span className="text-[clamp(14px,1.1vw,18px)]">
            {file ? file.name : placeholder}
          </span>
        </span>

        <input
          id={fieldId}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
          aria-invalid={error !== null}
          aria-describedby={error ? errorId : undefined}
        />
      </label>

      <p
        id={errorId}
        role="alert"
        aria-hidden={error === null}
        className={`mt-[clamp(8px,0.8vw,12px)] pl-5 text-[clamp(12px,1.06vw,16px)] text-[#FFDADA] ${error ? "" : "invisible"}`}
      >
        {error ?? " "}
      </p>
    </div>
  );
}

export default React.forwardRef(FileUpload);
