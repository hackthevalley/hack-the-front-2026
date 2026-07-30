import type { ReactNode } from "react";

const RESTORE_SCRIPT = `
(() => {
  const key = "htv-application-page-hidden";
  const navigation = performance.getEntriesByType("navigation")[0];

  if (navigation && navigation.type === "reload") {
    sessionStorage.removeItem(key);
  } else if (sessionStorage.getItem(key) === "1") {
    sessionStorage.removeItem(key);
    location.reload();
    return;
  }

  addEventListener("pagehide", () => {
    sessionStorage.setItem(key, "1");
  });

  addEventListener("pageshow", (event) => {
    if (event.persisted) {
      sessionStorage.removeItem(key);
      location.reload();
    }
  });
})();
`;

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: RESTORE_SCRIPT }} />
      {children}
    </>
  );
}
