import React, { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "8801648582639";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("হ্যালো! আমি উইন্ডোজ লাইসেন্স কি সম্পর্কে জানতে চাই।")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Premium Tooltip text box */}
      {!isOpen && (
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-100 text-xs px-4 py-2.5 rounded-2xl shadow-2xl shadow-black/50 animate-bounce whitespace-nowrap flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-slate-200">
            Need any help? Let's chat!
          </span>
        </div>
      )}

      {isOpen && (
        <div className="mb-2 bg-slate-900 border border-slate-700/80 w-80 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Premium Header Design with KeyShop BD */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center border-b border-blue-500/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center font-bold text-lg shadow-inner border border-white/20">
                  K
                </div>
                {/* Glowing Active Status Dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-blue-600 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide">
                  KeyShop BD সাপোর্ট
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <p className="text-[11px] text-blue-100 font-medium">
                    Active Now (24/7)
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1.5 rounded-xl transition text-blue-100 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-slate-950/60 space-y-3">
            <div className="bg-slate-800/80 border border-slate-700/60 text-slate-200 text-sm p-3.5 rounded-2xl rounded-tl-none max-w-[90%] leading-relaxed shadow-sm">
              স্বাগতম! কোনো প্রশ্ন বা সাহায্যের প্রয়োজন হলে নিচে ক্লিক করে
              সরাসরি আমাদের সাথে হোয়াটসঅ্যাপ বা কলে যোগাযোগ করুন। 🚀
            </div>
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2.5">
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-sm transition-all duration-200 shadow-lg shadow-emerald-600/25 active:scale-[0.98]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp-এ চ্যাট করুন</span>
            </a>

            {/* Direct Call Button */}
            <a
              href={`tel:+${phoneNumber}`}
              className="w-full bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition border border-slate-700/80 active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>সরাসরি কল দিন: +880 1648-582639</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-4 rounded-full shadow-2xl shadow-blue-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
        aria-label="Live Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute right-0 top-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
