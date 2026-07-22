"use client";

import * as React from "react";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { PlaceholderData } from "./data";

const CustomSection = React.forwardRef<SectionHandle, SectionProps<PlaceholderData>>(
  (_props, ref) => {
    React.useImperativeHandle(ref, () => ({
      validate: () => true,
    }));

    return (
      <div className="flex flex-col gap-6">
        <SectionHeading>Custom</SectionHeading>
        <p className="text-white/60">More questions coming soon.</p>
      </div>
    );
  },
);

CustomSection.displayName = "CustomSection";

export default CustomSection;
