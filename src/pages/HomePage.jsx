import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import VersionFilter from "../components/product/VersionFilter";
import ProductCard from "../components/product/ProductCard";
import LiveChat from "../components/trust/LiveChat";
import { windowsData } from "../data/windowsData";
import { Shield, Zap, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// সঠিক পাথ (src/Home/ ফোল্ডারের ফাইলগুলোর জন্য)
import PromoVideo from "../Home/PromoVideo";
import ReviewSlider from "../Home/ReviewSlider";
import FAQ from "../Home/FAQ";

export default function HomePage() {
  const [selectedVersion, setSelectedVersion] = useState("all");
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // ভার্সন ফিল্টার এবং সার্চ কুয়েরি অনুযায়ী ফিল্টার করা
  const filteredData = windowsData
    .map((category) => {
      const filteredEditions = category.editions.filter((edition) => {
        const matchesVersion =
          selectedVersion === "all" || category.id === selectedVersion;
        const matchesSearch =
          !searchQuery ||
          edition.name?.toLowerCase().includes(searchQuery) ||
          category.versionName?.toLowerCase().includes(searchQuery) ||
          edition.description?.toLowerCase().includes(searchQuery);

        return matchesVersion && matchesSearch;
      });

      return {
        ...category,
        editions: filteredEditions,
      };
    })
    .filter((category) => category.editions.length > 0);

  return (
    <div className="min-h-screen text-slate-100">
      {/* 1. Hero Section with Glow Background */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600 blur-[120px] rounded-full"></div>
          <div className="absolute top-40 left-1/4 w-[300px] h-[200px] bg-indigo-600 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5" />{" "}
            {language === "English"
              ? "Instant Delivery & 100% Official License"
              : "ইনস্ট্যান্ট ডেলিভারি ও ১০০% অফিশিয়াল লাইসেন্স"}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {language === "English" ? (
              <>
                Original <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  Windows OS Products for Your PC?
                </span>
              </>
            ) : (
              <>
                আপনার পিসির জন্য অরিজিনাল <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  Windows OS প্রোডাক্ট কি
                </span>
              </>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-base md:text-lg mb-8 leading-relaxed">
            {language === "English"
              ? "Use genuine Windows license keys instead of using cracks or fake software. Get full security and official updates easily."
              : "কোনো ক্র্যাক বা ভুয়া সফটওয়্যার ব্যবহার না করে জেনুইন উইন্ডোজ লাইসেন্স কি ব্যবহার করুন। সম্পূর্ণ জেনুইন সিকিউরিটি ও অফিশিয়াল আপডেট পান সহজেই।"}
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-slate-300 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 shadow-lg">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>
                {language === "English"
                  ? "100% Genuine Guarantee"
                  : "১০০% জেনুইন গ্যারান্টি"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 shadow-lg">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>
                {language === "English"
                  ? "Instant Email & SMS Delivery"
                  : "ইন্সট্যান্ট ইমেইল ও এসএমএস ডেলিভারি"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 shadow-lg">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span>
                {language === "English"
                  ? "Lifetime Validity & Updates"
                  : "লাইফটাইম মেয়াদ ও আপডেট"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Query Notification Bar */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-white">
              Search results for:{" "}
              <span className="text-cyan-400">"{searchQuery}"</span>
            </h2>
            <a
              href="/"
              className="text-xs text-cyan-400 underline hover:text-cyan-300"
            >
              Clear Search
            </a>
          </div>
        </div>
      )}

      {/* 2. Promotional Video Section */}
      <PromoVideo />

      {/* 3. Products List Section */}
      <section className="max-w-7xl mx-auto px-4 py-10" id="products">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">
            {language === "English"
              ? "Choose Windows Version"
              : "উইন্ডোজ ভার্সন বেছে নিন"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {language === "English"
              ? "Select your preferred edition"
              : "আপনার পছন্দের এডিশনটি নির্বাচন করুন"}
          </p>
        </div>

        <VersionFilter
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />

        <div className="space-y-10">
          {filteredData.length > 0 ? (
            filteredData.map((version) => (
              <div key={version.id} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {version.versionName}{" "}
                    {language === "English" ? "Editions" : "Edition-সমূহ"}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {version.editions.map((edition) => (
                    <ProductCard
                      key={edition.id}
                      edition={edition}
                      versionName={version.versionName}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <p className="text-slate-400 text-sm">
                {language === "English"
                  ? "No products found matching your search."
                  : "আপনার সার্চ অনুযায়ী কোনো প্রোডাক্ট পাওয়া যায়নি।"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Customer Review Screenshot Slider */}
      <ReviewSlider />

      {/* 5. FAQ Section */}
      <FAQ />

      {/* 6. Live Chat Widget */}
      <LiveChat />
    </div>
  );
}
