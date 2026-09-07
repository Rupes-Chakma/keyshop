import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import CheckoutModal from "../components/cart/CheckoutModal";
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
} from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } =
    useContext(CartContext);
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // পেজ লোড হওয়ার সাথে সাথে যেন স্ক্রোল একদম ওপর থেকে শুরু হয়
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleConfirmOrder = (paymentData) => {
    const myWhatsAppNumber = "8801648582639";

    const now = new Date();
    const formattedDateTime = now.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const itemsList = cart
      .map(
        (item, index) =>
          `🔹 *Product [${index + 1}]:* ${item.name}%0A` +
          `    ▫️ *Edition/Key Type:* ${item.versionName || "Standard Windows Key"}%0A` +
          `    ▫️ *Price:* BDT ${item.price}`,
      )
      .join("%0A%0A");

    let customerInfoLines = [];
    if (paymentData.contact) {
      customerInfoLines.push(`• Contact / Phone: ${paymentData.contact}`);
    }
    if (paymentData.email) {
      customerInfoLines.push(`• Email Address: ${paymentData.email}`);
    }

    const customerInfoFormatted =
      customerInfoLines.length > 0
        ? customerInfoLines.join("%0A")
        : `• Contact / Email: N/A`;

    const message =
      `🛒 *NEW LICENSE KEY ORDER - KeyShop BD* %0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A%0A` +
      `👤 *CUSTOMER DETAILS:*%0A` +
      `${customerInfoFormatted}%0A%0A` +
      `💳 *PAYMENT INFORMATION:*%0A` +
      `• Method: ${paymentData.method}%0A` +
      `• Sender Number: ${paymentData.sender}%0A` +
      `• Transaction ID: ${paymentData.trx || "N/A"}%0A` +
      `• Paid Amount: BDT ${paymentData.amount}%0A%0A` +
      `📦 *ORDERED ITEMS (${cart.length} Item${cart.length > 1 ? "s" : ""}):*%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `${itemsList}%0A%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `⚡ *Status:* Pending Verification%0A` +
      `🕒 *Order Time:* ${formattedDateTime}`;

    const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    setIsModalOpen(false);
    clearCart();
    setOrderConfirmed(true);
  };

  const whatsappNumber = "8801648582639";
  const supportMessage = encodeURIComponent(
    language === "English"
      ? "Hello! I want to order directly or speak with a representative regarding KeyShop BD products."
      : "হ্যালো! আমি সরাসরি অর্ডার করতে চাই অথবা প্রতিনিধির সাথে কথা বলতে চাই।",
  );

  if (orderConfirmed) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 bg-slate-900/90 border border-slate-700/80 rounded-3xl text-center space-y-6 shadow-2xl backdrop-blur-2xl">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">
            {language === "English"
              ? "Order Successful!"
              : "অর্ডার সফল হয়েছে!"}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {language === "English"
              ? "After verifying your payment, the license key will be sent via email and SMS within 5-10 minutes."
              : "আপনার পেমেন্ট ভেরিফাই করে আগামী ৫-১০ মিনিটের মধ্যে ইমেইল ও এসএমএস-এর মাধ্যমে লাইসেন্স কি পাঠিয়ে দেওয়া হবে।"}
          </p>
        </div>
        <Link
          to="/"
          onClick={() => setOrderConfirmed(false)}
          className="inline-block w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition shadow-lg shadow-blue-600/30 active:scale-[0.98]"
        >
          {language === "English" ? "Shop More" : "আরও শপিং করুন"}
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-slate-900/80 border border-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-inner relative group">
          <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-xl"></div>
          <ShoppingBag className="w-12 h-12 text-slate-500 relative z-10" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">
          {language === "English"
            ? "Your Cart is Empty!"
            : "আপনার কার্ট একদম খালি!"}
        </h2>
        <p className="text-slate-400 mb-8 text-sm max-w-sm leading-relaxed">
          {language === "English"
            ? "No Windows products have been added to the cart yet. Explore our store!"
            : "আপনার কার্টে কোনো উইন্ডোজ প্রোডাক্ট যুক্ত করা হয়নি। আমাদের কালেকশন থেকে পছন্দমতো কি বেছে নিন।"}
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-2xl transition flex items-center gap-2.5 shadow-xl shadow-blue-600/25 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />{" "}
          {language === "English"
            ? "View Product Catalog"
            : "প্রোডাক্ট ক্যাটালগ দেখুন"}
        </Link>
      </div>
    );
  }

  return (
    <div
      id="shopping-cart-section"
      className="max-w-5xl mx-auto px-4 py-12 relative overflow-hidden"
    >
      {/* ব্যাকগ্রাউন্ড গ্লো ডিজাইন */}
      <div className="absolute top-10 left-1/3 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80 relative z-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            {language === "English"
              ? "Review Your Digital License"
              : "আপনার ডিজিটাল লাইসেন্স কার্ট"}
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-blue-400 fill-current" />
            {language === "English"
              ? "Instant delivery genuine product keys"
              : "নিরাপদ লেনদেন ও ইন্সট্যান্ট অটোম্যাটিক ডেলিভারি"}
          </p>
        </div>
        <div className="self-start sm:self-auto bg-slate-900/90 border border-slate-800 text-blue-400 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-inner flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
          {cart.length}{" "}
          {language === "English"
            ? "Item(s) Selected"
            : "টি প্রোডাক্ট সিলেক্টেড"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* প্রোডাক্ট কার্ড লিস্ট */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 hover:border-blue-500/40 rounded-3xl p-5 transition-all duration-300 shadow-xl overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 88 88"
                      fill="currentColor"
                    >
                      <path d="M0 12.402l35.687-4.86V41.51H0V12.402zm35.687 34.088l-.001 30.075L0 71.977V46.49h35.686zM41.51 6.84L88 0v41.51H41.51V6.84zm46.49 44.67L41.51 46.49v34.673L88 88V51.51z" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-tight leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[11px] font-semibold text-blue-300 bg-blue-500/15 px-3 py-0.5 rounded-full border border-blue-500/20">
                        {item.versionName || "Digital License Key"}
                      </span>
                      <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Instant Delivery
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                      Price
                    </span>
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 text-lg sm:text-xl font-mono">
                      ৳{item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-400 bg-slate-800/80 hover:bg-red-500/10 border border-slate-700/80 hover:border-red-500/30 rounded-2xl transition cursor-pointer active:scale-95 shadow-sm"
                    title={
                      language === "English" ? "Remove item" : "রিমুভ করুন"
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ট্রাস্ট গ্যারান্টি বক্স */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-5 flex items-center gap-4 text-slate-300 text-xs shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-white text-sm">
                {language === "English"
                  ? "100% Genuine Guarantee"
                  : "১০০% জেনুইন লাইসেন্স গ্যারান্টি"}
              </h4>
              <p className="text-slate-400 text-xs">
                {language === "English"
                  ? "Full support available during software installation & activation."
                  : "ইনস্টল ও অ্যাক্টিভেশন সংক্রান্ত যেকোনো সমস্যায় আমাদের ডেডিকেটেড সাপোর্ট টিম সবসময় সাথে আছে।"}
              </p>
            </div>
          </div>
        </div>

        {/* ডান পাশের অর্ডার সামারি বক্স */}
        <div>
          <div className="bg-slate-900/85 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl text-slate-100 relative">
            {/* কর্নার গ্লো */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>
                {language === "English" ? "Order Summary" : "অর্ডার সামারি"}
              </span>
              <span className="text-blue-400 font-mono bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
                {cart.length} Items
              </span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {language === "English" ? "Subtotal:" : "সাবটোটাল:"}
                </span>
                <span className="font-semibold text-white font-mono">
                  ৳{totalPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {language === "English"
                    ? "Delivery Charge:"
                    : "ডেলিভারি চার্জ:"}
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {language === "English"
                    ? "Free (Instant)"
                    : "ফ্রি (ইন্সট্যান্ট)"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-950/90 border border-slate-800/80 rounded-2xl p-4 shadow-inner">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {language === "English" ? "Grand Total:" : "সর্বমোট:"}
              </span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 font-mono">
                ৳{totalPrice}
              </span>
            </div>

            {/* পেমেন্ট গেটওয়ে ব্যাজ */}
            <div className="text-center py-1">
              <p className="text-[11px] text-slate-400 mb-2 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                {language === "English"
                  ? "Secured Payment via:"
                  : "সিকিউরড পেমেন্ট মাধ্যম:"}
              </p>
              <div className="flex items-center justify-center gap-2 font-bold text-xs">
                <span className="bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-xl border border-pink-500/20 shadow-sm">
                  bKash
                </span>
                <span className="bg-orange-500/10 text-orange-400 px-3 py-1.5 rounded-xl border border-orange-500/20 shadow-sm">
                  Nagad
                </span>
                <span className="bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-xl border border-purple-500/20 shadow-sm">
                  Rocket
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {/* মেইন চেকআউট বাটন */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm tracking-wide rounded-2xl shadow-xl shadow-blue-600/30 transition-all transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {language === "English"
                    ? "Proceed to Checkout"
                    : "অর্ডার কনফার্ম করুন"}
                </span>
                <span className="text-xs font-normal opacity-80">
                  (bKash/Nagad)
                </span>
              </button>

              {/* হোয়াটসঅ্যাপ অর্ডার ও হেল্প বাটন */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${supportMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs sm:text-sm tracking-wide rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 relative overflow-hidden group cursor-pointer active:scale-[0.99]"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Official WhatsApp Logo SVG */}
                <svg
                  className="w-5 h-5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>
                  {language === "English"
                    ? "Chat on WhatsApp for Help"
                    : "সরাসরি অর্ডার করতে মেসেজ করুন বা প্রতিনিধির সাথে কথা বলুন"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount={totalPrice}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
