import React, { useState } from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import VersionFilter from "../components/product/VersionFilter";
import ProductCard from "../product/ProductCard"; // আপনার পাথ অনুযায়ী ঠিক করে নেবেন
import { windowsData } from "../data/windowsData";
import PromoVideo from "./PromoVideo";
import FAQ from "./FAQ";

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedVersion, setSelectedVersion] = useState("all");

  // ফিল্টার অনুযায়ী ক্যাটাগরি বা ভার্সন ফিল্টার করার লজিক
  const filteredCategories = windowsData.filter((category) => {
    if (selectedVersion === "all") return true;
    return category.id === selectedVersion;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <SEO title={t("seoTitle")} description={t("seoDesc")} />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          {t("selectVersion")}
        </h1>
        <p className="text-slate-400 text-center text-sm mb-6">
          {t("selectEditionSub")}
        </p>

        {/* Version Filter Tabs */}
        <VersionFilter
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />

        {/* প্রোডাক্ট কার্ডগুলোর রেসপন্সিভ গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {filteredCategories && filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <ProductCard key={category.id} product={category} />
            ))
          ) : (
            <p className="text-center text-slate-400 col-span-full py-10">
              No products found for this filter.
            </p>
          )}
        </div>

        <PromoVideo />
        <FAQ />
      </div>
    </div>
  );
}
