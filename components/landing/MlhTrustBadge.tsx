const MLH_TRUST_BADGE_HREF =
  "https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white";
const MLH_TRUST_BADGE_SRC =
  "https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg";

export default function MlhTrustBadge() {
  return (
    <a
      id="mlh-trust-badge"
      href={MLH_TRUST_BADGE_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[clamp(60px,6.614vw,100px)] shrink-0"
      aria-label="Major League Hacking 2026 Hackathon Season"
    >
      <img
        src={MLH_TRUST_BADGE_SRC}
        alt=""
        className="w-full"
      />
    </a>
  );
}
