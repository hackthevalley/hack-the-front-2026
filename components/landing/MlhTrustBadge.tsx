const MLH_TRUST_BADGE_HREF =
  "https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white";
const MLH_TRUST_BADGE_SRC =
  "https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg";

type MlhTrustBadgeProps = {
  className?: string;
};

export default function MlhTrustBadge({ className = "" }: MlhTrustBadgeProps) {
  return (
    <a
      id="mlh-trust-badge"
      href={MLH_TRUST_BADGE_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-12 shrink-0 sm:w-[clamp(60px,6.614vw,100px)] ${className}`}
      aria-label="Major League Hacking 2026 Hackathon Season"
    >
      <img src={MLH_TRUST_BADGE_SRC} alt="" className="w-full" />
    </a>
  );
}
