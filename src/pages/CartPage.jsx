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
  MessageCircle,
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
      ? "Hello! I need some help regarding checkout, product selection, and payment on KeyShop BD."
      : "হ্যালো! কি-শপ বিডি (KeyShop BD) থেকে আমার কোন উইন্ডোজ কি বা প্রোডাক্টটি নেওয়া উচিত এবং চেকআউট ও পেমেন্ট নিয়ে আমার কিছু সহায়তা প্রয়োজন।",
  );

  if (orderConfirmed) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-slate-800/60 border border-slate-700 rounded-2xl text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-white">
          {language === "English" ? "Order Successful!" : "অর্ডার সফল হয়েছে!"}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {language === "English"
            ? "After verifying your payment, the license key will be sent via email and SMS within 5-10 minutes."
            : "আপনার পেমেন্ট ভেরিফাই করে আগামী ৫-১০ মিনিটের মধ্যে ইমেইল ও এসএমএস-এর মাধ্যমে লাইসেন্স কি পাঠিয়ে দেওয়া হবে।"}
        </p>
        <Link
          to="/"
          onClick={() => setOrderConfirmed(false)}
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition mt-4"
        >
          {language === "English" ? "Shop More" : "আরও শপিং করুন"}
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="w-16 h-16 text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          {language === "English" ? "Your Cart is Empty!" : "আপনার কার্ট খালি!"}
        </h2>
        <p className="text-slate-400 mb-6 text-sm">
          {language === "English"
            ? "No Windows products have been added to the cart."
            : "কার্টে কোনো উইন্ডোজ প্রোডাক্ট যোগ করা হয়নি।"}
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition flex items-center gap-2"
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
    <div id="shopping-cart-section" className="max-w-4xl mx-auto px-4 py-10">
      {/* হেডার ডিজাইন ও প্রফেশনাল টাইটেল */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {language === "English"
              ? "Review Your Digital License"
              : "আপনার ডিজিটাল লাইসেন্স কার্ট"}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === "English"
              ? "Instant delivery genuine product keys"
              : "ইন্সট্যান্ট ডেলিভারি জেনুইন প্রোডাক্ট কি"}
          </p>
        </div>
        <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full">
          {cart.length} {language === "English" ? "Item(s)" : "টি আইটেম"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* প্রোডাক্ট কার্ড লিস্ট */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  {/* উইন্ডোজ লোগো আইকন */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                    <svg
                      className="w-6 h-6"
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
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="text-[11px] font-medium text-blue-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                        {item.versionName || "Digital License Key"}
                      </span>
                      <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Instant Delivery
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                      Price
                    </span>
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 text-lg sm:text-xl font-mono">
                      ৳{item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-400 bg-slate-800/60 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/30 rounded-xl transition cursor-pointer active:scale-95 shadow-sm"
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
        </div>

        <div>
          {/* Order Summary Card */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl text-slate-100">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3">
              {language === "English" ? "Order Summary" : "অর্ডার সামারি"}
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {language === "English" ? "Total Items:" : "মোট আইটেম:"}
                </span>
                <span className="font-semibold text-white">
                  {cart.length} {language === "English" ? "Item(s)" : "টি"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {language === "English"
                    ? "Delivery Charge:"
                    : "ডেলিভারি চার্জ:"}
                </span>
                <span className="text-emerald-400 font-semibold">
                  {language === "English"
                    ? "Free (Instant)"
                    : "ফ্রি (ইন্সট্যান্ট)"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 mt-2 shadow-inner">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {language === "English" ? "Grand Total:" : "সর্বমোট:"}
              </span>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
                ৳{totalPrice}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 py-1 text-[11px] text-slate-400">
              <span>
                {language === "English"
                  ? "Secured Payment via:"
                  : "সিকিউরড পেমেন্ট মাধ্যম:"}
              </span>
              <span className="text-pink-400 font-bold">bKash</span> •
              <span className="text-orange-400 font-bold">Nagad</span> •
              <span className="text-purple-400 font-bold">Rocket</span>
            </div>

            <div className="space-y-3 pt-1">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                {language === "English"
                  ? "Proceed to Checkout (bKash/Nagad/Rocket)"
                  : "অর্ডার করুন (bKash/Nagad/Rocket)"}
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${supportMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-slate-900/60 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 font-semibold text-xs sm:text-sm tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>
                  {language === "English"
                    ? "Chat on WhatsApp for Help"
                    : "সরাসরি WhatsApp-এ চ্যাট করুন"}
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
