import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function ReviewSlider() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewsData = [
    {
      id: 1,
      name: "Rashedul Islam",
      product: "Windows 11 Pro",
      rating: 5,
      date: "2 days ago",
      text: "Got the license key instantly within 1 minute! Activated successfully without any issues. Highly recommended.",
    },
    {
      id: 2,
      name: "Tanim Ahmed",
      product: "Windows 10 Pro",
      rating: 5,
      date: "1 week ago",
      text: "Product quality is truly fantastic. Got exactly what was promised. Support team is also very helpful.",
    },
    {
      id: 3,
      name: "Sajib Rahman",
      product: "Windows 11 Home",
      rating: 5,
      date: "2 weeks ago",
      text: "Genuine activation key at a very affordable price. Saved a lot of money. Thank you KeyShop BD!",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviewsData.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  return (
    <section className="py-12 px-4 relative overflow-hidden bg-slate-950/50 border-t border-slate-800/60">
      <div className="max-w-xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-cyan-400 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Trusted by Our Clients
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Real experiences and reviews shared by our valued customers.
          </p>
        </div>

        {/* Single Card Carousel for Mobile Perfection */}
        <div className="relative">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative">
            <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-800/60 pointer-events-none" />

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow">
                {reviewsData[currentIndex].name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white text-sm font-bold flex items-center gap-1">
                  {reviewsData[currentIndex].name}
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <p className="text-slate-400 text-[11px]">
                  {reviewsData[currentIndex].product} •{" "}
                  {reviewsData[currentIndex].date}
                </p>
              </div>
            </div>

            <div className="flex gap-1 text-yellow-400 mb-2">
              {[...Array(reviewsData[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 italic">
              "{reviewsData[currentIndex].text}"
            </p>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-400">
              <span className="flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" /> Verified Purchase
              </span>
              <span className="text-slate-400">100% Genuine</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 hover:bg-slate-800 transition shadow-md z-20"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 hover:bg-slate-800 transition shadow-md z-20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-4">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-5 bg-cyan-500"
                  : "w-1.5 bg-slate-800"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
