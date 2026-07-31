"use client";

import * as React from "react";
import { toast } from "sonner";
import DesignBox from "@/components/layout/DesignBox";
import Button from "@/components/ui/Button";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import {
  getPasswordValidationMessage,
  isValidEmail,
} from "@/components/ui/validation";
import { apiUrl } from "@/lib/auth";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
} from "../background/layers";
import type { AuthSectionProps } from "../types";

const TITLE_GLOW = "0 0 16.6px #FEE9D3";
const FIRST_NAME_ERROR = "Please enter your first name.";
const LAST_NAME_ERROR = "Please enter your last name.";
const EMAIL_ERROR = "Please enter a valid email.";
const PASSWORD_REQUIRED_ERROR = "Please enter a password.";
const CONFIRMATION_ERROR = "Please retype your password.";
const MISMATCH_ERROR = "Passwords do not match.";

type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmation";

type FormErrors = Partial<Record<FieldName, string>>;

type ErrorMessageProps = {
  message?: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="flex h-full items-center gap-[1cqw] font-figtree font-normal leading-[normal] text-[#FFDADA]"
      aria-hidden={!message}
    >
      <img
        src="/icons/news-signup-error.svg"
        alt=""
        aria-hidden="true"
        className={`h-[75cqh] w-auto shrink-0 ${message ? "" : "invisible"}`}
      />
      <p
        role="alert"
        className={`m-0 whitespace-nowrap ${message ? "" : "invisible"}`}
        style={{ fontSize: "71.429cqh" }}
      >
        {message ?? "No error"}
      </p>
    </div>
  );
}

export default function SignUpSection({ onNavigate }: AuthSectionProps) {
  const refs = {
    firstName: React.useRef<TextFieldHandle>(null),
    lastName: React.useRef<TextFieldHandle>(null),
    email: React.useRef<TextFieldHandle>(null),
    password: React.useRef<TextFieldHandle>(null),
    confirmation: React.useRef<TextFieldHandle>(null),
  };
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmation, setConfirmation] = React.useState("");
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmation.length > 0 &&
    !isSubmitting;

  function setFieldError(field: FieldName, message: string | null) {
    setErrors((current) => {
      if (message) return { ...current, [field]: message };

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleFirstNameChange(value: string) {
    setFirstName(value);
    if (errors.firstName && value.trim()) setFieldError("firstName", null);
  }

  function handleLastNameChange(value: string) {
    setLastName(value);
    if (errors.lastName && value.trim()) setFieldError("lastName", null);
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    if (errors.email && isValidEmail(value.trim()))
      setFieldError("email", null);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (errors.password) {
      setFieldError(
        "password",
        value
          ? getPasswordValidationMessage(value)
          : PASSWORD_REQUIRED_ERROR,
      );
    }
    if (errors.confirmation === MISMATCH_ERROR && value === confirmation) {
      setFieldError("confirmation", null);
    }
  }

  function handleConfirmationChange(value: string) {
    setConfirmation(value);
    if (errors.confirmation && value && value === password) {
      setFieldError("confirmation", null);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    Object.values(refs).forEach((fieldRef) => fieldRef.current?.validate());

    const nextErrors: FormErrors = {};
    if (!firstName.trim()) nextErrors.firstName = FIRST_NAME_ERROR;
    if (!lastName.trim()) nextErrors.lastName = LAST_NAME_ERROR;
    if (!isValidEmail(email.trim())) nextErrors.email = EMAIL_ERROR;
    const passwordError = password
      ? getPasswordValidationMessage(password)
      : PASSWORD_REQUIRED_ERROR;
    if (passwordError) nextErrors.password = passwordError;
    if (!confirmation) {
      nextErrors.confirmation = CONFIRMATION_ERROR;
    } else if (password !== confirmation) {
      nextErrors.confirmation = MISMATCH_ERROR;
    }

    setErrors(nextErrors);
    const firstInvalidField = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalidField) {
      refs[firstInvalidField].current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl("/api/account/users"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Signup failed with status ${response.status}`);
      }

      toast.success("Account created", {
        description: "Check your email to activate your account.",
      });
      onNavigate("login");
    } catch {
      toast.error("Unable to create your account", {
        description: "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="auth-form auth-form--sign-up"
      aria-labelledby="sign-up-title"
      aria-busy={isSubmitting}
      noValidate
      onSubmit={handleSubmit}
    >
      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={330}
        top={145}
        width={852}
        height={63}
        zIndex={40}
        compactRole="title"
        compactOrder={10}
        className="flex items-start justify-center text-center text-white"
      >
        <h1
          id="sign-up-title"
          className="m-0 whitespace-nowrap font-vcr font-normal leading-[normal]"
          style={{ fontSize: "101.587cqh", textShadow: TITLE_GLOW }}
        >
          Welcome, Hacker
        </h1>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={390}
        top={220}
        width={733}
        height={34}
        zIndex={40}
        compactRole="subtitle"
        compactOrder={20}
        className="flex items-center text-[#F6C7FC]"
      >
        <span aria-hidden="true" className="h-[1.83px] w-[13%] bg-current" />
        <p
          className="m-0 flex-1 whitespace-nowrap text-center font-figtree font-semibold leading-[normal]"
          style={{ fontSize: "76.471cqh" }}
        >
          Create an account to start your application
        </p>
        <span aria-hidden="true" className="h-[1.83px] w-[13%] bg-current" />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407}
        top={276}
        width={337}
        height={88}
        zIndex={40}
        compactRole="field"
        compactOrder={30}
      >
        <TextField
          ref={refs.firstName}
          name="First Name"
          placeholder="Enter First Name"
          autoComplete="given-name"
          required
          theme="auth"
          className="[&>label]:px-[7.986cqw]"
          errorMessages={{ required: FIRST_NAME_ERROR }}
          value={firstName}
          onChange={handleFirstNameChange}
          onValidityChange={(hasError) =>
            setFieldError("firstName", hasError ? FIRST_NAME_ERROR : null)
          }
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={769}
        top={276}
        width={337}
        height={88}
        zIndex={40}
        compactRole="field"
        compactOrder={50}
      >
        <TextField
          ref={refs.lastName}
          name="Last Name"
          placeholder="Enter Last Name"
          autoComplete="family-name"
          required
          theme="auth"
          className="[&>label]:px-[7.986cqw]"
          errorMessages={{ required: LAST_NAME_ERROR }}
          value={lastName}
          onChange={handleLastNameChange}
          onValidityChange={(hasError) =>
            setFieldError("lastName", hasError ? LAST_NAME_ERROR : null)
          }
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={420}
        top={367}
        width={324}
        height={24}
        zIndex={45}
        compactRole="error"
        compactOrder={40}
      >
        <ErrorMessage message={errors.firstName} />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={782}
        top={367}
        width={324}
        height={24}
        zIndex={45}
        compactRole="error"
        compactOrder={60}
      >
        <ErrorMessage message={errors.lastName} />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407}
        top={397}
        width={699}
        height={88}
        zIndex={40}
        compactRole="field"
        compactOrder={70}
      >
        <TextField
          ref={refs.email}
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
            setFieldError("email", hasError ? EMAIL_ERROR : null)
          }
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={420}
        top={488}
        width={686}
        height={24}
        zIndex={45}
        compactRole="error"
        compactOrder={80}
      >
        <ErrorMessage message={errors.email} />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407}
        top={518}
        width={699}
        height={88}
        zIndex={40}
        compactRole="field"
        compactOrder={90}
      >
        <TextField
          ref={refs.password}
          name="Password"
          placeholder="Enter Password"
          type="password"
          theme="auth"
          autoComplete="new-password"
          required
          requireStrongPassword
          errorMessages={{ required: PASSWORD_REQUIRED_ERROR }}
          value={password}
          onChange={handlePasswordChange}
          onValidityChange={(hasError) =>
            setFieldError(
              "password",
              hasError
                ? password
                  ? getPasswordValidationMessage(password)
                  : PASSWORD_REQUIRED_ERROR
                : null,
            )
          }
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={420}
        top={609}
        width={686}
        height={24}
        zIndex={45}
        compactRole="error"
        compactOrder={100}
      >
        <ErrorMessage message={errors.password} />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407}
        top={639}
        width={699}
        height={88}
        zIndex={40}
        compactRole="field"
        compactOrder={110}
      >
        <TextField
          ref={refs.confirmation}
          name="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          theme="auth"
          autoComplete="new-password"
          required
          errorMessages={{ required: CONFIRMATION_ERROR }}
          value={confirmation}
          onChange={handleConfirmationChange}
          onValidityChange={(hasError) =>
            setFieldError(
              "confirmation",
              hasError
                ? CONFIRMATION_ERROR
                : confirmation !== password
                  ? MISMATCH_ERROR
                  : null,
            )
          }
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={420}
        top={730}
        width={686}
        height={24}
        zIndex={45}
        compactRole="error"
        compactOrder={120}
      >
        <ErrorMessage message={errors.confirmation} />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={408}
        top={768}
        width={203}
        height={72}
        zIndex={40}
        compactRole="action"
        compactOrder={130}
        className="flex items-start"
      >
        <Button
          text={isSubmitting ? "Signing Up..." : "Sign Up"}
          state={
            isSubmitting ? "loading" : canSubmit ? "default" : "disabled"
          }
          htmlType="submit"
          width="100%"
          className="h-full"
          textClassName="font-figtree text-2xl font-semibold leading-normal"
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={408}
        top={855}
        width={420}
        height={33}
        zIndex={40}
        compactRole="secondary"
        compactOrder={140}
        className="auth-account-link whitespace-nowrap font-figtree font-semibold leading-[normal]"
      >
        <p className="m-0" style={{ fontSize: "81.521cqh" }}>
          <span className="text-[#F6C7FC]">Already have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="cursor-pointer border-0 bg-transparent p-0 font-inherit text-[#EAEFFF] transition-opacity hover:underline hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            Log in.
          </button>
        </p>
      </DesignBox>
    </form>
  );
}
