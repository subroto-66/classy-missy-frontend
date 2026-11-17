import Container from "../../components/layouts/Container";
import CampaignCard from "../../components/shared/CampaignCard";
import PageBanner from "../../components/shared/PageBanner";
import campaigns from "../../data/campaigns";

export default function Campaigns() {
  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <PageBanner
          eyebrow="Special edits, just for you"
          title="Explore our campaigns"
          description="Shop hand-picked collections and find something lovely for your routine."
          image={campaigns[0].image}
          alt=""
        />

        <div className="grid gap-5 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.slug}
              campaign={campaign}
              className="rounded-2xl border border-border"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
