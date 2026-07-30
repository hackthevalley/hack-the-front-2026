"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DesignBox from "@/components/layout/DesignBox";
import Button from "@/components/ui/Button";
import TextField, { type TextFieldHandle } from "@/components/ui/TextField";
import { isValidEmail } from "@/components/ui/validation";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiUrl, type TokenResponse } from "@/lib/auth";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
} from "./background/layers";

const TITLE_GLOW = "0 0 16.6px #FEE9D3";
const EMAIL_ERROR = "Please enter a valid email.";
const CREDENTIAL_ERROR = "Email or password incorrect";
const LOGIN_ERROR = "Unable to log in. Please try again.";

export default function AuthTextOverlays() {
  const router = useRouter();
  const { login } = useAuth();
  const emailRef = React.useRef<TextFieldHandle>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [credentialError, setCredentialError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const canSubmit =
    email.trim().length > 0 && password.length > 0 && !isSubmitting;

  function handleEmailChange(value: string) {
    setEmail(value);
    setCredentialError(null);

    if (emailError && isValidEmail(value)) {
      setEmailError(null);
    }
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    setCredentialError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    if (!isValidEmail(email)) {
      setEmailError(EMAIL_ERROR);
      setCredentialError(null);
      emailRef.current?.focus();
      return;
    }

    setEmailError(null);
    setCredentialError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl("/api/account/sessions"), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!response.ok) {
        setCredentialError(
          response.status === 401 ? CREDENTIAL_ERROR : LOGIN_ERROR,
        );
        emailRef.current?.focus();
        return;
      }

      const data = (await response.json()) as Partial<TokenResponse>;
      if (
        typeof data.access_token !== "string" ||
        data.access_token.length === 0
      ) {
        setCredentialError(LOGIN_ERROR);
        return;
      }

      login(data.access_token);
      router.push("/dashboard");
    } catch {
      setCredentialError(LOGIN_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="auth-form"
      aria-labelledby="auth-title"
      aria-busy={isSubmitting}
      noValidate
      onSubmit={handleSubmit}
    >
      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={330}
        top={192}
        width={852}
        height={77}
        zIndex={40}
        compactRole="title"
        compactOrder={10}
        className="flex items-start justify-center text-center text-white"
      >
        <h1
          id="auth-title"
          className="m-0 whitespace-nowrap font-vcr font-normal leading-[normal]"
          style={{ fontSize: "83.117cqh", textShadow: TITLE_GLOW }}
        >
          Welcome back, Hacker
        </h1>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={390}
        top={293}
        width={733}
        height={40}
        zIndex={40}
        compactRole="subtitle"
        compactOrder={20}
        className="flex items-center text-[#F6C7FC]"
      >
        <span aria-hidden="true" className="h-[1.83px] w-[21.01%] bg-current" />
        <p
          className="m-0 flex-1 whitespace-nowrap text-center font-figtree font-semibold leading-[normal]"
          style={{ fontSize: "82.5cqh" }}
        >
          Sign in to view dashboard
        </p>
        <span aria-hidden="true" className="h-[1.83px] w-[21.01%] bg-current" />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407}
        top={385}
        width={699}
        height={98}
        zIndex={40}
        compactRole="field"
        compactOrder={30}
      >
        <TextField
          ref={emailRef}
          name="Email"
          placeholder="Enter Email"
          type="email"
          theme="auth"
          autoComplete="email"
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
        left={434}
        top={493}
        width={430}
        height={28}
        zIndex={45}
        compactRole="error"
        compactOrder={40}
        className="font-figtree font-normal leading-[normal] text-[#FFDADA]"
      >
        <p
          role="alert"
          aria-hidden={!emailError}
          className={`m-0 whitespace-nowrap ${emailError ? "" : "invisible"}`}
          style={{ fontSize: "71.429cqh" }}
        >
          {emailError ?? EMAIL_ERROR}
        </p>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407}
        top={539}
        width={699}
        height={98}
        zIndex={40}
        compactRole="field"
        compactOrder={50}
      >
        <TextField
          name="Password"
          placeholder="Enter Password"
          type="password"
          theme="auth"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={390}
        top={648}
        width={470}
        height={29}
        zIndex={45}
        compactRole="error"
        compactOrder={60}
        className="flex items-center gap-[2cqw] font-figtree font-normal leading-[normal] text-[#FFDADA]"
      >
        <img
          src="/icons/news-signup-error.svg"
          alt=""
          aria-hidden="true"
          className={`h-[68.966cqh] w-auto shrink-0 ${credentialError ? "" : "invisible"}`}
        />
        <p
          role="alert"
          aria-hidden={!credentialError}
          className={`m-0 whitespace-nowrap ${credentialError ? "" : "invisible"}`}
          style={{ fontSize: "68.966cqh" }}
        >
          {credentialError ?? CREDENTIAL_ERROR}
        </p>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={887}
        top={661}
        width={219}
        height={33}
        zIndex={40}
        compactRole="secondary"
        compactOrder={70}
        className="auth-forgot-link whitespace-nowrap font-figtree font-medium leading-[normal] text-[#EAEFFF]"
      >
        <Link
          href="/forgot-password"
          className="m-0 cursor-pointer border-0 bg-transparent p-0 text-inherit transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          style={{ fontSize: "81.521cqh" }}
        >
          Forgot Password?
        </Link>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={408}
        top={710.56}
        width={203}
        height={72.716}
        zIndex={40}
        compactRole="action"
        compactOrder={80}
        className="flex items-start"
      >
        <Button
          text={isSubmitting ? "Logging In..." : "Log In"}
          buttonType={canSubmit ? "primary" : "disabled"}
          width="100%"
          fontSize={24}
          className="h-full"
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={408}
        top={801.64}
        width={420}
        height={33}
        zIndex={40}
        compactRole="secondary"
        compactOrder={90}
        className="auth-account-link whitespace-nowrap font-figtree font-semibold leading-[normal]"
      >
        <p className="m-0" style={{ fontSize: "81.521cqh" }}>
          <span className="text-[#F6C7FC]">Don&apos;t have an account? </span>
          <Link
            href="/signup"
            className="cursor-pointer border-0 bg-transparent p-0 font-inherit text-[#EAEFFF] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            Sign up.
          </Link>
        </p>
      </DesignBox>
    </form>
  );
}
