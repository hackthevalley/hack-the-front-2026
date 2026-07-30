import AuthRouteGuard from "@/components/providers/AuthRouteGuard";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
  return (
    <AuthRouteGuard requireAuth>
      <Dashboard />
    </AuthRouteGuard>
  );
}
