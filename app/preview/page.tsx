import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

export default function Preview() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <Navbar />
      <main className="flex flex-col gap-6 p-8">
        <Button text="Apply Now" buttonType="primary" />
        <Button text="Login" buttonType="disabled" />
      </main>
    </div>
  );
}
