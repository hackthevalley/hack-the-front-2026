"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import DesignBox from "@/components/layout/DesignBox";
import Button from "@/components/ui/Button";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import { isValidEmail, isValidPassword } from "@/components/ui/validation";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
} from "../background/layers";
import type { AuthSectionProps } from "../types";

const TITLE_GLOW = "0 0 16.6px #FEE9D3";
const FIRST_NAME_ERROR = "Please enter your first name.";
const LAST_NAME_ERROR = "Please enter your last name.";
const EMAIL_ERROR = "Please enter a valid email.";
const PASSWORD_ERROR =
  "Password must be at least 8 characters with a capital letter and a number.";
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
  const router = useRouter();
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

  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmation.length > 0;

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
    if (errors.password && isValidPassword(value)) {
      setFieldError("password", null);
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    Object.values(refs).forEach((fieldRef) => fieldRef.current?.validate());

    const nextErrors: FormErrors = {};
    if (!firstName.trim()) nextErrors.firstName = FIRST_NAME_ERROR;
    if (!lastName.trim()) nextErrors.lastName = LAST_NAME_ERROR;
    if (!isValidEmail(email.trim())) nextErrors.email = EMAIL_ERROR;
    if (!isValidPassword(password)) nextErrors.password = PASSWORD_ERROR;
    if (!confirmation) {
      nextErrors.confirmation = CONFIRMATION_ERROR;
    } else if (password !== confirmation) {
      nextErrors.confirmation = MISMATCH_ERROR;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    router.push("/application");
  }

  return (
    <form aria-labelledby="sign-up-title" noValidate onSubmit={handleSubmit}>
      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={330}
        top={145}
        width={852}
        height={63}
        zIndex={40}
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
      >
        <TextField
          ref={refs.firstName}
          name="First Name"
          placeholder="Enter First Name"
          autoComplete="given-name"
          required
          theme="auth"
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
      >
        <TextField
          ref={refs.lastName}
          name="Last Name"
          placeholder="Enter Last Name"
          autoComplete="family-name"
          required
          theme="auth"
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
          errorMessages={{ required: PASSWORD_ERROR, invalid: PASSWORD_ERROR }}
          value={password}
          onChange={handlePasswordChange}
          onValidityChange={(hasError) =>
            setFieldError("password", hasError ? PASSWORD_ERROR : null)
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
      >
        <ErrorMessage message={errors.confirmation} />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={654.5}
        top={768}
        width={203}
        height={72}
        zIndex={40}
        className="flex items-start"
      >
        <Button
          text="Sign Up"
          buttonType={canSubmit ? "primary" : "disabled"}
          width="100%"
          fontSize={24}
          className="h-full"
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={548}
        top={855}
        width={416}
        height={33}
        zIndex={40}
        className="whitespace-nowrap text-center font-figtree font-semibold leading-[normal]"
      >
        <p className="m-0" style={{ fontSize: "81.521cqh" }}>
          <span className="text-[#F6C7FC]">Already have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="cursor-pointer border-0 bg-transparent p-0 font-inherit text-[#EAEFFF] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            Log in.
          </button>
        </p>
      </DesignBox>
    </form>
  );
}
