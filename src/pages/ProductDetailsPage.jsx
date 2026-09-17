import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
  Zap,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { CartContext } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { windowsData } from "../data/windowsData"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নেবেন
import CheckoutModal from "../components/cart/CheckoutModal"; // চেকআউট মোডাল ইমপোর্ট

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { language } = useLanguage();

  const [product, setProduct] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // মোডাল ওপেন/ক্লোজ স্টেট

  // প্রডাক্ট পেজে ঢোকার সাথে সাথে স্ক্রিন একদম উপরে নিয়ে যাওয়ার ফিক্স
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // স্মুথলি স্ক্রিন উপরে উঠবে
    });
  }, [id]);

  useEffect(() => {
    // URL থেকে id নিয়ে windowsData থেকে সঠিক প্রডাক্ট খুঁজে বের করা
    const foundProduct = windowsData.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(windowsData[0]); // ফলব্যাক হিসেবে প্রথম প্রডাক্ট
    }

    setSelectedOptionIndex(0);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 text-white font-bold">
        Loading Product...
      </div>
    );
  }

  const options = product.editions || [];
  const currentOption = options[selectedOptionIndex] || options[0];
  const totalPrice = Number(currentOption.price) * quantity;

  // Proceed to Checkout বাটনে ক্লিক করলে মোডাল ওপেন হবে এবং কার্টেও এড হয়ে থাকবে
  const handleOpenCheckout = () => {
    try {
      addToCart({
        id: currentOption.id,
        name: currentOption.name,
        versionName: product.versionName,
        type: currentOption.type,
        price: currentOption.price,
        quantity: quantity,
      });
      setIsCheckoutOpen(true); // মোডাল ওপেন করা
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  // মোডালে পেমেন্ট কনফার্ম করার পর যা হবে
  const handlePaymentConfirm = (paymentData) => {
    console.log("Payment Confirmed Successfully:", paymentData);
    setIsCheckoutOpen(false);
    alert("Order placed successfully! We will deliver your key soon.");
    navigate("/"); // সফলভাবে অর্ডার শেষে হোমপেজে পাঠিয়ে দেওয়া
  };

  const handleWhatsAppChat = () => {
    const phoneNumber = "8801648582639";
    const message = encodeURIComponent(
      `Hi, I want to buy: ${product.versionName} - ${currentOption.name} (${currentOption.type}) - Price: ৳${totalPrice}`,
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* বাম পাশ: ব্যাক বাটন, ডাইনামিক প্রডাক্ট টাইটেল এবং এডিশন লিস্ট */}
        <div className="lg:col-span-7 space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 px-3.5 py-2 rounded-xl transition-all hover:border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Back to Products</span>
          </button>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* প্রডাক্ট হেডার ব্যানার */}
            <div className="relative rounded-xl overflow-hidden bg-slate-950 p-6 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-transparent pointer-events-none"></div>

              <div className="space-y-2 relative z-10 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-extrabold uppercase bg-blue-500/15 text-blue-400 px-2.5 py-0.5 rounded-md border border-blue-500/35">
                    {product.versionName}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>100% Genuine Key</span>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {currentOption.name}
                </h1>

                <p className="text-xs text-blue-400 font-medium">
                  Type: {currentOption.type}
                </p>
              </div>

              {/* প্রডাক্ট লোগো বা আইকন */}
              <div className="relative z-15 w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-slate-900 border border-slate-700/60 rounded-xl flex items-center justify-center text-slate-500 text-xs text-center p-2 shadow-inner">
                <span className="text-[10px] font-medium text-slate-400">
                  {product.versionName}
                </span>
              </div>
            </div>

            {/* গ্যারান্টি বা নোট */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lifetime activation with official updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Customer support & installation guide</span>
              </div>
            </div>

            {/* এডিশন অপশনগুলো */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400 font-medium uppercase tracking-wider">
                <span>Select Edition / Plan</span>
                <span>{options.length} Options Available</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {options.map((opt, index) => (
                  <label
                    key={opt.id || index}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedOptionIndex === index
                        ? "bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="productOption"
                        checked={selectedOptionIndex === index}
                        onChange={() => setSelectedOptionIndex(index)}
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4 bg-slate-900 border-slate-700 cursor-pointer"
                      />
                      <div>
                        <span className="text-sm font-bold block text-white">
                          {opt.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {opt.type}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-black text-base text-blue-400">
                      ৳{opt.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* কোয়ান্টিটি */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-bold uppercase">
                Quantity
              </span>
              <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-5 py-1.5 text-sm font-bold font-mono text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ডান পাশ: অর্ডার সামারি */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                {quantity} {quantity > 1 ? "Items" : "Item"}
              </span>
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-start text-sm">
                <span className="font-semibold text-white line-clamp-1">
                  {currentOption.name}
                </span>
                <span className="font-mono font-bold text-blue-400">
                  ৳{totalPrice}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentOption.type}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal:</span>
                <span className="font-mono font-bold text-white">
                  ৳{totalPrice}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Delivery Charge:</span>
                <span className="text-emerald-400 font-medium text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Free (Instant)
                </span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                <span className="font-bold text-white text-base">
                  Grand Total:
                </span>
                <span className="text-xl font-black font-mono text-emerald-400">
                  ৳{totalPrice}
                </span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/60 text-center space-y-2">
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Secured Payment via:</span>
              </div>
              <div className="flex items-center justify-center gap-2 font-bold text-xs">
                <span className="px-2.5 py-1 bg-pink-600/20 text-pink-400 border border-pink-500/30 rounded">
                  bKash
                </span>
                <span className="px-2.5 py-1 bg-orange-600/20 text-orange-400 border border-orange-500/30 rounded">
                  Nagad
                </span>
                <span className="px-2.5 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded">
                  Rocket
                </span>
              </div>
            </div>

            {/* অ্যাকশন বাটনসমূহ */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleOpenCheckout}
                className="w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 active:scale-[0.98] cursor-pointer text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Proceed to Checkout (bKash/Nagad)</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppChat}
                className="w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 active:scale-[0.98] cursor-pointer text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp for Help</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* চেকআউট মোডাল কম্পোনেন্ট কল */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={totalPrice}
        onConfirm={handlePaymentConfirm}
      />
    </div>
  );
}
