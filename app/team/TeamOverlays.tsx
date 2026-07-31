"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode, Ref } from "react";
import { useEffect, useRef, useState } from "react";
import DesignBox from "@/components/layout/DesignBox";
import {
  JAR_AVATAR_INSET,
  JAR_HEIGHT,
  JAR_SRC_BY_COLOR,
  JAR_TOP_OFFSET,
  JAR_WIDTH,
  SHELF_ROW_BANDS,
  SHELF_TOPS,
  TEAM_DESIGN_HEIGHT,
  TEAM_DESIGN_WIDTH,
} from "./background/layers";
import type { TeamLayer } from "./background/types";
import { jarSlots, SHELF_PROPS, SHELF_ROW_WIDTHS } from "./data";
import type { JarColor, TeamMember } from "./types";

type MarqueeDirection = "left" | "right";
type VerticalBand = { top: number; height: number };

const HEADING_GLOW = "0 0 13.53cqh #FFFFFF";
const NAME_GLOW = "0 0 2.58cqh #FFFFFF";
const ROLE_GLOW = "0 0 1.3cqh rgba(255, 255, 255, 0.55)";
const SHELF_TAP_NAME_GLOW = "0 0 8.93cqh #FFFFFF";
const SHELF_TAP_ROLE_GLOW = "0 0 3.5cqh rgba(255, 255, 255, 0.55)";

const MARQUEE_SPEED_PX_PER_SEC = TEAM_DESIGN_WIDTH / 40;

function TeamJar({ color, member }: { color: JarColor; member?: TeamMember }) {
  return (
    <div className="relative h-full w-full" style={{ containerType: "size" }}>
      <img
        src={JAR_SRC_BY_COLOR[color]}
        alt=""
        draggable="false"
        className="team-shelf-jar-glow h-full w-full max-w-none select-none"
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
  isTapped = false,
  triggerLabel,
  href,
  onToggleTap,
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
  isTapped?: boolean;
  triggerLabel?: string;
  href?: string;
  onToggleTap?: () => void;
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
          {isHoverTrigger && href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={triggerLabel}
              className="team-shelf-hover-trigger pointer-events-auto absolute inset-0 cursor-pointer"
              style={{ clipPath: "ellipse(50% 50% at 50% 52%)" }}
              onClick={(event) => event.stopPropagation()}
            />
          ) : isHoverTrigger ? (
            <button
              type="button"
              aria-label={triggerLabel}
              className={`team-shelf-hover-trigger pointer-events-auto absolute inset-0 appearance-none border-0 bg-transparent p-0 ${
                isTapped ? "is-tapped" : ""
              }`}
              style={{ clipPath: "ellipse(50% 50% at 50% 52%)" }}
              onClick={(event) => {
                event.stopPropagation();
                if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                onToggleTap?.();
              }}
            />
          ) : null}
        </div>
      ))}
    </>
  );
}

function ShelfProp({
  src,
  left,
  top,
  width,
  height,
  band,
  loopWidth,
  direction,
}: {
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
  teamMembers,
  activeSlotId,
  onToggleTap,
}: {
  shelfId: "shelf-1" | "shelf-2" | "shelf-3";
  band: VerticalBand;
  loopWidth: number;
  direction: MarqueeDirection;
  teamMembers: Record<string, TeamMember>;
  activeSlotId: string | null;
  onToggleTap: (slotId: string) => void;
}) {
  const slots = jarSlots.filter((slot) => slot.id.startsWith(shelfId));

  return (
    <>
      {slots.map((slot) => {
        const member = teamMembers[slot.id];
        return (
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
            isTapped={activeSlotId === slot.id}
            triggerLabel={
              member
                ? `Open ${member.name}'s LinkedIn profile in a new tab`
                : undefined
            }
            href={member?.linkedinUrl}
            onToggleTap={() => onToggleTap(slot.id)}
          >
            <TeamJar color={slot.color} member={member} />
          </MarqueeItem>
        );
      })}
    </>
  );
}

const SHELF_TAP_LABEL_HEIGHT = 44;
const SHELF_TAP_LABEL_GAP = 20;

function ShelfTapLabel({ member }: { member: TeamMember }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-end text-center">
      <p
        className="m-0 whitespace-nowrap font-figtree font-normal leading-tight text-white"
        style={{ fontSize: "45cqh", textShadow: SHELF_TAP_NAME_GLOW }}
      >
        {member.name}
      </p>
      <p
        className="m-0 whitespace-nowrap font-figtree font-normal leading-tight text-white/60"
        style={{ fontSize: "35cqh", textShadow: SHELF_TAP_ROLE_GLOW }}
      >
        {member.role}
      </p>
    </div>
  );
}

function ShelfRow({
  band,
  containerRef,
  children,
}: {
  band: VerticalBand;
  containerRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div
      ref={containerRef}
      className="team-shelf-row pointer-events-none absolute left-0 w-full"
      style={{
        top: `${(band.top / TEAM_DESIGN_HEIGHT) * 100}%`,
        height: `${(band.height / TEAM_DESIGN_HEIGHT) * 100}%`,
        containerType: "size",
      }}
    >
      {children}
      <div
        aria-hidden="true"
        className="team-shelf-edge-blocker pointer-events-auto absolute left-0 top-0 h-full"
        style={{
          width: `${((JAR_WIDTH * 1.5) / TEAM_DESIGN_WIDTH) * 100}%`,
          zIndex: 20,
        }}
      />
      <div
        aria-hidden="true"
        className="team-shelf-edge-blocker pointer-events-auto absolute right-0 top-0 h-full"
        style={{
          width: `${((JAR_WIDTH * 1.5) / TEAM_DESIGN_WIDTH) * 100}%`,
          zIndex: 20,
        }}
      />
    </div>
  );
}

function ShelfSection({
  shelfId,
  band,
  jarTop,
  loopWidth,
  direction,
  teamMembers,
  props,
}: {
  shelfId: "shelf-1" | "shelf-2" | "shelf-3";
  band: VerticalBand;
  jarTop: number;
  loopWidth: number;
  direction: MarqueeDirection;
  teamMembers: Record<string, TeamMember>;
  props: readonly TeamLayer[];
}) {
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeSlotId) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rowRef.current?.contains(event.target as Node)) {
        setActiveSlotId(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [activeSlotId]);

  const activeMember = activeSlotId ? (teamMembers[activeSlotId] ?? null) : null;

  return (
    <>
      <ShelfRow band={band} containerRef={rowRef}>
        <ShelfJars
          shelfId={shelfId}
          band={band}
          loopWidth={loopWidth}
          direction={direction}
          teamMembers={teamMembers}
          activeSlotId={activeSlotId}
          onToggleTap={(slotId) =>
            setActiveSlotId((current) => (current === slotId ? null : slotId))
          }
        />
        {props.map((prop) => (
          <ShelfProp key={prop.id} {...prop} band={band} loopWidth={loopWidth} direction={direction} />
        ))}
      </ShelfRow>
      {activeMember ? (
        <DesignBox
          designWidth={TEAM_DESIGN_WIDTH}
          designHeight={TEAM_DESIGN_HEIGHT}
          left={0}
          top={jarTop - SHELF_TAP_LABEL_HEIGHT - SHELF_TAP_LABEL_GAP}
          width={TEAM_DESIGN_WIDTH}
          height={SHELF_TAP_LABEL_HEIGHT}
          zIndex={40}
          className="pointer-events-none"
        >
          <ShelfTapLabel member={activeMember} />
        </DesignBox>
      ) : null}
    </>
  );
}

export default function TeamOverlays({
  teamMembers,
}: {
  teamMembers: Record<string, TeamMember>;
}) {
  const [band1, band2, band3] = SHELF_ROW_BANDS;

  return (
    <>
      <DesignBox
        designWidth={TEAM_DESIGN_WIDTH}
        designHeight={TEAM_DESIGN_HEIGHT}
        left={482}
        top={81}
        width={549}
        height={72}
        zIndex={4}
      >
        <p
          className="m-0 w-full text-center font-vcr leading-none text-white"
          style={{ fontSize: "100cqh", textShadow: HEADING_GLOW }}
        >
          Meet Our Team
        </p>
      </DesignBox>

      <ShelfSection
        shelfId="shelf-1"
        band={band1}
        jarTop={SHELF_TOPS[0] + JAR_TOP_OFFSET}
        loopWidth={SHELF_ROW_WIDTHS.shelf1}
        direction="right"
        teamMembers={teamMembers}
        props={SHELF_PROPS.shelf1}
      />

      <ShelfSection
        shelfId="shelf-2"
        band={band2}
        jarTop={SHELF_TOPS[1] + JAR_TOP_OFFSET}
        loopWidth={SHELF_ROW_WIDTHS.shelf2}
        direction="left"
        teamMembers={teamMembers}
        props={SHELF_PROPS.shelf2}
      />

      <ShelfSection
        shelfId="shelf-3"
        band={band3}
        jarTop={SHELF_TOPS[2] + JAR_TOP_OFFSET}
        loopWidth={SHELF_ROW_WIDTHS.shelf3}
        direction="right"
        teamMembers={teamMembers}
        props={SHELF_PROPS.shelf3}
      />
    </>
  );
}
