import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";

export default function ProductCard({ edition, versionName }) {
  const { addToCart, cart } = useContext(CartContext);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const isInCart = cart.some((item) => item.id === edition.id);

  const handleBuyNow = () => {
    if (!isInCart) {
      addToCart({ ...edition, versionName });
    }
    navigate("/cart");
  };

  return (
    <div className="group relative bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 backdrop-blur-xl border border-slate-800/80 hover:border-blue-500/60 rounded-2xl p-3.5 sm:p-5 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between transition-all duration-300 overflow-hidden w-full">
      {/* ব্যাকগ্রাউন্ড প্রিমিয়াম গ্লো ইফেক্ট */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all pointer-events-none"></div>

      <div>
        {/* টপ সেকশন: লোগো, ব্যাজ এবং জেনুইন স্ট্যাম্প */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* উইন্ডোজ লোগো */}
            <svg
              className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform"
              viewBox="0 0 88 88"
              fill="currentColor"
            >
              <path d="M0 12.402l35.687-4.86V41.51H0V12.402zm35.687 34.088l-.001 30.075L0 71.977V46.49h35.686zM41.51 6.84L88 0v41.51H41.51V6.84zm46.49 44.67L41.51 46.49v34.673L88 88V51.51z" />
            </svg>
            {/* এডিশন টাইপ ব্যাজ */}
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-md shadow-sm">
              {edition.type}
            </span>
          </div>

          {/* জেনুইন ব্যাজ */}
          <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">
              {t("genuineKey") || "100% Genuine"}
            </span>
          </div>
        </div>

        {/* প্রোডাক্ট নাম */}
        <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1 leading-snug">
          {edition.name}
        </h3>

        {/* শর্ট ডেসক্রিপশন */}
        <p className="text-slate-400 text-[11px] sm:text-xs mb-3.5 leading-relaxed line-clamp-2">
          {edition.descKey ? t(edition.descKey) : edition.desc}
        </p>

        {/* প্রাইস সেকশন (প্রিমিয়াম কার্ড লুক) */}
        <div className="mb-4 flex items-center justify-between bg-slate-950/60 px-3 py-2.5 rounded-xl border border-slate-800/80 shadow-inner">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-2xl font-black text-white font-mono tracking-tight">
              {t("currencySymbol") || "৳"}
              {edition.price}
            </span>
            <span className="text-slate-400 text-[10px] sm:text-xs font-medium">
              {t("lifetimeLabel") || "/ লাইফটাইম"}
            </span>
          </div>
          <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-medium">
            Official
          </span>
        </div>
      </div>

      {/* অ্যাকশন বাটনসমূহ */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        {/* বাই নাও বাটন (গ্রেডিয়েন্ট ও শ্যাডো এফেক্ট সহ) */}
        <button
          onClick={handleBuyNow}
          className="w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 active:scale-[0.98] cursor-pointer text-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{t("buyNow") || "এখনই কিনুন (Buy Now)"}</span>
        </button>

        {/* ডিটেইলস লিংক */}
        <Link
          to={`/product/${edition.id}`}
          className="w-full py-1.5 bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-[11px] rounded-lg transition-all flex items-center justify-center gap-1 group/link"
        >
          <span>{t("viewDetails") || "বিস্তারিত দেখুন"}</span>
          <ArrowRight className="w-3 h-3 text-slate-400 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
