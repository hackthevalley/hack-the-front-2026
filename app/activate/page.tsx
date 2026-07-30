import type { Metadata } from "next";
import ActivateAccount from "./ActivateAccount";

export const metadata: Metadata = {
  title: "Activate Account | Hack the Valley 11",
};

type ActivatePageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ActivatePage({
  searchParams,
}: ActivatePageProps) {
  const { token } = await searchParams;
  return (
    <ActivateAccount token={typeof token === "string" ? token : undefined} />
  );
}
