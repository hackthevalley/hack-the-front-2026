import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  JAR_AVATAR_INSET,
  JAR_HEIGHT,
  JAR_SRC_BY_COLOR,
  JAR_WIDTH,
  SHELF_ROW_BANDS,
  TEAM_DESIGN_HEIGHT,
  TEAM_DESIGN_WIDTH,
} from "./background/layers";
import { jarSlots, SHELF_PROPS, SHELF_ROW_WIDTHS } from "./data";
import { teamMembers } from "./members";
import type { JarColor, TeamMember } from "./types";

type MarqueeDirection = "left" | "right";
type VerticalBand = { top: number; height: number };

const HEADING_GLOW = "0 0 13.53cqh #FFFFFF";
const NAME_GLOW = "0 0 2.58cqh #FFFFFF";
const ROLE_GLOW = "0 0 1.3cqh rgba(255, 255, 255, 0.55)";

const MARQUEE_SPEED_PX_PER_SEC = TEAM_DESIGN_WIDTH / 72;

type DesignBoxProps = {
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
  zIndex = 5,
  className = "",
  style,
  children,
}: DesignBoxProps) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: `${(left / TEAM_DESIGN_WIDTH) * 100}%`,
        top: `${(top / TEAM_DESIGN_HEIGHT) * 100}%`,
        width: `${(width / TEAM_DESIGN_WIDTH) * 100}%`,
        height: `${(height / TEAM_DESIGN_HEIGHT) * 100}%`,
        zIndex,
        containerType: "size",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function TeamJar({ color, member }: { color: JarColor; member?: TeamMember }) {
  return (
    <div className="relative h-full w-full" style={{ containerType: "size" }}>
      <img
        src={JAR_SRC_BY_COLOR[color]}
        alt=""
        draggable="false"
        className="h-full w-full max-w-none select-none"
      />
      {member ? (
        <div className="team-shelf-tooltip pointer-events-none absolute bottom-full left-1/2 z-30 mb-[10%] w-max max-w-[240cqw] -translate-x-1/2 text-center">
          <p
            className="m-0 whitespace-nowrap font-figtree font-normal leading-tight text-white"
            style={{ fontSize: "13cqh", textShadow: NAME_GLOW }}
          >
            {member.name}
          </p>
          <p
            className="m-0 whitespace-nowrap font-figtree font-normal leading-tight text-white/60"
            style={{ fontSize: "13cqh", textShadow: ROLE_GLOW }}
          >
            {member.role}
          </p>
        </div>
      ) : null}
      {member?.avatarSrc ? (
        <div
          className="absolute overflow-hidden rounded-full"
          style={{
            left: `${JAR_AVATAR_INSET.leftFraction * 100}%`,
            top: `${JAR_AVATAR_INSET.topFraction * 100}%`,
            width: `${JAR_AVATAR_INSET.widthFraction * 100}%`,
            height: `${JAR_AVATAR_INSET.heightFraction * 100}%`,
          }}
        >
          <Image
            src={member.avatarSrc}
            alt={member.name}
            fill
            sizes="100px"
            draggable="false"
            className="select-none object-cover"
            style={{ objectPosition: "50% 20%" }}
          />
        </div>
      ) : null}
    </div>
  );
}

function MarqueeItem({
  left,
  top,
  width,
  height,
  band,
  loopWidth,
  zIndex,
  direction,
  isHoverTrigger = false,
  children,
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  band: VerticalBand;
  loopWidth: number;
  zIndex: number;
  direction: MarqueeDirection;
  isHoverTrigger?: boolean;
  children: ReactNode;
}) {
  const travelPercent = (loopWidth / width) * 100;
  const durationSeconds = loopWidth / MARQUEE_SPEED_PX_PER_SEC;
  const topPercent = ((top - band.top) / band.height) * 100;
  const heightPercent = (height / band.height) * 100;

  return (
    <>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`team-shelf-marquee-item team-shelf-marquee-item--${direction} absolute ${
            isHoverTrigger ? "" : "pointer-events-auto"
          }`}
          style={
            {
              left: `${((left + copy * loopWidth) / TEAM_DESIGN_WIDTH) * 100}%`,
              top: `${topPercent}%`,
              width: `${(width / TEAM_DESIGN_WIDTH) * 100}%`,
              height: `${heightPercent}%`,
              zIndex,
              "--marquee-duration": `${durationSeconds}s`,
              "--marquee-travel": `${travelPercent}%`,
            } as CSSProperties
          }
        >
          {children}
          {isHoverTrigger ? (
            <div
              aria-hidden="true"
              className="team-shelf-hover-trigger pointer-events-auto absolute inset-0"
              style={{ clipPath: "ellipse(50% 50% at 50% 52%)" }}
            />
          ) : null}
        </div>
      ))}
    </>
  );
}

function ShelfProp({
  id,
  src,
  left,
  top,
  width,
  height,
  band,
  loopWidth,
  direction,
}: {
  id: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  band: VerticalBand;
  loopWidth: number;
  direction: MarqueeDirection;
}) {
  return (
    <MarqueeItem
      left={left}
      top={top}
      width={width}
      height={height}
      band={band}
      loopWidth={loopWidth}
      zIndex={6}
      direction={direction}
    >
      <img
        key={id}
        src={src}
        alt=""
        draggable="false"
        className="h-full w-full max-w-none select-none"
      />
    </MarqueeItem>
  );
}

function ShelfJars({
  shelfId,
  band,
  loopWidth,
  direction,
}: {
  shelfId: "shelf-1" | "shelf-2" | "shelf-3";
  band: VerticalBand;
  loopWidth: number;
  direction: MarqueeDirection;
}) {
  const slots = jarSlots.filter((slot) => slot.id.startsWith(shelfId));

  return (
    <>
      {slots.map((slot) => (
        <MarqueeItem
          key={slot.id}
          left={slot.left}
          top={slot.top}
          width={JAR_WIDTH}
          height={JAR_HEIGHT}
          band={band}
          loopWidth={loopWidth}
          zIndex={4}
          direction={direction}
          isHoverTrigger
        >
          <TeamJar color={slot.color} member={teamMembers[slot.id]} />
        </MarqueeItem>
      ))}
    </>
  );
}

function ShelfRow({
  band,
  children,
}: {
  band: VerticalBand;
  children: ReactNode;
}) {
  return (
    <div
      className="team-shelf-row pointer-events-none absolute left-0 w-full"
      style={{
        top: `${(band.top / TEAM_DESIGN_HEIGHT) * 100}%`,
        height: `${(band.height / TEAM_DESIGN_HEIGHT) * 100}%`,
      }}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-auto absolute left-0 top-0 h-full"
        style={{ width: `${((JAR_WIDTH * 1.5) / TEAM_DESIGN_WIDTH) * 100}%`, zIndex: 20 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-auto absolute right-0 top-0 h-full"
        style={{ width: `${((JAR_WIDTH * 1.5) / TEAM_DESIGN_WIDTH) * 100}%`, zIndex: 20 }}
      />
    </div>
  );
}

export default function TeamOverlays() {
  const [band1, band2, band3] = SHELF_ROW_BANDS;

  return (
    <>
      <DesignBox left={482} top={81} width={549} height={70} zIndex={4}>
        <p
          className="m-0 w-full text-center font-vcr leading-none text-white"
          style={{ fontSize: "72cqh", textShadow: HEADING_GLOW }}
        >
          Meet Our Team
        </p>
      </DesignBox>

      <ShelfRow band={band1}>
        <ShelfJars
          shelfId="shelf-1"
          band={band1}
          loopWidth={SHELF_ROW_WIDTHS.shelf1}
          direction="right"
        />
        {SHELF_PROPS.shelf1.map((prop) => (
          <ShelfProp
            key={prop.id}
            {...prop}
            band={band1}
            loopWidth={SHELF_ROW_WIDTHS.shelf1}
            direction="right"
          />
        ))}
      </ShelfRow>

      <ShelfRow band={band2}>
        <ShelfJars
          shelfId="shelf-2"
          band={band2}
          loopWidth={SHELF_ROW_WIDTHS.shelf2}
          direction="left"
        />
        {SHELF_PROPS.shelf2.map((prop) => (
          <ShelfProp
            key={prop.id}
            {...prop}
            band={band2}
            loopWidth={SHELF_ROW_WIDTHS.shelf2}
            direction="left"
          />
        ))}
      </ShelfRow>

      <ShelfRow band={band3}>
        <ShelfJars
          shelfId="shelf-3"
          band={band3}
          loopWidth={SHELF_ROW_WIDTHS.shelf3}
          direction="right"
        />
        {SHELF_PROPS.shelf3.map((prop) => (
          <ShelfProp
            key={prop.id}
            {...prop}
            band={band3}
            loopWidth={SHELF_ROW_WIDTHS.shelf3}
            direction="right"
          />
        ))}
      </ShelfRow>
    </>
  );
}
