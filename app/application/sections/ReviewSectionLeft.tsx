"use client";

import * as React from "react";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { ReviewData } from "./data";
import { LEFT_GROUPS, ReviewGroupList, type ReviewFormData } from "./reviewRows";

type ReviewSectionLeftProps = SectionProps<ReviewData> & {
  formData: ReviewFormData;
};

const ReviewSectionLeft = React.forwardRef<SectionHandle, ReviewSectionLeftProps>(
  ({ formData }, ref) => {
    React.useImperativeHandle(ref, () => ({
      validate: () => true,
    }));

    return (
      <div className="mt-[42px] flex flex-col gap-3">
        <SectionHeading className="text-xl">Review</SectionHeading>
        <ReviewGroupList groups={LEFT_GROUPS} formData={formData} />
      </div>
    );
  },
);

ReviewSectionLeft.displayName = "ReviewSectionLeft";

export default ReviewSectionLeft;
