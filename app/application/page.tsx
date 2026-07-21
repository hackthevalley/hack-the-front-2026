"use client";

import * as React from "react";
import Background from "./background/Background";
import BackgroundBook from "./backgroundBook";
import ProgressBar from "./progressBar";
import SectionNavbar from "./sectionNavbar";
import {
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

  function handleNext() {
    const isRightValid = sectionRef.current?.validate() ?? true;
    const isLeftValid = leftId ? (leftSectionRef.current?.validate() ?? true) : true;
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

  function handleStepClick(index: number) {
    if (index > furthestVisited) return;
    setStepIndex(index);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-10 font-figtree">
      <Background />

      <SectionNavbar
        className="absolute left-6 top-10 md:left-12 md:top-12"
        steps={SECTIONS.map((s) => ({ id: s.id, label: s.label }))}
        currentStep={stepIndex}
        furthestVisited={furthestVisited}
        onStepClick={handleStepClick}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6">
        <ProgressBar currentStep={stepIndex} totalSteps={SECTIONS.length} />

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
  );
}
