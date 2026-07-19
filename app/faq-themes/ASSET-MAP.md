# FAQ + Themes Asset Map

## Source

- Figma file: `htv 11 website Copy`
- Page: `hi-fi` (`1:3`)
- Frame: `faq + themes` (`1447:3909`)
- Reference dimensions: `1512 × 3311`

## Agreed Boundary

Scene assets are non-semantic artwork: scenery, structural set dressing, props, foliage, and decorative effects. The content overlay owns semantic copy and controls, including FAQ entries, actions, theme descriptions, and their accessible labels.

The content overlay should follow the repository's `HomeTextOverlays` precedent: content remains live React/HTML and is positioned independently from exported scene artwork.

## Current Scope

The implementation targets only the canonical `1512 × 3311` desktop reference. Responsive content reflow and alternate viewport compositions are explicitly out of scope for this phase.

The canonical implementation is isolated at the `/faq-themes` route through `app/faq-themes/page.tsx`, so validation does not disturb the existing homepage.

## Repository Convention

- Store static artwork under `public/<page>/background/`.
- Describe scene layers in a typed manifest with design-space coordinates and explicit z-order.
- Render layers from a dedicated background component.
- Render semantic content from a sibling overlay component using the same canonical design coordinate system.
- Use empty alternative text and disable dragging for decorative images.

All FAQ/Themes exports are page-local under `public/faq-themes/background/`. Do not reference visually similar files from another page; every exported Figma occurrence belongs to this page.

## Figma Audit

- The frame contains 710 nodes: 213 vectors, 220 ellipses, 101 groups, 49 rectangles, 46 frames, and smaller counts of text, instances, boolean operations, stars, and polygons.
- Only one descendant uses an image fill; the scene is overwhelmingly vector-based.
- The artwork uses drop shadows, layer blur, inner shadows, glass effects, gradients, and masks, but no special blend modes.

## Export Strategy

Export semantic composites at visual depth and layout boundaries rather than exporting individual Figma primitives.

1. The canvas base gradient is reproduced in CSS.
2. Rear scene: shelves/window structure, set dressing, and the themes backdrop.
3. Foreground scene: edge vegetation and decorative effects that overlap the content plane.

Use SVG by default. Use PNG only when a raster source or a Figma effect/mask cannot be reproduced faithfully in SVG.

Every Figma occurrence must be exported independently, even when multiple layers share the same name. Shared names do not imply identical underlying artwork, so this page will not deduplicate decorative assets.

Duplicate filenames will include a `left`, `center`, or `right` horizontal-region suffix and an ordinal when multiple occurrences occupy the same region. Examples: `leaves-left-1.svg`, `leaves-center-1.svg`, and `leaves-right-2.svg`.

## Fidelity Standard

Validate the implementation with a screenshot captured at exactly `1512 × 3311`. Major visual anchors should be within 2 px of the Figma reference, with matching layer order, gradients, masks, shadows, clipping, and scene-to-content alignment.

## Layer Planes

The page uses three explicit visual planes in Figma order:

1. Rear scene assets
2. `FaqThemesTextOverlays` with live semantic content and controls
3. Foreground scene assets with pointer events disabled

Foreground foliage and decorative effects may overlap the content plane when required by the reference, but they must not intercept interaction.

## Final Inventory

- `103` occurrence-specific SVG exports in `public/faq-themes/background/`
- `53` rear-scene layers
- `50` foreground-scene layers
- `0` broken or unloaded scene assets in the canonical browser render
- `app/faq-themes/background/layers.ts` is the authoritative typed manifest for source node IDs, source names, filenames, dimensions, design-space coordinates, planes, and z-order.
- `app/faq-themes/background/FaqThemesBackground.tsx` renders the three visual planes.
- `app/faq-themes/FaqThemesTextOverlays.tsx` owns the live FAQ, contact, and theme content.

## Validation

- The page canvas renders at exactly `1512 × 3311` CSS pixels.
- All `103` exported scene assets load successfully.
- Exact-width captures confirm the FAQ scene, lower set dressing, Themes transition, parchment, and five theme cards render in the intended order without horizontal drift.
- `npm run build` passes and statically prerenders `/faq-themes`.
- `npm run lint` is currently blocked by the repository's ESLint 10 / `eslint-plugin-react` incompatibility (`contextOrFilename.getFilename is not a function`) before a project lint result can be produced.
