import * as React from "react";

/**
 * Aggregates per-field error status into a single "does this section have any
 * errors right now" boolean and reports it to `onValidityChange`. Each field
 * reports itself under a stable key via the returned `setFieldError`.
 */
export function useFieldErrors(onValidityChange?: (hasErrors: boolean) => void) {
  const [errors, setErrors] = React.useState<Record<string, boolean>>({});
  const hasErrors = Object.values(errors).some(Boolean);

  React.useEffect(() => {
    onValidityChange?.(hasErrors);
  }, [hasErrors, onValidityChange]);

  return React.useCallback((key: string, hasError: boolean) => {
    setErrors((prev) =>
      prev[key] === hasError ? prev : { ...prev, [key]: hasError },
    );
  }, []);
}
