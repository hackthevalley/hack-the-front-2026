"use client";

export type SectionNavItem = {
  id: string;
  label: string;
};

type SectionNavbarProps = {
  groups: SectionNavItem[];
  currentGroupIndex: number;
  furthestVisitedGroupIndex: number;
  onGroupClick: (index: number) => void;
};

export default function SectionNavbar({
  groups,
  currentGroupIndex,
  furthestVisitedGroupIndex,
  onGroupClick,
}: SectionNavbarProps) {
  return (
    <div className="hidden md:contents">
      {/* No fixed width here: the grid column in page.tsx auto-sizes to this
       * nav's widest button (Experience), and lg:items-stretch below then
       * stretches every other button to match that same width. lg:h-full
       * stretches the whole nav to match the book's grid row, so the ul can
       * center its buttons as a group against the book's full height.
       * z-20 needs to live here (not on the display:contents wrapper above,
       * which generates no box and silently drops z-index) so the nav paints
       * above the book's z-10 elements when they overlap. */}
      <nav className="nav-collapse:hidden relative z-20 flex w-full shrink-0 lg:col-start-1 lg:row-start-2 lg:h-full lg:w-fit">
        <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-2 lg:h-full lg:flex-col lg:flex-nowrap lg:items-stretch lg:justify-center lg:gap-6">
          {groups.map((group, index) => {
            const isActive = index === currentGroupIndex;
            const isLocked = index > furthestVisitedGroupIndex;

            return (
              <li key={group.id} className="flex items-center gap-1 lg:gap-2">
                <span
                  aria-hidden="true"
                  className={`hidden h-0 w-0 shrink-0 border-y-[9px] border-l-[12px] border-y-transparent transition-opacity lg:block ${
                    isActive ? "border-l-[#DF63DC] opacity-100" : "opacity-0"
                  }`}
                />
                <button
                  type="button"
                  disabled={isLocked}
                  onClick={() => onGroupClick(index)}
                  data-app-menu-item
                  className={`rounded-full border-2 px-4 py-2 text-center text-xs font-semibold [background:linear-gradient(#030712,#191a3d)_padding-box,linear-gradient(to_bottom_left,#FF7CCD,#7839DC)_border-box] opacity-80 tracking-wide uppercase transition-all duration-300 ease-out lg:flex lg:h-[66px] lg:w-[135px] lg:flex-none lg:items-center lg:justify-center lg:px-3 lg:py-0 lg:text-lg lg:font-bold ${
                    isActive
                      ? "border-transparent text-white hover:scale-105"
                      : isLocked
                        ? "cursor-not-allowed border-[#303276]/40 bg-[#303276] text-white/30"
                        : "border-[#303276] bg-[#303276] text-white hover:scale-105 hover:border-[#4A4DA8] hover:bg-[#3A3D96] hover:text-white"
                  }`}
                >
                  {group.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
