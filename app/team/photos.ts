import fs from "node:fs";
import path from "node:path";

const PHOTOS_DIR = path.join(process.cwd(), "public", "teams", "photos");

let photoFilesByName: Map<string, string> | null = null;

function getPhotoFilesByName(): Map<string, string> {
  if (!photoFilesByName) {
    photoFilesByName = new Map(
      fs.readdirSync(PHOTOS_DIR).map((filename) => [path.parse(filename).name.toLowerCase(), filename]),
    );
  }
  return photoFilesByName;
}

export function resolvePhoto(firstName: string): string {
  const filename = getPhotoFilesByName().get(firstName.toLowerCase());
  if (!filename) {
    throw new Error(
      `resolvePhoto("${firstName}"): no matching file in public/teams/photos/ (looked for "${firstName.toLowerCase()}.*")`,
    );
  }
  return `/teams/photos/${filename}`;
}
