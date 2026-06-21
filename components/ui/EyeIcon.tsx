"use client";

import * as React from "react";

// Source artwork: public/icons/eye.svg (inlined so it inherits `currentColor`
// and so the closed state can punch a cut-out gap via an SVG mask).
const EYE_PATHS = (
  <>
    <path d="M17.6553 0C27.4054 0.000266568 35.3096 12.1904 35.3096 12.1904C35.3096 12.1904 27.4054 24.3796 17.6553 24.3799C7.90496 24.3799 0 12.1904 0 12.1904C0 12.1904 7.90496 0 17.6553 0ZM17.8232 3.25879C12.7833 3.25885 8.69745 7.34481 8.69727 12.3848C8.69727 17.4249 12.7831 21.5107 17.8232 21.5107C22.8634 21.5107 26.9492 17.4249 26.9492 12.3848C26.949 7.34478 22.8633 3.25879 17.8232 3.25879Z" />
    <path d="M17.8228 5.54102C18.6603 5.54105 19.4629 5.69142 20.2046 5.9668C18.7937 6.65447 17.8218 8.10315 17.8218 9.77832C17.8218 12.1184 19.719 14.0156 22.0591 14.0156C23.0229 14.0156 23.9107 13.6924 24.6226 13.1504C24.2422 16.5704 21.3442 19.2303 17.8228 19.2305C14.0427 19.2305 10.9781 16.1658 10.978 12.3857C10.978 8.60563 14.0426 5.54102 17.8228 5.54102Z" />
  </>
);

// Diagonal slash spanning the 36×25 viewBox, bottom-left → top-right.
const EYE_SLASH = { x1: 2, y1: 23, x2: 34, y2: 2 };

type EyeIconProps = {
  /** When false, renders the closed state: a diagonal slash with a cut-out gap. */
  open: boolean;
  className?: string;
};

export default function EyeIcon({ open, className }: EyeIconProps) {
  const maskId = `eye-cut-${React.useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 36 25"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {!open && (
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="36" height="25" fill="white" />
            <line {...EYE_SLASH} stroke="black" strokeWidth="5" strokeLinecap="round" />
          </mask>
        </defs>
      )}

      <g mask={open ? undefined : `url(#${maskId})`}>{EYE_PATHS}</g>

      {!open && (
        <line {...EYE_SLASH} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      )}
    </svg>
  );
}
