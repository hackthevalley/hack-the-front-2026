import type { HomeToFaqTransitionLayer } from "./types";

export const HOME_TO_FAQ_DESIGN_WIDTH = 1512;
const HOME_TO_FAQ_BAND_PADDING_TOP = 160;
const HOME_TO_FAQ_BAND_PADDING_BOTTOM = 160;

export const homeToFaqTransitionLayers: readonly HomeToFaqTransitionLayer[] = [
  {
    id: "grass-left",
    src: "/transitions/home-to-faq/grass.svg",
    left: -191,
    top: 2047,
    width: 445.4939270019531,
    height: 1129.203857421875,
    zIndex: 1,
  },
  {
    id: "grass-right",
    src: "/transitions/home-to-faq/grass-right.svg",
    left: 1284.54,
    top: 2194.49,
    width: 513.506103515625,
    height: 1129.203857421875,
    zIndex: 1,
  },
  {
    id: "leaves-left",
    src: "/transitions/home-to-faq/leaves.svg",
    left: -1,
    top: 2383,
    width: 401.33215634528375,
    height: 444.8795199547644,
    zIndex: 2,
  },
  {
    id: "top-leaves-left",
    src: "/transitions/home-to-faq/top-leaves.svg",
    left: -74.0002,
    top: 2334,
    width: 506.8621,
    height: 751.5433,
    zIndex: 3,
  },
  {
    id: "tree-left",
    src: "/transitions/home-to-faq/tree.svg",
    left: -160.8,
    top: 2446.9,
    width: 554.0438154235907,
    height: 1295.878643822098,
    rotation: -166.18,
    zIndex: 2,
  },
  {
    id: "top-leaves-right",
    src: "/transitions/home-to-faq/top-leaves-right.svg",
    left: 965,
    top: 2363,
    width: 597.1431,
    height: 673.9963,
    zIndex: 3,
  },
  {
    id: "tree-right",
    src: "/transitions/home-to-faq/tree-right.svg",
    left: 1090.4,
    top: 2440,
    width: 530.8277582979352,
    height: 1029.2589101805318,
    rotation: -25.63,
    zIndex: 2,
  },
  {
    id: "underwall",
    src: "/transitions/home-to-faq/upperwall.svg",
    left: -8,
    top: 2573,
    width: 1526,
    height: 292.130859375,
    zIndex: 0.5,
  },
  {
    id: "under-roof",
    src: "/transitions/home-to-faq/under-roof.svg",
    left: -114,
    top: 2573,
    width: 1739.421875,
    height: 352.919921875,
    zIndex: 1.25,
  },
  {
    id: "roof",
    src: "/transitions/home-to-faq/roof.svg",
    left: -114,
    top: 2514,
    width: 1739.421875,
    height: 352.9198913574219,
    zIndex: 1.5,
  },
  {
    id: "ellipse-1",
    src: "/transitions/home-to-faq/Ellipse1.svg",
    left: 340,
    top: 2545,
    width: 39,
    height: 39,
    zIndex: 4,
  },
  {
    id: "ellipse-2",
    src: "/transitions/home-to-faq/Ellipse2.svg",
    left: 424,
    top: 2562,
    width: 105,
    height: 105,
    zIndex: 4,
  },
  // {
  //   id: "ellipse-3",
  //   src: "/transitions/home-to-faq/Ellipse3.svg",
  //   left: 880,
  //   top: 2496,
  //   width: 39,
  //   height: 39,
  //   zIndex: 4,
  // },
  // {
  //   id: "ellipse-4",
  //   src: "/transitions/home-to-faq/Ellipse4.svg",
  //   left: 1034,
  //   top: 2565,
  //   width: 29,
  //   height: 29,
  //   zIndex: 4,
  // },
  // {
  //   id: "ellipse-5",
  //   src: "/transitions/home-to-faq/Ellipse5.svg",
  //   left: 1054,
  //   top: 2565,
  //   width: 45,
  //   height: 45,
  //   zIndex: 4,
  // },
];

const minLayerTop = Math.min(
  ...homeToFaqTransitionLayers.map((layer) => layer.top),
);
const maxLayerBottom = Math.max(
  ...homeToFaqTransitionLayers.map((layer) => layer.top + layer.height),
);

export const HOME_TO_FAQ_BAND_TOP = Math.max(
  0,
  minLayerTop - HOME_TO_FAQ_BAND_PADDING_TOP,
);

export const HOME_TO_FAQ_BAND_HEIGHT =
  maxLayerBottom + HOME_TO_FAQ_BAND_PADDING_BOTTOM - HOME_TO_FAQ_BAND_TOP;
