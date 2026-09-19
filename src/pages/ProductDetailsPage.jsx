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
import { windowsData } from "../data/windowsData";
import CheckoutModal from "../components/cart/CheckoutModal";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { language } = useLanguage();

  const [product, setProduct] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    const foundProduct = windowsData.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(windowsData[0]);
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

  if (!currentOption) {
    return (
      <div className="text-center py-20 text-white font-bold">
        No product option available.
      </div>
    );
  }

  const totalPrice = Number(currentOption.price);

  // Selected edition image
  const currentImage = currentOption.image || product.image;

  const handleOpenCheckout = () => {
    try {
      addToCart({
        id: currentOption.id,
        name: currentOption.name,
        versionName: product.versionName,
        type: currentOption.type,
        price: currentOption.price,
        image: currentImage,
        quantity: 1,
      });

      setIsCheckoutOpen(true);
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  const handlePaymentConfirm = (paymentData) => {
    console.log("Payment Confirmed Successfully:", paymentData);
    setIsCheckoutOpen(false);
    alert("Order placed successfully! We will deliver your key soon.");
    navigate("/");
  };

  const handleWhatsAppChat = () => {
    const phoneNumber = "8801648582639";

    const message = encodeURIComponent(
      `Hi, I want to buy: ${product.versionName} - ${currentOption.name} (${currentOption.type}) - Price: ৳${totalPrice}`,
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-100 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left */}
        <div className="lg:col-span-7 space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/90 border border-slate-700 px-3.5 py-2 rounded-xl transition-all hover:border-blue-500/50 cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Back to Products</span>
          </button>

          <div className="bg-slate-900/95 border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-6 backdrop-blur-xl">
            {/* Product Header */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 p-6 sm:p-8 border border-blue-500/20 shadow-2xl flex flex-col items-center text-center space-y-4">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-blue-500/15 blur-[60px] rounded-full pointer-events-none"></div>

              {/* Dynamic Product Image */}
              {currentImage && (
                <div className="relative group z-10 w-full max-w-[280px] h-[160px] rounded-2xl overflow-hidden shadow-2xl border border-blue-400/30 bg-slate-950 mb-1 ring-2 ring-blue-500/20 transition-all duration-300">
                  <img
                    key={currentImage}
                    src={currentImage}
                    alt={currentOption.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
              )}

              {/* Badges */}
              <div className="relative z-10 flex items-center justify-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] font-black uppercase bg-blue-600/30 text-blue-200 px-4 py-1 rounded-full border border-blue-400/40 shadow-md backdrop-blur-md tracking-wider">
                  {product.versionName}
                </span>

                <div className="flex items-center gap-1.5 text-emerald-200 text-[11px] font-bold bg-emerald-600/25 px-3.5 py-1 rounded-full border border-emerald-400/30 shadow-md backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Genuine Key</span>
                </div>
              </div>

              {/* Dynamic Title */}
              <h1 className="relative z-10 text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                {currentOption.name}
              </h1>

              {/* Dynamic Type */}
              <div className="relative z-10 bg-slate-900/90 border border-slate-700/80 px-4 py-1.5 rounded-xl shadow-inner">
                <p className="text-xs text-slate-200 font-medium">
                  Type:{" "}
                  <span className="text-blue-400 font-bold">
                    {currentOption.type}
                  </span>
                </p>
              </div>
            </div>

            {/* Guarantee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 bg-slate-950/70 p-4 rounded-xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lifetime activation with official updates</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Customer support & installation guide</span>
              </div>
            </div>

            {/* Editions */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-300 font-bold uppercase tracking-wider px-1">
                <span>Select Edition / Plan</span>

                <span className="text-blue-400">
                  {options.length} Options Available
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {options.map((opt, index) => (
                  <label
                    key={opt.id || index}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedOptionIndex === index
                        ? "bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/60"
                        : "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50"
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

                        <span className="text-[11px] text-slate-300">
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
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 backdrop-blur-xl">
            <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>

              <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-500/30">
                Instant Delivery
              </span>
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 shadow-inner">
              <div className="flex justify-between items-start text-sm">
                <span className="font-semibold text-white line-clamp-1">
                  {currentOption.name}
                </span>

                <span className="font-mono font-bold text-blue-400">
                  ৳{totalPrice}
                </span>
              </div>

              <div className="text-xs text-slate-300 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentOption.type}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal:</span>

                <span className="font-mono font-bold text-white">
                  ৳{totalPrice}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Delivery Charge:</span>

                <span className="text-emerald-400 font-bold text-xs bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
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

            <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Secured Payment via:</span>
              </div>

              <div className="flex items-center justify-center gap-2 font-bold text-xs">
                <span className="px-2.5 py-1 bg-pink-600/20 text-pink-300 border border-pink-500/40 rounded shadow-sm">
                  bKash
                </span>

                <span className="px-2.5 py-1 bg-orange-600/20 text-orange-300 border border-orange-500/40 rounded shadow-sm">
                  Nagad
                </span>

                <span className="px-2.5 py-1 bg-purple-600/20 text-purple-300 border border-purple-500/40 rounded shadow-sm">
                  Rocket
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleOpenCheckout}
                className="w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 active:scale-[0.98] cursor-pointer text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Proceed to Checkout (bKash/Nagad)</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppChat}
                className="w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 active:scale-[0.98] cursor-pointer text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp for Help</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={totalPrice}
        onConfirm={handlePaymentConfirm}
      />
    </div>
  );
}
