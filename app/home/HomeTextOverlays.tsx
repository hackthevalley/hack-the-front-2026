import type { CSSProperties, ReactNode } from "react";
import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
} from "./background/layers";

const PIXEL_GLOW =
  "0 0 8px rgba(255, 255, 255, 0.85), 0 0 18px rgba(255, 245, 230, 0.45)";
const SOFT_GLOW = "0 0 10px rgba(255, 255, 255, 0.35)";

type BoxProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function DesignBox({
  left,
  top,
  width,
  height,
  zIndex = 9,
  className = "",
  style,
  children,
}: BoxProps) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: `${(left / HOME_BACKGROUND_DESIGN_WIDTH) * 100}%`,
        top: `${(top / HOME_BACKGROUND_DESIGN_HEIGHT) * 100}%`,
        width: `${(width / HOME_BACKGROUND_DESIGN_WIDTH) * 100}%`,
        height: `${(height / HOME_BACKGROUND_DESIGN_HEIGHT) * 100}%`,
        zIndex,
        containerType: "size",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type StatProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  value: string;
  lines: readonly [string, string];
};

function StatBlock({ left, top, width, height, value, lines }: StatProps) {
  return (
    <DesignBox
      left={left}
      top={top}
      width={width}
      height={height}
      zIndex={8}
      className="flex flex-col items-center justify-center text-center text-white"
    >
      <p
        className="m-0 font-vcr leading-none"
        style={{ fontSize: "48cqh", textShadow: PIXEL_GLOW }}
      >
        {value}
      </p>
      <p
        className="m-0 mt-[3cqh] font-figtree font-medium uppercase leading-[1.15] tracking-[0.08em]"
        style={{ fontSize: "12cqh", textShadow: SOFT_GLOW }}
      >
        {lines[0]}
        <br />
        {lines[1]}
      </p>
    </DesignBox>
  );
}

/**
 * Foreground copy that used to live in PNGs: hosted line, about section, stump stats.
 */
export default function HomeTextOverlays() {
  return (
    <>
      {/*
        Matches Figma TEXT_PATH 777:4384 — VCR text on the upper-left
        quadrant of an ellipse so it sits on the hill and curves right.
      */}
      <DesignBox
        left={112.5}
        top={670}
        width={1624.44}
        height={529.77}
        className="overflow-visible"
        style={{
          transform: "rotate(3deg)",
          // Pivot near the glyphs so clockwise rotation doesn't lift them
          transformOrigin: "22% 12%",
        }}
      >
        <svg
          viewBox="0 0 1624.438 529.772"
          className="h-full w-full overflow-visible"
          role="img"
          aria-label="Hosted @ UofT Scarborough"
        >
          <defs>
            <path
              id="hosted-hill-path"
              d="M 0 264.886 C 0 118.593 363.643 0 812.219 0 C 1260.796 0 1624.438 118.593 1624.438 264.886"
              fill="none"
            />
          </defs>
          <text
            fill="#ffffff"
            fontSize={24}
            fontFamily="VCR OSD Mono, monospace"
            style={{
              filter:
                "drop-shadow(0 0 14px rgba(255, 230, 204, 0.95)) drop-shadow(0 0 29px rgba(255, 230, 204, 0.6))",
            }}
          >
            <textPath href="#hosted-hill-path" startOffset="25%">
              Hosted @ UofT Scarborough
            </textPath>
          </text>
        </svg>
      </DesignBox>

      <DesignBox
        left={755.55}
        top={1022.18}
        width={665}
        height={348}
        className="flex flex-col text-white"
      >
        <h2
          id="about-title"
          className="m-0 font-vcr leading-none"
          style={{ fontSize: "15cqh", textShadow: PIXEL_GLOW }}
        >
          About Us
        </h2>
        <p
          className="m-0 mt-[4cqh] font-figtree font-normal leading-[1.4]"
          style={{ fontSize: "5.8cqh", textShadow: SOFT_GLOW }}
        >
          Join 750 innovative and creative developers, designers, and creators
          for <strong className="font-bold">36 hours of hacking</strong>.
          You&apos;ll get access to some of the best hardware and APIs on the
          market. Plus, you get to meet some experienced and awesome mentors!
        </p>
        <p
          className="m-0 mt-[4cqh] font-figtree font-bold leading-[1.3]"
          style={{ fontSize: "6.5cqh", textShadow: SOFT_GLOW }}
        >
          All this in just one weekend? I know, it&apos;s hard to believe.
        </p>
        <p
          className="m-0 mt-[4cqh] font-figtree font-normal leading-[1.4]"
          style={{ fontSize: "5.8cqh", textShadow: SOFT_GLOW }}
        >
          Remember, you don&apos;t need to be a pro to attend. So if this is
          your first hackathon, we can&apos;t wait to expose you to the
          incomparable world of creation.
        </p>
      </DesignBox>

      <StatBlock
        left={361.1393}
        top={1585.5488}
        width={230}
        height={140}
        value="3602"
        lines={["APPLICANTS", "ON AVERAGE"]}
      />
      <StatBlock
        left={959.84}
        top={1751.75}
        width={201.63735961914062}
        height={155}
        value="553"
        lines={["PARTICIPANTS", "ON AVERAGE"]}
      />
      <StatBlock
        left={455.2863}
        top={1978.4961}
        width={290.8379}
        height={150}
        value="56:44"
        lines={["MALE TO FEMALE", "RATIO ON AVERAGE"]}
      />
    </>
  );
}
