export type SectionHandle = {
  /** Runs validation for every required field in the section, returns whether it's all valid. */
  validate: () => boolean;
};

export type SectionProps<T> = {
  value: T;
  onChange: (value: T) => void;
  /** Fires whenever the section's overall validity changes, so the wizard can
   * disable "Next" while any field in the current section has an error. */
  onValidityChange?: (hasErrors: boolean) => void;
};
