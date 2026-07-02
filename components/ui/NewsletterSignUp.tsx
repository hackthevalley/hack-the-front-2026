"use client";

import * as React from "react";
import { isValidEmail } from "./validation";

type SignupStatus = "idle" | "error" | "success" | "duplicate" | "loading";
type SubmitResult = "success" | "duplicate" | "error";

type NewsletterSignUpProps = {
  className?: string;
  defaultEmail?: string;
  onSubmitEmail?: (email: string) => Promise<SubmitResult> | SubmitResult;
};

type StatusUi = {
  text: string;
  color?: string;
  icon: string;
  shadow: string;
};

const EMAIL_ICON = "/icons/news-signup-email.svg";
const ERROR_ICON = "/icons/news-signup-error.svg";
const SEND_ICON = "/icons/news-signup-send.svg";
const SUCCESS_ICON = "/icons/news-signup-success.svg";

const STATUS_UI: Record<SignupStatus, StatusUi> = {
  idle: {
    text: "",
    icon: SEND_ICON,
    shadow: "inset 0px 2px 3.7px 0px #FFFFFF",
  },
  loading: {
    text: "",
    icon: SEND_ICON,
    shadow: "inset 0px 2px 3.7px 0px #FFFFFF",
  },
  error: {
    text: "Please enter an email.",
    color: "#FACED0",
    icon: ERROR_ICON,
    shadow: "0px 0px 10.7px 0px #EF4444, inset 0px 2px 3.7px 0px #FFFFFF",
  },
  success: {
    text: "Thank you for signing up! We will keep in touch.",
    color: "#A9F1D4",
    icon: SUCCESS_ICON,
    shadow: "0px 0px 10.7px 0px #10B981, inset 0px 2px 3.7px 0px #FFFFFF",
  },
  duplicate: {
    text: "You have already signed up!",
    color: "#FACED0",
    icon: ERROR_ICON,
    shadow: "0px 0px 10.7px 0px #EF4444, inset 0px 2px 3.7px 0px #FFFFFF",
  },
};

function getSendButtonStyle(
  status: SignupStatus,
  email: string,
): React.CSSProperties {
  const hasValue = email.trim().length > 0;
  const isSendState = status === "idle" || status === "loading";

  if (!isSendState) {
    return {
      background: "transparent",
    };
  }

  if (!hasValue) {
    return {
      background:
        "linear-gradient(0deg, #000000, #000000), linear-gradient(95.06deg, #FF7CCD -13.3%, #7839DC 113.68%)",
      backgroundBlendMode: "saturation, normal",
    };
  }

  return {
    background: "linear-gradient(95.06deg, #FF7CCD -13.3%, #7839DC 113.68%)",
  };
}

export default function NewsletterSignUp({
  className = "",
  defaultEmail = "",
  onSubmitEmail,
}: NewsletterSignUpProps) {
  const [email, setEmail] = React.useState(defaultEmail);
  const [focused, setFocused] = React.useState(false);
  const [status, setStatus] = React.useState<SignupStatus>("idle");

  const statusUi = STATUS_UI[status];
  const showOverlayPlaceholder = !focused && email.length === 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      setStatus("error");
      return;
    }

    try {
      // Test duplicate case
      if (trimmedEmail === "duplicate@test.com") {
        setStatus("duplicate");
        return;
      }

      setStatus("loading");

      if (onSubmitEmail) {
        const result = await onSubmitEmail(trimmedEmail);
        setStatus(result);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (status !== "idle") {
      setStatus("idle");
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className="
            relative box-border flex items-center
            w-[clamp(320px,31.085vw,470px)]
            h-[clamp(42px,3.704vw,56px)]
            rounded-[999px]
            bg-[rgba(255,255,255,0.37)]
            px-[clamp(10px,0.86vw,13px)]
            pr-[clamp(5px,0.397vw,6px)]
            py-[clamp(10px,0.86vw,13px)]
          "
          style={{ boxShadow: statusUi.shadow }}
        >
          <div className="flex h-full w-full items-center justify-between">
            <div className="flex min-w-0 flex-1 items-center gap-[clamp(5px,0.463vw,7px)]">
              <img
                src={EMAIL_ICON}
                alt=""
                aria-hidden="true"
                className="h-[clamp(15px,1.323vw,20px)] w-[clamp(15px,1.323vw,20px)] shrink-0"
              />

              <div className="relative min-w-0 flex-1 h-[clamp(12px,0.926vw,14px)]">
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={focused ? "user@gmail.com" : ""}
                  aria-label="Email address"
                  aria-invalid={status === "error" || status === "duplicate"}
                  aria-describedby="newsletter-signup-message"
                  disabled={status === "loading"}
                  className="
                    absolute inset-0 w-full min-w-0 bg-transparent outline-none
                    text-[clamp(10px,0.794vw,12px)] leading-[clamp(12px,0.926vw,14px)] text-white
                    placeholder:text-white
                    disabled:cursor-not-allowed
                  "
                />

                {showOverlayPlaceholder && (
                  <span
                    className="
                      pointer-events-none absolute inset-0 flex items-center
                      overflow-hidden whitespace-nowrap text-ellipsis
                      text-[clamp(10px,0.794vw,12px)] leading-[clamp(12px,0.926vw,14px)] text-white
                    "
                  >
                    Sign up for the latest news!
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              aria-label="Submit newsletter signup"
              disabled={status === "loading"}
              className="
                ml-[clamp(10px,0.86vw,13px)] flex shrink-0 items-center justify-center
                h-[clamp(34px,2.91vw,44px)] w-[clamp(34px,2.91vw,44px)]
                rounded-full
                disabled:cursor-not-allowed disabled:opacity-70
              "
              style={getSendButtonStyle(status, email)}
            >
              <img
                src={statusUi.icon}
                alt=""
                aria-hidden="true"
                className={
                  status === "idle" || status === "loading"
                    ? "h-[clamp(18px,1.587vw,24px)] w-[clamp(18px,1.587vw,24px)] shrink-0"
                    : "h-[clamp(15px,1.323vw,20px)] w-[clamp(15px,1.323vw,20px)] shrink-0"
                }
              />
            </button>
          </div>
        </div>
      </form>

      <p
        id="newsletter-signup-message"
        className={
          statusUi.text
            ? "mt-[clamp(10px,1vw,16px)] text-[clamp(12px,1.06vw,16px)]"
            : "sr-only"
        }
        style={statusUi.text ? { color: statusUi.color } : undefined}
      >
        {statusUi.text}
      </p>
    </div>
  );
}
