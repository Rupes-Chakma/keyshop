import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Zap, ShoppingCart } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  const editions = product.editions || [];
  const minPrice =
    editions.length > 0
      ? Math.min(...editions.map((e) => e.price))
      : product.price || 499;

  const maxPrice =
    editions.length > 0
      ? Math.max(...editions.map((e) => e.price))
      : product.maxPrice || 1899;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();

    addToCart(product);

    toast.success("Successfully added to cart!", {
      style: {
        background: "#1e293b",
        color: "#fff",
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
      },
      iconTheme: {
        primary: "#3b82f6",
        secondary: "#fff",
      },
      duration: 3000,
    });
  };

  let displayName =
    product.versionName || product.name || "Microsoft 365 Official";
  displayName = displayName
    .replace(/Windows 11\s*-\s*Windows 11/gi, "Windows 11")
    .replace(/Windows 10\s*-\s*Windows 10/gi, "Windows 10")
    .replace(/Windows 7\s*-\s*Windows 7/gi, "Windows 7")
    .replace(/MS Office\s*-\s*Microsoft Office/gi, "Microsoft Office");

  return (
    <div
      onClick={handleCardClick}
      className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300 w-full flex flex-col justify-between cursor-pointer shadow-xl relative"
    >
      <div>
        {/* Image / Banner Container */}
        <div className="relative w-full h-32 sm:h-48 bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800/80">
          {product.image ? (
            <img
              src={product.image}
              alt={displayName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-3">
              <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full mb-1">
                {product.category || "KeyShop BD"}
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-inner">
                K
              </div>
            </div>
          )}

          {/* Top Left Official Badge */}
          <div className="absolute top-2 left-2">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-200 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 sm:py-1 rounded-md shadow-sm border border-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>Official</span>
            </span>
          </div>

          {/* Top Right Cart Icon Button */}
          <div className="absolute top-2 right-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleCartClick}
              className="w-8 h-8 bg-slate-900/90 hover:bg-blue-600 text-slate-200 hover:text-white rounded-full shadow-lg border border-slate-700 flex items-center justify-center transition-all duration-200 active:scale-95"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Title & Price Section */}
        <div className="p-3 sm:p-5 text-center">
          <h3 className="text-xs sm:text-base font-bold text-slate-100 tracking-wide mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {displayName}
          </h3>

          <div className="text-emerald-400 font-black text-xs sm:text-xl tracking-tight mb-2 sm:mb-4 font-mono">
            ৳{minPrice.toLocaleString()}{" "}
            {editions.length > 1 ? `- ৳${maxPrice.toLocaleString()}` : ""}
          </div>
        </div>
      </div>

      {/* Quick Order Button (Theme Matched: Blue/Indigo Gradient) */}
      <div className="p-2.5 sm:p-5 sm:pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="w-full py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm tracking-wide shadow-md shadow-blue-600/20 cursor-pointer active:scale-[0.98] group/btn"
        >
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300" />
          <span>Quick Order</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
