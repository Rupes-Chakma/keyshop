import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Globe, Menu, X } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু টগল করার স্টেট

  // লোগো বা হোম লিঙ্কে ক্লিক করলে স্মুথলি একদম উপরে স্ক্রল করার ফাংশন
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsOpen(false); // মেনু ওপেন থাকলে লিংক ক্লিক করলে বন্ধ হয়ে যাবে
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex justify-between items-center">
        {/* Left Side: Mobile Menu Toggle Button & Logo */}
        <div className="flex items-center gap-2.5">
          {/* মোবাইল হ্যামবার্গার বাটন (শুধু মোবাইল এবং ট্যাবলেটে দেখাবে) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 hover:border-cyan-500/50 transition focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Animated Computer Monitor with Vibrant Glow Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2 text-lg sm:text-xl font-black tracking-tight transition"
          >
            {/* Outer Computer Monitor Frame with Vivid Cyan/Blue Glow */}
            <div className="relative w-9 h-8 sm:w-10 sm:h-9 rounded-xl bg-slate-900 border-2 border-cyan-500/60 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:border-cyan-400 group-hover:shadow-cyan-400/40 group-hover:scale-105 transition-all duration-300 ease-out shrink-0">
              {/* Screen Inner Area containing the Key Shape */}
              <div className="flex items-center justify-center w-full h-full pt-0.5">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>

              {/* Tiny Computer Stand/Base at the bottom */}
              <div className="absolute -bottom-1 w-2.5 sm:w-3 h-1 bg-cyan-600 rounded-b group-hover:bg-cyan-400 transition-colors"></div>
            </div>

            {/* Typography - Fixed for Mobile & Desktop */}
            <div className="flex items-center tracking-normal ml-0.5">
              <span className="text-white font-extrabold tracking-wide">
                Key
              </span>
              <div className="flex flex-col items-start sm:flex-row sm:items-center ml-0.5">
                <span className="text-cyan-400 font-extrabold leading-none sm:leading-normal">
                  Shop
                </span>
                <span className="text-[8px] sm:text-[10px] font-bold px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/35 uppercase tracking-tighter shadow-sm mt-0.5 sm:mt-0 sm:ml-1 leading-none">
                  BD
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="hover:text-cyan-400 transition font-medium text-sm"
          >
            {t("home") || "Home"}
          </Link>
          {/* আপনি চাইলে এখানে ডেস্কটপের জন্য অন্যান্য পেজের লিংক (Shop, FAQs, Contact ইত্যাদি) অ্যাড করতে পারেন */}
        </div>

        {/* Right Side: Language Toggle & Cart Icon */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* 🌐 Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl px-2 sm:px-2.5 py-1 text-xs hover:border-cyan-500/50 transition-colors">
            <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer py-0.5 text-xs"
            >
              <option value="English" className="bg-slate-900 text-white">
                EN
              </option>
              <option value="Bengali" className="bg-slate-900 text-white">
                BN
              </option>
            </select>
          </div>

          {/* Styled Animated Cart Icon */}
          <Link
            to="/cart"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg shadow-cyan-600/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300 shrink-0" />
            <span className="hidden sm:inline">{t("cart") || "Cart"}</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] sm:text-xs text-white font-bold px-1.5 sm:px-2 py-0.5 rounded-full border-2 border-slate-900 animate-pulse shadow-md">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ================= মোবাইল পপআপ সাইড মেনু (Mobile Sidebar Drawer) ================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* ব্যাকড্রপ ওভারলে (ক্লিক করলে মেনু বন্ধ হবে) */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* স্লাইডিং প্যানেল (বাম দিক থেকে আসবে) */}
          <div className="relative w-4/5 max-w-xs bg-slate-900 border-r border-slate-800 h-full shadow-2xl p-5 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
            <div>
              {/* পপআপ হেডার ও ক্লোজ বাটন */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                  Navigation
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* মোবাইল নেভিগেশন লিংকসমূহ */}
              <nav className="flex flex-col gap-2 text-sm font-medium">
                <Link
                  to="/"
                  onClick={handleLogoClick}
                  className="px-3 py-2.5 rounded-xl bg-slate-800/50 hover:bg-cyan-500/10 hover:text-cyan-400 border border-transparent hover:border-cyan-500/30 transition-all flex items-center justify-between"
                >
                  <span>{t("home") || "Home"}</span>
                  <span className="text-xs text-slate-500">→</span>
                </Link>
                {/* আপনি প্রয়োজন অনুযায়ী এখানে আরও লিংক যোগ করতে পারেন */}
              </nav>
            </div>

            {/* পপআপ ফুটার ইনফো */}
            <div className="pt-4 border-t border-slate-800 text-center">
              <p className="text-[11px] text-slate-400">
                KeyShop BD • Instant Delivery
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
