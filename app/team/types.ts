export type TeamMember = {
  id: string;
  name: string;
  avatarSrc?: string;
};

export type JarColor = "teal" | "pink";

export type TeamJarSlot = {
  id: string;
  left: number;
  top: number;
  color: JarColor;
  member?: TeamMember;
};
