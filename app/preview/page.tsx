import HomeNavbar from "@/components/layout/Navbar";

/**
 * Throwaway component preview route — visit /preview to see components in
 * isolation. Safe to delete this folder once you're done.
 */
export default function Preview() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <HomeNavbar />
      <main className="p-8 text-sm text-zinc-500">
        Navbar preview — edit components/layout/Navbar.tsx and save to see
        changes.
      </main>
    </div>
  );
}
