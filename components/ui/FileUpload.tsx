"use client";

import * as React from "react";

export type FileUploadHandle = {
  /** Runs validation, updates the error message, returns whether the field is valid. */
  validate: () => boolean;
};

/** Captures a file locally and reports it to the parent for upload. */
type FileUploadProps = {
  name: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  maxSizeBytes?: number;
  existingFileName?: string;
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
    maxSizeBytes,
    existingFileName,
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

  function fileError(candidate: File | null): string | null {
    if (required && !candidate && !existingFileName) {
      return `${name} is required.`;
    }
    if (!candidate) return null;

    if (maxSizeBytes && candidate.size > maxSizeBytes) {
      return `File must be ${Math.floor(maxSizeBytes / 1024 / 1024)} MB or smaller.`;
    }

    if (accept) {
      const acceptedTypes = accept
        .split(",")
        .map((type) => type.trim().toLowerCase());
      const extension = `.${candidate.name.split(".").pop()?.toLowerCase() ?? ""}`;
      const mimeType = candidate.type.toLowerCase();
      const isAccepted = acceptedTypes.some(
        (type) =>
          type === extension ||
          type === mimeType ||
          (type.endsWith("/*") &&
            mimeType.startsWith(type.slice(0, type.length - 1))),
      );
      if (!isAccepted) return "Please choose a supported file type.";
    }

    return null;
  }

  function validate(): boolean {
    const message = fileError(file);
    setError(message);
    onValidityChange?.(message !== null);
    return message === null;
  }

  React.useImperativeHandle(ref, () => ({ validate }));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    const message = fileError(next);
    setError(message);
    onValidityChange?.(message !== null);

    if (message) {
      event.target.value = "";
      setInternalFile(null);
      return;
    }

    setInternalFile(next);
    onChange?.(next);

    if (error) {
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
            {file?.name || existingFileName || placeholder}
          </span>
        </span>

        <input
          id={fieldId}
          type="file"
          required={required}
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
