"use client";

import * as React from "react";
import SectionHeading from "./SectionHeading";
import type { SectionHandle, SectionProps } from "./types";
import type { ReviewData } from "./data";
import { RIGHT_GROUPS, ReviewGroupList, type ReviewFormData } from "./reviewRows";

export type { ReviewFormData } from "./reviewRows";

type ReviewSectionRightProps = SectionProps<ReviewData> & {
  formData: ReviewFormData;
};

const ReviewSectionRight = React.forwardRef<SectionHandle, ReviewSectionRightProps>(
  ({ formData }, ref) => {
    React.useImperativeHandle(ref, () => ({
      validate: () => true,
    }));

    return (
      <div className="flex flex-col gap-3">
        <SectionHeading className="invisible text-xl">Review</SectionHeading>
        <ReviewGroupList groups={RIGHT_GROUPS} formData={formData} />
      </div>
    );
  },
);

ReviewSectionRight.displayName = "ReviewSectionRight";

export default ReviewSectionRight;
