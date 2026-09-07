import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Reviews() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewsData = [
    {
      id: 1,
      name: "Rashedul Islam",
      product: "Windows 11 Pro",
      rating: 5,
      date: t("revDate1") || "2 days ago",
      text:
        t("revText1") ||
        "Got the license key instantly within 1 minute! Activated successfully without any issues. Highly recommended.",
    },
    {
      id: 2,
      name: "Tanim Ahmed",
      product: "Windows 10 Pro",
      rating: 5,
      date: t("revDate2") || "1 week ago",
      text:
        t("revText2") ||
        "Product quality is truly fantastic. Got exactly what was promised. Support team is also very helpful.",
    },
    {
      id: 3,
      name: "Sajib Rahman",
      product: "Windows 11 Home",
      rating: 5,
      date: t("revDate3") || "2 weeks ago",
      text:
        t("revText3") ||
        "Genuine activation key at a very affordable price. Saved a lot of money. Thank you KeyShop BD!",
    },
  ];

  // অটো স্লাইড ইফেক্ট (ঐচ্ছিক, চাইলে রাখতে পারেন)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviewsData.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
  };

  return (
    <section className="py-12 px-4 relative overflow-hidden bg-slate-950/50 border-t border-slate-800/60">
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-cyan-400 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
            <span>{t("reviewsBadge") || "Verified Customer Reviews"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {t("reviewsTitleMain") || "Trusted by Our Clients"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {t("reviewsSubMain") ||
              "Real experiences shared by our valued customers after purchasing."}
          </p>
        </div>

        {/* Reviews Carousel / Single Card View for Mobile Perfection */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviewsData.map((review) => (
                <div key={review.id} className="w-full shrink-0 px-2">
                  <div className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between transition-all duration-300 max-w-xl mx-auto">
                    {/* কোট আইকন ব্যাকগ্রাউন্ড ওয়াটারমার্ক */}
                    <Quote className="absolute top-4 right-4 w-10 h-10 text-slate-800/40 group-hover:text-cyan-500/10 transition-colors pointer-events-none" />

                    <div>
                      {/* টপ ইউজার প্রফাইল ইনফো */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-base shadow-md shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-white text-sm sm:text-base font-bold truncate flex items-center gap-1.5">
                            {review.name}
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          </h4>
                          <p className="text-slate-400 text-xs truncate">
                            {review.product}{" "}
                            <span className="text-slate-600">•</span>{" "}
                            {review.date}
                          </p>
                        </div>
                      </div>

                      {/* রেটিং স্টারস */}
                      <div className="flex gap-1 text-yellow-400 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>

                      {/* রিভিউ টেক্সট */}
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                        "{review.text}"
                      </p>
                    </div>

                    {/* ফুটার ব্যাজ */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
                      <span className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {t("verifiedBuyer") || "Verified Purchase"}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        100% Genuine
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* নেভিগেশন অ্যারো বাটন (বামে ও ডানে) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-5 p-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 hover:border-cyan-500 transition shadow-lg z-20"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-5 p-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 hover:border-cyan-500 transition shadow-lg z-20"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ডটস ইন্ডিকেটর */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-6 bg-cyan-500"
                  : "w-2 bg-slate-800 hover:bg-slate-700"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
