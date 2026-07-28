import DesignBox from "@/components/layout/DesignBox";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import {
  AUTH_BACKGROUND_DESIGN_HEIGHT,
  AUTH_BACKGROUND_DESIGN_WIDTH,
} from "./background/layers";

const TITLE_GLOW = "0 0 16.6px #FEE9D3";

export default function AuthTextOverlays() {
  return (
    <section aria-labelledby="auth-title">
      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={330}
        top={192}
        width={852}
        height={77}
        zIndex={40}
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
      >
        <TextField name="Email" placeholder="Enter Email" type="email" theme="auth" />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={407}
        top={539}
        width={699}
        height={98}
        zIndex={40}
      >
        <TextField
          name="Password"
          placeholder="Enter Password"
          type="password"
          theme="auth"
        />
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={887}
        top={661}
        width={219}
        height={33}
        zIndex={40}
        className="whitespace-nowrap font-figtree font-medium leading-[normal] text-[#EAEFFF]"
      >
        <p className="m-0" style={{ fontSize: "81.521cqh" }}>
          Forgot Password?
        </p>
      </DesignBox>

      <DesignBox
        designWidth={AUTH_BACKGROUND_DESIGN_WIDTH}
        designHeight={AUTH_BACKGROUND_DESIGN_HEIGHT}
        left={408}
        top={710.56}
        width={203}
        height={72.716}
        zIndex={40}
        className="flex items-start"
      >
        <Button
          text="Log In"
          buttonType="disabled"
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
        className="whitespace-nowrap font-figtree font-semibold leading-[normal]"
      >
        <p className="m-0" style={{ fontSize: "81.521cqh" }}>
          <span className="text-[#F6C7FC]">Don&apos;t have an account? </span>
          <span className="text-[#EAEFFF]">Sign up.</span>
        </p>
      </DesignBox>
    </section>
  );
}
