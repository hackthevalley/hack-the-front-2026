import HomeNavbar from "@/components/layout/Navbar";
import Navbar from "@/components/layout/Navbar";
import TextField from "@/components/ui/TextField";

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
        <Navbar />
      </main>
      <main className="flex flex-col gap-8 p-8">
        <div className="max-w-xl">
          <TextField
            name="Email"
            type="email"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="max-w-xl">
          <TextField
            name="Password"
            type="password"
            placeholder="Enter Password"
            required
            requireStrongPassword
          />
        </div>
      </main>
    </div>
  );
}
