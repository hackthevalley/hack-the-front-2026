import type { AccessoryKey, AvatarKey } from "./data";

// Figma's Custom screens use one consistent 187 × 72 picker button.
export const CUSTOM_BUTTON_WIDTH = 187;
export const CUSTOM_BUTTON_ASPECT_RATIO = "187 / 72";

export const AVATARS: { key: AvatarKey; label: string; src: string }[] = [
  { key: "owl", label: "Owl", src: "/application/owl.svg" },
  { key: "bear", label: "Bear", src: "/application/bear.svg" },
  { key: "chipmunk", label: "Chipmunk", src: "/application/squirrel.svg" },
  { key: "raccoon", label: "Raccoon", src: "/application/raccoon.svg" },
];

export const ACCESSORIES: { key: AccessoryKey; label: string; src: string }[] =
  [
    { key: "hat", label: "Hat", src: "/application/hat.svg" },
    { key: "book", label: "Book", src: "/application/book.svg" },
    { key: "potion", label: "Potion", src: "/application/potion.svg" },
  ];

type AccessoryPlacement = {
  /** Left edge of the accessory image, as a % of the character frame's width. */
  left: number;
  /** Top edge of the accessory image, as a % of the character frame's height. */
  top: number;
  /** Accessory image width, as a % of the character frame's width (height follows its own aspect ratio). */
  width: number;
  /** Optional rotation in degrees, for accessories that sit at an angle (e.g. the book). */
  rotate?: number;
};

type ComboPlacement = {
  character: AvatarKey;
  accessory: AccessoryKey;
} & AccessoryPlacement;

// One entry per character x accessory combination (4 characters x 3
// accessories = 12), positioning the accessory image over the character
// within the same square frame. Values are estimated from the reference
// composite art and haven't been checked against a live render — nudge
// left/top/width/rotate here if an accessory drifts once you see it on
// screen.
export const COMBO_PLACEMENTS: ComboPlacement[] = [
  // Owl — stands upright with no paws, so potion/book sit beside it on the
  // ground rather than held.
  {
    character: "owl",
    accessory: "hat",
    left: 2,
    top: -3,
    width: 66,
    rotate: -36,
  },
  {
    character: "owl",
    accessory: "book",
    left: 54,
    top: 50,
    width: 42,
    rotate: -4,
  },
  { character: "owl", accessory: "potion", left: 60, top: 48, width: 20 },

  // Bear — sits with front paws together, holding the potion centered low.
  {
    character: "bear",
    accessory: "hat",
    left: 20,
    top: -4,
    width: 56,
    rotate: 0,
  },
  {
    character: "bear",
    accessory: "book",
    left: 25,
    top: 69,
    width: 46,
    rotate: -14,
  },
  { character: "bear", accessory: "potion", left: 37, top: 58, width: 24 },

  // Chipmunk (squirrel.svg)
  {
    character: "chipmunk",
    accessory: "hat",
    left: 27,
    top: 8,
    width: 46,
  },
  {
    character: "chipmunk",
    accessory: "book",
    left: 6,
    top: 64,
    width: 40,
    rotate: -8,
  },
  { character: "chipmunk", accessory: "potion", left: 41, top: 60, width: 16 },

  // Raccoon
  {
    character: "raccoon",
    accessory: "hat",
    left: 16,
    top: 6,
    width: 52,
    rotate: -2,
  },
  {
    character: "raccoon",
    accessory: "book",
    left: 6,
    top: 48,
    width: 42,
    rotate: 4,
  },
  {
    character: "raccoon",
    accessory: "potion",
    left: 36.95,
    top: 63.67,
    width: 15,
    rotate: 1,
  },
];

export function getComboPlacement(
  character: AvatarKey,
  accessory: AccessoryKey,
): AccessoryPlacement | undefined {
  return COMBO_PLACEMENTS.find(
    (combo) => combo.character === character && combo.accessory === accessory,
  );
}
