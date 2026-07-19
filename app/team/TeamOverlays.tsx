import type { CSSProperties, ReactNode } from "react";
import {
  JAR_AVATAR_INSET,
  JAR_HEIGHT,
  JAR_SRC_BY_COLOR,
  JAR_WIDTH,
  TEAM_DESIGN_HEIGHT,
  TEAM_DESIGN_WIDTH,
} from "./background/layers";
import { jarSlots } from "./data";
import type { JarColor, TeamMember } from "./types";

const HEADING_GLOW =
  "0 0 8px rgba(255, 255, 255, 0.85), 0 0 18px rgba(255, 245, 230, 0.45)";

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
    <div className="relative h-full w-full">
      <img
        src={JAR_SRC_BY_COLOR[color]}
        alt=""
        draggable="false"
        className="h-full w-full max-w-none select-none"
      />
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
          <img
            src={member.avatarSrc}
            alt={member.name}
            draggable="false"
            className="h-full w-full select-none object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

export default function TeamOverlays() {
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

      {jarSlots.map((slot) => (
        <DesignBox
          key={slot.id}
          left={slot.left}
          top={slot.top}
          width={JAR_WIDTH}
          height={JAR_HEIGHT}
          zIndex={4}
        >
          <TeamJar color={slot.color} member={slot.member} />
        </DesignBox>
      ))}
    </>
  );
}
