import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function ProductActionCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const navigate = useNavigate();

  // আপনার WhatsApp নাম্বার (কান্ট্রি কোড সহ)
  const whatsappNumber = "8801648582639";

  // প্রোডাক্ট বা এডিশন ডেটা হ্যান্ডেল করার সেফটি চেক
  const productName =
    product?.name || product?.versionName || "Digital Software Key";
  const productPrice = product?.price || "1490";
  const categoryLabel =
    product?.categoryName || product?.type || "Software License";

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
    <div className="group relative bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 backdrop-blur-xl border border-slate-800/80 hover:border-blue-500/60 rounded-2xl p-4 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between transition-all duration-300 overflow-hidden w-full">
      {/* ব্যাকগ্রাউন্ড প্রিমিয়াম গ্লো ইফেক্ট */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all pointer-events-none"></div>

      <div>
        {/* টপ সেকশন: ক্যাটাগরি ট্যাগ এবং জেনুইন স্ট্যাম্প */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300 bg-blue-500/15 border border-blue-500/30 px-2.5 py-0.5 rounded-md shadow-sm">
            {categoryLabel}
          </span>

          <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>100% Genuine</span>
          </div>
        </div>

        {/* প্রোডাক্ট থাম্বনেইল বা ব্যানার এরিয়া (স্ক্রিনশটের মতো স্টাইল) */}
        <div className="relative rounded-xl overflow-hidden mb-3.5 bg-slate-950 aspect-video border border-slate-800 flex items-center justify-center group-hover:border-blue-500/40 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-lg sm:text-xl font-black text-white tracking-wide text-center px-2 relative z-10 line-clamp-1">
            {productName}
          </span>
        </div>

        {/* প্রোডাক্টের নাম */}
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
          {productName}
        </h3>

        {/* প্রাইস এবং স্টক সেকশন */}
        <div className="mb-4 flex items-center justify-between bg-slate-950/60 px-3 py-2.5 rounded-xl border border-slate-800/80 shadow-inner">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-white font-mono tracking-tight">
              ৳{productPrice}
            </span>
            <span className="text-slate-400 text-[10px] font-medium">
              / লাইফটাইম
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
            In Stock
          </span>
        </div>
      </div>

      {/* অ্যাকশন বাটনসমূহ (View Plans / Quick Order) */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 active:scale-[0.98] cursor-pointer text-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>View Plans / Quick Order</span>
        </button>

        <button
          onClick={handleWhatsAppOrder}
          className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-medium text-[11px] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>Order via WhatsApp</span>
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
              <span className="text-blue-400 font-semibold">{productName}</span>
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
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
