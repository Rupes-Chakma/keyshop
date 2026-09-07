import React from "react";
import {
  ShieldCheck,
  PhoneCall,
  Mail,
  Zap,
  Lock,
  Sparkles,
  Heart,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  // লোগো বা ব্র্যান্ড নোমে ক্লিক করলে স্মুথলি একদম উপরে স্ক্রল করার ফাংশন
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappNumber = "8801648582639";
  const supportMessage = encodeURIComponent(
    language === "English"
      ? "Hello! I want to know more about KeyShop BD products or need help."
      : "হ্যালো! আমি KeyShop BD এর প্রোডাক্ট সম্পর্কে জানতে চাই অথবা সাহায্য প্রয়োজন।",
  );

  return (
    <footer className="bg-slate-950 text-gray-300 relative overflow-hidden border-t border-slate-800/80 mt-16">
      {/* Top Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-12 border-b border-slate-800/60">
          {/* Column 1: Brand Info with Animated Monitor Logo */}
          <div className="flex flex-col items-start space-y-4">
            <div
              onClick={handleScrollTop}
              className="group flex items-center gap-2.5 cursor-pointer"
            >
              {/* Outer Computer Monitor Frame with Vivid Cyan/Blue Glow */}
              <div className="relative w-9 h-8 sm:w-10 sm:h-9 rounded-xl bg-slate-900 border-2 border-cyan-500/60 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:border-cyan-400 group-hover:shadow-cyan-400/40 group-hover:scale-105 transition-all duration-300 ease-out shrink-0">
                {/* Screen Inner Area containing the Key Shape */}
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

                {/* Tiny Computer Stand/Base at the bottom */}
                <div className="absolute -bottom-1 w-2.5 sm:w-3 h-1 bg-cyan-600 rounded-b group-hover:bg-cyan-400 transition-colors"></div>
              </div>

              {/* Typography */}
              <div className="flex items-center tracking-normal ml-0.5">
                <span className="text-white font-extrabold tracking-wide text-xl">
                  Key
                </span>
                <span className="text-cyan-400 font-extrabold text-xl">
                  Shop
                </span>
                <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/35 uppercase tracking-tighter shadow-sm">
                  BD
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              {language === "English"
                ? "We provide 100% original and genuine Windows product keys with lifetime activation and 1-to-1 instant trusted support."
                : "আমরা প্রদান করি ১০০% অরিজিনাল ও জেনুইন উইন্ডোজ প্রোডাক্ট কি। লাইফটাইম অ্যাক্টিভেশন ও ১-টু-১ ইনস্ট্যান্ট সাপোর্টের বিশ্বস্ত মাধ্যম।"}
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-xl font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {language === "English"
                  ? "Trusted Digital Software Store"
                  : "বিশ্বস্ত ডিজিটাল সফটওয়্যার স্টোর"}
              </span>
            </div>
          </div>

          {/* Column 2: Why Choose Us */}
          <div className="flex flex-col items-start space-y-4">
            <h4 className="text-white font-bold text-lg tracking-wide relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              {language === "English"
                ? "Why Choose Us?"
                : "কেন আমাদের বেছে নেবেন?"}
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 w-full">
              <li className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2.5 rounded-xl hover:border-blue-500/40 transition-colors">
                <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                <span>
                  {language === "English"
                    ? "100% Original License Key"
                    : "১০০% অরিজিনাল লাইসেন্স কি"}
                </span>
              </li>
              <li className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2.5 rounded-xl hover:border-blue-500/40 transition-colors">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {language === "English"
                    ? "Instant Email & SMS Delivery"
                    : "ইনস্ট্যান্ট ইমেইল ও এসএমএস ডেলিভারি"}
                </span>
              </li>
              <li className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2.5 rounded-xl hover:border-blue-500/40 transition-colors">
                <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  {language === "English"
                    ? "Secure Payment via bKash/Nagad"
                    : "বিকাশ/নগদে নিরাপদ পেমেন্ট"}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & WhatsApp */}
          <div className="flex flex-col items-start space-y-4">
            <h4 className="text-white font-bold text-lg tracking-wide relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              {language === "English" ? "Contact Us" : "যোগাযোগ ও হেল্প"}
            </h4>
            <p className="text-gray-400 text-sm">
              {language === "English"
                ? "Have any questions? Feel free to reach out to us anytime."
                : "যেকোনো প্রয়োজনে সরাসরি হোয়াটসঅ্যাপে বা ফোনে যোগাযোগ করুন।"}
            </p>
            <div className="space-y-3 w-full text-sm">
              {/* Phone Call Link */}
              <a
                href="tel:+8801835187894"
                className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 hover:border-blue-500 p-3 rounded-xl transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <span className="text-white font-medium tracking-wider">
                  +880 1835187894
                </span>
              </a>

              {/* WhatsApp Direct Chat Link */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${supportMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 hover:border-[#25D366] p-3 rounded-xl transition-all group shadow-md"
              >
                <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">
                    WhatsApp Chat
                  </span>
                  <span className="text-white font-medium tracking-wider">
                    +880 1648582639
                  </span>
                </div>
              </a>

              {/* Email Link */}
              <a
                href="mailto:support@keyshopbd.com"
                className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 hover:border-blue-500 p-3 rounded-xl transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-gray-300 font-medium text-xs sm:text-sm">
                  support@keyshopbd.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} KeyShopbd.{" "}
            {language === "English"
              ? "All rights reserved."
              : "সর্বস্বত্ব সংরক্ষিত।"}
          </p>
          <p className="flex items-center gap-1.5 text-gray-400">
            {language === "English" ? "Crafted with" : "তৈরি করা হয়েছে"}{" "}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />{" "}
            {language === "English"
              ? "for better experience"
              : "সেরা অভিজ্ঞতার জন্য"}
          </p>
        </div>
      </div>
    </footer>
  );
}
