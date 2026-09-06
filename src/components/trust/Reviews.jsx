import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Reviews() {
  const { t } = useLanguage();

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

  return (
    <section className="py-12 px-4 relative overflow-hidden bg-slate-950/50 border-t border-slate-800/60">
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-semibold mb-3">
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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all duration-300"
            >
              {/* কোট আইকন ব্যাকগ্রাউন্ড ওয়াটারমার্ক */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-800/40 group-hover:text-blue-500/10 transition-colors pointer-events-none" />

              <div>
                {/* টপ ইউজার প্রফাইল ইনফো */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-white text-sm font-bold truncate flex items-center gap-1.5">
                      {review.name}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </h4>
                    <p className="text-slate-400 text-[11px] truncate">
                      {review.product} <span className="text-slate-600">•</span>{" "}
                      {review.date}
                    </p>
                  </div>
                </div>

                {/* রেটিং স্টারস */}
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* রিভিউ টেক্সট (সুন্দর লাইন হাইট ও ক্ল্যাম্পসহ) */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  "{review.text}"
                </p>
              </div>

              {/* ফুটার ব্যাজ */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-medium">
                <span className="flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" />
                  {t("verifiedBuyer") || "Verified Purchase"}
                </span>
                <span className="text-slate-400 text-[10px]">100% Genuine</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
