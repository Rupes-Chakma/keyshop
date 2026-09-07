import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useTransition,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Globe,
  Menu,
  X,
  Search,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { windowsData } from "../../data/windowsData";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // সব প্রোডাক্ট ফ্ল্যাট অ্যারেতে রূপান্তর
  const allProducts = windowsData.flatMap((category) =>
    category.editions.map((edition) => ({
      ...edition,
      versionName: category.versionName,
    })),
  );

  const popularSearches = [
    "Windows 11 Pro",
    "Windows 10 Pro",
    "Windows 11 Home",
    "Office 2021",
  ];

  // স্মুথ ফিল্টারিং
  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.versionName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : allProducts.slice(0, 5);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার জন্য
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setIsSearchFocused(false);
    }
  };

  // মাউস ডাউন বা ক্লিকের সাথে সাথে ইনস্ট্যান্ট ও স্মুথভাবে নেভিগেট করার জন্য
  const handleSelectProduct = (productName) => {
    startTransition(() => {
      navigate(`/?search=${encodeURIComponent(productName)}`);
      setIsOpen(false);
      setIsSearchFocused(false);
      setSearchQuery("");
    });
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex justify-between items-center">
        {/* Left Side: Mobile Menu Toggle Button & Logo */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 hover:border-cyan-500/50 transition focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            to="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2 text-lg sm:text-xl font-black tracking-tight transition"
          >
            <div className="relative w-9 h-8 sm:w-10 sm:h-9 rounded-xl bg-slate-900 border-2 border-cyan-500/60 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:border-cyan-400 group-hover:shadow-cyan-400/40 group-hover:scale-105 transition-all duration-300 ease-out shrink-0">
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
              <div className="absolute -bottom-1 w-2.5 sm:w-3 h-1 bg-cyan-600 rounded-b group-hover:bg-cyan-400 transition-colors"></div>
            </div>

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
        </div>

        {/* Right Side: Language Toggle & Cart Icon */}
        <div className="flex items-center gap-2 sm:gap-4">
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

      {/* ================= মোবাইল মেনু এবং আপনার প্রোডাক্টের লাইভ সার্চ ড্রপডাউন ================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative w-4/5 max-w-xs bg-slate-900 border-r border-slate-800 h-full shadow-2xl p-4 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <Link
                  to="/"
                  onClick={handleLogoClick}
                  className="flex items-center gap-2 text-base font-black tracking-tight"
                >
                  <div className="relative w-8 h-7 rounded-lg bg-slate-900 border-2 border-cyan-500/60 flex flex-col items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
                    <div className="flex items-center justify-center w-full h-full pt-0.5">
                      <svg
                        className="w-3 h-3 text-cyan-400"
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
                    <div className="absolute -bottom-1 w-2 h-1 bg-cyan-600 rounded-b"></div>
                  </div>
                  <div className="flex items-center tracking-normal ml-0.5">
                    <span className="text-white font-extrabold text-sm tracking-wide">
                      Key
                    </span>
                    <span className="text-cyan-400 font-extrabold text-sm ml-0.5">
                      Shop
                    </span>
                    <span className="text-[7px] font-bold px-1 py-0.2 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/35 uppercase tracking-tighter ml-1">
                      BD
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* সার্চ ইনপুট এবং আপনার উইন্ডোজ প্রোডাক্টের ড্রপডাউন */}
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search Windows products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl py-2.5 pl-3 pr-9 outline-none focus:border-cyan-500 shadow-inner transition-colors"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearchQuery("");
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                {/* আপনার আসল প্রোডাক্টগুলোর লিস্ট এখানে দেখাবে */}
                {isSearchFocused && (
                  <div className="mt-3 bg-slate-950 border border-slate-800 rounded-2xl p-3 shadow-2xl space-y-3 animate-in fade-in duration-150">
                    {/* Popular Searches */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                        <TrendingUp className="w-3 h-3 text-cyan-400" />
                        <span>Popular Searches</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {popularSearches.map((tag, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSelectProduct(tag);
                            }}
                            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-300 text-[11px] px-2.5 py-1 rounded-full transition active:scale-95 cursor-pointer"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Windows Products List */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>
                          {searchQuery
                            ? "Search Results"
                            : "Available Products"}
                        </span>
                      </div>

                      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((prod) => (
                            <div
                              key={prod.id}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelectProduct(prod.name);
                              }}
                              className="bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-800/80 p-2 rounded-xl flex items-center justify-between cursor-pointer transition group active:scale-[0.98]"
                            >
                              <div className="flex items-center gap-2.5 pointer-events-none">
                                {prod.image ? (
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="w-9 h-9 object-cover rounded-lg border border-slate-700 shrink-0"
                                  />
                                ) : (
                                  <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0">
                                    WIN
                                  </div>
                                )}
                                <div>
                                  <h4 className="text-white font-semibold text-xs group-hover:text-cyan-400 transition line-clamp-1">
                                    {prod.name}
                                  </h4>
                                  <span className="text-[10px] text-emerald-400 font-bold">
                                    ৳{prod.price}
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition shrink-0 pointer-events-none" />
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-xs text-slate-500 py-3">
                            No products found
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <nav className="flex flex-col gap-2 text-sm font-medium pt-1">
                <Link
                  to="/"
                  onClick={handleLogoClick}
                  className="px-3 py-2.5 rounded-xl bg-slate-800/50 hover:bg-cyan-500/10 hover:text-cyan-400 border border-transparent hover:border-cyan-500/30 transition-all flex items-center justify-between"
                >
                  <span>{t("home") || "Home"}</span>
                  <span className="text-xs text-slate-500">→</span>
                </Link>
              </nav>
            </div>

            <div className="pt-3 border-t border-slate-800 text-center">
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
