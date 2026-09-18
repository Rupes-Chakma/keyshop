import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";
import LiveChat from "./components/trust/LiveChat";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  // ওয়েবসাইট প্রথমবার ওপেন হলে প্রি-লোডার
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-3"></div>
        <p className="text-slate-400 text-xs font-bold tracking-widest uppercase animate-pulse">
          Loading KeyShop BD...
        </p>
      </div>
    );
  }

  return (
    <CartProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white relative">
            <Navbar />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />

            {/* Scroll to top button */}
            <ScrollToTopButton />
          </div>
        </Router>

        {/* Floating Live Chat & Toaster */}
        <LiveChat />
        <Toaster position="bottom-center" reverseOrder={false} />
      </LanguageProvider>
    </CartProvider>
  );
}
