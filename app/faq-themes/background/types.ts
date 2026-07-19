export type FaqThemesScenePlane = "rear" | "foreground";

export type FaqThemesSceneLayer = {
  id: string;
  figmaId: string;
  figmaName: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
  plane: FaqThemesScenePlane;
};

