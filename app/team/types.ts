export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatarSrc?: string;
};

export type JarColor = "teal" | "pink";

export type TeamJarSlot = {
  id: string;
  left: number;
  top: number;
  color: JarColor;
};

export type PropId = "skull" | "crystal" | "pottedPlant" | "smallMushroom";

export type ShelfColumn =
  | { type: "jar"; color: JarColor }
  | { type: "prop"; propId: PropId };
