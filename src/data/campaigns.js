import glowImage from "../assets/home/a1.png";
import skinResetImage from "../assets/home/a2.png";

const campaigns = [
  {
    slug: "glow-essentials",
    title: "Glow Essentials",
    eyebrow: "Your glow, your routine",
    description: "Discover feel-good skincare picks for a fresh, radiant look.",
    image: glowImage,
    productIds: [
      "paulas-choice-bha",
      "ordinary-glycolic-acid",
      "daily-moisturizer",
    ],
  },
  {
    slug: "skin-reset",
    title: "The Skin Reset",
    eyebrow: "A little care goes a long way",
    description: "Build a simple routine with customer-loved daily essentials.",
    image: skinResetImage,
    productIds: [
      "panoxyl-acne-wash",
      "cerave-retinol-serum",
      "cerave-skin-renewing",
      "ordinary-squalane-cleanser",
    ],
  },
];

export default campaigns;
