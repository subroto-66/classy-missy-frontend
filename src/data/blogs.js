const blogs = [
  {
    title: "Building a Simple Skincare Routine That Works",
    category: "Skincare Basics",
    publishedAt: "2026-10-28",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Skincare products arranged on a clean vanity",
    excerpt:
      "A thoughtful routine does not need a dozen steps. Start with the essentials and build around what your skin needs.",
    content: [
      "A good skincare routine is one you can follow consistently. Begin with a gentle cleanser, a moisturizer that suits your skin, and sunscreen in the morning. These simple steps help create a dependable foundation before adding targeted products.",
      "Introduce new products one at a time and give your skin a chance to adjust. This makes it easier to notice what feels comfortable and what may not suit you. Use products as directed and avoid combining strong active ingredients without guidance.",
      "Your skin can change with the weather, age, and daily habits. Keep your routine flexible, pay attention to how your skin feels, and ask a qualified professional if you have persistent concerns.",
    ],
  },
  {
    title: "How to Layer Your Skincare Products",
    category: "Skincare Basics",
    publishedAt: "2026-10-21",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A skincare serum bottle on a bright surface",
    excerpt:
      "Learn a practical order for applying skincare, from lightweight formulas to moisturizer and daytime sunscreen.",
    content: [
      "A simple rule for layering is to apply products from lighter textures to richer ones. After cleansing, a watery toner or serum usually goes before a cream moisturizer.",
      "In the morning, finish your routine with broad-spectrum sunscreen and follow its label for application and reapplication. At night, use your chosen treatment according to its instructions.",
      "You do not need to use every product at once. If layering feels heavy or causes discomfort, simplify the routine and introduce products gradually.",
    ],
  },
  {
    title: "Understanding Your Skin Barrier",
    category: "Skin Health",
    publishedAt: "2026-10-14",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A calm skincare setup with soft natural light",
    excerpt:
      "Explore what the skin barrier does and why gentle cleansing and moisturizing can support everyday comfort.",
    content: [
      "The skin barrier is the outer layer that helps keep moisture in and environmental irritants out. When skin feels dry or uncomfortable, a gentle and consistent routine can help support its comfort.",
      "Choose mild cleansing and a moisturizer that works for your skin. Avoid over-cleansing and be cautious about adding several exfoliating products to your routine at the same time.",
      "If irritation persists or worsens, pause products that seem to trigger it and seek advice from a healthcare professional.",
    ],
  },
  {
    title: "A Beginner’s Guide to Chemical Exfoliants",
    category: "Ingredients",
    publishedAt: "2026-10-08",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Skincare bottles and jars on a neutral background",
    excerpt:
      "Get familiar with common exfoliating acids and learn how to introduce them carefully into a routine.",
    content: [
      "Chemical exfoliants are ingredients used in some skincare products to loosen dead skin cells on the surface. Different formulas use different ingredients and strengths, so always read the product label.",
      "Start slowly, use only as directed, and avoid applying multiple exfoliating treatments together unless a professional advises you to do so. Daily sunscreen is especially important when using products that may increase sun sensitivity.",
      "Stop use if your skin becomes persistently irritated. A dermatologist can help you choose an approach for your individual skin concerns.",
    ],
  },
  {
    title: "Choosing a Moisturizer for Your Skin",
    category: "Skin Health",
    publishedAt: "2026-09-30",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A moisturizer jar with skincare essentials",
    excerpt:
      "Texture, climate, and comfort all matter when finding a moisturizer you will enjoy using every day.",
    content: [
      "A moisturizer should feel comfortable and fit into your daily routine. Lightweight lotions may feel pleasant in warm weather, while richer creams can be preferred when skin feels dry.",
      "Look for clear ingredient information and consider your own sensitivities. Patch testing a new product on a small area can help you notice an unwanted reaction before regular use.",
      "Consistency matters more than a complicated lineup. Apply moisturizer as directed and adjust when your skin or environment changes.",
    ],
  },
  {
    title: "Why Daily Sunscreen Belongs in Your Routine",
    category: "Sun Care",
    publishedAt: "2026-09-22",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Sun care products displayed in daylight",
    excerpt:
      "Make sun protection a practical daily habit with a formula and application routine that suits you.",
    content: [
      "Sun protection is an important everyday skincare step. Choose a broad-spectrum sunscreen and apply it according to the product directions.",
      "Use enough product to cover exposed skin and reapply as directed, especially after swimming, sweating, or towel drying. Protective clothing and shade can also help limit exposure.",
      "If you are unsure which sunscreen is right for you, a pharmacist or healthcare professional can help you choose an option that fits your needs.",
    ],
  },
  {
    title: "How to Introduce Retinol Gradually",
    category: "Ingredients",
    publishedAt: "2026-09-15",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A skincare serum bottle beside a folded towel",
    excerpt:
      "A measured, label-first approach can make it easier to decide whether a retinol product fits your routine.",
    content: [
      "Retinol products can be potent and may not suit everyone. Read the label carefully and follow its use instructions rather than increasing frequency quickly.",
      "Many people choose to introduce one new active product at a time and monitor how their skin responds. Avoid using additional strong treatments together unless you have professional guidance.",
      "Ask a healthcare professional before use if you are pregnant, nursing, managing a skin condition, or uncertain whether retinol is appropriate for you.",
    ],
  },
  {
    title: "Skincare Habits for Sensitive Skin",
    category: "Skin Health",
    publishedAt: "2026-09-07",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Gentle skincare products with a clean, minimal look",
    excerpt:
      "A calm routine, gradual product changes, and careful label reading can help sensitive skin feel more comfortable.",
    content: [
      "Sensitive skin can react to different ingredients and environmental factors. Keeping a simple routine may make it easier to identify what your skin tolerates.",
      "Check product labels, introduce new items gradually, and consider a patch test. Avoid scrubbing or frequently switching products if your skin is feeling uncomfortable.",
      "For ongoing redness, itching, or irritation, seek advice from a dermatologist or other qualified healthcare professional.",
    ],
  },
  {
    title: "What to Know Before Trying a New Serum",
    category: "Ingredients",
    publishedAt: "2026-08-29",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A serum bottle ready to add to a skincare routine",
    excerpt:
      "Understand the product purpose, read the directions, and give new formulas a careful introduction.",
    content: [
      "Serums are designed for different goals and can contain a wide range of ingredients. Start by checking what the product is intended to do and whether its directions suit your routine.",
      "Add only one new serum at a time, apply the recommended amount, and watch for irritation. More product or more frequent use does not necessarily mean better results.",
      "If you have a skin condition or use prescription treatments, ask a healthcare professional before adding a new active serum.",
    ],
  },
  {
    title: "Creating a Relaxing Evening Skincare Ritual",
    category: "Skincare Basics",
    publishedAt: "2026-08-20",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A simple evening skincare routine set out neatly",
    excerpt:
      "Turn a few reliable steps into an easy nighttime habit without making your routine feel like a chore.",
    content: [
      "An evening routine can be as simple as cleansing and moisturizing. The best ritual is one that feels manageable and leaves your skin comfortable.",
      "Set products where you will remember to use them and follow each product's directions. If you use a treatment, make sure it fits with the rest of your routine.",
      "Keep the focus on consistency and comfort. You can always adjust your routine as your needs change.",
    ],
  },
];

const blogDetails = {
  "building-a-simple-skincare-routine-that-works": {
    intro:
      "Skincare can feel complicated when every shelf seems to promise a different solution. A dependable routine is usually much simpler: a few well-chosen steps, used consistently, with room to adapt when your skin needs change.",
    sections: [
      {
        heading: "Start with the three everyday essentials",
        paragraphs: [
          "Begin with a gentle cleanser, a moisturizer that feels comfortable, and sunscreen for daytime. These steps cover cleansing, hydration, and daily sun protection without asking you to manage a long product lineup.",
          "In the morning, rinse or cleanse as needed, moisturize, then apply broad-spectrum sunscreen according to its label. In the evening, cleanse away the day and apply moisturizer. Add a treatment only when you have a clear reason to use one.",
        ],
        bullets: [
          "Choose a cleanser that leaves skin feeling comfortable, not tight.",
          "Use moisturizer on slightly damp skin if that feels good for you.",
          "Follow sunscreen directions and reapply as recommended on the label.",
        ],
      },
      {
        heading: "Add new products with a little patience",
        paragraphs: [
          "When you introduce several new products together, it is hard to know which one is helping or causing discomfort. Try one new product at a time and keep the rest of your routine familiar while you see how your skin responds.",
          "Read directions carefully, especially for exfoliants and other active formulas. More frequent use or a larger amount does not necessarily mean better results, and combining multiple strong treatments may irritate skin.",
        ],
      },
      {
        heading: "Let your routine change with you",
        paragraphs: [
          "Weather, travel, stress, and changing habits can affect how your skin feels. It is fine to simplify when your skin feels sensitive and return to optional steps only when they feel comfortable.",
          "Persistent irritation, sudden changes, or a skin condition deserve professional advice. A dermatologist can help you choose a plan that is appropriate for your individual needs.",
        ],
      },
    ],
    keyTakeaways: [
      "A consistent basic routine is a strong starting point.",
      "Introduce one new product at a time and follow its directions.",
      "Seek professional advice for persistent or concerning symptoms.",
    ],
  },
  "how-to-layer-your-skincare-products": {
    intro:
      "The order of application can make a routine feel easier to follow. As a general guide, apply products from lighter, more fluid textures toward richer creams, while always giving priority to the instructions on each product.",
    sections: [
      {
        heading: "A simple order for morning",
        paragraphs: [
          "Start with cleansing, or a water rinse if that works for your skin. Apply lightweight leave-on products next, followed by moisturizer. Sunscreen is the final skincare step before makeup and should be used as directed.",
          "If you use several thin products, allow each layer to settle before applying the next. You do not need to wait a set number of minutes unless the product directions say so; comfort and avoiding pilling are practical guides.",
        ],
        bullets: [
          "Cleanser",
          "Optional lightweight serum or treatment",
          "Moisturizer",
          "Broad-spectrum sunscreen",
        ],
      },
      {
        heading: "Keep the evening routine uncomplicated",
        paragraphs: [
          "In the evening, cleanse to remove sunscreen, makeup, and daily buildup. Follow with any leave-on treatment you already tolerate, then moisturizer.",
          "Some formulas have specific directions about damp or dry skin, frequency, or what not to combine them with. Check the packaging rather than relying on a universal layering rule.",
        ],
      },
      {
        heading: "When products do not layer comfortably",
        paragraphs: [
          "Pilling can happen when too many layers are applied, when products are not given time to settle, or when formulas do not work well together. Try using smaller amounts and simplifying the routine.",
          "If layering causes burning, persistent redness, or discomfort, stop the products that seem to be contributing and consult a qualified professional if symptoms continue.",
        ],
      },
    ],
    keyTakeaways: [
      "Layer lighter textures before richer creams as a practical starting point.",
      "Use sunscreen as the final morning skincare step.",
      "Always follow product-specific directions when they differ.",
    ],
  },
  "understanding-your-skin-barrier": {
    intro:
      "The skin barrier is the outermost part of the skin. It helps limit moisture loss and provides a first line of defense from the surrounding environment. A comfortable, gentle routine can support the skin as it performs that everyday role.",
    sections: [
      {
        heading: "What the barrier does",
        paragraphs: [
          "The outer layer is made up of skin cells and the materials between them. Together they help the skin retain water and respond to everyday contact with the environment.",
          "Dryness, tightness, flaking, or stinging can have many causes and do not diagnose a barrier problem on their own. Pay attention to patterns and consider whether a new product or habit might be contributing.",
        ],
      },
      {
        heading: "Keep care gentle and consistent",
        paragraphs: [
          "Use a mild cleanser and a moisturizer that feels comfortable. Avoid very hot water, rough scrubbing, and adding several exfoliating products at once if your skin is feeling unsettled.",
          "A short, familiar routine can make it easier to notice how your skin responds. Add optional products gradually, and pause anything that appears to worsen discomfort.",
        ],
        bullets: [
          "Cleanse gently without scrubbing.",
          "Moisturize regularly with a formula you tolerate.",
          "Use daytime sun protection as directed.",
        ],
      },
      {
        heading: "Know when to ask for help",
        paragraphs: [
          "If discomfort is severe, persistent, or accompanied by a rash, swelling, or cracking, seek medical advice rather than trying more products. A healthcare professional can help identify the cause and recommend suitable care.",
          "Patch testing may help you notice a reaction to a new product, but it does not guarantee that a product will never irritate your skin.",
        ],
      },
    ],
    keyTakeaways: [
      "The barrier helps retain moisture and protect the outer skin.",
      "Gentle cleansing and regular moisturizing support everyday comfort.",
      "Persistent irritation should be discussed with a healthcare professional.",
    ],
  },
  "a-beginners-guide-to-chemical-exfoliants": {
    intro:
      "Chemical exfoliants are found in products designed to loosen dead cells at the skin surface. The category includes different acids and strengths, so the product label and your own skin tolerance matter more than choosing the strongest formula.",
    sections: [
      {
        heading: "Understand the product before using it",
        paragraphs: [
          "Alpha hydroxy acids and beta hydroxy acids are common exfoliating ingredients, but formulas vary widely. Read the full ingredient list, directions, warnings, and recommended frequency before use.",
          "An exfoliant is optional. If your routine is already comfortable and meeting your needs, there is no requirement to add one.",
        ],
      },
      {
        heading: "Introduce it slowly",
        paragraphs: [
          "Use the product only as directed and avoid pairing it with several other strong treatments when you are starting out. Introducing one active product at a time makes it easier to notice how your skin responds.",
          "Do not apply more product or use it more frequently in an attempt to speed results. If you experience persistent stinging, redness, or peeling, stop using it and seek advice if symptoms do not settle.",
        ],
        bullets: [
          "Start with the label's recommended frequency.",
          "Avoid combining exfoliants unless a professional confirms it is suitable.",
          "Use sunscreen as directed, especially during daytime exposure.",
        ],
      },
      {
        heading: "Choose comfort over intensity",
        paragraphs: [
          "A product that causes ongoing discomfort is not a good fit, even if it is popular. Skin needs and tolerance differ, and a milder or simpler routine may be more appropriate.",
          "People with active skin conditions or prescription treatments should check with a dermatologist or pharmacist before adding an exfoliating product.",
        ],
      },
    ],
    keyTakeaways: [
      "Read the directions and strength before choosing an exfoliant.",
      "Introduce one active product gradually and avoid overuse.",
      "Stop if irritation persists and ask a professional for guidance.",
    ],
  },
  "choosing-a-moisturizer-for-your-skin": {
    intro:
      "A moisturizer should feel pleasant enough that you will actually use it. Texture, climate, personal preference, and ingredient sensitivities can all shape which formula works best in your everyday routine.",
    sections: [
      {
        heading: "Think about texture and comfort",
        paragraphs: [
          "Lotions and gels often feel lighter, while creams and ointments may feel richer. These descriptions are only a starting point: formulas differ, and the most suitable choice is one that feels comfortable on your skin.",
          "Consider how a product feels after application, whether it fits under sunscreen or makeup, and whether it leaves your skin feeling appropriately moisturized without being unpleasantly heavy.",
        ],
      },
      {
        heading: "Read labels and introduce carefully",
        paragraphs: [
          "Check the ingredient list if you already know that certain ingredients do not suit you. Claims such as fragrance-free or non-comedogenic can be useful context, but they cannot guarantee that a product will work for every person.",
          "When trying a new moisturizer, introduce it on its own and consider testing it on a small area first. This can make it easier to notice an unwanted response before making it part of your full routine.",
        ],
        bullets: [
          "Choose a texture you enjoy using consistently.",
          "Check packaging for directions and ingredient information.",
          "Adjust the formula as weather and comfort needs change.",
        ],
      },
      {
        heading: "Keep the routine practical",
        paragraphs: [
          "You do not need separate products for every time of day unless you prefer them. A simple moisturizer that works with the rest of your routine can be enough for many people.",
          "If dryness, itching, or irritation continues despite simplifying your routine, seek personalized advice from a qualified healthcare professional.",
        ],
      },
    ],
    keyTakeaways: [
      "Comfort and consistency are useful guides when choosing a moisturizer.",
      "Read labels and introduce a new formula gradually.",
      "Persistent skin concerns are best discussed with a professional.",
    ],
  },
  "why-daily-sunscreen-belongs-in-your-routine": {
    intro:
      "Sunscreen is one part of a broader sun-protection routine. Choosing a broad-spectrum product you like, applying it according to the label, and combining it with shade and clothing can make protection easier to maintain.",
    sections: [
      {
        heading: "Choose a sunscreen you will use",
        paragraphs: [
          "Look for broad-spectrum protection and check the product label for its SPF, directions, and water-resistance details. Different textures and finishes are available, so comfort can help you find an option that fits your day.",
          "If you have sensitive skin or a specific medical concern, a pharmacist, dermatologist, or other healthcare professional can help you consider appropriate options.",
        ],
      },
      {
        heading: "Apply and reapply as directed",
        paragraphs: [
          "Apply sunscreen generously to exposed skin according to the packaging instructions. Pay attention to often-missed areas such as ears, the back of the neck, and the tops of the feet when they are exposed.",
          "Reapply as the label advises, especially after swimming, sweating, or towel drying. Sunscreen works best as part of a plan that also includes shade and protective clothing.",
        ],
        bullets: [
          "Follow the product directions for amount and timing.",
          "Reapply as instructed after water exposure or towel drying.",
          "Use hats, clothing, and shade to complement sunscreen.",
        ],
      },
      {
        heading: "Make sun care an easy habit",
        paragraphs: [
          "Keep sunscreen somewhere visible in your morning routine and carry it when you expect to be outside. Check the expiry information and storage guidance on the package.",
          "No sunscreen blocks every ray. Seek shade and use additional protective measures, particularly during periods of strong sun.",
        ],
      },
    ],
    keyTakeaways: [
      "Choose broad-spectrum sunscreen and follow its directions.",
      "Reapply as directed, particularly after swimming or sweating.",
      "Combine sunscreen with shade and protective clothing.",
    ],
  },
  "how-to-introduce-retinol-gradually": {
    intro:
      "Retinol is an active ingredient that can be irritating for some people. A cautious approach starts with the product directions, considers personal circumstances, and avoids rushing to increase use.",
    sections: [
      {
        heading: "Check whether retinol is appropriate for you",
        paragraphs: [
          "Read the label and warnings before choosing a product. If you use prescription skincare, have a skin condition, or are unsure whether retinol is suitable, ask a healthcare professional first.",
          "People who are pregnant, planning pregnancy, or nursing should consult a clinician before using retinoid products. Product advice can differ based on the specific ingredient and individual circumstances.",
        ],
      },
      {
        heading: "Introduce one product at a time",
        paragraphs: [
          "Begin according to the package directions and do not apply more or use it more often than instructed. Avoid adding several other strong actives at the same time, as this can make irritation harder to identify.",
          "Pay attention to how your skin feels. If significant dryness, burning, or persistent redness develops, stop the product and seek advice if symptoms continue.",
        ],
        bullets: [
          "Use only the amount and frequency stated on the label.",
          "Keep the rest of your routine simple while you assess tolerance.",
          "Use daytime sun protection as part of your routine.",
        ],
      },
      {
        heading: "Be patient and prioritize skin comfort",
        paragraphs: [
          "Skincare changes take time, and visible results are not guaranteed. Avoid judging a product after only a few uses or escalating frequency to chase a faster outcome.",
          "Retinol is not essential for everyone. If it does not suit your skin or circumstances, a simpler routine may be the better choice.",
        ],
      },
    ],
    keyTakeaways: [
      "Read product warnings and check suitability before starting.",
      "Introduce retinol slowly, following the label exactly.",
      "Stop use if irritation persists and seek professional advice.",
    ],
  },
  "skincare-habits-for-sensitive-skin": {
    intro:
      "Sensitive skin is a description of how skin feels or reacts, not a single diagnosis. A steady routine and thoughtful product changes can help you understand what feels comfortable for you.",
    sections: [
      {
        heading: "Build a short, familiar routine",
        paragraphs: [
          "Use a gentle cleanser and a moisturizer you already tolerate. Keeping the number of products low can make it easier to identify a potential trigger when your skin becomes uncomfortable.",
          "Avoid scrubbing and be cautious with fragranced products or strong actives if you know they bother your skin. Ingredient preferences are personal, and even products marketed for sensitive skin can affect people differently.",
        ],
      },
      {
        heading: "Make product changes one at a time",
        paragraphs: [
          "Check labels and introduce new products gradually. A small-area patch test may help reveal a reaction, although it cannot guarantee that a product will never cause irritation elsewhere.",
          "Keep a simple note of new products and when you started them. If a reaction occurs, this record may help you discuss the issue with a healthcare professional.",
        ],
        bullets: [
          "Avoid adding several new products in the same week.",
          "Use products according to their directions.",
          "Pause items that appear to cause ongoing discomfort.",
        ],
      },
      {
        heading: "Get support for persistent symptoms",
        paragraphs: [
          "Persistent itching, redness, swelling, or painful irritation may need professional attention. A dermatologist can help distinguish sensitivity from conditions that require specific care.",
          "Do not try to treat severe or worsening symptoms by layering more skincare products. Seek medical advice for a safer, personalized plan.",
        ],
      },
    ],
    keyTakeaways: [
      "A simple routine makes it easier to spot possible triggers.",
      "Introduce products gradually and keep track of changes.",
      "Seek professional care for persistent or worsening symptoms.",
    ],
  },
  "what-to-know-before-trying-a-new-serum": {
    intro:
      "Serums are concentrated leave-on products made for many different purposes. Before adding one, understand what it contains, what it is intended to do, and how its directions fit alongside the products you already use.",
    sections: [
      {
        heading: "Match the product to a clear goal",
        paragraphs: [
          "Start with the product label and ingredient list rather than choosing a serum because it is trending. Consider whether the formula addresses a concern you actually have and whether its use instructions are practical for you.",
          "A serum is optional, not a required step. If your basic routine is comfortable, there is no need to add a new product just to make the routine longer.",
        ],
      },
      {
        heading: "Introduce the formula thoughtfully",
        paragraphs: [
          "Add one new serum at a time and follow the directions for amount, frequency, and application. Avoid mixing multiple active products until you know how your skin responds and have checked that the labels allow it.",
          "Use a patch test if appropriate for the product, while remembering that it cannot predict every possible reaction. Stop use if persistent irritation develops.",
        ],
        bullets: [
          "Read directions and warnings before first use.",
          "Keep the rest of your routine unchanged at first.",
          "Store the product as directed and observe expiry guidance.",
        ],
      },
      {
        heading: "Give your skin time to respond",
        paragraphs: [
          "Skin changes do not happen overnight, and using more product is not a shortcut. Keep expectations realistic and focus on comfort and consistency.",
          "If you use prescription treatments or have a diagnosed skin condition, check with your healthcare professional before introducing an active serum.",
        ],
      },
    ],
    keyTakeaways: [
      "Choose a serum for a clear, relevant reason.",
      "Follow the label and add only one new product at a time.",
      "Ask a professional if you use prescription skincare or have concerns.",
    ],
  },
  "creating-a-relaxing-evening-skincare-ritual": {
    intro:
      "An evening routine does not need to be elaborate to feel restorative. A few predictable steps can help you wind down while keeping skincare manageable and comfortable.",
    sections: [
      {
        heading: "Make the essentials easy to repeat",
        paragraphs: [
          "Cleanse to remove the day's sunscreen, makeup, and everyday buildup, then apply a moisturizer that feels good on your skin. If you already use a treatment, follow its directions and keep it in a place where it is easy to remember.",
          "Choose a pace that fits your evening. A routine you can do consistently is more useful than a complicated sequence that becomes difficult to maintain.",
        ],
        bullets: [
          "Keep frequently used products together.",
          "Use a gentle cleanser and avoid rough scrubbing.",
          "Apply treatments only as directed.",
        ],
      },
      {
        heading: "Create a comfortable environment",
        paragraphs: [
          "A clean towel, comfortable lighting, and a few minutes without rushing can make the routine feel more relaxing. These small habits are about comfort, not a promise of specific skin results.",
          "Wash reusable cloths regularly and avoid sharing personal skincare tools. Keep product containers clean and close them after use.",
        ],
      },
      {
        heading: "Keep it flexible",
        paragraphs: [
          "Some evenings, cleansing and moisturizing may be all you want to do. It is fine to simplify, especially when your skin feels sensitive or you are tired.",
          "If a product causes discomfort, pause it and reassess. Your evening routine should support your wellbeing rather than feel like another chore.",
        ],
      },
    ],
    keyTakeaways: [
      "A short routine can be both practical and calming.",
      "Keep products clean and use them according to their directions.",
      "Simplify whenever your skin or schedule needs a gentler approach.",
    ],
  },
};

export function getBlogSlug(blog) {
  return blog.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getBlogDetails(blog) {
  return blogDetails[getBlogSlug(blog)] || { intro: blog.excerpt, sections: [], keyTakeaways: [] };
}

export default blogs;
