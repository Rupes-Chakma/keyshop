import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, KeyRound, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function ProductCard({ product }) {
  const { language } = useLanguage();
  const navigate = useNavigate();

  if (!product) return null;

  const editions = product.editions || [];
  const minPrice =
    editions.length > 0
      ? Math.min(...editions.map((e) => e.price))
      : product.price || 1190;

  const handleViewPlans = () => {
    navigate(`/product/${product.id}`);
  };

  let displayName = product.versionName || product.name || "Software License";
  displayName = displayName
    .replace(/Windows 11\s*-\s*Windows 11/gi, "Windows 11")
    .replace(/Windows 10\s*-\s*Windows 10/gi, "Windows 10")
    .replace(/Windows 7\s*-\s*Windows 7/gi, "Windows 7")
    .replace(/MS Office\s*-\s*Microsoft Office/gi, "Microsoft Office");

  const isOffice = displayName.toLowerCase().includes("office");

  return (
    <div className="group relative bg-[#0B0F17] hover:bg-[#111827] border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-5 shadow-xl transition-all duration-300 w-full flex flex-col justify-between">
      <div>
        {/* টপ ক্যাটাগরি এবং স্ট্যাটাস */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
            {product.category || "LICENSE KEY"}
          </span>

          <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Verified</span>
          </div>
        </div>

        {/* মেইন প্রডাক্ট টাইটেল বক্স */}
        <div className="relative rounded-xl overflow-hidden mb-4 bg-[#07090E] p-4 border border-slate-800/90 flex flex-col items-center justify-center text-center min-h-[115px]">
          {/* ব্যাকগ্রাউন্ড ওয়াটারমার্ক (এখানে text-blue-500 বা আপনার পছন্দমতো কালার দিতে পারেন) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-300">
            {isOffice ? (
              <span className="text-7xl font-black font-mono tracking-tighter text-blue-500">
                OFFICE
              </span>
            ) : (
              <div className="grid grid-cols-2 gap-1.5 w-20 h-20 transform rotate-6">
                <div className="bg-blue-600 rounded-sm"></div>
                <div className="bg-indigo-500 rounded-sm"></div>
                <div className="bg-blue-500 rounded-sm"></div>
                <div className="bg-cyan-500 rounded-sm"></div>
              </div>
            )}
          </div>

          <h3 className="text-base font-extrabold text-white tracking-wide relative z-10 mb-2 line-clamp-2 px-1">
            {displayName}
          </h3>

          <span className="text-[11px] font-medium text-slate-300 bg-slate-900 px-3 py-0.5 rounded-md border border-slate-800 flex items-center gap-1.5 relative z-10">
            <KeyRound className="w-3 h-3 text-blue-400" />
            <span>
              {editions.length > 0
                ? `${editions.length} ${language === "English" ? "Editions Available" : "টি এডিশন উপলব্ধ"}`
                : "Lifetime License"}
            </span>
          </span>
        </div>

        {/* প্রাইস এবং স্টক */}
        <div className="mb-4 flex items-center justify-between bg-[#07090E]/60 px-3.5 py-3 rounded-xl border border-slate-800/80">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">
              {language === "English" ? "Starts From" : "মূল্য শুরু"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-white font-mono tracking-tight">
                ৳{minPrice}
              </span>
              <span className="text-slate-400 text-[10px]">
                / {language === "English" ? "lifetime" : "লাইফটাইম"}
              </span>
            </div>
          </div>

          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {language === "English" ? "In Stock" : "স্টকে আছে"}
          </span>
        </div>
      </div>

      {/* ভিউ প্ল্যানস বাটন */}
      <div className="pt-2 border-t border-slate-800/80">
        <button
          onClick={handleViewPlans}
          className="w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 cursor-pointer active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === "English" ? "View Plans" : "প্লান দেখুন"}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
