import Dashboard, { type DashboardStatus } from "./Dashboard";

const VALID_STATUSES = new Set<DashboardStatus>([
  "apply",
  "pending",
  "not-submitted",
  "accepted",
  "declined",
]);

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: requestedStatus } = await searchParams;
  const status =
    requestedStatus && VALID_STATUSES.has(requestedStatus as DashboardStatus)
      ? (requestedStatus as DashboardStatus)
      : "apply";

  return <Dashboard status={status} />;
}
