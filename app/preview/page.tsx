import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

/**
 * Throwaway component preview route — visit /preview to see components in
 * isolation. Safe to delete this folder once you're done.
 */
export default function Preview() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <Navbar />
      <main className="flex flex-col gap-6 p-8">
        <p className="text-sm text-zinc-500">
          Navbar preview — edit components/layout/Navbar.tsx and save to see
          changes.
        </p>

        <Button text="Apply Now" buttonType="primary" />
        <Button text="Login" buttonType="disabled" />
      </main>
    </div>
  );
}
