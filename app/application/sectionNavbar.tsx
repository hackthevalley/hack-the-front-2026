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
      <img
        src="/icons/htv-logo.svg"
        alt="Hack the Valley"
        className="h-10 w-10 lg:col-start-1 lg:row-start-1"
      />

      {/* No fixed width here: the grid column in page.tsx auto-sizes to this
       * nav's widest button (Experience), and lg:items-stretch below then
       * stretches every other button to match that same width. lg:h-full
       * stretches the whole nav to match the book's grid row, so the ul can
       * center its buttons as a group against the book's full height. */}
      <nav className="nav-collapse:hidden flex w-full shrink-0 lg:col-start-1 lg:row-start-2 lg:h-full lg:w-fit">
        <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-2 lg:h-full lg:flex-col lg:flex-nowrap lg:items-stretch lg:justify-center lg:gap-6">
          {groups.map((group, index) => {
            const isActive = index === currentGroupIndex;
            const isLocked = index > furthestVisitedGroupIndex;

            return (
              <li key={group.id} className="flex items-center gap-1 lg:gap-2">
                <span
                  aria-hidden="true"
                  className={`hidden h-0 w-0 shrink-0 border-y-[7px] border-l-[9px] border-y-transparent transition-opacity lg:block ${
                    isActive ? "border-l-[#DF63DC] opacity-100" : "opacity-0"
                  }`}
                />
                <button
                  type="button"
                  disabled={isLocked}
                  onClick={() => onGroupClick(index)}
                  className={`rounded-full border-2 px-4 py-2 text-center text-xs font-semibold tracking-wide uppercase transition-colors lg:flex-1 lg:px-6 lg:py-3 lg:text-sm ${
                    isActive
                      ? "border-transparent text-white [background:linear-gradient(#0B0730,#0B0730)_padding-box,linear-gradient(to_bottom_left,#FF7CCD,#7839DC)_border-box]"
                      : isLocked
                        ? "cursor-not-allowed border-[#303276]/40 text-white/30"
                        : "border-[#303276] text-white/80 hover:border-[#303276]"
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
