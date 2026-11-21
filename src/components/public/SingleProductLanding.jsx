import { useState, useEffect, useRef } from "react";
import {
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiPhoneCall,
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiArrowRight,
  FiClock,
  FiPackage,
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiCheck,
  FiAlertCircle,
  FiHeart,
  FiHelpCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import { useSettings } from "../../context/SettingsContext";
import Logo from "../shared/Logo";

export default function SingleProductLanding({ product, onSwitchToClassic, isStandalone = false }) {
  const { settings } = useSettings();
  const [landingData, setLandingData] = useState(null);

  // Fetch dynamic landing page settings from backend if available
  useEffect(() => {
    let active = true;
    const targetSlug = product?.slug || product?.id;
    if (!targetSlug) return;

    api.get(`/landing-pages/${targetSlug}`)
      .then((res) => {
        if (!active) return;
        if (res.data?.data) {
          setLandingData(res.data.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [product?.slug, product?.id]);

  // Hotline & WhatsApp configuration (from admin landing settings or global settings or defaults)
  const hotline = landingData?.hotline || settings?.hotline || "01799-912525";
  const whatsappNumber = landingData?.whatsapp || settings?.whatsapp || "01979-912525";
  const cleanPhone = hotline.replace(/\D/g, "");
  const cleanWhatsapp = whatsappNumber.replace(/\D/g, "");

  const announcementText =
    landingData?.announcement_text ||
    "🔥 স্পেশাল ডিসকাউন্ট অফার! ক্যাশ অন ডেলিভারি ও পার্সেল দেখে নেওয়ার সুযোগ।";
  const headline =
    landingData?.headline ||
    product?.name ||
    "Multiple Natural Honey Combo (খাঁটি প্রাকৃতিক মাল্টিপল মধু কম্বো)";
  const subheadline =
    landingData?.subheadline ||
    "১০০% খাঁটি ও প্রাকৃতিক সুন্দরবনের খলিসা মধু, কালোজিরা ফুলের মধু ও লিচু ফুলের মধুর প্রিমিয়াম কম্বো প্যাক";
  const heroDescription =
    landingData?.hero_description ||
    product?.description ||
    "১০০% খাঁটি ও প্রাকৃতিক সুন্দরবনের খলিসা মধু, কালোজিরা ফুলের মধু ও লিচু ফুলের মধুর প্রিমিয়াম কম্বো প্যাক। কোনো ধরনের ভেজাল বা কৃত্রিম চিনি ছাড়া সম্পূর্ণ ন্যাচারাল সুপারফুড।";
  const guaranteeText =
    landingData?.guarantee_text || "ল্যাব টেস্টে ভেজাল প্রমাণিত হলে শতভাগ মানিব্যাক গ্যারান্টি!";
  const insideDhakaDelivery = Number(landingData?.delivery_inside_dhaka || 70);
  const outsideDhakaDelivery = Number(landingData?.delivery_outside_dhaka || 130);
  const badgeText = landingData?.badge || product?.badge || "🔥 মোস্ট পপুলার কম্বো";

  // Product images & gallery
  const bannerImg = landingData?.banner_image;
  const rawImages = landingData?.gallery_images?.length
    ? landingData.gallery_images
    : product?.images?.length
    ? product.images
    : product?.image
    ? [product.image]
    : [
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=85",
      ];
  const productImages = bannerImg && !rawImages.includes(bannerImg) ? [bannerImg, ...rawImages] : rawImages;
  const [selectedImage, setSelectedImage] = useState(0);

  // Pricing calculations
  const basePrice = Number(product?.price || 1750);
  const baseOldPrice = Number(product?.oldPrice || product?.old_price || Math.round(basePrice * 1.25));

  // Dynamic or Pre-configured High-Converting Package Combos
  const packages = landingData?.packages?.length
    ? landingData.packages.map((pkg, idx) => ({
        id: pkg.id || `pack_${idx + 1}`,
        name: pkg.name,
        quantity: Number(pkg.quantity || 1),
        price: Number(pkg.price),
        oldPrice: Number(pkg.old_price || pkg.oldPrice || Math.round(Number(pkg.price) * 1.25)),
        tag: pkg.tag || (idx === 1 ? "🔥 সবচেয়ে জনপ্রিয় চয়েজ" : ""),
        freeDelivery: Boolean(pkg.free_delivery || pkg.freeDelivery),
        popular: Boolean(pkg.popular || idx === 1),
      }))
    : [
        {
          id: "pack_1",
          name: "১টি প্যাক (স্ট্যান্ডার্ড ট্রায়াল)",
          nameEn: "Single Standard Pack",
          quantity: 1,
          price: Math.round(basePrice * 0.6),
          oldPrice: Math.round(baseOldPrice * 0.6),
          tag: "একক ট্রায়াল",
          freeDelivery: false,
          popular: false,
        },
        {
          id: "pack_2",
          name: "২টি প্যাক (সুপার সেভার ডাবল কম্বো)",
          nameEn: "2-Pack Popular Combo",
          quantity: 1,
          price: basePrice,
          oldPrice: baseOldPrice,
          tag: "🔥 সবচেয়ে জনপ্রিয় চয়েজ",
          freeDelivery: false,
          popular: true,
        },
        {
          id: "pack_3",
          name: "৩টি প্যাক (মেগা ফ্যামিলি ট্রিপল কম্বো)",
          nameEn: "3-Pack Family Mega Combo",
          quantity: 1,
          price: Math.round(basePrice * 1.4),
          oldPrice: Math.round(baseOldPrice * 1.4),
          tag: "⭐ বেস্ট ভ্যালু + ফ্রি ডেলিভারি",
          freeDelivery: true,
          popular: false,
        },
      ];

  const [selectedPackage, setSelectedPackage] = useState(packages[1] || packages[0]);

  // Sync selectedPackage if dynamic packages arrive from API
  useEffect(() => {
    if (packages.length > 0) {
      const pop = packages.find((p) => p.popular) || packages[1] || packages[0];
      setSelectedPackage(pop);
    }
  }, [landingData]);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState("inside"); // inside | outside
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Form Fields
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Countdown Timer Simulation for Urgency (4 hours 32 mins)
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position to show sticky bottom bar
  const heroRef = useRef(null);
  const orderFormRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setShowStickyBar(heroBottom < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOrderForm = (e) => {
    if (e) e.preventDefault();
    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Cost calculations
  const packagePrice = selectedPackage.price;
  const subtotal = packagePrice * orderQuantity;
  const standardDeliveryFee = deliveryArea === "inside" ? insideDhakaDelivery : outsideDhakaDelivery;
  const deliveryFee = selectedPackage.freeDelivery ? 0 : standardDeliveryFee;
  const discountTotal = (selectedPackage.oldPrice - selectedPackage.price) * orderQuantity;
  const finalTotal = subtotal + deliveryFee;

  // Handle Order Submit
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const nameTrimmed = customerName.trim();
    const phoneTrimmed = customerPhone.trim();
    const addressTrimmed = customerAddress.trim();

    if (!nameTrimmed) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন");
      return;
    }

    const cleanDigits = phoneTrimmed.replace(/\D/g, "");
    if (!cleanDigits || cleanDigits.length < 11) {
      toast.error("অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)");
      return;
    }

    if (!addressTrimmed || addressTrimmed.length < 5) {
      toast.error("অনুগ্রহ করে পূর্ণ ডেলিভারি ঠিকানা লিখুন (থানা ও জেলা সহ)");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customer_name: nameTrimmed,
        customer_phone: phoneTrimmed,
        customer_email: "", // Handled gracefully by backend
        shipping_address: addressTrimmed,
        city: deliveryArea === "inside" ? "Dhaka" : "Outside Dhaka",
        postal_code: "",
        payment_method: "cash_on_delivery",
        shipping_fee: deliveryFee,
        discount: discountTotal,
        notes: customerNote.trim()
          ? `[প্যাকেজ: ${selectedPackage.name}] - ${customerNote.trim()}`
          : `[প্যাকেজ: ${selectedPackage.name}]`,
        items: [
          {
            id: product.id,
            name: `${product.name} - ${selectedPackage.name}`,
            price: packagePrice,
            quantity: orderQuantity,
            image: productImages[0] || product.image,
          },
        ],
      };

      const res = await api.post("/orders", payload);
      const placed = res.data?.data;

      setOrderSuccess({
        orderNumber: placed?.order_number || placed?.id || "CM-" + Math.floor(10000 + Math.random() * 90000),
        name: nameTrimmed,
        phone: phoneTrimmed,
        address: addressTrimmed,
        area: deliveryArea === "inside" ? "ঢাকা সিটির ভেতরে" : "ঢাকা সিটির বাইরে",
        total: finalTotal,
        package: selectedPackage.name,
        quantity: orderQuantity,
      });

      toast.success("আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!");
    } catch (err) {
      const msg = err?.response?.data?.message || "অর্ডার সম্পন্ন করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayFeatures = landingData?.features?.length
    ? landingData.features
    : [
        {
          title: "সুন্দরবনের প্রাকৃতিক খলিসা মধু",
          desc: "সুন্দরবনের গহীন অরণ্য থেকে সরাসরি মৌয়ালদের মাধ্যমে সংগৃহীত। অত্যন্ত সুগন্ধি, হালকা সোনালী রঙের ও প্রাকৃতিক রোগ প্রতিরোধক গুণে ভরপুর।",
          icon: "🌿",
        },
        {
          title: "চাষমুক্ত খাঁটি কালোজিরা ফুলের মধু",
          desc: "কালোজিরা ফুল থেকে সংগৃহীত গাঢ় রঙের এই মধু শক্তি বৃদ্ধি, ক্লান্তি দূরীকরণ এবং রোগব্যাধি নিরাময়ে অত্যন্ত প্রাচীন ও কার্যকরী মহৌষধ।",
          icon: "✨",
        },
        {
          title: "মিষ্টি ও সুস্বাদু লিচু ফুলের মধু",
          desc: "লিচু বাগানের মৌমাছিদের তৈরি সুমিষ্ট স্বাদের এই মধু ছোট-বড় সবার পছন্দের। শিশুদের দৈহিক বৃদ্ধি এবং দ্রুত শক্তির জন্য চমৎকার।",
          icon: "🍯",
        },
      ];

  const displayBenefits = landingData?.benefits?.length
    ? landingData.benefits
    : [
        {
          icon: "🛡️",
          title: "রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি",
          desc: "অ্যান্টিঅক্সিডেন্ট ও অ্যান্টিব্যাকটেরিয়াল উপাদান দেহের রোগ প্রতিরোধ ব্যবস্থাকে শক্তিশালী করে।",
        },
        {
          icon: "⚡",
          title: "প্রাকৃতিক এনার্জি বুস্টার",
          desc: "গ্লুকোজ ও ফ্রুক্টোজ শরীরের ক্লান্তি দূর করে দ্রুত শক্তি ফিরিয়ে আনে।",
        },
        {
          icon: "🫁",
          title: "ঠান্ডা ও কাশি নিরাময়",
          desc: "গলাব্যথা, খুসখুসে কাশি ও শ্বাসতন্ত্রের সংক্রমণ দূর করতে অতুলনীয় ভূমিকা রাখে।",
        },
        {
          icon: "🥗",
          title: "হজম শক্তি ও মেটাবলিজম বৃদ্ধি",
          desc: "পেটের গ্যাস দূর করে এবং হজম প্রক্রিয়া সহজ করে পরিপাকতন্ত্রকে সুস্থ রাখে।",
        },
        {
          icon: "✨",
          title: "ত্বক উজ্জ্বল ও টানটান রাখা",
          desc: "ভেতর থেকে ত্বকের আর্দ্রতা ধরে রেখে ত্বককে দাগহীন ও উজ্জ্বল করে তোলে।",
        },
        {
          icon: "❤️",
          title: "হার্ট ও রক্তচাপ নিয়ন্ত্রণ",
          desc: "রক্তনালীর সুরক্ষা নিশ্চিত করে স্বাভাবিক রক্ত চলাচল বজায় রাখতে সাহায্য করে।",
        },
      ];

  const displaySteps = landingData?.steps?.length
    ? landingData.steps
    : [
        {
          step: "০১",
          title: "সকালে খালি পেটে",
          desc: "প্রতিদিন সকালে এক গ্লাস কুসুম গরম পানিতে ১–২ চা চামচ মধু ও লেবুর রস মিশিয়ে পান করুন।",
        },
        {
          step: "০২",
          title: "দুধ বা চায়ের সাথে",
          desc: "চিনির স্বাস্থ্যকর বিকল্প হিসেবে প্রতিদিন কুসুম গরম দুধ বা গ্রিন টি-তে মধু ব্যবহার করুন।",
        },
        {
          step: "০৩",
          title: "ত্বক ও রূপচর্চায়",
          desc: "ত্বকের উজ্জ্বলতা বাড়াতে এবং দাগ দূর করতে সরাসরি ফেসপ্যাক হিসেবে ব্যবহার করতে পারেন।",
        },
      ];

  const displayReviews = landingData?.reviews?.length
    ? landingData.reviews
    : [
        {
          name: "তানভীর হাসান",
          location: "মিরপুর, ঢাকা",
          comment:
            "মধু দুটি অনেক সুস্বাদু এবং সুঘ্রাণ অতুলনীয়। সুন্দরবনের খলিসা মধুর স্বাদ সত্যিই অসাধারণ। ডেলিভারি মাত্র ২৪ ঘণ্টায় পেয়েছি। ধন্যবাদ!",
          rating: 5,
          date: "২ দিন আগে",
        },
        {
          name: "মো: রফিকুল ইসলাম",
          location: "চট্টগ্রাম সদর",
          comment:
            "কালোজিরা ফুলের মধু এর আগে অনেক জায়গা থেকে কিনেছি কিন্তু এই মধুর মতো পিউর কোয়ালিটি আগে পাইনি। পরিবারের সবাই খুব পছন্দ করেছে।",
          rating: 5,
          date: "৫ দিন আগে",
        },
        {
          name: "নাসরিন সুলতানা",
          location: "উত্তরা, ঢাকা",
          comment:
            "প্যাকেজিং খুব নিখুঁত ছিল। ডেলিভারিম্যানের সামনে চেক করে নিতে পেরেছি, এটাই সবচেয়ে বড় সুবিধা। ৩ বোতল কম্বো নিয়ে দারুণ সেভ হয়েছে।",
          rating: 5,
          date: "১ সপ্তাহ আগে",
        },
      ];

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = [
    {
      q: "পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করার সুবিধা (ক্যাশ অন ডেলিভারি) আছে কি?",
      a: "জি, সম্পূর্ণ ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। ডেলিভারি ম্যানের কাছ থেকে পার্সেলটি গ্রহণ করে দেখে তারপর মূল্য পরিশোধ করবেন। কোনো অগ্রিম টাকা প্রদান করতে হবে না।",
    },
    {
      q: "ডেলিভারি পেতে কতদিন সময় লাগবে?",
      a: "ঢাকা সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকা সিটির বাইরে জেলা ও থানা পর্যায়ে সাধারণত ২ থেকে ৩ কার্যদিবসের মধ্যে হোম ডেলিভারি পৌঁছে দেওয়া হয়।",
    },
    {
      q: "মধুটি কি আসলেই শতভাগ খাঁটি ও প্রাকৃতিক?",
      a: "আমাদের প্রতিটি মধু সরাসরি সুন্দরবনের মৌয়াল এবং নিজস্ব খামার থেকে কোনো কেমিক্যাল, ফ্লেভার বা বাড়তি চিনি মেশানো ছাড়াই সংগৃহীত। প্রতিটি ব্যাচ ল্যাব টেস্টে শতভাগ উত্তীর্ণ।",
    },
    {
      q: "পণ্যটি পছন্দ না হলে বা কোনো সমস্যা থাকলে কি রিটার্ন করা যাবে?",
      a: "হ্যাঁ, ডেলিভারি নেওয়ার সময় যদি পণ্যটিতে কোনো ঘাটতি বা অসঙ্গতি দেখতে পান তবে সাথে সাথে ডেলিভারিম্যানকে রিটার্ন করতে পারবেন অথবা আমাদের হটলাইনে জানালে ৭ দিনের মধ্যে রিটার্ন বা রিপ্লেসমেন্ট সুবিধা পাবেন।",
    },
    {
      q: "ফোনে বা হোয়াটসঅ্যাপে কিভাবে সরাসরি অর্ডার করতে পারি?",
      a: `আপনি যেকোনো সময় আমাদের হটলাইন নম্বরে (${hotline}) কল করে অথবা WhatsApp নম্বরে (${whatsappNumber}) আপনার নাম, ঠিকানা ও প্যাকেজ পাঠিয়ে সরাসরি অর্ডার কনফার্ম করতে পারেন।`,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* 1. TOP NOTICE & URGENCY BAR */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-xs sm:text-sm py-2.5 px-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300"></span>
            </span>
            <span>
              {announcementText}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1 bg-black/25 px-2.5 py-1 rounded-full font-mono font-semibold tracking-wider">
              <FiClock className="size-3 text-amber-300" />
              <span>
                {String(timeLeft.hours).padStart(2, "0")}h :{" "}
                {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>

            <a
              href={`tel:${cleanPhone}`}
              className="hidden md:inline-flex items-center gap-1 font-semibold hover:text-amber-200 transition"
            >
              <FiPhoneCall className="size-3" /> {hotline}
            </a>
          </div>
        </div>
      </div>

      {/* 2. LANDING SUB-BAR / HEADER */}
      {isStandalone ? (
        <header className="bg-white border-b border-neutral-200 py-3 px-4 shadow-xs sticky top-[38px] sm:top-[38px] z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="inline-block">
                <Logo className="h-8 sm:h-9 w-auto" />
              </Link>
              <span className="hidden sm:inline-block h-4 w-px bg-neutral-300" />
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <FiShield className="size-3" /> ১০০% আসল ও বিশুদ্ধ পণ্য
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {onSwitchToClassic && (
                <button
                  type="button"
                  onClick={onSwitchToClassic}
                  className="text-[11px] sm:text-xs text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-400 px-2.5 py-1.5 rounded-lg transition"
                  title="View standard store layout"
                >
                  Classic Store View
                </button>
              )}

              <a
                href={`https://wa.me/880${cleanWhatsapp}?text=${encodeURIComponent(
                  `Hello, I want to order: ${product?.name || "Multiple Honey Combo"}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition"
              >
                <FaWhatsapp className="size-3.5" />
                <span className="hidden sm:inline">WhatsApp Order</span>
              </a>

              <button
                type="button"
                onClick={scrollToOrderForm}
                className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 sm:py-2 rounded-lg shadow-sm transition transform hover:-translate-y-0.5"
              >
                <FiShoppingBag className="size-3.5 sm:size-4" />
                <span>অর্ডার করুন</span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        <div className="bg-amber-50/80 border-b border-amber-200 py-2.5 px-4 text-xs">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-900 flex items-center gap-1">
                ⚡ ফাস্ট অর্ডার ল্যান্ডিং পেজ ভিউ সক্রিয়
              </span>
              <span className="hidden sm:inline text-neutral-400">•</span>
              <span className="hidden sm:inline text-neutral-600">
                সরাসরি অন-পেজ ক্যাশ অন ডেলিভারিতে অর্ডার করুন
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToClassic && (
                <button
                  type="button"
                  onClick={onSwitchToClassic}
                  className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold px-2.5 py-1 rounded-md transition shadow-2xs"
                >
                  ক্লাসিক স্টোর ভিউ দেখুন
                </button>
              )}
              <button
                type="button"
                onClick={scrollToOrderForm}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-md transition shadow-2xs"
              >
                অর্ডার ফর্মে যান ↓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO SHOWCASE & PRODUCT SECTION */}
      <section ref={heroRef} className="py-6 sm:py-10 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-24">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm group">
                <img
                  src={productImages[selectedImage] || productImages[0]}
                  alt={product?.name || "Product"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                  Save ৳{selectedPackage.oldPrice - selectedPackage.price}
                </span>

                <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-lg">
                  🛡️ ১০০% প্রিমিয়াম কোয়ালিটি
                </span>
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`relative size-16 sm:size-20 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                        selectedImage === idx
                          ? "border-amber-600 ring-2 ring-amber-600/20"
                          : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Trust Highlights below image */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <FiCheckCircle className="size-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <FiShield className="size-4 text-amber-600 shrink-0" />
                  <span className="font-medium">দেখে টাকা দিন</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <FiTruck className="size-4 text-blue-600 shrink-0" />
                  <span className="font-medium">দ্রুত হোম ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <FiPackage className="size-4 text-purple-600 shrink-0" />
                  <span className="font-medium">৭ দিনের গ্যারান্টি</span>
                </div>
              </div>
            </div>

            {/* Product Offer & Details (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Reviews Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold text-amber-900">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar key={s} className="size-3 fill-current" />
                    ))}
                  </div>
                  <span>৪.৯ / ৫ ({product?.reviews || 164}+ কাস্টমার রিভিউ)</span>
                </div>

                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                  ⚡ আজ ৫৪ জন এই অফারটি অর্ডার করেছেন
                </span>
              </div>

              {/* Title & Brand */}
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                  {product?.brand || "Naturo BD"} • {badgeText}
                </p>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug">
                  {headline}
                </h1>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {heroDescription}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-900">
                    ৳{selectedPackage.price.toLocaleString()}
                  </span>
                  <span className="text-lg sm:text-xl text-neutral-400 line-through font-semibold">
                    ৳{selectedPackage.oldPrice.toLocaleString()}
                  </span>
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ৳{selectedPackage.oldPrice - selectedPackage.price} সেভ!
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-amber-800 font-medium">
                  পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করার সুবর্ণ সুযোগ। সারা বাংলাদেশে হোম ডেলিভারি!
                </p>
              </div>

              {/* PACKAGE / COMBO SELECTOR */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                    <span>📦 আপনার পছন্দ অনুযায়ী প্যাকেজ নির্বাচন করুন:</span>
                  </label>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    ক্লিক করে সিলেক্ট করুন
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packages.map((pkg) => {
                    const isSelected = selectedPackage.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`cursor-pointer relative p-3.5 rounded-xl border-2 transition text-left flex flex-col justify-between ${
                          isSelected
                            ? "border-amber-600 bg-amber-50/60 shadow-sm ring-1 ring-amber-600"
                            : "border-neutral-200 bg-white hover:border-amber-300"
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            Most Popular
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-bold text-xs text-neutral-900">{pkg.name}</h4>
                            <span
                              className={`size-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "border-amber-600 bg-amber-600 text-white"
                                  : "border-neutral-300"
                              }`}
                            >
                              {isSelected && <FiCheck className="size-3" />}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1">{pkg.tag}</p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-neutral-100 flex items-baseline justify-between">
                          <span className="font-extrabold text-sm text-neutral-900">
                            ৳{pkg.price.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-neutral-400 line-through">
                            ৳{pkg.oldPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* QUANTITY AND CTA BUTTONS */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-neutral-200 rounded-xl bg-white px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setOrderQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-neutral-600 hover:text-black transition"
                    >
                      <FiMinus className="size-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-neutral-900">
                      {orderQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOrderQuantity((q) => q + 1)}
                      className="p-2 text-neutral-600 hover:text-black transition"
                    >
                      <FiPlus className="size-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={scrollToOrderForm}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-extrabold text-base sm:text-lg text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 animate-pulse"
                  >
                    <span>👉 অর্ডার করতে এখানে ক্লিক করুন</span>
                    <FiArrowRight className="size-5" />
                  </button>
                </div>

                {/* Direct Call & WhatsApp buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 border-neutral-800 text-neutral-900 hover:bg-neutral-900 hover:text-white font-bold text-xs sm:text-sm transition"
                  >
                    <FiPhoneCall className="size-4 text-amber-600" />
                    <span>কল করে অর্ডার: {hotline}</span>
                  </a>

                  <a
                    href={`https://wa.me/880${cleanWhatsapp}?text=${encodeURIComponent(
                      `হ্যালো! আমি ${product?.name || "Multiple Honey Combo"} অর্ডার করতে চাই।`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-xs sm:text-sm transition"
                  >
                    <FaWhatsapp className="size-4" />
                    <span>WhatsApp-এ মেসেজ দিন</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE THIS COMBO / INGREDIENTS STORY */}
      <section className="py-10 sm:py-14 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100/60 px-3 py-1 rounded-full">
              ১০০% খাঁটি ও প্রাকৃতিক উপাদান
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              কেন আমাদের এই প্রাকৃতিক মধু কম্বো প্যাকটি সেরা?
            </h2>
            <p className="text-sm text-neutral-600">
              প্রকৃতির সেরা উৎস থেকে সংগৃহীত অপরিশোধিত ও বিশুদ্ধ মধুর অপূর্ব সমন্বয়
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {displayFeatures.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs hover:shadow-md transition"
              >
                <div className="size-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4 font-bold text-xl">
                  {item.icon || "🌿"}
                </div>
                <h3 className="font-bold text-base text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HEALTH BENEFITS GRID */}
      <section className="py-10 sm:py-14 bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              নিয়মিত খাঁটি মধু খাওয়ার বিশেষ উপকারিতা
            </h2>
            <p className="text-sm text-neutral-600">
              সুস্থ ও কর্মচঞ্চল জীবনধারায় প্রতিদিন খাঁটি মধুর ভূমিকা অপরিসীম
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {displayBenefits.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-neutral-50 border border-neutral-200"
              >
                <span className="text-2xl p-2 rounded-lg bg-white border border-neutral-200 shrink-0">
                  {item.icon || "✨"}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">{item.title}</h4>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Highlight Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-amber-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold">{guaranteeText}</h3>
              <p className="text-xs sm:text-sm text-amber-100">
                আমাদের প্রতিটি বোতলে রয়েছে বিশ্বস্ততার সিলমোহর ও নির্ভেজাল বিশুদ্ধতার শতভাগ নিশ্চয়তা।
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToOrderForm}
              className="bg-neutral-900 hover:bg-black text-white font-bold text-sm px-6 py-2.5 rounded-xl shrink-0 transition"
            >
              এখনই অর্ডার করুন
            </button>
          </div>
        </div>
      </section>

      {/* 6. HOW TO CONSUME / USE */}
      <section className="py-10 sm:py-14 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-extrabold text-neutral-900">
              খাওয়ার সঠিক নিয়মাবলী
            </h2>
            <p className="text-sm text-neutral-600">
              সর্বোচ্চ পুষ্টি ও ফলাফল পেতে নিম্নলিখিত নিয়মে সেবন করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displaySteps.map((stepItem, sIdx) => (
              <div key={sIdx} className="bg-white p-5 rounded-2xl border border-neutral-200 text-center space-y-2">
                <div className="size-10 rounded-full bg-amber-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto">
                  {stepItem.step || `০${sIdx + 1}`}
                </div>
                <h4 className="font-bold text-sm text-neutral-900">{stepItem.title}</h4>
                <p className="text-xs text-neutral-600">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REAL CUSTOMER REVIEWS */}
      <section className="py-10 sm:py-14 bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full uppercase">
              গ্রাহকদের অভিজ্ঞতা
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              সন্তুষ্ট গ্রাহকদের বাস্তব মতামত
            </h2>
            <p className="text-sm text-neutral-600">
              আমাদের পণ্যের মান ও সেবা সম্পর্কে সম্মানিত ক্রেতাদের রিভিউ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {displayReviews.map((review, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      {[...Array(review.rating || 5)].map((_, s) => (
                        <FiStar key={s} className="size-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-400">{review.date || "সম্প্রতি"}</span>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-200 text-xs">
                  <div className="size-8 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center">
                    {(review.name || "গ্রাহক").charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-900">{review.name}</h5>
                    <p className="text-[11px] text-neutral-500">{review.location} • <span className="text-emerald-600 font-semibold">Verified Buyer</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EMBEDDED DIRECT CHECKOUT / ORDER FORM */}
      <section
        id="order-form"
        ref={orderFormRef}
        className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/60 to-orange-50/70 border-b border-neutral-300 scroll-mt-14"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8">
            <span className="inline-block bg-red-600 text-white font-extrabold text-xs uppercase px-3.5 py-1 rounded-full shadow-xs">
              ⚡ ক্যাশ অন ডেলিভারি (হাতে পেয়ে টাকা দিন)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
              অর্ডার করতে নিচের ফর্মটি সঠিক তথ্য দিয়ে পূরণ করুন
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              কোনো অগ্রিম পেমেন্ট করতে হবে না। পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করবেন।
            </p>
          </div>

          <form
            onSubmit={handlePlaceOrder}
            className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
              {/* Form Inputs (7 cols) */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-5">
                <h3 className="font-bold text-base text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
                  <span className="size-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">
                    ১
                  </span>
                  <span>আপনার ডেলিভারি তথ্য দিন:</span>
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    আপনার নাম লিখুন <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="যেমন: মোঃ তানভীর হাসান"
                    className="w-full text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-neutral-50/50"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="যেমন: 01712345678"
                    className="w-full text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-neutral-50/50"
                  />
                  <p className="mt-1 text-[11px] text-neutral-500">
                    ডেলিভারির সময় এই নম্বরে কল করা হবে।
                  </p>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="বাসা নং, রোড নং, এলাকা, থানা ও জেলা উল্লেখ করুন"
                    className="w-full text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-neutral-50/50"
                  />
                </div>

                {/* Delivery Area Selection */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-2">
                    ডেলিভারি লোকেশন সিলেক্ট করুন <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      onClick={() => setDeliveryArea("inside")}
                      className={`cursor-pointer p-3 rounded-xl border-2 flex items-center justify-between text-xs transition ${
                        deliveryArea === "inside"
                          ? "border-amber-600 bg-amber-50/60 font-bold"
                          : "border-neutral-200 bg-white text-neutral-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-4 rounded-full border flex items-center justify-center ${
                            deliveryArea === "inside"
                              ? "border-amber-600 bg-amber-600 text-white"
                              : "border-neutral-300"
                          }`}
                        >
                          {deliveryArea === "inside" && <FiCheck className="size-3" />}
                        </span>
                        <span>ঢাকা সিটির ভেতরে</span>
                      </div>
                      <span className="font-extrabold text-neutral-900">
                        {selectedPackage.freeDelivery ? "FREE" : "৳৭০"}
                      </span>
                    </label>

                    <label
                      onClick={() => setDeliveryArea("outside")}
                      className={`cursor-pointer p-3 rounded-xl border-2 flex items-center justify-between text-xs transition ${
                        deliveryArea === "outside"
                          ? "border-amber-600 bg-amber-50/60 font-bold"
                          : "border-neutral-200 bg-white text-neutral-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-4 rounded-full border flex items-center justify-center ${
                            deliveryArea === "outside"
                              ? "border-amber-600 bg-amber-600 text-white"
                              : "border-neutral-300"
                          }`}
                        >
                          {deliveryArea === "outside" && <FiCheck className="size-3" />}
                        </span>
                        <span>ঢাকা সিটির বাইরে</span>
                      </div>
                      <span className="font-extrabold text-neutral-900">
                        {selectedPackage.freeDelivery ? "FREE" : "৳১৩০"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    অতিরিক্ত নির্দেশনা / নোট (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="যেমন: বিকেলে ডেলিভারি করবেন"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Order Summary Column (5 cols) */}
              <div className="md:col-span-5 p-6 sm:p-8 bg-neutral-50/80 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 border-b border-neutral-200 pb-3 flex items-center gap-2">
                    <span className="size-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">
                      ২
                    </span>
                    <span>আপনার অর্ডারের বিবরণ:</span>
                  </h3>

                  {/* Chosen Item Card */}
                  <div className="mt-4 p-3 rounded-xl bg-white border border-neutral-200 flex gap-3 items-center">
                    <img
                      src={productImages[0] || product.image}
                      alt=""
                      className="size-14 rounded-lg object-cover shrink-0 border border-neutral-200"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-neutral-900 line-clamp-1">
                        {product?.name || "Multiple Honey Combo"}
                      </h4>
                      <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
                        {selectedPackage.name}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-xs">
                        <span className="font-extrabold text-neutral-900">
                          ৳{packagePrice.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2 border border-neutral-200 rounded px-1.5 py-0.5 bg-neutral-50">
                          <button
                            type="button"
                            onClick={() => setOrderQuantity((q) => Math.max(1, q - 1))}
                            className="text-neutral-500 hover:text-black"
                          >
                            -
                          </button>
                          <span className="font-bold text-[11px]">{orderQuantity}</span>
                          <button
                            type="button"
                            onClick={() => setOrderQuantity((q) => q + 1)}
                            className="text-neutral-500 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost breakdown */}
                  <div className="mt-5 space-y-2.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>পণ্যের সাবটোটাল:</span>
                      <span className="font-semibold text-neutral-900">
                        ৳{subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>ডেলিভারি চার্জ:</span>
                      <span className="font-semibold text-neutral-900">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-600 font-bold">ফ্রি ডেলিভারি!</span>
                        ) : (
                          `৳${deliveryFee}`
                        )}
                      </span>
                    </div>

                    {discountTotal > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>মোট সেভিংস:</span>
                        <span>-৳{discountTotal.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline text-sm sm:text-base font-extrabold text-neutral-900">
                      <span>সর্বমোট প্রদেয় টাকা:</span>
                      <span className="text-xl sm:text-2xl text-amber-900">
                        ৳{finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Badge */}
                  <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <FiCheckCircle className="size-4 shrink-0 text-emerald-600" />
                    <span>
                      পেমেন্ট পদ্ধতি: <strong>ক্যাশ অন ডেলিভারি (Cash on Delivery)</strong>
                    </span>
                  </div>
                </div>

                {/* Big Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-orange-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>অর্ডার সম্পন্ন হচ্ছে...</span>
                      </span>
                    ) : (
                      <>
                        <FiCheckCircle className="size-5" />
                        <span>অর্ডার কনফার্ম করুন (৳{finalTotal.toLocaleString()})</span>
                      </>
                    )}
                  </button>

                  <p className="mt-2 text-center text-[11px] text-neutral-500">
                    🔒 আপনার দেওয়া তথ্য শতভাগ নিরাপদ ও সুরক্ষিত।
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-10 sm:py-14 bg-white border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-1.5 mb-8">
            <h2 className="text-2xl font-extrabold text-neutral-900">
              সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              অর্ডার বা পণ্য সম্পর্কে যেকোনো তথ্যের জন্য নিচের প্রশ্নোত্তরগুলো দেখুন
            </p>
          </div>

          <div className="space-y-3">
            {(landingData?.faqs?.length ? landingData.faqs : faqs).map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200 bg-neutral-50/50 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-neutral-900 hover:text-amber-700 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <FiChevronUp className="size-4 text-neutral-500 shrink-0" />
                    ) : (
                      <FiChevronDown className="size-4 text-neutral-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-neutral-600 border-t border-neutral-100 bg-white leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. SUCCESS CONFIRMATION MODAL */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl border border-neutral-200 relative">
            <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
              <FiCheckCircle className="size-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
              অভিনন্দন! আপনার অর্ডারটি নিশ্চিত হয়েছে
            </h3>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">অর্ডার নম্বর:</span>
                <span className="font-mono font-bold text-neutral-900">
                  {orderSuccess.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">গ্রাহকের নাম:</span>
                <span className="font-semibold text-neutral-900">{orderSuccess.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">মোবাইল নম্বর:</span>
                <span className="font-semibold text-neutral-900">{orderSuccess.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">প্যাকেজ:</span>
                <span className="font-semibold text-neutral-900">{orderSuccess.package}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 font-bold text-sm">
                <span>সর্বমোট পরিশোধযোগ্য:</span>
                <span className="text-amber-900">৳{orderSuccess.total.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600">
              আমাদের কাস্টমার কেয়ার প্রতিনিধি আপনার অর্ডারটি ভেরিফাই করার জন্য কিছুক্ষণের মধ্যে কল করবেন।
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                to="/dashboard/orders"
                className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition"
              >
                আমার অর্ডার দেখুন
              </Link>
              <button
                type="button"
                onClick={() => setOrderSuccess(null)}
                className="py-3 px-4 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-semibold text-xs transition"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. STICKY FLOATING BOTTOM BAR (MOBILE & DESKTOP) */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-3 px-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={productImages[0] || product.image}
                alt=""
                className="size-11 sm:size-12 rounded-lg object-cover shrink-0 border border-neutral-200"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-neutral-900 truncate">
                  {product?.name || "Multiple Honey Combo"}
                </h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-extrabold text-sm sm:text-base text-amber-900">
                    ৳{selectedPackage.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-neutral-400 line-through">
                    ৳{selectedPackage.oldPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToOrderForm}
              className="py-2.5 sm:py-3 px-5 sm:px-7 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs sm:text-sm shadow-md shrink-0 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              👉 অর্ডার করুন
            </button>
          </div>
        </div>
      )}

      {/* 12. FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/880${cleanWhatsapp}?text=${encodeURIComponent(
          `হ্যালো! আমি ${product?.name || "Multiple Honey Combo"} সম্পর্কে জানতে ও অর্ডার করতে চাই।`
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 size-13 sm:size-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group"
      >
        <FaWhatsapp className="size-7 sm:size-8" />
        <span className="sr-only">WhatsApp Chat</span>
      </a>
    </div>
  );
}
