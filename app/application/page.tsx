"use client";

import * as React from "react";
import LogoNavbar from "@/components/layout/LogoNavbar";
import AuthRouteGuard from "@/components/providers/AuthRouteGuard";
import Background from "./background/Background";
import BackgroundBook from "./backgroundBook";
import ProgressBar from "./progressBar";
import SectionNavbar from "./sectionNavbar";
import {
  GROUP_START_STEP_INDEX,
  SECTION_GROUPS,
  SECTIONS,
  initialFormData,
  type WizardFormData,
} from "./sectionConfig";
import type { SectionHandle } from "./sections/types";

export default function ApplicationPage() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [furthestVisited, setFurthestVisited] = React.useState(0);
  const [formData, setFormData] =
    React.useState<WizardFormData>(initialFormData);
  const [sectionHasErrors, setSectionHasErrors] = React.useState(false);
  const [leftSectionHasErrors, setLeftSectionHasErrors] = React.useState(false);
  const sectionRef = React.useRef<SectionHandle>(null);
  const leftSectionRef = React.useRef<SectionHandle>(null);

  const step = SECTIONS[stepIndex];
  const ActiveLeft = step.Left;
  const ActiveRight = step.Right;
  const leftId = step.leftId;
  const isLastStep = stepIndex === SECTIONS.length - 1;
  const furthestVisitedGroupIndex = SECTIONS[furthestVisited].groupIndex;
  const groupStepCounts = SECTION_GROUPS.map((group) => group.steps.length);

  function handleNext() {
    const isRightValid = sectionRef.current?.validate() ?? true;
    const isLeftValid = leftId
      ? (leftSectionRef.current?.validate() ?? true)
      : true;
    if (!isRightValid || !isLeftValid) return;

    // Hook point for persisting formData[step.id] to the backend once one exists.

    const next = Math.min(stepIndex + 1, SECTIONS.length - 1);
    setStepIndex(next);
    setFurthestVisited((prev) => Math.max(prev, next));
  }

  function handleBack() {
    // Hook point for persisting formData[step.id] to the backend once one exists.
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleGroupClick(groupIndex: number) {
    if (groupIndex > furthestVisitedGroupIndex) return;
    setStepIndex(GROUP_START_STEP_INDEX[groupIndex]);
  }

  return (
    <AuthRouteGuard requireAuth>
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-10 font-figtree">
        <Background />

        <LogoNavbar />

      {/* Grid rows are auto-sized from the tallest cell in each row, so the
       * nav list (lg:h-full) and the book wrapper (lg:row-start-2) always end
       * up the same height without any manual measurement — the nav's
       * buttons then center as a group against that height. The first column
       * is "auto"-width so it sizes to the nav's widest button instead of a
       * fixed pixel value. */}
        <div className="grid w-full items-center gap-6 lg:grid-cols-[auto_minmax(0,1100px)] lg:grid-rows-[auto_auto] lg:justify-center lg:gap-x-16 lg:gap-y-6">
          <SectionNavbar
            groups={SECTION_GROUPS.map((g) => ({ id: g.id, label: g.label }))}
            currentGroupIndex={step.groupIndex}
            furthestVisitedGroupIndex={furthestVisitedGroupIndex}
            onGroupClick={handleGroupClick}
          />

        <ProgressBar
          className="lg:col-start-2 lg:row-start-1"
          groupStepCounts={groupStepCounts}
          currentGroupIndex={step.groupIndex}
          currentStepInGroup={step.stepIndexInGroup}
        />

        <div className="relative z-10 w-full max-w-[1100px] lg:col-start-2 lg:row-start-2">
          <BackgroundBook
            onBack={stepIndex > 0 ? handleBack : undefined}
            onNext={handleNext}
            nextDisabled={sectionHasErrors || leftSectionHasErrors}
            nextLabel={isLastStep ? "Submit" : "Next"}
            left={
              leftId ? (
                <ActiveLeft
                  ref={leftSectionRef}
                  value={formData[leftId]}
                  onChange={(value: WizardFormData[typeof leftId]) =>
                    setFormData((prev) => ({ ...prev, [leftId]: value }))
                  }
                  onValidityChange={setLeftSectionHasErrors}
                  formData={formData}
                />
              ) : (
                <ActiveLeft>{step.title}</ActiveLeft>
              )
            }
            right={
              <ActiveRight
                ref={sectionRef}
                value={formData[step.id]}
                onChange={(value: WizardFormData[typeof step.id]) =>
                  setFormData((prev) => ({ ...prev, [step.id]: value }))
                }
                onValidityChange={setSectionHasErrors}
                formData={formData}
              />
            }
          />
        </div>
        </div>
      </div>
    </AuthRouteGuard>
  );
}
