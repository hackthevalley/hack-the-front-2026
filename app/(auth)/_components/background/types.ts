export type AuthBackgroundBleed = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type AuthBackgroundLayer = {
  id: string;
  figmaId: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
  transform?: string;
  bleed?: AuthBackgroundBleed;
};
