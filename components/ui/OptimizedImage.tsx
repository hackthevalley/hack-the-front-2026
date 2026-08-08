import NextImage, { type ImageProps } from "next/image";
import { forwardRef } from "react";

const ARTWORK_FALLBACK_SIZE = 1000;

/**
 * Next's optimized image with safe intrinsic dimensions for design-layer assets.
 * Most artwork is sized explicitly by its existing CSS; content images should
 * continue to provide their real width/height or use fill.
 */
const OptimizedImage = forwardRef<HTMLImageElement, ImageProps>(
  function OptimizedImage(
    { fill, width, height, sizes, ...props },
    ref,
  ) {
    if (fill) {
      return <NextImage {...props} ref={ref} fill sizes={sizes ?? "100vw"} />;
    }

    return (
      <NextImage
        {...props}
        ref={ref}
        width={width ?? ARTWORK_FALLBACK_SIZE}
        height={height ?? ARTWORK_FALLBACK_SIZE}
        sizes={sizes}
      />
    );
  },
);

export default OptimizedImage;
