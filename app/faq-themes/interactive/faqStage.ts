import {
  FAQ_THEMES_DESIGN_HEIGHT,
  FAQ_THEMES_DESIGN_WIDTH,
} from "../background/layers";

export { FAQ_THEMES_DESIGN_HEIGHT, FAQ_THEMES_DESIGN_WIDTH };

export const PAPER_FRAME = {
  width: 470,
  height: 607,
} as const;

export const PAPER_VISIBLE_BOUNDS = {
  imageWidth: 943,
  imageHeight: 1216,
  left: 3,
  top: 0,
  width: 936,
  height: 1211,
} as const;

export const STAMP_FRAME_SIZE = 148.1257;

export const toStageX = (px: number) => `${(px / FAQ_THEMES_DESIGN_WIDTH) * 100}%`;
export const toStageY = (px: number) => `${(px / FAQ_THEMES_DESIGN_HEIGHT) * 100}%`;
export const toStageWidth = (px: number) =>
  `${(px / FAQ_THEMES_DESIGN_WIDTH) * 100}%`;
export const toStageHeight = (px: number) =>
  `${(px / FAQ_THEMES_DESIGN_HEIGHT) * 100}%`;
export const toScale = (px: number) => `${(px / FAQ_THEMES_DESIGN_WIDTH) * 100}cqw`;

export const toPaperX = (px: number) => `${(px / PAPER_FRAME.width) * 100}%`;
export const toPaperY = (px: number) => `${(px / PAPER_FRAME.height) * 100}%`;
