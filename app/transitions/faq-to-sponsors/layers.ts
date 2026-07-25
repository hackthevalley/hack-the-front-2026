import type { FaqToSponsorsTransitionLayer } from "./types";

export const FAQ_TO_SPONSORS_DESIGN_WIDTH = 1512;
export const FAQ_TO_SPONSORS_SPONSORS_TOP = 6223;
const FAQ_TO_SPONSORS_BAND_PADDING_TOP = 160;
const FAQ_TO_SPONSORS_BAND_PADDING_BOTTOM = 160;

type FigmaGrassPlacement = FaqToSponsorsTransitionLayer & {
  rotation: number;
};

type GrassSvgTransform = {
  source: string;
  sourceWidth: number;
  sourceHeight: number;
  width: number;
  height: number;
  matrix: readonly [number, number, number, number, number, number];
  rotation: number;
};

const LEFT_GRASS_SVG =
  "PHN2ZyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiBvdmVyZmxvdz0idmlzaWJsZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyIgd2lkdGg9IjQ1NS44NTgiIGhlaWdodD0iOTQyLjEyIiB2aWV3Qm94PSIwIDAgNDU1Ljg1OCA5NDIuMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJncmFzcyI+CjxwYXRoIGlkPSJWZWN0b3IgMzc5IiBkPSJNMjUzLjUwMyA2NTMuNjM3QzI4NC42ODggNTM2LjQ4MiAzMDcuNDQxIDI0Mi43NzQgMTQ4Ljk3NCA1LjE3NDMyQzE5Ny43NTEgMTQ1LjYxMiAyODYuOTQ0IDQ3MS45MTcgMjUzLjUwMyA2NTMuNjM3WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzBfNCkiLz4KPHBhdGggaWQ9IlZlY3RvciAzODEiIGQ9Ik04Ny4zOTM3IDQ0OS41MTZMMTE4LjEwMiA0NjcuMDU4QzExMS44MjEgMzYwLjkzNiA4MC45NDYgMjM5LjIyOSA5LjIwMjQ5ZS0wNSAxMzEuNDExQzI2LjgxMzkgMjAxLjg5MSA2Ni4wODY2IDMyNi4zODUgODcuMzkzNyA0NDkuNTE2WiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzBfNCkiLz4KPGcgaWQ9IlZlY3RvciAzODFfMiI+CjwvZz4KPHBhdGggaWQ9IlZlY3RvciA0MzIiIGQ9Ik0zODMuMDU2IDk0MC4zMDZDNDI0LjAxNSA3ODYuNDMxIDQ1My44OTkgNDAwLjY2NiAyNDUuNzY0IDg4LjU5NTJDMzA5LjgyOSAyNzMuMDUgNDI2Ljk3OCA3MDEuNjI5IDM4My4wNTYgOTQwLjMwNloiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8wXzQpIi8+CjxwYXRoIGlkPSJWZWN0b3IgNDMzIiBkPSJNOTkuMTA3NCA5MjcuNzE3QzE2NC41NDQgNzk1LjcyMiAyNjQuMjA0IDQ1Ny41MjIgMTM5LjM1OSAxNjAuNjc4QzE2MS4wMDYgMzMwLjIzMiAxODMuMjYyIDcyMS4wMTUgOTkuMTA3NCA5MjcuNzE3WiIgZmlsbD0idXJsKCNwYWludDNfbGluZWFyXzBfNCkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzBfNCIgeDE9IjEyNy4zODkiIHkxPSItMTAuNTQzNSIgeDI9IjE5OC40MjkiIHkyPSIzNDIuNTE4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzNjdDNzEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTkyOTg1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8wXzQiIHgxPSItMjEuMjk2NiIgeTE9IjExNy45MTIiIHgyPSIzNS4zNDYxIiB5Mj0iNDI2LjMxNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMzY3QzcxIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE5Mjk4NSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfMF80IiB4MT0iMjE3LjQxNCIgeTE9IjY3Ljk1MDkiIHgyPSIzMTAuNzIiIHkyPSI1MzEuNjcyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzNjdDNzEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTkyOTg1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQzX2xpbmVhcl8wXzQiIHgxPSIxMTguMjAzIiB5MT0iMTM5LjU4MiIgeDI9IjE1My4zMiIgeTI9IjU1NS42MzIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzM2N0M3MSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxOTI5ODUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K";

const RIGHT_GRASS_SVG =
  "PHN2ZyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiBvdmVyZmxvdz0idmlzaWJsZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyIgd2lkdGg9IjQ1NS44NTkiIGhlaWdodD0iOTQyLjEyMSIgdmlld0JveD0iMCAwIDQ1NS44NTkgOTQyLjEyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImdyYXNzIj4KPHBhdGggaWQ9IlZlY3RvciAzNzkiIGQ9Ik0yNTMuNTA0IDY1My42MzdDMjg0LjY4OSA1MzYuNDgzIDMwNy40NDIgMjQyLjc3NCAxNDguOTc1IDUuMTc0MzdDMTk3Ljc1MiAxNDUuNjEyIDI4Ni45NDUgNDcxLjkxNyAyNTMuNTA0IDY1My42MzdaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMF80KSIvPgo8cGF0aCBpZD0iVmVjdG9yIDM4MSIgZD0iTTkzLjU0NiA2OTUuMjQ5QzEyNi42NTggNTkyLjk0MSAxNTQuMzA1IDMzNi45NDMgOS42MjEwNmUtMDUgMTMxLjQxMkM0Ni4zNjgxIDI1My4yOTEgMTI5Ljk5MyA1MzYuNjkgOTMuNTQ2IDY5NS4yNDlaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMF80KSIvPgo8cGF0aCBpZD0iVmVjdG9yIDQzMiIgZD0iTTM4My4wNTcgOTQwLjMwNkM0MjQuMDE2IDc4Ni40MzIgNDUzLjkgNDAwLjY2NyAyNDUuNzY1IDg4LjU5NjFDMzA5LjgyOSAyNzMuMDUxIDQyNi45NzkgNzAxLjYzIDM4My4wNTcgOTQwLjMwNloiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8wXzQpIi8+CjxwYXRoIGlkPSJWZWN0b3IgNDMzIiBkPSJNOTkuMTA4NCA5MjcuNzE4QzE2NC41NDQgNzk1LjcyMyAyNjQuMjA1IDQ1Ny41MjIgMTM5LjM1OSAxNjAuNjc5QzE2MS4wMDcgMzMwLjIzMyAxODMuMjYzIDcyMS4wMTYgOTkuMTA4NCA5MjcuNzE4WiIgZmlsbD0idXJsKCNwYWludDNfbGluZWFyXzBfNCkiLz4KPHBhdGggaWQ9IlZlY3RvciA0MzQiIGQ9Ik0xMDkuNzg4IDkxMy41MDJDMTQyLjg5OSA4MTEuMTk1IDE3MC41NDYgNTU1LjE5NiAxNi4yNDE3IDM0OS42NjVDNjIuNjA5NyA0NzEuNTQ1IDE0Ni4yMzQgNzU0Ljk0MyAxMDkuNzg4IDkxMy41MDJaIiBmaWxsPSJ1cmwoI3BhaW50NF9saW5lYXJfMF80KSIvPgo8L2c+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMF80IiB4MT0iMTI3LjM5IiB5MT0iLTEwLjU0MzUiIHgyPSIxOTguNDMiIHkyPSIzNDIuNTE4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzNjdDNzEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTkyOTg1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8wXzQiIHgxPSItMjEuMjk2NiIgeTE9IjExNy45MTMiIHgyPSIzNS4zNDYxIiB5Mj0iNDI2LjMxOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMzY3QzcxIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE5Mjk4NSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfMF80IiB4MT0iMjE3LjQxNSIgeTE9IjY3Ljk1MTgiIHgyPSIzMTAuNzIxIiB5Mj0iNTMxLjY3MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMzY3QzcxIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE5Mjk4NSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50M19saW5lYXJfMF80IiB4MT0iMTE4LjIwNCIgeTE9IjEzOS41ODMiIHgyPSIxNTMuMzIxIiB5Mj0iNTU1LjYzMyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMzY3QzcxIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE5Mjk4NSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50NF9saW5lYXJfMF80IiB4MT0iLTUuMDU1MDMiIHkxPSIzMzYuMTY3IiB4Mj0iNTEuNTg3NyIgeTI9IjY0NC41NzEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzM2N0M3MSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxOTI5ODUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K";

const transformGrassSvg = ({
  source,
  sourceWidth,
  sourceHeight,
  width,
  height,
  matrix,
  rotation,
}: GrassSvgTransform) => {
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" overflow="visible" data-figma-rotation="${rotation}">`,
    `<image href="data:image/svg+xml;base64,${source}" width="${sourceWidth}" height="${sourceHeight}" preserveAspectRatio="none" transform="matrix(${matrix.join(" ")})"/>`,
    "</svg>",
  ].join("");

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const faqToSponsorsTransitionLayers: readonly FigmaGrassPlacement[] =
  [
    {
      id: "grass-left",
      figmaId: "1617:5035",
      figmaName: "grass",
      src: transformGrassSvg({
        source: LEFT_GRASS_SVG,
        sourceWidth: 455.85809326171875,
        sourceHeight: 942.1201171875,
        width: 714.8315633138845,
        height: 1034.944830195389,
        matrix: [
          -0.9549810886383057, -0.2966667413711548, -0.2966667413711548,
          0.9549810886383057, 714.8315633138845, 135.237935055622,
        ],
        rotation: 162.74249088572762,
      }),
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
      src: transformGrassSvg({
        source: RIGHT_GRASS_SVG,
        sourceWidth: 455.85894775390625,
        sourceHeight: 942.1205444335938,
        width: 714.8325060874704,
        height: 1034.9454917067414,
        matrix: [
          0.9549810886383057, -0.2966667413711548, 0.2966667413711548,
          0.9549810886383057, 0, 135.238188555035,
        ],
        rotation: 17.257509114272402,
      }),
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
