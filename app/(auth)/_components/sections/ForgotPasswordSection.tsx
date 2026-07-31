"use client";

import * as React from "react";
import DesignBox from "@/components/layout/DesignBox";
import Button from "@/components/ui/Button";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import { isValidEmail } from "@/components/ui/validation";
import { apiUrl } from "@/lib/auth";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
} from "../background/layers";

const TITLE_GLOW = "0 0 16.6px #FEE9D3";
const EMAIL_ERROR = "Please enter a valid email.";
const REQUEST_ERROR = "Unable to send the reset link. Please try again.";

export default function ForgotPasswordSection() {
  const emailRef = React.useRef<TextFieldHandle>(null);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    setSubmitted(false);

    if (emailError && isValidEmail(value)) {
      setEmailError(null);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || submitted) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      setEmailError(EMAIL_ERROR);
      setSubmitted(false);
      emailRef.current?.focus();
      return;
    }

    setEmailError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl("/api/account/password-resets"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!response.ok) {
        throw new Error(`Password reset request failed with status ${response.status}`);
      }

      setSubmitted(true);
    } catch {
      setEmailError(REQUEST_ERROR);
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="auth-form"
      aria-labelledby="forgot-password-title"
      aria-busy={isSubmitting}
      noValidate
      onSubmit={handleSubmit}
    >
      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={330}
        top={293}
        width={852}
        height={63}
        zIndex={40}
        compactRole="title"
        compactOrder={10}
        className="flex items-start justify-center text-center text-white"
      >
        <h1
          id="forgot-password-title"
          className="m-0 whitespace-nowrap font-vcr font-normal leading-[normal]"
          style={{ fontSize: "101.587cqh", textShadow: TITLE_GLOW }}
        >
          Forgot your password?
        </h1>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={358.5}
        top={390}
        width={772}
        height={75}
        zIndex={40}
        compactRole="subtitle"
        compactOrder={20}
        className="flex items-start justify-center text-center font-figtree font-semibold leading-[normal] text-[#F6C7FC]"
      >
        <p
          aria-live="polite"
          className="m-0 whitespace-pre-line"
          style={{ fontSize: "37.333cqh" }}
        >
          {submitted
            ? "Check your email for a password reset link."
            : "Enter the email used for your account.\nWe’ll send you a link to reset your password."}
        </p>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={381}
        top={491}
        width={750}
        height={3}
        zIndex={40}
        compactRole="divider"
        compactOrder={30}
        className="bg-[#8DA8FF]"
      >
        <span aria-hidden="true" />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407.5}
        top={526}
        width={699}
        height={98}
        zIndex={40}
        compactRole="field"
        compactOrder={40}
      >
        <TextField
          ref={emailRef}
          name="Email"
          placeholder="Enter Email"
          type="email"
          theme="auth"
          autoComplete="email"
          required
          errorMessages={{ required: EMAIL_ERROR, invalid: EMAIL_ERROR }}
          value={email}
          onChange={handleEmailChange}
          onValidityChange={(hasError) =>
            setEmailError(hasError ? EMAIL_ERROR : null)
          }
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={424}
        top={635}
        width={420}
        height={24}
        zIndex={45}
        compactRole="error"
        compactOrder={50}
        className="flex items-center gap-[0.952cqw] font-figtree font-normal leading-[normal] text-[#FFDADA]"
      >
        <img
          src="/icons/news-signup-error.svg"
          alt=""
          aria-hidden="true"
          className={`h-[87.5cqh] w-auto shrink-0 ${emailError ? "" : "invisible"}`}
        />
        <p
          role="alert"
          aria-hidden={!emailError}
          className={`m-0 whitespace-nowrap ${emailError ? "" : "invisible"}`}
          style={{ fontSize: "83.333cqh" }}
        >
          {emailError ?? EMAIL_ERROR}
        </p>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={646.5}
        top={675}
        width={219}
        height={72}
        zIndex={40}
        compactRole="action"
        compactOrder={60}
        className="flex items-start"
      >
        <Button
          text="Send Link"
          buttonType={submitted || isSubmitting ? "disabled" : "primary"}
          htmlType="submit"
          width="100%"
          fontSize={24}
          className="h-full"
        />
      </DesignBox>
    </form>
  );
}
