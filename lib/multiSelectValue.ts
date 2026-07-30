export function parseMultiSelectValue(value: string): string[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (
      Array.isArray(parsed) &&
      parsed.every((option): option is string => typeof option === "string")
    ) {
      return parsed;
    }
  } catch {
    // Existing answers may contain one unencoded option.
  }

  return [value];
}

export function serializeMultiSelectValue(options: string[]): string {
  return options.length > 0 ? JSON.stringify(options) : "";
}
