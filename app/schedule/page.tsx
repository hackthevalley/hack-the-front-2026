import AuthRouteGuard from "@/components/providers/AuthRouteGuard";
import Schedule from "./Schedule";

export default function SchedulePage() {
  return (
    <AuthRouteGuard requireAuth>
      <Schedule />
    </AuthRouteGuard>
  );
}
