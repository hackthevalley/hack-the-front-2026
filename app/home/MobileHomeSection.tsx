import DesignBox from "@/components/layout/DesignBox";
import {
  HOME_BACKGROUND_DESIGN_HEIGHT,
  HOME_BACKGROUND_DESIGN_WIDTH,
  homeBackgroundLayers,
} from "./background/layers";
import HomeApplyButton from "./HomeApplyButton";

const HOME_BACKGROUND_GRADIENT =
  "linear-gradient(181deg, #040142 9.13%, #DF63DC 25%)";
const PIXEL_GLOW =
  "0 0 8px rgba(255, 255, 255, 0.85), 0 0 18px rgba(255, 245, 230, 0.45)";
const SOFT_GLOW = "0 0 10px rgba(255, 255, 255, 0.35)";
const MOBILE_ABOUT_ZONE_TOP = "37.1%";
const MOBILE_ABOUT_ZONE_BOTTOM = "36.1%";
const MOBILE_ABOUT_ZONE_MAX_WIDTH = "21rem";

const MOBILE_LAYER_OVERRIDES: Record<
  string,
  Partial<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>
> = {
  "first-stump": {
    left: 674,
    top: 1644,
    width: 360,
    height: 226,
  },
  "second-stump": {
    left: 666,
    top: 1968,
    width: 330,
    height: 248,
  },
  "third-stump": {
    left: 662,
    top: 2292,
    width: 390,
    height: 269,
  },
};

function MobileSceneLayer({ layerId }: { layerId: string }) {
  const layer = homeBackgroundLayers.find((entry) => entry.id === layerId);
  if (!layer) return null;

  const override = MOBILE_LAYER_OVERRIDES[layer.id] ?? {};
  const left = override.left ?? layer.left;
  const top = override.top ?? layer.top;
  const width = override.width ?? layer.width;
  const height = override.height ?? layer.height;

  return (
    <div
      className="absolute"
      style={{
        left: `${(left / HOME_BACKGROUND_DESIGN_WIDTH) * 100}%`,
        top: `${(top / HOME_BACKGROUND_DESIGN_HEIGHT) * 100}%`,
        width: `${(width / HOME_BACKGROUND_DESIGN_WIDTH) * 100}%`,
        height: `${(height / HOME_BACKGROUND_DESIGN_HEIGHT) * 100}%`,
        transform: layer.rotation ? `rotate(${layer.rotation}deg)` : undefined,
        transformOrigin: "center center",
        zIndex: layer.zIndex ?? 0,
      }}
    >
      {layer.visibleBounds ? (
        <img
          src={layer.src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
          className="absolute max-w-none select-none"
          style={{
            left: `${-(layer.visibleBounds.left / layer.visibleBounds.width) * 100}%`,
            top: `${-(layer.visibleBounds.top / layer.visibleBounds.height) * 100}%`,
            width: `${(layer.visibleBounds.imageWidth / layer.visibleBounds.width) * 100}%`,
            height: `${(layer.visibleBounds.imageHeight / layer.visibleBounds.height) * 100}%`,
          }}
        />
      ) : (
        <img
          src={layer.src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
          className={
            layer.preserveAspectRatio
              ? "h-full w-full max-w-none select-none object-contain"
              : "h-full w-full max-w-none select-none"
          }
        />
      )}
    </div>
  );
}

function MobileStatLabel({
  left,
  top,
  width,
  height,
  value,
  lines,
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  value: string;
  lines: readonly [string, string];
}) {
  return (
    <DesignBox
      designWidth={HOME_BACKGROUND_DESIGN_WIDTH}
      designHeight={HOME_BACKGROUND_DESIGN_HEIGHT}
      left={left}
      top={top}
      width={width}
      height={height}
      zIndex={8}
      className="flex flex-col items-center justify-center text-center text-white"
    >
      <p
        className="m-0 font-vcr leading-none"
        style={{ fontSize: "3.25rem", textShadow: PIXEL_GLOW }}
      >
        {value}
      </p>
      <p
        className="m-0 mt-1.5 font-figtree text-[0.96rem] font-semibold uppercase leading-[1.16] tracking-[0.1em] text-white/88"
        style={{ textShadow: SOFT_GLOW }}
      >
        {lines[0]}
        <br />
        {lines[1]}
      </p>
    </DesignBox>
  );
}

export default function MobileHomeSection() {
  return (
    <section
      aria-labelledby="home-title-mobile"
      className="relative block overflow-hidden bg-[#040142] md:hidden"
      style={{ background: HOME_BACKGROUND_GRADIENT }}
    >
      <div
        className="relative left-1/2"
        style={{
          width: "clamp(1560px, 410vw, 1820px)",
          aspectRatio: `${HOME_BACKGROUND_DESIGN_WIDTH} / ${HOME_BACKGROUND_DESIGN_HEIGHT}`,
          transform: "translateX(-54%)",
          background: HOME_BACKGROUND_GRADIENT,
        }}
      >
        {homeBackgroundLayers.map((layer) => (
          <MobileSceneLayer key={layer.id} layerId={layer.id} />
        ))}

        <div className="pointer-events-none absolute left-0 top-0 z-[9] h-[10.87%] w-full bg-[rgba(14,22,72,0.35)] blur-[50px]" />

        <DesignBox
          designWidth={HOME_BACKGROUND_DESIGN_WIDTH}
          designHeight={HOME_BACKGROUND_DESIGN_HEIGHT}
          left={132}
          top={648}
          width={1520}
          height={508}
          zIndex={10}
          className="overflow-visible"
          style={{
            transform: "rotate(3deg)",
            transformOrigin: "22% 12%",
          }}
        >
          <svg
            viewBox="0 0 1520 508"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label="Hosted @ UofT Scarborough"
          >
            <defs>
              <path
                id="mobile-hosted-scene-path"
                d="M 0 250 C 110 108 436 0 760 0 C 1086 0 1410 108 1520 250"
                fill="none"
              />
            </defs>
            <text
              fill="#ffffff"
              fontSize={15}
              fontFamily="VCR OSD Mono, monospace"
              style={{
                filter:
                  "drop-shadow(0 0 14px rgba(255, 230, 204, 0.95)) drop-shadow(0 0 29px rgba(255, 230, 204, 0.6))",
              }}
            >
              <textPath href="#mobile-hosted-scene-path" startOffset="36%">
                Hosted @ UofT Scarborough
              </textPath>
            </text>
          </svg>
        </DesignBox>

        <MobileStatLabel
          left={706}
          top={1578}
          width={220}
          height={118}
          value="3602"
          lines={["APPLICANTS", "ON AVERAGE"]}
        />
        <MobileStatLabel
          left={716}
          top={1926}
          width={204}
          height={126}
          value="553"
          lines={["PARTICIPANTS", "ON AVERAGE"]}
        />
        <MobileStatLabel
          left={692}
          top={2246}
          width={266}
          height={122}
          value="56:44"
          lines={["MALE TO FEMALE", "RATIO ON AVERAGE"]}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[5.2%] z-10 px-6 text-white">
        <div className="max-w-[19rem]">
          <h1
            id="home-title-mobile"
            className="m-0 mt-4 text-[4.15rem] font-bold leading-[0.9] text-white"
            style={{
              textShadow:
                "0 0 24px rgba(255, 140, 180, 0.55), 0 0 48px rgba(223, 99, 220, 0.35)",
            }}
          >
            Hack the
            <br />
            Valley 11
          </h1>

          <p
            className="m-0 mt-5 max-w-[18rem] text-[1.05rem] font-medium leading-[1.45] text-white"
            style={{ textShadow: "0 0 12px rgba(255, 140, 180, 0.35)" }}
          >
            October 16-18, 2026 • In-person event
          </p>

          <div
            data-nav-target="apply"
            className="pointer-events-auto mt-7 w-full max-w-[11.35rem]"
          >
            <HomeApplyButton />
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 z-10 px-6 text-white"
        style={{
          top: MOBILE_ABOUT_ZONE_TOP,
          bottom: MOBILE_ABOUT_ZONE_BOTTOM,
        }}
      >
        <div
          className="mx-auto flex h-full w-full flex-col"
          style={{ maxWidth: MOBILE_ABOUT_ZONE_MAX_WIDTH }}
        >
          <div
            data-nav-target="about"
            className="flex h-full w-full flex-col text-left"
            style={{ scrollMarginTop: "24px" }}
          >
            <h2
              className="m-0 font-vcr text-[clamp(2.12rem,7.8vw,2.3rem)] leading-none"
              style={{ textShadow: PIXEL_GLOW }}
            >
              About Us
            </h2>

            <p className="m-0 mt-4 text-[clamp(0.92rem,4.05vw,1rem)] leading-[1.58] text-white/90">
              Join 750 innovative and creative developers, designers, and
              creators for{" "}
              <strong className="font-bold text-white">
                36 hours of hacking
              </strong>
              . You&apos;ll get access to some of the best hardware and APIs on
              the market, plus experienced and awesome mentors.
            </p>

            <p className="m-0 mt-4 text-[clamp(1rem,4.35vw,1.08rem)] font-bold leading-[1.45] text-white">
              All this in just one weekend? I know, it&apos;s hard to believe.
            </p>

            <p className="m-0 mt-4 text-[clamp(0.92rem,4.05vw,1rem)] leading-[1.58] text-white/90">
              Remember, you don&apos;t need to be a pro to attend. If this is
              your first hackathon, we can&apos;t wait to expose you to the
              incomparable world of creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
