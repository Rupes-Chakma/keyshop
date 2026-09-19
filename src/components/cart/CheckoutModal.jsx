import React, { useState } from "react";
import {
  X,
  Copy,
  QrCode,
  AlertCircle,
  ShieldCheck,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function CheckoutModal({
  isOpen,
  onClose,
  totalAmount = 0,
  onConfirm,
}) {
  const { t } = useLanguage();

  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [contactInfo, setContactInfo] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");

  // Validation errors
  const [contactError, setContactError] = useState("");
  const [senderError, setSenderError] = useState("");

  // Payment account numbers
  const paymentNumbers = {
    bKash: "01648582639",
    Nagad: "01648582639",
    Rocket: "01648582639",
  };

  // Payment QR code images
  const paymentQRs = {
    bKash: "/assets/bkash-qr.png",
    Nagad: "/assets/nagad-qr.png",
    Rocket: "/assets/rocket-qr.png",
  };

  if (!isOpen) return null;

  // Validate contact information
  const handleContactChange = (e) => {
    const value = e.target.value;
    setContactInfo(value);

    if (!value.trim()) {
      setContactError("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[3-9]\d{8}$/;

    if (/^\d/.test(value)) {
      if (value.length === 11 && !phoneRegex.test(value)) {
        setContactError("Please enter a valid 11-digit mobile number");
      } else {
        setContactError("");
      }
    } else {
      if (value.includes("@") && !emailRegex.test(value)) {
        setContactError("Please enter a valid email address");
      } else {
        setContactError("");
      }
    }
  };

  // Validate sender mobile number
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 11) {
      setSenderNumber(value);
      const bdPhoneRegex = /^01[3-9]\d{8}$/;

      if (value.length > 0 && value.length < 11) {
        setSenderError("Sender number must be 11 digits");
      } else if (value.length === 11 && !bdPhoneRegex.test(value)) {
        setSenderError("Please enter a valid BD operator number (013-019)");
      } else {
        setSenderError("");
      }
    }
  };

  // Clean and format transaction ID
  const handleTrxChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (value.length <= 12) {
      setTrxId(value);
    }
  };

  // Copy payment number to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentNumbers[paymentMethod]);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy payment number:", error);
    }
  };

  // Handle checkout form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setContactError("");
    setSenderError("");

    let hasError = false;

    if (!contactInfo.trim()) {
      setContactError("This field is required");
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^01[3-9]\d{8}$/;

      if (contactInfo.includes("@")) {
        if (!emailRegex.test(contactInfo)) {
          setContactError("Please enter a valid email address");
          hasError = true;
        }
      } else if (/^\d/.test(contactInfo)) {
        if (!phoneRegex.test(contactInfo)) {
          setContactError("Please enter a valid 11-digit mobile number");
          hasError = true;
        }
      }
    }

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(senderNumber)) {
      setSenderError("Please enter a valid 11-digit BD sender number");
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    const adminWhatsAppNumber = "8801648582639";
    const message =
      `*🛒 New Payment / Order Submission*\n\n` +
      `*Payment Method:* ${paymentMethod}\n` +
      `*Total Amount:* ৳${totalAmount}\n` +
      `*Sender Number:* ${senderNumber}\n` +
      `*TrxID:* ${trxId || "N/A"}\n` +
      `*Contact / WhatsApp:* ${contactInfo}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodedMessage}`;

    const paymentData = {
      method: paymentMethod,
      contact: contactInfo,
      sender: senderNumber,
      trx: trxId,
      amount: totalAmount,
    };

    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      if (onConfirm && typeof onConfirm === "function") {
        onConfirm(paymentData);
      }

      setContactInfo("");
      setSenderNumber("");
      setTrxId("");
      setContactError("");
      setSenderError("");
      setShowQR(false);
      onClose();
    } catch (error) {
      console.error("Checkout submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">
                {t ? t("secureCheckout") : "Secure Checkout"}
              </h3>
              <p className="text-xs text-slate-400">
                {t
                  ? t("completePaymentSecurely")
                  : "Pay securely via bKash, Nagad or Rocket"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Total Price Banner */}
        <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800/90 rounded-xl p-3.5 mb-4 shadow-inner">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {t ? t("totalPayableAmount") : "Total Payable Amount"}
            </span>
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mt-0.5 font-mono">
              ৳{totalAmount}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[11px] font-semibold">
              Instant WhatsApp Checkout
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Payment Method Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. {t ? t("selectPaymentMethod") : "Select Payment Method"}
            </label>

            <div className="grid grid-cols-3 gap-2">
              {["bKash", "Nagad", "Rocket"].map((method) => {
                const isActive = paymentMethod === method;

                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(method);
                      setShowQR(false);
                      setCopied(false);
                    }}
                    className={`py-2.5 px-2 rounded-xl font-bold text-xs tracking-wide border transition-all flex items-center justify-center cursor-pointer ${
                      isActive
                        ? method === "bKash"
                          ? "bg-pink-600 text-white border-pink-500 shadow-lg shadow-pink-600/30 ring-1 ring-pink-400"
                          : method === "Nagad"
                            ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-600/30 ring-1 ring-orange-400"
                            : "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30 ring-1 ring-purple-400"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Payment Account Number */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Send Money to this number
              </span>

              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                className="text-xs flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                {showQR ? "View Number" : "QR Code"}
              </button>
            </div>

            {showQR ? (
              <div className="flex flex-col items-center justify-center p-3 bg-slate-900/90 rounded-xl border border-slate-800 mt-1">
                <img
                  src={paymentQRs[paymentMethod]}
                  alt={`${paymentMethod} QR Code`}
                  className="w-32 h-32 object-contain rounded-lg bg-white p-1.5 shadow"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <p className="text-xs text-slate-400 mt-2">
                  Scan with {paymentMethod} app
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 mt-1">
                <span className="text-base font-bold tracking-wider text-amber-400 font-mono">
                  {paymentNumbers[paymentMethod]}
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-200 transition font-medium cursor-pointer active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>

          {/* 3. Payment Information */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              3. Provide Payment Information
            </label>

            <div>
              <input
                type="text"
                required
                value={contactInfo}
                onChange={handleContactChange}
                placeholder="Email Address or WhatsApp Number for Key Delivery"
                className={`w-full bg-slate-950/60 border rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                  contactError
                    ? "border-red-500/80 focus:border-red-500"
                    : "border-slate-800 focus:border-emerald-500"
                }`}
              />
              {contactError && (
                <p className="text-[11px] text-red-400 mt-1 ml-1">
                  {contactError}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={senderNumber}
                  onChange={handlePhoneChange}
                  maxLength={11}
                  inputMode="numeric"
                  placeholder="Sender Number (01XXXXXXXXX)"
                  className={`w-full bg-slate-950/60 border rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition font-mono ${
                    senderError
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-slate-800 focus:border-emerald-500"
                  }`}
                />
              </div>

              <div>
                <input
                  type="text"
                  value={trxId}
                  onChange={handleTrxChange}
                  maxLength={12}
                  placeholder="TrxID (Optional)"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition font-mono uppercase"
                />
              </div>
            </div>

            {senderError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{senderError}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Redirecting to WhatsApp...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Proceed to Checkout ({paymentMethod})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
