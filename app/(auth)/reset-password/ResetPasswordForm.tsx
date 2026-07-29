"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import DesignBox from "@/components/layout/DesignBox";
import Button from "@/components/ui/Button";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
} from "../_components/background/layers";

const TITLE_GLOW = "0 0 16.6px #FEE9D3";
const PASSWORD_ERROR =
  "Password must be at least 8 characters with a capital letter and a number.";
const CONFIRMATION_ERROR = "Please re-enter your new password.";
const MISMATCH_ERROR = "Passwords do not match.";

export default function ResetPasswordForm() {
  const router = useRouter();
  const newPasswordRef = React.useRef<TextFieldHandle>(null);
  const confirmationRef = React.useRef<TextFieldHandle>(null);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmation, setConfirmation] = React.useState("");
  const [formError, setFormError] = React.useState<string | null>(null);

  function handleNewPasswordChange(value: string) {
    setNewPassword(value);
    setFormError(null);
  }

  function handleConfirmationChange(value: string) {
    setConfirmation(value);
    setFormError(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const passwordIsValid = newPasswordRef.current?.validate() ?? false;
    const confirmationIsValid = confirmationRef.current?.validate() ?? false;

    if (!passwordIsValid) {
      setFormError(PASSWORD_ERROR);
      newPasswordRef.current?.focus();
      return;
    }

    if (!confirmationIsValid) {
      setFormError(CONFIRMATION_ERROR);
      confirmationRef.current?.focus();
      return;
    }

    if (newPassword !== confirmation) {
      setFormError(MISMATCH_ERROR);
      confirmationRef.current?.focus();
      return;
    }

    setFormError(null);
    router.push("/login");
  }

  return (
    <form
      className="auth-form auth-form--standalone"
      aria-labelledby="reset-password-title"
      noValidate
      onSubmit={handleSubmit}
    >
      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={330}
        top={240}
        width={852}
        height={63}
        zIndex={40}
        compactRole="title"
        compactOrder={10}
        className="flex items-start justify-center text-center text-white"
      >
        <h1
          id="reset-password-title"
          className="m-0 whitespace-nowrap font-vcr font-normal leading-[normal]"
          style={{ fontSize: "101.587cqh", textShadow: TITLE_GLOW }}
        >
          Password Reset
        </h1>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={381}
        top={343.5}
        width={750}
        height={3}
        zIndex={40}
        compactRole="divider"
        compactOrder={20}
        className="bg-[#937EC5]"
      >
        <span aria-hidden="true" />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407.5}
        top={389}
        width={699}
        height={98}
        zIndex={40}
        compactRole="field"
        compactOrder={30}
      >
        <TextField
          ref={newPasswordRef}
          name="New password"
          placeholder="Enter new password"
          type="password"
          theme="auth"
          autoComplete="new-password"
          required
          requireStrongPassword
          showPasswordToggle={false}
          errorMessages={{
            required: PASSWORD_ERROR,
            invalid: PASSWORD_ERROR,
          }}
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={405}
        top={526}
        width={699}
        height={98}
        zIndex={40}
        compactRole="field"
        compactOrder={40}
      >
        <TextField
          ref={confirmationRef}
          name="Re-enter new password"
          placeholder="Enter new password"
          type="password"
          theme="auth"
          autoComplete="new-password"
          required
          showPasswordToggle={false}
          errorMessages={{ required: CONFIRMATION_ERROR }}
          value={confirmation}
          onChange={handleConfirmationChange}
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={424}
        top={635}
        width={664}
        height={24}
        zIndex={45}
        compactRole="error"
        compactOrder={50}
        className="flex items-center gap-[0.603cqw] font-figtree font-normal leading-[normal] text-[#FFDADA]"
      >
        <img
          src="/icons/news-signup-error.svg"
          alt=""
          aria-hidden="true"
          className={`h-[87.5cqh] w-auto shrink-0 ${formError ? "" : "invisible"}`}
        />
        <p
          role="alert"
          aria-hidden={!formError}
          className={`m-0 whitespace-nowrap ${formError ? "" : "invisible"}`}
          style={{ fontSize: "83.333cqh" }}
        >
          {formError ?? PASSWORD_ERROR}
        </p>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={631}
        top={680}
        width={249}
        height={72}
        zIndex={40}
        compactRole="action"
        compactOrder={60}
        className="flex items-start"
      >
        <Button
          text="Reset password"
          buttonType="primary"
          width="100%"
          fontSize="24px"
          className="h-full"
        />
      </DesignBox>
    </form>
  );
}
