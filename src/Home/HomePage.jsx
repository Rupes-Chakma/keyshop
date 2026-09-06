import React, { useState } from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import VersionFilter from "../components/product/VersionFilter";
import ProductActionCard from "../components/product/ProductActionCard";
import { windowsData } from "../data/windowsData";
import PromoVideo from "./PromoVideo";
import FAQ from "./FAQ";

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedVersion, setSelectedVersion] = useState("all");

  // সব সংস্করণ থেকে প্রোডাক্টগুলো ফ্ল্যাট অ্যারেতে রূপান্তর
  const allProducts = windowsData.flatMap((category) =>
    category.editions.map((edition) => ({
      ...edition,
      categoryId: category.id,
      categoryName: category.versionName,
    })),
  );

  // নিখুঁত ফিল্টারিং লজিক
  const filteredProducts =
    selectedVersion === "all"
      ? allProducts
      : allProducts.filter((item) => item.categoryId === selectedVersion);

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

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductActionCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-slate-500 col-span-full py-10">
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
