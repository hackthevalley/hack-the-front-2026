import {
  getShelfColumns,
  getShelfRowWidth,
  JAR_TOP_OFFSET,
  JAR_WIDTH,
  PROP_ASSETS,
  SHELF_TOPS,
} from "./background/layers";
import type { TeamLayer } from "./background/types";
import type { ShelfColumn, TeamJarSlot } from "./types";

const SHELF_1_LAYOUT: readonly ShelfColumn[] = [
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "prop", propId: "skull" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "prop", propId: "crystal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "prop", propId: "crystal" },
];

const SHELF_2_LAYOUT: readonly ShelfColumn[] = [
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "prop", propId: "pottedPlant" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "prop", propId: "smallMushroom" },
];

const SHELF_3_LAYOUT: readonly ShelfColumn[] = [
  { type: "jar", color: "teal" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "jar", color: "pink" },
  { type: "prop", propId: "smallMushroom" },
  { type: "jar", color: "pink" },
  { type: "jar", color: "teal" },
  { type: "prop", propId: "skull" },
];

function buildShelf(
  shelfNumber: 1 | 2 | 3,
  gridColumns: readonly number[],
  layout: readonly ShelfColumn[],
) {
  const shelfTop = SHELF_TOPS[shelfNumber - 1];
  const jarSlots: TeamJarSlot[] = [];
  const propLayers: TeamLayer[] = [];
  let jarIndex = 0;

  layout.forEach((column, columnIndex) => {
    const left = gridColumns[columnIndex];

    if (column.type === "jar") {
      jarIndex += 1;
      jarSlots.push({
        id: `shelf-${shelfNumber}-jar-${jarIndex}`,
        left,
        top: shelfTop + JAR_TOP_OFFSET,
        color: column.color,
      });
    } else {
      const asset = PROP_ASSETS[column.propId];
      propLayers.push({
        id: `${column.propId}-shelf-${shelfNumber}-col-${columnIndex + 1}`,
        src: asset.src,
        left: left + (JAR_WIDTH - asset.width) / 2,
        top: shelfTop + asset.topOffset,
        width: asset.width,
        height: asset.height,
      });
    }
  });

  return { jarSlots, propLayers };
}

const shelf1 = buildShelf(
  1,
  getShelfColumns(SHELF_1_LAYOUT.length),
  SHELF_1_LAYOUT,
);
const shelf2 = buildShelf(
  2,
  getShelfColumns(SHELF_2_LAYOUT.length),
  SHELF_2_LAYOUT,
);
const shelf3 = buildShelf(
  3,
  getShelfColumns(SHELF_3_LAYOUT.length),
  SHELF_3_LAYOUT,
);

export const jarSlots: readonly TeamJarSlot[] = [
  ...shelf1.jarSlots,
  ...shelf2.jarSlots,
  ...shelf3.jarSlots,
];

export const SHELF_PROPS = {
  shelf1: shelf1.propLayers,
  shelf2: shelf2.propLayers,
  shelf3: shelf3.propLayers,
};

export const SHELF_ROW_WIDTHS = {
  shelf1: getShelfRowWidth(SHELF_1_LAYOUT.length),
  shelf2: getShelfRowWidth(SHELF_2_LAYOUT.length),
  shelf3: getShelfRowWidth(SHELF_3_LAYOUT.length),
};
