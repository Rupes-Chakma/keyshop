import React, { useState } from "react";
import { MessageCircle, ShoppingBag, ShieldCheck } from "lucide-react";

export default function ProductActionCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // আপনার WhatsApp নাম্বার (কান্ট্রি কোড সহ)
  const whatsappNumber = "8801648582639";
  const productName = product?.name || "Digital Software Key";
  const productPrice = product?.price || "499";

  const whatsappMessage = encodeURIComponent(
    `Hello! I want to buy "${productName}" (Price: ৳${productPrice}). Please guide me.`,
  );

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank",
    );
  };

  const handleInstantOrder = (e) => {
    e.preventDefault();
    if (!userName || !userPhone) {
      alert("দয়া করে আপনার নাম এবং মোবাইল নম্বর দিন।");
      return;
    }
    alert(
      `ধন্যবাদ ${userName}! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।`,
    );
    setShowModal(false);
    setUserName("");
    setUserPhone("");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-3 sm:p-5 shadow-xl flex flex-col justify-between transition-all duration-300 w-full">
      {/* Product Info */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          {/* উইন্ডোজ লোগো ও ক্যাটাগরি */}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 88 88"
                fill="currentColor"
              >
                <path d="M0 12.402l35.687-4.86V41.51H0V12.402zm35.687 34.088l-.001 30.075L0 71.977V46.49h35.686zM41.51 6.84L88 0v41.51H41.51V6.84zm46.49 44.67L41.51 46.49v34.673L88 88V51.51z" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-[11px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-semibold line-clamp-1">
              {product?.categoryName || product?.type || "License"}
            </span>
          </div>

          <span className="text-green-400 text-[10px] sm:text-[11px] flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Instant
          </span>
        </div>

        <h3 className="text-sm sm:text-lg font-bold text-white mb-1.5 leading-snug line-clamp-1">
          {productName}
        </h3>

        <div className="text-lg sm:text-2xl font-extrabold text-cyan-400 mb-3 flex items-baseline gap-1.5">
          ৳{productPrice}
          <span className="text-[11px] sm:text-xs text-slate-400 font-normal line-through">
            ৳1,500
          </span>
        </div>
      </div>

      {/* Dual Action Buttons */}
      <div className="space-y-2 pt-3 border-t border-slate-800">
        {/* Instant Web Order Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 text-[11px] sm:text-sm active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Quick Order</span>
        </button>

        {/* Direct WhatsApp Order Button */}
        <button
          onClick={handleWhatsAppOrder}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 text-[11px] sm:text-sm active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
          <span>WhatsApp</span>
        </button>
      </div>

      {/* Responsive Modal for Instant Order */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 max-w-md w-full relative shadow-2xl">
            <h4 className="text-lg font-bold text-white mb-1">
              Quick Checkout
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Complete order for:{" "}
              <span className="text-cyan-400 font-semibold">{productName}</span>
            </p>

            <form onSubmit={handleInstantOrder} className="space-y-3 mb-5">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  Your Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  Phone Number (bKash/Nagad)
                </label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Confirm Order
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
