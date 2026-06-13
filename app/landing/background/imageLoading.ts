/** Above-the-fold core layers — fetch immediately. */
export const EAGER_BACKGROUND_IMAGE_IDS = new Set([
  "ground",
  "sky-things",
  "tiny-stars",
  "stars-1",
  "stars-2",
  "cloud-1",
  "cloud-2",
  "cloud-3",
  "left-mountain",
  "valley",
  "shadow-valley",
  "waterfall-glow",
  "side-fall",
  "waterfall",
  "water-details",
  "plateau-top",
]);

export function getBackgroundImageLoading(id: string) {
  if (EAGER_BACKGROUND_IMAGE_IDS.has(id)) {
    return { loading: "eager" as const, fetchPriority: "high" as const };
  }

  return { loading: "lazy" as const, fetchPriority: "auto" as const };
}
