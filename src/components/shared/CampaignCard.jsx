import { Link } from "react-router";

export default function CampaignCard({ campaign, className = "" }) {
  return (
    <Link
      to={`/products?campaign=${encodeURIComponent(campaign.slug)}`}
      aria-label={`Shop the ${campaign.title} campaign`}
      className={`group block aspect-[16/7] overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${className}`}
    >
      <img
        src={campaign.image}
        alt={campaign.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  );
}
