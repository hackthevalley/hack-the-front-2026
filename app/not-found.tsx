import StatusPage from "@/components/layout/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      title="404"
      titleSize="large"
      message="Oops, this page is not found!"
      messageSize="large"
      detail="The link might be corrupted or the page may have been removed."
      buttonText="Go Back Home"
      buttonHref="/"
    />
  );
}
