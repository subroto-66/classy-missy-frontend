import { useEffect, useState } from "react";
import Container from "../../components/layouts/Container";
import CampaignCard from "../../components/shared/CampaignCard";
import PageBanner from "../../components/shared/PageBanner";
import campaignsMock from "../../data/campaigns";
import api from "../../lib/axios";

export default function Campaigns() {
  const [campaignsList, setCampaignsList] = useState(campaignsMock);

  useEffect(() => {
    let active = true;
    api.get("/campaigns")
      .then((res) => {
        if (active && res.data?.data && res.data.data.length > 0) {
          setCampaignsList(res.data.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <PageBanner
          eyebrow="Special edits, just for you"
          title="Explore our campaigns"
          description="Shop hand-picked collections and find something lovely for your routine."
          image={campaignsList[0]?.image || campaignsMock[0].image}
          alt=""
        />

        <div className="grid gap-5 md:grid-cols-2">
          {campaignsList.map((campaign) => (
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
