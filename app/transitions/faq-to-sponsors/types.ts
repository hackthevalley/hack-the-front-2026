export type FaqToSponsorsTransitionLayer = {
  id: string;
  figmaId: string;
  figmaName: string;
  src: string;
  sourceWidth: number;
  sourceHeight: number;
  matrix: readonly [number, number, number, number, number, number];
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  zIndex?: number;
};
