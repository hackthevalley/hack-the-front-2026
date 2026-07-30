import type { FaqToSponsorsTransitionLayer } from "./types";

export const FAQ_TO_SPONSORS_DESIGN_WIDTH = 1512;
export const FAQ_TO_SPONSORS_SPONSORS_TOP = 6223;
const FAQ_TO_SPONSORS_BAND_PADDING_TOP = 160;
const FAQ_TO_SPONSORS_BAND_PADDING_BOTTOM = 160;

export const faqToSponsorsTransitionLayers: readonly FaqToSponsorsTransitionLayer[] =
  [
    {
      id: "grass-left",
      figmaId: "1617:5035",
      figmaName: "grass",
      src: "/transitions/faq-to-sponsors/grass-left.svg",
      sourceWidth: 455.85809326171875,
      sourceHeight: 942.1201171875,
      matrix: [
        -0.9549810886383057, -0.2966667413711548, -0.2966667413711548,
        0.9549810886383057, 714.8315633138845, 135.237935055622,
      ],
      left: -429.9987996420095,
      top: 5913.000346194378 - FAQ_TO_SPONSORS_SPONSORS_TOP,
      width: 714.8315633138845,
      height: 1034.944830195389,
      rotation: 162.74249088572762,
      zIndex: 1,
    },
    {
      id: "grass-right",
      figmaId: "1617:5063",
      figmaName: "grass",
      src: "/transitions/faq-to-sponsors/grass-right.svg",
      sourceWidth: 455.85894775390625,
      sourceHeight: 942.1205444335938,
      matrix: [
        0.9549810886383057, -0.2966667413711548, 0.2966667413711548,
        0.9549810886383057, 0, 135.238188555035,
      ],
      left: 1233.512939453125,
      top: 5873.587495038715 - FAQ_TO_SPONSORS_SPONSORS_TOP,
      width: 714.8325060874704,
      height: 1034.9454917067414,
      rotation: 17.257509114272402,
      zIndex: 1,
    },
  ];

const minLayerTop = Math.min(
  ...faqToSponsorsTransitionLayers.map((layer) => layer.top),
);
const maxLayerBottom = Math.max(
  ...faqToSponsorsTransitionLayers.map((layer) => layer.top + layer.height),
);

export const FAQ_TO_SPONSORS_BAND_TOP =
  minLayerTop - FAQ_TO_SPONSORS_BAND_PADDING_TOP;

export const FAQ_TO_SPONSORS_BAND_HEIGHT =
  maxLayerBottom +
  FAQ_TO_SPONSORS_BAND_PADDING_BOTTOM -
  FAQ_TO_SPONSORS_BAND_TOP;
